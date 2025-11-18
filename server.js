import express from "express";
import { DataService } from "./src/services/dataservice.js";

import { getAllProducts } from "./src/controller/podutosController.js";

const dataService = new DataService();

dataService.carregarDados();

const app = express();

const PORT = 3000;

app.use(express.json());

// Rota de teste 
app.get("/", (req, res) => {
    res.send("Seja bem vindo 😊")
})

//Rotas da entidade estoque 
app.post("/reservas", (req, res) => create)












//Rotas da entidade produtos 
app.get("/produtos", (req, res) => getAllProducts(req, res));

app.get("/produtos/:id", (req, res) => getByIdProducts(req, res));

app.get("")








//Rotas da entidade Usuário
app.get("/Usuario", (req, res) => getAllU)
app.listen(PORT, () => {
    console.log((`Servidor rodando em http://localhost:${PORT}`));
    
})