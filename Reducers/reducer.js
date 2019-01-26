const reducer = (store = {}, action) => {
    console.log(action);
    switch (action.type) {
        case 'GOT_TASKS': return {...store, ...action.payload};
        default:
            return store;
    }
};

export {reducer};