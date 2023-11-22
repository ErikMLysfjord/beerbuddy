# Requirements

## Funtional Requirements

### TODO: LOREM IPSUM EXAMPLE:

> Løsningen skal presentere søk i liste, lagt opp til håndtering av store resultatsett.

Denne applikasjonen løser dette ved å vise en grid med et gitt antall filmer fra katalogen. Nederst på siden finner brukeren en paginator for dynamisk lasting av filmer. Løsningen vi har valgt presenterer mange filmer til brukeren først, noe som gjør det enklere å finne en film som brukeren er interessert i.

> Brukeren skal kunne søke i en katalog ved å formulere et søk og få presentert et søkeresultat. Brukeren skal kunne lese mer detaljer om hvert objekt i resultatet og ha en interaksjon med de.

Brukeren kan søke fritt i søkefeltet, og vil få opp alle treff, hvor man kan bla i sidene på resultatet. Deretter kan bruker selv gå inn på en og en film for å se flere detaljer. Der vil brukeren kunne markere en film som favoritt, for å huske den til senere eller legge igjen en skriftlig review.

> En bruker skal kunne gjøre et valg (ala filtrering eller sortering) som påvirker utvalget av det som presenteres og hvordan det presenteres. Disse valgene skal huskes selv om siden reloades.

Brukeren kan velge kategori for å endre utvalget av filmene som blir presentert. I tillegg har brukeren mulighet å sortere filmene som er presentert med en sorteringsknapp. Sorteringen gjør det mulig å sortere etter popularitet, brukerscore, og tittel. Både sorteringen og kategorivalget brukeren gjør lagres i session storage og vil dermed huskes selv om siden reloades. Disse valgene lagres også som global state, noe som gjør at de huskes selv om det navigeres rundt på siden.

## Technical Requirements

<!-- MORE TEXT -->