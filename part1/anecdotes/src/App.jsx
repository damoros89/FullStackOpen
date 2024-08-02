import { useState } from 'react'
import Button from "./components/Button"
import Total from './components/Total'


const ButtonAnecdota = ({handleClick,text}) => {
    return(
    <button onClick={handleClick}>
      {text}
    </button>
    )
  }

// const Anecdote = ({anecdotes,selected}) =>{
//   return (
//     <p>{anecdotes[selected]}</p>
//   )
// }



const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  //Array position

  const [selected, setSelected] = useState(0)

  //Random position selection
  const randomString = () =>{
    const randomIndex=Math.floor(Math.random()*anecdotes.length);
    console.log(randomIndex)
    setSelected(randomIndex);
  }

  //valoraciones 

  const voteInitial=new Array(anecdotes.length).fill(0)

  const[votes, setVotes]= useState(voteInitial)

  const handleVote = () =>{
    const newVotes = [...votes]
    newVotes[selected]+=1
    console.log(votes)
    setVotes(newVotes);
    
  }

  const maxVoteIndex = votes.indexOf(Math.max(...votes))
  // guarda los clics de cada botón en su propio estado
  
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text = "good"></Button>
      <Button handleClick={()=>setNeutral(neutral+1)} text = "Neutral"></Button>
      <Button handleClick={()=>setBad(bad+1)} text = "bad"></Button>
      <h2>statistics</h2>

      <Total good={good} neutral={neutral} bad={bad}></Total>

      <p>{anecdotes[selected]}</p>

      <p>has {votes[selected]} votes</p>
      
      <ButtonAnecdota handleClick={randomString} text="Next Anecdota"></ButtonAnecdota>

      <button onClick={handleVote}>Votes</button>

      <h2>Anecdote with most votes</h2>
      {votes[maxVoteIndex]===0?(<p>No votes yet</p>):
      (
      <div>
      <p>{anecdotes[maxVoteIndex]}</p>
      <p>has {votes[maxVoteIndex]} votes </p>
      </div>)}
    </div>
  )
}

export default App