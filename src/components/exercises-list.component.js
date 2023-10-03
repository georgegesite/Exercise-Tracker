import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{' '}
      <a href="/" onClick={(e) => { e.preventDefault(); props.deleteExercise(props.exercise._id); }}>
  delete
</a>

    </td>
  </tr>
);

export default function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/exercises/')
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    const deleteExercise = (id) => {
      axios.delete('http://localhost:4000/exercises/' + id).then((response) => {
        console.log(response.data);
        setExercises((prevExercises) => prevExercises.filter((el) => el._id !== id));
      });
    };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((currentexercise) => (
            <Exercise
              exercise={currentexercise}
              deleteExercise={deleteExercise}
              key={currentexercise._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
