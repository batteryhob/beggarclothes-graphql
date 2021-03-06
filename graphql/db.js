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

//순위
//커뮤니티리스트 가져오기
export const selectCommunityList = async () => {

    const [datas] = await pool.query(`
        select
            seq,
            url,
            \`name\`,
            \`desc\`
        from tbl_community
    `);

    return datas;
}
//커뮤니티별 브랜드 순위 가져오기
export const selectWeeklyRank = async (cseq) => {

    const [datas] = await pool.query(`
        select 
            designer, 
            sum(cnt * view) as computed
        from tbl_designer_agg
        where community_seq = ${cseq} and \`date\` > date_add(NOW(),interval-7 day)
        group by designer
        order by (sum(cnt * view)) desc
    `);

    return datas;
}
//디자이너별 일간 순위 가져오기
export const selectSequenceRank = async (cseq, designer) => {

    const [datas] = await pool.query(`
        SELECT
        A.designer,
        A.date,
        (
            SELECT rank FROM (
                SELECT 
                RANK() OVER (PARTITION BY date ORDER BY (cnt * view) DESC) AS rank,
                designer,
                \`date\`
                FROM tbl_designer_agg 
                where community_seq = ${cseq}
                ORDER BY (cnt * view) desc
            ) t where designer = A.designer AND date = A.date
            
        ) as rank,
        (cnt * view) as computed
        from tbl_designer_agg A
        where community_seq = ${cseq} AND designer = '${designer}'
        order by date desc
        LIMIT 10
    `);

    return datas;
}


//피드정보
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
        daily_point,
        A.\`view\`,
        A.\`like\`,
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
            daily_point,
            A.\`view\`,
            A.\`like\`,
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
            WHERE A.seq = ${seq}
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
export const viewFeed = async (seq) => {
    try{
        await pool.query(`
            UPDATE tbl_feed SET \`view\` = (\`view\` + 1)
            WHERE seq = '${seq}'
        `);
        return true;
    }catch(e){
        return false;
    }
}
export const likeFeed = async (seq) => {
    try{
        await pool.query(`
            UPDATE tbl_feed SET \`like\` = (\`like\` + 1)
            WHERE seq = '${seq}'
        `);
        return true;
    }catch(e){
        return false;
    }
}
export const unLikeFeed = async (seq) => {
    try{
        await pool.query(`
            UPDATE tbl_feed SET \`like\` = (\`like\` - 1)
            WHERE seq = '${seq}'
        `);
        return true;
    }catch(e){
        return false;
    }
}

//세일정보
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