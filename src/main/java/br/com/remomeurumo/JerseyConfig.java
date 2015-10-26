package br.com.remomeurumo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ext.ContextResolver;

import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES;

/**
 * @author bbviana
 */
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        packages(this.getClass().getPackage().getName());
        register(MultiPartFeature.class); // file upload
        register(JacksonFeature.class);
        register(JacksonConfigurator.class);
    }

    public static class JacksonConfigurator implements ContextResolver<ObjectMapper> {

        private ObjectMapper mapper = new ObjectMapper();

        public JacksonConfigurator() {
            mapper.configure(FAIL_ON_UNKNOWN_PROPERTIES, false);
        }

        public ObjectMapper getContext(Class<?> type) {
            return mapper;
        }
    }

}
