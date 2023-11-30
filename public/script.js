
/*Para salvar os produtos na página de cadastro*/

function salvarProduto(idProduto) {

    var data = new FormData();
    data.set("nome", document.produto.nome.value);
    data.set("url", document.produto.url.value);
    data.set("tipo", document.produto.tipo.value);
    data.set("valor", document.produto.valor.value);
    data.set("descricao", document.produto.descricao.value);

    var request;
    if (idProduto) {
        request = fetch(`/api/produtos/${idProduto}`, { method: 'patch', body: data});
    }
    else {
        request = fetch('/api/produtos', { method: 'post', body: data});
    }

    request.then(response => response.json())
        .then(responseJson => tratarResultado(responseJson))
        .catch(error => alert(error));
}

function tratarResultado(jsonData) {
    console.log(jsonData);

    if (jsonData.error) {
        alert(jsonData.message);
    }
    else {
        alert("Salvo com sucesso");
    }
}


/*Exibindo os itens cadastrados na página de Produtos*/

function consultarProdutos() {
    fetch(`/api/produtos`, { method: 'get'})
        .then(response => response.json())
        .then(responseJson => exibirProdutos(responseJson))
        .catch(error => alert(error));
}

function exibirProdutos(jsonData) {
    var produtos = document.getElementById("produtos");
    produtos.innerHTML = "";
    
    if (jsonData.error) {
        produtos.innerText = "Erro ao obter os produtos";
    }
    else {
        if (jsonData.data.size == 0) {
            produtos.innerText = "Nenhum produto cadastrado";
        }
        else {
            for (item of jsonData.data) {

                var content = `<img src="${item.url}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${item.nome}</h5>
                <p class="card-text">${item.descricao}</p>
                </div>
                <div class="card-body">
                    <a href="#" class="btn btn-primary" onclick="editarProduto(${item.id})">Editar</a>
                    <a href="#" class="btn btn-warning" onclick="excluirProduto(${item.id})">Excluir</a>
                </div>`;

                var produto = document.createElement("div");
                produto.className="card col border-0";
                produto.innerHTML = content;
                produtos.appendChild(produto);
            }
        }
    }
}

function produtoExibido (idexibir){

    var data = new FormData();
    data.set("nome", document.produto.nome.value);
    data.set("url", document.produto.url.value);
    data.set("tipo", document.produto.tipo.value);
    data.set("valor", document.produto.valor.value);
    data.set("descricao", document.produto.descricao.value);

    var request;
    if (idexibir) {


    }


}

function editarProduto(idProduto) {

}

/* para excluir um produto cadastrado*/

function excluirProduto(idProduto) {
    fetch(`/api/produtos/${idProduto}`, { method: 'delete'})
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.error) {
                alert(responseJson.message);
            }
            else {
                consultarProdutos();
            }
        })
        .catch(error => alert(error));
}

/* para editar ou atualizar algum produto*/

function atualizarProduto(idProduto) {
    fetch(`/api/produtos/${idProduto}`, { method: 'put'})
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.error) {
                alert(responseJson.message);
            }
            else {
                consultarProdutos();
            }
        })
        .catch(error => alert(error));
}
