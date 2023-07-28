import { Msg } from '../../assets/texts'
import styles from './NotFound.module.css'

const NotFound = () => {
  return  <p className={styles.notFound}>{Msg.NOT_FOUND}</p> 
}

export default NotFound