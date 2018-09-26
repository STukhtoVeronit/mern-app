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
import Spinner from "./components/common/Spinner";

ReactDOM.render(
		<PersistGate loading={<Spinner/>} persistor={persistor}>
			<Provider store={store}>
				<Router history={history}>
					<App/>
				</Router>
			</Provider>
		</PersistGate>
		,
		document.getElementById('root'));
registerServiceWorker();
