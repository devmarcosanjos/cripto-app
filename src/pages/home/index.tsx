import { BsSearch, BsStar, BsStarFill } from "react-icons/bs";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState, useCallback, useMemo } from "react";

export interface CoinProps {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
  formatPrice?: string;
  formatMarketCap?: string;
  formatVolume?: string;
}

interface DataProp {
  data: CoinProps[];
}

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<CoinProps[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);

  const price = useMemo(() => Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }), []);

  const priceShort = useMemo(() => Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
  }), []);

  const getData = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/assets?limit=10&offset=${offset}&apiKey=${API_KEY}`);
    const data: DataProp = await response.json();
    const coinsData = data.data;

    const formatDataResult = coinsData.map((item) => {
      return {
        ...item,
        formatPrice: price.format(Number(item.priceUsd)),
        formatMarketCap: priceShort.format(Number(item.marketCapUsd)),
        formatVolume: priceShort.format(Number(item.volumeUsd24Hr)),
      };
    });

    setCoins(prevCoins => [...prevCoins, ...formatDataResult]);
  }, [offset, price, priceShort]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const myList = localStorage.getItem("@bluestash");
    if (myList) {
      const favoritesIds = JSON.parse(myList).map((coin: CoinProps) => coin.id);
      setFavorites(favoritesIds);
    }
  }, []);

  function handleSaveCoin(coin: CoinProps) {
    const myList = localStorage.getItem("@bluestash");
    const coinsSaved: CoinProps[] = myList ? JSON.parse(myList) : [];

    const hasCoin = coinsSaved.some((item) => item.id === coin.id);

    if (hasCoin) {
      const filteredCoins = coinsSaved.filter((item) => item.id !== coin.id);
      localStorage.setItem("@bluestash", JSON.stringify(filteredCoins));
      setFavorites(favorites.filter(id => id !== coin.id));
    } else {
      coinsSaved.push(coin);
      localStorage.setItem("@bluestash", JSON.stringify(coinsSaved));
      setFavorites([...favorites, coin.id]);
    }
  }

  // Função para filtrar as moedas
  const handleSearch = (value: string) => {
    setInput(value);
    
    const filtered = coins.filter((coin) => 
      coin.name.toLowerCase().includes(value.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredCoins(filtered);
  };

  function handleSubmit(e: FormEvent){
    e.preventDefault();

    if(!input) return;

    // Procura pela moeda exata
    const coin = coins.find(
      (coin) => 
        coin.id.toLowerCase() === input.toLowerCase() ||
        coin.symbol.toLowerCase() === input.toLowerCase()
    );

    if(coin) {
      navigate(`/detail/${coin.id}`);
    }
  }

  function handleGetMore(){
    // Increment the offset by 10 each time to load the next batch of coins
    setOffset(prevOffset => prevOffset + 10)
  }

  useEffect(() => {
    setFilteredCoins(coins);
  }, [coins]);

  return (
  <>
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <BsSearch size={20} color="#666" />
          <input 
            type="text" 
            placeholder="Digite o símbolo ou nome da moeda..." 
            value={input}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button type="submit">
          Buscar
        </button>
      </form>

      {/* Tabela */}
      <table>
        <thead>
          <tr>
            <th className="col">Moeda</th>
            <th className="col">Valor de mercado</th>
            <th className="col">Preço</th>
            <th className="col">Volume</th>
            <th className="col">Mudança 24h</th>
            <th className="col">Favoritar</th>
          </tr>
        </thead>

        <tbody id="tbody">
         {filteredCoins.length > 0 ? filteredCoins.map((coin) => (
           <tr className={styles.tr} key={coin.id}>
            <td className={styles.tdLabel} data-label="Moeda">
              <div className={styles.name}>
                <img 
                className={styles.img}
                src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`} alt={coin.name} />
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

            <td className={Number(coin.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h">
              <span>{Number(coin.changePercent24Hr).toFixed(2)}%</span>
            </td>

            <td className={styles.tdLabel} data-label="Favoritar">
              <button 
                className={styles.favoriteButton}
                onClick={() => handleSaveCoin(coin)}
              >
                {favorites.includes(coin.id) ? (
                  <BsStarFill size={24} color="#FFD700" />
                ) : (
                  <BsStar size={24} color="#FFF" />
                )}
              </button>
            </td>
          </tr>
          )) : (
            <tr>
              <td colSpan={6} style={{textAlign: 'center', padding: '20px', color: '#FFF'}}>
                Nenhuma moeda encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {filteredCoins.length === coins.length && (
        <button 
          className={styles.buttonMore} 
          onClick={handleGetMore}  
        >
          Carregar mais...
        </button>
      )}

    </main>

     <footer className={styles.footer}>
        <hr className={styles.hr} />
        <p className={styles.namedev}>Desenvolvido por 
          <a href="https://www.marcosanjos.site/" target="_blank" rel="noreferrer"> Marcos Anjos | Bluestash</a>
          <br />
        </p>
        <p>Informações fornecidas por CoinCap</p>
        <p>Última atualização: {new Date().toLocaleString()}</p>
      </footer>
  </>
  );
}