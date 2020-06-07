import module from './module.js'
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

class IndexController extends Controller {
    constructor(model, view) {
        super(model, view);
        this.searchItems();
        this.view.changeAllCheckBox();
        this.view.deletePosts(this.handleDeletePosts);
        this.view.responsiveHeader();
    }
    searchItems = async () => {
        const data = await this.model.getSectionInfo();
        this.view.appendPostsInSection(data.result);
        this.view.appendPageList(data.cnt);
    }
    handleDeletePosts = async (deleteList) => {
        await this.model.deletePosts(deleteList);
        this.searchItems();
    }
}

class PostController extends Controller {
    constructor(model, view) {
        super(model, view);
        this.searchItem();
    }
    searchItem = async () => {
        const data = await this.model.getPost();
        this.view.bindPost(data);
        this.view.updatePost(this.handelUpdatePost);
    }
    handelUpdatePost = async (params) => {
        this.model.updatePost(params);
        alert('수정완료');
    }
}
export {
    IndexController,
    PostController
};