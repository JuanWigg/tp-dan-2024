package isi.dan.ms_productos.exception;

public class StockInsuficienteException extends Exception {
    public StockInsuficienteException(Integer idProducto){
        super("Stock insuficiente para el producto "+idProducto);
    }  
}
