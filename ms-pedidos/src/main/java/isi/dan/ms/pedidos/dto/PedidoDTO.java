package isi.dan.ms.pedidos.dto;

import java.util.List;

import lombok.Data;

@Data
public class PedidoDTO {
    private List<StockUpdateDTO> productos;
}
