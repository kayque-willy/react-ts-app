export default function Message(props: any) {
  return (
    <article key={props.id}>
      <h2> {props.title}</h2>
      <p>{props.text}</p>
    </article>
  );
}
