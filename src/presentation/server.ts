import express from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path: string;
}
export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    constructor(options: Options) {
        const { port, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
    }
    async start() {
        //*si yo lo que quiero es servir todo lo que este en mi carpera publica tendremos que usar los middleware
        //*middleware no son nada mas que funciones que se ejecutan en todo momento que pasen por una ruta
        //*public folder
        //*si nosotros queremos colocar todo ha disposicion de las personas que lo soliciten 
        this.app.use(express.static(this.publicPath));

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${3000}`)
        })
    }
}