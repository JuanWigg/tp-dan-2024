package isi.dan.ms_productos.dto;

import lombok.Data;

@Data
public class FiltersDTO {
    String nombre;
    Float priceMin;
    Float priceMax;
    Integer stockMin;
    Integer stockMax;
}
