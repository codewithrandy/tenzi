import './App.css';
import Background from './components/Background';
import Win from './components/Win'
import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import clickAudio from './audio/click.m4a'
import roll1Audio from './audio/rolling1.wav'
import roll2Audio from './audio/rolling2.wav'
import roll3Audio from './audio/rolling3.wav'
import winnerAudio from './audio/winner.wav'


export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [best, setBest] = React.useState(JSON.parse(localStorage.getItem('best')) || 0)

    React.useEffect(() => {
        // localStorage.clear();
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            if ((rolls < best) || best === 0) {
                localStorage.setItem('best', rolls)
                setBest(rolls)
            } 
        }
    }, [dice])

    function playClick() {
        new Audio(clickAudio).play()
    }
    function playRoll() {
        const rollFX = [roll1Audio, roll2Audio, roll3Audio]
        let index = Math.floor(Math.random() * 3)
        console.log(index)
        new Audio(rollFX[index]).play()
    }
    function playWinner() {
        new Audio(winnerAudio).play()
    }
    

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    
    function rollDice() {
            if(!tenzies) {
                playRoll()
                setDice(oldDice => oldDice.map(die => {
                    return die.isHeld ? 
                        die :
                        generateNewDie()
                }))
                setRolls(rolls+1)
            } else {
                setRolls(0)                                                                                                                                                                                                                                       
                setTenzies(false)                                                                                                                                                                                   
                setDice(allNewDice())
            }

        
    }
    
    function holdDice(id) {
            playClick()
            setDice(oldDice => oldDice.map(die => {
                return die.id === id ? 
                    {...die, isHeld: !die.isHeld} :                                                                                                                                                                                                                                                                                             
                    die
            }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            {...die}
            holdDice={() => holdDice(die.id)}
        />
    ))

    return (
      <div>
      {tenzies && <Win playWinner={playWinner}/>}
      <Background />
      <main>
        <h1 className="title">Tenzi !</h1>
        <p className="instructions">
          Roll until all dice are the same. Click a die to hold it.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <div className="scoreboard">
            <div className="scores">
                Rolls: <span>{rolls}</span>
            </div>
            {best !== 0 &&  <div className="scores left">
                Best: <span>{best}</span>
                </div> 
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        </div>
      </main>
      </div>
    )
}