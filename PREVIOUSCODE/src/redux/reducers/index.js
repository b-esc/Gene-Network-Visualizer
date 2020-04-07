// @flow
import { combineReducers } from "redux";
import type {ModalStore} from "../../types.js";
import type {QueryStore} from "../../types.js";
import {initalModalStore, modalReducer} from "./modal.js";
import {initialQueryStore, queryReducer} from "./query.js";

var preloadedState: any = Object.assign({},initalModalStore, initialQueryStore);
const combinedReducers = combineReducers({ queryReducer, modalReducer });
export {combinedReducers, preloadedState};
