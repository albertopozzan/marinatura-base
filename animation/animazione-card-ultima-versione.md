# Animazione Card — Filiera scroll-driven (ultima versione)

Sezione con cards che entrano dal basso una alla volta, guidate dallo scroll.
Timeline verticale sulla sinistra con linea animata e dot luminoso che scorre.
Ultima card evidenziata con badge oro e titolo con gradiente metallico.
Versione mobile con header separato, icon strip e progress bar orizzontale.

**Tecnologie:** GSAP + ScrollTrigger, CSS sticky, fromTo scrub, Lucide icons

---

## Differenze rispetto a v1

- Timeline semplificata: rimossi `.fl-tl-dot` e `.fl-tl-num` — solo titolo testo
- Aggiunto pseudo-element `::after` su `.fl-tl-fill` — dot dorato che viaggia con la linea
- `.fl-card-num` nascosto via CSS (`display: none`)
- Layout mobile completo: header, icon strip (Lucide + SVG custom), progress bar orizzontale
- `isMobile` detection in JS — `FL_STEP` ridotto a 500px su mobile
- Calcolo esplicito altezza `.fl-right` su mobile
- `immediateRender: false` sulle card in uscita per garantire reverse corretto
- `invalidateOnRefresh: true` sul ScrollTrigger

---

## CSS

```css
/* ─── FILIERA ─── */
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

/* Dot that travels with the fill */
.fl-tl-fill::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 8px rgba(200,168,75,0.6);
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
  /* Initial state: hidden below — GSAP overrides on init */
  opacity: 0;
  transform: translateY(90px);
}

.fl-card[data-i="0"] {
  opacity: 1;
  transform: translateY(0);
}

.fl-card-num { display: none; }

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

/* ─── FILIERA MOBILE ─── */
.fl-mobile-header  { display: none; }
.fl-mobile-progress { display: none; }
.fl-icon-strip { display: none; }

@media (max-width: 768px) {
  /* Restack as column, header → progress → cards */
  #fl-pin {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0;
    justify-content: flex-start;
    max-width: 100%;
    margin: 0;
  }

  .fl-left { display: none; }

  /* Mobile header */
  .fl-mobile-header {
    display: block;
    flex-shrink: 0;
    padding: 52px 20px 16px;
  }
  .fl-mobile-header h2 {
    font-size: clamp(26px, 7vw, 36px);
    margin-top: 10px;
  }

  /* Icon strip */
  .fl-icon-strip {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 16px;
    gap: 4px;
  }

  .fl-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
    opacity: 0.12;
    transform: scale(0.55);
    transition: opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease;
    flex: 1;
  }

  .fl-icon svg,
  .fl-icon i svg {
    width: 26px;
    height: 26px;
    display: block;
    stroke-width: 1.5;
  }

  /* Past icon: small but visible */
  .fl-icon.fl-icon-past {
    opacity: 0.35;
    transform: scale(0.72);
  }

  /* Active icon: full size, bright */
  .fl-icon.fl-icon-active {
    opacity: 1;
    transform: scale(1);
    filter: drop-shadow(0 0 6px rgba(200,168,75,0.5));
  }

  /* Last icon active: extra prominent */
  .fl-icon.fl-icon-active[data-i="6"] {
    transform: scale(1.28);
    filter: drop-shadow(0 0 10px rgba(240,216,120,0.7));
  }

  /* Horizontal progress bar */
  .fl-mobile-progress {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 14px;
    padding: 0 20px 16px;
  }
  .fl-mob-track {
    flex: 1;
    height: 2px;
    background: rgba(200,168,75,0.15);
    border-radius: 2px;
    position: relative;
  }
  .fl-mob-fill {
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 0%;
    background: linear-gradient(90deg, #C9A84B, #F0D878);
    border-radius: 2px;
  }
  .fl-mob-fill::after {
    content: '';
    position: absolute;
    right: -4px; top: 50%;
    transform: translateY(-50%);
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 8px rgba(200,168,75,0.6);
  }
  .fl-mob-counter {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: var(--gold);
    flex-shrink: 0;
  }

  /* Cards area */
  .fl-right {
    flex: 1;
    height: auto;
    margin: 0 16px 24px;
  }

  /* Card adjustments */
  .fl-card {
    padding: 28px 24px;
    border-radius: 12px;
  }
  .fl-card-body h3 {
    font-size: clamp(18px, 5.5vw, 24px);
    margin-bottom: 10px;
  }
  .fl-card-body p {
    font-size: 14px;
    line-height: 1.65;
    max-width: 100%;
  }
  .fl-card-last .fl-card-body h3 {
    font-size: clamp(20px, 6vw, 28px);
  }
  .fl-card-badge {
    font-size: 9px;
    padding: 4px 10px;
    margin-bottom: 12px;
  }
}
```

---

## HTML

