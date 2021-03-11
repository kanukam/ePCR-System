const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');
const fs = require('fs');

function createChartPDF(info, locale, cb){
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
            return console.log(`Error reading file from disk: ${err}`);
        else
            tags = JSON.parse(data);
            const doc = new PDFDocument;

            // pipe the document to a blob
            const stream = doc.pipe(blobStream());
        
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
                    ${tags.classificationText}: ${tags.classifications[p_classify]}
                    ${tags.DOB}: ${birth}
                    ${tags.weight}: ${p_weight} kg
                    ${tags.braslow}: ${tags.colors[p_bcolor]}
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
                    ${tags.callType}: ${tags.callTypes[call_type]}
                    ${tags.callNature}: ${tags.callNatures[call_nature]}
                    ${tags.incidentDate}: ${incident_date}
                    ${tags.location}: ${tags.locations[location]}
                    ${tags.incidentAddress}: ${incident_address}
                    ${tags.disposition}: ${tags.dispositions[disposition]}
                    ${tags.destination}: ${tags.destinations[destination]}
                    ${tags.agency}: ${tags.agencies[agencies] || agencies}
                    ${trags.trauma}: ${tags.traumas[trauma_cause] || trauma_cause}
                `, { align: 'left' })
                .moveDown()
                .text(`MCI`, {align: 'center', width: 410})
                .moveDown()
                .text(`
                    ${tags.numberOfPatients}: ${patient_count}
                    ${tags.triageColor}: ${tags.colors[triage_color]}
                `, { align: 'left' })
            if(vehicle_accident_type){
                doc
                    .text(tags.vehicleAccident, {align: 'center', width: 410})
                    .text(`
                        ${tags.vehicleAccidentType}: ${tags.vehicleAccidenTypes[vehicle_accident_type]}
                        ${tags.vehicleAccidentImpact}: ${tags.vehicleAccidentImpacts[vehicle_accident_impact]}
                        ${tags.vehicleAccidentSafetyEquipment}: ${tags.vehicleAccidentSafetyEquipment[vehicle_accident_safety_equipment]}
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
                    ${tags.arriveDestination}: ${arive_destination_date_time}
                    ${tags.transferCare}: ${transfer_date_time}
                `, { align: 'left'})
                .text("HPI", {align: 'center', width: 410})
                // get a blob when you're done
            doc.end();
            stream.on('finish', function() {
                // get a blob you can do whatever you like with
                const blob = stream.toBlob('application/pdf');
        
                // or get a blob URL for display in the browser
                const url = stream.toBlobURL('application/pdf');
            
                cb(blob);
            });
    });

}