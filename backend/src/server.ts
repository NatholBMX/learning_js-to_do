import App from "./app";
import PostsController from "./todos/todos.controller";

const app = new App([new PostsController()], 5000);

app.listen();

// tutorial to follow: https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/
