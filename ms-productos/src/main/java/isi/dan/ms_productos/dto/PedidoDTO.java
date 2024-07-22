package isi.dan.ms_productos.dto;

import lombok.Data;

@Data
public class PedidoDTO {
    private StockUpdateDTO[] productos;
}
