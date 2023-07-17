const Person = ({person, deletePerson}) =>
  <div>
    Name: {person.name} - Number: {person.number}
    <button onClick={deletePerson}>DELETE</button>
  </div>

export default Person;