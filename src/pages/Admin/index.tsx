import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import styles from './styles.module.scss';
type User = {
  id: string;
  name: string;
  email: string;
  permission: string;
}

export function Admin() {
  const [users, setListUsers] = useState<User[]>([])
  useEffect(() => {
    const token = localStorage.getItem('@dolphinBlog:token');
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    api.get<User>(`listAll`).then(({data})  => {
      setListUsers(data);
    })  
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
              teste
            </td>
          </tr>
         )
       })}
        
      </tbody>
    </table>
    </>

  )
}