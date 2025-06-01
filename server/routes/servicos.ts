import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {
    const prisma = new PrismaClient();
    const servicos = await prisma.servico.findMany({
        include: {
            categoria: true,
            usuario:true,
            avaliacoes: {
                include: {
                    usuario: true
                },
            },
        },
    });
    return {servicos}
});
