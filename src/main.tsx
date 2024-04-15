import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import AppWithRedux from './AppWithRedux.tsx'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  </React.StrictMode>,
)