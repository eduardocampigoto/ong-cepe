package br.com.cepe.datatype;

public enum HOperator implements DataType{
	EQUALS(0), DIFFERENT(1), LIKE(2), CONTAINS(3), INITS_WITH(4), TERMINATES_WITH(5);
	
	public int index;
	HOperator(int index){
		this.index = index;
	}
	
	public int getIndex() {
		return this.index;
	}

}
