import { useState } from "react"

const  Display = props => 
  <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value,setValue] = useState(10)

  const setToValue = (newValue)=> {
    console.log('value now', newValue)
    setValue(newValue)
  }



  return (
    <div>
      <Display value = {value}></Display>
      <Button handleClick={()=>setToValue(1000)} text ="thousand"/>
      <Button handleClick={()=>setToValue(0)} text = "reset"/>
      <Button handleClick={()=>setToValue(value+1)} text = "increment"/>
    </div>
  )
}

export default App
/** 
const History = (props)=> {
  if(props.allClicks.length === 0){
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = (props)=> {
  console.log('Props vaalue is :', props)
  const {handleClick, text} = props
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const[total, setTotal] = useState(0)


  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updateLeft = left + 1
    setLeft(updateLeft)
    console.log('left before',left)
    setTotal(updateLeft+right)
    console.log('left before',left)
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(left+right)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left'></Button>
      <Button handleClick={handleRightClick} text='right'></Button>
      {right}
      <p>{allClicks.join(' ')}</p>
      <History allClicks= {allClicks}></History> 
      <p>Total: {total}</p>
    </div>
  )
}*/