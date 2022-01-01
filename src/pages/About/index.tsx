import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import styles from './style.module.scss';
export function About() {
  return (
    <>  
    <Header />
    <div className={styles.container}>
      <br/>
      <Card
        title="Sobre nós"
      >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget blandit nibh, sit amet ullamcorper nulla. Mauris sollicitudin est massa. Nullam tortor justo, tincidunt vitae nulla ornare, feugiat vehicula nunc. Nam malesuada feugiat quam in mattis.
      </Card>
      <br/>
      <Card
        title="Nossos produtos"
      >
      Aliquam egestas dolor non imperdiet maximus. Nunc id erat in arcu porttitor interdum. Nam nec nunc sem. Quisque molestie ultricies erat. Etiam maximus metus eu pretium maximus. Donec sodales facilisis leo, ac lobortis urna egestas in. Etiam blandit tincidunt congue. Maecenas a viverra dui. Nam molestie tortor non risus ultrices iaculis. Curabitur facilisis tincidunt tellus ac sollicitudin. Aenean fringilla lobortis tempor.
      </Card>
      <br/>
      <Card
        title="Nosso time"
      >
      Vivamus quis ullamcorper eros. Phasellus sollicitudin justo blandit facilisis sollicitudin. Nam dapibus lorem urna, quis tempor nulla feugiat vitae. Suspendisse lacinia tincidunt nisi sit amet volutpat. Pellentesque tellus dui, venenatis et purus sit amet, sollicitudin iaculis enim. Vestibulum pellentesque quam eu ornare imperdiet. Nullam ac tincidunt lorem. Suspendisse aliquet eu lorem et eleifend. Donec interdum nisl tempus lacus congue, nec facilisis nunc tristique. Etiam sagittis tortor eu lectus fermentum, et rutrum justo hendrerit. Mauris in tempor dolor.
      </Card>
    </div>
    </>
  )
}