import { useEffect, useState } from "react";
import { Tweet, TweetProps } from "../components/Tweet";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons'
import Avatar from "react-avatar";
import { format } from 'date-fns';
import { useTimer } from 'react-timer-hook';

export default function Home() {

  // -------------------------------- Timer --------------------------------
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: true,
    // Aciona o handlerfacts a cada término do timer para adicionar tweets aleatórios
    expiryTimestamp, onExpire: () => {
      handleFacts();
    }
  });

  // ------------------------- Armazenamento local -------------------------
  const getTweets = localStorage.getItem("tweets");

  // -------------------------------- Hooks --------------------------------
  // Cria um array de string que representa os tweets
  const [tweets, setTweets] = useState<TweetProps[]>(
    getTweets ? JSON.parse(getTweets) : []
  );

  // Campos editáveis 
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();

  // Gerenciamento da lista automática
  const [facts, setFacts] = useState<TweetProps[]>([]);
  const [total, setTotal] = useState(0);

  // Navegação
  let navigate = useNavigate();

  //Armazena o array a cada modificação no componente tweets
  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  // Reinicia o timer
  useEffect(() => {
    restart(expiryTimestamp, true);
  }, [isRunning]);

  // Contabiliza os novos tweets
  useEffect(() => {
    setTotal(facts.length);
  }, [facts]);

  // -------------------------------- Handlers --------------------------------
  // Busca uma quantidade aleatória de fatos na API para serem adicionados como tweets
  const handleFacts = () => {
    let randomLimit = Math.floor(Math.random() * 3) + 1;
    let randomPage = Math.floor(Math.random() * 7268) + 1;
    fetch('https://quote-garden.onrender.com/api/v3/quotes?limit=' + randomLimit + '&page=' + randomPage)
      .then(res => res.json())
      .then(data => {
        let newTweets: TweetProps[] = [];
        let date = new Date();
        let lenght = Object.keys(tweets).length;
        let lastId = 0;

        if (lenght > 0)
          lastId = tweets[lenght - 1].id + 1;
        else
          lastId = 1;

        data.data.map((fact: any) => {
          let newTweet: TweetProps = {
            id: lastId++,
            text: fact.quoteText,
            title: fact.quoteAuthor,
            date: format(date, 'dd MMMM')
          }
          newTweets = [...newTweets, newTweet];
        });
        setFacts([...facts, ...newTweets]);
      }).catch((e) => { console.log(e) });
  }

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

  // Adiciona os novos tweets na lista
  const handleUpdate = () => {
    setTweets([...tweets, ...facts]);
    setFacts([]);
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
      date: format(date, 'dd MMMM')
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
      <div style={{ color: 'white' }}>
        Atualização: <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <div style={{ color: 'white' }}>
        {total > 0 &&
          <button onClick={() => handleUpdate()}>
            {total == 1 && <>{total} novo Tweet</>}
            {total > 1 && <>{total} novos Tweets</>}
          </button>
        }
      </div>
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