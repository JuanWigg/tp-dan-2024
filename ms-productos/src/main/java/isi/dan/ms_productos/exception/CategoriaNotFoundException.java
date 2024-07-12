package isi.dan.ms_productos.exception;

public class CategoriaNotFoundException extends Exception{
    public CategoriaNotFoundException(Integer id){
        super("Categoria "+id+" no encontrada");
    }
}

