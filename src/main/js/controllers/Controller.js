class Controller {
    listeners = new Set();

    listen(listener){
        this.listeners.add(listener)
    }

    unlisten(listener){
        this.listeners.delete(listener)
    }

    dispatch(newData){
        if(this.state){
            Object.assign(this.state, newData);
        }
        this.listeners.forEach(it => it.setState(newData))
    }
}

export default Controller
