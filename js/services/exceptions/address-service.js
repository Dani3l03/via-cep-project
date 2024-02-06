import * as requestService from '../request-services.js'
import Address from '../../models/address.js';

export async function findByCep(cep){

    const url = `https://viacep.com.br/ws/${cep}/json/`

    const result = await requestService.getJson(url);

    const address = new Address(result.cep, result.logradouro, null, result.localidade); //instanciando o objeto no formato do Address dos dados recebidos pela api.
    return address;
}

export function getErrors(address){
    const errors = {};
    if(!address.cep || address.cep == ""){
        errors.cep = "Campo requerido";
    }

    if(!address.number || address.number == ""){
        errors.number = "Campo requerido";

    }
    return errors;
}