import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Fib from './Fib';
import Tmp from './Tmp';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='App'>
                    <header className='App-header'>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Fib Calculator version GCP</h1>
                        <Link to="/">Home</Link>
                        <Link to='tmp'>Temp</Link>
                    </header>
                    <div>
                        <Route path='/' exact component={Fib} />
                        <Route path='/tmp' component={Tmp} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
