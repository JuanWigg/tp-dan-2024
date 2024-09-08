package isi.dan.ms.pedidos.servicio;

import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import isi.dan.ms.pedidos.modelo.CollectionSeq;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Objects;

@Service
public class SequenceGeneratorService {
    private MongoOperations mongoOperations;

    public SequenceGeneratorService(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public long generateSequence(String seqName) {
        CollectionSeq counter = mongoOperations.findAndModify(
                query(where("_id").is(seqName)),
                new Update().inc("current", 1),
                FindAndModifyOptions.options().returnNew(true).upsert(true),
                CollectionSeq.class);
        return !Objects.isNull(counter) ? counter.getCurrent() : 1;
    }
}
