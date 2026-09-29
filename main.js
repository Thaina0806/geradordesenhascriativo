const $ = (id) => document.getElementById(id);

const output = $("passwordOutput");
const lengthSlider = $("lengthSlider");
const lengthValue = $("lengthValue");
const generateBtn = $("generateBtn");
const refreshBtn = $("refreshBtn");
const copyBtn = $("copyBtn");
const copyFeedback = $("copyFeedback");
const historyEl = $("history");
const toast = $("toast");

let mode = "random";
let context = "geral";
let history = [];

const contexts = {
  geral: {
    title: "Proteção equilibrada",
    text: "Use uma senha única e longa. Para contas importantes, combine com autenticação em dois fatores."
  },
  instagram: {
    title: "Conta social",
    text: "Prefira uma senha única e ative a autenticação em dois fatores para proteger o acesso."
  },
  email: {
    title: "Proteção reforçada",
    text: "Seu e-mail pode ser usado para recuperar outras contas. Prefira uma senha longa e exclusiva."
  },
  wifi: {
    title: "Longa e compartilhável",
    text: "Uma passphrase longa pode ser forte e mais fácil de informar para pessoas autorizadas."
  },
  banco: {
    title: "Proteção máxima",
    text: "Nunca reutilize a senha de uma conta financeira. Use uma senha única e siga as exigências do banco."
  },
  trabalho: {
    title: "Senha corporativa",
    text: "Siga as regras da sua organização e evite reutilizar senhas pessoais."
  }
};

const words = [
  "Cacto","Lua","Nuvem","Rio","Sol","Lobo","Pérola","Verde","Café","Brisa",
  "Fogo","Mar","Vento","Estrela","Cedro","Aurora","Jardim","Montanha","Azul","Prata",
  "Duna","Oliva","Chuva","Rosa","Vale","Lago","Coral","Falcão","Neve","Horizonte"
];

const sets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%&*+-=?_"
};

