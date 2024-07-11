package isi.dan.msclientes.servicios;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.junit4.SpringRunner;

import isi.dan.msclientes.dao.ObraRepository;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.EstadoObra;
import isi.dan.msclientes.model.Obra;

@RunWith(SpringRunner.class)
public class ObraServiceTest {
    Logger log = LoggerFactory.getLogger(ObraService.class);

    @Mock
    private ObraRepository obraRepository;

    @Mock
    private ClienteService clienteService;

    @InjectMocks
    private ObraService obraService;

    private Obra obra;

    private Obra obra2;

    private Cliente clienteObra;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        clienteObra = new Cliente();
        clienteObra.setId(1);
        clienteObra.setNombre("Test Cliente");
        clienteObra.setCorreoElectronico("test@cliente.com");
        clienteObra.setCuit("12998887776");
        clienteObra.setMaximoDescubierto(BigDecimal.valueOf(10000));
        clienteObra.setMaximoObrasEjecucion(Integer.valueOf(1));

        obra = new Obra();
        obra.setId(1);
        obra.setDireccion("Test Obra 999");
        obra.setPresupuesto(BigDecimal.valueOf(100));
        obra.setLat(-34.603722);
        obra.setLng(-58.381592);
        obra.setEsRemodelacion(false);
        obra.setEstado(EstadoObra.PENDIENTE);
        obra.setCliente(clienteObra);

        obra2 = new Obra();
        obra2.setId(2);
        obra2.setDireccion("Test Obra 998");
        obra2.setPresupuesto(BigDecimal.valueOf(200));
        obra2.setLat(-34.603721);
        obra2.setLng(-58.381591);
        obra2.setEsRemodelacion(true);
        obra2.setEstado(EstadoObra.PENDIENTE);
        obra2.setCliente(clienteObra);
    }

    @Test
    public void testGetAll() {
        // return list with obra and obra2
        Mockito.when(obraRepository.findAll()).thenReturn(List.of(obra, obra2));
        List<Obra> obras = obraService.findAll();
        assert obras.size() == 2;
        assert obras.get(0).getId() == 1;
        assert obras.get(1).getId() == 2;
        Mockito.verify(obraRepository, Mockito.times(1)).findAll();
    }

    @Test
    public void testGetById() {
        Mockito.when(obraRepository.findById(1)).thenReturn(java.util.Optional.of(obra));
        Optional<Obra> obra = obraService.findById(1);
        assert obra.get().getId() == 1;
        Mockito.verify(obraRepository, Mockito.times(1)).findById(1);
    }

    @Test
    public void testSave() {
        Mockito.when(clienteService.findById(1)).thenReturn(Optional.of(clienteObra));
        Mockito.when(obraRepository.save(obra)).thenReturn(obra);
        Obra obraSaved = obraService.save(obra);

        assert obraSaved.getId() == 1;
        assert obraSaved.getEstado() == EstadoObra.HABILITADA;
        Mockito.verify(obraRepository, Mockito.times(1)).save(obra);
    }

    @Test
    public void testSaveEstadoNull() {
        Mockito.when(clienteService.findById(1)).thenReturn(Optional.of(clienteObra));
        Mockito.when(obraRepository.save(obra)).thenReturn(obra);
        obra.setEstado(null);
        Obra obraSaved = obraService.save(obra);

        assert obraSaved.getId() == 1;
        assert obraSaved.getEstado() == EstadoObra.HABILITADA;
        Mockito.verify(obraRepository, Mockito.times(1)).save(obra);
    }

    @Test
    public void testSaveEstadoPendiente() {
        Mockito.when(clienteService.findById(1)).thenReturn(Optional.of(clienteObra));
        Mockito.when(obraRepository.save(obra)).thenReturn(obra);
        clienteObra.setMaximoObrasEjecucion(Integer.valueOf(0));
        Obra obraSaved = obraService.save(obra);

        assert obraSaved.getId() == 1;
        assert obraSaved.getEstado() == EstadoObra.PENDIENTE;
        Mockito.verify(obraRepository, Mockito.times(1)).save(obra);
    }

    @Test
    public void testUpdate() {
        Mockito.when(clienteService.findById(1)).thenReturn(Optional.of(clienteObra));
        Mockito.when(obraRepository.save(obra)).thenReturn(obra);

        obra.setEstado(EstadoObra.FINALIZADA);
        obra.setDireccion("Otra Direccion");

        Obra obraSaved = obraService.update(obra);

        assert obraSaved.getId() == 1;
        assert obraSaved.getEstado() == EstadoObra.FINALIZADA;
        assert obraSaved.getDireccion().equals("Otra Direccion");
        Mockito.verify(obraRepository, Mockito.times(1)).save(obra);
        Mockito.verify(obraRepository, Mockito.never()).countByClienteAndEstado(clienteObra, EstadoObra.HABILITADA);
        Mockito.verify(obraRepository, Mockito.atLeastOnce()).findByClienteAndEstado(clienteObra, EstadoObra.PENDIENTE);
    }
}
