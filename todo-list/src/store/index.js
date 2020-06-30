import Vue from 'vue';
import Vuex from 'vuex';
import services from './modules/services';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { services },
    plugins: [createPersistedState(
        {
            key: 'ToDo',
            paths: ["services"]
        }
    )]
});