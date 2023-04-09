const redux = require('redux')
const createStore = redux.createStore

const CHANGE_STREET = 'CHANGE_STREET'

const initialState = {
    name: 'John Doe',
    address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'TX',
        zip: '12345'
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CHANGE_STREET':
            return {
                ...state,
                address: {
                    ...state.address,
                    street: action.payload
                }
            }
        default: 
            return state
    }
}

const store = createStore(reducer)

function updateStree(street) {
    return {
        type: CHANGE_STREET,
        payload: street
    }
}

const unsubscribe = store.subscribe( () => console.log('Update state', store.getState()))
console.log('Initial state', store.getState())

store.dispatch(updateStree('456 Main St'))

unsubscribe()