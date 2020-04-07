import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {configureStore} from "./redux/store";
import App from "./components/App";
import {combinedReducers} from "./redux/reducers/index";
let reduxStore = configureStore();
ReactDOM.render(
    <Provider store={reduxStore}>
        <App />
    </Provider>,
    document.getElementById("reduxRoot")
);
