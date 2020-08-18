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

//피드가져오기
export const selectFeeds = async (page) => {

    const [datas] = await pool.query(`
        select 
        A.seq,
        newflag,
        hot,
        recommend,
        designer_seq,
        A.\`name\`,
        currency,
        \`before\`,
        \`after\`,
        link,
        \`desc\`,
        designer_point,
        price_point,
        essential_point,
        url as mainimage,
        C.\`name\` as designer,
        C.korean as designer_kor
        from tbl_feed A
        left join (
            select 
            feed_seq,
            url
            from tbl_feed_imgs
            group by feed_seq
        ) B
        on A.seq = B.feed_seq
        left join (
			select seq, \`name\`, korean from tbl_designer
        ) C
        on A.designer_seq = C.seq
        LIMIT 10
    `);

    return datas;
}

export const selectFeed = async (seq) => {

    try{

        const [data] = await pool.query(`
            SELECT 
            *
            FROM tbl_feed
            WHERE seq = ${seq}
            LIMIT 1
        `);

        return data[0];

    }catch(e){
        return null;
    }

}

export const selectFeedImgs = async (seq) => {

    try{

        const [datas] = await pool.query(`
            SELECT 
            *
            FROM tbl_feed_imgs
            WHERE feed_seq = ${seq}
        `);

        return datas;

    }catch(e){
        return null;
    }

}

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