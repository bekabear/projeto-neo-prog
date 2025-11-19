import { conn } from "../database/config.js";

class EstoqueRepository {
  
  async createEstoque(produto_id, quantidade, local_armazenado, atualizado_por) {
    const sql = `
      INSERT INTO estoque (produto_id, quantidade, local_armazenado, atualizado_por)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await conn.execute(sql, [
      produto_id,
      quantidade,
      local_armazenado,
      atualizado_por
    ]);

    return { id: result.insertId, produto_id, quantidade, local_armazenado, atualizado_por };
  }

  async listAllEstoque() {
    const [rows] = await conn.execute("SELECT * FROM estoque");
    return rows;
  }

  async listByIdEstoque(id) {
    const [rows] = await conn.execute("SELECT * FROM estoque WHERE id = ?", [id]);
    return rows[0];
  }

  async listByProduct(produto_id) {
    const [rows] = await conn.execute("SELECT * FROM estoque WHERE produto_id = ?", [produto_id]);
    return rows;
  }

  async updateQuantidadeEstoque(id, quantidade, atualizado_por) {
    const sql = `
      UPDATE estoque 
      SET quantidade = ?, atualizado_por = ?, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await conn.execute(sql, [quantidade, atualizado_por, id]);
  }

  async updateLocalEstoque(id, local_armazenado, atualizado_por) {
    const sql = `
      UPDATE estoque 
      SET local_armazenado = ?, atualizado_por = ?, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await conn.execute(sql, [local_armazenado, atualizado_por, id]);
  }

  async deleteEstoque(id) {
    await conn.execute("DELETE FROM estoque WHERE id = ?", [id]);
  }
}

export default EstoqueRepository;
