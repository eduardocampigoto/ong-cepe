/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.hql;

import br.com.cepe.datatype.HOperator;
import br.com.cepe.exception.GlobalException;

public class HqlFactory {
private String select;
private HOperator operacao;
private String valor;
private String entity;

	public HqlFactory()	throws GlobalException {
	}
	
	public String getSelect(String entity, String campo){
		this.entity = entity;
		String select = "SELECT e FROM "+entity+" e WHERE "+campo+" ";
		return select;
	}
	
	public String getQuery(String select, HOperator operacao, String valor) throws GlobalException{
		this.select = select;
		this.operacao = operacao;
		this.valor = valor;
		String query = null;
		
		if (!select.equals(null) && operacao != null && !valor.equals(null) && !valor.equals("*"))
			query=setQuery();		
		else if (valor.equals("*"))
			query= "SELECT e FROM "+entity+" e ";
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	
	public String getQuery(String select, HOperator operacao, int num) throws GlobalException{
		this.select = select;
		this.operacao = operacao;
		String query = null;
		if(num != 0)
			this.valor = Integer.toString(num);
		
		if (!select.equals(null) && operacao != null && valor != null)
			query=setQuery();		
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	
	private String setQuery() throws GlobalException{
		String iniPercent = "'%";
		String fimPercent = "%'";
		
		if(this.operacao.equals(HOperator.EQUALS))
			return this.select+" = "+this.valor;		
		else if(this.operacao.equals(HOperator.DIFFERENT))
			return this.select+" != "+this.valor;
		else if(this.operacao.equals(HOperator.CONTAINS))
			return this.select+" LIKE "+iniPercent+this.valor+fimPercent;		
		else if(this.operacao.equals(HOperator.INITS_WITH))
			return this.select+" LIKE "+this.valor+fimPercent;		
		else if(this.operacao.equals(HOperator.TERMINATES_WITH))
			return this.select+" LIKE "+iniPercent+this.valor;	

		return null;
	}
	
	

}
