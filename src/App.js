import logo from './logo.svg';
import './App.css';
import GitHubImage from './assets/github.png';
import { useState } from 'react';

function App() {
    const [search, setSearch] = useState('');
    const [userData, setUserData] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://api.github.com/users/${search}`)
            .then(response => response.json())
            .then(userResponse => setUserData(userResponse));
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    return (
        <div className="container text-center">
            <h1 className="py-5">GitHub Profile</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            required 
                            placeholder="Type your GitHub user"
                            value={search}
                            onChange={handleChange}
                        />
                        
                        <button type="submit" className="btn-success">
                            Search
                        </button>
                    </div>
                </div>
            </form>

            <div className="py-5">
                {/* Se não existe userData, então renderiza o código da imagem */}
                {!userData && (
                    <div>
                        <img 
                            src={GitHubImage} 
                            className="responsive rounded-circle"
                            height="200px" 
                        />

                        <h2 className="pt-4">User</h2>

                        <h3>Location</h3>
                    </div>     
                )}

                {/* Se existe userData, então renderiza os dados dele */}
                {userData && (
                    <div>
                        <img 
                            src={userData.avatar_url} 
                            className="responsive rounded-circle"
                            height="200px" 
                        />

                        <h2 className="pt-4">
                            <a 
                                href={userData.html_url} 
                                target="_new">{userData.name}</a>
                        </h2>

                        <h3>{userData.location}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
