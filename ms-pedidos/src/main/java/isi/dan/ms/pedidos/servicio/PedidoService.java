package isi.dan.ms.pedidos.servicio;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isi.dan.ms.pedidos.dao.PedidoRepository;
import isi.dan.ms.pedidos.dto.PedidoDTO;
import isi.dan.ms.pedidos.dto.PedidoFiltersDTO;
import isi.dan.ms.pedidos.dto.StockUpdateDTO;
import isi.dan.ms.pedidos.modelo.DetallePedido;
import isi.dan.ms.pedidos.modelo.EstadoPedido;
import isi.dan.ms.pedidos.modelo.HistorialEstado;
import isi.dan.ms.pedidos.modelo.Pedido;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ProductoService productoService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private String exchange = "order-cancellations-exchange";

    private String routingJsonKey = "order-cancellations-routing-json-key";

    Logger log = LoggerFactory.getLogger(PedidoService.class);

    private void cancelarPedido(Pedido pedido) {
        PedidoDTO pedidoACancelar = new PedidoDTO();
        pedidoACancelar.setProductos(new ArrayList<StockUpdateDTO>());
        pedido.getDetalle().forEach((DetallePedido detalle) -> {
            StockUpdateDTO newStock = new StockUpdateDTO();
            newStock.setCantidad(detalle.getCantidad());
            newStock.setIdProducto(detalle.getProducto().getId());
            pedidoACancelar.getProductos().add(newStock);
        } );

        rabbitTemplate.convertAndSend(exchange, routingJsonKey, pedidoACancelar);
    }

    public Pedido savePedido(Pedido pedido) {
        log.info("Verificando antes de hacer el pedido");
        pedido.setFecha(Instant.now());
        pedido.setNumeroPedido(Long.valueOf(sequenceGeneratorService.generateSequence("pedidos")));

        pedido.getDetalle().forEach((DetallePedido detalle) -> {
            if(detalle.getDescuento() == null) {
                detalle.setDescuento(new BigDecimal(0.00));
            }
            detalle.setTotal(detalle.getProducto().getPrecio()
                .multiply(BigDecimal.valueOf(detalle.getCantidad())));
            detalle.setTotal(detalle.getTotal().subtract(detalle.getTotal().multiply(detalle.getDescuento())));
        });


        pedido.setTotal(pedido.getDetalle().stream().map(DetallePedido::getTotal).reduce((a, b) -> a.add(b)).orElse(null));

        pedido.setHistorialEstados(new ArrayList<HistorialEstado>());
        HistorialEstado historial = new HistorialEstado();
        historial.setUserEstado(pedido.getUsuario());

        List<EstadoPedido> estadosASumar = new ArrayList<EstadoPedido>();
        estadosASumar.add(EstadoPedido.ACEPTADO);
        estadosASumar.add(EstadoPedido.EN_PREPARACION);
        BigDecimal totalPedidosCliente = new BigDecimal(0);
        for(Pedido p : pedidoRepository.findByEstadoInAndCliente_Id(estadosASumar, pedido.getCliente().getId())) {
            totalPedidosCliente = totalPedidosCliente.add(p.getTotal());
        }
        totalPedidosCliente = totalPedidosCliente.add(pedido.getTotal());
        if (clienteService.verificarMaximoDescubierto(totalPedidosCliente, pedido.getCliente().getId())) 
            pedido.setEstado(EstadoPedido.ACEPTADO);
        else
            pedido.setEstado(EstadoPedido.RECHAZADO);

        historial.setEstado(pedido.getEstado());
        historial.setFechaEstado(Instant.now());
        historial.setDetalle(historial.getEstado() == EstadoPedido.ACEPTADO ?
            "Cliente cuenta con máximo descubierto suficiente" :
            "Cliente no cuenta con máximo descubierto suficiente");
        pedido.getHistorialEstados().add(historial);

        if(pedido.getEstado() == EstadoPedido.ACEPTADO) {
            if (productoService.verificarStockProductos(pedido)){
                HistorialEstado historialStock = new HistorialEstado();
                historialStock.setUserEstado("PEDIDOS_SERVICE");
                pedido.setEstado(EstadoPedido.EN_PREPARACION);
                historialStock.setEstado(pedido.getEstado());
                historialStock.setFechaEstado(Instant.now());
                historialStock.setDetalle("Stock suficiente para los productos solicitados");
                pedido.getHistorialEstados().add(historialStock);
            }
        }

        return pedidoRepository.save(pedido);
    }

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public List<Pedido> searchPedidos(PedidoFiltersDTO filters) {
        List<Pedido> pedidos = pedidoRepository.findAll();
        if(filters.getCliente() != null) {
            pedidos.removeIf(pedido -> !pedido.getCliente().getNombre().contains(filters.getCliente()));
        }
        if(EstadoPedido.contains(filters.getEstado())) {
            pedidos.removeIf(pedido -> pedido.getEstado() != EstadoPedido.valueOf(filters.getEstado()));
        }
        return pedidos;
    }

    public Pedido getPedidoById(String id) {
        return pedidoRepository.findById(id).orElse(null);
    }

    public List<Pedido> getPedidosByCliente(Integer id) {
        return pedidoRepository.findByCliente_Id(id);
    }

    public void deletePedido(String id) {
        pedidoRepository.deleteById(id);
    }

    public Pedido updatePedido(String id, Pedido pedido) {
        pedido.setId(id);

        if (pedido.getEstado() != pedido.getHistorialEstados().getLast().getEstado()) {
            HistorialEstado historial = new HistorialEstado();
            historial.setFechaEstado(Instant.now());
            historial.setUserEstado(pedido.getUsuario());
            historial.setEstado(pedido.getEstado());
            historial.setDetalle("Cambio de estado manual");
            pedido.getHistorialEstados().add(historial);
        }

        if (pedido.getEstado() == EstadoPedido.CANCELADO) {
            cancelarPedido(pedido);
        }

        return pedidoRepository.save(pedido);
    }
}
