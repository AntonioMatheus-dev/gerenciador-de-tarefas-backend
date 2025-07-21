import { sql } from "../config/db-conection.js";

sql`create table tarefas (
    id SERIAL PRIMARY KEY NOT NULL,
    titulo TEXT NOT NUlL,
    descricao TEXT,
    status TEXT NOT NULL
);`.then(() => {
    console.log("Tabela criada");
    
}).catch(() => {
    console.log("Erro ao criar tabela");
})
