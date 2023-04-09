# redux-toolkit-note
A note for Reudx Toolkit

### Basic reudx concept in node.js

```index.js```
```javascript
const redux = require("redux")
const createStore = redux.createStore
const bindActionCreators = reudx.bindActionCreators

const initialCakeState = {
  numOfCakes: 10,
  other: ...
}

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

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
    // qunatity: qty
    payload: qty
  }
}

const reducer = (state = initialCakeState, action) => {
  // check action type
  console.log(action.type)
  
  swtich(action.type) {
    case CAKE_ORDERED:
      return {
        // copy a state if there are more properites
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload
      }
    default:
      return state
  }
  
}

const store = createStore(reducer)

console.log('Initial state', store.getState()) // Initial state { numOfCakes: 10 }

const unsubscribe = store.subscribe(() => console.log('Update state', store.getStore())

// store.dispatch(orderCake()) // Update state { numOfCakes: 9 }
// store.dispatch(orderCake()) // Update state { numOfCakes: 8 }
// store.dispatch(orderCake()) // Update state { numOfCakes: 7 }
// store.dispatch(restockCake(3)) // Update state { numOfCakes: 10 }

const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch)

actions.orderCacke() // Update state { numOfCakes: 9 }
actions.orderCacke() // Update state { numOfCakes: 8 }
actions.orderCacke() // Update state { numOfCakes: 7 }
actions.resockCacke(3) // Update state { numOfCakes: 10 }

unsubscribe()
````
