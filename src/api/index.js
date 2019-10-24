import myaxios from './ajax'

export const requestAddress = (longitude,latitude) => {
   return myaxios.get( `/position/${latitude},${longitude}`)
}

// export const requestCategory = () => {
//    return myaxios.get('/index_category')
// }


