import { App } from 'vue'
import UiButton from './ui-button.vue'
import UiInput from './ui-input.vue'
import UiPreload from "./ui-preload.vue"
import DropdownHeaderFilter from "./dropdown-haeder-filter/dropdown-haeder-filter.vue"

export default (app: App<Element>) => {
	app.component('UiButton', UiButton)
	app.component('UiInput', UiInput)
	app.component('UiPreload', UiPreload)
	app.component('DropdownHeaderFilter', DropdownHeaderFilter)
}