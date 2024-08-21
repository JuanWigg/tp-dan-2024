package isi.dan.msclientes.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import isi.dan.msclientes.dao.ClienteRepository;
import isi.dan.msclientes.exception.ClienteNotFoundException;
import isi.dan.msclientes.model.Cliente;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;

    @Value("${dan.clientes.default_maximo_descubierto}")
    private BigDecimal defaultMaximoDescubierto;

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findById(Integer id) {
        return clienteRepository.findById(id);
    }

    public Cliente save(Cliente cliente) {
        if (cliente.getMaximoDescubierto() == null) {
            cliente.setMaximoDescubierto(defaultMaximoDescubierto);
        }
        return clienteRepository.save(cliente);
    }

    public Cliente update(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public void deleteById(Integer id) {
        clienteRepository.deleteById(id);
    }

    public boolean verificarMaximoDescubierto(Integer id, Double total) throws ClienteNotFoundException {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        if (cliente.isPresent()) {
            return cliente.get().getMaximoDescubierto().compareTo(BigDecimal.valueOf(total)) >= 0 ? true : false;
        }
        throw new ClienteNotFoundException("Cliente " + id + " no encontrado");
    }
}
