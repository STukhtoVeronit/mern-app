import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import history from './history';
import registerServiceWorker from './registerServiceWorker';
import Provider from "react-redux/es/components/Provider";
import store from "./store";
import {Router} from "react-router-dom";

ReactDOM.render(
		<Provider store={store}>
			<Router history={history}><App/>
			</Router>
		</Provider>,
		document.getElementById('root'));
registerServiceWorker();
