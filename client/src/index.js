import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from "./store";
import { Provider } from "react-redux"
import actionCable from 'actioncable'

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
export const ActionCableContext = createContext()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <ActionCableContext.Provider value={CableApp.cable}>
      <App />
      </ActionCableContext.Provider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

