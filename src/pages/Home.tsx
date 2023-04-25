import { useEffect, useState } from "react";
import { Tweet, TweetProps } from "../components/Tweet";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Home() {

  // Campos editáveis 
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();

  // Navegação
  let navigate = useNavigate();

  // Armazenamento local
  const getTweets = localStorage.getItem("tweets");

  // Cria um array de string que representa os tweets
  const [tweets, setTweets] = useState<TweetProps[]>(
    getTweets ? JSON.parse(getTweets) : []
  );

  //Armazena o array a cada modificação no componente tweets
  useEffect(() => {
    console.log("useEffect");
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  // Navega pra página About
  function goAbout() {
    navigate("/about");
  }

  // Edit Tweet
  const editTweet = (tweet: TweetProps) => {
    setId(tweet.id);
    setText(tweet.text);
    setEdit(true);
    window.scrollTo(0, 0);
  }

  // Remove Tweet
  const removeTweet = (id: number) => {
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

  // Salva o tweet
  const submit = (event: any) => {
    // Necessário para evitar que a submissão do formulário atulize a página
    event.preventDefault();
    // Cria novo Tweet
    if (!edit) {
      let newTweet = {
        id: 0,
        title: 'You',
        text: text,
      };
      let newList = [];
      let lenght = Object.keys(tweets).length;

      if (lenght > 0) {
        let lastElement = tweets.slice(-1);
        newTweet.id = lastElement[0].id + 1;
        newList = [...tweets, newTweet];
      } else {
        newTweet.id = 1;
        newList = [newTweet];
      }
      setTweets(newList);
      // Edita um Tweet 
    } else {
      let index = findId(id ? id : -1);

      if (index !== -1) {
        tweets[index].text = text ? text : "";
        tweets[index].title = 'You';
      }
      setTweets(tweets);
      setId(-1);
      setText("");
      setEdit(false);
    }
  }

  // --------------------------- Renderiza a pagina ---------------------------
  return (
    <main>
      <section className="form-bg">
        <form onSubmit={event => { submit(event) }}>
          <fieldset>
            <textarea
              id="text"
              name="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              maxLength={200}
              placeholder="No que você esta pensando?"
              required
            />
          </fieldset>
          <button type="submit" value="submit">{edit ? 'Editar Tweet' : 'Tweetar'}</button>
        </form>
      </section>

      <section>
        {tweets.slice(0).reverse().map((tweet, index) => {
          return (
            <article key={index}>
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