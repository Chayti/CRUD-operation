import React, { useState, useEffect } from 'react';


const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    // delete an user
    const handleDeleteUser = id => {
        const proceed = window.confirm('Are you sure?')
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully')
                        const remainingUsers = users.filter(user => user._id !== id)
                        setUsers(remainingUsers)
                    }
                })
        }
    }

    return (
        <div>
            <h2>Users available : {users.length}</h2>
            {
                users.map(user => <li key={user._id}>
                    {user.name} :: {user.email}
                    <button>Update</button>
                    <button onClick={() => handleDeleteUser(user._id)}>Delete </button>
                </li>)
            }
        </div>
    );
};

export default Users;