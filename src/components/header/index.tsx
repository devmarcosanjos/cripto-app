import { Link } from "react-router-dom"
import logo from "../../assets/BlueStashCurrency.svg"
import { BsStarFill } from "react-icons/bs"
import styles from "./header.module.css"

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.hero}>
        <Link to={"/"}>
          <img src={logo} alt="Logo"/>
        </Link>
      </div>
      <Link to="/favorites" className={styles.favoritesLink}>
        <BsStarFill size={24} />
        Favoritos
      </Link>
    </header>
  )
}