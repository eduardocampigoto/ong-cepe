$(document).ready(function(){
	conspesfisi=function(){
		
	    var valorBusca=$("#conspesf").val();
	  	
	    buscapefisica(undefined,valorBusca);
	}		
	
	buscapefisica = function(listPesF, busca){
		
		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += "<thead class='table table-striped '>"+
					"<tr>" +
						"<p> Pessoas </p>  </br>"+ 
						"<th> Nome </th> " +
						"<th> Sobrenome </th>" +
						"<th> Cpf </th>" + 
						"<th> Rg </th>" + 
						"<th> DataNascimento </th>" + 
						"<th> Contato Responsavel </th>" +
						"<th> E-mail </th>" +
						"<th> Tel Responsavel </th>" +
						"<th> Tel Comercial </th>" +
						"<th> E-mail </th>" +
						"<th> Responsavel </th>" +
						"<th> Estado </th>" +
						"<th> Cidade </th>" +
						"<th> Bairro </th>" +
						"<th> Rua </th>" +
						"<th> Complemento </th>" +
						"<th> Número </th>" +
						"<th> Editar</th>"+
						"<th> Excluir</th>"+
					"</tr>" +
				"</thead>";			

		if(listPesF != undefined && listPesF.length > 0 && listPesF[0].id != undefined){
			  
			  	for(var i = 0; i < listPesF.length; i++){

					html += "<tr>";
						html += "<td>" + listPesF[i].nome + "</td>";
						html += "<td>" + listPesF[i].sobrenome + "</td>";
						html += "<td>" + listPesF[i].cpf + "</td>";
						html += "<td>" + listPesF[i].rg + "</td>";
						html += "<td>" + listPesF[i].datanascimento + "</td>";
						html += "<td>" + listPesF[i].telresponsavel + "</td>";
						html += "<td>" + listPesF[i].telcomercial + "</td>";
					    html += "<td>" + listPesF[i].email + "</td>";
						html += "<td>" + listPesF[i].responsavel + "</td>";
						html += "<td>" + listPesF[i].estado + "</td>";
						html += "<td>" + listPesF[i].cidade + "</td>";
						html += "<td>" + listPesF[i].bairro + "</td>";
						html += "<td>" + listPesF[i].rua + "</td>";
						html += "<td>" + listPesF[i].complemento + "</td>";
						html += "<td>" + listPesF[i].numero + "</td>";

						html += "<td>";

							html += "<button type='button' class='btn btn-pencil' onclick='buscID("+listPesF[i].id+")'>Editar</button>"
						html += "</td>";

						html += "<td>";

							html += "<button type='button'class='btn btn-trash' onclick='confExcluir("+listPesF[i].id+")'>Excluir</button>"
						html += "</td>";
					html += "</tr>";  
			    }
		}else{
			    if(listPesF == undefined || (listPesF != undefined && listPesF.length > 0)){
					if(busca == ""){						
						busca = null;
					}

					var valorLista = $("#conspesf").val();

					var cfg ={
							
						url:  "../rest/pessoa/nome/" + valorLista,
						
						success: function(listPesF,busca){
													
							buscapefisica(listPesF,busca);
						},
						error: function(err){				
							
							bootbox.alert("Erro ao Buscar Pessoa, entrar em contato com o Administrador se o problema persistir!");
						}
					};
					
					ONG.ajax.get(cfg);
				}else{					
					html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
				}
		  }
		  
		  html +="</table>";
		  $("#resupesfis").html(html);
	}
	
	buscapefisica(undefined, "");

	cadpesfisica = function(){

		var msg = "";
		var exp = "";

		msg+=validador("Nome: ", $("#nome").val());
		msg+=validador("Sobrenome: ", $("#sobrenome").val());
		msg+=validador("Cpf: ", $("#cpf").val());
		msg+=validador("Rg: ", $("#rg").val());
		msg+=validador("Data nascimento: ", $("#datanascimento").val());
		msg+=validador("Email: ", $("#email").val());
		msg+=validador("Telefone Residencial: ", $("#telresidenci").val());
		msg+=validador("Telefone Comercial: ", $("#telcomercial").val());
		msg+=validador("Responsavel: ", $("#responsavel").val());
		msg+=validador("Estado: ", $("#estado").val());
		msg+=validador("Cidade: ", $("#cidade").val());
		msg+=validador("Bairro: ", $("#bairro").val());
		msg+=validador("Rua: ", $("#rua").val());
		msg+=validador("Complemento: ", $("#complemento").val());
		msg+=validador("Numero: ", $("#numero").val());

		if(msg == null){

			if($("#email").val().indexOf("@") == -1 || //valida se existe o @
                $("#email").val().indexOf(".") == -1 || //valida se existe o .
                $("#email").val().indexOf("@") == 0 || //valida se tem texto antes do @
                $("#email").val().lastIndexOf(".") + 1 == email.length || //valida se tem texto depois do ponto
                ($("#email").val().indexOf("@") + 1 == $("#email").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                    
                exp+="E-mail invalido" +"</br>"
                + "ex: teste_@teste.com.br"
                document.getElementById("email").focus();
            }
            if(!$("#cpf").val().match(/^\d{10,11}$/)){
            	exp+="Cpf invalido ! </br> " + "</br>";
            }
            if(!$("#rg").val().match(/^\d{7,9}$/)){
            	exp+="RG invalido ! </br> " + "</br>";
            }
            if(!$("#telresidenci").val().match(/^\d{10,13}$/)){    
                exp+="Telefone Residencial invalido ! </br> " + "</br>";
            }
            if(!$("#telcomercial").val().match(/^\d{10,13}$/)){    
                exp+="Telefone Comercial invalido ! </br> " + "</br>";
            }
        
            /*if(!$("#cep").val().match(/^[0-9]{8}$/)){
                exp+=" Cep invalido por gentileza informar cep correto" + "<br>"+ "<br>";
            }  
            if(!$("#renda").val().match(/^[0-9]{0,15}[,]{0,1}[0-9]{0,4}$/)){
                exp+=" Gentileza informar a renda em formato numerico " + "<br>" + "<br>";
            } */
            
			if(exp==""){

            	var dadosPesFis= new Object();
            	
            	dadosPesFis.nome=$("#nome").val();
            	dadosPesFis.sobreNome=$("#sobreNome").val();
            	dadosPesFis.cpf=$("#cpf").val();
            	dadosPesFis.rg=$("#rg").val();
            	dadosPesFis.dt_nasc=$("#datanascimento").val();
            	dadosPesFis.email=$("#email").val();
            	dadosPesFis.fone_res=$("#telresidenci").val();
            	dadosPesFis.fone_cel=$("#telcomercial").val();
            	dadosPesFis.estado=$("#estado").val();
            	dadosPesFis.cidade=$("#cidade").val()
            	dadosPesFis.rua=$("#rua").val();
            	dadosPesFis.complemento=$("#complemento").val();
            	dadosPesFis.numero=$("#numero").val();
            	
            	dadosPesFis.cep=$("#cep").val(); 
            	
        	    enviaServidor(dadosPesFis);
            }else{
                bootbox.alert(expressao);
            }
        }else{
            bootbox.alert("Caro usuário, gentileza verificar os seguintes campos: <br> " + msg);
        }
	}
	validador=function(campo, valor){

        var msg = "";

        if(valor == null ||  valor.trim() == ""){
            msg += "- " + campo + " Está Vazio. </br>";
        }
        return msg;
    };
    enviaServidor = function(){

    	var cfg = {
							
			url: ONG.contextPath+" sem url",
			
			success: function(listPesj,busca){
										
				buscapesJuridica(listPesj,busca);
			},
			error: function(err){				
				
				bootbox.alert("Erro ao Buscar Pessoa, entrar em contato com o Administrador se o problema persistir!");
			}
		};					
		ajax.get(cfg);
    }
});