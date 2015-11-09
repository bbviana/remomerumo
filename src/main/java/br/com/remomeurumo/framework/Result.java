package br.com.remomeurumo.framework;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static br.com.remomeurumo.framework.Beans.property;
import static java.util.stream.Collectors.toList;

/**
 * @author bbviana
 */
public class Result<T> {

	private T data;

	private Map<String, List<?>> associations = new HashMap<>();

	public Result(T data) {
		this.data = data;
	}

	public T getData() {
		return data;
	}

	public Map<String, List<?>> getAssociations() {
		return associations;
	}

	public void addAssociation(String name, List<?> association) {
		List<Association> associationBeans = association.stream().map(it ->
				new Association(property(it, "id"), property(it, "nome")))
				.collect(toList());

		associations.put(name, associationBeans);
	}
}
