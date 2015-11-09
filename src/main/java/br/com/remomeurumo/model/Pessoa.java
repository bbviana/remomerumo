package br.com.remomeurumo.model;

import br.com.remomeurumo.framework.BaseEntity;

import javax.persistence.MappedSuperclass;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

/**
 * @author jardim
 */
@MappedSuperclass
public class Pessoa extends BaseEntity {

	//Identficacoes
	private String nome;
	private String apelido;
	private String naturalDe;
	private String dtNasc;

	//Documentos
	private String cpf;
	private String rg;

	//Endereços
	private String endereco;
	private String telefone;
	private String celular;
	private String email;


	//Medidas
	private String sapato;
	private String bermuda;
	private String camiseta;


	//TODO: FOTO
	//private String Foto;

	@Override
	public String toString() {
		return reflectionToString(this, SHORT_PREFIX_STYLE);
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getApelido() {
		return apelido;
	}

	public void setApelido(String apelido) {
		this.apelido = apelido;
	}

	public String getNaturalDe() {
		return naturalDe;
	}

	public void setNaturalDe(String naturalDe) {
		this.naturalDe = naturalDe;
	}

	public String getDtNasc() {
		return dtNasc;
	}

	public void setDtNasc(String dtNasc) {
		this.dtNasc = dtNasc;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSapato() {
		return sapato;
	}

	public void setSapato(String sapato) {
		this.sapato = sapato;
	}

	public String getBermuda() {
		return bermuda;
	}

	public void setBermuda(String bermuda) {
		this.bermuda = bermuda;
	}

	public String getCamiseta() {
		return camiseta;
	}

	public void setCamiseta(String camiseta) {
		this.camiseta = camiseta;
	}

	private static final long serialVersionUID = 1L;
}
