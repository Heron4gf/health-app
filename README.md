# HealthApp — Gestione della Terapia Farmacologica

HealthApp è un'applicazione web sviluppata nell'ambito di una tesi in farmacia, con l'obiettivo di migliorare l'**aderenza terapeutica** dei pazienti — ovvero la capacità di seguire correttamente e con costanza le terapie prescritte dal medico.

L'applicazione è pensata per essere semplice e accessibile a tutti: non è necessaria alcuna competenza tecnica per utilizzarla.

---

## Perché è utile

Uno dei problemi più diffusi in ambito sanitario è la scarsa aderenza terapeutica: molti pazienti dimenticano di assumere i farmaci, saltano delle dosi o non rispettano gli orari. Questo ha conseguenze dirette sulla salute e aumenta i costi del sistema sanitario.

HealthApp nasce per rispondere a questo problema, offrendo uno strumento digitale che permette a pazienti, caregiver e farmacisti di tenere tutto sotto controllo in modo semplice e immediato, direttamente dallo smartphone o dal computer.

---

## A chi è rivolta

L'applicazione supporta tre figure distinte, ognuna con la propria vista dedicata:

- **Paziente** — può visualizzare i propri farmaci del giorno, segnare quelli assunti e consultare il calendario terapeutico
- **Caregiver** — ha una panoramica sui pazienti assistiti, monitora l'aderenza di ciascuno e può verificare lo stato delle assunzioni giornaliere
- **Farmacista** — dispone di uno strumento professionale per monitorare i pazienti seguiti, visualizzare statistiche dettagliate e rilevare situazioni critiche

---

## Funzionalità principali

### Accesso per ruolo

Al login, l'utente sceglie il proprio ruolo (Paziente, Caregiver o Farmacista) e viene indirizzato all'interfaccia più adatta alle proprie esigenze.

![Accesso per ruolo](images/auth.png)

### Dashboard paziente

All'apertura dell'app, ogni utente vede immediatamente un riepilogo dello stato della terapia. Il livello di aderenza è mostrato con un indicatore colorato (verde, giallo o rosso) per capire a colpo d'occhio se la terapia viene seguita correttamente.

![Dashboard paziente](images/home.png)

### Opzioni e impostazioni

Interfaccia per la configurazione delle opzioni dell'applicazione.

![Opzioni e impostazioni](images/options.png)

### Calendario terapeutico

Una vista mensile permette di navigare nel tempo e vedere i giorni in cui i farmaci sono stati assunti o mancati. I giorni vengono evidenziati visivamente per facilitare l'identificazione di eventuali lacune nella terapia.

![Calendario](images/calendar.png)

### Dashboard caregiver

Il caregiver ha una panoramica sui pazienti assistiti, monitora l'aderenza di ciascuno e può verificare lo stato delle assunzioni giornaliere.

![Dashboard caregiver](images/caregiver_home.png)

### Statistiche per il caregiver

Il caregiver può visualizzare, paziente per paziente, l'andamento della pressione sanguigna negli ultimi sette giorni e l'aderenza settimanale ai farmaci. Ogni farmaco è tracciato giorno per giorno, con un riepilogo visivo immediato.

![Statistiche caregiver](images/statistiche_caregiver.png)

### Farmaco Check (scansione)

Tramite la fotocamera del dispositivo è possibile avviare una scansione per identificare un farmaco. Dopo la scansione, viene mostrata una scheda con le informazioni rilevanti. Questa funzione è pensata per semplificare la verifica e la registrazione delle assunzioni.

![Farmaco Check - identificazione del farmaco](images/farmaco_check_riconosciuto.png)

---

## Come avviare il progetto (per sviluppatori)

1. **Installa le dipendenze**:
   ```bash
   npm install
   ```

2. **Avvia l'applicazione in locale**:
   ```bash
   npm start
   ```

3. **Apri il browser** all'indirizzo: `http://localhost:4200/`

---

## Tecnologie utilizzate

**[Angular](https://angular.dev/)** è stato scelto come framework principale perché HealthApp è una Single Page Application (SPA): invece di ricaricare l'intera pagina ad ogni click, l'applicazione aggiorna dinamicamente solo la parte di schermata necessaria, rendendo la navigazione tra le varie sezioni (login, home, calendario, area caregiver) rapida e fluida. Angular è basato su **[TypeScript](https://www.typescriptlang.org/)**, un linguaggio che aggiunge controlli aggiuntivi durante lo sviluppo e aiuta a individuare errori prima ancora di eseguire il codice — utile in un contesto dove la correttezza dei dati mostrati all'utente è importante.

Per lo stile grafico è stato utilizzato **[Bootstrap](https://getbootstrap.com/)**, una libreria che permette di costruire interfacce responsive e personalizzabili con semplicità. Bootstrap è inoltre lo standard adottato nelle linee guida di design della Pubblica Amministrazione italiana, il che lo rende una scelta coerente per applicazioni sanitarie destinate a un contesto nazionale.

---

## Note

Questa applicazione è un prototipo sviluppato a scopo accademico e di ricerca nell'ambito di una tesi in farmacia. Non sostituisce in alcun modo il parere medico o farmaceutico professionale.

---

*Rilasciato sotto licenza MIT.*