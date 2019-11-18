import store from './store';

export function post(path, body) {
  let state = store.getState();
  let token = "";
  if(state.session){
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
  let token = state.session.token;

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

export function get_photo(id) {
  get('/photos/'+id)
    .then((resp) => {
      store.dispatch({
        type: 'ADD_PHOTOS',
        data: [resp.data],
      });
    });
}

export function list_photos() {
  get('/photos')
    .then((resp) => {
      console.log("list_photos", resp);
      store.dispatch({
        type: 'ADD_PHOTOS',
        data: resp.data,
      });
    });
}

export function get_recipes(form){
    let state = store.getState();
    let data = state.forms.search;
    console.log(data);
    form.redirect('/search');
}

export function get_timesheets(){
  get('/timesheets')
  .then((resp) => {
    console.log(resp);
    console.log(resp.data);
    store.dispatch({
      type: 'GET_TIMESHEETS',
      data: resp.data,
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
      }
      else {
        store.dispatch({
          type: 'CHANGE_LOGIN',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}


export function submit_timesheet(form) {
  let state = store.getState();
  let data = state.forms.new_timesheet;

  post('/timesheets', {
    timesheet: {
      user_id: data.user_id,
      hr1: data.hr1,
      hr2: data.hr2,
      hr3: data.hr3,
      hr4: data.hr4,
      hr5: data.hr5,
      hr6: data.hr6,
      hr7: data.hr7,
      hr8: data.hr8,
      jobid1: data.jobid1,
      jobid2: data.jobid2,
      jobid3: data.jobid3,
      jobid4: data.jobid4,
      jobid5: data.jobid5,
      jobid6: data.jobid6,
      jobid7: data.jobid7,
      jobid8: data.jobid8,
      date: data.date,
      status: data.status
    }
  }).then((resp) => {
      if (resp.data) {
          store.dispatch({
            type: 'ADD_TIMESHEET',
            data: [resp.data],
          });
        form.redirect('/users/worker');
      }
      else {
        store.dispatch({
          type: 'CHANGE_NEW_TIMESHEET',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
  }

  export function approve_timesheet(id) {
    let state = store.getState();
    let data = state.forms.new_timesheet;
  
    post('/timesheets/'+id, {
      timesheet: {
        user_id: data.user_id,
        hr1: data.hr1,
        hr2: data.hr2,
        hr3: data.hr3,
        hr4: data.hr4,
        hr5: data.hr5,
        hr6: data.hr6,
        hr7: data.hr7,
        hr8: data.hr8,
        jobid1: data.jobid1,
        jobid2: data.jobid2,
        jobid3: data.jobid3,
        jobid4: data.jobid4,
        jobid5: data.jobid5,
        jobid6: data.jobid6,
        jobid7: data.jobid7,
        jobid8: data.jobid8,
        date: data.date,
        status: data.status
      }
    }).then((resp) => {
        if (resp.data) {
            store.dispatch({
              type: 'GET_TIMESHEETS',
              data: [resp.data],
            });
          form.redirect('/users/manager');
        }
        else {
          store.dispatch({
            type: 'CHANGE_NEW_TIMESHEET',
            data: {errors: JSON.stringify(resp.errors)},
          });
        }
      });
    }