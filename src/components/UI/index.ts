import { App } from 'vue'
import UiButton from './ui-button.vue'
import UiInput from './ui-input.vue'
import UiPreload from "./ui-preload.vue"
import DropdownHeaderFilter from "./dropdown-haeder-filter/dropdown-haeder-filter.vue"
import UiSelect from "./ui-select/ui-select.vue"
import UiPreviewImage from "./preview-image/ui-preview-image.vue"
import UiInputImage from "./ui-input-image/ui-input-image.vue"
import UiTextarea from "./ui-textarea.vue"

export default (app: App<Element>) => {
	app.component('UiButton', UiButton)
	app.component('UiInput', UiInput)
	app.component('UiPreload', UiPreload)
	app.component('DropdownHeaderFilter', DropdownHeaderFilter)
	app.component('UiSelect', UiSelect)
	app.component('UiPreviewImage', UiPreviewImage)
	app.component('UiInputImage', UiInputImage)
	app.component('UiTextarea', UiTextarea)
}