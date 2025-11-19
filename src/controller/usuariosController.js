import UsuarioRepository from "../repository/UsuariosRepository.js"

const usuarioRepository = new UsuarioRepository();

export async function getAllUsuarios(req, res) {
   try {
    const usuarios = await usuarioRepository.listAllUsuarios();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "GET ALL USUARIOS", error: error.message });
  }
}

export async function getByIdUsuarios(req, res) {
  try {
    const { id } = req.params;
    const usuario = await usuarioRepository.listByIdUsuarios(id);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({ message: "GET BY ID", error: error.message });
  }
}

export async function createUsuarios(req, res) {
  try {
    const { nome, email, tipo, senha } = req.body;
    await usuarioRepository.createUsuarios(nome, email, tipo, senha);
    return res.status(201).json("Usuario cadastrado com sucesso");
  } catch (error) {
    return res.status(400).json({ message: "CREATE", error: error.message });
  }
}
//Cliente
export async function updateUsuarios(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, tipo, senha } = req.body;
    await usuarioRepository.updateUsuarios(id, { nome, email, tipo, senha });
    return res.status(200).json("Usuario atualizada");
  } catch (error) {
    return res
      .status(400)
      .json({ message: "UPDATE USUARIO", error: error.message });
  }
}

export async function deleteUsuarios(req, res) {
  try {
    const { id } = req.params;
    await usuarioRepository.deleteUsuarios(id);
    return res.status(200).json("Usuario deletado");
  } catch (error) {
    return res
      .status(400)
      .json({ message: "DELETE USUARIO", error: error.message });
  }
}