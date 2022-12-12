import { useState } from "react";
import { Tweet } from "./components/Tweet"

function App() {
    const [tweets, setTweets] = useState<string[]>([
        'Tweet 1',
        'Tweet 2',
        'Tweet 3',
        'Tweet 4'
    ]);

    return (
        <div>
            <h1>Hello World!</h1>
            {/* <Tweet text="Texto do Tweet 1" title="Título do Tweet 1" />
            <Tweet text="texto do Tweet 2" title="Título do Tweet 2" />
            <Tweet text="Texto do Tweet 3" /> */}
            {tweets.map(tweet => {

                return <Tweet text={tweet} />

            })}

            <button>Adicionar Tweet</button>
        </div>
    );
}

export default App
