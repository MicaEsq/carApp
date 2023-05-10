import { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let url = 'http://localhost:3001/register';
    let method = 'POST';
    let msgError = "Error, the password or username is invalid.";
    let data = {username: username, password: password, name:name, email:email};

    var requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
    
    
    fetch(url, requestOptions)
    .then(response => {
        if (response.ok){
            return Promise.all([response.ok, response.json()]);
        }
        else{
            return response.text().then(text => {throw new Error(text)});
        }
    })
    .then(([responseOk, body]) => {

        /* this.setState(prevState => ({
            error: {
                ...prevState.error,           
                status: false,         
                msg:'',
            }
        })); */
        alert('successfully logged');

        // Here you can perform your login logic
        // For this example, let's just log the email and password to the console
        console.log('User:', username);
        console.log('Password:', password);

        // Reset the form fields
        setUsername('');
        setName('');
        setEmail('');
        setPassword('');
        //window.location.replace('/index');
        
    })
    .catch((error) => {
        console.log('error');
            /* let errorObject = JSON.parse(error.message);
            let errorMessage = '';
            if(Object.keys(errorObject).length == 1){
                errorMessage = Object.values(errorObject);
            }
            this.setState(prevState => ({
            error: {
                ...prevState.error,           
                status: true,         
                msg:'Warning! ' + errorMessage,
            }
            })); */
    });

    
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User:</label>
          <input
            
            id="user"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="user">Full name:</label>
          <input
            
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="user">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default RegisterPage;