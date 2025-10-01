TISAM è uno script di translitterazione di fonemi italiani, basato sulla versione JavaScript di SAM – Software Automatic Mouth, 
il celebre motore di Text-To-Speech (TTS) degli anni ’80 per Commodore 64. L’obiettivo del progetto è adattare la fonetica 
italiana al motore originale, che nasce per l’inglese, permettendo così di ottenere una resa vocale più vicina possibile ai
suoni della nostra lingua.

Funzionamento

Analizza il testo in italiano.
Applica regole di translitterazione per avvicinare la scrittura alla fonetica inglese di SAM.
Converte il risultato in fonemi compatibili con il motore TTS.

Limiti

Non perfetto: alcuni conflitti tra regole fonetiche possono produrre risultati imprevisti.
Copertura parziale: non tutti i fonemi italiani hanno un corrispettivo diretto nell’inglese di SAM.
Approssimazioni necessarie: certi suoni vengono resi in maniera vicina, ma non identica.

Bug Noti

L'inserimento di lettere accentate non funziona nello script originale di SAM 
lo script TISAM rimuove gli accenti prima di translitterarli e inserirli nel form di SAM.

Versioni

tisam.html 
 - versione con lo script sovrapposto alla versione originale di SAM

tisamcompact.html
 - versione espansa dello script con la possibilità di caricare da file .txt, pulire la text area
   con un click e copiare il testo italiano in SAM senza translitterazioni per eventuali paragoni
   fonetici. Le info, link e i riferimenti gli autori originali sono stati spostati in un box accessibile
   tramite tasto, Info a fondo pagina.
   
   
tisamC64.html
 - versione dello script con un interfaccia in stile Commodore 64 e la possibilità di caricare da file .txt,
   pulire la text area con un click e copiare il testo italiano in SAM senza translitterazioni per eventuali
   paragoni fonetici. Le info, link e i riferimenti gli autori originali sono stati spostati in un box accessibile
   tramite tasto, Info a fondo pagina.
   
