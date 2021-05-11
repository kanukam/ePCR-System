// @ts-check
const db = require('../../sql/database');
const pdf = require('../../pdf');
const notesRepo = require('../notes/repository');

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
            console.log(err);
            return callback(err);
        }
        callback(null, results);
    });
}

function viewAllPatientCharts(callback){
    db.query(`select patients.fname, patients.lname, patients.birth, charts.p_address, charts.incident_date, charts.call_type, charts.location, charts.p_phone, charts.id
                 FROM charts INNER JOIN patients ON patients.id = charts.patientID;`, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

function summary(from, to, callback) {
    const query = `SELECT charts.p_classify, patients.gender, charts.call_nature, charts.location, charts.disposition, charts.destination, charts.trauma_cause, charts.procedures, charts.obstetrics FROM charts INNER JOIN patients ON charts.patientID = patients.id WHERE charts.incident_date BETWEEN '${from}' AND '${to}'`;
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        else{
            // Patient classification
            var adults, seniors, pediatrics, neonatals;
            adults = seniors = pediatrics = neonatals = 0;
            // Sex
            var males, females, other_sex;
            males = females = other_sex = 0;
            // Call nature
            var bp, injection, medical_other, cardiac, pulmonary, trauma, ob;
            bp = injection = medical_other = cardiac = pulmonary = trauma = ob = 0;
            // Incident Location
            var il_rescate, home, business, road, construction, ocean, beach, marina, medical_office, school, other;
            il_rescate = home = business = road = construction = ocean = beach = marina = medical_office = school = other = 0;
            // Disposition
            var treat_release, transport, unable, doa, ama;
            treat_release = transport = unable = doa = ama = 0;
            // Destination
            var dest_rescate, imss, isteson, semeson, isste, pabellon, hospital_cima, hospital_clinica, hospital_san, hospital_san_jose;
            dest_rescate = imss = isteson = semeson = isste = pabellon = hospital_cima = hospital_clinica = hospital_san = hospital_san_jose = 0;
            // Trauma Cause
            var animal, assault, motor, bike, boat, drown, electrical, explosion, fall, fire, gun, tools, stabbing, struck, toxic, vehicle, trauma_other;
            animal = assault = motor = bike = boat = drown = electrical = explosion = fall = fire = gun = tools = stabbing = struck = toxic = vehicle = trauma_other = 0;
            // Procedures
            var io, pleural, airway_lma, airway_intub, crico, cardiac_arrest, cardiac_defib_manual, cardiac_defib_aed, cardiac_pacing, procedure_ob;
            io = pleural = airway_lma = airway_intub = crico = cardiac_arrest = cardiac_defib_manual = cardiac_defib_aed = cardiac_pacing = procedure_ob = 0;
            results.forEach(element => {
                const { p_classify, gender, call_nature, location, disposition, destination, trauma_cause, procedures, obstetrics} = element;
                // Patient classification
                if(p_classify === "Adulto"){adults += 1;}
                seniors += checkData("Senior", p_classify);
                pediatrics += checkData("Pediatrica", p_classify);
                neonatals += checkData("Neonatal", p_classify);
                // Sex
                males += checkData("Hombre", gender);
                females += checkData("Mujer", gender);
                other_sex += checkData("Otro", gender);
                // Call nature
                bp += checkData("Comprobación", call_nature);
                injection += checkData("Inyección", call_nature);
                medical_other += checkData("Otros médicos", call_nature);
                cardiac += checkData("Cardíaca", call_nature);
                pulmonary += checkData("Pulmonar", call_nature);
                trauma += checkData("Trauma", call_nature);
                ob += checkData("OB", call_nature);
                // Incident Location
                il_rescate += checkData("Clínica Rescate", location);
                home += checkData("Casa", location);
                business += checkData("Negocio", location);
                road += checkData("Camino", location);
                construction += checkData("construcción", location);
                ocean += checkData("Océano", location);
                beach += checkData("Playa", location);
                marina += checkData("Marina", location);
                medical_office += checkData("médica", location);
                school += checkData("Escuela", location);
                other += checkData("Otro", location);
                // Disposition
                treat_release += checkData("Tratar", disposition);
                transport += checkData("Transportacion", disposition);
                unable += checkData("localizar", disposition);
                doa += checkData("Muerto", disposition);
                ama += checkData("Rechazar", disposition);
                // Destination
                dest_rescate += checkData("Clínica Rescate", destination);
                imss += checkData("IMSS", destination);
                isteson += checkData("ISTESON", destination);
                semeson += checkData("SEMESON", destination);
                isste += checkData("ISSSTE", destination);
                pabellon += checkData("Pabellon Guadalupe", destination);
                hospital_cima += checkData("Hospital Cima", destination);
                hospital_clinica += checkData("Hospital Clinica Del Noro", destination);
                hospital_san += checkData("Hospital San Benito", destination);
                hospital_san_jose += checkData("Guaymas", destination);
                // Trauma Cause
                animal += checkData("Animal", trauma_cause);
                assault += checkData("Asalto", trauma_cause);
                motor += checkData("motor", trauma_cause);
                bike += checkData("Bicicleta", trauma_cause);
                boat += checkData("Barco", trauma_cause);
                drown += checkData("Ahogado", trauma_cause);
                electrical += checkData("Eléctrico", trauma_cause);
                explosion += checkData("Explosión", trauma_cause);
                fall += checkData("Caída", trauma_cause);
                fire += checkData("Fuego", trauma_cause);
                gun += checkData("Arma", trauma_cause);
                tools += checkData("Herramientas", trauma_cause);
                stabbing += checkData("Apuñalar", trauma_cause);
                struck += checkData("Atascado", trauma_cause);
                toxic += checkData("tóxica", trauma_cause);
                vehicle += checkData("vehículo", trauma_cause);
                trauma_other += checkData("Otro", trauma_cause);
                // Procedures
                io += checkData("Intravenosa", procedures);
                pleural += checkData("Descompresión", procedures);
                airway_lma += checkData("LMA", procedures);
                airway_intub += checkData("Intubación", procedures);
                crico += checkData("Cricotirotomía", procedures);
                cardiac_arrest += checkData("Paro cardíaco", procedures);
                cardiac_defib_aed += checkData("Defib cardíaco - AED", procedures);
                cardiac_defib_manual += checkData("Defib cardíaco - Manual", procedures);
                cardiac_pacing += checkData("Ritmo cardíaco", procedures);
                if (obstetrics) { procedure_ob += 1;}
            });
            const chartSummary = {
                adults, seniors, pediatrics, neonatals, males, females, other_sex, bp, injection, medical_other, cardiac, pulmonary, trauma, ob, il_rescate, home, business, road, construction, ocean, beach, marina, medical_office, school, other, treat_release, transport, unable, doa, ama, dest_rescate, imss, isteson, semeson, isste, pabellon, hospital_cima, hospital_clinica, hospital_san, animal, assault, motor, bike, boat, drown, electrical, explosion, fall, fire, gun, tools, stabbing, struck, toxic, vehicle, trauma_other, io, pleural, airway_lma, airway_intub, crico, cardiac_arrest, cardiac_defib_aed, cardiac_defib_manual, cardiac_pacing, procedure_ob, hospital_san_jose
            }
            callback(null, chartSummary);
        }
    });
}

