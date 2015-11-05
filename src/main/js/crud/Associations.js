
/**
 * {id: 1, name: 'Bean 1'} => 1
 * null => null
 *
 * Evita excções undefined
 */
function id(bean){
    return bean && bean.id
}

/**
 * [{id: 1, name: 'Bean 1'}, {id: 2, name: 'Bean 2'} => [1, 2]
 * null => null
 *
 * Evita exceções undefined
 */
function ids(beans){
    return beans && beans.map(bean => bean.id)
}


/**
 * Modifica eventos change para tratar associações.
 * Um select lança um evento change com o target no seguinte formato:
 * - target = {value: "3"}
 *
 * Queremos alterá-lo para:
 * - target = {
 *      value: {id: "3"}
 * }
 *
 * Se target.multiple:
 * - target = {
 *      value: [{id: "3"}, {id: "4"}]
 * }
 *
 */
function handleAssociationChange(event) {
    const target = event.target
    let value

    if (target.multiple) {
        value = Array.from(target.options)
            .filter(option => option.selected)
            .map(option => ({id: option.value}))
    } else {
        value = {id: target.value}
    }

    if(!target.value){
        value = null
    }

    event.target = {
        name: target.name,
        value: value
    }
}

export {
    id,
    ids,
    handleAssociationChange
}