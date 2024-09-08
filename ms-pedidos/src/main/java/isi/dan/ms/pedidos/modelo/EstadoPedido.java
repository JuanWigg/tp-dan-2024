package isi.dan.ms.pedidos.modelo;

public enum EstadoPedido {
    RECHAZADO, ACEPTADO, CANCELADO, EN_PREPARACION, ENTREGADO;


    public static boolean contains(String test) {
        for (EstadoPedido e : EstadoPedido.values()) {
            if (e.name().equals(test)) {
                return true;
            }
        }
    
        return false;
    }
}

