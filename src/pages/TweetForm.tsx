import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TweetProps } from "../components/Tweet";

export function TweetForm() {
  var [title, setTitle] = useState("Título");
  var [text, setText] = useState("Texto do twitter");

  const { state } = useLocation();

  let navigate = useNavigate();

  function handleChange(event: any) {
    console.log(event.target.value);
  }

  function submit() {
    let newTweet = {
      id: 0,
      title: title,
      text: text,
    };
    var newState = [];
    var lenght = Object.keys(state).length;

    if (lenght > 0) {
      let lastElement = state.slice(-1);
      newTweet.id = lastElement[0].id + 1;
      newState = [...state, newTweet];
    } else {
      newTweet.id = 1;
      newState = [newTweet];
    }
    
    navigate("/", { state: newState });
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
