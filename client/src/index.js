import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { extendedApiSlice } from './components/campingSlice';
import { store } from './store';

store.dispatch(extendedApiSlice.endpoints.getCampings.initiate());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
