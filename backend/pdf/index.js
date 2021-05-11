const PDFDocument = require('pdfkit');
const fs = require('fs');
const moment = require('moment')

function createChartPDF(info, locale, pipeTo, cb){
    // create a document the same way as above
    let {
        incident_number,
        incident_date,
        location,
        incident_address,
        disposition,
        agencies,
        patient_count,
        triage_color,
        dispatch_date_time,
        enroute_date_time,
        arrive_date_time,
        patient_contact_date_time,
        depart_date_time,
        arrive_destination_date_time, //!!
        transfer_date_time,
        unit_number,
        call_type,
        call_nature,
        care_level,
        destination,
        trauma_cause, 
        vehicle_accident_type,
        vehicle_accident_impact,
        vehicle_accident_safety_equipment,
        vehicle_accident_mph,
        vehicle_accident_ejected,
        medications,
        procedures,
        skin,
        mental,
        neurological,
        head,
        neck,
        chest,
        pulse_strength,
        pulse_rate,
        abdomen,
        pelvis,
        back,
        left_upper_arm,
        left_lower_arm,
        left_hand_wrist,
        left_upper_leg,
        left_lower_leg,
        left_ankle_foot,
        right_upper_arm,
        right_lower_arm,
        right_hand_wrist,
        right_upper_leg,
        right_lower_leg,
        right_ankle_foot,
        extra_findings,
        stroke_time,
        stroke_facial_droop,
        stroke_arm_drift,
        stroke_abnormal_speech,
        vital_signs,
        patientID,
        //from patients:
        fname,
        lname,
        birth,
        gender,
        //
        p_weight,
        p_classify,
        p_bcolor,
        p_address,
        p_phone,
        p_hpi,
        p_history_given,
        p_medical_allergies,
        p_environmental_allergies,
        p_past_medical_history,
        intake_bleeding,
        intake_iv_fluids,
        intake_oral_fluids,
        intake_vomit,
        obstetrics,
        notes
    } = info;

    fs.readFile(`./pdf/locales/${locale}.json`, 'utf8', (err, data) => {
        let tags;
        const HEADERS = {align: 'center', stroke: true};
        const TAG_LAYOUT = { continued: true, stroke: true };
        if (err)
            return cb(err)
        else
            tags = JSON.parse(data);
            const HEADER_HEIGHT = 18;
            
            const doc = new PDFDocument({margin: 10, bufferedPages: true});
            doc.pipe(pipeTo);
            doc.info.title= `${lname}_${incident_number}_pcr`;

            let calc_height = 0;

            // pipe the document to a blob
            //const stream = doc.pipe(blobStream());
            let physExamBody = "\n";
            physExamBody += skin ? tags.skin + ": " + skin + "\n" : "";
            physExamBody += mental ? tags.mental + ": " + mental + "\n" : "";
            physExamBody += neurological ? tags.neurological + ": " + neurological + "\n" : "";
            physExamBody += head ? tags.head + ": " + head + "\n" : "";
            physExamBody += neck ? tags.neck + ": " + neck + "\n" : "";
            physExamBody += chest ? tags.chest + ": " + chest + "\n" : "";
            physExamBody += pulse_strength ? tags.pulse 
                + "\n    " + tags.strength + ": " + pulse_strength + "\n    " 
                + tags.rate + ": " + pulse_rate + "\n": "";
            physExamBody += abdomen ? tags.abdomen + ": " + abdomen + "\n" : "";
            physExamBody += pelvis ? tags.pelvis + ": " + pelvis + "\n" : "";
            physExamBody += back ? tags.back + ": " + back + "\n" : "";
            physExamBody += left_upper_arm ? tags.leftUpperArm + ": " + left_upper_arm + "\n" : "";
            physExamBody += left_lower_arm ? tags.leftLowerArm + ": " + left_lower_arm + "\n" : "";
            physExamBody += left_hand_wrist ? tags.leftHandWrist + ": " + left_hand_wrist + "\n" : "";
            physExamBody += right_upper_arm ? tags.rightUpperArm + ": " + right_upper_arm + "\n" : "";
            physExamBody += right_lower_arm ? tags.rightLowerArm + ": " + right_lower_arm + "\n" : "";
            physExamBody += right_hand_wrist ? tags.rightHandWrist + ": " + right_hand_wrist + "\n" : "";
            physExamBody += left_upper_leg ? tags.leftUpperLeg + ": " + left_upper_leg + "\n" : "";
            physExamBody += left_lower_leg ? tags.leftLowerLeg + ": " + left_lower_leg + "\n" : "";
            physExamBody += left_ankle_foot ? tags.leftAnkleFoot + ": " + left_ankle_foot + "\n" : "";
            physExamBody += right_upper_leg ? tags.rightUpperLeg + ": " + right_upper_leg + "\n" : "";
            physExamBody += right_lower_leg ? tags.rightLowerLeg + ": " + right_lower_leg + "\n" : "";
            physExamBody += right_ankle_foot ? tags.rightAnkleFoot + ": " + right_ankle_foot + "\n" : "";
            physExamBody += extra_findings ? tags.additionalFindings + ": " + extra_findings + "\n" : "";

            doc.on('pageAdded', () => {
                doc
                    //Top:
                    .image('pdf/img/lightgray.jpg', 0, 0, {width: 1600, height: 38})
                    .text(`${tags.patientName}:`, TAG_LAYOUT)
                    .text(` ${fname} ${lname}\n${tags.ePCR}`, {
                        stroke: false,
                        
                    })
                    .text(`# ${incident_number}`, 0, 20, {align: "right"})
                    
                })  
            doc
                //Top:
                .fontSize(10)
                .image('pdf/img/lightgray.jpg', 0, 0, {width: 1600, height: 38})
                .text(`${tags.patientName}:`, TAG_LAYOUT)
                .text(` ${fname} ${lname}\n${tags.ePCR}`, {
                    stroke: false, 
                })
                .text(`# ${incident_number}`, 0, 20, {align: "right"})
                
                .moveDown()

                //Demo:
                .image('pdf/img/gray.jpg', 0, 38, {width: 1600, height: HEADER_HEIGHT})
                .text(tags.demographics, HEADERS)

                .text(`
                    ${tags.fName}: ${fname}
                    ${tags.lName}: ${lname}
                    ${tags.classificationText}: 
                        ${p_classify}
                    ${tags.DOB}: ${formatDate(birth)}
                    
                    ${tags.weight}: ${p_weight} kg
                    ${tags.braslow}: ${p_bcolor}
                    ${tags.sex}: ${gender}
                    ${tags.address}: ${p_address}
                    ${tags.phone}: ${p_phone}
                    
                `, {
                     align: 'left',
                     columns: 2,
                     height: 80
                })
                .moveDown();
            doc
                //Call info:
                .image('pdf/img/gray.jpg', 0, 130, {width: 1600, height: HEADER_HEIGHT})
                .text(tags.callInformation, HEADERS)
                .text(`
                    ${tags.incidentNumber}: ${incident_number}
                    ${tags.unitNumber}: ${unit_number}
                    ${tags.callType}: ${call_type}
                    ${tags.callNature}: ${call_nature}
                    ${tags.incidentDate}: ${formatDate(incident_date)}
                    ${tags.location}: ${location}

                    ${tags.incidentAddress}: ${incident_address}
                    ${tags.disposition}: ${disposition}
                    ${tags.destination}: ${destination}
                    ${tags.agency}: 
                        ${agencies}
                    ${tags.trauma}: ${trauma_cause}
                `, { align: 'left', columns: 2, height: 90 })
                .moveDown();
            doc
                //Mci:
                .image('pdf/img/gray.jpg', 0, 234, {width: 1600, height: HEADER_HEIGHT})
                .text(`MCI`, HEADERS)
                .text(`
                    ${tags.numberOfPatients}: ${patient_count || ""}
                    ${tags.triageColor}: ${triage_color || ""}
                `, { align: 'left' })
                .moveDown();

            doc
                //Vehicle:
                .image('pdf/img/gray.jpg', 0, 304, {width: 1600, height: HEADER_HEIGHT})
                .text(tags.vehicleAccident, HEADERS);
            if(vehicle_accident_type){
                doc
                    .text(`
                        ${tags.vehicleAccidentType}: ${vehicle_accident_type}
                        ${tags.vehicleAccidentImpact}: ${vehicle_accident_impact}
                        ${tags.vehicleAccidentSafetyEquipment}: ${vehicle_accident_safety_equipment}
                        ${tags.vehicleAccidentSpeed}: ${vehicle_accident_mph}mph / ${(vehicle_accident_mph*1.61).toFixed(2)}kmph
                        ${tags.vehicleAccidentEjection}: ${vehicle_accident_ejected}
                        `, { align: 'left'})
            }
            else{
                doc
                .text(`
                    
                    
                    
                    
                    
                    `, { align: 'left'})   
            }
            doc
                //Response times:
                .image('pdf/img/gray.jpg', 0, 396, {width: 1600, height: HEADER_HEIGHT})
                .text(tags.responseTimes, HEADERS)
                .text(`
                    ${tags.dispatch}: ${formatDateTime(dispatch_date_time)}
                    ${tags.enroute}: ${formatDateTime(enroute_date_time)}
                    ${tags.arriveScene}: ${formatDateTime(arrive_date_time)}
                    ${tags.patientContact}: ${formatDateTime(patient_contact_date_time)}
                    ${tags.departScene}: ${formatDateTime(depart_date_time)}
                    ${tags.arriveDestination}: ${formatDateTime(arrive_destination_date_time)}
                    ${tags.transferCare}: ${formatDateTime(transfer_date_time)}
                `, { align: 'left'})
                .moveDown();

            doc
                //HPI:
                .image('pdf/img/gray.jpg', 0, 523, {width: 1600, height: HEADER_HEIGHT})
                .text("HPI", HEADERS)
                .moveDown()
                .text(p_hpi, {align: "left"})
                .moveDown();

            doc
                //Medical History:
                .image('pdf/img/gray.jpg', 0, calc_height += 10 + 547 + doc.heightOfString(p_hpi), {width: 1600, height: HEADER_HEIGHT})
                .text(tags.medicalHistory, HEADERS)
                .text(`
                    ${tags.medicationAllergies}: ${p_medical_allergies}
                    ${tags.environmentalAllergies}: ${p_environmental_allergies}
                    ${tags.pastMedicalHistory}: ${p_past_medical_history}
                    ${tags.medications}: ${medications}
                    `, { align: 'left'})
                .moveDown();
            doc.addPage();
            doc
                .moveDown()
                .image('pdf/img/gray.jpg', 0, calc_height = 38, {width: 1600, height: HEADER_HEIGHT})
                .text(tags.obstetrics, HEADERS)
                .moveDown()
                .text(obstetrics)
                .moveDown()
            doc
                //Physical Exam
                .image('pdf/img/gray.jpg', 0, calc_height += 35 + doc.heightOfString(obstetrics), {width: 1600, height: HEADER_HEIGHT})
                .text(tags.physicalExam, HEADERS)
                .text(physExamBody, { align: 'left'})
                .moveDown()

            doc
                //Stroke
                .image('pdf/img/gray.jpg', 0, calc_height += 23 + doc.heightOfString(physExamBody), {width: 1600, height: HEADER_HEIGHT}).text(tags.stroke, HEADERS)
                .text(`
                    ${tags.strokeTime}: ${stroke_time}
                        ${tags.strokeFacialDroop}: ${stroke_facial_droop}
                        ${tags.strokeArmDrift}: ${stroke_arm_drift}
                        ${tags.strokeAbnormalSpeech}: ${stroke_abnormal_speech}
                `, {align: "left"})
                .moveDown()
            
            doc
                //Vital Signs
                .image('pdf/img/gray.jpg', 0, calc_height += 18 + 74, {width: 1600, height: HEADER_HEIGHT})
                .text(tags.vitalSigns, HEADERS)
                .text(`
                    ${vital_signs}
                `, {align: "left"})
                .moveDown()

                .image('pdf/img/gray.jpg', 0, calc_height += 58 + doc.heightOfString(vital_signs) - (vital_signs ? 10 : 0), {width: 1600, height: HEADER_HEIGHT})
                .text(tags.procedures, HEADERS)
                .text(`
                    ${procedures}
                `)
                .moveDown()

                .image('pdf/img/gray.jpg', 0, calc_height += 58 + doc.heightOfString(procedures) - (procedures ? 10 : 0), {width: 1600, height: HEADER_HEIGHT})
                .text(tags.intakeOutput, HEADERS)
                .text(`
                    ${tags.bleeding}: ${intake_bleeding}
                    ${tags.ivFluids}: ${intake_iv_fluids}
                    ${tags.oralFluids}: ${intake_oral_fluids}
                    ${tags.vomit}: ${intake_vomit}
                `)

                // get a blob when you're done
            doc.addPage();

            doc.moveDown()
                .image('pdf/img/gray.jpg', 0, calc_height = 38, {width: 1600, height: HEADER_HEIGHT})
                .text(tags.notes, HEADERS)
                .moveDown()
            for(let i = 0; i < notes.length; i++)
                doc.text(`${formatDateTime(notes[i].dateAdded)}           ${notes[i].name}\n     ${notes[i].note}\n`, { align: 'left'});

            doc.end();
            cb();
    });

}

function formatDateTime(date){
    if(!date) return "";
    return moment(date).utc().format('DD/MM/YYYY THH:mm');
}

function formatDate(date){
    if(!date) return "";
    return moment(date).utc().format('DD/MM/YYYY');
}

module.exports = {
    createChartPDF
}