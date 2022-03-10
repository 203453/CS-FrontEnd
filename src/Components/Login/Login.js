import axios from "axios";
import './Login.css'
import { Link } from "react-router-dom";

function App() {

  const requestOptions = {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer my-token',
    },
  };

  window.onload = function login_Logged(){
    var user = localStorage.getItem('id_user');
    var token = localStorage.getItem('token');

    if(user != null || token != null){
        window.location='/profile';
    }
  }

  const setLocalStorage = (value) => {
    try {
      localStorage.setItem('token', value.token);
      localStorage.setItem('id_user', value.user_id);
    } catch (error) {
      console.log(error)
    }
  }

  const validate_Login = () => {

    var usernameVal = document.getElementById('username').value;
    var passwordVal = document.getElementById('password').value;

    if(usernameVal === '' || passwordVal === ''){
      alert('Rellene todos los campos')
      
    }else{
      consume_Login();
    }
  }

  const consume_Login = () => {

    var postData = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    }
  
    axios
    .post("http://localhost:8000/api/v1/login",postData, requestOptions)
     .then(response => {
      //console.log(response.data)
      setLocalStorage(response.data)
      //localStorage.getItem('token');
      alert("Inicio de sesion exitoso\nSu ID es: " + response.data.user_id)
      window.location="/profile";
    })
    .catch((error) => {
      alert("Error \n\n" + error.response.data.non_field_errors);
    });
  };

  return (
    <div className="login-form">
      <header className="App-header">
        <h1>Login</h1>
        <input type="text" id="username" placeholder="Username"/>
        <input type="password" id="password" placeholder="Password"/>
        <button id="form-btn" onClick={validate_Login}>Acceder</button>
        <Link to="/Register" className="create-account">Crear cuenta</Link>
      </header>
    </div>
  );
}

export default App;
