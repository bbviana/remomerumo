package br.com.remomeurumo.model;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Transient;

import br.com.remomeurumo.framework.AuditoriaService;
import br.com.remomeurumo.framework.BaseEntity;

/**
 * @author jardim
 */
@Entity
@EntityListeners(AuditoriaService.class)
public class Tarefa extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private String nome;

	private String descricao;

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

	@Transient
	public Object[] csvHead() {

		ArrayList<String> returnString = new ArrayList<String>();

		returnString.add("id");
		returnString.add("Nome");
		returnString.add("Descricao");

		return returnString.toArray();
	}

	@Transient
	public Object[] csv() {

		ArrayList<String> returnString = new ArrayList<String>();

		returnString.add(String.valueOf(this.getId()));
		returnString.add(this.getNome());
		returnString.add(this.getDescricao());

		return returnString.toArray();
	}

}