# Animazione Card v1 — Filiera scroll-driven

Sezione con cards che entrano dal basso una alla volta, guidate dallo scroll.
Ogni card che esce costruisce la timeline numerata sulla sinistra.
Ultima card evidenziata con badge oro e titolo con gradiente metallico.

**Tecnologie:** GSAP + ScrollTrigger, CSS sticky, fromTo scrub

---

## Principi chiave

- `position: sticky; top: 0` su `#fl-pin` — nessun GSAP pin, nessun conflitto di layout
- Altezza della section impostata via JS prima che ScrollTrigger si inizializzi
- `scrub: true` — animazione segue lo scroll senza lag (evita che sembri già avanzata all'arrivo)
- `fromTo` su ogni tween — GSAP conosce sempre sia lo stato iniziale che finale, il reverse funziona sempre
- `onUpdate` per aggiungere/rimuovere la classe `.fl-done` sui dot della timeline

---

## CSS

```css
#filiera {
  /* height set via JS before ScrollTrigger init */
  background:
    radial-gradient(ellipse 50% 60% at 10% 50%, rgba(200,168,75,0.05) 0%, transparent 70%),
    radial-gradient(ellipse 40% 50% at 90% 50%, rgba(139,90,43,0.06) 0%, transparent 70%);
}

#fl-pin {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  gap: 64px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  overflow: hidden;
}

/* ── Left column ── */
.fl-left {
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.fl-intro { margin-bottom: 48px; }

.fl-intro h2 {
  font-size: clamp(26px, 2.8vw, 40px);
  line-height: 1.15;
  margin-top: 14px;
}

.fl-em {
  font-style: italic;
  background: linear-gradient(135deg, #C9A84B 0%, #F0D878 40%, #A8893A 65%, #E8D080 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Timeline list */
.fl-tl {
  position: relative;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.fl-tl-track {
  position: absolute;
  left: 6px; top: 8px; bottom: 8px;
  width: 2px;
  background: rgba(200,168,75,0.1);
  border-radius: 2px;
}

.fl-tl-fill {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 0%;
  background: linear-gradient(180deg, #C9A84B, #F0D878, #B7A66F);
  border-radius: 2px;
}

.fl-tl-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  position: relative;
}

.fl-tl-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(200,168,75,0.2);
  background: var(--bg);
  flex-shrink: 0;
  margin-left: -20px;
  position: relative;
  z-index: 1;
  transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.fl-tl-item.fl-done .fl-tl-dot {
  border-color: var(--gold);
  background: rgba(200,168,75,0.12);
  box-shadow: 0 0 8px rgba(200,168,75,0.3);
}

.fl-tl-dot-last {
  border-color: rgba(240,216,120,0.4) !important;
}

.fl-tl-item.fl-done.fl-tl-last-item .fl-tl-dot {
  border-color: #F0D878;
  box-shadow: 0 0 14px rgba(240,216,120,0.4);
  background: rgba(240,216,120,0.15);
}

.fl-tl-num {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--gold);
  flex-shrink: 0;
}

.fl-tl-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fl-tl-last-item .fl-tl-title {
  background: linear-gradient(90deg, #C9A84B, #F0D878);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 500;
}

/* ── Right column: cards ── */
.fl-right {
  flex: 1;
  position: relative;
  height: 400px;
}

.fl-card {
  position: absolute;
  inset: 0;
  background: rgba(26,22,16,0.9);
  border: 1px solid rgba(200,168,75,0.18);
  border-radius: 16px;
  padding: 44px 48px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  will-change: transform, opacity;
  backdrop-filter: blur(8px);
}

.fl-card-num {
  position: absolute;
  bottom: -10px;
  right: 20px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 180px;
  font-weight: 700;
  color: rgba(200,168,75,0.05);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.fl-card-body h3 {
  font-size: clamp(22px, 2.8vw, 34px);
  font-weight: 600;
  color: var(--text);
  margin-bottom: 14px;
  line-height: 1.2;
  position: relative;
}

.fl-card-body p {
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.75;
  max-width: 460px;
  position: relative;
}

/* Last card special */
.fl-card-last {
  border-color: rgba(200,168,75,0.45);
  box-shadow: 0 0 80px rgba(200,168,75,0.08), inset 0 1px 0 rgba(255,240,160,0.06);
}

.fl-card-last .fl-card-body h3 {
  font-size: clamp(26px, 3.2vw, 42px);
  background: linear-gradient(135deg, #C9A84B 0%, #F0D878 40%, #A8893A 65%, #E8D080 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.fl-card-badge {
  display: inline-flex;
  align-self: flex-start;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #0D0B08;
  background: linear-gradient(135deg, #C9A84B, #F0D878, #A8893A);
  padding: 5px 14px;
  border-radius: 4px;
  margin-bottom: 18px;
}
```

---

## HTML

```html
<section id="filiera">
  <div id="fl-pin">

    <!-- Left: intro + timeline -->
    <div class="fl-left">
      <div class="fl-intro">
        <span class="label">La nostra forza</span>
        <h2>Abbiamo davvero<br>il controllo di<br><em class="fl-em">tutta la filiera</em></h2>
      </div>
      <div class="fl-tl">
        <div class="fl-tl-track"><div class="fl-tl-fill" id="fl-tl-fill"></div></div>
        <div class="fl-tl-item" data-i="0"><div class="fl-tl-dot"></div><span class="fl-tl-num">01</span><span class="fl-tl-title">Partiamo dai campi</span></div>
        <div class="fl-tl-item" data-i="1"><div class="fl-tl-dot"></div><span class="fl-tl-num">02</span><span class="fl-tl-title">Raccogliamo il foraggio</span></div>
        <div class="fl-tl-item" data-i="2"><div class="fl-tl-dot"></div><span class="fl-tl-num">03</span><span class="fl-tl-title">Alleviamo le bovine</span></div>
        <div class="fl-tl-item" data-i="3"><div class="fl-tl-dot"></div><span class="fl-tl-num">04</span><span class="fl-tl-title">Lavoriamo la carne</span></div>
        <div class="fl-tl-item" data-i="4"><div class="fl-tl-dot"></div><span class="fl-tl-num">05</span><span class="fl-tl-title">Componiamo la tua box</span></div>
        <div class="fl-tl-item" data-i="5"><div class="fl-tl-dot"></div><span class="fl-tl-num">06</span><span class="fl-tl-title">Spediamo in tutta Italia</span></div>
        <div class="fl-tl-item fl-tl-last-item" data-i="6"><div class="fl-tl-dot fl-tl-dot-last"></div><span class="fl-tl-num">07</span><span class="fl-tl-title">I nostri Videocorsi</span></div>
      </div>
    </div>

    <!-- Right: cards -->
    <div class="fl-right">
      <div class="fl-card" data-i="0">
        <div class="fl-card-num">01</div>
        <div class="fl-card-body">
          <h3>Partiamo dai campi</h3>
          <p>Coltiviamo l'erba che diventerà il cibo delle nostre bovine.</p>
        </div>
      </div>
      <!-- ripetere per ogni card, ultima con classe fl-card-last e fl-card-badge -->
      <div class="fl-card fl-card-last" data-i="6">
        <div class="fl-card-num">07</div>
        <div class="fl-card-body">
          <div class="fl-card-badge">Ciò che ci distingue davvero</div>
          <h3>Ti insegniamo a cuocere<br>e trattare la carne</h3>
          <p>Con i nostri videocorsi.</p>
        </div>
      </div>
    </div>

  </div>
</section>
```

---

## JavaScript (GSAP + ScrollTrigger)

```javascript
const FL_CARDS = 7;
const FL_STEP  = 750; // px scroll per card
const flCards  = gsap.utils.toArray('.fl-card');
const flTlItems = gsap.utils.toArray('.fl-tl-item');
const flFill   = document.getElementById('fl-tl-fill');

// Initial state: card 0 visible, rest below
gsap.set(flCards[0], { y: 0, opacity: 1, scale: 1 });
for (let i = 1; i < FL_CARDS; i++) {
  gsap.set(flCards[i], { y: 90, opacity: 0, scale: 1 });
}
flTlItems.forEach(item => gsap.set(item, { opacity: 0, x: -12 }));
gsap.set(flFill, { height: '0%' });

// Set section height so sticky has scroll room
document.getElementById('filiera').style.height =
  `calc(100vh + ${FL_CARDS * FL_STEP}px)`;

const flTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#filiera',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,  // segue scroll senza lag — non usare valori numerici alti
    onUpdate: (self) => {
      const step = self.progress * FL_CARDS;
      flTlItems.forEach((item, i) => {
        const threshold = (i + 0.3) / FL_CARDS;
        if (step > threshold) item.classList.add('fl-done');
        else item.classList.remove('fl-done');
      });
    }
  }
});

for (let i = 0; i < FL_CARDS - 1; i++) {
  const t = i;

  // Card exits — fromTo garantisce il reverse corretto
  flTl.fromTo(flCards[i],
    { y: 0, opacity: 1, scale: 1 },
    { y: -70, opacity: 0, scale: 0.94, duration: 0.55, ease: 'power2.in' },
    t
  );

  // Timeline item appare da sinistra
  flTl.fromTo(flTlItems[i],
    { opacity: 0, x: -12 },
    { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    t + 0.15
  );

  // Linea cresce
  flTl.fromTo(flFill,
    { height: `${(i / FL_CARDS) * 100}%` },
    { height: `${((i + 1) / FL_CARDS) * 100}%`, duration: 0.4 },
    t + 0.15
  );

  // Card successiva entra dal basso
  flTl.fromTo(flCards[i + 1],
    { y: 90, opacity: 0, scale: 1 },
    { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
    t + 0.35
  );
}

// Ultimo item timeline + linea completa
flTl.fromTo(flTlItems[FL_CARDS - 1],
  { opacity: 0, x: -12 },
  { opacity: 1, x: 0, duration: 0.4 },
  FL_CARDS - 0.6
);
flTl.fromTo(flFill,
  { height: `${((FL_CARDS - 1) / FL_CARDS) * 100}%` },
  { height: '100%', duration: 0.4 },
  FL_CARDS - 0.6
);
```

---

## Note importanti

- **Non usare GSAP `pin: true`** su questa sezione — causa overlap con le sezioni adiacenti. Usare solo `position: sticky` CSS.
- **`scrub: true`** è obbligatorio. Valori numerici (es. 1.8) creano lag che fa sembrare l'animazione già avanzata quando si arriva alla sezione.
- **`fromTo` su ogni tween** — i `to` semplici non garantiscono il reverse corretto con scrub.
- L'altezza della section va impostata via JS **prima** della creazione del ScrollTrigger.
