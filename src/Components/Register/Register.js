import axios from "axios";
import './Register.css';
import { useNavigate, Link } from "react-router-dom";

function App() {

const navigate = useNavigate();

const requestOptions = {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer my-token',
    },
  };

// const obtener_Token = () => {
//     alert(localStorage.getItem('token'))
// }

const handleClick = () => {
  navigate('/Login');
};

const validate_Register = () => {

  var usernameVal = document.getElementById('username').value;
  var passwordVal = document.getElementById('password').value;
  var fNameVal = document.getElementById('first_name').value;
  var lNameVal = document.getElementById('last_name').value;
  var emailVal = document.getElementById('email').value;
  var password2Val = document.getElementById('password2').value;

  if(usernameVal === '' || passwordVal === '' || fNameVal === '' || lNameVal === '' || emailVal === '' || password2Val === ''){
    alert('Rellene todos los campos')
    
  }else{
    consume_Register();
  }
}

  const consume_Register = () => {

    var postData = {
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      password2: document.getElementById('password2').value,
    }


    axios
    .post("http://localhost:8000/api/v1/register/createUser/",postData, requestOptions)
     .then(response => {
      console.log(response.data);
      alert("Registro exitoso")
      handleClick();
      })
    .catch((error) => {
      console.log(error.response.data)
      alert("Error \n\n" + error.response.data);
    });
    
  };

  return (
    <div className="register-form">
      <header className="App-header">
          <h1>Register</h1>
          <input type="text" id="first_name" placeholder="First name" required/>
          <input type="text" id="last_name" placeholder="Last name" required/>
          <input type="text" id="username" placeholder="Username" required/>
          <input type="email" id="email" placeholder="Email" required/>
          <input type="password" id="password" placeholder="Password" required/>
          <input type="password" id="password2" placeholder="Confirm password" required/>
          <button id="form-btn" onClick={validate_Register}>Crear cuenta</button>
          <Link to="/Login" className="create-account">Ya tienes una cuenta?</Link>
      </header>
    </div>
  );
}

export default App;