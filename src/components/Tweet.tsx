export type TweetProps = {
  id: number;
  title?: string;
  text: string;
};

export function Tweet(props: TweetProps) {
  return (
    <div>
      <h2>{props.id}</h2>
      <h3>{props.title}</h3>
      <p>{props.text}</p>
      <p>Texto adicional...</p>
    </div>
  );
}
