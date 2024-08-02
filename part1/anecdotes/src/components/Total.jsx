import Statistics from "./Statistics"

const Total = ({good,neutral,bad})=>{

    const total = good + neutral + bad
  
    if(total === 0){
      return (
        <div>
          <p>NO FEEDBACK GIVEN</p>
        </div>
      )
    }
  
    return (
      <div>
        <table>
          <tbody>
            <Statistics text = "good" value = {good} ></Statistics>
            <Statistics text = "neutral" value = {neutral} ></Statistics>
            <Statistics text = "bad" value = {bad} ></Statistics>
            <Statistics text="all" value={total}></Statistics>
            <Statistics text = "average" value = {(good - bad) / total} ></Statistics>
            <Statistics text = "positive" value = {(100 * good) / total} ></Statistics>
          </tbody>
        </table>
  
      </div>
      
    )
  }

  export default Total;