/* eslint-disable */
import * as yup from 'yup'

yup.setLocale({
  mixed: {
    default: 'Não é válido',
    required: 'Campo obrigatório',
  },
  string: {
    email: 'Preencha um e-mail válido',
    min: 'Valor muito curto, deve ser maior que ${min} caracteres',
    max: 'Valor muito longo, deve ser menor que ${max} caracteres',
  },
  number: {
    typeError: 'Campo inválido',
    min: 'Valor inválido, deve ser maior que ${min}',
    max: 'Valor inválido, deve ser menor que ${max}',
  },
})

export default yup
