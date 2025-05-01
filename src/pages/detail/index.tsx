import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CoinProps } from "../home";
import styles from "./detail.module.css";
import { BiArrowBack } from "react-icons/bi";
import { BsStar, BsStarFill } from "react-icons/bs";

interface ResponseData {
  data: CoinProps
}

export function Detail() {
  const [coin, setCoin] = useState<CoinProps>();
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const { cripto } = useParams();
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const ASSETS_URL = import.meta.env.VITE_ASSETS_URL;

  useEffect(() => {
    const checkFavorite = () => {
      const myList = localStorage.getItem("@bluestash");
      if (myList) {
        const favorites = JSON.parse(myList);
        setIsFavorite(favorites.some((favCoin: CoinProps) => favCoin.id === cripto));
      }
    };

    checkFavorite();
  }, [cripto]);

  function handleFavorite() {
    if (!coin) return;

    const myList = localStorage.getItem("@bluestash");
    let coinsSaved: CoinProps[] = myList ? JSON.parse(myList) : [];

    if (isFavorite) {
      coinsSaved = coinsSaved.filter((item) => item.id !== coin.id);
      setIsFavorite(false);
    } else {
      coinsSaved.push(coin);
      setIsFavorite(true);
    }

    localStorage.setItem("@bluestash", JSON.stringify(coinsSaved));
  }

  useEffect(() => {
    async function getCoin() {
      try {
        const response = await fetch(`${API_BASE_URL}/assets/${cripto}?apiKey=${API_KEY}`);
        
        if (!response.ok) {
          throw new Error('Moeda não encontrada');
        }

        const data: ResponseData = await response.json();
        
        if (!data.data) {
          navigate("/");
          return;
        }

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        const priceShort = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        });
          
        const resultData: CoinProps = {
          ...data.data,
          formatPrice: price.format(Number(data.data.priceUsd)),
          formatMarketCap: priceShort.format(Number(data.data.marketCapUsd)),
          formatVolume: priceShort.format(Number(data.data.volumeUsd24Hr)), 
        };

        setCoin(resultData);
        setLoading(false);
        
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    }

    getCoin();
  }, [cripto, navigate, API_KEY, API_BASE_URL]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <BiArrowBack size={24} />
          Voltar
        </button>

        <button 
          className={styles.favoriteButton}
          onClick={handleFavorite}
        >
          {isFavorite ? (
            <BsStarFill size={24} color="#FFD700" />
          ) : (
            <BsStar size={24} color="#FFF" />
          )}
        </button>
      </div>
      
      <h1 className={styles.center}>Detalhes da Moeda</h1>
      <h1 className={styles.center}>{coin?.symbol}</h1>

      <section className={styles.content}>
        <img 
          src={`${ASSETS_URL}/${coin?.symbol.toLowerCase()}@2x.png`}
          alt={coin?.name}
          className={styles.logo}

        />

        <h1>{coin?.name} | {coin?.symbol}</h1>
        <p><strong>Preço: </strong>{coin ? coin.formatPrice : 'N/A'}</p>
        <p><strong>Market Cap: </strong>{coin ? coin.formatMarketCap : 'N/A'}</p>
        <p><strong>Volume (24h): </strong>{coin ? coin.formatVolume : 'N/A'}</p>
        <p><strong>Variação (24h): </strong>{coin ? coin.changePercent24Hr : 'N/A'}%</p>
        <p><strong>Data de criação: </strong>{coin ? new Date(coin?.explorer).toLocaleDateString() : 'N/A'}</p>
   
        <p className={Number(coin?.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss}>
          Mudança nas 24h: {coin ? Number(coin.changePercent24Hr).toFixed(2) : 'N/A'}%
        </p>
        
      </section>

     <footer className={styles.footer}>
        <hr className={styles.hr} />
        <p className={styles.namedev}>Desenvolvido por 
          <a href="marcosanjos.site" target="_blank" rel="noreferrer"> Marcos Anjos</a>
          <br />
        </p>
        <p>Informações fornecidas por CoinCap</p>
        <p>Última atualização: {new Date().toLocaleString()}</p>
      </footer>

    </div>
  );
}