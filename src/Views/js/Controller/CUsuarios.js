function GetTable(usuarios) {

    var table = `<table class='table table-hover table-bordered'>`;
    table += `<thead><tr><td class="text-center">ID</td><td>Nome</td><td>Email</td><td class="text-center">Ativo</td><td>Grupo Usuário</td></tr></thead>`;
    table += `<tbody>`;
    usuarios.forEach(function(usuario) {
        table += `<tr>`;
        table += `<td class="text-center">${usuario.idUsuario}</td>`;
        table += `<td>${usuario.nome}</td>`;
        table += `<td>${usuario.email}</td>`;
        table += `<td class="text-center">${usuario.ativo}</td>`;
        table += `<td>${usuario.grupoUsuario}</td>`;
        table += `</tr>`;
    });
    table += `</tbody>`;
    table += `</table>`;

    return table;
}

function GetAll() {
    xmlHttpPost('ajax/Usuarios/GetAll', function() { 
        beforeSend(function() {
            div_table.innerHTML = `<center><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span></center>`;
        });

        success(function() {
            var usuarios = JSON.parse(xhttp.responseText);
            div_table.innerHTML = GetTable(usuarios);
        });

        error(function() {
            div_table.innerHTML = 'Ocorreu um erro';
        });

    },'?id=1');
}

function GetUnique(event) {
    event.preventDefault();

    var form = new FormData(form_search);

    xmlHttpPost('ajax/Usuarios/GetUnique', function() {

        beforeSend(function() {
            div_table.innerHTML = `<center><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span></center>`;
        });

        success(function() {
            if(xhttp.responseText == 'nouser') {
                div_table.innerHTML = `<center><h6>Nenhum usuário foi encontrado!</h6></center>`;
            } else {
                var usuario = JSON.parse(xhttp.responseText);
                div_table.innerHTML = GetTable(usuario);
            }
        });

    },form);
}

function Save(event) {
    event.preventDefault();

    var form = new FormData(form_cadastrar);

    xmlHttpPost('ajax/Usuarios/Save', function() {
        beforeSend(function() {
            btn_cadastrar.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>`;
        });

        success(function() {
            var response = xhttp.responseText;
            if(response == 'done') {
                modal_register.style.display = "none";
            }

            if(response == 'erro') {
                BlockSave();
            }
        });
    },form);
}