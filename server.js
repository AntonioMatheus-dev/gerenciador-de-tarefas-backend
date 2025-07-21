import "dotenv/config"
import { fastify } from "fastify"
import { DatabasePostgres } from "./src/database/database-postgres.js"

const PORT = process.env.PORT
const server = fastify()

const database = new DatabasePostgres()

server.get("/tarefas/:id", async (request, reply) => {
    const idtarefa = request.params.id

    const tarefa = await database.list(idtarefa)
    
    return reply.status(200).send(tarefa)
})

server.get("/tarefas", async (request, reply) => {
    
    const tarefas = await database.list()

    return reply.status(200).send(tarefas)
    
})

server.post("/tarefas", async (request, reply) => {
    const { titulo, descricao } = request.body

    try {
        await database.create({
        titulo,
        descricao,
        status: "pendente"
        })
        
        return reply.status(201).send()
    } catch (error) {
        console.log(`Erro ao criar tarefa ${error}`); 
        return error
    }
})

server.patch("/tarefas/alterar-status/:id", async (request, reply) => {
    const idtarefa = request.params.id

    try {
        await database.updateStatus(idtarefa);
        console.log("Status da tarefa alterado com sucesso");
        
        return reply.status(204).send()
    } catch (error) {
        console.log(error);
        return error
    }

})

server.delete("/tarefas/:id", async (request, reply) => {
    const idtarefa = request.params.id

    try {
       await database.delete(idtarefa) 
    } catch(error) {
        console.log(error);
        
        return error
    }
    
}) 

server.listen({
    port: PORT ?? 3333,
}, () => {
    console.log(`Servidor rodando na porta ${PORT ?? 3333}`);
    
})