// Darstellung für Auswahl-Übungen (art: 'auswahl'): Aufgaben mit Text und Antwortknöpfen, in Gruppen 1, 2, …
// Startbildschirm: alle Aufgaben im Überblick. Auswertung: die aktuelle Aufgabe groß, nach der Freigabe die Begründung.
// Gleiche Schnittstelle wie die Skizze (zuruecksetzen, zeigeWeg), dazu aufgabe() für die Beamer-Auswertung.
const Auswahl = (() => {
  function neu(klasse, eltern, text) {
    const el = document.createElement('div');
    el.className = klasse;
    if (text !== undefined) Pruefung.mix(el, text);
    if (eltern) eltern.appendChild(el);
    return el;
  }

  const gruppeVon = (uebung, a) => uebung.gruppen.find((g) => g.nr === a.gruppe);

  function erstelle(box, uebung, { kompakt = false, galerie = false } = {}) {
    const wurzel = neu('aussagen auswahl');
    box.replaceChildren(wurzel);
    const leer = { zuruecksetzen() {}, zeigeWeg() {} };
    if (kompakt) {
      box.classList.add('leer');
      return leer;
    }

    if (!galerie) {
      // Startbildschirm: je Gruppe die Frage und darunter die Teilaufgaben
      // Raster: Spalte 1 Gruppennummer, Spalte 2 Teilaufgabe, Spalte 3 Text
      const raster = neu('auswahl-raster', wurzel);
      const zelle = (klasse, text, fett) => {
        const el = document.createElement(fett ? 'strong' : 'span');
        el.className = klasse;
        if (text) Pruefung.mix(el, text);
        raster.appendChild(el);
      };
      for (const g of uebung.gruppen) {
        let nr = g.nr;
        if (g.text) {
          zelle('auswahl-nr', nr, true);
          zelle('auswahl-frage', g.text);
          nr = '';
        }
        for (const a of uebung.aufgaben.filter((x) => x.gruppe === g.nr)) {
          zelle('auswahl-nr', nr, true);
          zelle('auswahl-teil', a.teil, true);
          zelle('auswahl-satz', a.kurztext || a.text);
          nr = '';
        }
      }
      return leer;
    }

    // Auswertung: aktuelle Aufgabe, nach der Freigabe die Begründung
    const gruppe = neu('vorspann', wurzel);
    const text = neu('auswahl-text', wurzel);
    const kasten = neu('kasten auswahl-kasten', wurzel);
    let aktuell = null;

    function aufgabe(a) {
      aktuell = a;
      const g = gruppeVon(uebung, a);
      gruppe.hidden = !(g && g.text);
      if (g && g.text) Pruefung.mix(gruppe, g.text);
      text.replaceChildren(Object.assign(document.createElement('strong'), { textContent: a.nummer + ' ' }),
        Pruefung.mix(document.createElement('span'), a.text));
      kasten.replaceChildren(...(a.grund || []).map((t) => neu('kasten-grund', null, t)));
    }

    function zuruecksetzen() {
      wurzel.classList.remove('begruendet', 'bewegt');
    }

    function zeigeWeg(a, animieren) {
      if (a !== aktuell) aufgabe(a);
      zuruecksetzen();
      void wurzel.offsetWidth; // damit die Animation beim Wiederholen neu startet
      wurzel.classList.toggle('bewegt', !!animieren);
      wurzel.classList.add('begruendet');
    }

    return { zuruecksetzen, zeigeWeg, aufgabe };
  }

  return { erstelle };
})();
