---
title: Koffee
description: Digitale Kaffeekasse.
account: koffee-project
repositories: [koffee-app, koffee-backend]
thumbnail: koffee/thumbnail.webp
demo: https://koffee.yeger.eu
---

Im Rahmen meines Bachelorprojektes entwickelte ich eine digitale Kaffeekasse, bestehend aus einem Kotlin/JVM Backend sowie einem Android Frontend.

Ersteres wurde mithilfe von [Ktor](https://ktor.io/) entwickelt und verfolgt einen funktionalen Programmierstil.
Als Datenbank wurde MongoDB in Kombination mit der großartigen Bibliothek [KMongo](https://litote.org/kmongo/) verwendet.
Insbesondere die strikte Verwendung von [kotlin-result](https://github.com/michaelbull/kotlin-result) erlaubte eine saubere und übersichtliche Eingabevalidierung und Fehlerbehandlung umzusetzen.

Bei der Android App wurde ein besonderer Fokus auf die Verwendung von Android Jetpack gelegt.
Dementsprechend kamen eine Vielzahl an Jetpack Bibliotheken zum Einsatz.
UI und UX wurden an die Bedürfnisse des Fachgebiets *ComTec* der Universität Kassel angepasst.
Unter anderem wurde Wert auf einen Modus gelegt, bei welchem Nutzer ohne Login Transaktionen tätigen können.
Zudem sollte das System auf Vertrauensbasis funktionieren und keine tatsächlichen Geldflüsse umsetzen, da Nutzer ihr Guthaben bei Administratoren einzahlen.

Eine [Dokumentation](https://koffee.yeger.eu/) des Quelltexts ist online verfügbar.
Darüber hinaus kann die schriftliche Ausarbeitung zur Projektarbeit [hier](/de/documents/koffee) eingesehen werden.
