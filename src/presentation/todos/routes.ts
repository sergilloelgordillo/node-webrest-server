import { Router } from "express";
import { TodosController } from "./controllers";
//?este route de express es algo que vamos a poder enviar ... como un middleware
//!aqui solo debemos definir las rutas y el controlador

//sistema de rutas unicamente relacionado a lo que son los todos
export class TodoRoutes {

    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();
        //cual es el path al cual yo quiero apuntar a una respuesta particular que en este caso seria api/todos
        //*usumo que la ruta que nos esta mandado nuestro middleware vamos a asumir que es nuestro puneto de entrada (/)
        router.get('/', todoController.getTodos);
        // router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}