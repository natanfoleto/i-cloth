$(document).ready(() => {

    $('#l_usuarios').click((event) => {
        event.preventDefault();

        LoadPageInternal('container', 'Usuarios', 'VUsuarios');
    });

    $('#l_perfil').click((event) => {
        event.preventDefault();

        LoadPageInternal('container', 'Perfil', 'VPerfil');
    });

});


