package isi.dan.ms.pedidos.servicio;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isi.dan.ms.pedidos.conf.RabbitMQConfig;
import isi.dan.ms.pedidos.dao.PedidoRepository;
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

    Logger log = LoggerFactory.getLogger(PedidoService.class);


    public Pedido savePedido(Pedido pedido) {
        log.info("Verificando antes de hacer el pedido");
        pedido.setFecha(Instant.now());
        pedido.setNumeroPedido(Long.valueOf(sequenceGeneratorService.generateSequence("pedidos")));

        pedido.setTotal(pedido.getDetalle().stream().map(DetallePedido::getTotal).reduce((a, b) -> a.add(b)).orElse(null));

        pedido.setHistorialEstados(new ArrayList<HistorialEstado>());
        HistorialEstado historial = new HistorialEstado();
        historial.setFechaEstado(pedido.getFecha());
        historial.setUserEstado(pedido.getUsuario());

        BigDecimal totalPedidosCliente = pedidoRepository.findByCliente_Id(pedido.getCliente().getId()).stream()
                .map(Pedido::getTotal).reduce((a, b) -> a.add(b)).orElse(null);
        // Verificar con el microservicios de clientes que el máximo descubierto no se exceda
        if (clienteService.verificarMaximoDescubierto(totalPedidosCliente)) {
            pedido.setEstado(EstadoPedido.ACEPTADO);
            historial.setEstado(EstadoPedido.ACEPTADO);
            historial.setDetalle("Cliente  cuenta con máximo descubierto");
        } else {
            pedido.setEstado(EstadoPedido.RECHAZADO);
            historial.setEstado(EstadoPedido.RECHAZADO);
            historial.setDetalle("Cliente no cuenta con máximo descubierto");
        }
        pedido.getHistorialEstados().add(historial);
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
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
        return pedidoRepository.save(pedido);
    }
}
