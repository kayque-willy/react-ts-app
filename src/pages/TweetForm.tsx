import { useLocation, useNavigate } from "react-router-dom";

export function TweetForm() {
  var newTweet = {
    id: 0,
    title: "Título",
    text: "Texto do twitter",
  };

  const { state } = useLocation();

  let navigate = useNavigate();

  function submit() {
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
          <input id="title" type="text" name="title" value={newTweet.title} />
        </fieldset>
        <fieldset>
          <label>Texto </label>
          <textarea id="text" name="text" value={newTweet.text} />
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
