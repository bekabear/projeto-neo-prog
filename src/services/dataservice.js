import Path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename)

export class DataService {
    constructor() {
        this.FILE_PATH = Path.resolve(__dirname, '..', 'database', 'data.json');
        this.data = this.carregarDados();
    }

    carregarDados() {
        if (!fs.existsSync(this.FILE_PATH)) {
            fs.writeFileSync(this.FILE_PATH, JSON.stringify({
                estoque: [],
                produtos: [],
                usuarios: [],
            },null,2))
        }
        return JSON.parse(fs.readFileSync(this.FILE_PATH, 'utf-8'))
    }

    salvarDados(dados) {
        fs.writeFileSync(this.FILE_PATH, JSON.stringify(dados, null, 2))
    }
}