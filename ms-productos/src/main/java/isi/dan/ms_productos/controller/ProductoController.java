package isi.dan.ms_productos.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


import isi.dan.ms_productos.aop.LogExecutionTime;
import isi.dan.ms_productos.dto.DiscountUpdateDTO;
import isi.dan.ms_productos.dto.PedidoDTO;
import isi.dan.ms_productos.dto.StockProvisionDTO;
import isi.dan.ms_productos.exception.ProductoNotFoundException;
import isi.dan.ms_productos.exception.StockInsuficienteException;
import isi.dan.ms_productos.modelo.Producto;
import isi.dan.ms_productos.servicio.EchoClientFeign;
import isi.dan.ms_productos.servicio.ProductoService;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;

    Logger log = LoggerFactory.getLogger(ProductoController.class);

    @Autowired
    EchoClientFeign echoSvc;


    @PostMapping
    @LogExecutionTime
    public ResponseEntity<Producto> createProducto(@RequestBody @Validated Producto producto) {
        Producto savedProducto = productoService.saveProducto(producto);
        return ResponseEntity.ok(savedProducto);
    }

    @GetMapping("/test")
    @LogExecutionTime
    public String getEcho() {
        String resultado = echoSvc.echo();
        log.info("Log en test 1!!!! {}",resultado);
        return resultado;
    }

    @GetMapping("/test2")
    @LogExecutionTime
    public String getEcho2() {
        RestTemplate restTemplate = new RestTemplate();
        String gatewayURL = "http://ms-gateway-svc:8080";
        String resultado = restTemplate.getForObject(gatewayURL+"/clientes/api/clientes/echo", String.class);
        log.info("Log en test 2 {}",resultado);
        return resultado;
    }

    @GetMapping
    @LogExecutionTime
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos();
    }

    @GetMapping("/{id}")
    @LogExecutionTime
    public ResponseEntity<Producto> getProductoById(@PathVariable Integer id) throws ProductoNotFoundException {
        return  ResponseEntity.ok(productoService.getProductoById(id));
    }

    @DeleteMapping("/{id}")
    @LogExecutionTime
    public ResponseEntity<Void> deleteProducto(@PathVariable Integer id) {
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/stock-provision")
    @LogExecutionTime
    public ResponseEntity<Void> stockProvision(@RequestBody StockProvisionDTO stockProvision) throws ProductoNotFoundException {
        productoService.stockProvision(stockProvision);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update-discount")
    @LogExecutionTime
    public ResponseEntity<Void> updateDiscount(@RequestBody DiscountUpdateDTO discountUpdate) throws ProductoNotFoundException {
        productoService.updateDiscount(discountUpdate);
        return ResponseEntity.noContent().build();
    }

   @PostMapping("/pedido")
   public ResponseEntity<String> makeOrder(@RequestBody PedidoDTO pedido) throws ProductoNotFoundException, StockInsuficienteException {
        if( productoService.makeOrder(pedido)) {
            return ResponseEntity.ok("Pedido realizado correctamente");
        }
        return ResponseEntity.internalServerError().body("Error al realizar el pedido. Verifique el stock de los productos");
   }
    
}

