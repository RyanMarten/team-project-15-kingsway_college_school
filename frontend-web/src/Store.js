import { decorate, observable, action, configure } from "mobx"
import React from "react"

class Store extends React.Component {
	search = (searchTerm) => {
		console.error('[SEARCH NOT DEFINED]')
	}
}

decorate(Store, {
	search: action
})

// You can remove this if you want to be able to directly change values rather than doing it through a setter function
configure({enforceActions: "observed"})
const globalStore = new Store()
export default globalStore;