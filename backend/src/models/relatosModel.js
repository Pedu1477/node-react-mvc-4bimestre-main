import prisma from "../config/prisma.js";

export function listarRelatos({ busca, categoria } = {}) {
  return prisma.relato.findMany({
    where: {
      ...(categoria ? { categoria } : {}),
      ...(busca
        ? {
            OR: [
              { titulo: { contains: busca } },
              { pessoa: { contains: busca } },
              { resumo: { contains: busca } },
              { local: { contains: busca } }
            ]
          }
        : {})
    },
    orderBy: { createdAt: "desc" }
  });
}

export function buscarRelatoPorId(id) {
  return prisma.relato.findUnique({ where: { id } });
}

export function criarRelato(dados) {
  return prisma.relato.create({ data: dados });
}

export function editarRelato(id, dados) {
  return prisma.relato.update({ where: { id }, data: dados });
}

export function excluirRelato(id) {
  return prisma.relato.delete({ where: { id } });
}
