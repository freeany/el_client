export const chunk = function(arr,size) {
    // 浅拷贝一份arr
    let copyArr = [...arr]
    const len = copyArr.length/size ===0 ? copyArr.length : Math.ceil(copyArr.length/size)
    let bigArr = []
    for(let i =0;i<len;i++) {
        let tempArr = copyArr.splice(0,size)
        bigArr.push(tempArr)
    }
    return bigArr
}