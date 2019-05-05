import firstPage from 'Components/firstPage/firstPage.vue';
import add from 'Components/add/add.vue';
import aboutUs from 'Components/aboutUs/aboutUs.vue';
import introduce from 'Components/introduce/introduce.vue';
import my from 'Components/my/my.vue';
import myEdit from 'Components/my/myEdit.vue';
import login from 'Components/login/login.vue';
import signin from 'Components/signin/signin.vue';
import taskCount from 'Components/taskCount/taskCount.vue'

export default[{
    path: '',
    component: firstPage,
    redirect: '/firstPage'
},{
    path: '/login',
    name: 'login',
    component: login
},{
    path: '/signin',
    name: 'signin',
    component: signin
},{
    path: '/firstPage',
    component: firstPage
},{
    path: '/my',
    component: my
},{
    path: '/myEdit',
    component: myEdit
},{
    path: '/add',
    component: add
},{
    path: '/aboutUs',
    component: aboutUs
},{
    path: '/introduce',
    component: introduce
},{
    path: '/taskCount',
    component: taskCount
}]