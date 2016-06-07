package br.com.remomeurumo.model;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import br.com.remomeurumo.framework.BaseEntity;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * @author jardim
 */
@Entity
public class ModeloAvaliacaoClinica extends BaseEntity {

	private String nome;

	private String descricao;

	@JsonFilter("associationFilter")
	@ManyToMany
	@JoinTable(name = "ModeloAvalTipoInfoClinica")
	private Collection<TipoInfoClinica> tipoInfoClinicas;
	
	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "especialidadeid")
	private EspecialidadeClinica especialidade;

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

	public Collection<TipoInfoClinica> getTipoInfoClinicas() {
		return tipoInfoClinicas;
	}

	public void setTipoInfoClinicas(Collection<TipoInfoClinica> tipoInfoClinicas) {
		this.tipoInfoClinicas = tipoInfoClinicas;
	}
	
	public EspecialidadeClinica getEspecialidade() {
		return especialidade;
	}

	public void setEspecialidade(EspecialidadeClinica especialidade) {
		this.especialidade = especialidade;
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

	private static final long serialVersionUID = 1L;
}
