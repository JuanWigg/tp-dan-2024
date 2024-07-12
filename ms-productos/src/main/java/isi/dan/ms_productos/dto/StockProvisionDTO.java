package isi.dan.ms_productos.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class StockProvisionDTO {
    private Integer idProducto;
    private Integer cantidad;
    private BigDecimal precio;
}
