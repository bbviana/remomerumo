package br.com.remomeurumo;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;

/**
 * @author jardim
 */
@Entity
public class AvaliacaoClinica extends BaseEntity {

	private static final long serialVersionUID = 1L;

	private String nome;

	private String data;

	private String comentario;
	
	@ManyToOne(targetEntity = TipoAtividade.class)
	@JoinTable(name = "AvaliacaoInfoClinica")
	private Collection<InfoClinica> infoClinicas;
	
	@ManyToOne(targetEntity = Aluno.class)
	@JoinColumn(name = "alunoid")
	private Aluno aluno;

	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Collection<InfoClinica> getInfoClinicas() {
		return infoClinicas;
	}

	public void setInfoClinicas(Collection<InfoClinica> infoClinicas) {
		this.infoClinicas = infoClinicas;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}
	
}
