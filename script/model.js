import module from './module'

class Model {
    constructor() {
        this.query = module.queryStringToJson(window.location.search.substring(1));
    }
    
}
class IndexModel extends Model {
    getSectionInfo = () => {
        console.log(this)
        const result = module.xhr({
            path: '',
            method: 'get',
            data: this.query,
        })
        return result;
    }
    deletePosts = deleteList => {
        const result = module.xhr({
            path: '', 
            method: 'delete', 
            data: deleteList,
        })
        return result;
    }
}
class PostModel extends Model {
    getPost = () => {
        const result = module.xhr({
            path: 'post',
            method: 'get',
            data: {id: this.query.id},
        })
        return result;
    }
    updatePost = (params = {
        id,
        title,
        content
    }) => {
        const result = module.xhr({
            path: 'post',
            method: 'PATCH',
            data: params,
        })
        return result;
    }
}
        

export {IndexModel, PostModel};