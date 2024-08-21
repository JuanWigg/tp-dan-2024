package isi.dan.ms.pedidos.servicio;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.databind.introspect.TypeResolutionContext.Empty;

@Service
public class ClienteService {
    private final RestClient restClient;

    Logger log = LoggerFactory.getLogger(ClienteService.class);

    @Value("${configuration.clientesBaseUrl}")
    private String clientesBaseUrl;

    public ClienteService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.baseUrl(clientesBaseUrl).build();
    }

    public boolean verificarMaximoDescubierto(BigDecimal total, Integer idCliente) {
        return this.restClient.post()
            .uri(clientesBaseUrl + "/clientes/" + idCliente + "/verificarMaximoDescubierto?total=" + total)
            .contentType(MediaType.APPLICATION_JSON)
            .body(Empty.class)
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
