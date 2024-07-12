package isi.dan.ms_productos.servicio;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.junit4.SpringRunner;

import isi.dan.ms_productos.dao.ProductoRepository;
import isi.dan.ms_productos.dto.DiscountUpdateDTO;
import isi.dan.ms_productos.dto.StockProvisionDTO;
import isi.dan.ms_productos.modelo.Producto;


@RunWith(SpringRunner.class)
public class ProductoServiceTest {
    Logger log = LoggerFactory.getLogger(ProductoService.class);

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoService productoService;

    private Producto producto;
    private StockProvisionDTO stockProvision;
    private DiscountUpdateDTO discountUpdate;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        producto = new Producto();
        producto.setId(1);
        producto.setNombre("Test Producto");
        producto.setStockActual(10);
        producto.setStockMinimo(5);
        producto.setPrecio(BigDecimal.valueOf(100));
        producto.setDescuento(0.1f);

        stockProvision = new StockProvisionDTO();
        stockProvision.setIdProducto(1);
        stockProvision.setCantidad(5);
        stockProvision.setPrecio(BigDecimal.valueOf(200));

        discountUpdate = new DiscountUpdateDTO();
        discountUpdate.setIdProducto(1);
        discountUpdate.setDescuento(0.25f);
    }
    
    @Test
    void testSaveProducto() {
        Mockito.when(productoRepository.save(producto)).thenReturn(producto);

        Producto productoGuardado = productoService.saveProducto(producto);
        log.info("Producto guardado: {}", productoGuardado);

        assert productoGuardado.getNombre().equals("Test Producto");
        Mockito.verify(productoRepository, Mockito.times(1)).save(producto);
    }

    @Test
    void testGetAllProductos() {
        Mockito.when(productoRepository.findAll()).thenReturn(Collections.singletonList(producto));

        List<Producto> productos = productoService.getAllProductos();
        log.info("Productos: {}", productos);

        assert productos.size() == 1;
        assert productos.get(0).getNombre().equals("Test Producto");
        Mockito.verify(productoRepository, Mockito.times(1)).findAll();
    }

    @Test
    void testGetProductoById() throws Exception {
        Mockito.when(productoRepository.findById(1)).thenReturn(Optional.of(producto));

        Producto productoEncontrado = productoService.getProductoById(1);
        log.info("Producto encontrado: {}", productoEncontrado);
        
        assert productoEncontrado.getNombre().equals("Test Producto");
        Mockito.verify(productoRepository, Mockito.times(1)).findById(1);
    }
    
    @Test
    void testDeleteProducto() {
        Mockito.doNothing().when(productoRepository).deleteById(1);

        productoService.deleteProducto(1);
        Mockito.verify(productoRepository, Mockito.times(1)).deleteById(1);
    }

    @Test
    void testProvisionStock() throws Exception {
        Mockito.when(productoRepository.save(producto)).thenReturn(producto);
        Mockito.when(productoRepository.findById(1)).thenReturn(Optional.of(producto));

        producto.setStockActual(producto.getStockActual() + stockProvision.getCantidad());
        producto.setPrecio(stockProvision.getPrecio());
        productoService.stockProvision(stockProvision);

        Mockito.verify(productoRepository, Mockito.times(1)).findById(1);
        Mockito.verify(productoRepository, Mockito.times(1)).save(producto);
    }

    @Test
    void testUpdateDiscount() throws Exception {
        Mockito.when(productoRepository.save(producto)).thenReturn(producto);
        Mockito.when(productoRepository.findById(1)).thenReturn(Optional.of(producto));

        producto.setDescuento(discountUpdate.getDescuento());
        productoService.updateDiscount(discountUpdate);

        assert producto.getDescuento() == 0.25f;
        Mockito.verify(productoRepository, Mockito.times(1)).findById(1);
        Mockito.verify(productoRepository, Mockito.times(1)).save(producto);
    }
}
