package isi.dan.msclientes.model;

import java.math.BigDecimal;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "MS_CLI_OBRA")
@Data
public class Obra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotBlank(message = "La dirección es obligatoria")
    private String direccion;

    @Column(name = "ES_REMODELACION")
    private Boolean esRemodelacion;
    
    @NotNull(message = "La latitud es obligatoria")
    private double lat;
    
    @NotNull(message = "La longitud es obligatoria")
    private double lng;

    private EstadoObra estado;
    
    @ManyToOne
    @JoinColumn(name = "ID_CLIENTE")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Cliente cliente;
    
    @NotNull(message = "El presupuesto es obligatorio")
    @Min(value=100, message = "El presupuesto debe ser al menos de 100")
    private BigDecimal presupuesto;

}
