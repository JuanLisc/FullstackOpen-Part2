const Header = props => <h2>{props.course}</h2>

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises}/>
      )}
    </>
  );
}

const Part = (props) => {
  return (
    <>
      <p>
        Part: {props.part}
      </p>
      <p>
        Exercises: {props.exercises}
      </p>
    </>    
  );
}  

const Total = ({parts}) => {
  const initialValue = 0;
  
  const total = parts.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.exercises
  }, initialValue);
  
  return <div>Total number of exercises: {total}</div>
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </>
  );
}

export default Course;