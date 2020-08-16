import mysql from "mysql2/promise";
import dbConfig from "../config/db.config";
import bcrypt from 'bcryptjs'


// connection pool 생성
// https://github.com/sidorares/node-mysql2 참조
const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
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


//세일정보가져오기
export const selectSaleInfos = async (page) => {

    const [datas] = await pool.query(`
        SELECT 
        seq,
        \`from\`,
        subject,
        content,
        regdate
        FROM tbl_saleinfo
        WHERE saleflag = true
        ORDER BY regdate DESC
        LIMIT 10
    `);

    return datas; 
}

export const selectSaleInfo = async (seq) => {

    try{

        const [data] = await pool.query(`
            SELECT 
            seq,
            \`from\`,
            subject,
            content,
            regdate
            FROM tbl_saleinfo
            WHERE seq = ${seq}
            LIMIT 1
        `);

        return data[0];

    }catch(e){
        return null;
    }
}