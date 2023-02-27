import { useEffect, useRef, useState } from "react";

export function Player(props) {

    const [playerOne, setPlayerOne] = useState({
        played: false,
        choice: "",
        roundWin: 0,
        win: false,
    });

    const [playerTwo, setPlayerTwo] = useState({
        played: false,
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

    function chooseRound() {
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

    function whoWin() {
        let newPlayerOne = { ...playerOne };
        let newPlayerTwo = { ...playerTwo };

        console.log(newPlayerOne);
        console.log(newPlayerTwo);

        if (newPlayerOne.choice == newPlayerTwo.choice) {
            newPlayerOne.played = false;
            newPlayerTwo.played = false;
            setPlayerOne(newPlayerOne);
            setPlayerTwo(newPlayerTwo);
        } else if (
            (newPlayerOne.choice == "pierre" && newPlayerTwo.choice == "ciseaux") ||
            (newPlayerOne.choice == "ciseaux" && newPlayerTwo.choice == "papier") ||
            (newPlayerOne.choice == "papier" && newPlayerTwo.choice == "pierre")
        ) {
            newPlayerOne.roundWin += 1;
            newPlayerOne.played = false;
            newPlayerTwo.played = false;
            if (newPlayerOne.roundWin == winnerRound.round) {
                newPlayerOne.win = true;
            }
            setPlayerOne(newPlayerOne);
            setPlayerTwo(newPlayerTwo);
        } else {
            newPlayerTwo.roundWin += 1;
            newPlayerTwo.played = false;
            newPlayerOne.played = false;
            if (newPlayerTwo.roundWin == winnerRound.round) {
                newPlayerTwo.win = true;
            }
            setPlayerTwo(newPlayerTwo);
            setPlayerOne(newPlayerOne);
        }
    }

    function userOne(e) {
        let newPlayerOne = { ...playerOne };
        newPlayerOne.choice = e.target.id;
        newPlayerOne.played = true;
        setPlayerOne(newPlayerOne);
    }

    function userTwo(e) {
        let newPlayerTwo = { ...playerTwo };
        newPlayerTwo.choice = e.target.id;
        newPlayerTwo.played = true;
        setPlayerTwo(newPlayerTwo);
        setRound(round + 1);
    }

    useEffect(() => {
        if (playerOne.played && playerTwo.played) {
            whoWin();
        }
    }, [playerOne.played, playerTwo.played]);

    function restart() {
        setPlayerOne({ played: false, choice: "", roundWin: 0, win: false });
        setPlayerTwo({ played: false, choice: "", roundWin: 0, win: false });
        setWinnerRound({ round: 0, launcher: false })
        setRound(0);
    }

    function anotherMode() {
        restart();
        props.setVsPlayer(false);
        props.setVsBot(false)
    }
    return (
        <>
            <h1 className="text-center text-success">Player 1 vs Player 2</h1>
            <div>
                {
                    !winnerRound.launcher ? (
                        <>
                            <div>
                                <input type="number" min={1} ref={inputRef} placeholder="Winning round" />
                                <button onClick={chooseRound}>Choose</button>
                                <div>
                                    <button className="bg-secondary" onClick={anotherMode}>Another mode</button>
                                </div>                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <h4>Nombre de round : {round}</h4>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h4 className="text-primary">Joueur 1 : {playerOne.roundWin} / {winnerRound.round}</h4>
                                <h4 className="text-danger">Joueur 2 : {playerTwo.roundWin} / {winnerRound.round}</h4>
                            </div>
                            <div>
                                {
                                    playerOne.win || playerTwo.win ? (
                                        <>
                                            <h1>Manche finie ! Gagnant de la partie est : {playerOne.win ? "Player 1" : "Player 2"} en {round} round</h1>
                                            <div className="d-flex justify-content-center gap-3">
                                                <button className="bg-warning" onClick={restart}>Restart game</button>
                                                <button className="bg-secondary" onClick={anotherMode}>Another mode</button>
                                            </div>
                                        </>
                                    ) : (
                                        !playerOne.played ? (
                                            <>
                                                <h2 className="text-center">Turn of : Player 1</h2>
                                                {
                                                    arrayShifumi.map((element) => {
                                                        return (
                                                            <>
                                                                <button onClick={userOne} id={element}>{element}</button>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                        ) : playerOne.played && !playerTwo.played ? (
                                            <>
                                                <h2 className="text-center">Turn of : Player 2</h2>
                                                {
                                                    arrayShifumi.map((element) => {
                                                        return (
                                                            <>
                                                                <button onClick={userTwo} id={element}>{element}</button>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                        ) : (
                                            null
                                        )
                                    )
                                }
                            </div>
                            <div>
                                <h3>Player One Played : {playerOne.choice}</h3>
                                <h3>Player Two Played : {playerTwo.choice}</h3>
                                {
                                    playerOne.choice == playerTwo.choice ? (
                                        <>
                                            <h3>Who win : Egalité</h3>
                                        </>
                                    ) : (playerOne.choice == "pierre" && playerTwo.choice == "ciseaux") ||
                                        (playerOne.choice == "ciseaux" && playerTwo.choice == "papier") ||
                                        (playerOne.choice == "papier" && playerTwo.choice == "pierre") ? (
                                        <>
                                            <h3>Who win : Player One</h3>
                                        </>
                                    ) : (
                                        <>
                                            <h3>Who win : Player Two</h3>
                                        </>
                                    )
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}