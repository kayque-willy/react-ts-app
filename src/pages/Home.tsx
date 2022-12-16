import { useEffect, useState } from "react";
import { Tweet, TweetProps } from "../components/Tweet";
import { useNavigate } from "react-router-dom";

import "../assets/Button.css";

function Home() {
  // Navegação
  let navigate = useNavigate();

  // Armazenamento local
  const getTweets = localStorage.getItem("tweets");

  // Cria um array de string que representa os tweets
  const [tweets, setTweets] = useState<TweetProps[]>(
    getTweets ? JSON.parse(getTweets) : []
  );

  //Armazena o array a cada modificação no componente
  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  });

  // Navega pro formulário
  function goForm() {
    navigate("/edit");
  }

  // Edit Tweet
  function editTweet(tweet: TweetProps) {
    navigate("/edit", { state: tweet });
  }

  // Remove Tweet
  function removeTweet(id: number) {
    const index = findId(id);
    if (index !== -1) {
      tweets.splice(index, 1);
      setTweets([...tweets]);
    }
  }

  // Busca pelo Id do Tweet no Array
  function findId(id: number) {
    const index = tweets.findIndex((tweet) => {
      return tweet.id === id;
    });
    return index;
  }

  // Renderiza a pagina
  return (
    <div>
      <h1>App - React TypeScript</h1>
      <h2>Twitter</h2>
      {tweets.map((tweet) => {
        return (
          <>
            <Tweet {...tweet} />
            <button onClick={() => editTweet(tweet)}>editar</button>
            <button onClick={() => removeTweet(tweet.id)}>remover</button>
            <hr></hr>
          </>
        );
      })}
      {tweets.length === 0 && <p>Sem Tweets!</p>}
      <button className="buttonTweet" onClick={goForm}>
        Adicionar Tweet
      </button>
    </div>
  );
}

export default Home;
