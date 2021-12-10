import styles from './styles.module.scss'
import {Link} from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
export function Header() {
  return(
    <header className={styles.header}>
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
            <li> <Link to = "/login"> Login </Link></li>
          </ul>
          
        </nav>
      </div>
    </header>
  )
}