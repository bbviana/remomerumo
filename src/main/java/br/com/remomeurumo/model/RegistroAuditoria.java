package br.com.remomeurumo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFilter;

import br.com.remomeurumo.framework.BaseEntity;

/**
 * @author jardim
 */
@Entity
public class RegistroAuditoria extends BaseEntity {

	private String nome;

	private Long idEntidade;

	@Column(name= "registro", length=2048)
	private String registro;
	
	private String dataRegistro;

	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "usuarioid")
	private Usuario usuario;

	private String tipoOperacao;

	public String getNome() {
		return nome;
	}

	public void setNome(String entidade) {
		this.nome = entidade;
	}

	public Long getIdEntidade() {
		return idEntidade;
	}

	public void setIdEntidade(Long idEntidade) {
		this.idEntidade = idEntidade;
	}

	public String getRegistro() {
		return registro;
	}

	public void setRegistro(String registro) {
		this.registro = registro;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public String getTipoOperacao() {
		return tipoOperacao;
	}

	public void setTipoOperacao(String tipoOperacao) {
		this.tipoOperacao = tipoOperacao;
	}

	public String getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(String dataRegistro) {
		this.dataRegistro = dataRegistro;
	}
	
	@Transient
	public String getDataRegistroFormatada() {
		if(this.dataRegistro!=null && this.dataRegistro.indexOf("T")> 0){
			//2016-05-04T15:00:00.000Z
			return this.dataRegistro.substring(0, this.dataRegistro.indexOf("T"));
		}
		return "";
	}
	

}
