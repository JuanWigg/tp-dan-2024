package isi.dan.ms_productos.servicio;

import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.junit4.SpringRunner;

import isi.dan.ms_productos.dao.CategoriaRepository;
import isi.dan.ms_productos.modelo.Categoria;

@RunWith(SpringRunner.class)
public class CategoriaServiceTest {
    Logger log = LoggerFactory.getLogger(CategoriaService.class);

    @Mock
    private CategoriaRepository categoriaRepository;

    @InjectMocks
    private CategoriaService categoriaService;

    private Categoria categoria;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        categoria = new Categoria();
        categoria.setId(1);
        categoria.setNombre("CEMENTOS");
    }

    @Test
    void testSaveCategoria() {
        Mockito.when(categoriaRepository.save(categoria)).thenReturn(categoria);

        Categoria categoriaGuardada = categoriaService.saveCategoria(categoria);
        log.info("Categoria guardada: {}", categoriaGuardada);

        assert categoriaGuardada.getNombre().equals("CEMENTOS");
        Mockito.verify(categoriaRepository, Mockito.times(1)).save(categoria);
    }

    @Test
    void testGetAllCategorias() {
        Mockito.when(categoriaRepository.findAll()).thenReturn(Collections.singletonList(categoria));

        List<Categoria> categorias = categoriaService.getAllCategorias();
        log.info("Categorias: {}", categorias);

        assert categorias.size() == 1;
        assert categorias.get(0).getNombre().equals("CEMENTOS");
        Mockito.verify(categoriaRepository, Mockito.times(1)).findAll();
    }

    @Test
    void testGetCategoriaById() throws Exception {
        Mockito.when(categoriaRepository.findById(1)).thenReturn(Optional.of(categoria));

        Categoria categoriaEncontrada = categoriaService.getCategoriaById(1);
        log.info("Categoria encontrada: {}", categoriaEncontrada);

        assert categoriaEncontrada.getNombre().equals("CEMENTOS");
        Mockito.verify(categoriaRepository, Mockito.times(1)).findById(1);
    }

    @Test
    void testDeleteCategoria() {
        Mockito.doNothing().when(categoriaRepository).deleteById(1);

        categoriaService.deleteCategoria(1);
        Mockito.verify(categoriaRepository, Mockito.times(1)).deleteById(1);
    }

}
