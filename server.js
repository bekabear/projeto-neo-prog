import express from "express";
import { DataService } from "./src/services/dataservice.js";
import { createProducts, deleteProducts, getAllProducts, getByIdProducts, getByTypeProducts, updateProducts, } from "./src/controller/podutosController.js";
import { createEstoque, deleteEstoque, getAllEstoque, getByIdEstoque, getEstoqueByProduct, updateLocal, updateQuantidade } from "./src/controller/estoqueController.js";
import { createUsuarios, getAllUsuarios, getByIdUsuarios, updateUsuarios, deleteUsuarios} from "./src/controller/usuariosController.js";

const dataService = new DataService();

dataService.carregarDados();

const app = express();

const PORT = 3000;

app.use(express.json());

// Rota de teste 
app.get("/", (req, res) => {
    res.send("Seja bem vindo 😊 ao Banco de dados criado por Matheus, Rebeca, Eliel")
})

//Rotas da entidade estoque 
app.get("/estoque", (req, res) => getAllEstoque(req, res));

app.get("/estoque/:id", (req, res) => getByIdEstoque(req, res));

app.get("/estoque/produto/:produtos_id", (req, res) => getEstoqueByProduct(req, res));

app.post("/estoque", (req, res) => createEstoque(req, res));

app.patch("/estoque/local/:id", (req, res) => updateLocal(req, res))

app.patch("/estoque/quantidade/:id", (req, res) => updateQuantidade(req, res));

app.delete("/estoque/:id", (req, res) => deleteEstoque(req, res));

//Rotas da entidade produtos
app.get("/produtos", (req, res) => getAllProducts(req, res));

app.get("/produtos/:id", (req, res) => getByIdProducts(req, res));

app.get("/produtos/tipo/:tipo", (req, res) => getByTypeProducts(req, res));

app.post("/produtos", (req, res) => createProducts(req, res));

app.put("/produtos/update/:id", (req, res) => updateProducts(req, res));

app.delete("/produtos/:id", (req, res) => deleteProducts(req, res));

//Rotas da entidade Usuário
app.get("/usuarios", (req, res) => getAllUsuarios(req, res));

app.get("/usuarios/:id", (req, res) => getByIdUsuarios(req, res));

app.post("/usuarios", (req, res) => createUsuarios(req, res));

app.put("/usuarios/updateUsuario/:id", (req, res) => updateUsuarios(req, res));

app.delete("/usuarios/:id", (req, res) => deleteUsuarios(req, res));


app.listen(PORT, () => {
    console.log((`Servidor rodando em http://localhost:${PORT}`));
    
})