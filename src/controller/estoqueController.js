import estoqueRepository from "../repositories/EstoqueRepository.js";

// GET ALL
export async function getAllEstoque(req, res) {
  try {
    const itens = await estoqueRepository.listAllEstoque();
    return res.status(200).json(itens);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "GET ALL ESTOQUE", error: error.message });
  }
}

// GET BY ID
export async function getByIdEstoque(req, res) {
  try {
    const { id } = req.params;
    const item = await estoqueRepository.listByIdEstoque(id);
    return res.status(200).json(item);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "GET ESTOQUE BY ID", error: error.message });
  }
}

// GET BY PRODUTO
export async function getEstoqueByProduct(req, res) {
  try {
    const { produto_id } = req.params;
    const itens = await estoqueRepository.listByProduct(produto_id);
    return res.status(200).json(itens);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "GET ESTOQUE BY PRODUCT", error: error.message });
  }
}

// CREATE
export async function createEstoque(req, res) {
  try {
    const { produto_id, quantidade, local_armazenado, atualizado_por } = req.body;

    await estoqueRepository.createEstoque(
      produto_id,
      quantidade,
      local_armazenado,
      atualizado_por
    );

    return res.status(201).json("Item de estoque criado com sucesso!");
  } catch (error) {
    return res
      .status(400)
      .json({ message: "CREATE ESTOQUE", error: error.message });
  }
}

// UPDATE QUANTIDADE
export async function updateQuantidade(req, res) {
  try {
    const { id } = req.params;
    const { quantidade, atualizado_por } = req.body;

    await estoqueRepository.updateQuantidadeEstoque(id, quantidade, atualizado_por);

    return res.status(200).json("Quantidade atualizada com sucesso!");
  } catch (error) {
    return res
      .status(400)
      .json({ message: "UPDATE QUANTIDADE", error: error.message });
  }
}

// UPDATE LOCAL
export async function updateLocal(req, res) {
  try {
    const { id } = req.params;
    const { local_armazenado, atualizado_por } = req.body;

    await estoqueRepository.updateLocalEstoque(id, local_armazenado, atualizado_por);

    return res.status(200).json("Local atualizado com sucesso!");
  } catch (error) {
    return res
      .status(400)
      .json({ message: "UPDATE LOCAL", error: error.message });
  }
}

// DELETE
export async function deleteEstoque(req, res) {
  try {
    const { id } = req.params;

    await estoqueRepository.deleteEstoque(id);

    return res.status(200).json("Item de estoque deletado!");
  } catch (error) {
    return res
      .status(400)
      .json({ message: "DELETE ESTOQUE", error: error.message });
  }
}
