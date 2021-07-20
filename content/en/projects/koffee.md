---
title: Koffee
description: Digital coffee cash register.
account: koffee-project
repositories: [koffee-app, koffee-backend]
thumbnail: koffee/thumbnail.webp
demo: https://koffee.yeger.eu
---

As part of my bachelor project, I developed a digital coffee cash register consisting of a Kotlin/JVM backend and an Android frontend.

The former was developed using [Ktor](https://ktor.io/) and follows a functional programming style.
MongoDB was used as the database in combination with the awesome library [KMongo](https://litote.org/kmongo/).
In particular, strict use of [kotlin-result](https://github.com/michaelbull/kotlin-result) enabled clean and concise input validation and error handling.

For the Android app, a particular focus was placed on the use of Android Jetpack.
Accordingly, a variety of Jetpack libraries were used.
UI and UX were adapted to the needs of the *ComTec* department at the University of Kassel.
Among other things, emphasis was placed on a mode in which users can make transactions without logging in.
In addition, the system should work on a trust basis and not implement actual cash flows, as users deposit their funds with administrators.

[Documentation](https://koffee.yeger.eu/) of the source code is available online.
Furthermore, the (German) written elaboration of the project work can be viewed [here](/documents/koffee).
