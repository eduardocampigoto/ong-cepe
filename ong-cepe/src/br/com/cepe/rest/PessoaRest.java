/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.rest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.entity.pessoa.PessoaFactory;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.PessoaService;

@Path("/pessoa")
public class PessoaRest extends ObjMapper{
private PessoaService<?> pessoaService;

public PessoaRest(){

}


/**
 * @param pessoaStr - Json da entidade pessoa.
 * **/
@POST
@Consumes("application/*")
public void adicionar(String pessoaStr) throws GlobalException{
	try {
	Pessoa obj = getObject().readValue(pessoaStr, Pessoa.class);
	Pessoa pessoa = (Pessoa) new PessoaFactory<Pessoa>(obj).getPessoa();
	pessoaService = new PessoaService<Pessoa>(pessoa);
	pessoaService.adicionar();
		
	} catch (Throwable e) {
		e.printStackTrace();
	}
	
} 

@GET
<<<<<<< HEAD
@PathParam("/nome/{nome}")
@Produces({MediaType.APPLICATION_JSON})
public String pesquisarNome(@PathParam("nome") String nome){
	try {
=======
@Path("/pessoa/{nome}")
@Produces({MediaType.APPLICATION_JSON})
public StringBuilder pesquisarNome(@PathParam("nome")String nome){
	System.out.println("teste" + nome);

	try {
		
>>>>>>> 36aad5a92d348bbd1acff2e5f237c6a52fd50dea
		return getJson(pessoaService.pesquisarNome(nome));
		
	} catch (Throwable e) {
		e.printStackTrace();
	}

}

@PUT
@Consumes("application/*")
public void alterar(String pessoaStr) throws GlobalException{
	try {
		Pessoa obj = getObject().readValue(pessoaStr, Pessoa.class);
		Pessoa pessoa = (Pessoa) new PessoaFactory<Pessoa>(obj).getPessoa();
		pessoaService = new PessoaService<Pessoa>(pessoa);
		pessoaService.alterar();
	} catch (Throwable e) {
		e.printStackTrace();
	} 
}

@DELETE
@PathParam("id")
public void excluir(@PathParam("id") int id){
	pessoaService.excluir(id);
}


}
