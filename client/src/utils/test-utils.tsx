import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { initialState as reducerInitialState, appReducer as reducer, AppState } from '../redux/reducers'

function render(
  ui: Parameters<typeof rtlRender>[0],
  {
    initialState = {},
    store = null,
    ...renderOptions
  }: Parameters<typeof rtlRender>[1] & { initialState?: Partial<AppState>, store?: any } = {}
) {
  initialState = {...reducerInitialState, ...initialState};
  store = createStore(reducer, initialState as AppState);
  function wrapper({ children }: {children: any}) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: wrapper as React.ComponentType, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
