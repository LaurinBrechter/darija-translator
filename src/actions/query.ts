'use server'

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { wordsTable } from '@/db/schema';
import { like, or } from "drizzle-orm";

export default async function searchAction(word:string, language: 'darija' | 'english') {

    console.log('searching for word: ', word)

    const db = drizzle(process.env.DB_FILE_NAME!);
    let words;

    if (language === 'darija') {
        words = await db.select().from(wordsTable).where(or(
            like(wordsTable.n1, `${word}%`),
            like(wordsTable.n2, `${word}%`),
            like(wordsTable.n3, `${word}%`),
            like(wordsTable.n4, `${word}%`),
            like(wordsTable.n5, `${word}%`),
            like(wordsTable.n6, `${word}%`),
        )).limit(10);
        console.log('Getting all users from the database: ', words)
    } else {
        words = await db.select().from(wordsTable).where(like(wordsTable.eng, `${word}%`)).limit(10);
        console.log('Getting all users from the database: ', words)
    }


    return words;
}