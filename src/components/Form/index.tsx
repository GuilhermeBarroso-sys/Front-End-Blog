import { ReactNode } from 'react'
import styles from './styles.module.scss'
interface FormProps {
  children: ReactNode
}
export function Form({children} : FormProps) {
  return (
    <div className={styles.form}>
      <div className={styles.formContainer}>
        {children}
      </div>
    </div>
  )
}