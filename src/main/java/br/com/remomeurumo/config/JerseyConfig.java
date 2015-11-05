package br.com.remomeurumo.config;

import br.com.remomeurumo.GrupoAluno;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ext.ContextResolver;
import java.io.IOException;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;
import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES;
import static com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter.filterOutAllExcept;
import static org.apache.commons.lang3.StringUtils.removeEnd;

/**
 * @author bbviana
 */
public class JerseyConfig extends ResourceConfig {

	public JerseyConfig() {
		String parentPackage = removeEnd(this.getClass().getPackage().getName(), ".config");
		packages(parentPackage);
		register(MultiPartFeature.class); // file upload
		register(JacksonFeature.class);
		register(JacksonConfigurator.class);
	}

	public static class JacksonConfigurator implements ContextResolver<ObjectMapper> {

		private ObjectMapper mapper = new ObjectMapper();

		public JacksonConfigurator() {
			mapper.configure(FAIL_ON_UNKNOWN_PROPERTIES, false);
			mapper.setSerializationInclusion(NON_NULL);

			FilterProvider filterProvider = new SimpleFilterProvider()
					.addFilter("associationFilter", filterOutAllExcept("id", "nome"));
			mapper.setFilters(filterProvider);
		}

		public ObjectMapper getContext(Class<?> type) {
			return mapper;
		}
	}


}
