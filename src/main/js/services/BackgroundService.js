import {xhr} from '../utils'

class BackgroundService {
    list = () => xhr.get('bg-images')

    find(id){

    }

    save(category){

    }

    remove(id){

    }
}

export default new BackgroundService()
