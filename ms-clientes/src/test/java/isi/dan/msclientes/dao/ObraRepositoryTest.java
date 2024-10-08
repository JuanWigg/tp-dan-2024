package isi.dan.msclientes.dao;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.EstadoObra;
import isi.dan.msclientes.model.Obra;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Testcontainers
@ActiveProfiles("db")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ObraRepositoryTest {

    Logger log = LoggerFactory.getLogger(ObraRepositoryTest.class);

    @Container
    public static MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.0")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    @Autowired
    private ObraRepository obraRepository;
    
    @Autowired
    private ClienteRepository clienteRepository;

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", mysqlContainer::getJdbcUrl);
        registry.add("spring.datasource.username", mysqlContainer::getUsername);
        registry.add("spring.datasource.password", mysqlContainer::getPassword);
    }

    @BeforeEach
    void iniciarDatos(){
        Obra obra = new Obra();
        obra.setDireccion("Test Obra 999");
        obra.setPresupuesto(BigDecimal.valueOf(100));
        obraRepository.save(obra);
    }

    @BeforeEach
    void borrarDatos(){
        obraRepository.deleteAll();
    }

    @AfterAll
    static void stopContainer() {
        mysqlContainer.stop();
    }

    @Test
    void testSaveAndFindById() {
        Obra obra = new Obra();
        obra.setDireccion("Test Obra");
        obra.setPresupuesto(BigDecimal.valueOf(2000));
        obraRepository.save(obra);

        Optional<Obra> foundObra = obraRepository.findById(obra.getId());
        log.info("ENCONTRE: {} ",foundObra);
        assertThat(foundObra).isPresent();
        assertThat(foundObra.get().getDireccion()).isEqualTo("Test Obra");
    }

    @Test
    void testFindByPresupuesto() {
        Obra obra = new Obra();
        obra.setDireccion("Test Obra");
        obra.setPresupuesto(BigDecimal.valueOf(200));
        obraRepository.save(obra);

        List<Obra> resultado = obraRepository.findByPresupuestoGreaterThanEqual(BigDecimal.valueOf(50));
        log.info("ENCONTRE: {} ",resultado);
        assertThat(resultado.size()).isEqualTo(2);
        assertThat(resultado.get(0).getPresupuesto()).isGreaterThan(BigDecimal.valueOf(50));
        assertThat(resultado.get(1).getPresupuesto()).isGreaterThan(BigDecimal.valueOf(50));
    }

    @Test
    void testFindByClienteAndEstado() {
        Cliente cliente = new Cliente();
        cliente.setNombre("Test Cliente");
        cliente.setCorreoElectronico("testCorreo@email.com");
        cliente.setCuit("123456789");
        cliente.setMaximoDescubierto(BigDecimal.valueOf(10000));
        cliente.setMaximoObrasEjecucion(1);
        clienteRepository.save(cliente);

        Obra obra = new Obra();
        obra.setDireccion("Test Obra");
        obra.setPresupuesto(BigDecimal.valueOf(200));
        obra.setCliente(cliente);
        obra.setEstado(EstadoObra.PENDIENTE);
        obraRepository.save(obra);

        List<Obra> resultado = obraRepository.findByClienteAndEstado(cliente, EstadoObra.PENDIENTE);
        log.info("ENCONTRE: {} ",resultado);
        assertThat(resultado.size()).isEqualTo(1);
        assertThat(resultado.get(0).getCliente().getNombre()).isEqualTo("Test Cliente");
        assertThat(resultado.get(0).getEstado()).isEqualTo(EstadoObra.PENDIENTE);
    }

    @Test
    void testCountByClienteAndEstado() {
        Cliente cliente = new Cliente();
        cliente.setNombre("Test Cliente");
        cliente.setCorreoElectronico("testCorreo@email.com");
        cliente.setCuit("123456789");
        cliente.setMaximoDescubierto(BigDecimal.valueOf(10000));
        cliente.setMaximoObrasEjecucion(1);
        clienteRepository.save(cliente);

        Obra obra = new Obra();
        obra.setDireccion("Test Obra");
        obra.setPresupuesto(BigDecimal.valueOf(200));
        obra.setCliente(cliente);
        obra.setEstado(EstadoObra.PENDIENTE);
        obraRepository.save(obra);

        Integer resultado = obraRepository.countByClienteAndEstado(cliente, EstadoObra.PENDIENTE);
        log.info("OBTUVE: {} ",resultado);
        assertThat(resultado).isEqualTo(1);
    }
}

