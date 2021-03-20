// @ts-check
const db = require('../../sql/database');
const pdf = require('../../pdf');

function addChart(body, pbody, callback) {
    // insert into patient table first
    const sql = 'INSERT INTO patients SET ?';
    db.query(sql, pbody, (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        else {
            // if successful, save patient id
            var pid = res.insertId;
            body["patientID"] = pid;
            var sql = 'INSERT INTO charts SET ?';
            db.query(sql, body, (err, res) => {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                else {
                    callback(null);
                }
            })
        }
    })
}

function addChartFromPatientID(body, patientId, callback){
    body["patientID"] = patientId;
    var sql = 'INSERT INTO charts SET ?';
    db.query(sql, body, (err, res) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            callback(null);
        }
    })
}

function viewAllCharts(callback) {
    db.query('SELECT * FROM charts', (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

function viewChart(id, callback){
    db.query(`SELECT * FROM charts where id=${id}`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res[0]);
    })
}

function viewAllChartsFromPatientID(patientID, callback){
    db.query(`SELECT * FROM charts where patientID=${patientID}`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res);
    }) 
}

function updateChart(userID, chartID, patientID, body, callback){
    db.query(`UPDATE charts SET ?
    WHERE (userID=${userID} AND id=${chartID} AND patientID=${patientID})`, body, callback);
}

function viewPatientChart(id, callback){
    db.query(`SELECT * FROM charts INNER JOIN patients on charts.id =${id} AND charts.patientID = patients.id;`, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

function viewAllPatientCharts(callback){
    db.query(`SELECT * FROM patients LEFT JOIN charts ON charts.patientID = patients.id`, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

function addProcedure(body, callback) {
    var sql = 'INSERT INTO procedures SET ?';
    db.query(sql, body, (err, res) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            callback(null);
        }
    });
}

function addMedication(body, callback) {
    var sql = 'INSERT INTO medications SET ?';
    db.query(sql, body, (err, res) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            callback(null);
        }
    });
}

function downloadPdf(id, locale, pipeTo, callback){
    viewChart(id, (err, res)=>{
        err
        ? callback(err)
        : pdf.createChartPDF(res, locale, pipeTo, (err) => {
            callback(err);
        } )
    })
}

function downloadPdfTest(pipeTo, cb){
    pdf.createChartPDF({
        incident_number:'0001',
        incident_date:'3/1/2021',
        location:'Road / Hwy',
        incident_address:'RENO, NV',
        disposition:'Transport',
        agencies:'Police',
        patient_count:'1',
        triage_color:'GREEN',
        dispatch_date_time:'13:21',
        enroute_date_time:'13:23',
        arrive_date_time:'13:40',
        patient_contact_date_time:'',
        depart_date_time:'',
        arrive_destination_date_time:'14:00',
        transfer_date_time:'14:00',
        unit_number:'101',
        call_type:'Scene',
        call_nature:'Trauma',
        care_level:'',
        destination:'ST MARYS',
        trauma_cause:'Motor vehicle', 
        vehicle_accident_type:'Auto into another auto',
        vehicle_accident_impact:'Y',
        vehicle_accident_safety_equipment:'Y',
        vehicle_accident_mph:'60',
        vehicle_accident_ejected:'N',
        medications:'N',
        procedures:'',
        skin:'',
        mental:'',
        neurological:'',
        head:'',
        neck:'',
        chest:'',
        pulse_strength:'',
        pulse_rate:'',
        abdomen:'',
        pelvis:'',
        back:'',
        left_upper_arm:'',
        left_lower_arm:'',
        left_hand_wrist:'',
        left_upper_leg:'',
        left_lower_leg:'',
        left_ankle_foot:'',
        right_upper_arm:'',
        right_lower_arm:'',
        right_hand_wrist:'',
        right_upper_leg:'',
        right_lower_leg:'',
        right_ankle_foot:'N',
        extra_findings:'',
        stroke_time:'N/A',
        stroke_facial_droop:'N',
        stroke_arm_drift:'N',
        stroke_abnormal_speech:'N',
        vital_signs:'',
        //from patients:
        fname: 'John',
        lname: 'Smith',
        birth: '1/1/76',
        gender: 'M',
        //
        p_weight: 86,
        p_classify: 'Adult - 15 yr to 65 yr',
        p_bcolor: 'GREEN',
        p_address: '100 S. Virginia',
        p_phone: '775-867-5309',
        p_hpi:'',
        p_medical_allergies:'None',
        p_environmental_allergies:'None',
        p_past_medical_historyL:''
    }, 'EN', pipeTo, cb)
}

module.exports = { 
    viewChart, 
    viewAllCharts, 
    viewAllChartsFromPatientID, 
    addChart,
    addChartFromPatientID,
    addProcedure,
    addMedication,
    updateChart, 
    viewPatientChart, 
    viewAllPatientCharts,
    downloadPdf,
    downloadPdfTest
};