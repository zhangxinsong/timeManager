import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.js';

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    var memberId = localStorage.getItem("memberId");
    if(!memberId && to.name != 'login'){
        next({name:'login'})
    }else{
        next();
    }
});

export default router;