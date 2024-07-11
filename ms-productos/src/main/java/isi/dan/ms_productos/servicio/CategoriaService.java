package isi.dan.ms_productos.servicio;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isi.dan.ms_productos.dao.CategoriaRepository;
import isi.dan.ms_productos.exception.CategoriaNotFoundException;
import isi.dan.ms_productos.modelo.Categoria;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    Logger log = LoggerFactory.getLogger(CategoriaService.class);
    
    public Categoria saveCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    public Categoria getCategoriaById(Long id) throws CategoriaNotFoundException {
        return categoriaRepository.findById(id).orElseThrow(() -> new CategoriaNotFoundException(id));
    }

    public void deleteCategoria(Long id) {
        categoriaRepository.deleteById(id);
    }
}
