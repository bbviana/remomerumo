/**
 * @returns {} objeto resultante de um merge entre os arguments recebidos que não forem false
 */
export default function(){
    var res = {};
    for(var i = 0; i < arguments.length; i++){
        if(arguments[i]){
            Object.assign(res, arguments[i]);
        }
    }
    return res;
}
