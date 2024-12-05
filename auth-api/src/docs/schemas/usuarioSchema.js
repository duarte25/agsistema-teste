const usuarioSchemas = {
    Usuario: {
        type: "object",
        properties: {
            _id: {
                type: "string",
                description: "ID do usuário"
            },
            nome: {
                type: "string",
                description: "Nome de Exibição do usuário"
            },
            email: {
                type: "string",
                description: "Email do usuário"
            },
            cpf: {
                type: "string",
                description: "CPF do usuário"
            },
            created_at: {
                type: "string",
                description: "Data que foi criado"
            },
            updated_at: {
                type: "string",
                description: "Data que foi atualizado"
            }
        },
        example: {
            "_id": "66674b51d84e8bbf8644b973",
            "nome": "Administração Frotas Teste",
            "email": "admin@example.com",
            "cpf": "36007456030",
            "created_at": "2024-06-10T18:52:01.209Z",
            "updated_at": "2024-06-10T18:52:01.223Z"
        }   
    },
    UsuarioPOST: {
        type: "object",
        properties: {
            nome: {
                type: "string",
                description: "Nome de exibição do usuário",
            },
            email: {
                type: "string",
                description: "Email do usuário",
            },
            senha: {
                type: "string",
                description: "Senha do usuário (Opcional)", 
            },
            cpf: {
                type: "string",
                description: "CPF do usuário",
            }
        },
        example: {
            "nome": "Camila Moreira",
            "email": "camila46@example.com",
            "senha": "ABCDabcd@1234",
            "cpf": "53523311560"
        }
    },
    UsuarioPATCH: {
        type: "object",
        properties: {
            nome: {
                type: "string",
                description: "Nome de exibição do usuário",
            },
            email: {
                type: "string",
                description: "Email do usuário",
            },
            senha: {
                type: "string",
                description: "Senha do usuário", 
            },
            cpf: {
                type: "string",
                description: "CPF do usuário",
            }
        },
        example: {
            "nome": "Camila Moreira",
            "email": "camila46@example.com",
            "senha": "ABCDabcd@1234",
            "cpf": "53523311560",
        }
    }
};

export default usuarioSchemas;
