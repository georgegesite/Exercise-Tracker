import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState(''); // Add a message state

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
    };

    axios
      .post('http://localhost:4000/users/add', user)
      .then((res) => {
        console.log(res.data);
        setMessage('Username has been added successfully.'); // Set the success message
        setUsername(''); // Clear the input field
      })
      .catch((error) => {
        console.error(error);
        setMessage('An error occurred while adding the username.'); // Set an error message
      });
  };

  return (
    <div>
      <h3>Create New User</h3>
      {message && <div className={message.includes('error') ? 'alert alert-danger' : 'alert alert-success'}>{message}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