```html
<!-- ═══ FILIERA ═══ -->
<section id="filiera">
  <div id="fl-pin">

    <!-- Mobile only: header + icon strip + progress bar -->
    <div class="fl-mobile-header">
      <span class="label">La nostra forza</span>
      <h2>Abbiamo davvero<br>il controllo di<br><em class="fl-em">tutta la filiera</em></h2>
    </div>

    <div class="fl-icon-strip" id="fl-icon-strip">
      <div class="fl-icon" data-i="0"><i data-lucide="leaf"></i></div>
      <div class="fl-icon" data-i="1"><i data-lucide="tractor"></i></div>
      <div class="fl-icon" data-i="2">
        <!-- Custom barn SVG -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 10 L12 2 L22 10"/>
          <path d="M4 10 L4 22 L20 22 L20 10"/>
          <line x1="2" y1="10" x2="4" y2="10"/>
          <line x1="20" y1="10" x2="22" y2="10"/>
          <path d="M9 22 L9 16 Q9 13 12 13 Q15 13 15 16 L15 22"/>
          <circle cx="12" cy="6.5" r="1.5"/>
        </svg>
      </div>
      <div class="fl-icon" data-i="3"><i data-lucide="beef"></i></div>
      <div class="fl-icon" data-i="4"><i data-lucide="package-2"></i></div>
      <div class="fl-icon" data-i="5">
        <!-- Custom refrigerated van SVG -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="4" width="13" height="11" rx="1"/>
          <line x1="7.5" y1="6.5" x2="7.5" y2="12.5"/>
          <line x1="4.5" y1="9.5" x2="10.5" y2="9.5"/>
          <line x1="5.5" y1="7.5" x2="9.5" y2="11.5"/>
          <line x1="5.5" y1="11.5" x2="9.5" y2="7.5"/>
          <path d="M14 7.5 L14 15 L22 15 L22 11 L20 7.5 Z"/>
          <path d="M15 8.5 L15 11.5 L21 11.5 L19.5 8.5 Z"/>
          <circle cx="5" cy="17.5" r="2"/>
          <circle cx="19.5" cy="17.5" r="2"/>
        </svg>
      </div>
      <div class="fl-icon" data-i="6"><i data-lucide="book-open"></i></div>
    </div>

    <div class="fl-mobile-progress">
      <div class="fl-mob-track"><div class="fl-mob-fill" id="fl-mob-fill"></div></div>
      <span class="fl-mob-counter" id="fl-mob-counter">01 / 07</span>
    </div>

    <!-- Left: intro + timeline (desktop only) -->
    <div class="fl-left">
      <div class="fl-intro">
        <span class="label">La nostra forza</span>
        <h2>Abbiamo davvero<br>il controllo di<br><em class="fl-em">tutta la filiera</em></h2>
      </div>
      <div class="fl-tl">
        <div class="fl-tl-track"><div class="fl-tl-fill" id="fl-tl-fill"></div></div>
        <div class="fl-tl-item" data-i="0"><span class="fl-tl-title">Partiamo dai campi</span></div>
        <div class="fl-tl-item" data-i="1"><span class="fl-tl-title">Raccogliamo il foraggio</span></div>
        <div class="fl-tl-item" data-i="2"><span class="fl-tl-title">Alleviamo le bovine</span></div>
        <div class="fl-tl-item" data-i="3"><span class="fl-tl-title">Lavoriamo la carne</span></div>
        <div class="fl-tl-item" data-i="4"><span class="fl-tl-title">Componiamo la tua box</span></div>
        <div class="fl-tl-item" data-i="5"><span class="fl-tl-title">Spediamo in tutta Italia</span></div>
        <div class="fl-tl-item fl-tl-last-item" data-i="6"><span class="fl-tl-title">I nostri Videocorsi</span></div>
      </div>
    </div>

    <!-- Right: cards -->
    <div class="fl-right">

      <div class="fl-card" data-i="0">
        <div class="fl-card-num">01</div>
        <div class="fl-card-body">
          <h3>Partiamo dai campi</h3>
          <p>Coltiviamo l'erba che diventerà il cibo delle nostre bovine. Sappiamo esattamente cosa cresce nel terreno prima ancora che arrivi in stalla.</p>
        </div>
      </div>

      <div class="fl-card" data-i="1">
        <div class="fl-card-num">02</div>
        <div class="fl-card-body">
          <h3>Raccogliamo il foraggio</h3>
          <p>Con il metodo del pre-appassimento — un'innovazione che preserva i nutrienti chiave. Nessun compromesso sulla qualità dell'alimentazione.</p>
        </div>
      </div>

      <div class="fl-card" data-i="2">
        <div class="fl-card-num">03</div>
        <div class="fl-card-body">
          <h3>Alleviamo le bovine</h3>
          <p>In spazi ampi, con lettiera a paglia. Benessere animale non come slogan ma come scelta quotidiana che si sente nella carne.</p>
        </div>
      </div>

      <div class="fl-card" data-i="3">
        <div class="fl-card-num">04</div>
        <div class="fl-card-body">
          <h3>Lavoriamo la carne</h3>
          <p>Direttamente nel nostro laboratorio agricolo. Ogni taglio selezionato e lavorato con la stessa cura con cui abbiamo allevato l'animale.</p>
        </div>
      </div>

      <div class="fl-card" data-i="4">
        <div class="fl-card-num">05</div>
        <div class="fl-card-body">
          <h3>Componiamo la tua box</h3>
          <p>Personalizzata su misura. Scegli i tagli, definiamo le quantità. La tua box è unica, come le tue esigenze.</p>
        </div>
      </div>

      <div class="fl-card" data-i="5">
        <div class="fl-card-num">06</div>
        <div class="fl-card-body">
          <h3>Spediamo in tutta Italia</h3>
          <p>Con furgoni a temperatura controllata. Consegna garantita in 24–72 ore. La catena del freddo non si rompe mai.</p>
        </div>
      </div>

      <div class="fl-card fl-card-last" data-i="6">
        <div class="fl-card-num">07</div>
        <div class="fl-card-body">
          <div class="fl-card-badge">Ciò che ci distingue davvero</div>
          <h3>Ti insegniamo a cuocere<br>e trattare la carne</h3>
          <p>Con i nostri videocorsi. Perché vendere carne di qualità non basta — vogliamo che tu sappia valorizzarla al massimo, ogni volta.</p>
        </div>
      </div>

    </div>
  </div>
</section>
```

