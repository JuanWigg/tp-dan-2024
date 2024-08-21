package isi.dan.ms.pedidos.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import isi.dan.ms.pedidos.modelo.EstadoPedido;
import isi.dan.ms.pedidos.modelo.Pedido;
import java.util.List;


public interface PedidoRepository extends MongoRepository<Pedido, String> {
    List<Pedido> findByEstadoInAndCliente_Id(List<EstadoPedido> estados, Integer id);
    List<Pedido> findByCliente_Id(Integer id);
}
