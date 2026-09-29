const state = { people:"casal", budget:"50-100", vibe:"tranquilo" };

const ideas = {
  casal: {
    tranquilo: [
      ["Noite de filme diferente","Escolham um filme que nenhum dos dois conhece, façam uma pipoca caprichada e deixem os celulares longe por duas horas.","🍿","R$ 20–50","2–3h","Leve uma sobremesa surpresa."],
      ["Café + pôr do sol","Tomem um café em um lugar novo e terminem o passeio vendo o pôr do sol.","☕","R$ 30–80","2h","Cada um escolhe uma música para o caminho."]
    ],
    comida: [
      ["Tour do lanche","Escolham um lugar para comer e depois dividam uma sobremesa em outro endereço.","🍔","R$ 50–100","2–3h","Cada um escolhe uma parte do rolê."],
      ["Noite do restaurante surpresa","Cada um indica três lugares sem contar o motivo. Sorteiem um e vão.","🍽️","R$ 70–150","2h","Vale escolher um prato que nunca provaram."]
    ],
    aventura: [
      ["Missão sem destino","Entrem no carro, escolham uma direção e parem em um lugar que nenhum dos dois conheça.","🚗","R$ 50–150","3–4h","Definam um ponto de retorno antes de sair."]
    ],
    diferente: [
      ["Encontro temático","Escolham um tema aleatório e montem o rolê inteiro em volta dele: anos 2000, praia, cinema ou outra ideia.","🎨","R$ 30–100","2–4h","O look também precisa entrar na brincadeira."]
    ],
    romantico: [
      ["Encontro das cartas","Cada um escreve uma carta curta para o outro e vocês trocam durante um jantar simples.","💌","R$ 30–100","2–3h","Guardem as cartas para reler daqui a um ano."]
    ],
    festa: [
      ["Rolê de última hora","Se arrumem sem planejar muito e escolham juntos um lugar com música e movimento.","🎉","R$ 80–200","3–5h","Saiam de casa sem discutir demais o roteiro."]
    ]
  },
  amigos: {
    tranquilo:[["Noite de jogos","Escolham três jogos, comprem alguns petiscos e façam um campeonato valendo um prêmio simbólico.","🎲","R$ 20–60","3h","O último colocado paga a sobremesa."]],
    comida:[["Desafio gastronômico","Cada amigo escolhe um ingrediente e o grupo precisa criar alguma coisa com tudo que foi escolhido.","🍕","R$ 30–100","2–3h","Dêem um nome ao prato."]],
    aventura:[["Caça ao rolê","Dividam-se em duplas e criem pequenas missões pela cidade. No final, todos se encontram.","🗺️","R$ 20–100","3–5h","Nada de desafios perigosos ou ilegais."]],
    diferente:[["Rolê do desconhecido","Cada pessoa escolhe uma atividade que o grupo nunca fez. Sorteiem uma.","🎨","R$ 30–150","2–4h","A regra é ninguém poder escolher a própria ideia."]],
    romantico:[["Jantar coletivo","Cada pessoa leva uma coisa para montar um jantar simples juntos.","🍝","R$ 30–70 por pessoa","2–3h","Coloquem uma playlist colaborativa."]],
    festa:[["Noite temática","Escolham uma década, personagem ou tema e façam uma noite inteira baseada nele.","🪩","R$ 50–150","3–5h","Façam uma foto oficial do grupo."]]
  },
  familia:{
    tranquilo:[["Tarde de sobremesa","Façam uma sobremesa juntos e depois assistam a um filme escolhido por votação.","🍰","R$ 20–60","3h","Deixem os mais novos escolherem a sobremesa."]],
    comida:[["Almoço diferente","Escolham uma receita que ninguém da família costuma fazer e preparem juntos.","🍳","R$ 50–120","2–4h","Cada pessoa fica responsável por uma etapa."]],
    aventura:[["Passeio ao ar livre","Escolham um parque, praça ou trilha adequada ao grupo e façam um passeio sem pressa.","🌳","R$ 0–100","2–4h","Levem água e respeitem o local."]],
    diferente:[["Dia do 'sim'","Cada pessoa pode propor uma atividade simples e o grupo vota nas três que serão feitas.","🎯","R$ 0–100","3–5h","Nada de celular durante as atividades."]],
    romantico:[["Álbum de memórias","Separem fotos antigas e montem juntos um pequeno álbum ou vídeo de lembranças.","📸","R$ 0–50","2–3h","Cada pessoa escolhe sua memória favorita."]],
    festa:[["Noite de música","Façam uma playlist em grupo, preparem alguns petiscos e transformem a sala em pista de dança.","🎶","R$ 20–80","3h","Cada pessoa precisa escolher pelo menos duas músicas."]]
  },
  sozinho:{
    tranquilo:[["Café + livro","Escolha um café diferente, leve um livro e passe uma hora sem notificações.","☕","R$ 20–50","1–2h","Escolha um lugar onde você nunca foi."]],
    comida:[["Tour solo de comida","Escolha um prato que você nunca experimentou e faça dele o destaque do dia.","🍜","R$ 30–100","1–2h","Peça algo diferente do habitual."]],
    aventura:[["Explorador local","Escolha um bairro ou ponto da cidade que você quase nunca visita e explore a região.","🧭","R$ 0–100","2–4h","Planeje uma rota segura antes de sair."]],
    diferente:[["Data consigo mesmo","Vista uma roupa que você gosta, saia para fazer algo que normalmente faria acompanhado e aproveite sua própria companhia.","✨","R$ 20–120","2–4h","Não precisa esperar ninguém para viver algo legal."]],
    romantico:[["Noite de autocuidado","Prepare uma comida que gosta, tome um banho relaxante e escolha um filme para fechar a noite.","🕯️","R$ 20–80","2–3h","Faça tudo sem pressa."]],
    festa:[["Rolê cultural","Vá a um evento, exposição, cinema ou lugar com música e descubra algo novo.","🎭","R$ 20–150","2–4h","Escolha algo que normalmente você não escolheria."]]
  }
};