---

## JavaScript (GSAP + ScrollTrigger)

```javascript
// ─── Filiera animation ───
const FL_CARDS   = 7;
const isMobile   = window.innerWidth < 768;
const FL_STEP    = isMobile ? 500 : 750;
const flCards    = gsap.utils.toArray('.fl-card');
const flTlItems  = gsap.utils.toArray('.fl-tl-item');
const flFill     = document.getElementById('fl-tl-fill');
const flMobFill  = document.getElementById('fl-mob-fill');
const flMobCount = document.getElementById('fl-mob-counter');

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

// On mobile, give .fl-right an explicit height so absolute cards have a reference
if (isMobile) {
  const headerH   = document.querySelector('.fl-mobile-header').offsetHeight;
  const progressH = document.querySelector('.fl-mobile-progress').offsetHeight;
  const cardH     = window.innerHeight - headerH - progressH - 40;
  document.querySelector('.fl-right').style.height = cardH + 'px';
}

const flTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#filiera',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const step = self.progress * FL_CARDS;

      // Desktop: dot timeline
      flTlItems.forEach((item, i) => {
        const threshold = (i + 0.3) / FL_CARDS;
        if (step > threshold) item.classList.add('fl-done');
        else item.classList.remove('fl-done');
      });

      // Mobile: horizontal progress bar + counter + icons
      if (flMobFill) {
        flMobFill.style.width = (self.progress * 100) + '%';
        const current = Math.min(Math.floor(step) + 1, FL_CARDS);
        flMobCount.textContent =
          String(current).padStart(2, '0') + ' / ' + String(FL_CARDS).padStart(2, '0');

        // Update icons
        const activeIndex = Math.min(Math.floor(step), FL_CARDS - 1);
        document.querySelectorAll('.fl-icon').forEach((icon, i) => {
          icon.classList.remove('fl-icon-past', 'fl-icon-active');
          if (i < activeIndex) icon.classList.add('fl-icon-past');
          else if (i === activeIndex) icon.classList.add('fl-icon-active');
        });
      }
    }
  }
});

for (let i = 0; i < FL_CARDS - 1; i++) {
  const t = i;

  // Card exits — immediateRender:false prevents FROM state overriding the enter tween
  flTl.fromTo(flCards[i],
    { y: 0, opacity: 1, scale: 1, immediateRender: false },
    { y: -70, opacity: 0, scale: 0.94, duration: 0.55, ease: 'power2.in' },
    t
  );

  // Timeline item appears
  flTl.fromTo(flTlItems[i],
    { opacity: 0, x: -12 },
    { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    t + 0.15
  );

  // Line grows
  flTl.fromTo(flFill,
    { height: `${(i / FL_CARDS) * 100}%` },
    { height: `${((i + 1) / FL_CARDS) * 100}%`, duration: 0.4 },
    t + 0.15
  );

  // Next card enters from below
  flTl.fromTo(flCards[i + 1],
    { y: 90, opacity: 0, scale: 1 },
    { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
    t + 0.35
  );
}

// Last timeline item + full line
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

- **Non usare GSAP `pin: true`** — causa overlap con le sezioni adiacenti. Usare solo `position: sticky` CSS.
- **`scrub: true`** è obbligatorio. Valori numerici creano lag che fa sembrare l'animazione già avanzata.
- **`fromTo` su ogni tween** — i `to` semplici non garantiscono il reverse corretto con scrub.
- **`immediateRender: false`** sulle card in uscita — evita che il FROM state sovrascriva lo stato di ingresso della card successiva.
- **`invalidateOnRefresh: true`** — ricalcola posizioni se la pagina viene ridimensionata.
- L'altezza della section va impostata via JS **prima** della creazione del ScrollTrigger.
- Su mobile: calcolare l'altezza di `.fl-right` sottraendo header + progress bar dall'altezza viewport.
