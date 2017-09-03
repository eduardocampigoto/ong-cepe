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
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.entity.pessoa.PessoaFactory;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.PessoaService;

@Path("/pessoa")
public class PessoaRest extends ObjMapper {
	private PessoaService pessoaService;

	public PessoaRest() {
		
	}

	/**
	 * @param pessoaStr
	 *            - Json da entidade pessoa.
	 * **/
	@POST
	@Consumes("application/*")
	public ResponseBuilder adicionar(String pessoaStr) throws GlobalException {
		try {
			PessoaFactory pessoaFactory =  new PessoaFactory(pessoaStr); 
			Pessoa pessoa = (Pessoa) pessoaFactory.getPessoa();
			new PessoaService(pessoa).adicionar();
			return Response.status(1);
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("deu erro ", e);
		}
		return null;
	}

	@GET
	@Path("/nome/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
<<<<<<< HEAD
	//public String pesquisarNome(@PathParam("nome") String nome) { // tipo string ? nao deveria ser response ? ta em um loop ferrado 

	public String pesquisarNome(@PathParam("nome") String nome) {
=======
	public String pesquisarNome(@PathParam("nome") String nome) throws GlobalException {
>>>>>>> a9354373a741748cee67a9016d3288c71bb0f417
		try {
			return getJson(pessoaService.pesquisarNome(nome));
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a consulta por nome");
		}
	}

	@PUT
	@Consumes("application/*")
	public void alterar(String pessoaStr) throws GlobalException { 
		try {
			PessoaFactory pessoaFactory =  new PessoaFactory(pessoaStr); 
			Pessoa pessoa = (Pessoa) pessoaFactory.getPessoa();
			new PessoaService(pessoa).alterar();
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a alteração do usuário");
		}
	}

	@DELETE
	@Path("id")
	public ResponseBuilder excluir(@PathParam("id") int id) throws Exception {
		try{
		pessoaService.excluir(id);
		}catch(Throwable e){
			e.printStackTrace();
			throw new Exception("Erro ao deletar usuário");
		}
		return null;
	}

}