//rutas globales

import { Router } from "express";
import { TodosController } from "./todos/controllers";
import { TodoRoutes } from "./todos/routes";
//?este route de express es algo que vamos a poder enviar ... como un middleware
//!aqui solo debemos definir las rutas y el controlador
export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/todos', TodoRoutes.routes);//forma explicita
        //nos vamos a definir otra nueva ruta el / vamos a recibir el id
        //este es una sintaxiis especial de express en al cual les dice la ruta que me este dando / va a poder recibir un argumento 

        return router;
    }
}