import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import {preloadedState} from "./reducers/index.js";
import {combinedReducers} from "./reducers/index.js";
let middleWareEnhancer = applyMiddleware(thunkMiddleware);
let composedEnhancers = compose(middleWareEnhancer);

export function configureStore(){
  console.log(preloadedState);
  var x: any = createStore(combinedReducers,preloadedState,composedEnhancers);
  console.log(x);
  return x;
}
