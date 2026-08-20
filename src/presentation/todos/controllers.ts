import { Request, Response } from 'express'
//?aqui no vamos a tener metodos estaticos por que vamos a hacer una inyeccion de dependencias 
//*por ejemplo vamos a querer inyectar un repositorio para implementar y usarlo mediante casos de uso
const todos = [
    { id: 1, text: 'Buy cable ', completedAt: new Date() },
    { id: 2, text: 'Buy lampara', completedAt: null },
    { id: 3, text: 'Buy herramienta', completedAt: new Date() },
]
//?este es el manejador de nuestra ruta
export class TodosController {
    //?DI
    constructor() { }
    //se recomienda que los metodos sean  de flecha por que cuando esto se ejecuta puede cambiar el valor a a lo que apunta el this 
    public getTodos = (req: Request, res: Response) => {
        //es muy comun que lo retornemos para no siga ejecutandose nada mas en nuestra aplicacion
        return res.json(todos)
    }
    // public getTodoById = (req: Request, res: Response) => {
    //     const id = +req.params.id;
    //     if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
    //     const todo = todos.find(todo => todo.id === id);
    //     (todo)
    //         ? res.json(todo)
    //         : res.status(404).json({ error: `TODO with id ${id} not found` })
    // }
    public createTodo = (req: Request, res: Response) => {
        // como obtengo el body de la peticion
        //?cuando ustedes mandan a llamar un post viene un tipo de payload un tipo de body y hay muchas formas de mandar el body
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' })

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        }
        todos.push(newTodo);

        res.json(newTodo);
    }
    //!por default le tengo que decir a express como quiero manejar esa serializacion de las peticiones de post 
    public updateTodo = (req: Request, res: Response) => {
        const { id } = req.params;
        const idNumber = Number(id)
        if (isNaN(idNumber)) return res.status(400).json({ error: 'ID argument is not a number' })

        const todo = todos.find(todo => todo.id === idNumber)
        if (!todo) return res.status(400).json({ error: `Todo with ${id} not found ` })

        const { text, completedAt } = req.body;
        todo.text = text || todo.text;

        (completedAt === null)
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);


        //!ojo referencia
        // todos.forEach((todo, index) => {
        //     if (todo.id == id) {
        //         todos[index] = todo;
        //     }
        // })
        res.json(todo);
    }
    public deleteTodo = (req: Request, res: Response) => {
        const { id } = req.params;
        const idNumber = Number(id);
        if (isNaN(idNumber)) return res.status(400).json({ error: 'ID argument is not a number' })

        const todo = todos.find(todo => todo.id === idNumber)
        if (!todo) return res.status(400).json({ error: `Todo with ${id} not found ` })

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);
    }
}