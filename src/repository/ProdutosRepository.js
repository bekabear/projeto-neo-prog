import { conn } from "../database/config.js";
import crypto from "node:crypto";

class ProdutosRepository {

  // CREATE
  async createProducts(nome, tipo, descricao, criado_em, data_vencimento) {
    try {
      const id = crypto.randomUUID();

      await conn("produtos").insert({
        id,
        nome,
        tipo,
        descricao,
        criado_em: criado_em || new Date(),
        data_vencimento
      });

      return id;
    } catch (error) {
      throw new Error("Erro ao criar produto: " + error.message);
    }
  }

  // LIST ALL
  async listAll() {
    return await conn("produtos").orderBy("criado_em", "desc");
  }

  // LIST BY ID
  async listById(id) {
    try {
      const produto = await conn("produtos").where({ id }).first();
      if (!produto) throw new Error("Produto não encontrado");
      return produto;
    } catch (error) {
      throw new Error("Erro ao buscar produto: " + error.message);
    }
  }

  // LIST BY TYPE
  async listByType(tipo) {
    try {
      return await conn("produtos").where({ tipo }).orderBy("criado_em", "desc");
    } catch (error) {
      throw new Error("Erro ao buscar por tipo: " + error.message);
    }
  }

  // UPDATE
  async updateProducts(id, data) {
    try {
      const atualizado = await conn("produtos").where({ id }).update(data);
      if (!atualizado) throw new Error("Produto não encontrado");
      return await this.listById(id);
    } catch (error) {
      throw new Error("Erro ao atualizar produto: " + error.message);
    }
  }

  // DELETE
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

export default ProdutosRepository;
