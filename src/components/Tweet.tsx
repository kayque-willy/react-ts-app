export type TweetProps = {
  id: number;
  title?: string;
  text: string;
};

export function Tweet(props: TweetProps) {
  return (
    <div key={props.id}>
      {props.title && <span>Author {props.title}</span>}
      <p>{props.text}</p>
    </div>
  );
}
