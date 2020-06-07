import * as Controller from "./controller.js";
import * as Model from './model.js'
import * as View from './view.js';

if (location.pathname === '/') {
    const app = new Controller.IndexController(new Model.IndexModel(), new View.IndexView());
}
if (location.pathname === '/post.html') {
    const app = new Controller.PostController(new Model.PostModel(), new View.PostView)
}