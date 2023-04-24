import { useEffect, useState } from "react";
import { Tweet, TweetProps } from "../components/Tweet";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { TweetForm } from "./TweetForm";

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

  // --------------------------- Renderiza a pagina ---------------------------
  return (
    <main>
      {/* <button className="buttonAdd" onClick={goForm}>
        Adicionar Tweet
      </button> */}
      <TweetForm />
      <section>
        {tweets.slice(0).reverse().map((tweet) => {
          return (
            <article>
              <Tweet {...tweet} />
              <button className="buttonEdit" onClick={() => editTweet(tweet)}>editar</button>
              <button className="buttonRemove" onClick={() => removeTweet(tweet.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </article>
          );
        })}
        {tweets.length === 0 && <span>Sem Tweets!</span>}
      </section>
    </main>
  );
}

export default Home;
