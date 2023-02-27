import { useState } from "react";

import * as Bot from "./components/Bot";
import * as Player from "./components/Player";

export function App() {

    const [vsBot , setVsBot] = useState(false);
    const [vsPlayer , setVsPlayer] = useState(false);

    function launcherVs(e){
        let versus = e.target.id;
        switch (versus) {
            case "vsBot":
                setVsBot(true);
                setVsPlayer(false);
                break;
            case "vsPlayer" :
                setVsPlayer(true);
                setVsBot(false);
            default:
                break;
        }
    }
    
    return (
        <> 
            <h1>Salut</h1>
            <div className="d-flex justify-content-center gap-3">
                {
                    !vsBot && !vsPlayer ? (
                        <>
                            <button className="btn bg-primary text-white" id="vsBot" onClick={launcherVs}>Vs Bot</button>
                        </>
                    ) : (
                        null
                    )
                }
                {
                    !vsPlayer && !vsBot ? (
                        <>
                            <button className="btn bg-primary text-white" id="vsPlayer" onClick={launcherVs}>Vs Player</button>
                        </>
                    ) : (
                        null
                    )
                }
            </div>
            <div>
                {
                    !vsBot ? (
                        null
                    ) : (
                        <Bot.Bot vsBot={vsBot} setVsBot={setVsBot} vsPlayer={vsPlayer} setVsPlayer={setVsPlayer}/>
                    )
                }
                {
                    !vsPlayer ? (
                        null
                    ) : (
                        <Player.Player vsPlayer={vsPlayer} setVsPlayer={setVsPlayer} vsBot={vsBot} setVsBot={setVsBot}/>
                    )
                }
            </div>
            
        </>
    )
}