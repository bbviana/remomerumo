package br.com.remomeurumo.controller;

import java.util.List;

/**
 * @author bbviana
 */
public class ResultList<T> {
	private List<T> list;

	private Long totalResults;

	private Long totalPages;

	public ResultList(List<T> list, Long totalResults) {
		this.list = list;
		this.totalResults = totalResults;
		this.totalPages = (long) Math.ceil((double) totalResults / list.size());
	}

	public List<T> getList() {
		return list;
	}

	public Long getTotalResults() {
		return totalResults;
	}

	public Long getTotalPages() {
		return totalPages;
	}
}
