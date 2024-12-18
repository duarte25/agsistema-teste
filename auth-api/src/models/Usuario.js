import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

export const usuarioPopulateSelect = { nome: 1, email: 1,  campus: 1 };
const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        minlength: 3,
        maxlength: 200,
        required: true
    },
    cpf: {
        type: String,
        minlength: 11,
        maxlength: 11,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
        select: false,
        minlength: 8
    }
},
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
        versionKey: "_version"
    }
);

usuarioSchema.index({nome: "text"}, {default_language: "pt"});
// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
usuarioSchema.plugin(paginate);

const usuario = mongoose.model("usuarios", usuarioSchema);

export default usuario;
