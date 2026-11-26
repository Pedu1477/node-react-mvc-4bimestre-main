import prisma from "../src/config/prisma.js";

const relatos = [
  {
    titulo: "O caso Ted Bundy",
    resumo: "Uma análise histórica sobre investigação, cobertura da imprensa e os limites da construção de perfis criminais.",
    conteudo: "Este dossiê apresenta um panorama não gráfico do caso de Ted Bundy e de sua repercussão nos Estados Unidos na década de 1970. O foco está nos desafios de comunicação entre jurisdições, na investigação e na forma como a mídia moldou a percepção pública. A narrativa não deve ser confundida com uma explicação completa do fenômeno nem com uma tentativa de romantizar o autor.",
    pessoa: "Ted Bundy",
    local: "Estados Unidos",
    periodo: "Década de 1970",
    categoria: "Investigação histórica",
    fontes: "https://www.britannica.com/biography/Ted-Bundy"
  },
  {
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

try {
  for (const relato of relatos) {
    const existente = await prisma.relato.findFirst({ where: { titulo: relato.titulo } });
    if (!existente) await prisma.relato.create({ data: relato });
  }
  console.log("Relatos de demonstração inseridos.");
} finally {
  await prisma.$disconnect();
}
