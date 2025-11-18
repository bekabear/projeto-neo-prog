import { conn } from "../database/config.js";
import crypto from "node:crypto";

class ProdutosRepository {

  async create({ nome, tipo, descricao, data_vencimento }) {
    try {
      if (!nome) throw new Error("Nome do produto é obrigatório");

      const id = crypto.randomUUID();

      await conn("produtos").insert({
        id,
        nome,
        tipo,
        descricao,
        data_vencimento,
        criado_em: new Date()
      });

      return await this.listById(id);

    } catch (error) {
      throw new Error("Erro ao criar produto: " + error.message);
    }
  }

  async listProducts() {
    return await conn("produtos").orderBy("criado_em", "desc");
  }

  async listById(id) {
    try {
      const produto = await conn("produtos").where({ id }).first();

      if (!produto) throw new Error("Produto não encontrado");

      return produto;

    } catch (error) {
      throw new Error("Erro ao buscar produto: " + error.message);
    }
  }


  async update(id, data) {
    try {
      const atualizado = await conn("produtos").where({ id }).update(data);

      if (!atualizado) throw new Error("Produto não encontrado para atualizar");

      return await this.listById(id);

    } catch (error) {
      throw new Error("Erro ao atualizar produto: " + error.message);
    }
  }

  async delete(id) {
    try {
      const deletado = await conn("produtos").where({ id }).del();

      if (!deletado) throw new Error("Produto não encontrado");

      return { message: "Produto deletado com sucesso" };

    } catch (error) {
      throw new Error("Erro ao deletar produto: " + error.message);
    }
  }
}

export default new ProdutosRepository();