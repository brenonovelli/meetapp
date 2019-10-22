import multer from 'multer';
import crypto from 'crypto'; // Lib do Node
import { extname, resolve } from 'path'; // Lib do Node

// Exportando um objeto de configuração
export default {
  // storage: como o multer vai salvar o arquivo
  storage: multer.diskStorage({
    // Onde ficará a imagem enviada
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // Como ficará o nome da imagem
    filename: (req, file, cb) => {
      // req vem tudo da requisição
      // file vem os dados do arquivos
      // cb é a funçao que precisa executar com o nome do arquivo ou com o erro
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
