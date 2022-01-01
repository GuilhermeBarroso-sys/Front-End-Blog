import styles from './styles.module.scss'
import {Link, Navigate} from 'react-router-dom'
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
      {logout && <Navigate to ='/login' />}
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <p><Link to ='/' >NinjaPress</Link></p>
        </div>
        <nav>
          <ul>
            <li> <Link to = "/about"> Sobre nós </Link></li>
            <li> {user ? <Link to = "/admin"> Admin </Link>:<Link to = "/login"> Login </Link>}</li>
            <li> {user && <a onClick={handleLogout}>Sair</a>}</li>
          </ul>
          
        </nav>
      </div>
    </header>
  )
}