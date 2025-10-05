'use strict';

var TISAM_APP = TISAM_APP || {};

TISAM_APP.config = {
  opts: {
    debug: 1,
    pitch: 64,
    speed: 72,
    mouth: 128,
    throat: 128
  },
  presets: {
    sam: { speed: 72, pitch: 64, throat: 128, mouth: 128 },
    elf: { speed: 72, pitch: 64, throat: 110, mouth: 160 },
    little_robot: { speed: 92, pitch: 60, throat: 190, mouth: 190 },
    stuffy_guy: { speed: 82, pitch: 72, throat: 110, mouth: 105 },
    little_old_lady: { speed: 82, pitch: 32, throat: 145, mouth: 145 },
    extra_terrestrial: { speed: 100, pitch: 64, throat: 150, mouth: 200 }
  }
};

TISAM_APP.Transliterator = {
  protectedWords: {
    'tu': 'too', 'lui': 'loowee', 'lei': 'lay', 'loro': 'loro',
    'ai': 'hi', 'saro': 'sahro', 'sono': 'sohno', 'sei': 'sehih',
    'siamo': 'see ahmo', 'siete': 'see ehtteh', 'hanno': 'ahnno',
    'puo': 'poowo', 'puoi': 'poo oi', 'possiamo': 'possyahmo',
    'devo': 'dehvo', 'devi': 'dehvee', 'deve': 'dehve',
    'vedo': 'vehdo', 'vedi': 'vehdee', 'vado': 'vahdo', 'vai': 'vahy',
    'andiamo': 'andyamo', 'andate': 'andatteh', 'gia': 'jiah',
    'giu': 'jiuw', 'piu': 'peeuw', 'meno': 'mehno', 'finche': 'feenkeh',
    'benche': 'behnkeh', 'sebbene': 'sehbbehneh', 'poi': 'poee',
    'mai': 'maee', 'gli': 'jlee', 'glie': 'jle eh', 'qua': 'kwah',
    'qui': 'kwee', 'li': 'lee', 'la': 'lah', 'fuori': 'fwohree',
    'dentro': 'dehntroh', 'si': 'see', 'no': 'noh', 'oh': 'ohh',
    'eh': 'ehh', 'ah': 'ahh', 'uh': 'uhh', 'mah': 'mah', 'boh': 'boh',
    'ciao': 'chao', 'gioco': 'g oh ko', 'giochi': 'g oh ki',
    'gnocchi': 'kneeohkih', 'gnocco': 'kneeohkoh',
    'eccetera': 'eccheh tera', 'buono': 'bwohnoh',
    'buongiorno': 'bwonjorno', 'realta': 'reh ah ltah',
    'acciaio': 'ahkchiah yoh', 'dice': 'dee cheh', 'dici': 'dee che',
    'questo': 'kwehs toh', 'quello': 'kwehl loh', 'quando': 'kwahndo',
    'quale': 'kwahleh', 'mio': 'meeoh', 'mia': 'meeah',
    'miei': 'mee eh e', 'ahime': 'himeh',
    'A': 'ah', 'B': 'bee', 'C': 'che', 'D': 'dee','E': 'eh', 'F': 'ef feh', 'G': 'gee',
    'H': 'ah kah', 'I': 'ee', 'K' : 'kappah','L': 'l eh', 'M': 'm eh', 'N': 'n eh', 'O': 'oh', 'P': 'pee',
    'Q' : 'koo', 'R': 'eh reh',  'S': 'eh seh', 'T': 'tee', 'U': 'oo', 'V': 'vee', 
    'X': 'eeks', 'Y': 'eep cilon', 'Z': 'zeh tah'	
  },

  parseWord(word) {
    let result = '';
    let i = 0;

    while (i < word.length) {
      // Three-character patterns
      if (i + 2 < word.length) {
        const s3 = word.substring(i, i + 3);
        
        if (i === 0 && s3 === 'gno') {
          result += 'know';
          i += 3;
          continue;
        }
        if (i === 0 && s3 === 'cie') {
          result += 'chee eh';
          i += 3;
          continue;
        }
        if (s3 === 'gli') {
          result += 'ly';
          i += 3;
          continue;
        }
        if (s3 === 'cch' && 'ei'.includes(word[i + 3] || '')) {
          result += 'k' + word[i + 3];
          i += 4;
          continue;
        }
        if (s3 === 'sch' && 'ei'.includes(word[i + 3] || '')) {
          result += 'sk' + word[i + 3];
          i += 4;
          continue;
        }
      }

      // Two-character patterns
      if (i + 1 < word.length) {
        const s2 = word.substring(i, i + 2);

        if (s2 === 'ai') { result += 'ahy'; i += 2; continue; }
        if (s2 === 'ei') { result += 'ehy'; i += 2; continue; }
        if (s2 === 'oi') { result += 'oy'; i += 2; continue; }
        if (s2 === 'ui') { result += 'ooy'; i += 2; continue; }
        if (s2 === 'au') { result += 'aow'; i += 2; continue; }
        if (s2 === 'eu') { result += 'heh uh '; i += 2; continue; }

        if (s2 === 'ch' && 'ei'.includes(word[i + 2] || '')) {
          result += 'k' + word[i + 2];
          i += 3;
          continue;
        }
        if (s2 === 'sc' && 'ei'.includes(word[i + 2] || '')) {
          result += 'sh' + word[i + 2];
          i += 3;
          continue;
        }
        if (s2 === 'gn') { result += 'ny'; i += 2; continue; }
        if (s2 === 'zz') { result += 'tts'; i += 2; continue; }
        if (s2 === 'qu') { result += 'kw'; i += 2; continue; }

        if (i === 0 && s2 === 'ge') {
          result += 'ghe';
          i += 2;
          continue;
        }

        const isAtEnd = (i + 2 === word.length);
        if (s2 === 'ce' && isAtEnd) { result += 'cheh'; i += 2; continue; }
        if (s2 === 'ci' && isAtEnd) { result += 'chee'; i += 2; continue; }

        if (s2 === 'ci' || s2 === 'ce') {
          result += 'ch' + s2[1];
          i += 2;
          continue;
        }
        if (s2 === 'gi' || s2 === 'ge') {
          result += 'j' + s2[1];
          i += 2;
          continue;
        }
        if (s2 === 'cu') { result += 'qoo'; i += 2; continue; }
        if (s2[0] === 'c' && 'aou'.includes(s2[1])) {
          result += 'k' + s2[1];
          i += 2;
          continue;
        }
      }

      // Single character patterns
      const s1 = word[i];
      const next = word[i + 1] || '';
      const prev = word[i - 1] || '';

      if (s1 === 'z' && 'aeiou'.includes(prev) && 'aeiou'.includes(next)) {
        result += 'dz';
        i += 1;
        continue;
      }
      if (s1 === 'z') { result += 'ts'; i += 1; continue; }
      if (s1 === 'c') { result += 'k'; i += 1; continue; }
      if (s1 === 'h') { i += 1; continue; }
      if (s1 === 't') { result += 'tt'; i += 1; continue; }
      if (s1 === 'x') { result += 'ks'; i += 1; continue; }
      if (s1 === 'a') { result += 'ah'; i += 1; continue; }
      if (s1 === 'e') { result += 'eh'; i += 1; continue; }
      if (s1 === 'i') { result += 'ee'; i += 1; continue; }
      if (s1 === 'o') { result += 'oh'; i += 1; continue; }
      if (s1 === 'u') { result += 'oo'; i += 1; continue; }

      result += s1;
      i += 1;
    }

    return result.replace(/ttt/g, 'tt');
  },

  parse(text) {
    const words = text.split(/(\s+|[.,!?;:])/);
    let finalResult = '';

    for (const part of words) {
      if (!part) continue;

      if (this.protectedWords[part]) {
        finalResult += this.protectedWords[part];
        continue;
      }

      if (part.match(/\s+|[.,!?;:]/)) {
        finalResult += part;
        continue;
      }

      const lowerPart = part.toLowerCase();

      if (this.protectedWords[lowerPart]) {
        finalResult += this.protectedWords[lowerPart];
        continue;
      }

      if (lowerPart === 'e') {
        finalResult += 'eh';
        continue;
      }

      if (lowerPart.startsWith('rea')) {
        finalResult += 'reh a' + this.parseWord(lowerPart.substring(3));
        continue;
      }

      finalResult += this.parseWord(lowerPart);
    }

    return finalResult;
  },

  transliterate(text) {
    let result = text;

    result = result.replace(/\uFEFF/g, '');
    result = result.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
    result = result.replace(/[\u00A0\u1680\u2000-\u200B\u202F\u205F\u3000]/g, ' ');
    result = result.replace(/[""]/g, '"');
    result = result.replace(/['']/g, "'");
    result = result.replace(/[––——'']/g, "-");
    result = result.replace(/[…]/g, "...");
    result = result.replace(/\s+/g, ' ').trim();
    result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    result = this.parse(result);

    result = result.replace(/[^a-zA-Z0-9\s.,!?;:\-'"]/g, '');
    result = result.replace(/\s+/g, ' ').trim();

    return result;
  }
};

TISAM_APP.FileHandler = {
  fileInput: null,
  italianInput: null,

  init() {
    this.fileInput = document.getElementById('file-input');
    this.italianInput = document.getElementById('italianinput');

    document.getElementById('loadfile').addEventListener('click', () => {
      this.fileInput.click();
    });

    this.fileInput.addEventListener('change', (event) => {
      this.loadFile(event.target.files[0]);
    });
  },

  loadFile(file) {
    if (!file || file.type !== 'text/plain') {
      alert('Please select a valid .txt file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      let content = e.target.result;
      content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      this.italianInput.value = content;
      this.fileInput.value = '';
      
      this.italianInput.style.height = 'auto';
      this.italianInput.style.height = this.italianInput.scrollHeight + 'px';
      
      this.italianInput.focus();
      this.italianInput.setSelectionRange(content.length, content.length);
      
      this.italianInput.dispatchEvent(new Event('input'));
    };

    reader.onerror = () => {
      alert('Error loading file. Make sure it is a valid .txt file.');
    };

    reader.readAsText(file, 'UTF-8');
  }
};

TISAM_APP.SamSpeech = {
  speech: null,

  speak() {
    if (this.speech) {
      this.speech.abort();
    }

    const input = document.getElementById('speechinput');
    
    try {
      if (typeof SamJs === 'undefined') {
        alert('SAM library not loaded. Please ensure samjs.min.js is included.');
        return;
      }

      this.speech = (new SamJs(TISAM_APP.config.opts)).speak(input.value);
      this.speech.catch(() => {});
    } catch (error) {
      console.error('Error with SAM speech:', error);
      alert('Error: Unable to generate speech. Please check the SAM library.');
    }
  },

  download() {
    const input = document.getElementById('speechinput');
    
    try {
      if (typeof SamJs === 'undefined') {
        alert('SAM library not loaded. Please ensure samjs.min.js is included.');
        return;
      }

      (new SamJs(TISAM_APP.config.opts)).download(input.value);
    } catch (error) {
      console.error('Error with SAM download:', error);
      alert('Error: Unable to generate audio file. Please check the SAM library.');
    }
  }
};

TISAM_APP.EventHandlers = {
  init() {
    const italianInput = document.getElementById('italianinput');
    const speechInput = document.getElementById('speechinput');

    document.getElementById('cleartext').addEventListener('click', () => {
      italianInput.value = '';
      italianInput.focus();
    });

    document.getElementById('copytosam').addEventListener('click', () => {
      speechInput.value = italianInput.value;
      // Manually trigger the input event to resize the textarea
      speechInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    document.getElementById('transliterate').addEventListener('click', () => {
      const text = italianInput.value;
      
      if (text.trim() === '') {
        alert('Enter some Italian text or load a file before transliterating.');
        return;
      }

      const transliterated = TISAM_APP.Transliterator.transliterate(text);
      speechInput.value = transliterated;
      // Manually trigger the input event to resize the textarea
      speechInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    document.getElementById('say').addEventListener('click', (e) => {
      e.preventDefault();
      TISAM_APP.SamSpeech.speak();
    });

    document.getElementById('download').addEventListener('click', (e) => {
      e.preventDefault();
      TISAM_APP.SamSpeech.download();
    });
  }
};
