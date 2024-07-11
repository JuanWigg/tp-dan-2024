package isi.dan.ms_productos.modelo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "MS_PRD_PRODUCTO")
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String nombre;

    @NotNull
    private String descripcion;

    @Column(name ="STOCK_ACTUAL")
    private int stockActual;

    @Column(name ="STOCK_MINIMO")
    @NotNull
    private int stockMinimo;

    @NotNull
    private BigDecimal precio;
    
    private float descuento;
    
    @ManyToOne
    @JoinColumn(name = "ID_CATEGORIA")
    private Categoria categoria;

}
