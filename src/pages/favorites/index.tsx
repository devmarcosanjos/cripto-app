import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CoinProps } from '../home';
import styles from './favorites.module.css';
import { BiTrash, BiArrowBack } from 'react-icons/bi';

export function Favorites() {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const myList = localStorage.getItem("@bluestash");
    setCoins(myList ? JSON.parse(myList) : []);
  }, []);

  function handleDelete(id: string) {
    const myList = coins.filter(coin => coin.id !== id);
    localStorage.setItem("@bluestash", JSON.stringify(myList));
    setCoins(myList);
  }

  return (
    <div className={styles.container}>
      <button 
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <BiArrowBack size={24} />
        Voltar
      </button>

      <h1>Minhas moedas favoritas</h1>

      {coins.length === 0 && (
        <p>Você não tem moedas salvas 😢</p>
      )}

      <table>
        <thead>
          <tr>
            <th className="col">Moeda</th>
            <th className="col">Valor de mercado</th>
            <th className="col">Preço</th>
            <th className="col">Volume</th>
            <th className="col">Remover</th>
          </tr>
        </thead>

        <tbody>
          {coins.map(coin => (
            <tr key={coin.id} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <div className={styles.name}>
                  <img
                    className={styles.img}
                    src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                    alt={coin.name}
                  />
                  <Link to={`/detail/${coin.id}`} className={styles.link}>
                    <span>{coin.name}</span> | {coin.symbol}
                  </Link>
                </div>
              </td>

              <td className={styles.tdLabel} data-label="Valor de mercado">
                {coin.formatMarketCap}
              </td>

              <td className={styles.tdLabel} data-label="Preço">
                {coin.formatPrice}
              </td>

              <td className={styles.tdLabel} data-label="Volume">
                {coin.formatVolume}
              </td>

              <td className={styles.tdLabel}>
                <button 
                  className={styles.buttonRemove} 
                  onClick={() => handleDelete(coin.id)}
                >
                  <BiTrash size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}