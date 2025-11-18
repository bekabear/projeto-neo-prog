import EstoqueRepository from "../database/config.js";

const estoqueRepository = new EstoqueRepository();

class EstoqueRepository {

  // Criar um registro de estoque
  async createEstoque(req, res) {
    try {
      const { produto_id, quantidade, local_armazenado, atualizado_por } = req.body;

      if (!produto_id || !quantidade || !local_armazenado || !atualizado_por) {
        return res.status(400).json({ error: "Campos obrigatórios faltando" });
      }

      const novoEstoque = await estoqueRepository.create({
        produto_id,
        quantidade,
        local_armazenado,
        atualizado_por
      });

      return res.status(201).json(novoEstoque);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Listar todo o estoque
  async listAllEstoque(req, res) {
    try {
      const itens = await estoqueRepository.list();
      return res.status(200).json(itens);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // 🔹 Buscar estoque por ID
  async listByIdEstoque(req, res) {
    try {
      const { id } = req.params;

      const item = await estoqueRepository.listById(id);

      if (!item) {
        return res.status(404).json({ error: "Item não encontrado" });
      }

      return res.status(200).json(item);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // 🔹 Atualizar quantidade e local do estoque
  async updateEstoque(req, res) {
    try {
      const { id } = req.params;
      const { quantidade, local_armazenado, atualizado_por } = req.body;

      const atualizado = await estoqueRepo.update(id, {
        quantidade,
        local_armazenado,
        atualizado_por
      });

      if (!atualizado) {
        return res.status(404).json({ error: "Item não encontrado" });
      }

      return res.status(200).json({ message: "Estoque atualizado com sucesso" });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // 🔹 Remover item de estoque
  async deleteEstoque(req, res) {
    try {
      const { id } = req.params;

      const result = await estoqueRepository.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Item não encontrado" });
      }

      return res.status(200).json({ message: "Item removido do estoque" });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default EstoqueRepository;