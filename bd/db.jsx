import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('trabalhomobile.db');

export async function initDB(){
    (await db).execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS Usuario(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,


            )
        `)
}