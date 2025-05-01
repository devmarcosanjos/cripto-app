import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CoinProps } from '../home';
import styles from './favorites.module.css';
import { BiTrash, BiArrowBack, BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi';

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

  // Ordenar moedas por variação percentual
  const sortedCoins = [...coins].sort((a, b) => 
    Number(b.changePercent24Hr) - Number(a.changePercent24Hr)
  );

  const topGainers = sortedCoins.slice(0, 3);
  const topLosers = [...sortedCoins].reverse().slice(0, 3);

  return (
    <div className={styles.container}>
      <button 
        className={styles.backButton}
        onClick={() => navigate(-1)}
        title="Voltar"
      >
        <BiArrowBack size={24} />
        Voltar
      </button>

      <h1>Minhas moedas favoritas</h1>

      {coins.length === 0 ? (
        <p>Você não tem moedas salvas 😢</p>
      ) : (
        <>
          <div className={styles.dashboard}>
            <div className={styles.dashboardSection}>
              <h2>Maiores Altas</h2>
              <div className={styles.cardsContainer}>
                {topGainers.map(coin => (
                  <div key={coin.id} className={`${styles.card} ${styles.gainCard}`}>
                    <div className={styles.cardHeader}>
                      <img
                        src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                        alt={coin.name}
                        className={styles.cardImg}
                      />
                      <BiUpArrowAlt size={24} color="#00FF00" />
                    </div>
                    <Link to={`/detail/${coin.id}`} className={styles.cardLink}>
                      <h3>{coin.name}</h3>
                      <p className={styles.symbol}>{coin.symbol}</p>
                    </Link>
                    <div className={styles.cardInfo}>
                      <p className={styles.price}>{coin.formatPrice}</p>
                      <p className={`${styles.change} ${styles.positive}`}>
                        +{Number(coin.changePercent24Hr).toFixed(2)}%
                      </p>
                    </div>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDelete(coin.id)}
                    >
                      <BiTrash size={20} />
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.dashboardSection}>
              <h2>Maiores Baixas</h2>
              <div className={styles.cardsContainer}>
                {topLosers.map(coin => (
                  <div key={coin.id} className={`${styles.card} ${styles.lossCard}`}>
                    <div className={styles.cardHeader}>
                      <img
                        src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                        alt={coin.name}
                        className={styles.cardImg}
                      />
                      <BiDownArrowAlt size={24} color="#FF0000" />
                    </div>
                    <Link to={`/detail/${coin.id}`} className={styles.cardLink}>
                      <h3>{coin.name}</h3>
                      <p className={styles.symbol}>{coin.symbol}</p>
                    </Link>
                    <div className={styles.cardInfo}>
                      <p className={styles.price}>{coin.formatPrice}</p>
                      <p className={`${styles.change} ${styles.negative}`}>
                        {Number(coin.changePercent24Hr).toFixed(2)}%
                      </p>
                    </div>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDelete(coin.id)}
                    >
                      <BiTrash size={20} />
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.tableSection}>
            <h2>Todas as Moedas</h2>
            <table>
              <thead>
                <tr>
                  <th>Moeda</th>
                  <th>Valor de mercado</th>
                  <th>Preço</th>
                  <th>Volume</th>
                  <th>Remover</th>
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
        </>
      )}
    </div>
  );
}