function calls(from, to, callback) {
    const query = `SELECT dispatch_date_time FROM charts WHERE dispatch_date_time BETWEEN '${from}' AND '${to}'`;
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        else {
            callback(null, results);
        }
    });
}

function checkData(word, target){
    if (word && target && target.includes(word)){
        return 1;
    }
    return 0;
}

function updateCerts(certifications, email, callback){
    db.query(`UPDATE users SET certifications='${certifications}' WHERE email='${email}'`, (err, res) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            const sql = 'SELECT users.name, users.email, users.phone, users.username, users.privilege, users.certifications FROM users';
            db.query(sql, (err, res) => {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                else {
                    callback(err, res);
                }
            });
        }
    })
}

function downloadPdf(id, locale, pipeTo, callback){
    viewPatientChart(id, (err, res)=>{
        err
            ? callback(err)
            : notesRepo.viewAllNotes(id, (err, notes) => {
                err
                    ? callback(err)
                    : pdf.createChartPDF({ ...res[0], notes: notes }, locale.toUpperCase(), pipeTo, callback)
            })

    })
}
function downloadPdfTest(pipeTo, locale, cb){
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
        p_hpi:'TEST',
        p_medical_allergies:'None',
        p_environmental_allergies:'None',
        p_past_medical_history:'TEST',
        intake_bleeding: "Y",
        intake_iv_fluids: "Y",
        intake_oral_fluids: "Y",
        intake_vomit: "Y",
        obstetrics: "TEST",
        notes:[{dateAdded: "9/9/2019", note:"TEST1", name:"A MOORE"}]
    }, locale, pipeTo, cb)
}

function getChartNumber(callback) {
    var year = new Date().getFullYear();
    const query = `SELECT COUNT(charts.incident_date) AS num FROM charts WHERE charts.incident_date BETWEEN '${year}-01-01' AND '${year}-12-31'`;
    db.query(query, (err, results) => {
      if (err) {
          return callback(err);
      }
      results = results[0].num;
      callback(null, results + 1);
  });
}

module.exports = { 
    viewChart, 
    viewAllCharts, 
    viewAllChartsFromPatientID, 
    addChart,
    addChartFromPatientID,
    updateCerts,
    updateChart, 
    viewPatientChart, 
    viewAllPatientCharts,
    summary,
    calls,
    downloadPdf,
    downloadPdfTest,
    getChartNumber,
};
