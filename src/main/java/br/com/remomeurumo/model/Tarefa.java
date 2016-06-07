package br.com.remomeurumo.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFilter;

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

	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "tipoid")
	private TipoAtividade tipoAtividade;
	
	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "tarefaPaiid")
	private Tarefa tarefaPai;
	
	@JsonFilter("associationFilter")
	@OneToMany(mappedBy = "tarefaPai")
	private Collection<Tarefa> tarefasFilhas;
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	@Transient
	public String getNomeCompleto() {
		if(tarefaPai!=null)
			return tarefaPai.getNome() + " - " + nome;
		return nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	public TipoAtividade getTipoAtividade() {
		return tipoAtividade;
	}

	public void setTipoAtividade(TipoAtividade tipoAtividade) {
		this.tipoAtividade = tipoAtividade;
	}

	public Tarefa getTarefaPai() {
		return tarefaPai;
	}

	public void setTarefaPai(Tarefa tarefaPai) {
		this.tarefaPai = tarefaPai;
	}
	
	public Collection<Tarefa> getTarefasFilhas() {
		return tarefasFilhas;
	}

	public void setTarefasFilhas(Collection<Tarefa> tarefasFilhas) {
		this.tarefasFilhas = tarefasFilhas;
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

}