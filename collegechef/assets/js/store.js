import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';
import { createForms } from 'react-redux-form';

function login(st0 = { email: "", password: "", errors: null }, action) {
    switch (action.type) {
        case 'CHANGE_LOGIN':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function register(st0 = { first_name: "", last_name: "", email: "", password: "", errors: null }, action) {
    switch (action.type) {
        case 'REGISTER_USER':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function home_search(st0 = { searchWords: [] }, action) {
    switch (action.type) {
        case 'CHANGE_WORDS':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function feedback(st0 = { firstname: "", lastname: "", telnum: "", email: "", agree: false, contactType: 'Tel.', message: "", errors: null }, action) {
    switch (action.type) {
        case 'CHANGE_LOGIN':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function forms(st0, action) {
    let reducer = combineReducers({
        ...createForms({
            feedback: feedback
        }),
        login,
        register,
        home_search
    });
    return reducer(st0, action);
}

function users(st0 = new Map(), action) {
    return st0;
}

let session0 = localStorage.getItem('session');
if (session0) {
    session0 = JSON.parse(session0);
}

function session(st0 = session0, action) {
    switch (action.type) {
        case 'LOG_IN':
            //console.log("Session Log in:" + action.data);
            return action.data;
        case 'LOG_OUT':
            return null;
        default:
            return st0;
    }
}

function recipes(st0 = session0, action) {
  switch (action.type) {
    case 'DBSEARCH_RESULTS':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function root_reducer(st0, action) {

    console.log("root reducer", st0, action);
    let reducer = combineReducers({
        forms,
        users,
        session,
        recipes,
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;