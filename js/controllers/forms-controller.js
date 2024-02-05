import Address from '../models/address.js'
import * as addressService from '../services/exceptions/address-service.js';
import * as listController from './list-controller.js';


function State(){
      this.address = new Address();

      this.inputCep = null;
      this.inputStreet = null;
      this.inputNumber = null;
      this.inputCity = null;

      this.errorCep = null;
      this.errorNumber = null;
}

const state = new State();


export function init(){
      state.inputCep = document.forms.newAddress.cep;
      state.inputStreet = document.forms.newAddress.logradouro;
      state.inputNumber = document.forms.newAddress.number;
      state.inputCity = document.forms.newAddress.cidade;

      state.btnSave = document.forms.newAddress.btnSave;
      state.btnClear = document.forms.newAddress.btnClear;

      state.erroCep = document.querySelector('[data-error = "cep"]');
      state.errorNumber = document.querySelector('[data-error = "number"]');   

     state.inputNumber.addEventListener('change', handleInputNumberChange); // ao sair do form do number

     state.btnClear.addEventListener('click', handleBtnClearClick); // ao clicar no botão limpar 

     state.btnSave.addEventListener('click', handleBtnSaveClick); // ao clicar no botão salvar 

     state.inputCep.addEventListener('change', handleInputCepChange); // ao mudar de lugar do form do cep

     state.inputNumber.addEventListener('keyup', handleInputNumberKeyup); // ao digitar no form ele executa a função
}

// acrescenta o número ao objeto address ao salvar.
function handleInputNumberKeyup(event){
      state.address.number = event.target.value;
}


// função assincrona que completa os espaços da cidade e da rua ao colocar o CEP, além de evitar que o aviso de campo requerido apareça.
async function handleInputCepChange(event){
      const cep = event.target.value;

      try {
      const address = await addressService.findByCep(cep);

      state.inputCity.value = address.city;
      state.inputStreet.value = address.street;
      state.address = address;

      setFormError("cep", "");
      state.inputNumber.focus();
      }   
      catch(e){
            state.inputStreet.value = "";
            state.inputCity.value = "";
            setFormError("cep", "Informe um CEP válido.")
      } 
}


async function handleBtnSaveClick(event){
      event.preventDefault();
      listController.addCard(state.address);
 }



// função que verifica o valor do formulário e se ele foi preenchido.
function handleInputNumberChange(event){
      if (event.target.value == ""){
            setFormError("number", "Campo requerido!");
      } else {
            setFormError("number", "");
      }
      console.log(event)
}



// adiciona o valor ao div relacionado a chave do objeto.
function setFormError(key, value){
      const element = document.querySelector(`[data-error=${key}]`);
      element.innerHTML = value;
}



// impede a ação normal do botão e executa a função para limpar os espaços.      
function handleBtnClearClick(event){
      event.preventDefault();
      clearForm();
}

// vai limpar os forms. 
function clearForm(){
      state.inputCep.value = "";
      state.inputCity.value = "";
      state.inputNumber.value = "";
      state.inputStreet.value = "";

      setFormError("cep", "");
      setFormError("number", "");

      state.inputCep.focus();
}



 