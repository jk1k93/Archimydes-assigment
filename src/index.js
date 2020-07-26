import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import 'antd/dist/antd.css';
import userReducer from './reducers/user';
import './index.css';
import App from './App';
import storyReducer from './reducers/story';
import { AUTHENTICATED } from './actions/types';

const rootReducer = combineReducers({
  user: userReducer,
  story: storyReducer
});

const store = createStore(rootReducer);

if (localStorage.getItem('user_details')) {
  const userDetails = JSON.parse(localStorage.getItem('user_details'));
  store.dispatch({ type: AUTHENTICATED, payload: userDetails });
}

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
