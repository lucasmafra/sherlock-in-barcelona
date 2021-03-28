import React, { useState } from 'react';
import './EmailListForm.css';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const SubscriptionResult = ({ result }) => {
    const { msg, status } = result;
    const statusColor = {
        success: 'green',
        error: 'red'
    };
    return <p style={{ marginTop: 16, fontWeight: 600, color: statusColor[status] }} dangerouslySetInnerHTML={{__html: msg}}/>;
};

const EmailListForm = () => {

  const [email, setEmail] = useState('');
  const [subscriptionResult, setSubscriptionResult] = useState(null);

  const handleSubmit = (e) => {
    addToMailchimp(email)
      .then((data) => {
        setEmail('');
        setSubscriptionResult({
            status: data.result,
            msg: data.result === 'success' ? 'Inscrição feita com sucesso! Agora é só esperar pelo próximo post :)' : data.msg,
        });
      }).catch((error) => {
          setSubscriptionResult({
              status: 'error',
              msg: error.msg
        });
     });
  };

  const handleEmailChange = (event) => {
    setSubscriptionResult(null);
    setEmail(event.currentTarget.value);
  };

  return (
    <div className={"EmailListForm"}>
      <h2>Inscreva-se em nossa newsletter!</h2>
      <p>Nós atualizamos o blog semanalmente com posts sobre viagem e a vida no exterior. <b>Nossos pais não perdem um post sequer.</b> Você também não vai querer perder!</p>
      <div className={'Wrapper'}>
        <input
          placeholder="Digite seu e-mail"
          name="email"
          type="text"
          onChange={handleEmailChange}
        />
        <button onClick={handleSubmit}>Inscrever-se</button>
      </div>
      {subscriptionResult && <SubscriptionResult result={subscriptionResult}/>}
    </div>
  );
};

export default EmailListForm;
