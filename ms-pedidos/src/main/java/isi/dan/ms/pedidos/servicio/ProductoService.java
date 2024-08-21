package isi.dan.ms.pedidos.servicio;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import isi.dan.ms.pedidos.dto.PedidoDTO;
import isi.dan.ms.pedidos.dto.StockUpdateDTO;
import isi.dan.ms.pedidos.modelo.Pedido;

@Service
public class ProductoService {
    private final RestClient restClient;

    @Value("${configuration.productosBaseUrl}")
    private String productosBaseUrl;

    public ProductoService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.baseUrl(productosBaseUrl).build();
    }

    public boolean verificarStockProductos(Pedido pedido) {
        PedidoDTO pedidoDto = new PedidoDTO();
        ArrayList<StockUpdateDTO> productos = new ArrayList<>();

        pedido.getDetalle().forEach(detalle -> {
            StockUpdateDTO stockUpdate = new StockUpdateDTO();
            stockUpdate.setIdProducto(detalle.getProducto().getId());
            stockUpdate.setCantidad(detalle.getCantidad());
            productos.add(stockUpdate);
        });
        pedidoDto.setProductos(productos);

        return this.restClient.post()
            .uri(productosBaseUrl + "/productos/pedido")
            .contentType(MediaType.APPLICATION_JSON)
            .body(pedidoDto)
            .exchange((request, response) -> {
                if (response.getStatusCode().is2xxSuccessful()) {
                    return true;
                } else {
                    return false;
                }
            }
        );
    }
}
