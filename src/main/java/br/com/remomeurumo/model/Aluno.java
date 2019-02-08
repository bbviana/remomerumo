package br.com.remomeurumo.model;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import br.com.remomeurumo.framework.AuditoriaService;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * @author bbviana
 */
@Entity
@EntityListeners(AuditoriaService.class)
public class Aluno extends Pessoa implements Serializable {

	private static final long serialVersionUID = 1L;

	private String matrAluno;
	
	@Column(name= "observacoes", length=2048)
	private String observacoes;

	private String dataDeIngresso;

	private String periodoEscolar;

	private String transporte;

	private String horarioTreino;
	
	@Column(name= "abc", length=2048)
	private String abc;
	
	private String urldocumentos;
	

	// TODO: FOTO
	// private String Foto;

	@JsonFilter("associationFilter")
	@ManyToMany
	@JoinTable(name = "AlunoResponsavel")
	private Collection<Responsavel> responsaveis;

	@JsonFilter("associationFilter")
	@OneToMany(mappedBy = "aluno")
	private Collection<AlunoAtividade> alunoAtividades;

	@JsonFilter("associationFilter")
	@OneToMany(mappedBy = "aluno")
	private Collection<AvaliacaoClinica> avaliacoes;

	@Transient
	private Collection<AvaliacaoClinica> avaliacoesTransient;

	@Transient
	private Collection<AlunoAtividade> alunoAtividadesTransient;

	@Override
	public String toString() {
		return reflectionToString(this, SHORT_PREFIX_STYLE);
	}

	public Collection<Responsavel> getResponsaveis() {
		return responsaveis;
	}

	public void setResponsaveis(Collection<Responsavel> responsaveis) {
		this.responsaveis = responsaveis;
	}

	public Collection<AlunoAtividade> getAlunoAtividades() {
		return alunoAtividades;
	}

	public void setAlunoAtividades(Collection<AlunoAtividade> alunoAtividades) {
		this.alunoAtividades = alunoAtividades;
	}

	public void setMatrAluno(String matrAluno) {
		this.matrAluno = matrAluno;
	}

	public String getMatrAluno() {
		return matrAluno;
	}

	public String getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}

	public Collection<AvaliacaoClinica> getAvaliacoes() {
		return avaliacoes;
	}

	public void setAvaliacoes(Collection<AvaliacaoClinica> avaliacoes) {
		this.avaliacoes = avaliacoes;
	}

	public Collection<AvaliacaoClinica> getAvaliacoesTransient() {
		return avaliacoesTransient;
	}

	public void setAvaliacoesTransient(
			Collection<AvaliacaoClinica> avaliacoesTransient) {
		this.avaliacoesTransient = avaliacoesTransient;
	}

	public Collection<AlunoAtividade> getAlunoAtividadesTransient() {
		return alunoAtividadesTransient;
	}

	public void setAlunoAtividadesTransient(
			Collection<AlunoAtividade> alunoAtividadesTransient) {
		this.alunoAtividadesTransient = alunoAtividadesTransient;
	}

	public String getDataDeIngresso() {
		return dataDeIngresso;
	}

	public void setDataDeIngresso(String dataDeIngresso) {
		this.dataDeIngresso = dataDeIngresso;
	}

	public String getPeriodoEscolar() {
		return periodoEscolar;
	}

	public void setPeriodoEscolar(String periodoEscolar) {
		this.periodoEscolar = periodoEscolar;
	}

	public String getTransporte() {
		return transporte;
	}

	public void setTransporte(String transporte) {
		this.transporte = transporte;
	}

	public String getHorarioTreino() {
		return horarioTreino;
	}

	public void setHorarioTreino(String horarioTreino) {
		this.horarioTreino = horarioTreino;
	}

	public String getAbc() {
		return abc;
	}

	public void setAbc(String abc) {
		this.abc = abc;
	}
	
	public String getUrldocumentos() {
		return urldocumentos;
	}

	public void setUrldocumentos(String urldocumentos) {
		this.urldocumentos = urldocumentos;
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

		returnString.add("MatrAluno");
		returnString.add("Observacoes");
		returnString.add("DataDeIngresso");
		returnString.add("PeriodoEscolar");
		returnString.add("Transporte");
		returnString.add("HorarioTreino");
		returnString.add("Abc");		
		returnString.add("Urldocumentos");
				
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

		returnString.add(this.getMatrAluno());
		returnString.add(this.getObservacoes());
		returnString.add(this.getDataDeIngresso());
		returnString.add(this.getPeriodoEscolar());
		returnString.add(this.getTransporte());
		returnString.add(this.getHorarioTreino());
		returnString.add(this.getAbc());
		returnString.add(this.getUrldocumentos());
		

		return returnString.toArray();
	}

}