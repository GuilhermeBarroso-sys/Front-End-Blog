import styles from './styles.module.scss'
interface ButtonProps {
  onClick?: (event: any) => void | undefined;
  children: React.ReactNode
}

export function Button({children, onClick = undefined}:ButtonProps) {
  return (
    <button onClick={onClick} className={styles.button}>
      <p>{children} </p>
    </button>
  )
}