import React, { useState } from 'react';
import './EmailListForm.css';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const EmailListForm = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    addToMailchimp(email)
      .then((data) => {
        alert(data.result);
      })
          .catch((error) => {
          console.log('error', error);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit} className={"EmailListForm"}>
      <h2>Inscreva-se em nossa newsletter!</h2>
      <p>Nós atualizamos o blog semanalmente com posts sobre viagem e vida no exterior. <b>Nossos pais não perdem um post sequer.</b> Você também não vai querer perder!</p>
      <div className={'Wrapper'}>
        <input
          placeholder="Digite seu e-mail"
          name="email"
          type="text"
          onChange={handleEmailChange}
        />
        <button type="submit">Inscrever-se</button>
      </div>
    </form>
  );
};

export default EmailListForm;
