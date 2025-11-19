import { conn } from "../database/config.js";
import crypto from "node:crypto";

class EstoqueRepository {

  // Criar estoque
  async createEstoque(produtos_id, quantidade, local_armazenado, atualizado_por, turnos) {
    try {
      const id = crypto.randomUUID();

      await conn("estoque").insert({
        id,
        produtos_id,
        quantidade,
        local_armazenado,
        atualizado_por,
        turnos,
        atualizado_em: new Date()
      });

      return await this.listByIdEstoque(id);

    } catch (error) {
      throw new Error("Erro ao criar estoque: " + error.message);
    }
  }

  // Listar tudo
  async listAllEstoque() {
    try {
      return await conn("estoque").orderBy("atualizado_em", "desc");
    } catch (error) {
      throw new Error("Erro ao listar estoque: " + error.message);
    }
  }

  // Buscar por ID
  async listByIdEstoque(id) {
    try {
      const item = await conn("estoque").where({ id }).first();

      if (!item) {
        throw new Error("Item de estoque não encontrado");
      }

      return item;

    } catch (error) {
      throw new Error("Erro ao buscar por ID: " + error.message);
    }
  }

  // Buscar por produto
  async listByProduct(produtos_id) {
    try {
      return await conn("estoque").where({ produtos_id });
    } catch (error) {
      throw new Error("Erro ao buscar pelo ID do produto: " + error.message);
    }
  }

  // Atualizar quantidade
  async updateQuantidadeEstoque(id, quantidade, atualizado_por) {
    try {
      const updated = await conn("estoque")
        .where({ id })
        .update({
          quantidade,
          atualizado_por,
          atualizado_em: new Date()
        });

      if (!updated) {
        throw new Error("Item não encontrado para atualizar quantidade");
      }

      return await this.listByIdEstoque(id);

    } catch (error) {
      throw new Error("Erro ao atualizar quantidade: " + error.message);
    }
  }

  // Atualizar local de armazenamento
  async updateLocalEstoque(id, local_armazenado, atualizado_por) {
    try {
      const updated = await conn("estoque")
        .where({ id })
        .update({
          local_armazenado,
          atualizado_por,
          atualizado_em: new Date()
        });

      if (!updated) {
        throw new Error("Item não encontrado para atualizar local");
      }

      return await this.listByIdEstoque(id);

    } catch (error) {
      throw new Error("Erro ao atualizar local: " + error.message);
    }
  }

  // Deletar item
  async deleteEstoque(id) {
    try {
      const deleted = await conn("estoque").where({ id }).del();

      if (!deleted) {
        throw new Error("Item não encontrado para deletar");
      }

      return { message: "Item deletado com sucesso" };

    } catch (error) {
      throw new Error("Erro ao deletar item: " + error.message);
    }
  }

}

export default EstoqueRepository;
