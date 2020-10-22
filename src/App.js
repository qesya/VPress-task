import React from "react"
import { Provider } from "react-redux"

import configureStore from "./states/configureStore"
import Search from "./components/Search"
import Gallery from "./components/Gallery"
import Lightbox from "./components/Lightbox"

const stores = configureStore()

const App = () => {
   return (
      <div className="bg-white w-screen pt-20 flex flex-col items-center">
         <Search />
         <Gallery />
         <Lightbox />
      </div>
  )
}

const ReduxContainer = () => (
   <Provider store={stores}>
      <App />
   </Provider>
)

export default ReduxContainer
