import { useState } from "react";
import { Tweet, TweetProps } from "../components/Tweet";

import "../assets/Button.css";

function Home() {
  // Cria um array de string que representa os tweets
  // const [tweets, setTweets] = useState<string[]>(["Tweet 1", "Tweet 2"]);
  const [tweets, setTweets] = useState<TweetProps[]>([
    {
      id: 1,
      title: "Título do Tweet",
      text: "Texto do Tweet",
    },
  ]);
  // Constante de controle do número do tweet
  var [tweetNumber, setTweetNumber] = useState(2);

  function createTweet() {
    // O setState apaga o antigo estado e adiciona um novo
    //Copia os tweets anteriores e adiciona o novo no final do array
    // setTweets([...tweets, "Tweet " + ++tweetNumber]);
    let newTweet = {
      id: 2,
      title: "Título do Tweet 2",
      text: "Texto do Tweet 2",
    };

    // setTweets([...tweets, "Tweet " + ++tweetNumber]);
    setTweets([...tweets, newTweet]);
    setTweetNumber(tweetNumber);
    // --------------------------------------------------------
    // Para exemplificar, pode ser criado um array diferente e adicioná-lo ao estado
    // let string = ["banana", "abacate", "abóbora","morango"];
    // setTweets(string);
  }

  // Renderiza a pagina
  return (
    <div>
      <h1>App React TypeScript</h1>
      <h2>Tweeter</h2>
      {tweets.map((tweet) => {
        return <Tweet {...tweet} />;
      })}
      <p>Fim da lista!</p>
      <button className="buttonTweet" onClick={createTweet}>
        Adicionar Tweet
      </button>
    </div>
  );
}

export default Home;
