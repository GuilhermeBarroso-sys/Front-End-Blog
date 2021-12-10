import { ReactChildren } from "react";
import { Button } from "../Button";
import styles from './styles.module.scss'
interface reactProps {
  title: string | null,

  children: React.ReactNode
}

export function Card({title,children}:reactProps) {
  return (
    <div className = {styles.card}>
      <div className = {styles.cardContainer}>
        <div className = {styles.header}>
          <h1>{title}</h1>
        </div>
        <div className = {styles.body}>
          <p>{children}</p> 
        </div>
        <div className = {styles.footer}>
          <Button onClick={() => {
            alert("hello world!");
          }}>
            Saiba mais
          </Button>
        </div>
      </div>
    </div>
  )
}