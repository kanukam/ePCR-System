const PDFDocument = require('pdfkit');
const fs = require('fs');

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
        p_past_medical_historyL,
    } = info;

    fs.readFile(`./locales/${locale}.json`, 'utf8', (err, data) => {
        let tags;
        if (err)
            return callback(err)
        else
            tags = JSON.parse(data);
            const doc = new PDFDocument;
            doc.pipe(pipeTo);

            // pipe the document to a blob
            //const stream = doc.pipe(blobStream());
        
            // add your content to the document here, as usual
            doc.addPage()
                .fontSize(18)
                .text(`
                ${tags.patientName}: ${fname} ${lname}
                ${tags.ePCR}`, {
                    align: 'center'
                })
                .moveDown()
                // Demogrphics:
                .text(`
                    ${tags.demographics}
                    ${tags.fName}: ${fname}
                    ${tags.lName}: ${lname}
                    ${tags.classificationText}: ${p_classify}
                    ${tags.DOB}: ${birth}
                    ${tags.weight}: ${p_weight} kg
                    ${tags.braslow}: ${p_bcolor}
                    ${tags.sex}: ${gender}
                    ${tags.address}: ${p_address}
                    ${tags.phone}: ${p_phone}
                    
                `, {
                     align: 'left'
                })
                .moveDown()

                .text(tags.callInformation, {align: 'center', width: 410})
                .text(`
                    ${tags.incidentNumber}: ${incident_number}
                    ${tags.unitNumber}: ${unit_number}
                    ${tags.callType}: ${call_type}
                    ${tags.callNature}: ${call_nature}
                    ${tags.incidentDate}: ${incident_date}
                    ${tags.location}: ${location}
                    ${tags.incidentAddress}: ${incident_address}
                    ${tags.disposition}: ${disposition}
                    ${tags.destination}: ${destination}
                    ${tags.agency}: ${agencies}
                    ${trags.trauma}: ${trauma_cause}
                `, { align: 'left' })
                .moveDown()

                .text(`MCI`, {align: 'center', width: 410})
                .moveDown()
                .text(`
                    ${tags.numberOfPatients}: ${patient_count}
                    ${tags.triageColor}: ${triage_color}
                `, { align: 'left' })
            if(vehicle_accident_type){
                doc
                    .text(tags.vehicleAccident, {align: 'center', width: 410})
                    .text(`
                        ${tags.vehicleAccidentType}: ${vehicle_accident_type}
                        ${tags.vehicleAccidentImpact}: ${vehicle_accident_impact}
                        ${tags.vehicleAccidentSafetyEquipment}: ${vehicle_accident_safety_equipment}
                        ${tags.vehicleAccidentSpeed}: ${vehicle_accident_mph}mph / ${(vehicle_accident_mph*1.61).toFixed(2)}kmph
                        ${tags.vehicleAccidentEjection}: ${tags.yesNo[vehicle_accident_ejected]}
                        `, { align: 'left'})
            }
            doc
                .text(tags.responseTimes, {align: 'center', width: 410})
                .text(`
                    ${tags.dispatch}: ${dispatch_date_time}
                    ${tags.enroute}: ${enroute_date_time}
                    ${tags.arriveScene}: ${arrive_date_time}
                    ${tags.patientContact}: ${patient_contact_date_time}
                    ${tags.departScene}: ${depart_date_time}
                    ${tags.arriveDestination}: ${arrive_destination_date_time}
                    ${tags.transferCare}: ${transfer_date_time}
                `, { align: 'left'})
                .moveDown()

                .text("HPI", {align: 'center', width: 410})
                .text(p_hpi, {align: "left"})
                .moveDown()

                .text(tags.medicalHistory, {align: 'center', width: 410})
                .text(`
                    ${tags.medicationAllergies}: ${p_medical_allergies}
                    ${tags.environmentalAllergies}: ${p_environmental_allergies}
                    ${tags.pastMedicalHistory}: ${p_past_medical_historyL}
                    ${tags.medications}: ${medications}
                    `, { align: 'left'})
                .moveDown()

                .text(tags.physicalExam, {align: 'center', width: 410})
                .text(`
                    ${tags.skin}: ${skin}
                    ${tags.mental}: ${mental}
                    ${tags.neurological}: ${neurological}
                    ${tags.head}: ${head}
                    ${tags.neck}: ${neck}
                    ${tags.chest}: ${chest}

                    ${tags.pulse}
                        ${tags.strength}: ${pulse_strength}
                        ${tags.rate}: ${pulse_rate}
                    
                    ${tags.abdomen}: ${abdomen}
                    ${tags.pelvis}: ${pelvis}
                    ${tags.back}: ${back}
                    ${tags.leftUpperArm}: ${left_upper_arm}
                    ${tags.leftLowerArm}: ${left_lower_arm}
                    ${tags.leftHandWrist}: ${left_hand_wrist}
                    ${tags.rightUpperArm}: ${right_upper_arm}
                    ${tags.rightLowerArm}: ${right_lower_arm}
                    ${tags.rightHandWrist}: ${right_hand_wrist}
                    ${tags.leftUpperLeg}: ${left_upper_leg}
                    ${tags.leftLowerLeg}: ${left_lower_leg}
                    ${tags.leftAnkleFoot}: ${left_ankle_foot}
                    ${tags.rightUpperLeg}: ${right_upper_leg}
                    ${tags.rightLowerLeg}: ${right_lower_leg}
                    ${tags.rightAnkleFoot}: ${right_ankle_foot}
                    ${tags.additionalFindings}: ${extra_findings}
                `, { align: left })
                .moveDown()

                .text(tags.stroke, {align: 'center', width: 410})
                .text(`
                    ${tags.strokeTime}: ${stroke_time}
                        ${tags.strokeFacialDroop}: ${stroke_facial_droop}
                        ${tags.strokeArmDrift}: ${stroke_arm_drift}
                        ${tags.strokeAbnormalSpeech}: ${stroke_abnormal_speech}
                `, {align: "left"})
                .moveDown()

                .text(tags.vitalSigns, {align: 'center', width: 410})
                .text(`
                    ${vital_signs}
                `, {align: "left"})
                // get a blob when you're done
            
            doc.end();
            cb();
    });

}

module.exports = {
    createChartPDF
}