# Stile Brand — La Bottega della Sorana

Linee guida di design per tutte le landing page del brand.

---

## Identità del brand

**Nome:** La Bottega della Sorana
**Settore:** Carne bovina premium, filiera completa (coltivazione → allevamento → macellazione → vendita)
**Valori:** Esclusività, genuinità, salute, trasparenza, controllo totale della filiera
**Tono di voce:** Diretto, sicuro di sé, autorevole — mai arrogante

---

## Palette colori

### Sfondo
- Principale: `#0D0B08` — nero caldo, non freddo. Evoca terra, profondità, qualità
- Secondario: `#1A1610` — per card, sezioni alternate, layer sovrapposti

### Accento principale — Oro
- Oro brand: `#B7A66F`
- Oro chiaro (hover, highlights): `#CFC08E`
- Oro scuro (ombre, bordi sottili): `#8A7A4E`
- Usare l'oro con parsimonia: linee divisorie, titoli in evidenza, CTA, icone, bordi card

### Testo
- Primario: `#F5EFE0` — bianco caldo, mai bianco puro
- Secondario: `#A89880` — testo secondario, label, caption
- Disabilitato: `#5C5040`

### Colori funzionali
- CTA principale: sfondo oro `#C8A84B`, testo `#0D0B08`
- CTA secondario: bordo oro, sfondo trasparente, testo oro
- Errore form: `#C0392B`
- Successo form: `#2ECC71`

---

## Tipografia

### Font
- **Titoli (H1, H2):** Cormorant Garamond — serif elegante, trasmette lusso e tradizione
  - `https://fonts.google.com/specimen/Cormorant+Garamond`
  - Peso: 600–700
- **Sottotitoli (H3, H4):** DM Sans — moderno, pulito, leggibile
  - `https://fonts.google.com/specimen/DM+Sans`
  - Peso: 400–500
- **Body:** DM Sans — peso 400
- **Accent/Label:** DM Sans uppercase letterspacing 0.1em — peso 500

### Scala tipografica
- H1: 64–80px (desktop) / 40–48px (mobile)
- H2: 48–56px / 32–36px
- H3: 28–32px / 22–24px
- Body: 16–18px
- Caption/Label: 12–14px

### Regole
- MAI usare Inter, Arial o Roboto per i titoli
- I titoli H1 possono mescolare peso normal e bold nella stessa riga per creare contrasto
- Line-height titoli: 1.1–1.2 — compatto e impattante
- Line-height body: 1.6–1.7 — leggibile e ariosa

---

## Atmosfera visiva

### Sfondo
- Mai piatto e solido. Sempre con profondità:
  - Gradiente radiale in basso a sinistra: `rgba(200, 168, 75, 0.06)` — alone oro caldo
  - Gradiente radiale in alto a destra: `rgba(139, 90, 43, 0.08)` — alone ambra
  - Texture grana leggera sovrapposta (SVG noise, `mix-blend-mode: overlay`, opacità 3–5%)

### Card e sezioni
- Bordo sottile `1px solid rgba(200, 168, 75, 0.2)` — oro semi-trasparente
- Background card: `rgba(26, 22, 16, 0.8)` con `backdrop-filter: blur(10px)`
- Border-radius: 8–12px — moderno ma non infantile

### Linee decorative
- Linee orizzontali divisorie: gradiente da trasparente → oro → trasparente
- Separatori sezione: mai un `<hr>` semplice

### Immagini
- Overlay scuro sulle immagini di sfondo: `rgba(13, 11, 8, 0.5)` per mantenere leggibilità
- Le immagini di carne lavorata e piatti vanno mostrate con luce calda, mai fredda
- Bordo immagini premium: `2px solid rgba(200, 168, 75, 0.3)`

---

## Animazioni

### Scroll animations (GSAP + ScrollTrigger)
- Fade-in dal basso: `y: 40, opacity: 0` → `y: 0, opacity: 1`, duration 0.8s, ease "power2.out"
- Stagger elementi griglia: 0.15s
- Linee decorative: animazione width da 0% a 100% quando entrano nel viewport

### Micro-interazioni (CSS transitions)
- Hover su CTA: `transform: translateY(-2px)`, box-shadow oro, duration 300ms
- Hover su card: `transform: scale(1.02)`, border oro più luminoso, duration 300ms
- Tutti i link e bottoni: transition 250–300ms ease

### Regola
- Animazioni con scopo, non decorative. Ogni animazione deve guidare l'attenzione verso il contenuto

---

## Struttura landing page — Corso Marinatura

### Flusso pagina
1. **Hero** — Headline forte + video di vendita in evidenza + CTA al form
2. **Form a passaggi** — Step 1: inserimento email (salvata nel DB) → Step 2: checkout
3. **Referenze e credibilità** — Press, riconoscimenti, numeri (anni di esperienza, capi allevati, clienti)
4. **Chi sono** — Storytelling diretto: allevatore + macellaio esperto di tagli e cotture
5. **Footer** — Minimal, link essenziali, logo, copyright

### Form a passaggi — regole UX
- Step indicator visibile (1 → 2)
- Step 1: solo campo email + CTA "Voglio il corso"
- Step 2: checkout — si attiva SOLO dopo conferma email
- Feedback visivo immediato ad ogni step (micro-animazione di avanzamento)
- Mai mostrare il checkout prima della cattura email

### Hero
- Headline: max 8–10 parole, impatto immediato
- Sottotitolo: 1–2 righe, beneficio concreto
- Video: prominente, autoplay muted con play esplicito, bordo oro
- CTA sotto il video: bottone oro grande, testo diretto ("Entra nel corso")

---

## Componenti UI

### Bottoni
- Primario: background oro `#C8A84B`, testo nero `#0D0B08`, font DM Sans 500, padding 16px 32px, border-radius 6px
- Secondario: bordo `1px solid #C8A84B`, testo oro, background trasparente
- Hover primario: `#E2C470`, translateY(-2px), shadow oro
- MAI bottoni con border-radius > 8px (troppo infantile)

### Form inputs
- Background: `rgba(255,255,255,0.05)`
- Bordo: `1px solid rgba(200, 168, 75, 0.3)`
- Focus: bordo oro pieno `#C8A84B`, glow sottile
- Placeholder: `#A89880`
- Testo: `#F5EFE0`

---

## Regole generali

- **Mai** sfondi piatti monocromatici
- **Mai** layout simmetrici a 3 colonne con icone in cerchio
- **Mai** gradienti viola o blu generici
- **Sempre** spazio generoso — il lusso respira, non è affollato
- **Sempre** un elemento visivo forte per sezione (non tutto testo)
- **Sempre** coerenza oro come unico colore accent — non aggiungere altri colori vivaci
- Il brand è autorevole: il layout deve comunicare competenza, non hype
