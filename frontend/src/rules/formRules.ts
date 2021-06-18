import { RegisterOptions } from "react-hook-form";

const rulesName: RegisterOptions = {
    required: {value: true, message: "campo obrigatorio"},
    minLength: {value: 4, message: "Minimo 4 letras."},
    maxLength: {value: 20, message: "Maximo de 20 letras."}
  }
  export {rulesName};

  const rulesEmail: RegisterOptions = {
    required: {value: true, message: "campo obrigatorio"},
    minLength: {value: 8, message: "email invalido"},
  }
  export {rulesEmail};

  const rulesPassword: RegisterOptions = {
    required: {value: true, message: "campo obrigatorio"},
    minLength: {value: 6, message: "Minimo 6 digitos "},
  }
  export {rulesPassword};
