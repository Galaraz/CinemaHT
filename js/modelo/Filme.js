class Filme {


  constructor() {

    this.geradorId = 0
    this.filmes = []
    this.IdEdicao = null



    this.titulo = null;
    this.clasificacao = null;
    this.duracao = null;

  }



  fecharMensagem() {

    document.getElementById("mensagens").classList.remove("show");

  }



  atualizarEstado() {

    if (localStorage.getItem('filmes') != null) {

      this.filmes = JSON.parse(localStorage.getItem('filmes'))
    }
    if (localStorage.getItem('geradorIdFilmes') != null) {

      this.geradorId = JSON.parse(localStorage.getItem('geradorIdFilmes'))
    }
    this.gerarTabela()

  }


  lerDados() {

    let filme = {}
    filme.titulo = document.getElementById('titulo').value
    filme.clasificacao = document.getElementById('classificacao').value
    filme.duracao = document.getElementById('duracao').value
    filme.genero = document.getElementById('genero').value
    filme.sinopse = document.getElementById('sinopse').value

    return filme

  }

  validar(filme) {

    let mensagem = ""
    if (filme.titulo == "") {
      mensagem += "Campo titulo é obrigatório!!!\n";
    }
    if (filme.clasificacao == "") {
      mensagem += "Campo classificão é obrigatório!!!\n";
    }
    if (filme.duracao == "") {
      mensagem += "Campo Duraçao é obrigatório!!!\n";
    }

    if (mensagem != "") {
      document.getElementById("textoMensagem").innerText = mensagem
      document.getElementById("mensagens").classList.add("show")
      return false
    }
    return true
  }




  cancelar() {

    document.getElementById('titulo').value = ""
    document.getElementById('classificacao').value = ""
    document.getElementById('duracao').value = ""
    document.getElementById('genero').value = ""
    document.getElementById('sinopse').value = ""


    this.idEdicao = null
  }

  gerarTabela() {

    let tabela = document.getElementById('tabela-corpo')
    tabela.innerHTML = ""
    for (let i = 0; i < this.filmes.length; i++) {

      let linha = tabela.insertRow()

      let colunaTitulo = linha.insertCell()

      let colunaClassificacao = linha.insertCell()




      let colunaEditar = linha.insertCell()
      let colunaExcluir = linha.insertCell()

      colunaTitulo.innerText = this.filmes[i].titulo

      colunaClassificacao.innerText = this.filmes[i].clasificacao




      let imgEditar = document.createElement('img')
      imgEditar.src = "img/editar.svg"
      imgEditar.setAttribute('onclick', `filmeController.editar('${this.filmes[i].id}')`)
      colunaEditar.appendChild(imgEditar)


      let imgExcluir = document.createElement('img')
      imgExcluir.src = "img/delete.svg"
      imgExcluir.setAttribute('onclick', `filmeController.excluir('${this.filmes[i].id}')`)
      colunaExcluir.appendChild(imgExcluir)




    }
  }

  salvar() {
    let filme = this.lerDados()
    if (this.validar(filme)) {
      if (this.idEdicao == null) {
        this.adicionar(filme)
      } else {
        this.salvarEdicao(filme)
      }
      this.cancelar()
      this.sincronizarLocalStorage()
      this.gerarTabela()
    }
  }




  adicionar(filme) {

    filme.id = this.geradorId
    this.filmes.push(filme)
    this.geradorId++

  }



  editar(id) {


    let i = 0
    let achou = false


    while (i < this.filmes.length && !achou) {
      if (this.filmes[i].id == id) {
        


        document.getElementById('titulo').value = this.filmes[i].titulo
        document.getElementById('classificacao').value =this.filmes[i].clasificacao
        document.getElementById('duracao').value = this.filmes[i].duracao
        document.getElementById('genero').value = this.filmes[i].genero
        document.getElementById('sinopse').value = this.filmes[i].sinopse

        
        this.idEdicao = id
        achou = true
      }
      i++
    }
  }


  excluir(id) {

    if (confirm("Tem certeza que deseja deletar esse cliente!")) {

      let posicao = null

      for (let i = 0; i < this.filmes.length; i++) {
        if (this.filmes[i].id == id) {
          posicao = i
        }
      }

      if (posicao != null) {

        this.filmes.splice(posicao, 1)

        this.sincronizarLocalStorage()
        this.gerarTabela()

      }

    }

  }



  sincronizarLocalStorage() {
    localStorage.setItem('filmes', JSON.stringify(this.filmes))
    localStorage.setItem('geradorIdFilmes', this.geradorId)
  }


  salvarEdicao(filme) {
    let i = 0
    let achou = false

    while (i < this.filmes.length && !achou) {
      if (this.filmes[i].id == this.idEdicao) {
        this.filmes[i].titulo = filme.titulo
        this.filmes[i].clasificacao = filme.clasificacao
        this.filmes[i].duracao = filme.duracao
        this.filmes[i].genero = filme.genero
        this.filmes[i].sinopse = filme.sinopse

        achou = true
      }
      i++
    }
  }






}




let filmeController = new Filme()