function secureRandomInt(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function randomChar(chars) {
  return chars[secureRandomInt(chars.length)];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateRandomPassword(length) {
  let selected = "";
  const required = [];

  if ($("uppercase").checked) { selected += sets.uppercase; required.push(randomChar(sets.uppercase)); }
  if ($("lowercase").checked) { selected += sets.lowercase; required.push(randomChar(sets.lowercase)); }
  if ($("numbers").checked) { selected += sets.numbers; required.push(randomChar(sets.numbers)); }
  if ($("symbols").checked) { selected += sets.symbols; required.push(randomChar(sets.symbols)); }

  if (!selected) {
    $("lowercase").checked = true;
    selected = sets.lowercase;
    required.push(randomChar(sets.lowercase));
  }

  if ($("similar").checked) {
    selected = selected.replace(/[O0Il1]/g, "");
  }

  const result = [...required];
  while (result.length < length) result.push(randomChar(selected));
  return shuffle(result).join("");
}

function generateMemorablePassword() {
  const count = Math.max(3, Math.min(5, Math.floor(Number(lengthSlider.value) / 6)));
  const chosen = shuffle([...words]).slice(0, count);
  const separators = ["-", ".", "_"];
  let result = chosen.join(separators[secureRandomInt(separators.length)]);

  const number = String(secureRandomInt(90) + 10);
  const symbol = randomChar("!@#$%&*");

  result += number + symbol;

  // Approximate requested length while preserving readability.
  if (result.length < Number(lengthSlider.value)) {
    result += randomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ") + randomChar("abcdefghijklmnopqrstuvwxyz");
  }
  return result;
}

function generate() {
  const password = mode === "random"
    ? generateRandomPassword(Number(lengthSlider.value))
    : generateMemorablePassword();

  output.value = password;
  updateStrength(password);
  addHistory(password);
}

function calculateStrength(password) {
  let score = 0;
  const length = password.length;

  score += Math.min(45, length * 2.8);
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/\d/.test(password)) score += 10;
  if (/[^A-Za-z0-9]/.test(password)) score += 15;

  const unique = new Set(password).size;
  score += Math.min(10, unique / Math.max(1, length) * 10);

  if (/(.)\1\1/.test(password)) score -= 12;
  if (/1234|abcd|qwerty|password/i.test(password)) score -= 25;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function updateStrength(password) {
  const score = calculateStrength(password);
  const meter = $("meterFill");
  const label = $("strengthLabel");
  const number = $("scoreNumber");
  const icon = $("strengthIcon");

  number.textContent = `${score}/100`;
  meter.style.width = `${score}%`;

  let color = "var(--danger)";
  let text = "Fraca";
  if (score >= 40) { color = "#ffc857"; text = "Moderada"; }
  if (score >= 70) { color = "#9ce85d"; text = "Forte"; }
  if (score >= 90) { color = "var(--accent)"; text = "Muito forte"; }

  meter.style.background = color;
  number.style.color = color;
  icon.style.color = color;
  label.textContent = text;

  const checks = [
    ["Comprimento", `${password.length} caracteres`, password.length >= 14],
    ["Maiúsculas", /[A-Z]/.test(password) ? "Incluídas" : "Não incluídas", /[A-Z]/.test(password)],
    ["Números", /\d/.test(password) ? "Incluídos" : "Não incluídos", /\d/.test(password)],
    ["Símbolos", /[^A-Za-z0-9]/.test(password) ? "Incluídos" : "Não incluídos", /[^A-Za-z0-9]/.test(password)]
  ];

  $("analysisList").innerHTML = checks.map(([name, value, ok]) =>
    `<div class="analysis-item"><span>${name}</span><strong class="${ok ? "ok" : ""}">${ok ? "✓ " : ""}${value}</strong></div>`
  ).join("");
}

function addHistory(password) {
  history.unshift({
    password,
    time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    mode
  });
  history = history.slice(0, 5);
  renderHistory();
}

function renderHistory() {
  if (!history.length) {
    historyEl.innerHTML = `<div class="empty-history">Suas senhas recentes aparecerão aqui. Elas não são salvas no servidor.</div>`;
    return;
  }

  historyEl.innerHTML = history.map((item, index) => `
    <div class="history-item">
      <span class="history-password">${escapeHtml(item.password)}</span>
      <span class="history-meta">${item.mode === "memorable" ? "Memorável" : "Aleatória"} · ${item.time}</span>
      <button class="history-copy" data-index="${index}">Copiar</button>
    </div>
  `).join("");

  document.querySelectorAll(".history-copy").forEach(btn => {
    btn.addEventListener("click", () => copyText(history[Number(btn.dataset.index)].password));
  });
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[char]));
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    copyFeedback.textContent = "Senha copiada para a área de transferência.";
    showToast("Senha copiada!");
    setTimeout(() => copyFeedback.textContent = "", 2500);
  } catch {
    output.select();
    document.execCommand("copy");
    showToast("Senha copiada!");
  }
}

function updateRecommendation() {
  const data = contexts[context];
  $("recommendationTitle").textContent = data.title;
  $("recommendationText").textContent = data.text;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = `${lengthSlider.value} caracteres`;
});

document.querySelectorAll(".mode").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mode").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    mode = btn.dataset.mode;
    generate();
  });
});

document.querySelectorAll(".context").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".context").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    context = btn.dataset.context;
    updateRecommendation();
  });
});

generateBtn.addEventListener("click", generate);
refreshBtn.addEventListener("click", generate);
copyBtn.addEventListener("click", () => copyText(output.value));

$("clearHistory").addEventListener("click", () => {
  history = [];
  renderHistory();
  showToast("Histórico da sessão apagado.");
});

document.querySelectorAll(".check-row input").forEach(input => {
  input.addEventListener("change", generate);
});

updateRecommendation();
generate();
