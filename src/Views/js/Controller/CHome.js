$(document).ready(() => {

    $('#l_usuarios').click((event) => {
        event.preventDefault();

        LoadPageInternal('container', 'Usuarios', 'VUsuarios');
    });

});