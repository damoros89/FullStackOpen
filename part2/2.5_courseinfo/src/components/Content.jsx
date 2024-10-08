import Part from "./Part"

const Content  = ({parts}) => {

    const sumExercises = parts.reduce((total,part)=> total + part.exercises,0)
    
    return (
            <div>
                {
                    // eslint-disable-next-line react/prop-types
                    parts.map((part)=>{
                       return <Part key={part.id} part={part}></Part>
                    })
                } <p><b>Total of {sumExercises} exercises</b></p>
            </div>
        
    )
}

export default Content