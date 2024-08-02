import { useState } from 'react'
import Button from "./components/Button"
import Total from './components/Total'


const App = () => {
  
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

    </div>
  )
}

export default App