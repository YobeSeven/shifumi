import { useEffect, useRef, useState } from "react";

export function Bot(props) {

    const [player, setPlayer] = useState({
        choice: "",
        roundWin: 0,
        win: false,
    });

    const [bot, setBot] = useState({
        choice: "",
        roundWin: 0,
        win: false,
    });

    const [round, setRound] = useState(0);

    const [winnerRound, setWinnerRound] = useState({
        round: 0,
        launcher: false,
    });

    const inputRef = useRef(null);

    let arrayShifumi = ["pierre", "papier", "ciseaux"];

    const chooseRound = () => {
        let input = inputRef.current;

        if (input.value == 0 || input.value < 0 || input.value == null) {
            alert("Put a winning round more than Zero")
        } else {
            let newWinnerRound = { ...winnerRound };
            newWinnerRound.round = input.value;
            newWinnerRound.launcher = true;
            setWinnerRound(newWinnerRound);
        }
    }

    const playerOne = (e) => {
        let playerChoice = e.target.id;
        let botChoice = "";
        let random = Math.floor(Math.random() * arrayShifumi.length);
        botChoice = arrayShifumi[random];
        setRound(round + 1);
        whoWin(playerChoice, botChoice);
    }

    const whoWin = (playerChoice, botChoice) => {
        let newPlayer = { ...player };
        newPlayer.choice = playerChoice;

        let newBot = { ...bot };
        newBot.choice = botChoice;

        if (playerChoice == botChoice) {
            setPlayer(newPlayer);
            setBot(newBot);
        } else if (
            (playerChoice == "pierre" && botChoice == "ciseaux") ||
            (playerChoice == "ciseaux" && botChoice == "papier") ||
            (playerChoice == "papier" && botChoice == "pierre")
        ) {
            newPlayer.roundWin += 1;
            if (newPlayer.roundWin == winnerRound.round) {
                newPlayer.win = true;
            }
            setPlayer(newPlayer);
            setBot(newBot);
        } else {
            newBot.roundWin += 1
            if (newBot.roundWin == winnerRound.round) {
                newBot.win = true;
            }
            setPlayer(newPlayer);
            setBot(newBot);
        }
    }

    const restart = () => {
        setPlayer({ choice: "", roundWin: 0, win: false });
        setBot({ choice: "", roundWin: 0, win: false });
        setRound(0);
        setWinnerRound({ round: 0, launcher: false });
    }

    const anotherMode = () => {
        restart();
        props.setVsBot(false);

    }

    return (
        <>
            <h1 className="text-center text-success">Player vs Bot</h1>
            <div>
                {
                    !winnerRound.launcher ? (
                        <>
                            <input type="number" ref={inputRef} placeholder="Winning round"/>
                            <button onClick={chooseRound}>Choose</button>
                            <div>
                                <button className="bg-secondary" onClick={anotherMode}>Another mode</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <h4>Nombre de round : {round}</h4>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h4 className="text-primary">Joueur : {player.roundWin} / {winnerRound.round}</h4>
                                <h4 className="text-danger">Bot : {bot.roundWin} / {winnerRound.round}</h4>
                            </div>
                            <div>
                                {
                                    player.win || bot.win ? (
                                        <>
                                            <h1>Manche finie ! Gagnant de la partie est : {player.win ? "Player" : "Bot"} en {round} round</h1>
                                            <div className="d-flex justify-content-center gap-3">
                                                <button className="bg-warning" onClick={restart}>Restart game</button>
                                                <button className="bg-secondary" onClick={anotherMode}>Another mode</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="d-flex justify-content-center gap-3">
                                                {
                                                    arrayShifumi.map((element) => {
                                                        return (
                                                            <>
                                                                <button id={element} onClick={playerOne}>{element}</button>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div>
                                <h3>You played : {player.choice}</h3>
                                <h3>Bot played : {bot.choice}</h3>
                                {
                                    player.choice == bot.choice ? (
                                        <>
                                            <h3>Who win : Egalité</h3>
                                        </>
                                    ) : (player.choice == "pierre" && bot.choice == "ciseaux") ||
                                        (player.choice == "ciseaux" && bot.choice == "papier") ||
                                        (player.choice == "papier" && bot.choice == "pierre") ? (
                                        <>
                                            <h3>Who win : Player</h3>
                                        </>
                                    ) : (
                                        <>
                                            <h3>Who win : Bot</h3>
                                        </>
                                    )
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
}