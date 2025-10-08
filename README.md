# TISAM

**Translitteratore Italiano per SAM**

Un sistema di translitterazione fonetica che adatta il testo italiano al motore di sintesi vocale SAM (Software Automatic Mouth), con interfaccia web in stile Commodore 64.

![TISAM](https://img.shields.io/badge/C64-Style-4040E0)
![TTS](https://img.shields.io/badge/TTS-SAM-blue)
![License](https://img.shields.io/badge/license-MIT-yellow.svg)

## 📖 Cos'è TISAM?

**TISAM** è uno script di translitterazione dei fonemi italiani basato su **SAM** (*Software Automatic Mouth*), il celebre motore Text-To-Speech per Commodore 64 pubblicato nel 1982 da Don't Ask Software.

L'obiettivo del progetto è adattare la fonetica italiana al motore originale, nato per l'inglese, permettendo così di ottenere una resa vocale più vicina possibile ai suoni della lingua italiana.

## 🎯 Il Progetto

Il progetto si divide in due componenti:

### 1. TISAM Script
Il core del sistema: un parser JavaScript che analizza il testo italiano e lo converte in fonemi leggibili da SAM attraverso:
- **Analisi lessicale**: Tokenizzazione del testo in parole e punteggiatura
- **Dizionario protetto**: Lista di parole comuni con translitterazioni ottimizzate
- **Regole di conversione**: Pattern matching per vocali, consonanti, dittonghi e gruppi consonantici
- **Normalizzazione**: Pulizia del testo da caratteri speciali e accentati
- **Post-processing**: Ottimizzazione del risultato per SAM

### 2. TISAM - Commodore 64 GUI
Un'interfaccia web completa che implementa:
- Design fedele allo stile grafico del Commodore 64
- Integrazione con lo script TISAM
- Controlli avanzati per i parametri vocali di SAM
- Sistema di preset vocali
- Gestione file e export audio

## ✨ Caratteristiche

### Interfaccia Retro
- Palette colori originale del C64 (`#4040E0`, `#A0A0FF`)
- Font monospaziato vintage (Bescii Mono)
- Cursore personalizzato animato in stile C64
- Textarea con cursore lampeggiante custom
- Layout e controlli in stile PETSCII

### Funzionalità
- **Translitterazione automatica** da italiano a fonemi SAM
- **Sintesi vocale in tempo reale** tramite Web Audio API
- **Caricamento file** `.txt` per elaborazione batch
- **Download audio** in formato `.wav` (22050 Hz, 8-bit mono)
- **Copia diretta** per confronto con/senza translitterazione
- **Controlli parametrici**: Pitch, Speed, Mouth, Throat
- **6 preset vocali** preconfigurati (SAM, Elf, Robot, ecc.)
- **Pulizia testo** con un click

## 🚀 Utilizzo

### Installazione
```bash
git clone https://github.com/tuousername/tisam.git
cd tisam

Apri index.html in un browser moderno (Firefox, Chrome, Safari, Edge).
```

## Workflow Base

1. Inserisci o carica testo italiano nell'area superiore
2. Clicca **TRANSLITTERA** per convertire
3. Regola i parametri vocali (opzionale)
4. Clicca **SAY** per ascoltare o **DOWNLOAD** per salvare


## Parametri Vocali

- **Pitch** (0-255): Altezza tonale della voce
- **Speed** (1-255): Velocità di articolazione
- **Mouth** (0-255): Risonanza cavità orale
- **Throat** (0-255): Risonanza laringea

## **🔧 Architettura**

**Struttura File**

```
tisam/
├── index.html           # Struttura HTML, form e modal
├── styles.css           # Tema C64, layout, componenti custom
├── fonts/
│   └── Bescii-Mono.woff2
└── js/
    ├── samjs.min.js     # SAM engine (minified)
    ├── tisam.js         # Core: transliterator + handlers
    ├── animations.js    # UI: sliders, cursor, modal
    └── main.js          # Bootstrap e inizializzazione
```


## **🧠 Il Parser**

Il sistema di translitterazione opera su tre livelli:

**1. Pre-processing**

- Rimozione BOM e caratteri di controllo
- Normalizzazione Unicode (NFD)
- Rimozione diacritici
- Pulizia spazi e caratteri speciali

**2. Parsing**

- **Tokenizzazione:** Separazione parole/punteggiatura
- **Lookup dizionario:** Match su parole protette
- **Pattern matching:** Analisi trigram → bigram → unigram
- **Gestione contesto:** Posizione iniziale/finale, caratteri adiacenti

**3. Post-processing**

- Riduzione consonanti triple (ttt → tt)
- Pulizia caratteri non-ASCII residui
- Normalizzazione spazi

## **⚠️ Limitazioni**

**Tecniche**
- **Fonemi approssimativi:** Non tutti i suoni italiani hanno corrispondenza in SAM
- **Accenti perduti:** SAM non supporta lettere accentate, vengono normalizzate
- **Contesto limitato:** Alcune regole dipendono solo dal contesto locale
- **Omografi:** Parole identiche con pronuncia diversa non sono disambiguate

**Browser**

- Richiede Web Audio API (IE non supportato)
- Ottimizzato per desktop (mobile usabile ma con limitazioni UI)

## **📚 Tecnologie**

**Core**
- **SAM (JavaScript port):** Engine TTS originale C64
- **Vanilla JavaScript:** Zero dipendenze esterne
- **Web Audio API:** Playback sintesi vocale
- **FileReader API:** Caricamento file locali
  
**UI/UX**
- **CSS Custom Properties:** Theming C64
- **Custom Elements:** Slider, cursor, textarea
- **ARIA:** Accessibilità componenti custom
- **ResizeObserver:** Auto-resize textarea

## **🔊 SAM Engine**
SAM è un sintetizzatore vocale formant-based compatto scritto in JavaScript, portato dal software originale per Commodore C64.

**Pipeline SAM**

1. **Reciter:** Converte testo in fonemi (per inglese)
2. **Parser:** Processa fonemi in parametri articolatori
3. **Renderer:** Genera samples audio da parametri

TISAM bypassa il Reciter sostituendolo con il proprio parser italiano.

**Specifiche Audio**
- Sample rate: 22050 Hz
- Bit depth: 8-bit unsigned
- Channels: Mono
- Format: PCM WAV

## **🤝 Crediti**
**SAM Original**
- **Don't Ask Software (1982)**- Software originale C64
- Ora **SoftVoice, Inc.**

**JavaScript Ports**

- **[Sebastian Macke](https://github.com/s-macke/SAM)** - Conversione C → JS
- **[Vidar Hokstad](https://github.com/vidarh/SAM)** - Refactoring
- **[8BitPimp](https://github.com/8BitPimp/SAM)** - Ottimizzazioni
- **[Discordier](https://github.com/discordier/sam)** - Versione attuale


**TISAM**
Script di translitterazione italiana sviluppato per questo progetto.

## **📄 Licenza**
MIT License - Sentiti libero di usare e modificare per i tuoi progetti.

## **🐛 Bug Noti**

Lettere accentate non funzionano nello script originale SAM (vengono rimosse in pre-processing)
Alcuni pattern consonantici complessi possono produrre risultati imprevisti
La qualità vocale dipende fortemente dal testo di input


