const Name = ({person,deleteName}) => {
    return (
      <div>
        {person.name} {person.number}{" "}
        <button onClick={()=> deleteName(person.id, person.name)}> delete</button>
      </div>
    )
  }

export default Name