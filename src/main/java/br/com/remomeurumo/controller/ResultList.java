package br.com.remomeurumo.controller;

import com.google.common.base.Objects;

import java.util.List;

import static com.google.common.base.Objects.firstNonNull;
import static java.lang.Integer.MAX_VALUE;

/**
 * @author bbviana
 */
public class ResultList<T> {
	private List<T> list;

	private Integer pageSize;

	private Integer totalResults;

	private Integer totalPages;

	public ResultList(List<T> list, Integer pageSize, Integer totalResults) {
		this.list = list;
		this.pageSize = firstNonNull(pageSize, MAX_VALUE);
		this.totalResults = totalResults;
		this.totalPages = (int) Math.ceil((double) this.totalResults / this.pageSize);
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
