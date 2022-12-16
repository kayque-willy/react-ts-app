export default function Message(props: any) {
  return (
    <div key={props.id}>
      <h2> {props.title}</h2>
      <p>{props.text}</p>
    </div>
  );
}
