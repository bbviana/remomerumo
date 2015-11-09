package br.com.remomeurumo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		associations.put(name, association);
	}
}
