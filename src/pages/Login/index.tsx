import React, { useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import styles from './styles.module.scss'
import securityImg from '../../assets/undraw_security_on_re_e491.svg';
import { AuthContext } from "../../contexts/auth";
import Swal from "sweetalert2";
import { Navigate, Redirect } from "react-router-dom/";

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signIn,user} = useContext(AuthContext);
  async function handleSubmit(event : React.FormEvent) {
    event.preventDefault();
    const {success,text} = await signIn({email,password});
    if(!success) {
      Swal.fire('Erro!', text, 'error');
    }
  }
  return(
    <>
    {user && (
    <div className={styles.hidden}>
      {<Navigate to='/admin'/>}
    </div>
    )}
    <Header />
    <form>
      <Form>
        <h1 className={styles.pageTitle}>Login</h1>
        <div className={styles.security}>
          <img src = {securityImg} className={styles.img}/> 
        </div>
        <label htmlFor="email">E-mail</label>
        <input type = "email" name = "email" className={styles.email} id = "email" required onChange={(event)=>{
          setEmail(event.target.value)
        }}/>
        <label htmlFor="email">Senha</label>
        <input type = "password" name = "password" className={styles.password} id = "password" required onChange={(event)=>{
          setPassword(event.target.value)
        }}/>
        <Button onClick={handleSubmit}>Entrar</Button>
      </Form>
    </form>
    </>
  )
}