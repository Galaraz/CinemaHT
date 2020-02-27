class Sala {


    constructor() {

        this.identicador = [];
        this.cadeiras = [];
        this.fileira[] = "";


        this.idEdicao = null
        this.geradorId =0
        this.salas[]


    }

   // lerDados() {
     //   let fileira = {}
    //    fileira.cadeira0 = document.getElementById('cadeira0').value
    //    fileira.cadeira1 = document.getElementById('cadeira1').value
    //    fileira.cadeira2 = document.getElementById('cadeira2').value
    //    fileira.cadeira3 = document.getElementById('cadeira3').value
    //    fileira.cadeira4 = document.getElementById('cadeira4').value
    ///    fileira.cadeira5 = document.getElementById('cadeira5').value
    //    fileira.cadeira6 = document.getElementById('cadeira6').value
   //     fileira.cadeira7 = document.getElementById('cadeira7').value
   ///     fileira.cadeira8 = document.getElementById('cadeira8').value
   //     fileira.cadeira9 = document.getElementById("cadeira9").value


     //   return fileira
   // }

    validar(fileira) {
        let mensagem = ""
        if (fileira.cadeira0 == "") {
            mensagem += "Campo nome é obrigatório!!!\n";
        }
        if (fileira.cadeira1 == "") {
            mensagem += "Campo endereço é obrigatório!!!\n";
        }
        if (fileira.cadeira2 == "") {
            mensagem += "Campo CNPJ é obrigatório!!!\n";
        }
        if (fileira.cadeira3 == "") {
            mensagem += "Campo razão social é obrigatório!!!\n";
        }
        if (mensagem != "") {
            document.getElementById("textoMensagem").innerText = mensagem
            document.getElementById("mensagens").classList.add("show")
            return false
        }



        fecharMensagem() {

            document.getElementById("mensagens").classList.remove("show");

        }



        atualizarEstado() {

            if (localStorage.getItem('salas') != null) {

                this.salas = JSON.parse(localStorage.getItem('salas'))
            }

            if (localStorage.getItem('geradorIdSalas') != null) {

                this.geradorId = JSON.parse(localStorage.getItem('geradorIdSalas'))
            }
            this.gerarTabela()

        }



        sincronizarLocalStorage() {
            localStorage.setItem('salas', JSON.stringify(this.salas))
            localStorage.setItem('geradorIdSalas', this.geradorId)
          }
        

        lerDados() {

            let sala = {}
            sala.nomeSala = document.getElementById('nomeSala').value

            return sala

        }

        validar(sala){

            let mensagem = ""

            if (sala.nomeSala == "") {

                mensagem += "Campo titulo é obrigatorio!!\n";

            }

            if (mensagem != "") {
                document.getElementById("textoMensagem").innerText = mensagem
                document.getElementById("mensagens").classList.add("show")
                return false
            }
            return true

        }



        cancelar() {

            document.getElementById('nomeSala').value = ""


            this.idEdicao = null
        }




        gerarTabela(){

            let tabela = document.getElementById('tabela-corpo')
            tabela.innerHTML = ""

            for (let i = 0; i < this.salas.length; i++) {

                let linha = tabela.insertRow()

                let colunaSala = linha.insertCell()


                let colunaEditar = linha.insertCell()
                let colunaExcluir = linha.insertCell()



                colunaSala.innerText = this.salas[i].





                let imgEditar = document.createElement('img')
                imgEditar.src = "img/editar.svg"
                imgEditar.setAttribute('onclick', `salaController.editar('${this.salas[i].id}')`)
                colunaEditar.appendChild(imgEditar)


                let imgExcluir = document.createElement('img')
                imgExcluir.src = "img/delete.svg"
                imgExcluir.setAttribute('onclick', `salaController.excluir('${this.salas[i].id}')`)
                colunaExcluir.appendChild(imgExcluir)









            }
        }

        salvar() {
            let sala = this.lerDados()
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


        adicionar(sala){

            sala.id = this.geradorId
            this.salas.push(sala)
            this.geradorId++
        }


        editar (id){


            let i = 0
            let achou = false
        
        
            while (i < this.salas.length && !achou) {
              if (this.salas[i].id == id) {
                
        
        
                document.getElementById('nomeSala').value = this.nomeSala[i].titulo

 
                this.idEdicao =id
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
        
        
        
        
          salvarEdicao(sala) {
            let i = 0
            let achou = false
        
            while (i < this.salas.length && !achou) {
              if (this.salas[i].id == this.idEdicao) {
                this.salas[i].nomeSala = sala.nomeSala
               
                achou = true
              }
              i++
            }
          }
        
                 






    }   


}

      let  salaController = new Sala()