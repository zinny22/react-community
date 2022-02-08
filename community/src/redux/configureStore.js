import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import post from "./modules/post";
import Image from "./modules/image";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    user: User,
    post : post,
    image : Image,
    router : connectRouter(history),
  });

const middlewares = [thunk.withExtraArgument({history:history})];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
// 지금 우리는 개발 환경으로 찍힘
const env = process.env.NODE_ENV;
  
// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
// 개발환경에서만 사용하도록 조건문 달아줌 
if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

//redux devTools 사용 설정 
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose;

// 미들 웨어 묶기 
// applyMiddleware로 지금까지 모든 미들웨어를 사용한다고 설정 해주고 
// composeEnhancers로 묶어줌
const enhancer = composeEnhancers( applyMiddleware(...middlewares));

// 스토어 만들기 
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();