# redux-toolkit-note
A note for Reudx Toolkit

### Basic concept in node.js

```index.js```
```javascript
const redux = require("redux")
const createStore = redux.createStore

const initialCakeState = {
  numOfCakes: 10
}

const CAKE_ORDERED = 'CAKE_ORDERED'

function orderCake() {
  return {
    type: CAKE_ORDERED,
    qunatity: 1,
    other: ...
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
        numOfCakes: numOfCakes - 1
      }
    default:
      return state
  }
  
}

const store = createStore(reducer)

console.log('Initial state', store.getState())

const unsubscribe = store.subscribe(() => console.log('Update state', store.getStore())

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

unsubscribe()
````
