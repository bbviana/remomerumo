package br.com.remomeurumo.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import br.com.remomeurumo.framework.BaseEntity;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * @author jardim
 */
@Entity
public class AvaliacaoClinica extends BaseEntity {

	private String data;

	private String comentario;
	
	//TODO: ANexo a ficha clinica

	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "modeloid")
	private ModeloAvaliacaoClinica modelo;
	
	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "alunoid")
	private Aluno aluno;
	
	@ManyToOne
	private ArrayList<InfoClinica> informacoesClinicas;

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
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
	
	public ModeloAvaliacaoClinica getModelo() {
		return modelo;
	}

	public void setModelo(ModeloAvaliacaoClinica modelo) {
		this.modelo = modelo;
	}


	public ArrayList<InfoClinica> getInformacoesClinicas() {
		return informacoesClinicas;
	}

	public void setInformacoesClinicas(ArrayList<InfoClinica> informacoesClinicas) {
		this.informacoesClinicas = informacoesClinicas;
	}



	private static final long serialVersionUID = 1L;
}
