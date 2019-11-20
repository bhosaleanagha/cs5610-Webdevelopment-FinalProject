import store from './store';

export function post(path, body) {
    let state = store.getState();
    let token = "";
    if (state.session) {
        token = state.session.token;
        console.log(token);
    }

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

export function get(path) {
    let state = store.getState();
    let token = "";
    if (state.session) {
        token = state.session.token;
        console.log(token);
    }

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

export function get_recipes(form) {
    let state = store.getState();
    let data = state.forms.search;
    post('/dbsearch', data)
        .then((resp) => {
            if (resp.data) {
                console.log(resp.data);
                form.redirect('/search');
            } else {
                console.log("Errors " + resp.errors);
            }
        });
}

export function submit_register(form) {
    let state = store.getState();
    let data = state.forms.register;

    post('/users', data)
        .then((resp) => {
            store.dispatch({
                type: 'REGISTER_USER',
                data: { errors: JSON.stringify(resp.errors) },
            });
            form.redirect('/');
        })
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