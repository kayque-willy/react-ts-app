export type TweetProps = {
  id: number;
  title?: string;
  date?: string;
  text: string;
};

export function Tweet(props: TweetProps) {
  return (
    <div key={props.id}>
      {props.title && <h4>Author {props.title}</h4>}
      <span>{props.date}</span>
      <p>{props.text}</p>
    </div>
  );
}
