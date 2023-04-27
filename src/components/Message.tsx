export default function Message(props: any) {
  return (
    <article className="message" key={props.id}>
      <h2> {props.title}</h2>
      <p>{props.text}</p>
      <a href={props.link}>{props.link}</a>
    </article>
  );
}
