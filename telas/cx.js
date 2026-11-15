/* Caixinha: dados de demonstração compartilhados entre as telas.
   Guarda tudo no navegador (localStorage). Se o navegador não deixar, usa a memória da aba. */
(function () {
  var KEY = 'caixinha-demo-v3';
  var DAY = 86400000;
  var mem = null;
  var STORES = [
    { id: 'centro', name: 'Loja Centro', short: 'Centro' },
    { id: 'shopping', name: 'Loja Shopping', short: 'Shopping' },
    { id: 'norte', name: 'Loja Norte', short: 'Norte' }
  ];
  function seed() {
    var n = Date.now();
    function at(daysAgo, h, m) { var d = new Date(n - daysAgo * DAY); d.setHours(h, m, 0, 0); return d.getTime(); }
    return {
      v: 3, vazio: false, shopName: 'Moda Express', userName: 'Maria',
      items: [
        { id: 1, prod: 1, name: 'Camiseta básica branca', vlabel: 'M', cat: 'Roupas', cod: 'CAM-0042-M', apelidos: 'blusa, camisa, tshirt', unid: 'un', min: 10, preco: '79,90', custo: '32,00', q: { centro: 48, shopping: 0, norte: 0 } },
        { id: 11, prod: 1, name: 'Camiseta básica branca', vlabel: 'P', cat: 'Roupas', cod: 'CAM-0042-P', apelidos: 'blusa, camisa, tshirt', unid: 'un', min: 10, preco: '79,90', custo: '32,00', q: { centro: 12, shopping: 0, norte: 0 } },
        { id: 12, prod: 1, name: 'Camiseta básica branca', vlabel: 'G', cat: 'Roupas', cod: 'CAM-0042-G', apelidos: 'blusa, camisa, tshirt', unid: 'un', min: 10, preco: '79,90', custo: '32,00', q: { centro: 30, shopping: 5, norte: 0 } },
        { id: 13, prod: 1, name: 'Camiseta básica branca', vlabel: 'GG', cat: 'Roupas', cod: 'CAM-0042-GG', apelidos: 'blusa, camisa, tshirt', unid: 'un', min: 10, preco: '79,90', custo: '32,00', q: { centro: 0, shopping: 0, norte: 0 } },
        { id: 2, prod: 2, name: 'Calça jeans slim', vlabel: '42', cat: 'Roupas', cod: 'CAL-0107-42', apelidos: 'jeans, calca', unid: 'un', min: 10, preco: '189,90', custo: '84,00', q: { centro: 0, shopping: 6, norte: 0 } },
        { id: 14, prod: 2, name: 'Calça jeans slim', vlabel: '38', cat: 'Roupas', cod: 'CAL-0107-38', apelidos: 'jeans, calca', unid: 'un', min: 6, preco: '189,90', custo: '84,00', q: { centro: 8, shopping: 0, norte: 0 } },
        { id: 15, prod: 2, name: 'Calça jeans slim', vlabel: '40', cat: 'Roupas', cod: 'CAL-0107-40', apelidos: 'jeans, calca', unid: 'un', min: 6, preco: '189,90', custo: '84,00', q: { centro: 10, shopping: 4, norte: 0 } },
        { id: 16, prod: 2, name: 'Calça jeans slim', vlabel: '44', cat: 'Roupas', cod: 'CAL-0107-44', apelidos: 'jeans, calca', unid: 'un', min: 6, preco: '189,90', custo: '84,00', q: { centro: 0, shopping: 0, norte: 0 } },
        { id: 3, prod: 3, name: 'Tênis casual preto', vlabel: '40', cat: 'Calçados', cod: 'TEN-0220-40', apelidos: 'tenis, sapato, sapatenis', unid: 'un', min: 8, preco: '249,90', custo: '118,00', q: { centro: 22, shopping: 0, norte: 0 } },
        { id: 17, prod: 3, name: 'Tênis casual preto', vlabel: '38', cat: 'Calçados', cod: 'TEN-0220-38', apelidos: 'tenis, sapato, sapatenis', unid: 'un', min: 8, preco: '249,90', custo: '118,00', q: { centro: 0, shopping: 0, norte: 0 } },
        { id: 18, prod: 3, name: 'Tênis casual preto', vlabel: '42', cat: 'Calçados', cod: 'TEN-0220-42', apelidos: 'tenis, sapato, sapatenis', unid: 'un', min: 8, preco: '249,90', custo: '118,00', q: { centro: 9, shopping: 0, norte: 0 } },
        { id: 4, prod: 4, name: 'Mochila escolar azul', vlabel: '', cat: 'Acessórios', cod: 'MOC-0031', apelidos: 'bolsa, mochila', unid: 'un', min: 8, preco: '139,90', custo: '61,00', q: { centro: 5, shopping: 0, norte: 10 } },
        { id: 5, prod: 5, name: 'Boné aba reta', vlabel: '', cat: 'Acessórios', cod: 'BON-0015', apelidos: 'bone, chapeu', unid: 'un', min: 10, preco: '59,90', custo: '21,00', q: { centro: 0, shopping: 0, norte: 0 } },
        { id: 6, prod: 6, name: 'Meias esportivas (par)', vlabel: '', cat: 'Roupas', cod: 'MEI-0090', apelidos: 'meia, soquete', unid: 'par', min: 30, preco: '24,90', custo: '8,50', q: { centro: 40, shopping: 30, norte: 50 } },
        { id: 7, prod: 7, name: 'Jaqueta corta-vento', vlabel: 'G', cat: 'Roupas', cod: 'JAQ-0058-G', apelidos: 'casaco, blusa de frio', unid: 'un', min: 4, preco: '219,90', custo: '98,00', q: { centro: 9, shopping: 0, norte: 0 } },
        { id: 19, prod: 7, name: 'Jaqueta corta-vento', vlabel: 'M', cat: 'Roupas', cod: 'JAQ-0058-M', apelidos: 'casaco, blusa de frio', unid: 'un', min: 4, preco: '219,90', custo: '98,00', q: { centro: 3, shopping: 0, norte: 0 } },
        { id: 20, prod: 7, name: 'Jaqueta corta-vento', vlabel: 'P', cat: 'Roupas', cod: 'JAQ-0058-P', apelidos: 'casaco, blusa de frio', unid: 'un', min: 4, preco: '219,90', custo: '98,00', q: { centro: 5, shopping: 0, norte: 0 } },
        { id: 8, prod: 8, name: 'Camiseta polo azul', vlabel: 'G', cat: 'Roupas', cod: 'POL-0063-G', apelidos: 'polo, blusa, camisa', unid: 'un', min: 10, preco: '99,90', custo: '40,00', q: { centro: 0, shopping: 11, norte: 20 } },
        { id: 21, prod: 8, name: 'Camiseta polo azul', vlabel: 'M', cat: 'Roupas', cod: 'POL-0063-M', apelidos: 'polo, blusa, camisa', unid: 'un', min: 10, preco: '99,90', custo: '40,00', q: { centro: 0, shopping: 6, norte: 0 } },
        { id: 22, prod: 8, name: 'Camiseta polo azul', vlabel: 'GG', cat: 'Roupas', cod: 'POL-0063-GG', apelidos: 'polo, blusa, camisa', unid: 'un', min: 10, preco: '99,90', custo: '40,00', q: { centro: 0, shopping: 14, norte: 0 } },
        { id: 9, prod: 9, name: 'Sandália slide', vlabel: '38', cat: 'Calçados', cod: 'SAN-0174-38', apelidos: 'chinelo, sandalia', unid: 'par', min: 8, preco: '69,90', custo: '27,00', q: { centro: 0, shopping: 4, norte: 0 } },
        { id: 23, prod: 9, name: 'Sandália slide', vlabel: '37', cat: 'Calçados', cod: 'SAN-0174-37', apelidos: 'chinelo, sandalia', unid: 'par', min: 8, preco: '69,90', custo: '27,00', q: { centro: 7, shopping: 0, norte: 0 } },
        { id: 24, prod: 9, name: 'Sandália slide', vlabel: '39', cat: 'Calçados', cod: 'SAN-0174-39', apelidos: 'chinelo, sandalia', unid: 'par', min: 8, preco: '69,90', custo: '27,00', q: { centro: 0, shopping: 0, norte: 0 } },
        { id: 10, prod: 10, name: 'Cinto de couro marrom', vlabel: '', cat: 'Acessórios', cod: 'CIN-0021', apelidos: 'cinta', unid: 'un', min: 6, preco: '89,90', custo: '33,00', q: { centro: 18, shopping: 0, norte: 0 } }
      ],
      mov: [
        { t: at(1, 16, 10), tipo: 'saida', item: 1, qtd: 2, loja: 'centro', motivo: 'Venda', quem: 'Ana' },
        { t: at(3, 9, 30), tipo: 'entrada', item: 1, qtd: 20, loja: 'centro', motivo: 'Compra do fornecedor', quem: 'Carlos' },
        { t: at(0, 10, 5), tipo: 'saida', item: 6, qtd: 4, loja: 'norte', motivo: 'Venda', quem: 'Ana' },
        { t: at(1, 11, 40), tipo: 'saida', item: 5, qtd: 3, loja: 'shopping', motivo: 'Venda', quem: 'Ana' },
        { t: at(2, 15, 20), tipo: 'transf', item: 4, qtd: 5, de: 'norte', para: 'centro', motivo: 'Transferência', quem: 'Maria' },
        { t: at(2, 8, 50), tipo: 'saida', item: 9, qtd: 1, loja: 'shopping', motivo: 'Avaria', quem: 'Carlos' }
      ],
      users: [
        { id: 1, nome: 'Maria Souza', email: 'maria@sualoja.com', role: 'adm', lojas: ['centro', 'shopping', 'norte'], custo: true, status: 'ativo' },
        { id: 2, nome: 'Carlos Lima', email: 'carlos@sualoja.com', role: 'adm', lojas: ['centro', 'shopping', 'norte'], custo: true, status: 'ativo' },
        { id: 3, nome: 'Ana Ribeiro', email: 'ana@sualoja.com', role: 'ger', lojas: ['centro', 'shopping', 'norte'], custo: true, status: 'ativo' },
        { id: 4, nome: 'João Pereira', email: 'joao@sualoja.com', role: 'est', lojas: ['centro'], custo: false, status: 'ativo' },
        { id: 5, nome: 'Beatriz Alves', email: 'beatriz@sualoja.com', role: 'est', lojas: ['norte'], custo: false, status: 'pendente' }
      ],
      toast: null, prev: null, lastId: null, sel: null, fornecedores: { 'Roupas': 'Têxtil Sul', 'Calçados': 'Calçados Brasil', 'Acessórios': 'Acessórios Mix' }
    };
  }
  function load() {
    if (mem) return mem;
    try { var s = window.localStorage.getItem(KEY); if (s) { mem = JSON.parse(s); if (mem && mem.v === 3) return mem; } } catch (e) {}
    mem = seed();
    return mem;
  }
  function save() { try { window.localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {} }
  function norm(s) { return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim(); }
  function lev(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) { d[i] = [i]; }
    for (j = 1; j <= n; j++) { d[0][j] = j; }
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  var CX = {
    stores: function () { return STORES; },
    storeName: function (id) { for (var i = 0; i < STORES.length; i++) if (STORES[i].id === id) return STORES[i].name; return id; },
    get: function () { return load(); },
    save: save,
    reset: function () { mem = seed(); save(); return mem; },
    norm: norm,

    vsort: function (a, b) {
      var R = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'], x = String(a.vlabel).toUpperCase(), y = String(b.vlabel).toUpperCase();
      var nx = parseFloat(x), ny = parseFloat(y);
      if (!isNaN(nx) && !isNaN(ny)) return nx - ny;
      var ix = R.indexOf(x), iy = R.indexOf(y);
      if (ix >= 0 && iy >= 0) return ix - iy;
      return a.id - b.id;
    },
    label: function (it) { return it.vlabel ? it.name + ' · ' + it.vlabel : it.name; },
    vars: function (it) { var s = load(); return s.items.filter(function (x) { return x.prod === it.prod; }).sort(CX.vsort); },
    products: function () {
      var s = load(), map = {}, out = [];
      s.items.forEach(function (it) { var p = map[it.prod]; if (!p) { p = map[it.prod] = { id: it.prod, name: it.name, cat: it.cat, unid: it.unid, apelidos: it.apelidos, preco: it.preco, custo: it.custo, vars: [] }; out.push(p); } p.vars.push(it); });
      out.forEach(function (p) { p.vars.sort(CX.vsort); });
      return out;
    },
    hasVars: function (it) { var v = CX.vars(it); return v.length > 1 || !!it.vlabel; },
    nextId: function () { var id = 1; load().items.forEach(function (i) { if (i.id >= id) id = i.id + 1; }); return id; },
    nextProd: function () { var id = 1; load().items.forEach(function (i) { if ((i.prod || 0) >= id) id = i.prod + 1; }); return id; },
    skuTaken: function (sku, exceptId) { var k = norm(sku); return load().items.some(function (i) { return i.id !== exceptId && norm(i.cod) === k && k; }); },
    addProduto: function (o) {
      var s = load(), pid = CX.nextProd(), first = null;
      var vars = (o.vars && o.vars.length) ? o.vars : [{ label: '', sku: o.cod, q: o.q }];
      vars.forEach(function (v) {
        var it = { id: CX.nextId(), prod: pid, name: o.name, vlabel: v.label || '', cat: o.cat || 'Roupas', cod: v.sku || o.cod || '', apelidos: o.apelidos || '', unid: o.unid || 'un', min: o.min == null ? 10 : o.min, preco: o.preco || '', custo: o.custo || '', q: { centro: 0, shopping: 0, norte: 0 } };
        var q = v.q || {}; if (typeof q === 'number') q = { centro: q }; for (var k in q) it.q[k] = Number(q[k]) || 0;
        s.items.push(it); if (!first) first = it;
      });
      s.vazio = false; s.lastId = first.id;
      CX.setToast('Produto cadastrado: ' + o.name + (vars.length > 1 ? ' (' + vars.length + ' variações)' : ''), false);
      return first;
    },
    item: function (id) { var s = load(); for (var i = 0; i < s.items.length; i++) if (s.items[i].id === Number(id)) return s.items[i]; return null; },
    total: function (it) { return (it.q.centro || 0) + (it.q.shopping || 0) + (it.q.norte || 0); },
    status: function (it) { var t = CX.total(it); return t === 0 ? 'zero' : (t <= it.min ? 'baixo' : 'ok'); },
    chip: function (st) {
      if (st === 'zero') return { t: 'Sem estoque', bg: '#FAD2CB', fg: '#7A1E10' };
      if (st === 'baixo') return { t: 'Acabando', bg: '#FFE0A3', fg: '#5A3A00' };
      return { t: 'Em estoque', bg: '#DDEFD8', fg: '#1F4D1A' };
    },
    sorted: function (list) {
      var rank = { zero: 0, baixo: 1, ok: 2 };
      return list.slice().sort(function (a, b) { var d = rank[CX.status(a)] - rank[CX.status(b)]; return d || a.name.localeCompare(b.name, 'pt-BR'); });
    },
    fmt: function (t) {
      var d = new Date(t), n = new Date(), p = function (x) { return (x < 10 ? '0' : '') + x; };
      var hm = p(d.getHours()) + ':' + p(d.getMinutes());
      var a = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime(), b = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      var diff = Math.round((a - b) / DAY);
      if (diff === 0) return 'Hoje ' + hm;
      if (diff === 1) return 'Ontem ' + hm;
      return p(d.getDate()) + '/' + p(d.getMonth() + 1) + ' ' + hm;
    },
    search: function (q) {
      var s = load(), toks = norm(q).split(/\s+/).filter(Boolean);
      if (!toks.length) return s.items.slice();
      return s.items.filter(function (it) {
        var hay = norm(it.name + ' ' + (it.vlabel || '') + ' ' + it.cod + ' ' + it.apelidos + ' ' + it.cat);
        var words = hay.split(/[\s,\-]+/);
        return toks.every(function (t) { return t.length <= 2 ? words.indexOf(t) >= 0 : hay.indexOf(t) >= 0; });
      });
    },
    suggest: function (q) {
      var s = load(), nq = norm(q), best = null, bd = 99;
      if (nq.length < 3) return null;
      s.items.forEach(function (it) {
        norm(it.name + ' ' + it.apelidos).split(/[\s,]+/).forEach(function (w) {
          if (w.length < 3) return;
          var d = lev(nq, w.slice(0, nq.length + 1));
          if (d < bd) { bd = d; best = it; }
        });
      });
      return bd <= 2 ? best : null;
    },
    snapshot: function () { var s = load(); s.prev = JSON.stringify({ items: s.items, mov: s.mov }); },
    setToast: function (msg, undo) { var s = load(); s.toast = { msg: msg, undo: !!undo, id: Date.now() }; save(); },
    takeToast: function () { var s = load(), t = s.toast; if (t) { s.toast = null; save(); } return t; },
    undo: function () {
      var s = load();
      if (!s.prev) return false;
      var p = JSON.parse(s.prev); s.items = p.items; s.mov = p.mov; s.prev = null;
      s.toast = { msg: 'Desfeito. O estoque voltou ao que era antes.', undo: false, id: Date.now() };
      save(); return true;
    },
    move: function (o) {
      var s = load(), it = CX.item(o.id), sign = o.tipo === 'entrada' ? 1 : -1;
      var qtd = Math.floor(Number(o.qtd));
      if (!it) return { ok: false, erro: 'Item não encontrado.' };
      if (!(qtd > 0)) return { ok: false, erro: 'Digite uma quantidade maior que zero.' };
      if (sign < 0 && qtd > (it.q[o.loja] || 0)) return { ok: false, erro: 'Só há ' + (it.q[o.loja] || 0) + ' ' + it.unid + ' na ' + CX.storeName(o.loja) + '.' };
      CX.snapshot();
      it.q[o.loja] = (it.q[o.loja] || 0) + sign * qtd; s.lastId = it.id;
      s.mov.unshift({ t: Date.now(), tipo: o.tipo, item: it.id, qtd: qtd, loja: o.loja, motivo: o.motivo, quem: s.userName || 'Você' });
      CX.setToast((sign > 0 ? 'Entrada registrada: +' : 'Saída registrada: −') + qtd + ' ' + CX.label(it), true);
      return { ok: true };
    },
    transfer: function (o) {
      var s = load(), it = CX.item(o.id), qtd = Math.floor(Number(o.qtd));
      if (!it) return { ok: false, erro: 'Item não encontrado.' };
      if (o.de === o.para) return { ok: false, erro: 'Escolha lojas diferentes para a origem e o destino.' };
      if (!(qtd > 0)) return { ok: false, erro: 'Digite uma quantidade maior que zero.' };
      if (qtd > (it.q[o.de] || 0)) return { ok: false, erro: 'Só há ' + (it.q[o.de] || 0) + ' ' + it.unid + ' na ' + CX.storeName(o.de) + '.' };
      CX.snapshot();
      it.q[o.de] -= qtd; it.q[o.para] = (it.q[o.para] || 0) + qtd; s.lastId = it.id;
      s.mov.unshift({ t: Date.now(), tipo: 'transf', item: it.id, qtd: qtd, de: o.de, para: o.para, motivo: 'Transferência', quem: s.userName || 'Você' });
      CX.setToast('Transferência feita: ' + qtd + ' ' + CX.label(it) + ' de ' + CX.storeName(o.de) + ' para ' + CX.storeName(o.para), true);
      return { ok: true };
    },
    ajuste: function (id, loja, contado, motivo) {
      var s = load(), it = CX.item(id);
      CX.snapshot();
      var antes = it.q[loja] || 0, dif = contado - antes;
      it.q[loja] = contado;
      s.mov.unshift({ t: Date.now(), tipo: 'ajuste', item: it.id, qtd: Math.abs(dif), sinal: dif >= 0 ? 1 : -1, loja: loja, motivo: motivo || 'Contagem', quem: s.userName || 'Você' });
    },
    addItem: function (o) { return CX.addProduto(o); },
    takeLast: function () { var s = load(), l = s.lastId; if (l) { s.lastId = null; save(); } return l; },
    sel: function () { var s = load(); return s.sel && s.sel.length ? s.sel : ['centro', 'shopping', 'norte']; },
    setSel: function (a) { var s = load(); s.sel = a; save(); },
    filter: function () { var s = load(); return s.filtro || { status: [], cat: [] }; },
    setFilter: function (f) { var s = load(); s.filtro = f; save(); },
    hash: function () { return (window.location.hash || '').replace(/^#/, ''); },
    go: function (url) { window.location.href = url; }
  };
  window.CX = CX;
})();
