import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import history from './history';
import registerServiceWorker from './registerServiceWorker';
import Provider from "react-redux/es/components/Provider";
import store, {persistor} from "./store";
import {PersistGate} from 'redux-persist/integration/react';
import {Router} from "react-router-dom";

ReactDOM.render(
		<Provider store={store}>
			{/*<PersistGate loading={null} persistor={persistor}>*/}
				<Router history={history}>
					<App/>
				</Router>
			{/*</PersistGate>*/}
		</Provider>,
		document.getElementById('root'));
registerServiceWorker();
