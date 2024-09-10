const validEmail = (email) => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(email);
}

export const emailAndPasswordValidate = (email, password) => {
    const errors = [];

    if (password.length <= 6) errors.push('A senha deve ter no mínimo 6 caracteres.');
    if (!validEmail(email)) errors.push('Email incorreto, o formato padrão de ser seguido.');
    
    return errors; 
  }

