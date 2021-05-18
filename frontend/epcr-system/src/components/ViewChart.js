import React, { Component } from 'react';
import Moment from 'react-moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment'
import { MainContext } from '../Auth';
import MainNav from './MainNav';
import Notes from './Notes';
import Attachments from './Attachments';
import '../App.css';
import '../Print.css';
import Table from 'react-bootstrap/Table'

export default class ViewChart extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            sidebarHide: true,
            contentSpacing: '0 0 0 150px',
            chart: [],
            chartsrc: "",
            random: 100,
            notes: []
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.reload = this.reload.bind(this);
        this.generatePDF = this.generatePDF.bind(this);
    }

    componentDidMount() {
        //this.setState({ chartsrc: `http://localhost:3000/api/charts/${this.props.match.params.id}/pdf?locale=${this.context.language}#scrollbar=1` });
        let url = `http://localhost:3000/api/charts/${this.props.match.params.id}`;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, options).then((response) => {
            if (!response.ok) {
                throw Error;
            }
            return response.json();
        }).then(data => {
            if(data.procedures){data.procedures = data.procedures.split('],');}
            if(data.medications){data.medications = data.medications.split('],');}
            if(data.vital_signs){data.vital_signs = data.vital_signs.split('],');}
            this.setState({ chart: data });
        })
            .catch((error) => {
                this.setState({ message: this.context.translate('error') });
            })
        //Notes
        url = 'http://localhost:3000/api/notes/chart/' + this.props.match.params.id;
        options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else
                    throw Error("Failed");
            })
            .then((data) => {
                this.setState({ notes: data });
            })
            .catch((error) => {
            });
    }

    toggleCollapse() {
        this.setState({ contentSpacing: (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px') })
        this.setState({ sidebarHide: !this.state.sidebarHide });
    }

    reload(chartId, language) {
        this.setState({ chartsrc: `http://localhost:3000/api/charts/${chartId}/pdf?locale=${language}#scrollbar=1` });
        this.setState({ random: this.state.random + 1 });
    }

    generatePDF() {
        const input = document.getElementById('printable');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 295;
                const pageHeight = 210;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                const doc = new jsPDF({
                    format: 'a4',
                    unit: 'mm',
                    orientation:'l'
                })
                let position = 10;
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                while (heightLeft >= 0) {
                    position += heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                doc.save(`${this.state.chart.incident_number}-${this.state.chart.lname},${this.state.chart.fname}.pdf`);
            });
    }

    render() {
        const chart = this.state.chart;
        var spacing = (this.state.contentSpacing === '0 0 0 150px') ? "0 0 0 150px" : "0 25px 0 25px";
        const mystyle = {
            padding: spacing
        };
        let notesComps = [];
        this.state.notes.forEach(note => {
            let date = note['dateAdded'];
            notesComps.push(
                <div>
                    <br/><p>{note['note']}</p>
                    <b>{note['name']} - {note['certifications']}</b> - <i>{moment(date).utc().format("DD/MM/YYYY THH:mm")}</i>
                </div>
            );
        });
        return (
            <React.Fragment>
                <MainNav
                    username={this.context.username}
                    viewcharts={true}
                    sidebarHide={this.state.sidebarHide}
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />
                <div className="printable">
                    {/*<iframe title="chart" id='pdfpreview' src={this.state.chartsrc} key={this.state.random}  type="application/pdf" width={"100%"} style={{width: "100%", height:"700px"}}></iframe>*/}
                    <div style={{marginTop:'15px', width:'80%', textAlign:'right'}}>
                        <input type="button" onClick={this.generatePDF} value={this.context.translate('save')}/>
                    </div>
                </div>
                <div className="printable" id="printable" style={{fontSize: 20}}>
                    <div className="header">
                        <span>{/* patient name */}</span>
                        <span>RESCATE DE SAN CARLOS</span>
                        <span>{chart["incident_number"]}</span>
                    </div>
                    <table>
                        <tbody>
                            <tr><th colSpan="4" className="heading">{this.context.translate('patient-info')}</th></tr>
                            <tr>
                                <td><b>{this.context.translate('full-name')}</b></td>
                                <td>{chart.lname}, {chart.fname}</td>
                                <td><b>{this.context.translate('pbirth')}</b></td>
                                <td>{chart.birth ? <Moment date={chart.birth} format="DD-MM-YYYY" /> : null}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('psex')}</b></td>
                                <td>{chart.gender}</td>
                                <td><b>{this.context.translate('classify')}</b></td>
                                <td>{chart["p_classify"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('pweight')}</b></td>
                                <td>{chart["p_weight"]} kg</td>
                                <td><b>{this.context.translate('braslow')}</b></td>
                                <td>{chart["p_bcolor"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('address')}</b></td>
                                <td>{chart["p_address"]}</td>
                                <td><b>{this.context.translate('phone')}</b></td>
                                <td>{chart["p_phone"]}</td>
                            </tr>
                            {chart["patient_count"] !== null && chart["triage_color"] !== null
                                ? <tr><th colSpan="4" className="heading">{this.context.translate('mci')}</th></tr>
                                : null}
                            {chart["patient_count"] !== null && chart["triage_color"] !== null ?
                                <tr>
                                    <td><b>{this.context.translate('num-patients')}</b></td>
                                    <td>{chart["patient_count"]}</td>
                                    <td><b>{this.context.translate('triage')}</b></td>
                                    <td>{chart["triage_color"]}</td>
                                </tr>
                                : null}
                            <tr><th colSpan="4" className="heading">{this.context.translate('call-info')}</th></tr>
                            <tr>
                                <td><b>{this.context.translate('ino')}</b></td>
                                <td>{chart["incident_number"]}</td>
                                <td><b>{this.context.translate('unit')}</b></td>
                                <td>{chart["unit_number"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('idate')}</b></td>
                                <td>{chart["incident_date"] && <Moment date={chart["incident_date"]} format="DD-MM-YYYY" />}</td>
                                <td><b>{this.context.translate('call-type')}</b></td>
                                <td>{chart["call_type"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('location')}</b></td>
                                <td>{chart["location"]}</td>
                                <td><b>{this.context.translate('call-nature')}</b></td>
                                <td>{chart["call_nature"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('iaddress')}</b></td>
                                <td>{chart["incident_address"]}</td>
                                <td><b>{this.context.translate('disposition')}</b></td>
                                <td>{chart["disposition"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('other-agencies')}</b></td>
                                <td>{chart["agencies"]}</td>
                                <td><b>{this.context.translate('destination')}</b></td>
                                <td>{chart["destination"]}</td>
                            </tr>
                            <tr><th colSpan="4" className="heading">{this.context.translate('response-times')}</th></tr>
                            <tr>
                                <td><b>{this.context.translate('dispatch')}</b></td>
                                <td colSpan="3" className="long">{chart["dispatch_date_time"] && <Moment date={chart["dispatch_date_time"]} format="DD-MM-YYYY THH:mm" />}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('enroute')}</b></td>
                                <td colSpan="3" className="long">{chart["enroute_date_time"] && <Moment date={chart["enroute_date_time"]} format="DD-MM-YYYY THH:mm" />}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('arrscn')}</b></td>
                                <td colSpan="3" className="long">{chart["arrive_date_time"] && <Moment date={chart["arrive_date_time"]} format="DD-MM-YYYY THH:mm" />}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('pcontact')}</b></td>
                                <td colSpan="3" className="long">{chart["patient_contact_date_time"] && <Moment date={chart["patient_contact_date_time"]} format="DD-MM-YYYY THH:mm" />}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('dptscn')}</b></td>
                                <td colSpan="3" className="long">{chart["depart_date_time"] && <Moment date={chart["depart_date_time"]} format="DD-MM-YYYY THH:mm" />}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('arrdes')}</b></td>
                                <td colSpan="3" className="long">{chart["arrive_destination_date_time"] && <Moment date={chart["arrive_destination_date_time"]} format="DD-MM-YYYY THH:mm" />}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('trcare')}</b></td>
                                <td colSpan="3" className="long">{chart["transfer_date_time"] && <Moment date={chart["transfer_date_time"]} format="DD-MM-YYYY THH:mm" />}</td>
                            </tr>
                        </tbody>
                    </table>
                    {chart["trauma_cause"] !== "" ?
                        <table>
                            <tbody>
                                <tr><th colSpan="4" className="heading">{this.context.translate('trauma-cause')}</th></tr>
                                {chart["trauma_cause"] === "Caída" ?
                                    <tr>
                                        <td><b>Trauma</b></td>
                                        <td>{chart["trauma_cause"].split(", ")[0]}</td>
                                        <td><b>{this.context.translate('fallht')}</b></td>
                                        <td>{chart["trauma_cause"].split(", ")[1]} m</td>
                                    </tr>
                                    : <tr>
                                        <td><b>Trauma</b></td>
                                        <td colSpan="3" className="long">{chart["trauma_cause"]}</td>
                                    </tr>
                                }
                                {chart["trauma_cause"] === "Vehículo de motor" || chart["vehicle_accident_type"] !== null ?
                                    <tr>
                                        <td><b>{this.context.translate('type')}</b></td>
                                        <td>{chart["vehicle_accident_type"]}</td>
                                        <td><b>{this.context.translate('safety-equip')}</b></td>
                                        <td>{chart["vehicle_accident_safety_equipment"]}</td>
                                    </tr>
                                    : null}
                                {chart["trauma_cause"] === "Vehículo de motor" || chart["vehicle_accident_type"] !== null ?
                                    <tr>
                                        <td><b>{this.context.translate('impact')}</b></td>
                                        <td>{chart["vehicle_accident_impact"]}</td>
                                        <td><b>{this.context.translate('est-spd')}</b></td>
                                        <td>{chart["vehicle_accident_mph"]}</td>
                                    </tr>
                                    : null}
                                {chart["trauma_cause"] === "Vehículo de motor" || chart["vehicle_accident_type"] !== null ?
                                    <tr>
                                        <td><b>{this.context.translate('eject-vehicle')}</b></td>
                                        <td colSpan="3" className="long">{chart["vehicle_accident_ejected"]}</td>
                                    </tr>
                                    : null}
                            </tbody>
                        </table>
                        : null}
                    <table>
                        <tbody>
                            <tr><th colSpan="4" className="heading">{this.context.translate('assessments')}</th></tr>
                            {chart.skin ?
                            <tr>
                                <td><b>{this.context.translate('Skin')}</b></td>
                                <td colSpan="3" className="long">{chart["skin"]}</td>
                            </tr>
                            : null}
                            {chart.mental ?
                            <tr>
                                <td><b>{this.context.translate('Mental')}</b></td>
                                <td colSpan="3" className="long">{chart["mental"]}</td>
                            </tr>
                                : null}
                            {chart.neurological ?
                            <tr>
                                <td><b>{this.context.translate('Neurological')}</b></td>
                                <td colSpan="3" className="long">{chart["neurological"]}</td>
                            </tr>
                                : null}
                            {chart.head ?
                            <tr>
                                <td><b>{this.context.translate('Head')}</b></td>
                                <td colSpan="3" className="long">{chart["head"]}</td>
                            </tr>
                            : null}
                            {chart.neck ?
                            <tr>
                                <td><b>{this.context.translate('Neck')}</b></td>
                                <td colSpan="3" className="long">{chart["neck"]}</td>
                            </tr>
                            : null}
                            {chart.chest ?
                            <tr>
                                <td><b>{this.context.translate('Chest')}</b></td>
                                <td colSpan="3" className="long">{chart["chest"]}</td>
                            </tr>
                            : null}
                            {chart.pulse_strength || chart.pulse_rate ?
                            <tr>
                                <td><b>{this.context.translate('Pulse')}</b></td>
                                <td colSpan="3" className="long">
                                    {this.context.translate('Pulse-Strength')}: {chart["pulse_strength"]}<br />
                                    {this.context.translate('Pulse-Rate')}: {chart["pulse_rate"]}
                                </td>
                            </tr>
                            : null}
                            {chart.abdomen ?
                            <tr>
                                <td><b>{this.context.translate('Abdomen')}</b></td>
                                <td colSpan="3" className="long">{chart["abdomen"]}</td>
                            </tr>
                            : null}
                            {chart.pelvis ?
                            <tr>
                                <td><b>{this.context.translate('Pelvis')}</b></td>
                                <td colSpan="3" className="long">{chart["pelvis"]}</td>
                            </tr>
                            : null}
                            {chart.back ?
                            <tr>
                                <td><b>{this.context.translate('Back')}</b></td>
                                <td colSpan="3" className="long">{chart["back"]}</td>
                            </tr>
                            : null}
                            {chart.left_upper_arm ?
                            <tr>
                                <td><b>{this.context.translate('Left-upper-arm')}</b></td>
                                <td colSpan="3" className="long">{chart["left_upper_arm"]}</td>
                            </tr>
                            : null}
                            {chart.left_lower_arm ?
                            <tr>
                                <td><b>{this.context.translate('Left-lower-arm')}</b></td>
                                <td colSpan="3" className="long">{chart["left_lower_arm"]}</td>
                            </tr>
                            : null}
                            {chart.left_hand_wrist ?
                            <tr>
                                <td><b>{this.context.translate('Left-hand-/-wrist')}</b></td>
                                <td colSpan="3" className="long">{chart["left_hand_wrist"]}</td>
                            </tr>
                            : null}
                            {chart.left_upper_leg ?
                            <tr>
                                <td><b>{this.context.translate('Left-upper-leg')}</b></td>
                                <td colSpan="3" className="long">{chart["left_upper_leg"]}</td>
                            </tr>
                            : null}
                            {chart.left_lower_leg ?
                            <tr>
                                <td><b>{this.context.translate('Left-lower-leg')}</b></td>
                                <td colSpan="3" className="long">{chart["left_lower_leg"]}</td>
                            </tr>
                            : null}
                            {chart.left_ankle_foot ?
                            <tr>
                                <td><b>{this.context.translate('Left-ankle-/-foot')}</b></td>
                                <td colSpan="3" className="long">{chart["left_ankle_foot"]}</td>
                            </tr>
                            : null}
                            {chart.right_upper_arm ?
                            <tr>
                                <td><b>{this.context.translate('Right-upper-arm')}</b></td>
                                <td colSpan="3" className="long">{chart["right_upper_arm"]}</td>
                            </tr>
                            : null}
                            {chart.right_lower_arm ?
                            <tr>
                                <td><b>{this.context.translate('Right-lower-arm')}</b></td>
                                <td colSpan="3" className="long">{chart["right_lower_arm"]}</td>
                            </tr>
                            : null}
                            {chart.right_hand_wrist ?
                            <tr>
                                <td><b>{this.context.translate('Right-hand-/-wrist')}</b></td>
                                <td colSpan="3" className="long">{chart["right_hand_wrist"]}</td>
                            </tr>
                            : null}
                            {chart.right_upper_leg ?
                            <tr>
                                <td><b>{this.context.translate('Right-upper-leg')}</b></td>
                                <td colSpan="3" className="long">{chart["right_upper_leg"]}</td>
                            </tr>
                            : null}
                            {chart.right_lower_leg ?
                            <tr>
                                <td><b>{this.context.translate('Right-lower-leg')}</b></td>
                                <td colSpan="3" className="long">{chart["right_lower_leg"]}</td>
                            </tr>
                            : <br/>}
                            {chart.right_ankle_foot ?
                            <tr>
                                <td><b>{this.context.translate('Right-ankle-/-foot')}</b></td>
                                <td colSpan="3" className="long">{chart["right_ankle_foot"]}</td>
                            </tr>
                            : null}
                            <tr><th colSpan="4">{this.context.translate('Additional-findings')}</th></tr>
                            <tr><td colSpan="4" style={{textAlign:'center'}}>{chart["extra_findings"]}</td></tr>
                            {chart["burn_calculation"] !== "0" ? <tr><th colSpan="4">{this.context.translate('burn-calculation')}</th></tr> : null}
                            {chart["burn_calculation"] !== "0" ? <tr><td colSpan="4" style={{textAlign:'center'}}>{chart["burn_calculation"]}%</td></tr> : null}
                            {chart["stroke_time"] !== "" ? <tr><th colSpan="4" className="heading">{this.context.translate('Stroke-')}</th></tr> : null}
                            {chart["stroke_time"] !== "" ?
                                <tr>
                                    <td><b>{this.context.translate('Time-of-onset')}</b></td>
                                    <td>{chart["stroke_time"]}</td>
                                    <td><b>{this.context.translate('Facial-droop')}</b></td>
                                    <td>{chart["stroke_facial_droop"]}</td>
                                </tr>
                                : null}
                            {chart["stroke_time"] !== "" ?
                                <tr>
                                    <td><b>{this.context.translate('Arm-Drift')}</b></td>
                                    <td>{chart["stroke_arm_drift"]}</td>
                                    <td><b>{this.context.translate('Abnormal-Speech')}</b></td>
                                    <td>{chart["stroke_abnormal_speech"]}</td>
                                </tr>
                                : null}
                            <tr><th colSpan="4" className="heading">{this.context.translate('history')}</th></tr>
                            <tr>
                                <td><b>{this.context.translate('given-by')}</b></td>
                                <td colSpan="3" className="long">{chart["p_history_given"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('reg-med')}</b></td>
                                <td colSpan="3" className="long">{chart["p_regular_medicine"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('med-allergy')}</b></td>
                                <td colSpan="3" className="long">{chart["p_medication_allergies"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('env-allergy')}</b></td>
                                <td colSpan="3" className="long">{chart["p_environmental_allergies"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('immunization')}</b></td>
                                <td colSpan="3" className="long">{chart["p_immunizations"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('past-history')}</b></td>
                                <td colSpan="3" className="long">{chart["p_past_medical_history"]}</td>
                            </tr>
                            <tr>
                                <td><b>{this.context.translate('hpi')}</b></td>
                                <td colSpan="3" className="long">{chart["p_hpi"]}</td>
                            </tr>
                        </tbody>
                    </table>
                    {chart.vital_signs ?
                        <Table striped bordered>
                            <thead>
                                <tr><th colSpan="8" className="heading">{this.context.translate('Vitals')}</th></tr>
                                <tr>
                                    <th>{this.context.translate('Time')}</th>
                                    <th>{this.context.translate('Pulse')}</th>
                                    <th>{this.context.translate('B/P')}</th>
                                    <th>{this.context.translate('Resp')}</th>
                                    <th>{this.context.translate('Sp02')}</th>
                                    <th>{this.context.translate('Temp')}</th>
                                    <th>{this.context.translate('ETCO2')}</th>
                                    <th>{this.context.translate('GCS')}</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {chart.vital_signs && chart.vital_signs.map((element, idx) => {
                                    element = element.replace('[', '');
                                    element = element.replace(']', '');
                                    var sepereated = element.split('|');
                                    sepereated[0] = sepereated[0].replace('Hora:', '');
                                    sepereated[1] = sepereated[1].replace('Pulso:', '');
                                    sepereated[2] = sepereated[2].replace('B/P:', '');
                                    sepereated[3] = sepereated[3].replace('Resp:', '');
                                    sepereated[4] = sepereated[4].replace('Sp02:', '');
                                    sepereated[5] = sepereated[5].replace('GCS:', '');
                                    sepereated[6] = sepereated[6].replace('Dolor:', '');
                                    sepereated[7] = sepereated[7].replace('Temp:', '');
                                    return (
                                        <tr>
                                            <td>
                                                {sepereated[0]}
                                            </td>
                                            <td>
                                                {sepereated[1]}
                                            </td>
                                            <td>
                                                {sepereated[2]}
                                            </td>
                                            <td>
                                                {sepereated[3]}
                                            </td>
                                            <td>
                                                {sepereated[4]}
                                            </td>
                                            <td>
                                                {sepereated[7]}
                                            </td>
                                            <td>
                                                {sepereated[6]}
                                            </td>
                                            <td>
                                                {sepereated[5]}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            </Table>
                            : null}
                    <table>
                        <tbody>
                            <tr><th colSpan="4" className="heading">{this.context.translate('interventions')}</th></tr>
                            <tr><th colSpan="4">{this.context.translate('procedures')}</th></tr>
                            <tr><td colSpan="4" style={{ textAlign: 'center' }}>{chart.procedures && chart.procedures.map((element, idx) => {
                                return (
                                    <div>
                                        {element}
                                        <br />
                                    </div>
                                )
                            })}</td></tr>
                            <tr><th colSpan="4">{this.context.translate('medications')}</th></tr>
                            <tr><td colSpan="4" style={{ textAlign: 'center' }}>{chart.medications && chart.medications.map((element, idx) => {
                                return (
                                    <div>
                                        {element}
                                        <br />
                                    </div>
                                )
                            })}</td></tr>
                            {chart["intake_bleeding"] !== "" || chart["intake_iv_fluids"] !== "" || chart["intake_oral_fluids"] !== "" || chart["intake_vomit"] !== "" ?
                                <tr><th colSpan="4" className="heading">{this.context.translate('intake-output')}</th></tr>
                                : null}
                            {chart["intake_bleeding"] !== "" || chart["intake_iv_fluids"] !== "" || chart["intake_oral_fluids"] !== "" || chart["intake_vomit"] !== "" ?
                                <tr>
                                    <td><b>{this.context.translate('bleeding')}</b></td>
                                    <td>{chart["intake_bleeding"]}</td>
                                    <td><b>{this.context.translate('iv-fluid')}</b></td>
                                    <td>{chart["intake_iv_fluids"]}</td>
                                </tr>
                                : null}
                            {chart["intake_bleeding"] !== "" || chart["intake_iv_fluids"] !== "" || chart["intake_oral_fluids"] !== "" || chart["intake_vomit"] !== "" ?
                                <tr>
                                    <td><b>{this.context.translate('vomit')}</b></td>
                                    <td>{chart["intake_vomit"]}</td>
                                    <td><b>{this.context.translate('oral-fluid')}</b></td>
                                    <td>{chart["intake_oral_fluids"]}</td>
                                </tr>
                                : null}
                            {chart["obstetrics"] !== "" ? <tr><th colSpan="4" className="heading">{this.context.translate('obstetrics')}</th></tr> : null}
                            {chart["obstetrics"] !== "" ? <tr><td colSpan="4">{chart["obstetrics"]}</td></tr> : null}
                            <tr><th colSpan="4" className="heading">{this.context.translate('ambulance-crew')}</th></tr>
                            <tr>
                                <td colSpan="4" style={{textAlign:'center'}}>{chart["ambulance_crew"]}</td>
                            </tr>
                            <tr><th colSpan="4" className="heading">{this.context.translate('note-title')}</th></tr>
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'left' }}>{notesComps}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Notes /*reload={this.reload}*/ chartId={this.props.match.params.id} />
                <Attachments chartId={this.props.match.params.id} />
            </React.Fragment >
        )

    }
}