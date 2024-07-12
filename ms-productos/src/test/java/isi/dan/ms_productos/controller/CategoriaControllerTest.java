package isi.dan.ms_productos.controller;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import isi.dan.ms_productos.modelo.Categoria;
import isi.dan.ms_productos.servicio.CategoriaService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CategoriaController.class)
public class CategoriaControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoriaService categoriaService;

    private Categoria categoria;

    @BeforeEach
    void setUp() {
        categoria = new Categoria();
        categoria.setId(1);
        categoria.setNombre("CEMENTOS");
    }

    @Test
    void testGetAllCategorias() throws Exception {
        Mockito.when(categoriaService.getAllCategorias()).thenReturn(Collections.singletonList(categoria));

        mockMvc.perform(get("/api/categorias"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$[0].nombre").value("CEMENTOS"));
    }

    @Test
    void testGetById() throws Exception {
        Mockito.when(categoriaService.getCategoriaById(1)).thenReturn(categoria);

        mockMvc.perform(get("/api/categorias/1"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.nombre").value("CEMENTOS"));
    }

    @Test
    void testCreateCategoria() throws Exception {
        Mockito.when(categoriaService.saveCategoria(Mockito.any(Categoria.class))).thenReturn(categoria);

        mockMvc.perform(post("/api/categorias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(categoria)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nombre").value("CEMENTOS"));
    }

    @Test
    void testDeleteCategoria() throws Exception {
        Mockito.doNothing().when(categoriaService).deleteCategoria(1);

        mockMvc.perform(delete("/api/categorias/1"))
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
