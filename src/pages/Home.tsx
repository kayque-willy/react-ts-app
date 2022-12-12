import { useState } from "react";
import { Tweet } from "../components/Tweet";

function Home() {
  // Cria um array de string que representa os tweets
  const [tweets, setTweets] = useState<string[]>(["Tweet 1", "Tweet 2"]);
  // Constante de controle do número do tweet
  var [tweetNumber, setTweetNumber] = useState(2);

  function createTweet() {
    // O setState apaga o antigo estado e adiciona um novo
    //Copia os tweets anteriores e adiciona o novo no final do array
    setTweets([...tweets, "Tweet " + ++tweetNumber]);
    setTweetNumber(tweetNumber);
    // --------------------------------------------------------
    // Para exemplificar, pode ser criado um array diferente e adicioná-lo ao estado
    // let string = ["banana", "abacate", "abóbora","morango"];
    // setTweets(string);
  }

  return (
      <div>
        <h1>App React TypeScript</h1>
        <h2>Tweeter</h2>
        {tweets.map((tweet) => {
          return <Tweet text={tweet} />;
        })}
        <p>Fim da lista!</p>
        <button
          onClick={createTweet}
          style={{
            background: "#8257e6",
            border: 8,
            padding: "6px 1px",
            color: "#FFF",
          }}
        >
          Adicionar Tweet
        </button>
      </div>
  );
}

export default Home;
