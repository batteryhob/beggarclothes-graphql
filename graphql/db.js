import mysql from "mysql2/promise";
import { dbConfig } from "../config/db.config";
import bcrypt from 'bcryptjs'

// connection pool 생성
// https://github.com/sidorares/node-mysql2 참조
const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: 'Z'
 });

 //암호화
const saltRounds = 8;

// 데이터 조회 샘플 (패스워드 암호화)
export const selectUser = async (id) => {    

    const [datas] = await pool.query(`
        SELECT 
        *
        FROM 
        tbl_user 
        WHERE id = '${id}'
        ORDER BY regdate DESC
        LIMIT 1
    `);

    return datas;
};


// 데이터 등록 샘플(패스워드 암호화)
export const addUser = async (id, pw, name) => {

    try{

        //pw암호화
        const salt = await bcrypt.genSalt(saltRounds)
        const hashword = await bcrypt.hash(pw, salt)
        await pool.query(`
            INSERT INTO tbl_user (
                id,
                pw,
                name,
                salt,
                regdate   
            ) VALUES (
                '${id}',
                '${hashword}',
                '${name}',
                '${salt}',
                NOW()
            )
        `);

        return true;

    }catch(e) {

        console.log("ERROR:" + e );
        return false;

    }
};