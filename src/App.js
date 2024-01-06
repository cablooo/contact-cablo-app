import React, { useState, useRef } from "react";
import emailjs from 'emailjs-com';
import './styles/app.scss';

function App() {

  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isPending, setIsPending] = useState(false)
    const form = useRef();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true)

        emailjs.sendForm('service_u2o6rct', 'template_vpdw5vt', form.current, 'mXi3MuI0aowNjswcW')
        .then((result) => {
            setIsPending(false)
            setName('')
            setEmail('')
            setMessage('')
        }, (error) => {
        });

        // google sheet
        try {
          await fetch("https://v1.nocodeapi.com/cablo/google_sheets/YhwNIhWlJFRKmoxm?tabId=Sheet1", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([[name, email, message]]),
          })
        } catch (err) {
          console.log(err)
        }

    };

  return (
    <div className="App">
      <form ref={form} onSubmit={handleSubmit}>
        <h1>Contact Us 👋</h1>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name.."
          autoComplete="off"
          required
        />

        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email.."
          autoComplete="off"
          required
         />

        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message.."
          autoComplete="off"
          cols="21"
          rows="10"
          required
         ></textarea>

        { !isPending && <button type="submit" value="send">Send</button> }
        { isPending && <button disabled>Sending...</button> }
      </form>
    </div>
  );
}

export default App;
