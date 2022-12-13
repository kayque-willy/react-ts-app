import { useState } from "react";
import { Tweet, TweetProps } from "../components/Tweet";
import { useLocation, useNavigate } from "react-router-dom";

import "../assets/Button.css";

function Home() {
  // Navegação
  let navigate = useNavigate();
  
  // Estado da navegação
  const { state } = useLocation();
  
  // Cria um array de string que representa os tweets
  const [tweets, setTweets] = useState<TweetProps[]>(state ? state : []);
  
  // Navega pro formulário
  function goForm() {
    navigate("/edit", { state: tweets });
  }

  // Remove Tweet
  function removeTweet(id: number) {
    const index = tweets.findIndex((tweet) => {
      return tweet.id === id;
    });

    if (index !== -1) {
      tweets.splice(index, 1);
      setTweets([...tweets]);
    }
  }

  // Renderiza a pagina
  return (
    <div>
      <h1>App React TypeScript</h1>
      <h2>Twitter</h2>
      {tweets.map((tweet) => {
        return (
          <>
            <Tweet {...tweet} />
            <button onClick={() => removeTweet(tweet.id)}>remover</button>
            <hr></hr>
          </>
        );
      })}
      <button className="buttonTweet" onClick={goForm}>
        Adicionar Tweet
      </button>
    </div>
  );
}

export default Home;
