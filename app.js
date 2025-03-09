import express from 'express';  
import UsuarioController from './src/app/controllers/UsuarioController.js';  
import session from 'express-session';  
import path from 'path';  
import ejs from 'ejs';  
import { fileURLToPath } from 'url'; // Importe fileURLToPath  
import { dirname } from 'path';        // Importe dirname  
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename);  

const port = 3001;  
const app = express();  

app.use(session({ secret: 'asdasd3asDa2edasdasdas', resave: false, saveUninitialized: true })); 

// Configure a engine de template  
app.engine('html', ejs.renderFile);  
app.set('view engine', 'html');  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));  
app.set('views', path.join(__dirname, 'views')); // Define o diretório onde as views estão  

app.use(express.json());  

app.post('/usuarios', UsuarioController.store);  
app.get('/usuarios/:id', UsuarioController.show);  
app.get('/usuarios', UsuarioController.showAll);  
app.put('/usuarios/:id', UsuarioController.update);  
app.delete('/usuarios/:id', UsuarioController.delete);  

// Rota para exibir a página de login  
app.get('/', (req, res) => {  
    res.render('login');  
});  

// Rota para processar o login  
app.post('/login', UsuarioController.login);   

app.get('/principal', (req, res) => {  
    res.render('principal'); 
});  

    /*
    Verificar as credenciais  
    if (username === 'admin' && password === 'admin') {  
        // Autenticação bem-sucedida  
        req.session.loggedIn = true;  
        res.redirect('/principal');  
    } else {  
        // Autenticação falhou  
        res.render('login', { error: 'Usuário ou senha incorretos' });  
    } 
    */ 


/*
Middleware para proteger a rota "/principal"  
function requireLogin(req, res, next) {  
    if (req.session.loggedIn) {  
        next(); // Permite o acesso à rota  
    } else {  
        res.redirect('/'); // Redireciona para a página de login  
    }  
}  
*/  



app.listen(port, () => {  
    console.log(`Servidor rodando no endereço http://localhost:${port}`);  
});  

export default app;


/*
app.get('/', (req, res) => {  
    res.render('login'); 
});  




*/