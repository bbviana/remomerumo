package br.com.remomeurumo.model;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;

import br.com.remomeurumo.framework.BaseEntity;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * @author jardim
 */
@Entity
public class Permissao extends BaseEntity {
	private String nome;

	private String descricao;

	@JsonFilter("associationFilter")
	@ManyToMany(mappedBy="permissoes")
	private Collection<Usuario> usuarios;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Collection<Usuario> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(Collection<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

}
