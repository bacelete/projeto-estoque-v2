import conexao from '../../app/database/connection.js'

class UsuarioRepository {
    static create(usuario) {
        const sql = "INSERT INTO usuario SET?;";
        conexao.query(sql, usuario, function (erro, result) {
            if (erro) {
                return erro;
            }
            else {
                return result
            }
        });
    }
    static update(usuario, id) {
        const sql = "UPDATE usuario SET ? WHERE id = ?;";

        conexao.query(sql, [usuario, id], function (erro, result) {
            if (erro) {
                return erro;
            }
            else {
                return result;
            }
        })
    }
    static delete(id) {
        const sql = `DELETE FROM usuario WHERE id = ${id}`;

        conexao.query(sql, function (erro, result) {
            if (erro) {
                return erro;
            }
            else {
                return result;
            }
        });
    }

    static findById(id) {
        const sql = `SELECT * FROM usuario WHERE id = ${id}`;
        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, result) => {
                if (erro) {
                    return reject('Não foi possível localizar');
                }
                else {
                    const row = JSON.parse(JSON.stringify(result));
                    return resolve(row);
                }
            });
        });
    }

    static findByEmail(email) {
        const sql = "SELECT * from usuario WHERE email = ?"; 

        return new Promise((resolve, reject) => {
            conexao.query(sql, email, (erro, result) => {
                if (erro) { 
                    return reject(`Não foi possível localizar o usuário com o e-mail: ${email}`);
                }
                else {
                    const row = JSON.parse(JSON.stringify(result));
                    return resolve(row); 
                }
            })
        })

    }

    static findAll() {
        const sql = "SELECT * FROM usuario";
        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, result) => {
                if (erro) {
                    return reject('Não foi possível localizar');
                } else {
                    const row = JSON.parse(JSON.stringify(result))
                    return resolve(row);
                }
            });
        });
    }

}
export default UsuarioRepository; 