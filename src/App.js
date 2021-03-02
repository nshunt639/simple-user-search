import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [keyword, setKeyword] = useState('')

    useEffect(function () {
        async function loadUsers() {
            const { data } = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            )
            setUsers(data)
        }

        loadUsers()
    }, [])

    useEffect(
        function () {
            setFilteredUsers(
                users.filter(
                    (user) =>
                        !keyword ||
                        (user.name && user.name.toLowerCase().includes(keyword))
                )
            )
        },
        [users, keyword]
    )

    function onKeywordChange(e) {
        setKeyword(e.target.value)
    }

    return (
        <div className="App">
            <header>
                <h1>Users List</h1>
            </header>
            <main>
                <div className="search-container">
                    <input
                        type="text"
                        className="keyword"
                        placeholder="Search by user name..."
                        maxLength={20}
                        value={keyword}
                        onChange={onKeywordChange}
                    />
                </div>
                <ul className="user-list">
                    {filteredUsers.map((user, i) => (
                        <li key={i}>
                            <h2>
                                <span className="user-index">{i + 1}</span>
                                <span className="user-name">{user.name}</span>
                                <span className="user-nickname">
                                    @{user.username}
                                </span>
                            </h2>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}

export default App
