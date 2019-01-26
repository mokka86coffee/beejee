import {crossBrowserFetch as Fetch} from './crossBrowserFetch';
const BJ_URL = 'https://uxcandy.com/~shapoval/test-task-backend';
const DEV = 'developer=Evgeny';
const Api = store => next => action => {
    switch (action.type) {
        case 'GET_TASKS':
            Fetch(`${BJ_URL}/?${DEV}`, action.payload.params)
                .then(res=>next({ type: 'GOT_TASKS', payload: {message: res.message}}) );
            break;
        
        case 'CREATE_TASK':
            Fetch(`${BJ_URL}/create?${DEV}`, action.payload.params)
                .then(res => next({ type: 'GOT_TASKS', payload: { message: res.message } }));
            break;

        case 'EDIT_TASK': https://uxcandy.com/~shapoval/test-task-backend/?developer=Name
            Fetch(`${BJ_URL}/edit/${983}?${DEV}`, action.payload.params)
                .then(res => next({ type: 'GOT_TASKS', payload: { message: store.getState().message } }) );
            break;

        case 'GET_PAGE':
            Fetch(`${BJ_URL}/?${DEV}&page=${action.payload.page}`, action.payload.params)
                .then(res => next({ type: 'GOT_TASKS', payload: { message: res.message } }));
            break;

        case 'SORT_TASKS':
            Fetch(`${BJ_URL}/?${DEV}&sort_field=${action.payload.sortField}&sort_direction=asc`, action.payload.params)
                .then(res => {
                    next({ type: 'GOT_TASKS', payload: { message: res.message } });
                });
            break;

        default:
            next(action);
    }
}

export {Api};