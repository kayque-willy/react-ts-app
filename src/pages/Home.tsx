import { useEffect, useState } from "react";
import { Tweet, TweetProps } from "../components/Tweet";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Avatar from "react-avatar";
import { format } from 'date-fns';

export default function Home() {

  // Armazenamento local
  const getTweets = localStorage.getItem("tweets");

  // -------------------------------- Hooks --------------------------------
  // Campos editáveis 
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();

  // Navegação
  let navigate = useNavigate();

  // Cria um array de string que representa os tweets
  const [tweets, setTweets] = useState<TweetProps[]>(
    getTweets ? JSON.parse(getTweets) : []
  );

  //Armazena o array a cada modificação no componente tweets
  useEffect(() => {
    console.log("useEffect");
    localStorage.setItem("tweets", JSON.stringify(tweets));
    console.log(tweets);
  }, [tweets]);

  // -------------------------------- Handlers --------------------------------
  // Vai para edição do Tweet
  const handleEdit = (tweet: TweetProps) => {
    setId(tweet.id);
    setText(tweet.text);
    setEdit(true);
    window.scrollTo(0, 0);
  }

  // Salva o tweet
  const handleSubmit = (event: any) => {
    // Necessário para evitar que a submissão do formulário atulize a página
    event.preventDefault();
    if (!edit) {
      // Cria novo Tweet
      addTweet();
    } else {
      // Edita um Tweet 
      editTweet();
    }
  }

  // -------------------------------- Funções --------------------------------
  // Busca pelo Id do Tweet no Array
  function findId(id: number) {
    const index = tweets.findIndex((tweet) => {
      return tweet.id === id;
    });
    return index;
  }

  // Cria novo Tweet
  function addTweet() {
    let date = new Date();

    let newTweet = {
      id: 0,
      title: 'You',
      text: text,
      date: format(date, 'd MMMM')
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
    clearFields();
  }

  // Edita um Tweet 
  function editTweet() {
    let index = findId(id ? id : -1);
    if (index !== -1) {
      tweets[index].text = text ? text : "";
      tweets[index].title = 'You';
      tweets[index].date = new Date().toUTCString();
    }
    setTweets(tweets);
    clearFields();
  }

  function clearFields() {
    setId(-1);
    setText("");
    setEdit(false);
  }

  // Remove Tweet
  const removeTweet = (id: number) => {
    const index = findId(id);
    if (index !== -1) {
      tweets.splice(index, 1);
      setTweets([...tweets]);
    }
  }

  // Navega pra página About
  function goAbout() {
    navigate("/about");
  }

  // --------------------------- Renderiza a pagina ---------------------------
  return (
    <main>
      <section className="form-bg">
        <form onSubmit={event => { handleSubmit(event) }}>
          <fieldset className="form-field">
            <Avatar className="form-avatar" name="Tweet" size="50" round="30px" />
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
          <div className="form-button">
            <button type="submit" value="submit">{edit ? 'Editar Tweet' : 'Tweetar'}</button>
          </div>
        </form>
      </section>

      <section>
        {tweets.slice(0).reverse().map((tweet) => {
          return (
            <article className="tweet" key={tweet.id}>
              <Tweet {...tweet} />
              <div className="panel-edition">
                <button className="buttonEdit" onClick={() => handleEdit(tweet)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="buttonRemove" onClick={() => removeTweet(tweet.id)}>
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            </article>
          );
        })}
        {tweets.length === 0 && <span className="notFound">Sem Tweets!</span>}
      </section>
    </main>
  )
}