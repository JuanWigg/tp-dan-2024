package isi.dan.ms_productos.servicio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import isi.dan.ms_productos.conf.RabbitMQConfig;
import isi.dan.ms_productos.dao.ProductoRepository;
import isi.dan.ms_productos.dto.DiscountUpdateDTO;
import isi.dan.ms_productos.dto.PedidoDTO;
import isi.dan.ms_productos.dto.StockProvisionDTO;
import isi.dan.ms_productos.dto.StockUpdateDTO;
import isi.dan.ms_productos.exception.ProductoNotFoundException;
import isi.dan.ms_productos.exception.StockInsuficienteException;
import isi.dan.ms_productos.modelo.Producto;

import java.util.List;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    Logger log = LoggerFactory.getLogger(ProductoService.class);

    @RabbitListener(queues = RabbitMQConfig.ORDER_CANCELLATIONS_QUEUE, messageConverter = "jsonMessageConverter")
    @Transactional(rollbackFor = { ProductoNotFoundException.class })
    public void handleCancellation(PedidoDTO pedidoCancelado) throws ProductoNotFoundException {
        log.info("Recibido {}", pedidoCancelado);
        for(StockUpdateDTO stockUpdate : pedidoCancelado.getProductos()) {
            Producto producto = productoRepository.findById(stockUpdate.getIdProducto()).orElseThrow(() -> new ProductoNotFoundException(stockUpdate.getIdProducto()));
            producto.setStockActual(producto.getStockActual() + stockUpdate.getCantidad());
            productoRepository.save(producto);
        }
    }



    public Producto saveProducto(Producto producto) {
        if(producto.getStockActual() == null) {
            producto.setStockActual(0);
        }
        if(producto.getDescuento() == null) {
            producto.setDescuento(0.0f);
        }
        return productoRepository.save(producto);
    }

    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    public Producto getProductoById(Integer id) throws ProductoNotFoundException{
        return productoRepository.findById(id).orElseThrow(() -> new ProductoNotFoundException(id));
    }

    public void deleteProducto(Integer id) {
        productoRepository.deleteById(id);
    }

    public void stockProvision(StockProvisionDTO stockProvision) throws ProductoNotFoundException {
        Producto producto = productoRepository.findById(stockProvision.getIdProducto()).orElseThrow(() -> new ProductoNotFoundException(stockProvision.getIdProducto()));
        producto.setStockActual(producto.getStockActual() + stockProvision.getCantidad());
        producto.setPrecio(stockProvision.getPrecio());
        productoRepository.save(producto);
    }

    public void updateDiscount(DiscountUpdateDTO updateDiscount) throws ProductoNotFoundException {
        Producto producto = productoRepository.findById(updateDiscount.getIdProducto()).orElseThrow(() -> new ProductoNotFoundException(updateDiscount.getIdProducto()));
        producto.setDescuento(updateDiscount.getDescuento());
        productoRepository.save(producto);
    }

    @Transactional(rollbackFor = {ProductoNotFoundException.class, StockInsuficienteException.class})
    public boolean makeOrder(PedidoDTO pedido) throws ProductoNotFoundException, StockInsuficienteException {
        for(StockUpdateDTO stockUpdate : pedido.getProductos()) {
            Producto producto = productoRepository.findById(stockUpdate.getIdProducto()).orElseThrow(() -> new ProductoNotFoundException(stockUpdate.getIdProducto()));
            producto.setStockActual(producto.getStockActual() - stockUpdate.getCantidad());
            if(producto.getStockActual() < 0) {
                throw new StockInsuficienteException(producto.getId());
            }
            productoRepository.save(producto);
        }

        return true;
    }
}

