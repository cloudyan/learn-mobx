import * as React from "react";
import { render } from "react-dom";
import { observable, trace } from "mobx";
import { observer } from "mobx-react-lite";

const NameStore = (name, age, traceEnabled = false) =>
  observable({
    name,
    age,
    traceEnabled
  });

const nameStore = NameStore("Ruby", 38);
window.nameStore = nameStore;

// const MyComponent = observer((props) => {
//   trace(true) // Enter the debugger whenever an observable value causes this component to re-run.
//   return <div>{props.user.name}</name>
// })

const App = observer(({ store }) => {
  trace(store.traceEnabled);
  return (
    <div>
      <h2>Name: {store.name}</h2>
      <input
        value={store.name}
        onChange={event => (store.name = event.target.value)}
      />
      <h2>Age: {store.age}</h2>
      <input
        type="number"
        value={store.age}
        onChange={event => (store.age = event.target.value)}
      />
      <br />
      <hr />
      <button onClick={() => (store.traceEnabled = !store.traceEnabled)}>
        Toggle breakpoint: {store.traceEnabled.toString()}
      </button>


      <br />
      {/* <MyComponent user={name: '111'} /> */}
    </div>
  );
});
App.displayName = "App";

export default () => {
  return <App store={nameStore} />
}
