import bcrypt from "bcrypt";
import * as usuariosModel from "../models/usuariosModel.js";

export async function cadastrarUsuario(req, res) {
  const nome = req.body.nome?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const senha = req.body.senha;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios." });
  }

  if (nome.length > 100 || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Informe um nome e um e-mail válidos." });
  }

  if (typeof senha !== "string" || senha.length < 8) {
    return res.status(400).json({ message: "A senha deve ter pelo menos 8 caracteres." });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  try {
    const novoUsuario = await usuariosModel.cadastrarUsuario({ nome, email, senhaHash });

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso.",
      usuario: novoUsuario
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Este e-mail já está cadastrado." });
    }
    throw error;
  }
}

export async function login(req, res) {
  const email = req.body.email?.trim().toLowerCase();
  const { senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
  }

  const usuario = await usuariosModel.buscarPorEmail(email);

  if (!usuario) {
    return res.status(401).json({
      message: "Email ou senha inválidos"
    });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

  if (!senhaCorreta) {
    return res.status(401).json({
      message: "Email ou senha inválidos"
    });
  }

  res.json({
    message: "Login efetuado com sucesso.",
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      created: usuario.created
    }
  });
}
