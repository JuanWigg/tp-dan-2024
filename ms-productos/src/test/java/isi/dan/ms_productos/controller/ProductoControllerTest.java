package isi.dan.ms_productos.controller;

import java.math.BigDecimal;
import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import isi.dan.ms_productos.dto.DiscountUpdateDTO;
import isi.dan.ms_productos.dto.StockProvisionDTO;
import isi.dan.ms_productos.modelo.Categoria;
import isi.dan.ms_productos.modelo.Producto;
import isi.dan.ms_productos.servicio.EchoClientFeign;
import isi.dan.ms_productos.servicio.ProductoService;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(ProductoController.class)
public class ProductoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductoService productoService;

    @MockBean
    private EchoClientFeign echoSvc;

    private Producto producto;
    private StockProvisionDTO stockProvision;
    private DiscountUpdateDTO discountUpdate;
    private Categoria categoria;

    @BeforeEach
    void setUp() {
        categoria = new Categoria();
        categoria.setId(1);
        categoria.setNombre("Test Categoria");

        producto = new Producto();
        producto.setId(1);
        producto.setNombre("Test Producto");
        producto.setCategoria(categoria);
        producto.setDescripcion("Test Descripcion");
        producto.setPrecio(BigDecimal.valueOf(100));
        producto.setStockActual(10);
        producto.setStockMinimo(5);
        producto.setDescuento(0.1f);

        stockProvision = new StockProvisionDTO();
        stockProvision.setIdProducto(1);
        stockProvision.setCantidad(10);
        stockProvision.setPrecio(BigDecimal.valueOf(300));

        discountUpdate = new DiscountUpdateDTO();
        discountUpdate.setIdProducto(1);
        discountUpdate.setDescuento(0.2f);
    }

    @Test
    void testGetAllProductos() throws Exception {
        Mockito.when(productoService.getAllProductos()).thenReturn(Collections.singletonList(producto));

        mockMvc.perform(get("/api/productos"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$[0].nombre").value("Test Producto"));
    }

    @Test
    void testGetById() throws Exception {
        Mockito.when(productoService.getProductoById(1)).thenReturn(producto);

        mockMvc.perform(get("/api/productos/1"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.nombre").value("Test Producto"));
    }

    @Test
    void testCreateProducto() throws Exception {
        Mockito.when(productoService.saveProducto(Mockito.any(Producto.class))).thenReturn(producto);

        mockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(producto)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nombre").value("Test Producto"));
    }

    @Test
    void testDeleteProducto() throws Exception {
        Mockito.doNothing().when(productoService).deleteProducto(1);

        mockMvc.perform(delete("/api/productos/1"))
            .andExpect(status().isNoContent());
    }

    @Test
    void testStockProvision() throws Exception {
        mockMvc.perform(put("/api/productos/stock-provision")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(stockProvision)))
            .andExpect(status().isNoContent());
    }

    @Test
    void testUpdateDiscount() throws Exception {
        mockMvc.perform(put("/api/productos/update-discount")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(discountUpdate)))
            .andExpect(status().isNoContent());
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
