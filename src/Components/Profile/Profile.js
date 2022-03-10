import axios from "axios";
import './Profile.css';
import { useNavigate } from "react-router-dom";

function Profile() {

    var token = localStorage.getItem('token');
    let img_url = "";
    var user = localStorage.getItem('id_user');

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Token ' + token,
        },
        };

    const requestOptions2 = {
    method: 'PUT',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
    },
    };

    const requestOptionsDelete = {
        method: 'DELETE',
        headers: { 
            'Authorization': 'Token ' + token,
        },
        };

    const mod_User = () => {
        document.getElementById('done_btn').style.visibility = 'visible';
        document.getElementById('edit_btn').style.visibility = 'hidden';
        document.getElementById('update_btn').style.visibility = 'hidden';
        document.getElementById('logout_btn').style.visibility = 'hidden';
        document.getElementById('delet_btn').style.visibility = 'hidden';
        document.getElementById('img').style.visibility = 'hidden';
        document.getElementById('upload_btn').style.visibility = 'hidden';
        const username = document.getElementById('username');
        const name = document.getElementById('editName');
        const name2 = document.getElementById('editName2');
        const email = document.getElementById('editEmail');
        username.contentEditable=true;
        username.style.backgroundColor="#0000004D";
        username.style.borderRadius="5px"
        name.contentEditable=true;
        name.style.backgroundColor="#0000004D";
        name.style.borderRadius="5px"
        name2.contentEditable=true;
        name2.style.backgroundColor="#0000004D";
        name2.style.borderRadius="5px"
        email.contentEditable=true;
        email.style.backgroundColor="#0000004D";
        email.style.borderRadius="5px"
    }

    const done_User = () => {
        document.getElementById('done_btn').style.visibility = 'hidden';
        document.getElementById('edit_btn').style.visibility = 'visible';
        document.getElementById('update_btn').style.visibility = 'visible';
        document.getElementById('logout_btn').style.visibility = 'visible';
        document.getElementById('delet_btn').style.visibility = 'visible';
        document.getElementById('img').style.visibility = 'visible';
        document.getElementById('upload_btn').style.visibility = 'visible';
        const username = document.getElementById('username');
        const name = document.getElementById('editName');
        const name2 = document.getElementById('editName2');
        const email = document.getElementById('editEmail');
        username.contentEditable = false;
        username.style.backgroundColor = "#FFFFFF00";
        name.contentEditable = false;
        name.style.backgroundColor = "#FFFFFF00";
        name2.contentEditable = false;
        name2.style.backgroundColor = "#FFFFFF00";
        email.contentEditable = false;
        email.style.backgroundColor = "#FFFFFF00";
    }

    const update_User = () => {

        var postData = {
            username:  document.getElementById('username').textContent,
            first_name:  document.getElementById('editName').textContent,
            last_name:  document.getElementById('editName2').textContent,
            email:  document.getElementById('editEmail').textContent,
          }

          console.log(postData)
          axios
            .put("http://localhost:8000/api/v1/profile/update_user/" + user + "/",postData, requestOptions2)
            .then(response => {
                console.log(response.data);
                alert("Perfil actualizado")
            })
            .catch((error) => {
                console.log(error.response.data)
                alert("Error al actualizar perfil\n" + error.response.data);
            });
    }


    const consume_Img = () => {

        let putData = new FormData();

        putData.append('id_user', user);
        putData.append('url_image', document.getElementById('img').files[0]);

        axios.put("http://localhost:8000/api/v1/profile/user/"+user+"/", putData,{headers:{'Content-Type':'multipart/form-data', 'Authorization':'Token '+token},
        })
        .then(
            (response) => {
                img_url = "http://localhost:8000"+response.data.url_image;
                document.getElementById('preview').src = img_url;
                window.location.reload();
            }
        )
        .catch((error)=>{
            console.log(error.data)
            alert("Error al actualizar imagen");
        })
    }

    const consume_User = () => {
        
        let postData = new FormData();
        postData.append('id_user', user);
        var img_validation = document.getElementById('img').files[0];
        postData.append('url_image', img_validation);

        if(img_validation != null){
            axios.post("http://localhost:8000/api/v1/profile/add_user", postData,requestOptions).then((response)=>{
                img_url = "http://localhost:8000"+response.data.url_image;
                document.getElementById('preview').src = img_url;
                window.location.reload();         
            }).catch((error)=>{
                if(error.response.data === "Error"){
                    consume_Img();
                }
            })
        }else{
            alert("Inserte una imagen");
        }
    }

    const delete_img=()=>{

        var url = "http://localhost:8000/api/v1/profile/user/"+user+"/";

        axios.delete(url, requestOptionsDelete)
        .then((response) => {
            alert("Se elimino la imagen")
            window.location.reload();      
            }
        )
        .catch((error)=>{
            console.log(error.response.data)
            alert("Error al eliminar imagen");
        })
    };

    window.onload = function visualize_data(){
        var user = localStorage.getItem('id_user');
        var token = localStorage.getItem('token');

        document.getElementById('done_btn').style.visibility = 'hidden';


        if(user === null || token === null){
            window.location='/login';
        }

        axios.get("http://localhost:8000/api/v1/profile/user/" + user + "/",{
            headers:{'Authorization' :'Token '+ token,},
        })
        .then((response) =>{
            console.log(response.data.url_image)
            if(response.data.url_image !== null){
                img_url = "http://localhost:8000" + response.data.url_image;
                document.getElementById('preview').src = img_url;
            }else{
                document.getElementById('preview').src = "https://d3ipks40p8ekbx.cloudfront.net/dam/jcr:3a4e5787-d665-4331-bfa2-76dd0c006c1b/user_icon.png";
            }
        })
        .catch((error)=>{
            console.log(error)
            document.getElementById('preview').src = "https://d3ipks40p8ekbx.cloudfront.net/dam/jcr:3a4e5787-d665-4331-bfa2-76dd0c006c1b/user_icon.png";
        })

        axios
          .get("http://localhost:8000/api/v1/profile/update_user/" + user + "/",{
            headers:{'Authorization' :'Token '+ token,},
          })
          .then(response => {
              console.log(response.data);
              document.getElementById('username').textContent = response.data.username;
              document.getElementById('editName').textContent = response.data.first_name;
              document.getElementById('editName2').textContent = response.data.last_name;
              document.getElementById('editEmail').textContent = response.data.email;

          })
          .catch((error) => {
              console.log(error.response.data)
              alert("Error\n" + error.response.data);
          });

    }

    const navigate = useNavigate();
    let log_out = () => {
        localStorage.clear();
        navigate("/Login");
    }

    return(
        <div id="container">
            <div className="circular--portrait"> 
                <img id="preview" alt="error img"/> 
            </div>
            
            <div id="form">
                <p id="username" className="user-name"></p>
                <p id="editName"></p> <p id="editName2" align="right"></p>

                <p id="editEmail"></p>
                
                <div className="upload-img"><input accept="image/png, image/jpeg" type="file" id="img"></input><button id="upload_btn" className="user_btn" onClick={consume_User}>Upload</button> </div>

                <div className="botones">
                    <button id="update_btn" className="user_btn" type="submit" onClick={update_User}>Actualizar</button> 
                    <button id="edit_btn" className="mod_btn" type="submit" onClick={mod_User}>Modificar</button> 
                    <button id="done_btn" className="done_btn" type="submit" onClick={done_User}>Hecho</button>
                    <button id="logout_btn" className="logout_btn" type="submit" onClick={log_out}>Cerrar Sesión</button>  
                </div>
            </div>
            <button id="delet_btn" className="delet_btn" type="submit" onClick={delete_img}>Eliminar imagen</button>
        </div>
    )
}

export default Profile;