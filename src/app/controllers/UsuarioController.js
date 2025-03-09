import UsuarioRepository from '../repositories/UsuarioRepository.js'

class UsuarioController {
    async show(req, res) {
        const id = req.params.id;
        const row = await UsuarioRepository.findById(id);
        res.send(row);
    }
    async login(req, res) {
        const { email, senha } = req.body;

        console.log(email);
        console.log(senha);

        if (!email || !senha) {
            res.status(400).json({ erro: 'Dados insuficientes'}); 
        }

        try {
            const usuarios = await UsuarioRepository.findByEmail(email);
            const usuario = usuarios[0];
            console.log(usuario);

            if (!usuario) {
                res.status(400).json({ erro: 'Usuário não existe!' });
                return;
            }

            if (usuario.email === email && usuario.senha === senha) {
                res.redirect('/principal');
            }
            else {
                return { erro: 'E-mail ou senha incorretos.' }
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error);
        }

    }
    async showAll(req, res) {
        const row = await UsuarioRepository.findAll();
        res.send(row);
    }
    async store(req, res) {
        const usuario = req.body;
        const row = UsuarioRepository.create(usuario);

        res.json(row)
    }
    async update(req, res) {
        const usuario = req.body;
        const id = req.params.id;
        const row = UsuarioRepository.update(usuario, id);

        res.json(row);
    }
    async delete(req, res) {
        const id = req.params.id;
        const row = UsuarioRepository.delete(id);

        res.json(row);
    }
}

//Padrão Singleton: 
export default new UsuarioController(); 