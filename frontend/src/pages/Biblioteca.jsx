import { useEffect, useMemo, useState } from "react";

const relatosDemonstracao = [
  {
    id: "demo-1",
    titulo: "O caso Ted Bundy",
    resumo: "Investigação, cobertura da imprensa e os limites da construção de perfis criminais.",
    conteudo: "Este dossiê apresenta um panorama não gráfico do caso de Ted Bundy e de sua repercussão nos Estados Unidos na década de 1970. O foco está nos desafios de comunicação entre jurisdições, na investigação e na forma como a mídia moldou a percepção pública. A narrativa não deve ser confundida com uma explicação completa do fenômeno nem com uma tentativa de romantizar o autor.",
    pessoa: "Ted Bundy",
    local: "Estados Unidos",
    periodo: "Década de 1970",
    categoria: "Investigação histórica",
    fontes: "https://www.britannica.com/biography/Ted-Bundy"
  },
  {
    id: "demo-2",
    titulo: "O caso Aileen Wuornos",
    resumo: "Contexto social, percurso judicial e atenção crítica à cobertura de crimes cometidos por mulheres.",
    conteudo: "Este relato introdutório aborda o caso de Aileen Wuornos com atenção ao contexto social, ao processo judicial e à cobertura jornalística. O material evita descrições explícitas e destaca a importância de consultar fontes históricas e jurídicas, sem reduzir a discussão a estereótipos ou sensacionalismo.",
    pessoa: "Aileen Wuornos",
    local: "Flórida, Estados Unidos",
    periodo: "1989–1990",
    categoria: "Contexto social e justiça",
    fontes: "https://www.britannica.com/biography/Aileen-Wuornos"
  },
  {
    id: "demo-3",
    titulo: "O caso Zodiac",
    resumo: "Um caso não solucionado que permite discutir evidências, comunicação pública e limites da investigação.",
    conteudo: "O caso conhecido como Zodiac permanece associado a uma série de crimes na Califórnia no fim dos anos 1960 e início dos anos 1970. Este resumo concentra-se na investigação, nas mensagens enviadas à imprensa e na distinção entre fatos confirmados e hipóteses populares. A identidade do autor não foi confirmada oficialmente.",
    pessoa: "Autor não identificado (Zodiac)",
    local: "Califórnia, Estados Unidos",
    periodo: "Final dos anos 1960 e início dos anos 1970",
    categoria: "Caso não solucionado",
    fontes: "https://www.fbi.gov/history/famous-cases/zodiac-killer"
  }
];

const formatarCategoria = (categoria) => categoria || "Relato";

function LivroIcone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20M8 7h8M8 10h8" />
    </svg>
  );
}

function RelatoDetalhe({ relato, onClose }) {
  const fontes = (relato.fontes || "").split(/\n|,/).map((fonte) => fonte.trim()).filter(Boolean);

  return (
    <div className="dialog-backdrop" onMouseDown={(evento) => evento.target === evento.currentTarget && onClose()}>
      <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Fechar relato">×</button>
        <span className="eyebrow">DOSSIÊ • {formatarCategoria(relato.categoria)}</span>
        <h2 id="dialog-title">{relato.titulo}</h2>
        <p className="dialog-summary">{relato.resumo}</p>
        <div className="detail-meta">
          <span><small>PESSOA</small>{relato.pessoa}</span>
          <span><small>LOCAL</small>{relato.local}</span>
          <span><small>PERÍODO</small>{relato.periodo}</span>
        </div>
        <div className="detail-body">{relato.conteudo}</div>
        {fontes.length > 0 && (
          <div className="source-list">
            <h3>Fontes para consulta</h3>
            {fontes.map((fonte) => (
              <a key={fonte} href={fonte} target="_blank" rel="noreferrer">{fonte}</a>
            ))}
          </div>
        )}
        <p className="content-note">Conteúdo de caráter educativo. As vítimas são tratadas com respeito; detalhes gráficos e especulações não verificadas foram evitados.</p>
      </section>
    </div>
  );
}

