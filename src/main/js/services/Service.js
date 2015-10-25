
class Service {
    listeners = new Set();

    listen(listener){
        this.listeners.add(listener)
    }

    unlisten(listener){
        this.listeners.delete(listener)
    }

    dispatch(data){
        this.listeners.forEach(it => it.setState(data))
    }
}

export default Service
