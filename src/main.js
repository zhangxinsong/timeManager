import Vue from 'vue';
import App from './app.vue';
import router from './router';
import axios from './config/ajax';
import ui from './global-ui';

import 'Assets/css/index.less';
import './directives/load.js'; 
import 'mint-ui/lib/style.css';//引入mint-ui的css

import { Field, DatetimePicker, Popup, Picker, Header, Button } from 'mint-ui';
Vue.component(Field.name, Field);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);

Vue.prototype.$ajax = axios;
Vue.prototype.$tip = ui;

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app')
