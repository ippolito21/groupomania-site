/**
 * 
 * @param {String} key 
 *
 */
function getItemFromLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
}

/**
 * 
 * @param {String} key 
 * @param {String} value
 *
 */
 function setItemToLocalStorage(key, value){
    localStorage.setItem(key, value)
}

/**
 * 
 * @param {String} key 
 * 
 *
 */
 function removeItemFromLocalStorage(key){
    localStorage.removeItem(key)
}


export {getItemFromLocalStorage, setItemToLocalStorage, removeItemFromLocalStorage}