
class Cliente {


  constructor() {

    this.geradorId = 0
    this.clientes = []
    this.IdEdicao = null

    this.nome = null
    this.idade = null
    this.email = null


  }


  fecharMensagem() {

    document.getElementById("mensagens").classList.remove("show");

  }



  atualizarEstado() {

    if (localStorage.getItem('clientes') != null) {

      this.clientes = JSON.parse(localStorage.getItem('clientes'))
    }
    if (localStorage.getItem('geradorIdClientes') != null) {

      this.geradorId = JSON.parse(localStorage.getItem('geradorIdClientes'))
    }
    this.gerarTabela()

  }


  lerDados() {

    let cliente = {}
    cliente.nome = document.getElementById('nome').value
    cliente.idade = document.getElementById('idade').value
    cliente.email = document.getElementById('email').value

    return cliente

  }

  validar(cliente) {

    let mensagem = ""
    if (cliente.nome == "") {
      mensagem += "Campo Nome é obrigatório!!!\n";
    }
    if (cliente.idade == "") {
      mensagem += "Campo Idade é obrigatório!!!\n";
    }
    if (cliente.email == "") {
      mensagem += "Campo Email é obrigatório!!!\n";
    }

    if (mensagem != "") {
      document.getElementById("textoMensagem").innerText = mensagem
      document.getElementById("mensagens").classList.add("show")
      return false
    }
    return true
  }




  cancelar() {

    document.getElementById('nome').value = ""
    document.getElementById('idade').value = ""
    document.getElementById('email').value = ""


    this.idEdicao = null
  }

  gerarTabela() {

    let tabela = document.getElementById('tabela-corpo')
    tabela.innerHTML = ""
    for (let i = 0; i < this.clientes.length; i++) {

      let linha = tabela.insertRow()

      let colunaNome = linha.insertCell()

      let colunaIdade = linha.insertCell()

      let colunaEmail = linha.insertCell()


      let colunaEditar = linha.insertCell()
      let colunaExcluir = linha.insertCell()

      colunaNome.innerText = this.clientes[i].nome

      colunaIdade.innerText = this.clientes[i].idade

      colunaEmail.innerText = this.clientes[i].email




      let imgEditar = document.createElement('img')
      imgEditar.src = "img/editar.svg"
      imgEditar.setAttribute('onclick', `clienteController.editar('${this.clientes[i].id}')`)
      colunaEditar.appendChild(imgEditar)


      let imgExcluir = document.createElement('img')
      imgExcluir.src = "img/delete.svg"
      imgExcluir.setAttribute('onclick', `clienteController.excluir('${this.clientes[i].id}')`)
      colunaExcluir.appendChild(imgExcluir)

    }
  }

  salvar() {
    let cliente = this.lerDados()
    if (this.validar(cliente)) {
      if (this.idEdicao == null) {
        this.adicionar(cliente)
      } else {
        this.salvarEdicao(cliente)
      }
      this.cancelar()
      this.sincronizarLocalStorage()
      this.gerarTabela()
    }
  }




  adicionar(cliente) {

    cliente.id = this.geradorId
    this.clientes.push(cliente)
    this.geradorId++

  }


  editar(id) {

      
    let i = 0
    let achou = false
   

    while (i < this.clientes.length && !achou) {
        if (this.clientes[i].id == id) {
        



          document.getElementById('nome').value = this.clientes[i].nome
          document.getElementById('idade').value = this.clientes[i].idade
          document.getElementById('email').value = this.clientes[i].email
      

            
            this.idEdicao = id
            achou = true
        }
        i++
    }
}





  excluir(id) {

    if (confirm("Tem certeza que deseja deletar esse cliente!")) {

      let posicao = null

      for (let i = 0; i < this.clientes.length; i++) {
        if (this.clientes[i].id == id) {
          posicao = i
        }
      }

      if (posicao != null) {

        this.clientes.splice(posicao, 1)

        this.sincronizarLocalStorage()
        this.gerarTabela()

      }

    }

  }

  sincronizarLocalStorage() {
    localStorage.setItem('clientes', JSON.stringify(this.clientes))
    localStorage.setItem('geradorIdClientes', this.geradorId)
  }


  salvarEdicao(cliente) {
    let i = 0
    let achou = false

    while (i < this.clientes.length && !achou) {
      if (this.clientes[i].id == this.idEdicao) {
        this.clientes[i].nome = cliente.nome
        this.clientes[i].idade = cliente.idade
        this.clientes[i].email = cliente.email

        achou = true
      }
      i++
    }
  }






}




let clienteController = new Cliente()






















