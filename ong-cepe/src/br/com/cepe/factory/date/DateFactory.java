/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.date;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import br.com.cepe.datatype.DataFmt;

public class DateFactory {


	public Date getData(DataFmt fmt, Date data){
		try {
			String dataStr = data.toString();
			SimpleDateFormat formato = new SimpleDateFormat(getFmt(fmt));
			formato.setTimeZone(TimeZone.getTimeZone("America/Sao_Paulo"));
			Date formatada = formato.parse(dataStr);
			
			return formatada;
			
		} catch (ParseException e) {			
			e.printStackTrace();			
		}
		return null;
		
	}
	
	public String getFmt(DataFmt dthrBr) {
		String[] fmts = { "dd/MM/yyyy", "yyyy-MM-dd", "dd/MM/yyyy HH:mm:ss", 
						"yyyy-MM-dd HH:mm:ss","HH:mm","HH:mm:ss" };
		return fmts[dthrBr.getIndex()];
	}
	

}
