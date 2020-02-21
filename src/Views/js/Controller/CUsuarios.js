var usuarios;
var gruposUsuario;

var campos = [
    "txtNome",
    "txtCpf",
    "txtCelular",
    "txtEmail",
    "txtSenha",
    "txtConfSenha"
]

$(document).ready(() => {

    OnLoad();

    $('#btnSalvar').click((event) => {
        event.preventDefault();

        if(!CheckFields()) {
            alert("Você precisa preencher todos os campos!");
        } else if(!CheckPassword()){
            alert("A confirmação da senha esta errada!");
        } else {
            SaveUser();
        }
    })

    $('#btnCancelar').click((event) => {
        event.preventDefault();

        $("#l_usuarios").trigger('click');
    })

    $("input").keyup(function() {
        EnableSaveEdt();
    });

    $("input").change(function() {
        EnableSaveEdt();
    });

    $("select").change(function() {
        EnableSaveEdt();
    });
});

async function OnLoad() {
    gruposUsuarios = await GetGroupUsers();
    usuarios = await GetUsers();

    $("#load").attr("hidden", 1);
    $("#usuarios").removeAttr("hidden");
}

function GetGroupUsers() {
    return new Promise((resolve, reject) => {
        xmlHttpPost('../../../Ajax/Grupo Usuarios/GetGroupUser', function() {
            beforeSend(function() {
                $('#load').html(
                    `<center><i class="fa fa-sync fa-spin fa-4x fa-fw"></i><span class="sr-only">
                    Loading...</span></center>`
                );
            });

            success(() => {
                if(JSON.parse(xhttp.responseText == 404)) {
                    reject($('#table').html(
                        `<center><h6>Nenhum grupo de usuário foi encontrado!</h6></center>`
                    ));
                } else {
                    gruposUsuario = JSON.parse(xhttp.responseText);
                    PopuplarSelect(gruposUsuario);

                    resolve(gruposUsuario);
                }
            });
        }, null);
    });
}

function GetUsers() {
    return new Promise((resolve, reject) => {
        xmlHttpPost('../../../Ajax/Usuarios/GetUser', function() {
            beforeSend(function() {
                $('#grid').html(
                    `<center><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">
                    Loading...</span></center>`
                );
            });
            
            success(() => {
                if(JSON.parse(xhttp.responseText == 404)) {
                    reject($('#grid').html(
                        `<center><h6>Nenhum usuário foi encontrado!</h6></center>`
                    ));
                } else {
                    usuarios = JSON.parse(xhttp.responseText);
                    $('#grid').html(GetTable(usuarios, gruposUsuario));
                    TableSelect();   
                    DataTable();

                    resolve(usuarios);
                }
            });
        }, null);
    });
}

function SaveUser() {

    xmlHttpPost('../../../Ajax/Usuarios/SaveUser', function() {
        beforeSend(function() {
            $('#btnSalvar').html(
                `<center><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">
                Loading...</span></center>`
            );
        });
        
        success(() => {
            if(JSON.parse(xhttp.responseText == 404)) {
                
            } else {
                result = JSON.parse(xhttp.responseText);
                
                if(result === "UpdateTrue") {
                    DisableSaveEdt();
                    $('#btnSalvar').html("Salvo!");
                    $('#btnCancelar').html("Voltar");
                } else if (result === "InsertTrue") {
                    $("#l_usuarios").trigger('click');
                } else {
                    alert("Algo deu errado, verifique o código!");
                }
            }
        });

        error(() => {
            
        });

    }, new FormData(document.querySelector("#form-usuario")));
}

function PopuplarSelect(gruposUsuario) {
    var selectbox = $('#txtGrupoUsuario');
    selectbox.find('option').remove();

    gruposUsuario.forEach(grupoUsuario => {
        $('<option>').val(grupoUsuario.idGrupoUsuario).text(grupoUsuario.nome).appendTo(selectbox);
    });
}

