const db = require("../models/ConnectDatabase");

class PratoRepository {
    async getAllPratos() {
        const rows = await db.query(`
            SELECT p.id, p.nome, p.descricao, p.preco, t.nome AS tipo, p.imagem
            FROM pratos p
            INNER JOIN tipos t ON p.tipo = t.idTipo
            `);
        return rows;
    }

    async getTipo(){
        const rows = await db.query(`
            SELECT idTipo, nome from tipos
            `);
            return rows;
    }

    async getPratoByNome(nome) {
        const [row] = await db.query(`
            SELECT p.id, p.nome, p.descricao, p.preco, t.nome AS tipo, p.imagem
            FROM pratos p
            INNER JOIN tipos t ON p.tipo = t.idTipo
            WHERE p.nome = ?
            `,
            [nome]
        );
        return row;     
    }

    async create({ nome, descricao, preco, tipo, imagem}) {
        const result = await db.query(`
            INSERT INTO pratos (nome, descricao, preco, tipo, imagem) VALUES (?, ?, ?, ?, ?)   
            `,
            [nome, descricao, preco, tipo, imagem]
        );
    }

    async update() {

    }

    async delete(nome) {
        const deletePrato = await db.query(`
        DELETE FROM pratos WHERE nome = ?;
        `,
        [nome]
        );
        return deletePrato;
    }
}

module.exports = new PratoRepository();