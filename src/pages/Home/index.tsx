import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss"
import gifCardAnimated from '../../assets/animation_500_kwcvnunc.gif'
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
export function Home() {
  return(
    <>
    <Header />
    <div className={styles.content}>
      <div className={styles.contentContainer}>
        <div className={styles.welcomeTitle}>
          <h1>Seja bem vindo!</h1>
        </div>
        <div className={styles.animationGif}>
          <img src = {gifCardAnimated} alt = "gif"/>
        </div>
        <div className={styles.cardContainer}>
          <Card 
            title="Conheça o NinjaPress!"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget blandit nibh, sit amet ullamcorper nulla. Mauris sollicitudin est massa. Nullam tortor justo, tincidunt vitae nulla ornare, feugiat vehicula nunc. Nam malesuada feugiat quam in mattis.
            <div className = {styles.footer}>
              <Button >
                <Link to="/about">  
                  Saiba mais
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
    </>
  )
}