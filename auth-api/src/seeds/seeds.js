import db from "../config/db_config.js";
import usuarioSeed from "./usuarioSeed.js";

let quantidade = parseInt(50);

// USUARIO
await db.collection("usuarios").deleteMany();
await usuarioSeed(quantidade);

db.close();
