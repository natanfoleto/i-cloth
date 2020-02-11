$(document).ready(() => {

    $('#form-search').submit((event) => {
        event.preventDefault();

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
                }
            });
    
            error(() => {
                
            });
    
        }, new FormData(document.querySelector("#form-search")));
    })

});

function GetTable(usuarios) {

    var table = `<table class='table table-hover'>`;
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