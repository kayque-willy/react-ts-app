export type TweetProps = {
  id: number;
  title?: string;
  text: string;
};

export function Tweet(props: TweetProps) {
  return (
    <div>
      <h2>{props.id} - {props.title}</h2>
      <p>{props.text}</p>
    </div>
  );
}
