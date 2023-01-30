import { createApp } from 'vue'
//BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App.vue'
//FONTAWESOME
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

//FONTSOURCE
import '@fontsource/bebas-neue'

//ICONS
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
library.add(faStar, farStar, faMagnifyingGlass, faCircleNotch, faCircleChevronLeft, faCircleChevronRight);


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
