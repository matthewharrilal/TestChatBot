function findById(o, id) {
    //Early return
    if( o.id === id ){
      return o;
    }
    var result, p;
    for (p in o) {
        if( o.hasOwnProperty(p) && typeof o[p] === 'object' ) {
            result = findById(o[p], id);
            if(result){
                return result;
            }
        }
    }
    return result;
}

module.exports = findById;
