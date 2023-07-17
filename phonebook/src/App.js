import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/filter';
import Person from './components/persons';
import PersonForm from './components/person-form';
import Notification from './components/notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [notifType, setNotifType] = useState('success');

  useEffect(() => {
    personService
      .getAllPersons()
      .then(initialPersons =>
        setPersons(initialPersons)
      )
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };

    /* if (persons.find(person => person.name === newName))
      return window.alert(`${newName} is already added to phonebook.`); */

    const personToFind = persons.find(person => person.name === newName);
    if (personToFind !== undefined) {
      if (window.confirm(`${personObject.name} is already added to the phonebook, replace old number with a new one?`)) {
        personService
          .updatePerson(personToFind.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToFind.id ? person : returnedPerson));
            setNotifType('success');
            setNotificationMsg(
              `The phone-number of ${personToFind.name} was changed successfully`
            )
            setTimeout(() => {
              setNotificationMsg(null)
            }, 5000);
          })
          .catch(error => {
            console.log('Error: ', error);
            setNotifType('error');
            setNotificationMsg(
              `Information of ${personToFind.name} has already been removed from server`
            )
            setTimeout(() => {
              setNotificationMsg(null)
            }, 5000);
            setPersons(persons.filter(person => person.id !== personToFind.id));
          })
      }
      return (
        setNewName(''),
        setNewNumber('')
      );
    }
    
    personService
      .createPerson(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNotifType('success');
        setNewName('');
        setNewNumber('');
        setNotificationMsg(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setNotificationMsg(null)
        }, 5000);
      })
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => { 
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => { 
    setFilter(event.target.value);
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${personToDelete}?`)) {
      personService
        .deletePerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => 
        person.name
          .toLowerCase()
          .includes(filter.toLowerCase())
      );

  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={notificationMsg} type={notifType} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new:</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <>
        {personsToShow.map(person =>
          <Person
            key={person.name}
            person={person}
            deletePerson={() =>deletePerson(person.id)}
          />
        )}
      </>
    </>
  );
}

export default App