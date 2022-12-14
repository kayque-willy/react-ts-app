import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TweetProps } from "../components/Tweet";

export function TweetForm() {
  // Navegação
  let navigate = useNavigate();

  // Estado da navegação onde são enviados os parãmetros por componentes por meio do state
  const { state } = useLocation();

  // Campos editáveis 
  var [title, setTitle] = useState(state ? state.title : "Título");
  var [text, setText] = useState(state ? state.text : "Texto do twitter");

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

  // Salva o Tweet
  async function submit() {
    // Cria novo Tweet
    if (!state) {
      let newTweet = {
        id: 0,
        title: title,
        text: text,
      };
      var newState = [];
      var lenght = Object.keys(tweets).length;

      if (lenght > 0) {
        let lastElement = tweets.slice(-1);
        newTweet.id = lastElement[0].id + 1;
        newState = [...tweets, newTweet];
      } else {
        newTweet.id = 1;
        newState = [newTweet];
      }
      await setTweets(newState);
      // Edita um Tweet 
    } else {
      var index = findId(state.id);
      if (index !== -1) {
        tweets[index].text = text;
        tweets[index].title = title;
      }
      await setTweets(tweets);
      await localStorage.setItem("tweets", JSON.stringify(tweets));
    }
    navigate("/", { state: null });
  }

  // Busca pelo Id do Tweet no Array
  function findId(id: number) {
    const index = tweets.findIndex((tweet) => {
      return tweet.id === id;
    });
    return index;
  }

  // Renderiza o formulário
  return (
    <>
      <h1>Tweet Form</h1>
      <form onSubmit={submit}>
        <fieldset>
          <label>Título </label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>Texto </label>
          <textarea
            id="text"
            name="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
