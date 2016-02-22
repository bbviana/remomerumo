package br.com.remomeurumo.model;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * @author jardim
 */
@Entity
public class Colaborador extends Pessoa implements Serializable {

	private String areaColaborador;

	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "responsavelid")
	private Colaborador responsavel;
	
	@ManyToMany
	@JoinTable(name = "ColaboradorAtividade")
	private Collection<Atividade> atividades;

	@Override
	public String toString() {
		return reflectionToString(this, SHORT_PREFIX_STYLE);
	}

	public Collection<Atividade> getAtividades() {
		return atividades;
	}

	public void setAtividade(Collection<Atividade> atividades) {
		this.atividades = atividades;
	}

	public String getAreaColaborador() {
		return areaColaborador;
	}

	public void setAreaColaborador(String areaColaborador) {
		this.areaColaborador = areaColaborador;
	}

	public Colaborador getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(Colaborador responsavel) {
		this.responsavel = responsavel;
	}

	private static final long serialVersionUID = 1L;
}
