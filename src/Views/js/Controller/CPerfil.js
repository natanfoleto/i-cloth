var usuarioLogado;

$(document).ready(() => {

    OnLoad();

    $("#btnLogout").click(() => {
        Logout();
    })
});

async function OnLoad() {
    usuarioLogado = await GetLoggedUser();
    
    $("#load").attr("hidden", 1);
    $("#perfil").removeAttr("hidden");
}

function GetLoggedUser() {
    return new Promise((resolve, reject) => {
        xmlHttpPost('../../../Ajax/Perfil/GetLoggedUser', function() {
            beforeSend(function() {
                $('#load').html(
                    `<center><i class="fa fa-sync fa-spin fa-4x fa-fw"></i><span class="sr-only">
                    Loading...</span></center>`
                );
            });
            
            success(() => {
                if(JSON.parse(xhttp.responseText == 404)) {
                    reject(console.log('Sessão não encontrada!'));
                } else {
                    usuarioLogado = JSON.parse(xhttp.responseText);
                    PopularFields(usuarioLogado);

                    resolve(usuarioLogado);
                }
            });
        }, null);
    });
}

function PopularFields(usuario) {
    //Photo fields
    $("#name-photo").html(usuario.nome);
    $("#email-photo").html(usuario.email);

    //Perfil fields
    $("#name-perfil").html(usuario.nome);
    $("#data-perfil").html(usuario.dataNascimento);
    $("#cpf-perfil").html(usuario.cpf);
    $("#phone-perfil").html(usuario.celular);
    $("#email-perfil").html(usuario.email);
    $("#status-perfil").html((usuario.ativo === "S") ? "Ativo no Sistema" : "Inativo no Sistema");
    $("#grupo-perfil").html(usuario.grupoUsuario);
    $("#dataAdd-perfil").html(usuario.dataHoraAdd);
    $("#dataEdt-perfil").html(usuario.dataHoraEdt);
}