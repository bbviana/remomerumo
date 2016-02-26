package br.com.remomeurumo.model;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import br.com.remomeurumo.framework.BaseEntity;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * @author jardim
 */
@Entity
public class Atividade extends BaseEntity {

	private String data;

	private String nome;

	private String comentario;
	
	private Boolean executada;

	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "tipoid")
	private TipoAtividade tipoAtividade;

	@JsonFilter("associationFilter")
	@OneToMany(mappedBy = "atividade", orphanRemoval = true)
	private Collection<AlunoAtividade> alunos;

	@OneToMany(mappedBy = "atividade")
	private Collection<AtividadeGrupo> atividadeGrupos;
	
	@Transient
	private Collection<AtividadeGrupo> atividadeGruposTransient;

	@Override
	public String toString() {
		return reflectionToString(this, SHORT_PREFIX_STYLE);
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Collection<AlunoAtividade> getAlunos() {
		return alunos;
	}

	public void setAlunos(Collection<AlunoAtividade> alunos) {
		this.alunos = alunos;
	}

	public TipoAtividade getTipoAtividade() {
		return tipoAtividade;
	}

	public void setTipoAtividade(TipoAtividade tipoAtividade) {
		this.tipoAtividade = tipoAtividade;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Collection<AtividadeGrupo> getAtividadeGrupos() {
		return atividadeGrupos;
	}

	public void setAtividadeGrupos(
			Collection<AtividadeGrupo> atividadeGrupos) {
		this.atividadeGrupos = atividadeGrupos;
	}
	
	public Boolean getExecutada() {
		return executada;
	}

	public void setExecutada(Boolean executada) {
		this.executada = executada;
	}

	public Collection<AtividadeGrupo> getAtividadeGruposTransient() {
		return atividadeGruposTransient;
	}

	public void setAtividadeGruposTransient(
			Collection<AtividadeGrupo> atividadeGruposTransient) {
		this.atividadeGruposTransient = atividadeGruposTransient;
	}


	private static final long serialVersionUID = 1L;
}
