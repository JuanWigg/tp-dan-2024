package isi.dan.ms_productos.dto;

import lombok.Data;

@Data
public class DiscountUpdateDTO {
    private Long idProducto;
    private float descuento;
}
