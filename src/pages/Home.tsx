import { useState } from "react";
import { Tweet, TweetProps } from "../components/Tweet";

import "../assets/Button.css";

function Home() {
  // Cria um array de string que representa os tweets
  // const [tweets, setTweets] = useState<string[]>(["Tweet 1", "Tweet 2"]);
  const [tweets, setTweets] = useState<TweetProps[]>([
    {
      id: 1,
      title: "Título do Tweet 1",
      text: "Texto do Tweet 2",
    },
    {
      id: 2,
      title: "Título do Tweet 2",
      text: "Texto do Tweet 2",
    },
  ]);
  // Constante de controle do número do tweet
  var [tweetNumber, setTweetNumber] = useState(2);

  function createTweet() {
    let newTweet = {
      id: ++tweetNumber,
      title: "Título do Tweet " + tweetNumber,
      text: "Texto do Tweet " + tweetNumber,
    };

    // O setState apaga o antigo estado e adiciona um novo
    //Copia os tweets anteriores e adiciona o novo no final do array
    setTweets([...tweets, newTweet]);
    setTweetNumber(tweetNumber);
    // --------------------------------------------------------
    // Para exemplificar, pode ser criado um array diferente e adicioná-lo ao estado
    // let string = ["banana", "abacate", "abóbora","morango"];
    // setTweets(string);
  }

  function removeTweet(id: number) {
    const index = tweets.findIndex((tweet) => {
      return tweet.id === id;
    });

    if (index !== -1) {
      tweets.splice(index, 1);
      setTweets([...tweets]);
      setTweetNumber(--tweetNumber);
    }
  }

  // Renderiza a pagina
  return (
    <div>
      <h1>App React TypeScript</h1>
      <h2>Tweeter</h2>
      {tweets.map((tweet) => {
        return (
          <>
            <Tweet {...tweet} />
            <button onClick={() => removeTweet(tweet.id)}>remover</button>
            <hr></hr>
          </>
        );
      })}
      <p>Fim da lista!</p>
      <button className="buttonTweet" onClick={createTweet}>
        Adicionar Tweet
      </button>
    </div>
  );
}

export default Home;
