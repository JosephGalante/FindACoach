import { createStore } from 'vuex'

import coachesModule from './coaches/index.js'
import requestsModule from './requests/index.js'

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
  },
  state() {
    return {}
  },
})

export default store
