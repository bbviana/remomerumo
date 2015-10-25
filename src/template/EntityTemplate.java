package br.com.bbviana.laylamarques.persistence;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

/**
 * @author bbviana
 */
@Entity("COLLECTION_NAME")
public class EntityTemplate {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    // <editor-fold desc="Object">
    @Override
    public String toString() {
        return reflectionToString(this, SHORT_PREFIX_STYLE);
    }

    // </editor-fold>

    // <editor-fold desc="Getters e Setters">

    // </editor-fold>
}
