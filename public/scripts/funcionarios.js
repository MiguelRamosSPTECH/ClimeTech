function listarFuncionarios() {
    fetch("/usuarios/listarFuncionarios", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresa: sessionStorage.ID_EMPRESA
        })
    })
    .then(async function(resposta) {
        if(resposta.ok) {
            const dadosFuncionarios = await resposta.json();

            dadosFuncionarios.forEach(funcionario => {
                //tratando a data para o formato brasileiro seila
                trataData = funcionario.dtCriacao.substring(0, 10);
                trataData = trataData.split("-")
                trataData = `${trataData[2]}/${trataData[1]}/${trataData[0]}`
                
                table.innerHTML+=`
                    <tr>
                          <td class="id">${funcionario.idFuncionarioEmpresa}</td>
                          <td class="name">${funcionario.nome}</td>
                          <td class="email">${funcionario.email}</td>
                          <td class="data">${trataData}</td>
                          <td class="password">${funcionario.senha}</td>
                          <td class="buttons-line">
                            <img class="delete" onclick="openCloseModal('delete')" src="../img-all/delete-profile-button.png">
                            <img class="edit" onclick="openCloseModal('update')" src="../img-all/edit-profile-button.png">
                          </td>
                    </tr>
                `
            })
        } else {
            const erro = await resposta.text();
            return erro;
        }
    })
}