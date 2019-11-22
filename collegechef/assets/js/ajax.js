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

export function get_recipes(form) {
    let state = store.getState();
    let data = state.forms.home_search;
    post('/dbsearch', data)
        .then((resp) => {
            if (resp.data) {
                console.log(resp.data);
                form.redirect('/home');
            } else {
                console.log("Errors " + resp.errors);
            }
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