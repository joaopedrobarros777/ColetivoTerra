
window.onload = function () {
  carregarProdutos()
}
async function carregarProdutos() {
  let divProdutos = document.getElementById("todosOsProdutos")
  let produtos

  await axios.get('http://localhost:3000/Produtos')
    .then(res => {
      produtos = res.data

    })

  for (let i = 0; i < produtos.length; i++) {
    let produtoAtual = document.createElement("div")
    produtoAtual.innerHTML =
      `<div class="col">
        <div id="produto${produtos[i].id}" class="card">
          <div class="fotoProduto" style=" background-image: url(${produtos[i].foto})" alt="${produtos[i].nome}"></div>
          <h5>${produtos[i].nome}</h5>         
          <input class="quantidade" type="number">
          <h4>R$ ${produtos[i].preco}0</h4>
          <button id="comprar${produtos[i].nome}" type="button" class="btn btn-outline-success">Comprar</button>
        </div>
      </div>`
    divProdutos.appendChild(produtoAtual)

    document.getElementById(`comprar${produtos[i].nome}`).addEventListener("click", () => {
      let card = document.getElementById(`produto${produtos[i].id}`)
      let quantidade = parseInt(card.querySelector(".quantidade").value)
      adicionarNoCarrinho(produtos[i], quantidade)
    })
  }
}

function adicionarNoCarrinho(produto, quantidade) {
  axios.post("http://localhost:3000/carrinho", {...produto, quantidade, total: quantidade * produto.preco})
  .then(res => {
    let carrinho = document.getElementById("carrinho")
    carrinho.innerHTML += `<tr>
    <td><div class="iconeProduto" style=" background-image: url(${produto.foto})" alt="${produto.nome}"></div></td>
    <td>${produto.nome}</td>
    <td>${quantidade}</td>
    <td>${produto.preco}</td>
    <td>${quantidade * produto.preco}</td>              
  </tr>`
  calculaValorTotal()
  })
  
}

function calculaValorTotal() {
  axios.get("http://localhost:3000/carrinho")
  .then(res => {
    let produtosCarrinho = res.data
    let totais = produtosCarrinho.map(produto => {
      return produto.total
    })
    let total = totais.reduce((total, valor) => {
      return valor + total 
    })
    let totalEL = document.getElementById("total")
    totalEL.textContent = total.toLocaleString("pt-br", {style: "currency", currency:"BRL"})
    console.log(total)
  })
}