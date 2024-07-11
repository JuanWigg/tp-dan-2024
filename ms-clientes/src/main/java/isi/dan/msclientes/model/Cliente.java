package isi.dan.msclientes.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "MS_CLI_CLIENTE")
@Data
public class Cliente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @Column(name="CORREO_ELECTRONICO")
    @Email(message = "Email debe ser valido")
    @NotBlank(message = "Email es obligatorio")
    private String correoElectronico;
    
    @NotBlank(message = "El CUIT es obligatorio")
    private String cuit;

    @Column(name="MAXIMO_DESCUBIERTO")
    @Min(value = 10000, message = "El descubierto maximo debe ser al menos 10000")
    private BigDecimal maximoDescubierto;
    
    @Column(name="MAXIMO_OBRAS_EJECUCION")
    @Min(value = 1, message = "El maximo de obras en ejecucion debe ser al menos 1")
    @NotNull(message = "El maximo de obras en ejecucion es obligatorio")
    private Integer maximoObrasEjecucion;
}