const budgetLabels = {"0-50":"R$ 0–50","50-100":"R$ 50–100","100-200":"R$ 100–200","200+":"R$ 200+"};
const vibeLabels = {tranquilo:"tranquilo",comida:"comida",aventura:"aventura",diferente:"diferente",romantico:"romântico",festa:"agitado"};

document.querySelectorAll(".option").forEach(btn=>btn.addEventListener("click",()=>{
  state.people=btn.dataset.value;
  document.querySelectorAll(".option").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
}));
document.querySelectorAll(".budget-btn").forEach(btn=>btn.addEventListener("click",()=>{
  state.budget=btn.dataset.budget;
  document.querySelectorAll(".budget-btn").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
}));
document.querySelectorAll(".vibe").forEach(btn=>btn.addEventListener("click",()=>{
  state.vibe=btn.dataset.vibe;
  document.querySelectorAll(".vibe").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
}));

function randomItem(list){ return list[Math.floor(Math.random()*list.length)]; }

function generate(){
  const pool = ideas[state.people][state.vibe];
  let item = randomItem(pool);

  const [title, description, emoji, defaultBudget, time, tip] = item;
  const budget = state.budget === "0-50" ? "R$ 0–50" :
                 state.budget === "50-100" ? "R$ 50–100" :
                 state.budget === "100-200" ? "R$ 100–200" : "R$ 200+";

  document.getElementById("result").innerHTML = `
    <div class="result-content">
      <span class="result-tag">${vibeLabels[state.vibe]}</span>
      <div class="result-emoji">${emoji}</div>
      <h3>${title}</h3>
      <p class="result-description">${description}</p>
      <div class="result-details">
        <div class="detail"><small>Orçamento</small><strong>${budget}</strong></div>
        <div class="detail"><small>Duração</small><strong>${time}</strong></div>
        <div class="detail"><small>Companhia</small><strong>${state.people === "casal" ? "Casal" : state.people === "amigos" ? "Amigos" : state.people === "familia" ? "Família" : "Solo"}</strong></div>
      </div>
      <div class="tip"><b>💡 Toque do ROLÊ:</b> ${tip}</div>
    </div>`;
  document.getElementById("another").classList.remove("hidden");
  document.getElementById("toast").textContent = "Rolê encontrado! 🎲";
  document.getElementById("toast").classList.add("show");
  setTimeout(()=>document.getElementById("toast").classList.remove("show"),1800);
}

document.getElementById("generate").addEventListener("click",generate);
document.getElementById("another").addEventListener("click",generate);
