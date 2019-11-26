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

function addrecipes(st0 = { name: "", duration: 0, ingredients: "", cuisine: "", description: "", diet: "", dislikes: 0, likes: 0, data: null, user_id: "" }, action) {
    let session0 = localStorage.getItem('session');
    if (session0) {
        session0 = JSON.parse(session0);
        st0 = Object.assign({}, st0, { user_id: session0.user_id });
    }
    let st1 = Object.values(st0);
    let ingr = st1[2];
    if (ingr) {
        if (Array.isArray(ingr)) {
            ingr = ingr.join(', ');
            st0 = Object.assign({}, st0, { ingredients: ingr });
        }
    }
    switch (action.type) {
        case 'ADD_RECIPE':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function forms(st0, action) {
    let reducer = combineReducers({
        ...createForms({
            feedback: feedback,
            addrecipes: addrecipes
        }),
        login,
        register,
        home_search,
        new_ingredient
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

function recipes(st0 = {}, action) {
    switch (action.type) {
        case 'DBSEARCH_RESULTS':
            return Object.assign({}, st0, action.data);
        case 'CLEAR_RESULTS':
            let rec = st0;
            let res = Object.values(rec);
            for (let i = 0; i < res.length; i++) {
                let ingr = res[i]["ingredients"];
                if (ingr.includes(action.data)) {
                    delete res[i];
                }
            }
            return res;
        default:
            return st0;
    }
}

function userrecipes(st0 = new Map(), action) {
    let st1 = new Map(st0);
    switch (action.type) {
        case 'GET_RECIPES':
            for(let i=0; i< action.data.length; i++){
                st1.set(action.data[i]["id"], action.data[i]);
            }
            //st1 = Object.assign(st1, {}, {userrecipes: st2, newlyadded: true});
            return st1;
        case 'ADDED_RECIPE':
            for(let i=0; i< action.data.length; i++){
                st1.set(action.data[i]["id"], action.data[i]);
            }
            return st1;
        default:
            return st0;
    }
}

function new_ingredient(st0 = { name: "" }, action) {
    switch (action.type) {
        case 'ADD_NEW_INGREDIENT':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function ingredients(st0 = new Map(), action) {
    let st1 = new Map(st0);
    switch (action.type) {
        case 'ADD_INGREDIENT':
            for (let ts of action.data) {
                st1.set(ts.id, ts);
            }
            return st1;
        case 'GET_INGREDIENTS':
            for (let ts of action.data) {
                st1.set(ts.id, ts);
            }
            return st1;
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
        ingredients,
        userrecipes,
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;