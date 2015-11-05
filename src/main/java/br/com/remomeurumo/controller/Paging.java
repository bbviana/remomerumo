/*
 * Copyright (c) 1999-2010 Touch Tecnologia e Informatica Ltda.
 *
 * R. Gomes de Carvalho, 1666, 3o. Andar, Vila Olimpia, Sao Paulo, SP, Brasil.
 *
 * Todos os direitos reservados.
 * Este software e confidencial e de propriedade da Touch Tecnologia e Informatica Ltda. (Informacao Confidencial)
 * As informacoes contidas neste arquivo nao podem ser publicadas, e seu uso esta limitado de acordo
 * com os termos do contrato de licenca.
 */
package br.com.remomeurumo.controller;

import static com.google.common.base.Objects.firstNonNull;

/**
 * @author bbviana
 */
public class Paging {
	public static final Integer DEFAULT_PAGE_SIZE = 100;

	private Integer pageSize;

	private Integer totalResults;

	private Integer totalPages;

	private Integer currentPage;

	public Paging(Integer currentPage, Integer pageSize, Integer totalResults) {
		this.currentPage = firstNonNull(currentPage, 1);
		this.pageSize = firstNonNull(pageSize, DEFAULT_PAGE_SIZE);
		this.totalResults = totalResults;
		this.totalPages = (int) Math.ceil((double) this.totalResults / this.pageSize);
	}

	public Integer getCurrentPage() {
		return currentPage;
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
