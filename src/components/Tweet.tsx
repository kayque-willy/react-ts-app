export type TweetProps = {
    id : number;
    title?: string;
    text: string;
}

export function Tweet(props: TweetProps) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.text}</p>
            <p>Texto adicional...</p>
            <hr></hr>
        </div>
    );
}