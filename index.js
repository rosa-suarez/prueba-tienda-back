// Importar el módulo 'express', un framework de Node.js que facilita crear servidores web.
const express = require('express');

// Importar el módulo 'cors', que permite habilitar el intercambio de recursos entre dominios (Cross-Origin Resource Sharing)
const cors = require('cors');

// Crear una instancia de una aplicación Express, que será nuestro servidor 
const app = express();

app.use(express.json()); //NUEVA LINEA

// Define el puerto en el que escuchará el servidor (3000)
const port = 3000;

// Define una lista de orígenes (dominios) que podrán hacer peticiones a este servidor
// Aquí incluimos tanto 'localhost' como '127.0.0.1', ya que Live Server puede usar cualquiera de los dos 
const ALLOWED_ORIGINS = [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'https://tiendapruebaa.netlify.app'
];

// Configurar el middleware CORS antes de las rutas 
// 'app.use()' aplica esta configuración a todas las peticiones que llegan al servidor 
app.use(cors({

    // La opción 'origin' determina qué origenes pueden hacer peticiones.
    // Express llama a esta función cada vez que llega una solicitud
    origin: function (origin, callback) {
        // Si no hay origen (por ejemplo, peticiones desde Postman o el navegador directamente),
        // o si el origen está en la lista permitida, se acepta la conexión.
        if(!origin || ALLOWED_ORIGINS.includes(origin)) {
            return callback(null, true); // null = sin errores, true = permitido
        }

        // Si el origen no esta permitido, se rechaza la solicitud con un mensaje de error
        return callback(new Error('Not allowed by CORS: ' + origin));
    },

    //Especifica los métodos HTTP que este servidor aceptará
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],

    // Algunos navegadores antiguos esperan un código 200 (en lugar de 204) en respuestas "preflight"
    optionsSuccessStatus: 200
}));

// Define una ruta GET en la raiz ('/')
// Cuando el usuario visita 'http://localhost:3000/, esta funcion se ejecuta
app.get('/', (req, res) =>{
    //Envía una respuesta simple en texto plano al cliente 
    res.send({'message': 'API is working! Rosa Lizeth'});
});

app.get('/datos', (req, res) => {
    res.send(
    {
    "secretBase": "Super tower",
    "active": true,
    "members": [
    {
    "name": " Diego Ruan Padilla",
    "age": 29,
    "secretIdentity": "Unknown",
    "powers": [
    "Radiation resistance",
    "Turning tiny",
    "Radiation blast"
    ]
    },
    {
    "name": "Madame Uppercut",
    "age": 39,
    "secretIdentity": "Jane Wilson",
    "powers": [
    "Million tonne punch",
    "Damage resistance",
    "Superhuman reflexes"
    ]
    },
    {
    "name": "Eternal Flame",
    "age": 1000000,
    "secretIdentity": "Unknown",
    "powers": [
    "Immortality",
    "Heat Immunity",
    "Inferno",
    "Teleportation",
    "Interdimensional travel"
    ]
    }
    ]
    });
});

// Inicia el servidor y le indica que escuche peticiones en el puerto definido arriba.
// La función dentro del 'listen' se ejecuta cuando el servidor se levanta correctamente.
app.listen(port, () => {
    // Muestra un mensaje en la consola para confirmar que el servidor está activo.
    console.log(`Server NodeJs listening on port ${port}`);
});
