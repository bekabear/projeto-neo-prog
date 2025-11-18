import { conn } from "../database/config.js";
import crypto from "node:crypto";

class UsuarioRepository {
    async createUsuarios(nome, email, tipo) {
        try {
            const usuario = conn("usuarios").insert({
                id: crypto.randomUUID(),
                nome,
                email,
                tipo,
            });
            return usuario;
        } catch (error){
            throw new Error(error)
        }
    }

    async listAllUsuarios() {
        return await conn("usuarios");
    }

    async listByIdUsuarios(id) {
        try {
            const usuario = (await conn("usuarios").where({ id })).first();
            if (!usuario) {
                throw new Error("Usuario não econtrado");
            }
            return usuario
        } catch (error) {
            throw new Error(error)
        }
    }    

    async updateUsuarios(id, dados){
        try {
            const [usuario] = await conn("usuarios").where({ id });
            if (!usuario) {
                throw new Error("Usuario não encontrado");
            }
            const updateUsuarios = {
                nome: dados.nome ?? usuario.nome, 
                email: dados.email ?? usuario.email,
                tipo: dados.tipo ?? usuario.tipo,
            }
            return await conn("clientes").where({ id }).update(updateUsuarios);
        } catch (error) {
            throw Error(error);
        }
    }
    
     async delete(id) {
    try {
      const usuario = await conn("usuarios").where({ id });
      if (!usuario) {
        throw new Error("Usuario não encontrado");
      }
      return await conn("usuarios").where({ id }).delete();
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UsuarioRepository;