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

module.exports = {
    Addusers: Addusers,
    Readusers:Readusers,
    Updateusers:Updateusers,
    Deleteusers:Deleteusers,
}