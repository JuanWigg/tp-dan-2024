package isi.dan.ms_productos.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class StockProvisionDTO {
    private Long idProducto;
    private Integer cantidad;
    private BigDecimal precio;
}
