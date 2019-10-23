import myaxios from './ajax'

export const requestAddress = (longitude,latitude) => {
   return myaxios.get( `/position/${latitude},${longitude}`)
}


