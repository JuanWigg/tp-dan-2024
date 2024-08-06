package isi.dan.ms.pedidos.servicio;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ClienteService {
    private final RestClient restClient;

    public ClienteService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.baseUrl("").build();
    }

    public boolean verificarMaximoDescubierto(BigDecimal total) {
        return this.restClient.get()
            .uri("/clientes/verificarMaximoDescubierto?total=" + total)
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
