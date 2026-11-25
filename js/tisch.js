// Knobelaufgabe „Wie hoch ist der Tisch?“ (art: 'tisch'): zwei Bilder mit Tisch, Katze und Schildkröte.
// Lösung als Animation: Bild 2 wird auf Bild 1 gestellt. Die Katzen decken sich, die beiden Maßpfeile
// 170 cm + 130 cm reichen dann genau über zwei Tischhöhen.
// Gleiche Schnittstelle wie die Skizze: zuruecksetzen() und zeigeWeg(aufgabe, animieren).
const Tisch = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  const S = 1.2;                    // Pixel je Zentimeter
  const BODEN = 400;
  const T = 150 * S, K = 45 * S, SK = 25 * S;   // Tisch, Katze, Schildkröte (T + K − SK = 170, T + SK − K = 130)
  const PLATTE = BODEN - T;         // Oberkante der Tischplatte
  const VERSATZ = 380;              // Bild 2 steht rechts neben Bild 1
  const KATZE_X = 110, KROETE_X = 190, PFEIL_X = 310;
  const KLEIN = [0, 140, 790, 275]; // Ausschnitt ohne Lösung
  const GROSS = [0, 0, 790, 415];   // Platz für die gestapelten Bilder

  function neu(name, attribute = {}, eltern) {
    const el = document.createElementNS(NS, name);
    for (const [k, v] of Object.entries(attribute)) el.setAttribute(k, v);
    if (eltern) eltern.appendChild(el);
    return el;
  }

  function tisch(g) {
    neu('rect', { class: 'tisch', x: 30, y: PLATTE, width: 240, height: 12, rx: 3 }, g);
    neu('rect', { class: 'tisch', x: 42, y: PLATTE + 12, width: 11, height: T - 12 }, g);
    neu('rect', { class: 'tisch', x: 247, y: PLATTE + 12, width: 11, height: T - 12 }, g);
  }

  // Sitzende Katze, Unterkante bei y, Höhe K
  function katze(g, x, y) {
    const k = neu('g', { class: 'katze' }, g);
    neu('path', { class: 'katze-schwanz', d: `M ${x + 14} ${y - 4} q 22 -2 18 -24` }, k);
    neu('ellipse', { cx: x, cy: y - 15, rx: 17, ry: 15 }, k);
    neu('circle', { cx: x, cy: y - 38, r: 11 }, k);
    neu('path', { d: `M ${x - 10} ${y - 42} L ${x - 9} ${y - K} L ${x - 2} ${y - 47} Z M ${x + 10} ${y - 42} L ${x + 9} ${y - K} L ${x + 2} ${y - 47} Z` }, k);
    return k;
  }

  // Schildkröte, Unterkante bei y, Höhe SK
  function kroete(g, x, y) {
    const s = neu('g', { class: 'kroete' }, g);
    neu('rect', { class: 'kroete-haut', x: x - 22, y: y - 8, width: 9, height: 8, rx: 3 }, s);
    neu('rect', { class: 'kroete-haut', x: x + 13, y: y - 8, width: 9, height: 8, rx: 3 }, s);
    neu('circle', { class: 'kroete-haut', cx: x + 32, cy: y - 14, r: 7 }, s);
    neu('path', { class: 'kroete-panzer', d: `M ${x - 30} ${y - 6} A 30 ${SK - 6} 0 0 1 ${x + 30} ${y - 6} Z` }, s);
    return s;
  }

  // Senkrechter Maßpfeil mit Hilfslinien und Beschriftung
  function mass(g, von, bis, text, xLinks) {
    const m = neu('g', { class: 'mass' }, g);
    for (const [y, x0] of [[von, xLinks[0]], [bis, xLinks[1]]]) neu('line', { class: 'hilfslinie', x1: x0, y1: y, x2: PFEIL_X + 8, y2: y }, m);
    neu('line', { x1: PFEIL_X, y1: von - 6, x2: PFEIL_X, y2: bis + 6 }, m);
    neu('path', { class: 'spitze', d: `M ${PFEIL_X} ${von} l -5 -9 h 10 Z M ${PFEIL_X} ${bis} l -5 9 h 10 Z` }, m);
    const t = neu('text', { x: PFEIL_X + 10, y: (von + bis) / 2 + 7 }, m);
    t.textContent = text;
    return m;
  }

  function bild(svg, katzeOben) {
    const g = neu('g', { class: 'tisch-bild' }, svg);
    neu('line', { class: 'boden', x1: 5, y1: BODEN, x2: 355, y2: BODEN }, g);
    tisch(g);
    if (katzeOben) {
      katze(g, KATZE_X, PLATTE);
      kroete(g, KROETE_X, BODEN);
      mass(g, BODEN - SK, PLATTE - K, '170 cm', [KROETE_X, KATZE_X]);
    } else {
      kroete(g, KROETE_X, PLATTE);
      katze(g, KATZE_X, BODEN);
      mass(g, BODEN - K, PLATTE - SK, '130 cm', [KATZE_X, KROETE_X]);
    }
    return g;
  }

  function erstelle(box, uebung, { kompakt = false, frage = false } = {}) {
    const wurzel = document.createElement('div');
    wurzel.className = 'aussagen tisch-aufgabe';
    if (!kompakt) wurzel.appendChild(Pruefung.mix(Object.assign(document.createElement('div'), { className: 'vorspann' }), uebung.vorspann));
    const svg = neu('svg', { class: 'tisch-skizze', viewBox: KLEIN.join(' '), role: 'img',
      'aria-label': 'Bild 1: Katze auf dem Tisch, Schildkröte auf dem Boden, Abstand 170 cm. Bild 2: Schildkröte auf dem Tisch, Katze auf dem Boden, Abstand 130 cm.' });
    wurzel.appendChild(svg);
    box.replaceChildren(wurzel);

    bild(svg, true);
    const zwei = bild(svg, false);
    zwei.classList.add('bild-zwei');
    zwei.style.transform = `translate(${VERSATZ}px, 0px)`;

    // Lösung: Klammer über zwei Tischhöhen und Rechnung rechts daneben
    const loesung = neu('g', { class: 'tisch-loesung' }, svg);
    const oben = PLATTE - T, x = 12;
    neu('path', { class: 'klammer', d: `M ${x + 10} ${BODEN} h -8 V ${oben} h 8` }, loesung);
    neu('line', { class: 'hilfslinie', x1: 30, y1: oben, x2: 270, y2: oben }, loesung);
    const zeilen = ['Katze auf Katze: Sie heben sich auf.', '170 cm + 130 cm = 2 · Tischhöhe', '2 · Tischhöhe = 300 cm', 'Tischhöhe = 150 cm'];
    zeilen.forEach((z, i) => {
      const t = neu('text', { class: 'rechnung' + (i === 3 ? ' ergebnis' : ''), x: 420, y: 120 + i * 52 }, loesung);
      t.textContent = z;
    });

    let lauf = 0;
    function setzeAusschnitt(v) { svg.setAttribute('viewBox', v.join(' ')); }

    function zuruecksetzen() {
      lauf++;
      svg.classList.remove('gestapelt', 'fertig', 'bewegt');
      zwei.style.transform = `translate(${VERSATZ}px, 0px)`;
      setzeAusschnitt(KLEIN);
    }

    function zeigeWeg(aufgabe, animieren) {
      zuruecksetzen();
      const ohneBewegung = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!animieren || ohneBewegung) {
        setzeAusschnitt(GROSS);
        zwei.style.transform = `translate(0px, ${-T}px)`;
        svg.classList.add('gestapelt', 'fertig');
        return;
      }
      const meinLauf = lauf;
      const start = performance.now();
      // 1. Ausschnitt vergrößern, 2. Bild 2 auf Bild 1 stellen, 3. Rechnung einblenden
      (function schritt(jetzt) {
        if (meinLauf !== lauf) return;
        const p = Math.min(1, (jetzt - start) / 700);
        const e = p * (2 - p);
        setzeAusschnitt(KLEIN.map((a, i) => a + (GROSS[i] - a) * e));
        if (p < 1) return requestAnimationFrame(schritt);
        void svg.getBoundingClientRect();
        svg.classList.add('bewegt', 'gestapelt');
        zwei.style.transform = `translate(0px, ${-T}px)`;
        setTimeout(() => { if (meinLauf === lauf) svg.classList.add('fertig'); }, 1700);
      })(start);
    }

    if (frage || kompakt) return { zuruecksetzen() {}, zeigeWeg() {} };
    return { zuruecksetzen, zeigeWeg };
  }

  return { erstelle };
})();
