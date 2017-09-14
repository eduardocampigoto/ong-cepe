$(document).ready(function(){
	buscapessojuridica=function(){
		
	    var busca=$("#conspj").val();
	  	
	    buscapesJuridica(undefined,busca);
	}		
	
	buscapesJuridica = function(listPesj, busca){
				
		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += 

			"<thead class='table table-striped '>" +
				"<tr>" +
					
					"<th> Cnpj </th>" + 
					"<th> Razão Social </th> " +
					"<th> E-mail </th>" +
					"<th> Telefone contato </th>" +
					"<th> Cep </th>" +
					/*"<th> Estado </th>" +
					"<th> Cidade </th>" +*/
					"<th> Rua </th>" +
					"<th> Complemento </th>" +
					"<th> Número </th>" +
					"<th> Ações</th>" +
				"</tr>" +
			"</thead>";					
		
		    if(listPesj != undefined && listPesj.length > 0 && listPesj[0].id != undefined){
			  
			  	for(var i = 0; i < listPesj.length; i++){

					html += "<tr>";					
						html += "<td>" + listPesj[i].cnpj + "</td>";
						html += "<td>" + listPesj[i].nome + "</td>";
						html += "<td>" + listPesj[i].email + "</td>";
						
						if(listPesj[i].foneFixo != null && listPesj[i].foneMovel != null){
							html += "<td>"+	 
										listPesj[i].foneFixo + " - " + listPesj[i].foneMovel +										
									"</td>";
						}else if(listPesj[i].foneFixo != null && listPesj[i].foneMovel == null){
							html += "<td>"+
										listPesj[i].foneFixo+
									"</td>"
						}else if( listPesj[i].foneMovel != null && listPesj[i].foneFixo == null){
							html += "<td>"+
										listPesj[i].foneMovel+
									"</td>"
						}
						
						html += "<td>" + listPesj[i].cep + "</td>";
						/*html += "<td>" + listPesj[i].estado + "</td>";
						html += "<td>" + listPesj[i].cidade + "</td>";*/
						html += "<td>" + listPesj[i].rua + "</td>";
						html += "<td>" + listPesj[i].complemento + "</td>";
						html += "<td>" + listPesj[i].numero + "</td>";

						html += "<td>"+
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='buscID("+listPesj[i].id+")'>Editar</button>"+ " " + " " +
									"<button type='button'class='btn btn-trash' onclick='confExcluir("+listPesj[i].id+")'>Excluir</button>"+
								"</td>";						
						html += "</tr>";  
			    }
		    }else{
			    if(listPesj == undefined || (listPesj != undefined && listPesj.length > 0)){

					if(busca == ""){						
						busca = null;
					}
					var tipo = 2;
					var cfg = {
							
						url: ONG.contextPath + "/rest/pessoa/tipo/" + tipo,
						
						success: function(listPesj,busca){													
							buscapesJuridica(listPesj,busca);
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
		$("#resupesjuridica").html(html);
	}
	
	buscapesJuridica(undefined, "");

	cadspesjuridica = function(){
		alert('cadastro');
		var msg  = "";
		var exp = "";
		
		msg += validaVazio("Razao Social: ", $("#razsocial").val());
		msg += validaVazio("Responsavel: ", $("#responsavel").val());
		msg += validaVazio("Cnpj: ", $("#cnpj").val());
		msg += validaVazio("Email: ", $("#email").val());
		msg += validaVazio("Telefone Fixo: ", $("#telfixo").val());
		//msg += validaVazio("Telefone Movel: ", $("#telmovel").val());
		//msg += validaVazio("Estado: ", $("#estado").val());
		//msg += validaVazio("Cidade: ", $("#cidade").val());
		msg += validaVazio("Bairro: ", $("#bairro").val());
		msg += validaVazio("Rua: ", $("#rua").val());
		msg += validaVazio("Complemento: ", $("#complemento").val());
		msg += validaVazio("Numero: ", $("#numero").val());

		if(msg == ""){

			if($("#email").val().indexOf("@") == -1 || //valida se existe o @
                $("#email").val().indexOf(".") == -1 || //valida se existe o .
                $("#email").val().indexOf("@") == 0 || //valida se tem texto antes do @
                $("#email").val().lastIndexOf(".") + 1 == email.length || //valida se tem texto depois do ponto
                ($("#email").val().indexOf("@") + 1 == $("#email").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                    
                exp+="E-mail invalido" +"</br>"
                + "ex: teste_@teste.com.br"
                document.getElementById("email").focus();
            }
            if(!$("#cnpj").val().match(/^\d{14,15}$/)){
            	exp+="CNPJ invalido ! </br> " + "</br>";
            }
            if(!$("#telfixo").val().match(/^\d{10,13}$/)){    
                exp+="Telefone Fixo invalido ! </br> " + "</br>";
            }
            
            if(exp==""){

            	var dadosPJ= new Object();
            	
            	dadosPJ.nome=$("#razsocial").val();
            	dadosPJ.tipo=2;
            	dadosPJ.status=5;
            	//dadosPesFis.responsavel=$("#responsavel").val();
            	dadosPJ.cnpj=$("#cnpj").val();
            	dadosPJ.email=$("#email").val();
            	dadosPJ.dt_nasc=$("#datanascimento").val();
            	dadosPJ.foneFixo=$("#telfixo").val();
            	dadosPJ.foneMovel=$("#telmovel").val();
            	dadosPJ.estado=$("#estado").val();
            	dadosPJ.cidade=$("#cidade").val()
            	dadosPJ.rua=$("#rua").val();
            	dadosPJ.complemento=$("#complemento").val();
            	dadosPJ.numero=$("#numero").val();
            	dadosPJ.cep=$("#cep").val(); 

            	var cfg = {
        			url: ONG.contextPath +"/rest/pessoa/",
        			data: dadosPJ,
        			success: function(msg){		
        				bootbox.alert("Realizado cadastro com sucesso ");
        			},
        			error: function(err){								
        				bootbox.alert("Erro ao realizar cadastro, entrar em contato com o Administrador se o problema persistir!");
        			}
        		};					
        		ONG.ajax.post(cfg);
            }else{
                bootbox.alert(exp);
            }
        }else{
            bootbox.alert("Caro usuário, gentileza verificar os seguintes campos: <br> " + msg);
        }
	}
	
	//  ====-----------------
	
	validaVazio = function ( campo, valor ) {
		
        var msg = "";

        if(valor == null ||  valor.trim() == ""){
            msg += "- " + campo + " Está Vazio. </br>";
        }
        return msg;
    };

    // ------------------------

    buscID = function( id ){

    	$.ajax({
			  
			url: ONG.contextPath + "/rest/pessoa/id/" + id,
				  
			success:function(dados){

				console.log(dados);
			},
			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário ");
			}
		});
    }
});