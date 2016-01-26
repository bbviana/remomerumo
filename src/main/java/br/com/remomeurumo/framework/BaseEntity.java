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
package br.com.remomeurumo.framework;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import br.com.remomeurumo.model.Auditavel;

/**
 * @author bbviana
 */
@MappedSuperclass
public abstract class BaseEntity implements Serializable, Comparable<BaseEntity>, Auditavel {

	@Id
	@GeneratedValue
	protected Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public boolean equals(Object obj) {
		return this.getId().equals(((BaseEntity)obj).getId());
	}
	
	@Override
	public int compareTo(BaseEntity o) {
		
		if(this.getId() > o.getId())
			return 1;
		else if (this.getId() < o.getId())
			return -1;
		
		return 0;
	}
	
	public String getAuditoria() {
		return String.valueOf(this.getId());
	}
	
	private static final long serialVersionUID = 1L;
}
