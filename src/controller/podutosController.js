import ProdutosRepository from "../repository/ProdutosRepository.js";
const produtosRepository = new ProdutosRepository();

// GET ALL
export async function getAllProducts(req, res) {
  try {
    const produtos = await produtosRepository.listAll();
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(400).json({ message: "GET ALL", error: error.message });
  }
}

export async function getByIdProducts(req, res) {
  try {
    const { id } = req.params;
    const produto = await produtosRepository.listById(id);
    return res.status(200).json(produto);
  } catch (error) {
    return res.status(400).json({ message: "GET BY ID", error: error.message });
  }
}

export async function getByTypeProducts(req, res) {
  try {
    const { tipo } = req.params;
    const produtos = await produtosRepository.listByType(tipo);
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(400).json({ message: "GET BY TYPE", error: error.message });
  }
}


export async function createProducts(req, res) {
  try {
    const { nome, tipo, descricao, criado_em, data_vencimento } = req.body;

    await produtosRepository.createProducts(
      nome,
      tipo,
      descricao,
      criado_em,
      data_vencimento
    );

    return res.status(201).json("Produto cadastrado com sucesso!");
  } catch (error) {
    return res.status(400).json({ message: "CREATE", error: error.message });
  }
}


export async function updateProducts(req, res) {
  try {
    const { id } = req.params;
    const { nome, tipo, descricao, criado_em, data_vencimento } = req.body;

    await produtosRepository.updateProducts(id, {
      nome,
      tipo,
      descricao,
      criado_em,
      data_vencimento,
    });

    return res.status(200).json("Produto atualizado!");
  } catch (error) {
    return res.status(400).json({ message: "UPDATE", error: error.message });
  }
}

// DELETE
export async function deleteProducts(req, res) {
  try {
    const { id } = req.params;

    await produtosRepository.delete(id);

    return res.status(200).json("Produto deletado!");
  } catch (error) {
    return res.status(400).json({ message: "DELETE", error: error.message });
  }

 function formatDateMysql(date) {
  if (!date) return null;
  return date.replace('T', ' ').replace('Z', '').split('.')[0];
}
}
