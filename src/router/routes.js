
import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Search from '../pages/Search/Search'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'

export default [
    {
        name: 'msite',
        path: '/msite',
        component: Msite,
        meta: {
            isShowFooter: true
        }
    },
    {
        name: 'order',
        path: '/order',
        component: Order,
        meta: {
            isShowFooter: true
        }
    },
    {
        name: 'search',
        path: '/search',
        component: Search,
        meta: {
            isShowFooter: true
        }
    },
    {
        name: 'profile',
        path: '/profile',
        component: Profile,
        meta: {
            isShowFooter: true
        }
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        path: '/',
        redirect: '/msite'
    }
]