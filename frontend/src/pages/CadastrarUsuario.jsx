import { useState } from "react";

export default function CadastrarUsuario({ onBack }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function cadastrar(evento) {
    evento.preventDefault();
    setMensagem("");
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await fetch("/usuarios/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });
      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(dados.message || "Não foi possível criar sua conta. Tente novamente.");
      }

      setMensagem(`Conta criada com sucesso${dados.usuario?.nome ? `, ${dados.usuario.nome}` : ""}!`);
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
    } catch (erroRequisicao) {
      setErro(erroRequisicao instanceof TypeError
        ? "Não foi possível conectar à API. Verifique se o backend está ligado e tente novamente."
        : erroRequisicao.message || "Não foi possível criar sua conta. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="account-page">
      <section className="account-panel">
        <button className="account-back" type="button" onClick={onBack}>← Voltar ao acervo</button>
        <span className="eyebrow">ARQUIVO SOMBRIO • ACESSO À COMUNIDADE</span>
        <h1>Criar sua <em>conta.</em></h1>
        <p className="account-intro">Cadastre-se para acompanhar o acervo e receber novidades editoriais.</p>

        <form onSubmit={cadastrar} className="account-form">
          <label htmlFor="nome">Nome completo
            <input id="nome" name="nome" type="text" value={nome} onChange={(evento) => setNome(evento.target.value)} placeholder="Como podemos chamar você?" maxLength={100} autoComplete="name" required />
          </label>
          <label htmlFor="email">E-mail
            <input id="email" name="email" type="email" value={email} onChange={(evento) => setEmail(evento.target.value)} placeholder="seu@email.com" autoComplete="email" required />
          </label>
          <label htmlFor="senha">Senha <span className="field-hint">mínimo de 8 caracteres</span>
            <input id="senha" name="senha" type="password" value={senha} onChange={(evento) => setSenha(evento.target.value)} placeholder="Crie uma senha" minLength={8} autoComplete="new-password" required />
          </label>
          <label htmlFor="confirmarSenha">Confirmar senha
            <input id="confirmarSenha" name="confirmarSenha" type="password" value={confirmarSenha} onChange={(evento) => setConfirmarSenha(evento.target.value)} placeholder="Digite a senha novamente" minLength={8} autoComplete="new-password" required />
          </label>
          <button className="account-submit" type="submit" disabled={enviando}>
            {enviando ? "Criando conta…" : "Criar conta"}<span aria-hidden="true">↗</span>
          </button>
        </form>

        {mensagem && <p role="status" className="account-message success-message">{mensagem}</p>}
        {erro && <p role="alert" className="account-message error-message">{erro}</p>}
        <p className="account-privacy">Sua senha é protegida com hash antes de ser armazenada. Nunca compartilhe sua senha.</p>
      </section>
      <aside className="account-aside" aria-hidden="true">
        <div className="account-aside-orbit" />
        <div className="account-aside-book"><span>AS</span><i /><small>ARQUIVO<br />DE CASOS</small></div>
        <p>Pesquisa, memória<br />e leitura crítica.</p>
      </aside>
    </main>
  );
}
