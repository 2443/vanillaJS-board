import module from './module.js'
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.query = module.queryStringToJson(window.location.search.substring(1));
    }
}

class IndexController extends Controller {
    constructor(model, view) {
        super(model, view);
        this.searchItems();
        this.view.changeAllCheckBox();
        this.view.deletePosts(this.handleDeletePosts);
        this.view.responsiveHeader();
        this.view.infiniteScroll(this.handleInfiniteScroll);
    }
    searchItems = async () => {
        const data = await this.model.getSectionInfo(this.query);
        this.view.bindPostsInSection(data.result);
        this.view.bindPageList(data.cnt);
    }
    handleDeletePosts = async (deleteList) => {
        await this.model.deletePosts(deleteList);
        this.searchItems();
    }
    handleInfiniteScroll = async (params) => {
        const data = await this.model.getSectionInfo(params);
        this.view.appendPostsInSection(data);
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