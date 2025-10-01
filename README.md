TISAM

TISAM è uno script di translitterazione dei fonemi italiani, basato sulla versione JavaScript di SAM (Software Automatic Mouth), il celebre motore di Text-To-Speech (TTS) per Commodore 64 degli anni ’80.
L’obiettivo è adattare la fonetica italiana al motore originale, nato per l’inglese, ottenendo una resa vocale il più vicina possibile ai suoni della nostra lingua.

Funzionamento

Analizza il testo in italiano.

Applica regole di translitterazione per avvicinare la scrittura alla fonetica inglese di SAM.

Converte il risultato in fonemi compatibili con il motore TTS.

Limiti

Non perfetto: alcune regole possono produrre risultati imprevisti.

Copertura parziale: non tutti i fonemi italiani hanno un corrispettivo diretto.

Approssimazioni necessarie: alcuni suoni vengono resi in maniera simile, ma non identica.

Bug noti

L’inserimento di lettere accentate non funziona nello script originale di SAM.

TISAM rimuove gli accenti prima di translitterare e inserire il testo nel form di SAM.

Versioni

tisam.html
Script integrato nella versione originale di SAM.

tisamcompact.html
Versione espansa: caricamento da file .txt, pulizia della text area con un click, copia diretta del testo italiano in SAM (senza translitterazioni) per confronti fonetici.
Info, link e riferimenti agli autori originali sono spostati in un box accessibile dal tasto Info a fondo pagina.

tisamC64.html
Interfaccia in stile Commodore 64, con le stesse funzioni della versione compatta.
