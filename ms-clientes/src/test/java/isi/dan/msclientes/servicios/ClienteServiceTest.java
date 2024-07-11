package isi.dan.msclientes.servicios;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.jupiter.api.BeforeEach;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.junit4.SpringRunner;

import isi.dan.msclientes.dao.ClienteRepository;
import isi.dan.msclientes.model.Cliente;

@RunWith(SpringRunner.class)
class ClienteServiceTest {

    Logger log = LoggerFactory.getLogger(ClienteService.class);

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    private Cliente cliente;

    private Cliente cliente_descubierto_null;
    
    private Cliente cliente_descubierto_not_null;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        cliente = new Cliente();
        cliente.setId(1);
        cliente.setNombre("Test Cliente");
        cliente.setCorreoElectronico("test@cliente.com");
        cliente.setCuit("12998887776");
        cliente.setMaximoDescubierto(BigDecimal.valueOf(10000));
        cliente.setMaximoObrasEjecucion(Integer.valueOf(1));

        cliente_descubierto_null = new Cliente();
        cliente_descubierto_null.setId(2);
        cliente_descubierto_null.setNombre("Test Cliente 2");
        cliente_descubierto_null.setCorreoElectronico("test2@cliente.com");
        cliente_descubierto_null.setCuit("12998887776");
        cliente_descubierto_null.setMaximoDescubierto(null);
        cliente_descubierto_null.setMaximoObrasEjecucion(Integer.valueOf(1));

        cliente_descubierto_not_null = new Cliente();
        cliente_descubierto_not_null.setId(2);
        cliente_descubierto_not_null.setNombre("Test Cliente 2");
        cliente_descubierto_not_null.setCorreoElectronico("test2@cliente.com");
        cliente_descubierto_not_null.setCuit("12998887776");
        cliente_descubierto_not_null.setMaximoDescubierto(BigDecimal.valueOf(10000));
        cliente_descubierto_not_null.setMaximoObrasEjecucion(Integer.valueOf(1));
    }

    @Test
    void testFindAll() {
        Mockito.when(clienteRepository.findAll()).thenReturn(Collections.singletonList(cliente));
        
        List<Cliente> clientes = clienteService.findAll();
        log.info("ENCONTRE: {} ", clientes);
        
        assert clientes.size() == 1;
        Mockito.verify(clienteRepository, Mockito.times(1)).findAll();
    }

    @Test
    void testFindById() {
        Mockito.when(clienteRepository.findById(1)).thenReturn(Optional.of(cliente));
        
        Optional<Cliente> clienteEncontrado = clienteService.findById(1);
        log.info("ENCONTRE: {} ", clienteEncontrado.get());
        assert clienteEncontrado.isPresent();
        assert clienteEncontrado.get().getNombre().equals("Test Cliente");
        Mockito.verify(clienteRepository, Mockito.times(1)).findById(1);
    }

    @Test
    void testSave() {
        Mockito.when(clienteRepository.save(cliente)).thenReturn(cliente);
        
        Cliente clienteGuardado = clienteService.save(cliente);
        log.info("ENCONTRE: {} ", clienteGuardado);
        assert clienteGuardado.getNombre().equals("Test Cliente");
        Mockito.verify(clienteRepository, Mockito.times(1)).save(cliente);
    }

    @Test
    void testSaveWithNoMaximoDescubierto() {
        Mockito.when(clienteRepository.save(cliente_descubierto_null)).thenReturn(cliente_descubierto_not_null);
        
        Cliente clienteGuardado = clienteService.save(cliente_descubierto_null);
        log.info("ENCONTRE: {} ", clienteGuardado);
        assert clienteGuardado.getMaximoDescubierto().equals(BigDecimal.valueOf(10000));
        Mockito.verify(clienteRepository, Mockito.times(1)).save(cliente_descubierto_null);
    }

    @Test
    void testUpdate() {
        Mockito.when(clienteRepository.save(cliente)).thenReturn(cliente);
        cliente.setNombre("Test Update");
        cliente.setCorreoElectronico("testupdate@email.com");

        Cliente clienteGuardado = clienteService.update(cliente);
        log.info("ENCONTRE: {} ", clienteGuardado);

        assert clienteGuardado.getNombre().equals("Test Update");
        assert clienteGuardado.getCorreoElectronico().equals("testupdate@email.com");
        Mockito.verify(clienteRepository, Mockito.times(1)).save(cliente);
    }

    @Test
    void testDelete() {
        Mockito.doNothing().when(clienteRepository).deleteById(1);
        clienteService.deleteById(1);
        Mockito.verify(clienteRepository, Mockito.times(1)).deleteById(1);
    }
}
