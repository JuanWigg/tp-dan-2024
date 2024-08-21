package isi.dan.ms_productos.exception;

public class ProductoNotFoundException extends Exception{
    public ProductoNotFoundException(Integer id){
        super("Producto "+id+" no encontrado");
    }
}
