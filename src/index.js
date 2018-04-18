import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouetrComponent from './Router';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './redux/reducers/index'

const store = createStore(todoApp)

ReactDOM.render(<Provider store={store}>
    <RouetrComponent />
</Provider>, document.getElementById('root'));
registerServiceWorker();
