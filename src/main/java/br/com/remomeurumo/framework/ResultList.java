package br.com.remomeurumo.framework;

import java.util.List;

/**
 * @author bbviana
 */
public class ResultList<T> {

	private List<T> data;

	private Paging paging;

	public ResultList(List<T> data, Integer currentPage, Integer pageSize, Integer totalResults) {
		this.data = data;
		this.paging = new Paging(currentPage, pageSize, totalResults);
	}

	public List<T> getData() {
		return data;
	}

	public Paging getPaging() {
		return paging;
	}
}
