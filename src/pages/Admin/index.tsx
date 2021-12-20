import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import styles from './styles.module.scss';
import {BiShow, BiEditAlt, BiTrashAlt} from 'react-icons/bi'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { Navigate } from "react-router-dom";
import { HandleContext } from "../../contexts/handle";

type User = {
  id: string;
  name: string;
  email: string;
  permission: string;
}
interface HandleDestroy {
  id:string;
  name:string;
  type:string;
  refreshCallback: () => void
}
export function Admin() {
  const [users, setListUsers] = useState<User[]>([])
  const [auth, setAuth] = useState(true);
  const {isAuthenticated} = useContext(AuthContext);
  const {destroy} = useContext(HandleContext)
  function handleDestroy({id,name,type,refreshCallback}: HandleDestroy) {
    destroy({id,name,type,refreshCallback});
  }
  function listAll() {
    api.get<User>(`listAll`).then(({data})  => {
      // @ts-ignore
      setListUsers(data);
    })
  }
  useEffect(() => {
    const authenticated = isAuthenticated();
    if(!authenticated) {
      setAuth(false);
      return;
    }
    listAll();
  },[])
  return (
    <>
    {!auth && <Navigate to="/login" />}
    <Header/>
    <br/>
    <br/>
    <table className={styles.tableStyle}>
      <thead>
        <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Permissao</th>
        <th>Funcoes</th>
        </tr>
      </thead>

      <tbody>
       {users.map((data) => {
         return (
          <tr key={data.id}> 
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.permission}</td>
            <td>
              <div className = {styles.buttonsGroup}>
                <div className={styles.update}>
                  <BiEditAlt color="#F5F5F5" onClick={() => {

                  }}/>
                </div>
                <div className={styles.destroy}>
                <BiTrashAlt color="#F5F5F5" onClick={() => {
                  const {id,name} = data;
                  const type = 'Úsuario'
                  const refreshCallback = () => {listAll()} 
                  handleDestroy({id,name, type, refreshCallback })
                }}/>  
                </div>
                
              </div>
            </td>
          </tr>
         )
       })}
        
      </tbody>
    </table>
    </>

  )
}