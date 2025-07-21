import { sql } from "../config/db-conection.js";

export class DatabasePostgres {

    async list(id = "") {
        if (id) {
            const tarefa = await sql`select * from tarefas where id = ${id}`
            return tarefa[0]
        } else {
            const tarefas = await sql`select * from tarefas`
            return tarefas
        }
    }

    async create(tarefa) {
        const { titulo, descricao, status } = tarefa

        await sql`insert into tarefas (titulo, descricao, status) values (${titulo}, ${descricao}, ${status})`
    }

    async updateStatus(id) {
        let tarefa = await sql`select * from tarefas where id = ${id};`
        tarefa = tarefa[0]

        await sql`update tarefas set status = ${tarefa.status === 'pendente' ? 'concluida' : 'pendente'} where id = ${id};`
    }

    async delete(id) {
        await sql`delete from tarefas where id = ${id};`
    }
}