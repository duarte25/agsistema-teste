import idValidate from "../utils/idValidate.js";
import Usuario from "../models/Usuario.js";
import messages, { sendResponse } from "../utils/mensagens.js";
import { paginateOptions } from "./common.js";
import bcrypt from "bcryptjs";

export default class UsuarioController {

    static async CriarUsuario(req, res) {
        try {

            const dados = { ...req.body, senha: bcrypt.hashSync(req.body.senha, 10) };

            const usuario = new Usuario(dados);

            const saveUser = await usuario.save();
            saveUser.senha = undefined;

            return res.status(201).json({
                data: saveUser,
                error: false,
                code: 201,
                message: messages.httpCodes[201],
                errors: []
            });

        } catch (err) {
            return res.status(500).json({
                data: [],
                error: true,
                code: 500,
                message: messages.httpCodes[500],
                errors: err.message
            });
        }
    }

    static async listarUsuario(req, res) {

        const pagina = parseInt(req.query.pagina) || 1;
        const { limite, nome, cpf, email } = req.query;
        const filtros = {};

        let sort = { _id: -1 };

        if (nome) {
            filtros.$text = {
                $search: nome,
                $caseSensitive: false,
                $diacriticSensitive: false,
                $language: "pt"
            };

            sort = { nome: 1, _id: -1 }; // Se não é único precisa ter um segundo campo único para ordenar
        }

        if (cpf) filtros.cpf = cpf;

        if (email) filtros.email = email;

        const usuario = await Usuario.paginate(
            filtros,
            {
                ...paginateOptions, ...{
                    sort: sort,
                    page: pagina,
                    limit: limite,
                    lean: true
                }
            }
        );

        return sendResponse(res, 200, { data: usuario });
    }

    static async listarUsuarioID(req, res) {

        const { id } = req.params;

        if (!idValidate(id)) {
            return res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: [messages.error.invalidID] });
        }

        const findUser = await Usuario.findById(id);

        if (!findUser) {
            return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: [messages.validationGeneric.mascCamp("Usuário")] });
        }

        return sendResponse(res, 200, { data: findUser });
    }

    static async alterarUsuario(req, res) {
        // Pega do validador
        const usuario = req.validateResult.usuario;
        const { senha } = req.body;

        // Só atualiza os campos que foram enviados
        for (let key in req.body) {
            usuario[key] = req.body[key];
        }

        if (senha) {
            usuario.senha = bcrypt.hashSync(senha, 10);
        }

        await Usuario.findByIdAndUpdate(usuario);

        return sendResponse(res, 200, { data: usuario });
    }

    static async deletarUsuario(req, res) {

        const { id } = req.params;

        if (!idValidate(id)) {
            return res.status(422).json({ data: [], error: true, code: 422, message: messages.httpCodes[422], errors: [messages.error.invalidID] });
        }

        const findUser = await Usuario.findByIdAndDelete(id);

        if (!findUser) {
            return res.status(404).json({ data: [], error: true, code: 404, message: messages.httpCodes[404], errors: [messages.validationGeneric.mascCamp("Usuário")] });
        }

        return sendResponse(res, 200, {});
    }
}
