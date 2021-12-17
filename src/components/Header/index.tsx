import styles from './styles.module.scss'
import {Link, Navigate} from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
export function Header() {
  const {user,signOut} = useContext(AuthContext);
  const [logout, setLogout] = useState(false);
  function handleLogout(event : FormEvent) {
    signOut();
    setLogout(true);
  }
  return(
    <header className={styles.header}>
      {logout && <Navigate to ='/' />}
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <p>NinjaPress</p>
        </div>
        <div className={styles.home}>
          <p>Home</p>
        </div>
        <nav>
          <ul>
            <li> <Link to = "/about"> Sobre nós </Link></li>
            <li> <Link to = "/services"> Serviços </Link></li>
            <li> {user ? <a onClick={handleLogout}>Sair</a>:<Link to = "/login"> Login </Link>}</li>
          </ul>
          
        </nav>
      </div>
    </header>
  )
}