import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'


class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/about" component={App} />
                    <Route path="/topics" component={App} />
                </div>
            </Router>
        );
    }
}

export default App;
