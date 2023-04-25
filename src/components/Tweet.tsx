import Avatar from "react-avatar";

export type TweetProps = {
  id: number;
  title?: string;
  date?: string;
  text: string;
};

export function Tweet(props: TweetProps) {
  return (
    <div className="tweet-panel" key={props.id}>
      <Avatar className="tweet-avatar" name="Tweet" size="50" round="30px" />
      <div className="tweet-content">
        {props.title &&
          <div className="tweet-header">
            <span className="tweet-user">{props.title}</span>
            <label className="tweet-nick">@{props.title}</label>
            <label className="tweet-date">- {props.date}</label>
          </div>
        }
        <p>{props.text}</p>
      </div>
    </div>
  );
}
