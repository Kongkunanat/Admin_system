import React from 'react'
import "./App.css";
import Layout from "./components/Layout/Layout";
import "./login.css"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const getusername=localStorage.getItem("usernameData")
  const getPassword=localStorage.getItem("passwordData")
  const handleLogin = (values) => {
    Axios.post("http://localhost:3003/login", {
      username: values.username,
      password: values.password,
    }).then((response) => {
      const page = response.data;
      if (page === true) {
        localStorage.setItem("usernameData", JSON.stringify(response.data.username));
      } else {
        localStorage.setItem("usernameData", JSON.stringify(response.data.username));
        // console.log(response.data.username)
        localStorage.setItem("passwordData", JSON.stringify(response.data.password));
        // console.log(response.data.password)
        console.log(response.data.username)
        if(response.data.username!==undefined&&response.data.password!==undefined)
        {
          window.location.reload();
        }
        toast.info(`${response.data.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        caches.keys().then((username) => {
          username.forEach((username) => {
            caches.delete(username);
          });
        });
         
      }

    });
  };

  const validationsLogin = yup.object().shape({
    username: yup
      .string()
      .required("กรุณากรอก username"),
    password: yup
      .string()
      .required("กรุณากรอก Password"),
  });

  return(
    <div>{  
      getusername&&getPassword?
    <Layout />:
    <div className="body">
      <div className="left-login">
        
      </div>

      <div className="right-login">
        <div className="card-login">
          <h1>LOGIN</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
            <Form className="login-form">
              <div className="form-group">
                <label form="username">ชื่อผู้ใช้งาน</label>

                <Field name="username" type='username' className="form-field" placeholder="username" />

                <ErrorMessage
                  component="span"
                  name="username"
                  className="form-error"
                />
              </div>

              {/*Outro campo*/}

              <div className="form-group">
                <label form="username">รหัสผ่าน</label>
                <Field name="password" type='password' className="form-field" placeholder="password" />

                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

              <button className="button" type="submit">
                Submit
              </button>
            </Form>
          </Formik>
        </div>   
         <ToastContainer position='top-right' />
      </div>

    </div>
    }
    </div>
  )
}

export default App;
