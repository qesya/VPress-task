import { combineReducers, createStore } from "redux"

import app from "./app"


const reducers = combineReducers({
	app,
})

export default function configStore(preloadedState) {
	const store = createStore(
		reducers,
		preloadedState,
	)
	return store
}

