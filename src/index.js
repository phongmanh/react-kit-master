import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from '../src/main/app'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
//import { createLogger } from 'redux-logger'
import reducersApp from '../src/reducers/reducers'
import moment from 'moment'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import 'antd/dist/antd.css'
import '../src/contents/styles/style.css'


function createLogger({ getState }) {
    return (next) =>
        (action) => {

            const console = window.console;
            const prevState = getState();
            const returnValue = next(action);
            const nextState = getState();
            const actionType = String(action.type);
            const message = `action ${actionType}`;
            console.log(`%c prev state`, `color: #9E9E9E`, prevState);
            console.log(`%c action`, `color: #03A9F4`, action);
            console.log(`%c next state`, `color: #4CAF50`, nextState);
            console.log("Logging", moment(Date.now()).toObject())
            return returnValue;
        };
}

//const loggerMiddleware = createLogger()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
    reducersApp
    , composeEnhancers(applyMiddleware(
        thunkMiddleware,
        //loggerMiddleware
        createLogger
    ))
)

ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <Provider store={store}>
            <App />
        </Provider>
    </LocaleProvider>
    , document.getElementById('root'));
registerServiceWorker();
