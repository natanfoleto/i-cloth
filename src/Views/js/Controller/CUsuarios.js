$(document).ready(() => {

    $('#form-search').submit((event) => {
        event.preventDefault();

        DesabilitarEdt();

        xmlHttpPost('../../../Ajax/Usuarios/GetUser', function() {
            beforeSend(function() {
                $('#div-table').html(`<center><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span></center>`);
            });
            
            success(() => {
                if(JSON.parse(xhttp.responseText == 404)) {
                    $('#div-table').html(`<center><h6>Nenhum usuário foi encontrado!</h6></center>`);
                } else {
                    var usuarios = JSON.parse(xhttp.responseText);
                    $('#div-table').html(GetTable(usuarios));
                    TableSelect();
                }
            });
    
            error(() => {
                
            });
    
        }, new FormData(document.querySelector("#form-search")));
    })

});

function GetTable(usuarios) {

    var table = `<table id="tableUser" class='table table-hover'>`;
    table += `<thead><tr><td class="text-center">ID</td><td>Nome</td><td>Email</td><td class="text-center">Inativo</td><td>Grupo Usuário</td></tr></thead>`;
    table += `<tbody>`;

    usuarios.forEach(function(usuario) {
        table += `<tr>`;
        table += `<td class="text-center">${usuario.idUsuario}</td>`;
        table += `<td>${usuario.nome}</td>`;
        table += `<td>${usuario.email}</td>`;
        table += `<td class="text-center">${usuario.inativo}</td>`;
        table += `<td>${usuario.grupoUsuario}</td>`;
        table += `</tr>`;
    });

    table += `</tbody>`;
    table += `</table>`;

    return table;
}

function TableSelect() {
    var tabela = document.getElementById("tableUser");
    var linhas = tabela.getElementsByTagName("tr");

    for(var i = 1; i < linhas.length; i++) {
        var linha = linhas[i];

        linha.addEventListener("click", function() {
            selLinha(this, false);
            HabilitarEdt();
        });
    }

    function selLinha(linha, multiplos){
        if(!multiplos) {
            var linhas = linha.parentElement.getElementsByTagName("tr");

            for(var i = 0; i < linhas.length; i++) {
                var linha_ = linhas[i];
                linha_.classList.remove("selecionado");    
            }
        }

        linha.classList.toggle("selecionado");
    }

    $('#btn_edt').click(() => {
        var selecionados = tabela.getElementsByClassName("selecionado");
    
        if(selecionados.length > 1) {
            console.log("Selecione algum registro para editar!");
        }
        
        var dados = "";
        
        for(var i = 0; i < selecionados.length; i++) {
            var selecionado = selecionados[i];
            selecionado = selecionado.getElementsByTagName("td");
            dados += "ID: " + selecionado[0].innerHTML + " - Nome: " + selecionado[1].innerHTML + " - Email: " + selecionado[2].innerHTML + "\n";
        }
        
        console.log(dados);
    })
}

function HabilitarEdt() {
    $("#btn_edt").attr("disabled", false);
    $("#btn_edt").removeClass("btn-secondary").addClass("btn-primary");
}

function DesabilitarEdt() {
    $("#btn_edt").attr("disabled", true);
    $("#btn_edt").removeClass("btn-primary").addClass("btn-secondary");
}

