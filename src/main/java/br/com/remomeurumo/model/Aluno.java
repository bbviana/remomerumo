package br.com.remomeurumo.model;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.io.Serializable;
import java.util.Collection;

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

	private String observacoes;

	private String dataDeIngresso;

	private String periodoEscolar;

	private String transporte;

	private String horarioTreino;

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

}