ONG.modalidade = new Object();
$(document).ready(function(){
	$('#header').load('header.html');
	$('#footer').load('footer.html');
	
	ONG.modalidade.btnCadastrar = function() {
		$("#conteudo").load("formulario/modalidades/cad.html",function(){
			$( "#exibiList" ).hide();		
		});
		return false;
	};
	ONG.modalidade.btnCancelar = function() {
		$("#conteudo").load("private/aluno/gerenciar.html",function(){
			TARGUS.mask.maskUser();
		});
		return false;
	};
	$('#valorPesquisa').keypress(function(e) {
	    if(e.which == 13) 
	        	ONG.modalidade.pesquisar();
	});

	ONG.modalidade.pesquisar = function() {
		var valorPesquisa = $("#valorPesquisa").val();
		ONG.modalidade.exibirLista(undefined, valorPesquisa);
	};
	ONG.modalidade.exibirLista = function(lista, valorPesquisa){
		var html = "<table id='tabela'  class='table table-responsive custom-table-margin-b' >";
		html +=
					"<thead table table-striped>" +
						"<tr>" +
							"<th>Nome</th>" +
							"<th>Descrição</th>" +
							"<th>Tipo</th>" +
							"<th>Restrições</th>" +
							"<th>Observações</th>" +
							"<th class='actions col-md-2'>Ações</th>" +
						"</tr>" +
					"</thead>";
		html +=		"<tbody>";
		if(lista != undefined && lista.length > 0 && lista[0].id != undefined){
			for(var i=0; i<lista.length; i++){
				html += "<tr>"+
				"<td>"+lista[i].nome+"</td>"+
				"<td>"+lista[i].descricao+"</td>"+				
				"<td>"+lista[i].tipo+"</td>"+				
				"<td>"+lista[i].restricoes+"</td>"+				
				"<td>"+lista[i].observacoes+"</td>"+				
				"<td class='actions  text-center'>"+
				"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.modalidade.carregarModalidade("+lista[i].id+")'>Editar</button>"+ " " + " " +
				"<button type='button' class='btn btn-trash' onclick='ONG.modalidade.excluir("+ lista[i].id+ ")'>Excluir</button>"+
				"</td>"+
				"</tr>";
			}
		} else {
			if(lista == undefined || (lista != undefined && lista.length > 0)){
				if(valorPesquisa == ""){ valorPesquisa = "*"; }
				
				ONG.modalidadeRest.pesquisarNome({
					data : valorPesquisa,
					success : function(lista) {
						ONG.modalidade.exibirLista(lista);
					},
					error : function(err) {	console.log('err lista' ,err); } 
				});
			} else {
				html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
			}
		}
		html += "</tbody>";
		html +="</table>";
		$("#exibiList").html(html);
//		$('#tabela').tablesorter({
//			headers: { 			// (começa do zero)
//				4: {			// Desativa a ordenação para essa coluna 
//					sorter: false 
//				},
//			},
//		});
		//$('#tabela').tablesorter();
	};
	ONG.modalidade.exibirLista(undefined, "");

	ONG.modalidade.cadastrar = function(){

		var newCad = {
				nome: $("#nome").val(),
				descricao:$("#descricao").val(),
				restricoes:$("#restricoes").val(),
				tipo:$("#tipo").val(),
				observacoes:$("#observacoes").val(),
		};
		console.log('novo cadastro',newCad);
		if (ONG.modalidade.validar(newCad)) {
			
			ONG.modalidadeRest.inserir({
				data : newCad,
				success : function(msg) {
					console.log('success', msg);
					bootbox.alert(msg, function(){ 
						$(location).attr('href', ONG.contextPath+'/project/modalidades.html'); });
					
				},
				error : function(err) {
					console.log('err' ,err);
					bootbox.alert("Erro ao cadastrar: <br/>"	+ err.responseText);
				} 
			});
		}// IF
	};// CADASTRAR

	ONG.modalidade.excluir = function(id){
		bootbox.confirm("Deseja Excluir?", function(confirmed) {
			if(confirmed) {
				
				ONG.modalidadeRest.excluir({
					data : id,
					success : function(msg) {
						  console.log(msg);
						  ONG.modalidade.pesquisar();
					},
					error : function(err) {
						  console.log('err' ,err);
						  bootbox.alert(err.responseText);
					} 
				});
			}
		}); 
	};
	
	ONG.modalidade.carregarModalidade = function(id){
				ONG.modalidadeRest.pesquisarId({
					data : id,
					success : function(modalidadeEdit) {
						$("#idEdit").val(modalidadeEdit.id);
						$("#nomeEdit").val(modalidadeEdit.nome);
						$("#descricaoEdit").val(modalidadeEdit.descricao);
						$("#restricoesEdit").val(modalidadeEdit.restricoes);
						$("#tipoEdit").val(modalidadeEdit.tipo);
						$("#observacoesEdit").val(modalidadeEdit.observacoes);
					},
					error : function(err) {
						bootbox.alert("Erro ao exibir a edição: " + err.responseText);
					} 
				});
	};
	
	ONG.modalidade.editar = function(){
		var senha = btoa($("#senhaEdit").val());
		
		var EditCad = {
				id: $("#idEdit").val(),
				nome: $("#nomeEdit").val(),
				descricao:$("#descricaoEdit").val(),
				restricoes:$("#restricoesEdit").val(),
				tipo:$("#tipoEdit").val(),
				observacoes:$("#observacoesEdit").val(),
		};
		console.log('editar cadastro',EditCad);
		if (ONG.modalidade.validar(EditCad)) {
			ONG.modalidadeRest.editar({
				data : EditCad,
				success : function(msg) {
					bootbox.alert(msg, function(){ 
						debugger;
						ONG.modalidade.exibirLista(undefined, "");
						$('input').val('');
						$('#modaledit').modal('toggle');
					});				
				},
				error : function(err) {
					console.log('err' ,err);
					bootbox.alert("Erro ao editar: "	+ err.responseText);
				} 
			});
		}// IF		
	};

	ONG.modalidade.validar = function(modalidade) {
		var aux = "";


		if (modalidade.nome == "") {
			aux += "Nome é Obrigatório <br/>";
		}if (modalidade.descricao == "") {
			aux += "Descrição é Obrigatório <br/>";
		}if (modalidade.tipo == "" ) {
			aux += "Tipo é Obrigatório <br/>";
		}if (modalidade.restricoes == "" ) {
			aux += "Restrições é Obrigatório <br/>";
		}if (modalidade.observacoes ==""){
			aux += "Observações é Obrigatório <br/>";
		}
		
		
		if (aux != "") {
			bootbox.alert(aux)
			return false;
		}
		return true;
	};

});