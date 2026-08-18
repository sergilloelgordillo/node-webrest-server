import fs from 'fs'
import http from 'http';

//?que es lo que solicita y que es lo que vamos a responder
const server = http.createServer((req, res) => {
    console.log(req.url);
    // res.writeHead(200, { "Content-Type": 'text/html' })
    // res.write(`<h1>URL ${req.url}</h1>`)
    // res.end();
    // const dato = { nombre: 'Evelyn', edad: 30, ciudad: 'Chihuahua' }
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(dato));
    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { "Content-Type": 'text/html' })
        res.end(htmlFile);
        return;
    }
    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { "Content-Type": 'application/javascript' });
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { "Content-Type": 'text/css' });
    }
    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);
}
)

server.listen(8080, () => {
    console.log('servidor corriendo en el puerto 8080');
});