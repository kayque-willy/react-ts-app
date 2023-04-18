export type TweetProps = {
  id: number;
  title?: string;
  text: string;
};

export function Tweet(props: TweetProps) {
  return (
    <div key={props.id}>
      <h3>{props.id} - {props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
}
