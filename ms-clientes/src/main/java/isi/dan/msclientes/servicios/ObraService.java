package isi.dan.msclientes.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isi.dan.msclientes.dao.ObraRepository;
import isi.dan.msclientes.dto.ObraFiltersDTO;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.EstadoObra;
import isi.dan.msclientes.model.Obra;

import java.util.List;
import java.util.Optional;

@Service
public class ObraService {
    
    @Autowired
    private ObraRepository obraRepository;

    @Autowired
    private ClienteService clienteService;

    public List<Obra> findAll() {
        return obraRepository.findAll();
    }

    public List<Obra> searchObras(ObraFiltersDTO filters) {
        List<Obra> obras = obraRepository.findAll();
        if (filters.getCliente() != null) {
            obras.removeIf(obra -> !obra.getCliente().getNombre().contains(filters.getCliente()));
        }
        if (filters.getDireccion() != null) {
            obras.removeIf(obra -> !obra.getDireccion().contains(filters.getDireccion()));
        }
        return obras;
    }

    public Optional<Obra> findById(Integer id) {
        return obraRepository.findById(id);
    }

    public Obra save(Obra obra) {
        if (obra.getEstado() == null) {
            obra.setEstado(validarHabilitacionDeObra(obra) ? EstadoObra.HABILITADA : EstadoObra.PENDIENTE);
        }
        else {
            if (obra.getEstado() == EstadoObra.FINALIZADA) {
                obra.setEstado(validarHabilitacionDeObra(obra) ? EstadoObra.HABILITADA : EstadoObra.PENDIENTE);
            }
            else {
                obra.setEstado(validarHabilitacionDeObra(obra) ? EstadoObra.HABILITADA : EstadoObra.PENDIENTE);
            }
        }
        return obraRepository.save(obra);
    }

    public Obra update(Obra obra) {
        if (obra.getCliente() != null) {
            if (obra.getEstado() == null ) {
                obra.setEstado( validarHabilitacionDeObra(obra) ? EstadoObra.HABILITADA : EstadoObra.PENDIENTE );
            }
            if (obra.getEstado() == EstadoObra.FINALIZADA) {
                habilitarNuevaObra(obra.getCliente());
            }
            else {
                if (obra.getEstado() == EstadoObra.HABILITADA && !validarHabilitacionDeObra(obra))
                    obra.setEstado(EstadoObra.PENDIENTE);

                if (obra.getEstado() == EstadoObra.PENDIENTE && validarHabilitacionDeObra(obra))
                    obra.setEstado(EstadoObra.HABILITADA);
            }
        }
        return obraRepository.save(obra);
    }

    public void deleteById(Integer id) {
        obraRepository.deleteById(id);
    }


    private boolean validarHabilitacionDeObra(Obra obra) {
        if (obra.getCliente() != null) {
            obra.setCliente(clienteService.findById(obra.getCliente().getId()).get());
            Integer obrasActivasCliente = obraRepository.countByClienteAndEstado(obra.getCliente(), EstadoObra.HABILITADA);
            if (obrasActivasCliente < obra.getCliente().getMaximoObrasEjecucion()) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }

    private void habilitarNuevaObra(Cliente cliente) {
        List<Obra> obrasCliente = obraRepository.findByClienteAndEstado(cliente, EstadoObra.PENDIENTE);
        if (obrasCliente.size() > 0) {
            Obra obra = obrasCliente.get(0);
            obra.setEstado(EstadoObra.HABILITADA);
            obraRepository.save(obra);
        }
    }
}

