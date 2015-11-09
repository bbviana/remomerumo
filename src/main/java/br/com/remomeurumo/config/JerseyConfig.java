package br.com.remomeurumo.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.apache.log4j.Logger;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ext.ContextResolver;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;
import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES;
import static com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter.filterOutAllExcept;
import static org.apache.commons.lang3.StringUtils.removeEnd;
import static org.apache.log4j.Logger.getLogger;

/**
 * @author bbviana
 */
public class JerseyConfig extends ResourceConfig {

	private static final Logger LOG = getLogger(JerseyConfig.class);

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
			LOG.info("---------------------------------------------------------------");
			LOG.info("Configurando Jackson\n\n");

			LOG.info("Definindo FAIL_ON_UNKNOWN_PROPERTIES = false: json contendo propriedades desconhecidas não provoca erro");
			mapper.configure(FAIL_ON_UNKNOWN_PROPERTIES, false);

			LOG.info("setSerializationInclusion = NON_NULL: propriedades nulas não são serializadas");
			mapper.setSerializationInclusion(NON_NULL);

			LOG.info("Registrando 'associationFilter': Use com @JsonFilter(\"associationFilter\")");
			FilterProvider filterProvider = new SimpleFilterProvider()
					.addFilter("associationFilter", filterOutAllExcept("id", "nome"));
			mapper.setFilters(filterProvider);

			LOG.info("---------------------------------------------------------------");
		}

		public ObjectMapper getContext(Class<?> type) {
			return mapper;
		}
	}


}
