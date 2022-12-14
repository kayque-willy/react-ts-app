import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TweetProps } from "../components/Tweet";

export function TweetForm() {
  let navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  var [title, setTitle] = useState(state ? state.title : "Título");
  var [text, setText] = useState(state ? state.text : "Texto do twitter");

  const getTweets = localStorage.getItem("tweets");

  const [tweets, setTweets] = useState<TweetProps[]>(
    getTweets ? JSON.parse(getTweets) : []
  );

  useEffect(() => {
    console.log("State: " + state);
    localStorage.setItem("tweets", JSON.stringify(tweets));
  });

  async function submit() {
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

  function findId(id: number) {
    const index = tweets.findIndex((tweet) => {
      return tweet.id === id;
    });
    return index;
  }

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
