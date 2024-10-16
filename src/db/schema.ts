import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";


// CREATE TABLE darija_transl.all_words (
// 	n1 varchar(255) NULL,
// 	n2 varchar(255) NULL,
// 	n3 varchar(255) NULL,
// 	n4 varchar(255) NULL,
// 	n5 varchar(255) NULL,
// 	n6 varchar(255) NULL,
// 	darija_ar varchar(255) NULL,
// 	eng varchar(255) NULL,
// 	"type" varchar NULL
// );

export const wordsTable = sqliteTable("all_words", {
    id: int(),
    n1: text(),
    n2: text(),
    n3: text(),
    n4: text(),
    n5: text(),
    n6: text(),
    darija_ar: text(),
    eng: text(),
    type: text()
});

export const exampleSents = sqliteTable("sentences", {
    id: int(),
    darija_ar: text(),
    darija: text(),
    eng: text()
})