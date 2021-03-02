const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');
const fs = require('fs');

function createChartPDF(info, locale, cb){
    // create a document the same way as above

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
                .fontSize(25)
                .text(`
                ${tags.patientName}: ${info.fName} ${info.lName}
                ${tags.ePCR}`, {
                    align: 'center'
                })
                .moveDown()
                // Demogrphics:
                .text(`
                    ${tags.demographics}
                    ${tags.fName}: ${info.fName}
                    ${tags.lName}: ${info.lName}
                    ${tags.classificationText}: ${tags.classifications[info.classify]}
                    ${tags.DOB}: ${info.DOB}
                    ${tags.weight}: ${info.weight} kg
                    ${tags.braslow}: ${tags.colors[info.braslow]}
                    ${tags.sex}: ${info.sex}
                    ${tags.address}: ${info.address}
                    ${tags.phone}: ${info.phone}
                    
                `, {
                     align: 'left'
                })
                .moveDown()
                .text(`${tags.callInformation}`, {align: 'center', width: 410})
                .text(`
                    ${tags.incidentNumber}: ${info.incidentNumber}
                    ${tags.unitNumber}: ${info.unitNumber}
                    ${tags.callType}: ${tags.callTypes[info.callType]}
                    ${tags.callNature}: ${tags.callNatures[info.callNature]}
                    ${tags.incident}: ${info.incident}
                    ${tags.location}: ${tags.locations[info.location]}
                    ${tags.incidentAddress}: ${info.incidentAddress}
                    ${tags.disposition}: ${tags.dispositions[info.disposition]}
                    ${tags.destination}: ${tags.destinations[info.destination]}
                    ${tags.agency}: ${tags.agencies[info.agency] || info.agency}
                    ${trags.trauma}: ${tags.traumas[info.trauma] || info.trauma}
                `, { align: 'left' })
                .text(`MCI`, {align: 'center', width: 410})
                .text(`
                    ${tags.numberOfPatients}: ${info.numberOfPatients}
                    ${tags.triageColor}: ${tags.colors[info.mci]}
                `, { align: 'left' })
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