import { useNavigate } from "react-router-dom";

export function TweetForm() {

  let navigate = useNavigate();
  
  function submit() {
    navigate("/");
  }

  return (
    <>
      <h1>Tweet Form</h1>
      <form onSubmit={submit}>
        <fieldset>
          <label>Título </label>
          <input id="title" type="text" name="title" value="Título" />
        </fieldset>
        <fieldset>
          <label>Texto </label>
          <textarea id="text" name="text" value="Texto do twitter" />
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
