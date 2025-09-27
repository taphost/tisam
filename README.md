TISAM è uno script di translitterazione di fonemi italiani, basato sulla versione JavaScript di SAM – Software Automatic Mouth, 
il celebre motore di Text-To-Speech (TTS) degli anni ’80 per Commodore 64. L’obiettivo del progetto è adattare la fonetica 
italiana al motore originale, che nasce per l’inglese, permettendo così di ottenere una resa vocale più vicina possibile ai
suoni della nostra lingua.

Funzionamento

Analizza il testo in italiano.
Applica regole di translitterazione per avvicinare la scrittura alla fonetica inglese di SAM.
Converte il risultato in fonemi compatibili con il motore TTS.

Esempio

Input: ciao amici
Output translitterato: cjao amiychiy
Output vocale (SAM): voce artificiale che riproduce i suoni italiani approssimati.

Limiti

Non perfetto: alcuni conflitti tra regole fonetiche possono produrre risultati imprevisti.
Copertura parziale: non tutti i fonemi italiani hanno un corrispettivo diretto nell’inglese di SAM.
Approssimazioni necessarie: certi suoni vengono resi in maniera vicina, ma non identica.
