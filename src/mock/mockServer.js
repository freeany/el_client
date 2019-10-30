/* 
    使用mockjs获取数据
*/

// 1. 引入mockjs
import Mock from 'mockjs'

// 引入data数据
import data from './data.json'        //webpack自动将其转换为json对象

// 开始mock数据
Mock.mock('/api/goods',{code: 0,data: data.goods})
Mock.mock('/api/info',{code: 0,data: data.info})
Mock.mock('/api/ratings',{code: 0,data: data.ratings})

// mock数据完成，无需导出，再main.js中运行一遍即可