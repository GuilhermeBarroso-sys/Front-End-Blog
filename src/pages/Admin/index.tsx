import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import styles from './styles.module.scss';
import {BiShow, BiEditAlt, BiTrashAlt} from 'react-icons/bi'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

type User = {
  id: string;
  name: string;
  email: string;
  permission: string;
}

export function Admin() {
  const [users, setListUsers] = useState<User[]>([])
  const {isAuthenticated} = useContext(AuthContext);
  function listAll() {
    api.get<User>(`listAll`).then(({data})  => {
      // @ts-ignore
      setListUsers(data);
    })
  }
  function handleDestroy(id : string) {

  }
  useEffect(() => {
    isAuthenticated();
    listAll();
  },[])
  return (
    <>
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
                  Swal.fire({
                    title: 'Tem certeza?',
                    text: `Ao confirmar, o Usuário ${data.name} Será removido.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#787A91',
                    focusConfirm: false,
                    cancelButtonText: 'Voltar',
                    confirmButtonText: 'Deletar'
                  }).then(({isConfirmed}) => {
                    if (isConfirmed) {
                      api.delete(`destroy/${data.id}`).then((test) => {
                        Swal.fire(
                          'Deletado!',
                          `O Usuário ${data.name} foi deletado.`,
                          'success'
                        )
                        listAll();
                      });
                      
                    }
                  })
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