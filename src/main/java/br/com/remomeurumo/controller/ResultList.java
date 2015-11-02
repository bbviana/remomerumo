package br.com.remomeurumo.controller;

import java.util.List;

import static java.lang.Integer.MAX_VALUE;

/**
 * @author bbviana
 */
public class ResultList<T> {
	private List<T> list;

	private Integer pageSize = MAX_VALUE;

	private Integer totalResults;

	private Integer totalPages;

	public ResultList(List<T> list, Integer pageSize, Integer totalResults) {
		this.list = list;
		this.pageSize = pageSize;
		this.totalResults = totalResults;
		this.totalPages = (int) Math.ceil((double) totalResults / pageSize);
	}

	public List<T> getList() {
		return list;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public Integer getTotalResults() {
		return totalResults;
	}

	public Integer getTotalPages() {
		return totalPages;
	}
}
