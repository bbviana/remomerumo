package br.com.remomeurumo.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;

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

	public String getCSV() {

		StringBuilder returnString = new StringBuilder();

		returnString.append(this.getId());
		returnString.append("," + this.getNome());
		returnString.append("," + this.getDescricao());

		return returnString.toString();
	}

}