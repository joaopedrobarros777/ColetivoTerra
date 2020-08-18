// const rs = require("readline-sync")

// const axios = require('axios')

function carregarProdutos() {
    let divProdutos = document.getElementById("todosOsProdutos")
    axios.get('http://localhost:3000/Produtos')
    .then(res => {
        let produtos = res.data
    })
    
    for (let i = 0; i <= produtos.length; i++) {
        let produtoAtual = document.createElement("div")
      produtoAtual.innerHTML = `
        <div class="row">
      <div class="column">
        <div class="card">
          <img src="${produtos.foto}" alt="${produtos.nome}">
          <input class="quantidade">
          <h2>${produtos.preco}</h2>
          <button id="comprar${produtos.nome}" type="button" class="btn btn-outline-success">Comprar</button>
        </div>
      </div>`
        divProdutos.appendChild(produtoAtual)
    }
}
carregarProdutos()

let carrinho = []

class produtoNoCarrinho {
    constructor(nome, valor, quantidade) {
      this.nome = nome
      this.valor = valor
      this.quantidade = quantidade
    }
  }

  function colocarProdutoNoCarrinho(nome, valor, quantidade) {
    if (quantidade !== "") {
      let produtoNoCarrinho = new ProdutoNoCarrinho(nome, valor, quantidade)
      carrinho.push(produtoNoCarrinho)
      console.log("Coloquei " + produtoNoCarrinho.quantidade + " " + produtoNoCarrinho.nome + "(s) no carrinho!")
      calcularValorTotalDoCarrinho()
    } else {
      alert("Voce esqueceu de selecionar a quantidade desejada.")
    }
  }

  colocarProdutoNoCarrinho()

  window.onload = function() {
    document.getElementById("comprarAlface").addEventListener("click", () => {

        clicarComprarProduto("precoAlface", "quantidadeAlface", "Alface")
    
      })
      document.getElementById("comprarUva").addEventListener("click", () => {
    
        let idDoCampoPreco = "precoUva"
        let idDoCampoQuantidade = "quantidadeUva"
        let nomeDoProduto = "Uva"
    
        clicarComprarProduto(idDoCampoPreco, idDoCampoQuantidade, nomeDoProduto)
    
      })
      document.getElementById("comprarUvaSemCaroco").addEventListener("click", () => {
    
        let idDoCampoPreco = "precoUvaSemCaroco"
        let idDoCampoQuantidade = "quantidadeUvaSemCaroco"
        let nomeDoProduto = "Uva Sem Caroço"
        clicarComprarProduto(idDoCampoPreco, idDoCampoQuantidade, nomeDoProduto)
      })
      document.getElementById("comprarPera").addEventListener("click", () => {
    
        clicarComprarProduto("precoPera", "quantidadePera", "Pera")
        
      })
  }