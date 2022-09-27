import { createApp } from 'vue';
import App from './App.vue';
import { store, injectionKey } from './store';

const app = createApp(App);

app.use(store, injectionKey);

app.mount('#app');
