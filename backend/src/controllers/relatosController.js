import * as relatosModel from "../models/relatosModel.js";

const camposObrigatorios = ["titulo", "resumo", "conteudo", "pessoa", "local", "periodo", "categoria", "fontes"];

function normalizarDados(body, parcial = false) {
  const dados = {};
  for (const campo of camposObrigatorios) {
    if (body[campo] !== undefined) dados[campo] = String(body[campo]).trim();
  }
  if (!parcial && camposObrigatorios.some((campo) => !dados[campo])) return null;
  if (Object.values(dados).some((valor) => !valor)) return null;
  return dados;
}

export async function listarRelatos(req, res) {
  const relatos = await relatosModel.listarRelatos({
    busca: req.query.busca?.trim(),
    categoria: req.query.categoria?.trim()
  });
  res.json(relatos);
}

export async function buscarRelato(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "ID inválido." });

  const relato = await relatosModel.buscarRelatoPorId(id);
  if (!relato) return res.status(404).json({ message: "Relato não encontrado." });
  res.json(relato);
}

export async function cadastrarRelato(req, res) {
  const dados = normalizarDados(req.body);
  if (!dados) return res.status(400).json({ message: "Informe todos os campos obrigatórios." });

  const relato = await relatosModel.criarRelato(dados);
  res.status(201).json(relato);
}

export async function atualizarRelato(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "ID inválido." });
  const dados = normalizarDados(req.body, true);
  if (!dados || !Object.keys(dados).length) return res.status(400).json({ message: "Envie ao menos um campo válido." });

  const existente = await relatosModel.buscarRelatoPorId(id);
  if (!existente) return res.status(404).json({ message: "Relato não encontrado." });
  res.json(await relatosModel.editarRelato(id, dados));
}

export async function removerRelato(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "ID inválido." });
  const existente = await relatosModel.buscarRelatoPorId(id);
  if (!existente) return res.status(404).json({ message: "Relato não encontrado." });
  await relatosModel.excluirRelato(id);
  res.json({ message: "Relato removido com sucesso." });
}
