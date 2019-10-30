
import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Search from '../pages/Search/Search'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'

import TelLogin from '../pages/Login/childrenRouter/TelLogin'
import PwdLogin from '../pages/Login/childrenRouter/PwdLogin'

// 引入商家组件
import shop from '../components/shopList/shop/shop' 
//引入商家导航组件
import OrderdingFood from "../components/shopList/shop/nav/OrderdingFood";
import shopRating from "../components/shopList/shop/nav/shopRating";
import Shops from "../components/shopList/shop/nav/Shops";


// 引入测试组件
import A from "../pages/test/A";
import B from "../pages/test/B";
import B1 from "../pages/test/B1";
import B2 from "../pages/test/B2";

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
        path: '/login',
        component: Login,
        children: [
            { name: 'logintel', path: 'tel', component: TelLogin },
            { name: 'loginpwd', path: 'pwd', component: PwdLogin },
            { path: '/', redirect: '/login/tel'},
        ]
    },
    {
        // name: 'elShop', //  如果该路由默认需要指向指定的子的路由，则不要写一级路由的名字，否则会报警告
        path: '/elShop',
        component: shop,
        children: [
            { path: 'OrderdingFood', name: 'OrderdingFood', component: OrderdingFood },
            { path: 'shopRating', name: 'shopRating', component: shopRating },
            { path: 'Shops', name: 'Shops', component: Shops },
            {path: '/',redirect: 'OrderdingFood'}
        ]
    },
    {
        path: '/',
        redirect: '/msite'
    },


    
    // 测试组件
    {
        path: '/a',
        component: A
    },
    {
        path: '/b',
        component: B,
        children: [
            {path: '/b/b1',component: B1},
            {path: '/b/b2',component: B2},
            {path: '/',redirect: '/b/b1'},
        ]
    }
]