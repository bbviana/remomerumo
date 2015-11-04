class Controller {
    listeners = new Set();

    listen(listener){
        this.listeners.add(listener)
    }

    unlisten(listener){
        this.listeners.delete(listener)
    }

    dispatch(newState){
        if(this.state){
            Object.assign(this.state, newState);
        }
        this.listeners.forEach(it => it.setState(newState))
    }

    emitChange(){
        this.listeners.forEach(it => it.setState(this.state))
    }
}

export default Controller
