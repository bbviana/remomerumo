package br.com.remomeurumo.model;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

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
	
	@Transient
	public Object[] csvHead() {
		
		ArrayList<String> returnString = new ArrayList<String>();
		
		returnString.add("id");
		returnString.add("Nome");
		returnString.add("Apelido");
		returnString.add("NaturalDe");
		returnString.add("DtNasc");
		returnString.add("Cpf");
		returnString.add("Rg");
		returnString.add("Endereco");
		returnString.add("Telefone");
		returnString.add("Celular");
		returnString.add("Email");
		returnString.add("Sapato");
		returnString.add("Bermuda");
		returnString.add("Camiseta");
				
		return returnString.toArray();
	}

	@Transient
	public Object[] csv() {

		ArrayList<String> returnString = new ArrayList<String>();

		returnString.add(String.valueOf(this.getId()));
		returnString.add(this.getNome());
		returnString.add(this.getApelido());
		returnString.add(this.getNaturalDe());
		returnString.add(this.getDtNasc());
		returnString.add(this.getCpf());
		returnString.add(this.getRg());
		returnString.add(this.getEndereco());
		returnString.add(this.getTelefone());
		returnString.add(this.getCelular());
		returnString.add(this.getEmail());
		returnString.add(this.getSapato());
		returnString.add(this.getBermuda());
		returnString.add(this.getCamiseta());

		return returnString.toArray();
	}

	private static final long serialVersionUID = 1L;
}
