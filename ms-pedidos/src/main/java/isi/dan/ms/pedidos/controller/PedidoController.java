package isi.dan.ms.pedidos.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import isi.dan.ms.pedidos.dto.PedidoFiltersDTO;
import isi.dan.ms.pedidos.modelo.Pedido;
import isi.dan.ms.pedidos.servicio.PedidoService;

import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<Pedido> createPedido(@RequestBody Pedido pedido) {
        Pedido savedPedido = pedidoService.savePedido(pedido);
        return ResponseEntity.ok(savedPedido);
    }

    @GetMapping
    public List<Pedido> getAllPedidos(
        @RequestParam(required = false) String cliente,
        @RequestParam(required = false) String estado
    ) {
        if(cliente != null || estado != null) {
            PedidoFiltersDTO filters = new PedidoFiltersDTO();
            filters.setCliente(cliente);
            filters.setEstado(estado);
            return pedidoService.searchPedidos(filters);
        }
        return pedidoService.getAllPedidos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable String id) {
        Pedido pedido = pedidoService.getPedidoById(id);
        return pedido != null ? ResponseEntity.ok(pedido) : ResponseEntity.notFound().build();
    }

    @GetMapping("/clientes/{id}")
    public List<Pedido> getPedidosByCliente(@PathVariable Integer id) {
        return pedidoService.getPedidosByCliente(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> updatePedido(@PathVariable String id, @RequestBody Pedido pedido) {
        Pedido updatedPedido = pedidoService.updatePedido(id, pedido);
        return ResponseEntity.ok(updatedPedido);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable String id) {
        pedidoService.deletePedido(id);
        return ResponseEntity.noContent().build();
    }
}

