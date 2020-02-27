class Sessao {


  constructor() {
    //modelo ??

    this.data = null
    this.horario = null
    this.legendado = null
    this.treD = null
    this.sala = []

    
    this.idEdicao = null
    this.sessoes = []
    this.filmes=[]
    this.geradorId = 0

  }



  fecharMensagem() {

    document.getElementById("mensagens").classList.remove("show");

  }



  atualizarEstado() {

    if (localStorage.getItem('filmes') != null) {
      this.filmes= JSON.parse(localStorage.getItem('filmes'))

      let select = document.getElementById('filmeSessao')

      for (let i = 0; i < this.filmes.length; i++) {

        if (this.filmes[i]) {
          let op = document.createElement('option')
          op.setAttribute('value', this.filmes[i].id)
          op.innerText = this.filmes[i].titulo
          select.appendChild(op)

        }

      }
    }


    if (localStorage.getItem('sessoes') != null) {
      this.sessoes = JSON.parse(localStorage.getItem('sessoes'))


      let select = document.getElementById('sessoes')

      for (let i = 0; i < this.sessoes.length; i++) {


        if (this.sessoes[i]) {

          let op = document.createElement('option')
          op.setAttribute('value', this.sessao[i].id)
          select.appendChild(op)

        }

      }




    }





    if (localStorage.getItem('geradorIdSessao') != null) {

      this.geradorId = JSON.parse(localStorage.getItem('geradorIdSessao'))
    }
    this.gerarTabela()

  }



  sincronizarLocalStorage() {
    localStorage.setItem('sessoes', JSON.stringify(this.sessoes))
    localStorage.setItem('geradorIdSessao', this.geradorId)
  }


  lerDados() {

    let sessao = {}

    sessao.filmeSessao
      = document.getElementById('filmeSessao').value

    sessao.sala = document.getElementById('sala').value

    sessao.legendado = document.getElementById('legendado').value

    sessao.tresD = document.getElementById('tresD').value

    sessao.data = document.getElementById('data').value

    sessao.horarioInicio = document.getElementById('horarioInicio').value

    return sessao

  }

  validar(sessao) {

    let mensagem = ""


    if (sessao.filmeSessao == "") {
      mensagem += "O campo filme é obrigatório!!!\n";
    }

    if (sessao.sala == "") {
      mensagem += "O campo  sala é obrigatório!!!\n";
    }

    if (sessao.legendado == "") {
      mensagem += " Esse campo é obrigatório!!!\n";
    }

    if (sessao.tresD == "") {
      mensagem += "Esse campo  é obrigatório!!!\n";
    }

    if (sessao.data == "") {
      mensagem += "Esse campo  é obrigatório!!!\n";
    }

    if (sessao.horarioInicio == "") {
      mensagem += "Esse campo  é obrigatório!!!\n";
    }

    if (mensagem != "") {
      document.getElementById("textoMensagem").innerText = mensagem
      document.getElementById("mensagens").classList.add("show")
     
      return false
    }
    return true
  }




  cancelar() {

    document.getElementById('filmeSessao').value = ""
    document.getElementById('sala').value = ""
    document.getElementById('legendado').value = ""
    document.getElementById('tresD').value = ""
    document.getElementById('data').value = ""
    document.getElementById('horarioInicio').value = ""


    this.idEdicao = null
  }

  gerarTabela() {

    let tabela = document.getElementById('tabela-corpo')
    tabela.innerHTML = ""


    for (let i = 0; i < this.sessoes.length; i++) {

      let linha = tabela.insertRow()

      let colunaFilme = linha.insertCell()

      let colunaData = linha.insertCell()

      let colunaHorario = linha.insertCell()
      
      let colunatresD = linha.insertCell()
      
      let colunaSala = linha.insertCell()

      let colunaLegendado = linha.insertCell()

     

      let colunaEditar = linha.insertCell()

      let colunaExcluir = linha.insertCell()




      colunaFilme.innerText = this.sessoes[i].filmeSessao.titulo

      colunaData.innerText = this.sessoes[i].data

      colunaHorario.innerText = this.sessoes[i].horarioInicio
           
      colunaLegendado.innerText = this.sessoes[i].legendado
      
      colunaSala.innerText = this.sessoes[i].sala

      colunatresD.innerText = this.sessoes[i].tresD

   



      let imgEditar = document.createElement('img')

      imgEditar.src = "img/editar.svg"
      imgEditar.setAttribute('onclick', `sessaoController.editar('${this.sessoes[i].id}')`)
      colunaEditar.appendChild(imgEditar)


      let imgExcluir = document.createElement('img')
      imgExcluir.src = "img/delete.svg"
      imgExcluir.setAttribute('onclick', `sessaoController.excluir('${this.sessoes[i].id}')`)

      colunaExcluir.appendChild(imgExcluir)



    }
  }

  salvar() {
    let sessao = this.lerDados()

    if (this.validar(sessao)) {
      if (this.idEdicao == null) {
        this.adicionar(sessao)
      } else {
        this.salvarEdicao(sessao)
      }
      this.cancelar()
      this.sincronizarLocalStorage()
      this.gerarTabela()
    }
  }




  adicionar(sessao) {

    sessao.id = this.geradorId
    
    let i = 0
    let achou = false

    while (i < this.filmes.length && !achou) {
        if (this.filmes[i].id == sessao.filmeSessao) {
            sessao.filmeSessao = this.filmes[i]
            achou = true
        }
        i++
    }

    this.sessoes.push(sessao)
    this.geradorId++

  }



  salvarEdicao(sessao) {
    let i = 0
    let achou = false

    while (i < this.sessao.length && !achou) {
      if (this.sessao[i].id == this.idEdicao) {
        this.sessao[i].filmeSessao = sessao.filmeSessao
        this.sessao[i].sala = sessao.sala
        this.sessao[i].legendado = sessao.legendado
        this.sessao[i].tresD = sessao.tresD
        this.sessao[i].data = sessao.data
        this.sessao[i].horarioInicio = sessao.horarioInicio



        achou = true
      }
      i++
    }
  }



  editar(id) {



    let i = 0
    let achou = false



    while (i > this.sessoes.length && !achou) {
      if (this.sessoes[i].id == id) {


        document.getElementById('filmeSessao').value = this.filmeSessao[i].filmeSessao
        document.getElementById('sala').value = this.sessoes[i].sala
        document.getElementById('legendado').value = this.sessoes[i].legendado
        document.getElementById('tresD').value = this.sessoes[i].treD
        document.getElementById('data').value = this.sessoes[i].data
        document.getElementById('horarioInicio').value = this.sessoes[i].horarioInicio


        this.idEdicao = id

        achou= true


      }
      i++
    }

  }






  excluir(id) {

    if (confirm("Tem certeza que deseja deletar essa Sessão!")) {

      let posicao = null

      for (let i = 0; i < this.sessoes.length; i++) {
        if (this.sessoes[i].id == id) {
          posicao = i
        }
      }

      if (posicao != null) {

        this.sessoes.splice(posicao, 1)


        this.sincronizarLocalStorage()
        this.gerarTabela()

      }


    }

  }









}




let sessaoController = new Sessao()


