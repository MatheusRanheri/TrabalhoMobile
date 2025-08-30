import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('trabalhomobile.db');

export async function initDB() {
    (await db).execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS Usuario(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                cpf TEXT,
                rg TEXT,
                datanascimento TEXT,
                senha TEXT
            );

            CREATE TABLE IF NOT EXISTS Medico(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            especialidade TEXT,
            crm, TEXT,
            foto TEXT,
            senha TEXT
            );
        `);
    console.log('criado o banco de dados');
}

export async function addUsuario(nome, cpf, rg, datanascimento, senha) {
    console.log('Usuário inserido');
    (await db).runAsync('INSERT INTO Usuario(nome, cpf, rg, datanascimento, senha) VALUES(?, ?, ?, ?, ?);', [nome, cpf, rg, datanascimento, senha]);
}

export async function consultaUsuario() {
    console.log('Usuário consultado');
    return (await db).getAllAsync('SELECT * FROM Usuario');
}

export async function deletarUsuario(id) {
    console.log('Usuário deletado');
    (await db).runAsync('DELETE FROM Usuario WHERE id=?', id);
}

export async function alterarUsuario(id, nome, cpf, rg, datanascimento, senha) {
    console.log('Usuário editado');
    (await db).runAsync('upadate Usuario SET nome=?, cpf=?, rg=?, datanascimento=?, senha=? WHERE id=?', [nome, cpf, rg, datanascimento, senha, id]);
}

export async function addMedico(nome, especialidade, crm, foto, senha) {
    console.log('Médico inserido');
    (await db).runAsync('INSERT INTO Medico(nome, especialidade, crm, foto, senha) VALUES(?, ?, ?, ?, ?);', [nome, especialidade, crm, foto, senha]);
}

export async function consultarMedico(){
    console.log('Médico consultado');
    return (await db).getAllAsync('SELECT * FROM Medico');
}

export async function deletarMedico(id){
    console.log('Médico deletado');
    (await db).runAsync('DELETE FROM Medico WHERE id=?', id);
}

export async function alterarMedico(id, nome, especialidade, crm, foto, senha){
    console.log('Médico editado');
    (await db).runAsync('UPDATE Medico SET nome=?, especialidade=?, crm=?, foto=?, senha=? WHERE id=?', nome, especialidade, crm, foto, senha, id)
}