package isi.dan.ms.pedidos.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "collectionseq")
@Data
public class CollectionSeq {
    @Id
    @Indexed( unique = true )
    private String collection;
    private long current = 1;
}