export default function Biblioteca({ onRegister }) {
  const [relatos, setRelatos] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas as categorias");
  const [selecionado, setSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [modoDemonstracao, setModoDemonstracao] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/relatos", { signal: controller.signal })
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Não foi possível carregar a biblioteca.");
        return resposta.json();
      })
      .then((dados) => setRelatos(Array.isArray(dados) ? dados : []))
      .catch((erro) => {
        if (erro.name !== "AbortError") {
          setRelatos(relatosDemonstracao);
          setModoDemonstracao(true);
        }
      })
      .finally(() => setCarregando(false));
    return () => controller.abort();
  }, []);

  const categorias = useMemo(() => ["Todas as categorias", ...new Set(relatos.map((relato) => relato.categoria).filter(Boolean))], [relatos]);
  const relatosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return relatos.filter((relato) => {
      const correspondeCategoria = categoria === "Todas as categorias" || relato.categoria === categoria;
      const texto = [relato.titulo, relato.resumo, relato.pessoa, relato.local, relato.periodo, relato.categoria].join(" ").toLocaleLowerCase("pt-BR");
      return correspondeCategoria && (!termo || texto.includes(termo));
    });
  }, [busca, categoria, relatos]);

  return (
    <main className="library-page">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Arquivo Sombrio, início">
          <span className="brand-mark"><LivroIcone /></span>
          <span>ARQUIVO <b>SOMBRIO</b></span>
        </a>
        <nav aria-label="Navegação principal">
          <a className="nav-active" href="#acervo">Acervo</a>
          <a href="#sobre">Sobre o projeto</a>
        </nav>
        {onRegister ? (
          <button className="topbar-link register-link" type="button" onClick={onRegister}>Criar conta <span aria-hidden="true">↗</span></button>
        ) : (
          <a className="topbar-link" href="#acervo">Explorar relatos <span aria-hidden="true">↗</span></a>
        )}
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow"><i /> ACERVO DE TRUE CRIME • PESQUISA E CONTEXTO</span>
          <h1>Histórias reais.<br /><em>Leitura responsável.</em></h1>
          <p>Uma biblioteca digital para compreender casos criminais a partir de contexto, investigação e fontes — sem glorificar a violência.</p>
          <a className="primary-link" href="#acervo">Conheça o acervo <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="art-book"><div className="book-spine" /><div className="book-face"><span>AS</span><i /><small>ARQUIVO<br />DE CASOS</small></div></div>
          <span className="art-caption">EST. 2026&nbsp; / &nbsp;ACERVO 001</span>
        </div>
        <div className="hero-index"><span>01</span><span>—</span><span>03</span></div>
      </section>

      <section className="intro-strip" id="sobre">
        <span className="strip-label">NOSSA ABORDAGEM</span>
        <p>Informação com contexto. <b>Vítimas no centro.</b> Sensacionalismo, não.</p>
        <span className="strip-mark">✳</span>
      </section>

      <section className="collection" id="acervo">
        <div className="collection-heading">
          <div>
            <span className="eyebrow">CATÁLOGO EDITORIAL</span>
            <h2>Explore os relatos<span>.</span></h2>
            <p>Casos documentados sob perspectivas históricas, investigativas e sociais.</p>
          </div>
          <div className="collection-count"><strong>{relatos.length.toString().padStart(2, "0")}</strong><span>RELATOS<br />NO ACERVO</span></div>
        </div>

        {modoDemonstracao && <div className="demo-notice">Modo de demonstração: não foi possível conectar à API. Os relatos exibidos são exemplos editoriais.</div>}

        <div className="filters">
          <label className="search-box">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4 4" /></svg>
            <input value={busca} onChange={(evento) => setBusca(evento.target.value)} placeholder="Buscar por caso, pessoa ou local..." aria-label="Buscar relatos" />
          </label>
          <label className="select-label"><span>FILTRAR POR</span>
            <select value={categoria} onChange={(evento) => setCategoria(evento.target.value)} aria-label="Filtrar por categoria">
              {categorias.map((opcao) => <option key={opcao}>{opcao}</option>)}
            </select>
          </label>
        </div>

        {carregando ? <div className="empty-state">Carregando o acervo…</div> : relatosFiltrados.length === 0 ? (
          <div className="empty-state">Nenhum relato encontrado. Tente outro termo ou categoria.</div>
        ) : (
          <div className="story-grid">
            {relatosFiltrados.map((relato, indice) => (
              <article className="story-card" key={relato.id}>
                <div className={`card-art card-art-${indice % 3}`} aria-hidden="true">
                  <span className="card-number">DOSSIÊ Nº {String(indice + 1).padStart(2, "0")}</span>
                  <span className="card-symbol">{indice % 3 === 0 ? "◉" : indice % 3 === 1 ? "⌁" : "✳"}</span>
                  <span className="card-lines" />
                </div>
                <div className="card-content">
                  <div className="card-meta"><span>{formatarCategoria(relato.categoria)}</span><span>{relato.periodo}</span></div>
                  <h3>{relato.titulo}</h3>
                  <p>{relato.resumo}</p>
                  <div className="card-footer"><span>{relato.local}</span><button type="button" onClick={() => setSelecionado(relato)}>Ler dossiê <span aria-hidden="true">↗</span></button></div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark"><LivroIcone /></span><span>ARQUIVO <b>SOMBRIO</b></span></a>
        <p>Pesquisa, memória e leitura crítica.</p>
        <span>© 2026 ARQUIVO SOMBRIO</span>
      </footer>

      {selecionado && <RelatoDetalhe relato={selecionado} onClose={() => setSelecionado(null)} />}
    </main>
  );
}
