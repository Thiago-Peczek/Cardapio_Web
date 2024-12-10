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

    async create({ nome, descricao, preco, tipo, imagem }) {
        const result = await db.query(
            "INSERT INTO pratos (nome, descricao, preco, tipo, imagem) VALUES (?, ?, ?, ?, ?)",
            [nome, descricao, preco, tipo, imagem]
        );
    
        // Retornando o prato criado, assumindo que o ID do prato é gerado automaticamente
        const pratoCriado = {
            id: result.insertId, // ID gerado pelo banco de dados
            nome,
            descricao,
            preco,
            tipo,
            imagem,
        };
    
        return pratoCriado;
    }

    async updatePrato(nomeAntigo, nome, descricao, preco, tipo, imagem) {
        try {
            const result = await db.query(`
                UPDATE pratos
                SET nome = ?, descricao = ?, preco = ?, tipo = ?, imagem = ?
                WHERE nome = ?`,
                [nome, descricao, preco, tipo, imagem, nomeAntigo]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao atualizar prato:", error);
            throw error;
        }
    }
    

    async delete(nome) {
        const prato = await db.query(`SELECT id FROM pratos WHERE nome = ?`, [nome]);
        if (prato.length === 0) {
            throw new Error("Prato não encontrado");
        }
    
        const pratoId = prato[0].id;
        await db.query(`DELETE FROM pratos WHERE id = ?`, [pratoId]);
        return pratoId;
    }
}

module.exports = new PratoRepository();