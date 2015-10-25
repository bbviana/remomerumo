import db from '../db'

/*
 * url: /collection [/id] (/collection [/id])+
 * /categories
 * /categories/42
 * /categories/42/subCategories
 * /categories/42/subCategories/20
 * /categories/42/subCategories/20/items
 */
const xhr = {
    // [LIST] [FIND] /categories, /categories/42
    get(url){
        return promise(() => {
            let {collection, element} = navigate(url);
            return element || collection;
        }, "GET", url);
    },

    // [CREATE] /categories {data}, /categories/42/subCategories {data}
    post(url, data){
        return promise(() => {
            let {collection} = navigate(url);
            data.id = generateId();
            collection.push(data);
            return data;
        }, "POST", url);
    },

    // [UPDATE] /categories/42 {data}, /categories/42/subCategories/20 {data}
    put(url, data){
        return promise(() => {
            let {element} = navigate(url);
            Object.assign(element, data);
            return element;
        }, "PUT", url);
    },

    // [DELETE] /categories/42, /categories/42/subCategories/20
    delete(url){
        return promise(() => {
            let {collection, element} = navigate(url);
            let index = collection.findIndex(element => element.id == element.id);
            collection.splice(index, 1); // remove 1 element at index
            return element;
        }, "DELETE", url);
    }
}

const REQUESTS_TIMEOUT_MS = window.REQUESTS_TIMEOUT_MS != null ? window.REQUESTS_TIMEOUT_MS : 500;

function promise(callback, method, url){
    return new Promise((resolve, reject) => {
        console.log(`[${method}] ${url}`);

        let execute = () => {
            let data = callback();
            console.log("Response:", data);
            resolve(data);
        }

        if(REQUESTS_TIMEOUT_MS > 0) {
            setTimeout(execute, REQUESTS_TIMEOUT_MS);
        } else {
            execute();
        }
    });
}

// random inteiro no intervalo [0, 10.000.000]
function generateId(){
    return Math.floor(Math.random()*10000000);
}

/**
 * entrada: /categories/42/subCategories/20/items
 * =>: ["categories", 42, "subCategories", 20, "items"]
 * saída: [
 *      {collection: "categories", id: 42},
 *      {collection: "subCategories", id: 20},
 *      {collection: "items", id: null}
 * ]
 */
function navigate(url){
    let parts = url.split("?");
    let uri = parts[0];
    let uriParts = uri.split("/").filter(notEmpty);
    let args = extarctArgs(parts[1]);

    let collectionsIds = [];

    for(let i = 0; i < uriParts.length; i =  i + 2){
        collectionsIds.push({
            collection: uriParts[i],
            id: uriParts[i + 1] && parseInt(uriParts[i + 1])
        });
    }

    let collection = null;
    let element = db;

    for (let ci of collectionsIds) {
        collection = element[ci.collection];
        if(collection instanceof Function){
            collection = collection();
        }

        if(!ci.id){
            element = null;
            break;
        }

        if(!Array.isArray(collection)) throw new Error("");

        element = collection.find(it => it.id == ci.id);
        if(!element) throw new Error(`Elemento ${ci.id} não encontrado`);
    }

    if(!collection) throw new Error("");

    // filter
    if(!element && args.length > 0){
        collection = collection.filter(it =>
            args.every(arg => arg.value == toStr(it[arg.name]))
        )
        if(collection.length == 1){
            element = collection[0];
        }
    }

    return {collection, element};
}

// arg1=value1&arg2=value2&booleanArg
function extarctArgs(argsStr){
    if(!argsStr) return [];

    return argsStr
            .split('&')
            .filter(notEmpty)
            .map(it => {
                let parts = it.split('=');
                return {name: parts[0], value: parts[1] || 'true'}
            });
}

const notEmpty = it => it !== "";

const toStr = it => it == null ? null : it.toString();

export default xhr
