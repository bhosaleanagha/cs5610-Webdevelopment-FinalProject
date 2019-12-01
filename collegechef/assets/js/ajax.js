import store from './store';

export function post(path, body) {
    let state = store.getState();
    let token = state.session && state.session.token;

    return fetch('/ajax' + path, {
        method: 'post',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
        body: JSON.stringify(body),
    }).then((resp) => resp.json());
}

export function put(path, body) {
    let state = store.getState();
    let token = "";

    if (state.session) {
        token = state.session.token
    }

    return fetch('/ajax' + path, {
        method: 'put',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
        body: JSON.stringify(body),
    }).then((resp) => resp.json());
}

export function deleteC(path, id) {
    let state = store.getState();
    let token = "";

    if (state.session) {
        token = state.session.token
    }

    return fetch('/ajax' + path, {
        method: 'delete',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
    });
}

export function get(path) {
    let state = store.getState();
    let token = state.session && state.session.token;

    return fetch('/ajax' + path, {
        method: 'get',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
    }).then((resp) => resp.json());
}

export function get_recipes() {
    get('/recipes')
        .then((resp) => {
            store.dispatch({
                type: 'GET_RECIPES',
                data: resp.data,
            });
        });
}

export function submit_register(form) {
    let state = store.getState();
    let data = state.forms.register;

    post('/users', {
        user: {
            user_id: data.user_id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
        }
    }).then((resp) => {
        if (resp.data) {
            store.dispatch({
                type: 'REGISTER_USER',
                data: [resp.data],
            });
            form.redirect('/');
        } else {

        }
    })
}

export function submit_password_change(form) {
    let session0 = localStorage.getItem('session');
    let state = store.getState();
    let data = state.forms.change_password;
    let user_id = "";
    if (session0) {
        session0 = JSON.parse(session0);
        user_id = session0.user_id;
    }

    put('/users/' + user_id, {
        user: {
            password: data.password,
        }
    }).then((resp) => {
        if (resp.data) {
            store.dispatch({
                type: 'CHANGE_PASSWORD',
                data: [resp.data],
            });
            form.redirect('/');
        } else {
            store.dispatch({
                type: 'CHANGE_PASSWORD',
                data: { errors: JSON.stringify(resp.errors) },
            });
        }
    });
}

export function add_recipe(cuisine, description, diet, duration, name, data, ingredients, form) {
    let session0 = localStorage.getItem('session');
    let user_id = "";
    if (session0) {
        session0 = JSON.parse(session0);
        user_id = session0.user_id;
    }
    if (data != null) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            post('/recipes', {
                recipe: {
                    user_id: user_id,
                    cuisine: cuisine,
                    name: name,
                    duration: duration,
                    ingredients: ingredients,
                    diet: diet,
                    description: description,
                    dislikes: 0,
                    likes: 0,
                    data: reader.result,
                }
            }).then((resp) => {
                if (resp.data) {
                    store.dispatch({
                        type: 'ADDED_RECIPE',
                        data: [resp.data],
                    });
                    form.redirect('/');
                } else {
                    store.dispatch({
                        type: 'ADD_RECIPE',
                        data: { errors: JSON.stringify(resp.errors) },
                    });
                }
            });
        });
        reader.readAsDataURL(data[0]);
    } else {
        post('/recipes', {
            recipe: {
                user_id: user_id,
                cuisine: cuisine,
                name: name,
                duration: duration,
                ingredients: ingredients,
                diet: diet,
                description: description,
                dislikes: 0,
                likes: 0,
                data: null,
            }
        }).then((resp) => {
            if (resp.data) {
                console.log("Success");
                store.dispatch({
                    type: 'ADDED_RECIPE',
                    data: [resp.data],
                });
                form.redirect('/');
            } else {
                store.dispatch({
                    type: 'ADD_RECIPE',
                    data: { errors: JSON.stringify(resp.errors) },
                });
            }
        });
    }
}


export function edit_recipe_with_picture(id, cuisine, description, diet, duration, data, ingredients, form) {
    let session0 = localStorage.getItem('session');
    let user_id = "";
    if (session0) {
        session0 = JSON.parse(session0);
        user_id = session0.user_id;
    }
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        put('/recipes/' + id, {
            id: id,
            recipe: {
                cuisine: cuisine,
                duration: duration,
                ingredients: ingredients,
                diet: diet,
                description: description,
                data: reader.result,
            }
        }).then((resp) => {
            if (resp.data) {
                store.dispatch({
                    type: 'ADDED_RECIPE',
                    data: [resp.data],
                });
                form.redirect('/my-recipes');
            } else {
                store.dispatch({
                    type: 'ADD_RECIPE',
                    data: { errors: JSON.stringify(resp.errors) },
                });
            }
        });
    });
    reader.readAsDataURL(data[0]);
}

export function delete_recipe(id, form) {
    deleteC('/recipes/' + id, id).then(() => {
        //get_recipes();
        store.dispatch({
            type: 'DELETE_RECIPE',
            data: id
        });
        form.redirect('/');
    });
}

export function edit_recipe_without_picture(id, cuisine, description, diet, duration, ingredients, form) {
    let session0 = localStorage.getItem('session');
    let user_id = "";
    if (session0) {
        session0 = JSON.parse(session0);
        user_id = session0.user_id;
    }
    put('/recipes/' + id, {
        id: id,
        recipe: {
            cuisine: cuisine,
            duration: duration,
            ingredients: ingredients,
            diet: diet,
            description: description,
        }
    }).then((resp) => {
        if (resp.data) {
            store.dispatch({
                type: 'ADDED_RECIPE',
                data: [resp.data],
            });
            form.redirect('/my-recipes');
        } else {
            store.dispatch({
                type: 'ADD_RECIPE',
                data: { errors: JSON.stringify(resp.errors) },
            });
        }
    });
}



export function get_ingredients() {
    get('/ingredients')
        .then((resp) => {
            store.dispatch({
                type: 'GET_INGREDIENTS',
                data: resp.data,
            });
        });
}

export function add_ingredient(form) {
    let state = store.getState();
    let data = state.forms.new_ingredient;

    post('/ingredients', {
        ingredient: {
            name: data.name
        }
    }).then((resp) => {
        if (resp.data) {
            store.dispatch({
                type: 'ADD_INGREDIENT',
                data: [resp.data],
            });
        } else {
            store.dispatch({
                type: 'CHANGE_NEW_TIMESHEET',
                data: { errors: JSON.stringify(resp.errors) },
            });
        }
    });
}

export function get_recipe(id) {
    get('/recipes/' + id)
        .then((resp) => {
            store.dispatch({
                type: 'ADDED_RECIPE',
                data: [resp.data],
            });
        });
}

export function submit_login(form) {
    let state = store.getState();
    let data = state.forms.login;

    post('/sessions', data)
        .then((resp) => {
            if (resp.token) {
                localStorage.setItem('session', JSON.stringify(resp));
                store.dispatch({
                    type: 'LOG_IN',
                    data: resp,
                });
                form.redirect('/');
            } else {
                store.dispatch({
                    type: 'CHANGE_LOGIN',
                    data: { errors: JSON.stringify(resp.errors) },
                });
            }
        });
}