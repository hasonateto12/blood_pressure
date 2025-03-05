const { addSlashes, stripSlashes } = require('slashes');

async function Addusers(req,res,next){
    let name   = addSlashes(req.body.name);

    const Query = `INSERT INTO users (name) VALUES('${name}')`;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
        req.insertId=rows.insertId;
    } catch (err) {
        console.log(err);
        req.success=false;
        req.insertId=-1;
    }

    next();
}

async function Readusers(req,res,next){
    const Query = `SELECT * FROM users `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    req.user_by_id=[];
    try {
        [rows] = await promisePool.query(Query);
        for(let idx in rows){
            rows[idx].name= htmlspecialchars(stripSlashes(rows[idx].name));
            req.user_by_id[rows[idx].id] = rows[idx].name;
        }
        req.success=true;
        req.users_data=rows;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}


async function Updateusers(req,res,next){
    let idx    = parseInt(req.body.idx);
    let name   = addSlashes(req.body.name);

    let Query = `UPDATE users SET `;
    Query += ` name = '${name}' `;
    Query += ` WHERE id = ${idx} `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}

async function Deleteusers(req,res,next){
    let idx    = parseInt(req.body.idx);
    let Query = `DELETE FROM users  `;
    Query += ` WHERE id = ${idx} `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}

async function GetUserMonthStats(req, res) {
    const userId = req.query.user_id;
    const month = req.query.month;

    const query = `
        SELECT
            user_id,
            AVG(CASE WHEN high_value > 140 OR low_value < 90 OR heart_rate > 100 OR heart_rate < 60 THEN high_value END) AS avg_high_value,
            AVG(CASE WHEN high_value > 140 OR low_value < 90 OR heart_rate > 100 OR heart_rate < 60 THEN low_value END) AS avg_low_value,
            AVG(CASE WHEN high_value > 140 OR low_value < 90 OR heart_rate > 100 OR heart_rate < 60 THEN heart_rate END) AS avg_heart_rate,
            COUNT(*) AS abnormal_count
        FROM measurements
        WHERE user_id = ? 
          AND MONTH(date) = ?
          AND (high_value > 140 OR low_value < 90 OR heart_rate > 100 OR heart_rate < 60)
    `;

    const promisePool = db_pool.promise();
    try {
        const [rows] = await promisePool.query(query, [userId, month]);

        res.json({ success: true, data: rows });
    } catch (err) {
        console.log("Database error:", err);
        res.status(500).json({ success: false, message: "Error fetching user statistics" });
    }
}


module.exports = {
    Addusers: Addusers,
    Readusers:Readusers,
    Updateusers:Updateusers,
    Deleteusers:Deleteusers,
    GetUserMonthStats:GetUserMonthStats,
}