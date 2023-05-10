import { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let url = 'http://localhost:3001/login';
    let method = 'POST';
    let msgError = "Error, the password or username is invalid.";
    let data = {username: username, password: password};

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
        setPassword('');
        window.location.replace('/index');
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

export default LoginPage;