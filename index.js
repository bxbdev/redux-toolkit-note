const redux = require("redux")
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

const initialCakeState = {
  numOfCakes: 10,
  numOfIceCreams: 20
}

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake() {
  return {
    type: CAKE_ORDERED,
    // qunatity: 1,
    payload: 1
  }
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty
  }
}

function orderIceCream() {
  return {
    type: ICECREAM_ORDERED,
    payload: 1
  }
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty
  }
}

const reducer = (state = initialCakeState, action) => {
  // check action type
  console.log(action.type)
  
  switch(action.type) {
    case CAKE_ORDERED:
      return {
        // origin state is immutable, thus using ES6 ...state to copy a new state
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload
      }
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      }
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload
      }
    default:
      return state
  }
  
}

const store = createStore(reducer)

console.log('Initial state', store.getState()) // Initial state { numOfCakes: 10, numOfIceCreams: 20 }

const unsubscribe = store.subscribe(() => console.log('Update state', store.getState()))

// store.dispatch(orderCake()) // Update state { numOfCakes: 9 }
// store.dispatch(orderCake()) // Update state { numOfCakes: 8 }
// store.dispatch(orderCake()) // Update state { numOfCakes: 7 }
// store.dispatch(restockCake(3)) // Update state { numOfCakes: 10 }

const actions = bindActionCreators({ 
    orderCake,
    restockCake,
    orderIceCream,
    restockIceCream
}, store.dispatch)

actions.orderCake() // Update state { numOfCakes: 9, numOfIceCreams: 20 }
actions.orderCake() // Update state { numOfCakes: 8, numOfIceCreams: 20  }
actions.orderCake() // Update state { numOfCakes: 7, numOfIceCreams: 20  }
actions.orderCake(3) // Update state { numOfCakes: 10, numOfIceCreams: 20  }

actions.orderIceCream() // Update state { numOfCakes: 10, numOfIceCreams: 20 }
actions.orderIceCream() // Update state { numOfCakes: 10, numOfIceCreams: 19 }
actions.orderIceCream() // Update state { numOfCakes: 10, numOfIceCreams: 18 }
actions.restockIceCream(3) // Update state { numOfCakes: 10, numOfIceCreams: 20 }

unsubscribe()