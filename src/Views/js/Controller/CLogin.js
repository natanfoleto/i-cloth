$(document).ready(() => {

    $('#form-login').submit((event) => {
        event.preventDefault();

        xmlHttpPost('../../../Ajax/Usuarios/Login', function() {
            beforeSend(() => {
                
            });
            
            success(() => {
                if(JSON.parse(xhttp.responseText == 404)) {
                    BlockLogin();
                } else {
                    LoadPage('Base/VHome');
                    console.log(JSON.parse(xhttp.responseText));
                }
            });
    
            error(() => {
                
            });
    
        }, new FormData(document.querySelector("#form-login")));
    })

    $('#txtCPF').keypress(() => {
        ReleaseLogin();
    })

    $('#txtSenha').keypress(() => {
        ReleaseLogin();
    })

});

function BlockLogin() {
    $('#title-login').html('Usuário não encontrado! Tente novamente.');
    $('#title-login').addClass('login-block');
    $('#btn-login').prop("disabled", true);
    $('#btn-login').css({"cursor":"not-allowed"});
}

function ReleaseLogin() {
    $('#title-login').html('Inicie a sessão no Sistema');
    $('#title-login').removeClass('login-block');
    $('#btn-login').prop("disabled", false);
    $('#btn-login').css({"cursor":"pointer"});
}