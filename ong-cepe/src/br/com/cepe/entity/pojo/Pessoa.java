/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.entity.pojo;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.cepe.datatypes.Status;
import br.com.cepe.datatypes.Tipo;

@Entity
public class Pessoa {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;

private Tipo tipo;
private Status status;

private String nome;
private String email;
private Long foneFixo;
private Long foneMovel;
private String responsavel;

private Long cep;
private String rua;
private int numero;
private String bairro;
@ManyToOne( cascade = {CascadeType.PERSIST, CascadeType.MERGE})
private Cidade cidade;
private String complemento;


public Tipo getTipo() {
	return tipo;
}
public void setTipo(Tipo tipo) {
	this.tipo = tipo;
}

public Status getStatus() {
	return status;
}
public void setStatus(Status status) {
	this.status = status;
}

public String getNome() {
	return nome;
}
public void setNome(String nome) {
	this.nome = nome;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public Long getFoneFixo() {
	return foneFixo;
}
public void setFoneFixo(Long foneFixo) {
	this.foneFixo = foneFixo;
}
public Long getFoneMovel() {
	return foneMovel;
}
public void setFoneMovel(Long foneMovel) {
	this.foneMovel = foneMovel;
}
public String getResponsavel() {
	return responsavel;
}
public void setResponsavel(String responsavel) {
	this.responsavel = responsavel;
}
public Long getCep() {
	return cep;
}
public void setCep(Long cep) {
	this.cep = cep;
}
public String getRua() {
	return rua;
}
public void setRua(String rua) {
	this.rua = rua;
}
public int getNumero() {
	return numero;
}
public void setNumero(int numero) {
	this.numero = numero;
}
public String getBairro() {
	return bairro;
}
public void setBairro(String bairro) {
	this.bairro = bairro;
}
public Cidade getCidade() {
	return cidade;
}
public void setCidade(Cidade cidade) {
	this.cidade = cidade;
}
public String getComplemento() {
	return complemento;
}
public void setComplemento(String complemento) {
	this.complemento = complemento;
}


}