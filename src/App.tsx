import { useState } from "react";
import { Tweet } from "./components/Tweet";

import './App.css';

function App() {
  // Cria um array de string que representa os tweets
  const [tweets, setTweets] = useState<string[]>([
    "Tweet 1",
    "Tweet 2",
    "Tweet 3",
    "Tweet 4",
  ]);

  function createTweet() {
    // O setState apaga o antigo estado e adiciona um novo
    //Copia os tweets anteriores e adiciona o novo no final do array
    setTweets([...tweets, "Tweet 5"]);
    // --------------------------------------------------------
    // Para exemplificar, pode ser criado um array diferente e adicioná-lo ao estado
    // let string = ["banana", "abacate", "abóbora","morango"];
    // setTweets(string);
  }

  return (
    <div>
      <h1>App React TypeScript</h1>
      <h2>Tweeter</h2>
      {/* <Tweet text="Texto do Tweet 1" title="Título do Tweet 1" />
            <Tweet text="texto do Tweet 2" title="Título do Tweet 2" />
            <Tweet text="Texto do Tweet 3" /> */}
      {tweets.map((tweet) => {
        return <Tweet text={tweet} />;
      })}
      <p>Fim da lista!</p>
      <button onClick={createTweet}>Adicionar Tweet</button>
    </div>
  );
}

export default App;
