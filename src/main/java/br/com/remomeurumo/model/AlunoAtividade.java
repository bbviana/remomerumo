package br.com.remomeurumo.model;

import br.com.remomeurumo.framework.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

/**
 * @author jardim
 */
@Entity
public class AlunoAtividade extends BaseEntity {

	private String comentario;

	@ManyToOne
	@JoinColumn(name = "atividadeid")
	private Atividade atividade;

	@ManyToOne
	@JoinColumn(name = "alunoid")
	private Aluno aluno;

	@Override
	public String toString() {
		return reflectionToString(this, SHORT_PREFIX_STYLE);
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Atividade getAtividade() {
		return atividade;
	}

	public void setAtividade(Atividade atividade) {
		this.atividade = atividade;
	}

	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}

	private static final long serialVersionUID = 1L;
}