function GetTable(usuarios, gruposUsuario) {

    var table = `<table id="tableUser" class='table table-bordered' cellspacing='0' width='100%'>`;
    table += `<thead>`;
    table += `<tr>`;
    table += `<th class='th-sm text-center'>ID</th> 
        <th class='th-sm'>Nome</th> 
        <th class='th-sm'>CPF</th> 
        <th class='th-sm'>Data Nasc.</th> 
        <th class='th-sm text-center'>Ativo</th> 
        <th class='th-sm'>Grupo</th>`;

    table += `</tr>`;
    table += `</thead>`;
    table += `<tbody>`;

    usuarios.forEach(function(usuario) {
        table += `<tr>`;
        table += `<td class="text-center">${usuario.idUsuario}</td>`;
        table += `<td>${usuario.nome}</td>`;
        table += `<td>${usuario.cpf}</td>`;
        table += `<td>${usuario.dataNascimento}</td>`;
        table += `<td class="text-center">${(usuario.ativo === "S") ? 
        `<i class="fas fa-check ativo"></i>` : 
        `<i class="fas fa-times inativo"></i>`}</td>`;

        gruposUsuario.forEach(grupoUsuario => {
            if(grupoUsuario.idGrupoUsuario === usuario.grupoUsuario) {
                table += `<td>${grupoUsuario.nome}</td>`;
            }
        });

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
            EnableEdt();
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

    $('#btnAdd').click(() => {
        $("#table").attr("hidden", 1);
        $("#usuario").removeAttr("hidden");

        LoadUserAdd();
    })

    $('#btnEdt').click(() => {
        var selecionados = tabela.getElementsByClassName("selecionado");
    
        if(selecionados.length > 1) {
            console.log("Selecione algum registro para editar!");
        }
        
        for(var i = 0; i < selecionados.length; i++) {
            var selecionado = selecionados[i];
            selecionado = selecionado.getElementsByTagName("td");
        }

        $("#table").attr("hidden", 1);
        $("#usuario").removeAttr("hidden");

        LoadUserEdt(selecionado);
    })

}

function CheckFields() {
    for(i = 0; i < campos.length; i++) {
        if($("#" + campos[i]).val() === "")
            return false;
    }

    return true;
}

function CheckPassword() {
    if($("#txtSenha").val() != $("#txtConfSenha").val())
        return false;
    else 
        return true;
}

function LoadUserAdd() {
    $("#title").html("Novo Usuário");
    $("#txtNome").focus();
}

function LoadUserEdt(usuario) {
    for (i = 0; i < usuarios.length; i++) {
        if(usuarios[i].idUsuario === usuario[0].textContent) {
            PopularFields(usuarios[i], gruposUsuario);
            return false;
        }
    }
}

function BlockEdt() {
    $("input").attr("disabled", 1);
    $("select").attr("disabled", 1);
    $("#btnSalvar").attr("disabled", 1);
    $("#btnCancelar").html("Voltar");
}

function PopularFields(usuario, gruposUsuario) {
    if(usuario.ativo === "N") {     
        $("#title").html(usuario.nome + " [Inativo]");
        BlockEdt();
    } else {
        $("#title").html(usuario.nome);
    } 

    $("#txtId").val(usuario.idUsuario);
    $("#txtNome").val(usuario.nome);
    $("#txtAtivo").val((usuario.ativo === "S") ? "S" : "N");

    gruposUsuario.forEach(grupoUsuario => {
        if(grupoUsuario.idGrupoUsuario === usuario.grupoUsuario) {
            $("#txtGrupoUsuario").val($('option:contains(' + grupoUsuario.nome + ')').val());
        }
    });

    $("#txtData").val(usuario.dataNascimento);
    $("#txtCpf").val(usuario.cpf);
    $("#txtCelular").val(usuario.celular);
    $("#txtEmail").val(usuario.email);
    $("#txtSenha").val(usuario.senha);
    $("#txtSenha").attr("readonly", 1);

    DisableSaveEdt();
}

function EnableSaveEdt() {
    $("#btnSalvar").removeAttr("disabled");
    $("#btnSalvar").attr("disabled", false);
    $("#btnSalvar").html("Salvar");
    $("#btnCancelar").html("Cancelar");
}

function DisableSaveEdt() {
    $("#btnSalvar").removeAttr("disabled");
    $("#btnSalvar").attr("disabled", true);
}

function EnableEdt() {
    $("#btnEdt").attr("disabled", false);
    $("#btnEdt").removeClass("btn-secondary").addClass("btn-success");
}

function DisableEdt() {
    $("#btnEdt").attr("disabled", true);
    $("#btnEdt").removeClass("btn-success").addClass("btn-secondary");
}

function DataTable() {
    $('#tableUser').DataTable({
        "language": {
            "sEmptyTable": "Nenhum usuário foi encontrado!",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum usuário foi encontrado!",
            "sSearch": "Buscar Usuário",
            "oPaginate": {
            "sNext": "Próximo",
            "sPrevious": "Anterior",
            "sFirst": "Primeiro",
            "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            },
            "select": {
                "rows": {
                    "_": "Selecionado %d linhas",
                    "0": "Nenhuma linha selecionada",
                    "1": "Selecionado 1 linha"
                }
            }
        }
    });
    
    AddStyleTable();
}

function AddStyleTable() {
    $("#tableUser_wrapper").addClass("table-position");
    $("select").addClass("select-table");
    $("input").addClass("input-table");
    $("#tableUser_paginate").addClass("pagination-table");
    $("#tableUser").removeClass("dataTable no-footer");
}