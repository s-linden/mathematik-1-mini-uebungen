// Miniübungen: Skizze (Punkte, Vektoren, Beschriftung) und Aufgaben.
// Neue Übung: weiteren Eintrag nach demselben Muster ergänzen, sie erscheint dann in der Auswahl am Beamer.
//   vektoren: Name → [Startpunkt, Endpunkt]
//   marken:   Name → [x, y] der Beschriftung
//   weg:      Lösung als Weg durch die Skizze, [Vektor, +1 oder -1] (−1 = gegen die Pfeilrichtung)
//   aus:      Vektoren, die in der Aufgabe verwendet werden dürfen
const UEBUNGEN = {
  'vektoren-vieleck': {
    titel: 'Addition und Subtraktion von Vektoren',
    hinweis: 'Bestimmen Sie die Vektoren. Wählen Sie die passenden Summanden durch Antippen nacheinander aus.',
    viewBox: '25 8 610 345',
    // Nur die Abhängigkeiten zwischen den Vektoren zählen; die Punkte sind so gewählt,
    // dass die Pfeile an jedem Eckpunkt weit auseinanderlaufen.
    punkte: {
      O: [320, 30],   // oben
      R: [590, 110],  // rechts oben
      U: [560, 330],  // unten rechts
      L: [130, 330],  // unten links
      W: [50, 100],   // links
    },
    vektoren: {
      a: ['O', 'L'],
      b: ['L', 'R'],
      c: ['L', 'U'],
      d: ['L', 'W'],
      e: ['U', 'W'],
      f: ['U', 'R'],
      g: ['O', 'R'],
      h: ['O', 'W'],
    },
    marken: {
      a: [231, 137],
      b: [374, 199],
      c: [345, 321],
      d: [108, 218],
      e: [312, 205],
      f: [594, 232],
      g: [447, 103],
      h: [193, 105],
    },
    aufgaben: [
      { id: '1', ziel: 'g', aus: ['a', 'b'], weg: [['a', 1], ['b', 1]] },
      { id: '2', ziel: 'f', aus: ['b', 'c'], weg: [['c', -1], ['b', 1]] },
      { id: '3', ziel: 'e', aus: ['c', 'd'], weg: [['c', -1], ['d', 1]] },
      { id: '4', ziel: 'e', aus: ['f', 'g', 'h'], weg: [['f', 1], ['g', -1], ['h', 1]] },
    ],
  },

  // Übung mit Auswahlaufgaben (art: 'aussagen', Aufgaben mit art: 'wahl'). Texte enthalten Formeln zwischen $…$.
  //   vor, nach: Satzteile vor und hinter der Lücke; luecke: Platzhalter vor der Auflösung
  //   pfeil: true = die Optionen stehen als Pfeilspalte auf dem Startbildschirm
  'logischer-schluss': {
    titel: 'Notwendige und hinreichende Bedingung',
    art: 'aussagen',
    hinweis: '',
    vorspann: String.raw`Seien $a, b \in \mathbb{R}$.`,
    links: '$a+b=0$',
    rechts: '$a=b=0$',
    // Kasten, der bei der Lösung erscheint: gilt die jeweilige Richtung, und warum (nicht)?
    begruendung: [
      { richtung: String.raw`$a=b=0 \Rightarrow a+b=0$`, gilt: true, grund: 'Denn: $0+0=0$' },
      { richtung: String.raw`$a+b=0 \Rightarrow a=b=0$`, gilt: false, grund: String.raw`Gegenbeispiel: $a=1,\ b=-1$ ergibt $a+b=0$` },
    ],
    aufgaben: (() => {
      const bedingung = [
        { wert: 'k', anzeige: 'keine' },
        { wert: 'n', anzeige: 'eine notwendige' },
        { wert: 'h', anzeige: 'eine hinreichende' },
        { wert: 'b', anzeige: 'eine notwendige und hinreichende' },
      ];
      return [
        {
          id: 'i', art: 'wahl', pfeil: true, nummer: 'i)', kopf: 'i) Wählen Sie den richtigen logischen Schluss aus:',
          vor: '$a+b=0$', luecke: '?', nach: '$a=b=0$',
          optionen: [
            { wert: 'l', anzeige: String.raw`$\Leftarrow$` },
            { wert: 'r', anzeige: String.raw`$\Rightarrow$` },
            { wert: 'b', anzeige: String.raw`$\Leftrightarrow$` },
          ],
          richtig: 'l',
        },
        {
          id: 'ii', art: 'wahl', nummer: 'ii)', kopf: 'ii)', vorab: 'Ergänzen Sie die folgenden Sätze:',
          vor: '$a+b=0$ ist', luecke: '…', nach: 'Bedingung für $a=b=0$.',
          optionen: bedingung, richtig: 'n',
        },
        {
          id: 'iii', art: 'wahl', nummer: 'iii)', kopf: 'iii)',
          vor: '$a=b=0$ ist', luecke: '…', nach: 'Bedingung für $a+b=0$.',
          optionen: bedingung, richtig: 'h',
        },
      ];
    })(),
  },

  // Übung mit Vektorpaaren im R² (art: 'paare'): Die Studierenden geben je Teilaufgabe zwei Vektoren ein.
  //   test: welche Eigenschaft geprüft wird (siehe Pruefung.kategorie); beispiel: wird bei der Lösung gezeigt
  //   beobachtung: bei der Lösung zeigen, wie viele richtige Paare auch eine andere Teilaufgabe erfüllen
  'vektorpaare': {
    titel: 'Orthogonal, (anti)parallel, linear (un)abhängig',
    art: 'paare',
    // Klick auf „Auswertung“ beendet die Abgabe und gibt alle Teilaufgaben frei (Rückmeldung sofort auf den Handys)
    freigabeBeiAuswertung: true,
    // Startbildschirm: Auflistung mit „liste“ der Teilaufgaben, danach dieser Satzschluss
    nachsatz: 'sind.',
    hinweis: '',
    vorspann: String.raw`Geben Sie zwei Vektoren $\vec{a}, \vec{b} \in \mathbb{R}^2$ mit $\vec{a}, \vec{b} \neq \vec{0}$ an, die`,
    // „parallel“ wie im Skript: a = s·b mit s > 0; „antiparallel“: a = s·b mit s < 0
    aufgaben: [
      { id: 'i', art: 'paar', nummer: 'i)', eigenschaft: 'orthogonal sind', liste: 'orthogonal,', test: 'orthogonal', beispiel: [[1, 2], [-2, 1]], beobachtung: 'v' },
      { id: 'ii', art: 'paar', nummer: 'ii)', eigenschaft: 'parallel sind', liste: 'parallel,', test: 'parallel', beispiel: [[1, 2], [2, 4]], beobachtung: 'iv' },
      { id: 'iii', art: 'paar', nummer: 'iii)', eigenschaft: 'antiparallel sind', liste: 'antiparallel,', test: 'antiparallel', beispiel: [[1, 2], [-1, -2]], beobachtung: 'iv' },
      { id: 'iv', art: 'paar', nummer: 'iv)', eigenschaft: 'linear abhängig sind', liste: 'linear abhängig,', test: 'abhaengig', beispiel: [[1, 2], [-2, -4]], beobachtung: 'ii' },
      { id: 'v', art: 'paar', nummer: 'v)', eigenschaft: 'linear unabhängig sind', liste: 'linear unabhängig', test: 'unabhaengig', beispiel: [[1, 2], [3, 1]] },
    ],
  },

  // Auswahl-Übung (art: 'auswahl'): Aufgaben in Gruppen (gruppen: Nummer und Frage), je Aufgabe Text, Optionen, richtige Antwort
  //   frage: kurze Frage für die Beamer-Auswertung
  //   mehrfach: true = mehrere Antworten wählbar, richtig ist dann eine Liste
  //   untereinander: true = Antwortknöpfe untereinander (für lange Formeln)
  //   grund: Zeilen der Begründung, die bei der Lösung erscheinen
  'gleichungen-geraden-ebenen': {
    titel: 'Lösungen von Gleichungen, Geraden und Ebenen',
    art: 'auswahl',
    hinweis: '',
    gruppen: [
      { nr: '1', text: String.raw`Wie viele Lösungen $x \in \mathbb{R}$ hat die Gleichung?` },
      { nr: '2', text: '' },
    ],
    aufgaben: (() => {
      const anzahl = [
        { wert: '0', anzeige: 'keine' },
        { wert: '1', anzeige: 'genau eine' },
        { wert: '2', anzeige: 'genau zwei' },
        { wert: 'u', anzeige: 'unendlich viele' },
      ];
      const v = (a, b, c) => String.raw`\begin{pmatrix} ${a} \\ ${b} \\ ${c} \end{pmatrix}`;
      const gleichung = (teil, tex, richtig, grund) => ({
        id: '1' + teil, art: 'wahl', gruppe: '1', teil: teil + ')', nummer: `1${teil})`,
        text: `$${tex}$`, frage: `Wie viele Lösungen hat $${tex}$?`, optionen: anzahl, richtig, grund,
      });
      return [
        {
          ...gleichung('i', '3x-1=5', '1', [String.raw`$3x-1=5 \;\Leftrightarrow\; 3x=6 \;\Leftrightarrow\; x=2$`]),
          vorab: String.raw`1  Wie viele Lösungen $x \in \mathbb{R}$ hat die Gleichung?`,
        },
        gleichung('ii', 'x^2=4', '2', [String.raw`$x=2$ und $x=-2$, denn $(\pm 2)^2=4$`]),
        gleichung('iii', '(x+1)^2=x^2+2x', '0', [
          String.raw`$(x+1)^2=x^2+2x+1$, also`,
          String.raw`$x^2+2x+1=x^2+2x \;\Leftrightarrow\; 1=0$: Widerspruch`,
        ]),
        gleichung('iv', String.raw`\sin^2(x)+\cos^2(x)=1`, 'u', [String.raw`Die Gleichung gilt für alle $x \in \mathbb{R}$.`]),
        {
          id: '2i', art: 'wahl', gruppe: '2', teil: 'i)', nummer: '2i)', untereinander: true,
          text: String.raw`Welche Gleichung beschreibt die Gerade durch $P=(1,0,2)$ und $Q=(3,1,2)$?`,
          frage: String.raw`Gerade durch $P=(1,0,2)$ und $Q=(3,1,2)$`,
          optionen: [
            { wert: 'a', anzeige: String.raw`$\vec{x}=Q+s\cdot${v(-2, -1, 0)}$` },
            { wert: 'b', anzeige: String.raw`$\vec{x}=P+s\cdot${v(3, 1, 2)}$` },
            { wert: 'c', anzeige: String.raw`$\vec{x}=${v(2, 1, 0)}+s\cdot${v(1, 0, 2)}$` },
          ],
          richtig: 'a',
          grund: [
            String.raw`Richtungsvektor $\overrightarrow{QP}=P-Q=${v(-2, -1, 0)}$, Aufpunkt $Q$`,
            String.raw`$${v(3, 1, 2)}$ gehört zum Punkt $Q$, ist aber kein Richtungsvektor der Geraden.`,
            String.raw`$${v(2, 1, 0)}$ ist ein Richtungsvektor, aber kein Punkt der Geraden.`,
          ],
        },
        {
          id: '2ii', art: 'wahl', gruppe: '2', teil: 'ii)', nummer: '2ii)', mehrfach: true,
          text: String.raw`Welche Vektoren sind Normalenvektoren der Ebene $E: x+y-z=1$?`,
          frage: String.raw`Normalenvektoren von $E: x+y-z=1$`,
          optionen: [
            { wert: 'a', anzeige: `$${v(1, 1, -1)}$` },
            { wert: 'b', anzeige: `$${v(1, 1, 1)}$` },
            { wert: 'c', anzeige: `$${v(-2, -2, 2)}$` },
          ],
          richtig: ['a', 'c'],
          grund: [
            String.raw`Die Koeffizienten von $x$, $y$, $z$ bilden einen Normalenvektor: $\vec{n}=${v(1, 1, -1)}$`,
            String.raw`Jedes Vielfache $\neq\vec{0}$ ist auch einer, z. B. $${v(-2, -2, 2)}=-2\vec{n}$`,
            String.raw`$${v(1, 1, 1)}$ ist kein Vielfaches von $\vec{n}$.`,
          ],
        },
      ];
    })(),
  },
};
