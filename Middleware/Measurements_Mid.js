const { addSlashes, stripSlashes } = require('slashes');

async function Addmeasurements(req,res,next){
    let user_id       = (req.body.user_id       === undefined)  ?      -1 : parseInt(req.body.user_id     );
    let high_value        = (req.body.high_value=== undefined    )  ?       -1 : parseInt(req.body.high_value);
    let low_value  = (req.body.low_value  === undefined)  ?       -1 : parseInt(req.body.low_value);
    let heart_rate        = (req.body.heart_rate        === undefined)  ?       -1 : parseInt(req.body.heart_rate      );
    let date        = (req.body.date        === undefined)  ?      "" : addSlashes(req.body.date    );

    let Query = `INSERT INTO measurements `;
    Query += "(`user_id`, `high_value`, `low_value`, `heart_rate`, `date`)";
    Query += " VALUES ";
    Query += `('${user_id}','${high_value}','${low_value}','${heart_rate}','${date}')`;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        console.log(rows);
        req.success=true;
        req.insertId=rows.insertId;

    } catch (err) {
        console.log(err);
        req.success=false;
        req.insertId=-1;
    }

    next();
}
async function Readmeasurements(req, res, next) {
    let Query = 'SELECT *, ';
    Query += 'DATE_FORMAT(date, "%d-%m-%Y") AS date, ';
    Query += '(SELECT AVG(high_value) FROM measurements) AS avg_high, ';
    Query += '(SELECT AVG(low_value) FROM measurements) AS avg_low, ';
    Query += '(SELECT AVG(heart_rate) FROM measurements) AS avg_heart ';
    Query += 'FROM measurements';

    const promisePool = db_pool.promise();
    let rows = [];

    try {
        [rows] = await promisePool.query(Query);
        rows = rows.map(measurement => ({
            ...measurement,
            highlight: measurement.high_value > measurement.avg_high * 1.2 ||
                measurement.low_value > measurement.avg_low * 1.2 ||
                measurement.heart_rate > measurement.avg_heart * 1.2
        }));

        req.success = true;
        req.measurements_data = rows;
    } catch (err) {
        req.success = false;
        console.log(err);
    }
    next();
}

async function Updatemeasurements(req, res, next) {
    let idx = parseInt(req.body.idx);
    let high_value = (req.body.high_value === undefined) ? -1 : parseInt(req.body.high_value);
    let low_value = (req.body.low_value === undefined) ? -1 : parseInt(req.body.low_value);
    let heart_rate = (req.body.heart_rate === undefined) ? -1 : parseInt(req.body.heart_rate);
    let date = (req.body.date === undefined) ? "" : addSlashes(req.body.date);

    // بناء الاستعلام باستخدام الاستعلامات المعلمة لتجنب حقن SQL
    let Query = `UPDATE measurements SET high_value = ?, low_value = ?, heart_rate = ?, date = ? WHERE id = ?`;

    const promisePool = db_pool.promise();
    try {
        const [rows] = await promisePool.query(Query, [high_value, low_value, heart_rate, date, idx]);
        if (rows.affectedRows > 0) {
            req.success = true;
        } else {
            req.success = false;
            req.errorMessage = "No records were updated.";
        }
    } catch (err) {
        req.success = false;
        req.errorMessage = "Database error.";
        console.log(err);
    }

    next();
}

async function Deletemeasurements(req,res,next){
    let idx    = parseInt(req.body.idx);
    let Query = `DELETE FROM measurements  `;
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
    Addmeasurements: Addmeasurements,
    Readmeasurements:Readmeasurements,
    Updatemeasurements:Updatemeasurements,
    Deletemeasurements:Deletemeasurements,
}