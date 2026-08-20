import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path: string;
    routes: Router;
}
export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, public_path = 'public', routes } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }
    async start() {
        //*si yo lo que quiero es servir todo lo que este en mi carpera publica tendremos que usar los middleware
        //*middleware no son nada mas que funciones que se ejecutan en todo momento que pasen por una ruta
        //*public folder
        //*si nosotros queremos colocar todo ha disposicion de las personas que lo soliciten 
        //?middlewares
        //*hay un middleware en express que nos sirve para parsear ls informacion que viene en el body y la transporfe en un objeto json
        //*que es exactamente es lo que ocupamos
        //!el middleware que vamos a tomar esta en express.json() cualquier peticion que pase por nuestro servidor pasa por este middleware
        //y si viene el body la serializa como un json
        this.app.use(express.json());   //raw
        this.app.use(express.urlencoded({ extended: true }));//esto permite www-form-unlencode
        //?public Folder
        this.app.use(express.static(this.publicPath));

        //*Routes
        this.app.use(this.routes);

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${3000}`)
        })
    }
}