import * as Controller from "./controller";
import * as Model from './model'
import * as View from './view';

if(location.pathname === '/~jimmy/') {
    const app = new Controller.IndexController(new Model.IndexModel(), new View.IndexView());
}
if(location.pathname === '/~jimmy/post.html') {
    const app = new Controller.PostController(new Model.PostModel(), new View.PostView)
}