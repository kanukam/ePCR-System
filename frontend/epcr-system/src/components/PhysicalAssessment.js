import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MainContext } from '../Auth'
import '../styles/PhysicalAssessment.css'
import ShowVital from './ShowVital'

export default class PhysicalAssessment extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    navigate = step => (e) => {
        e.preventDefault();
        this.props.navigate(step);
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    addVitals = (e) => {
        e.preventDefault();
        if (this.props.values.vital_signs_time === "" || this.props.values.vital_signs_pulse === "" || this.props.values.vital_signs_b_p_s === "" || this.props.values.vital_signs_b_p_d === "" || this.props.values.vital_signs_resp === "" || this.props.values.vital_signs_spo2 === "" || this.props.values.vital_signs_gcs_e === "" || this.props.values.vital_signs_gcs_v === "" || this.props.values.vital_signs_gcs_m === "" || this.props.values.vital_signs_temp === "" || this.props.values.vital_signs_etco2 === "") {
            this.setState({ message: "required-fields" });
        } else {
            const vitals = "[Hora: " + this.props.values.vital_signs_time + " | Pulso: " + this.props.values.vital_signs_pulse + " | B/P: " + this.props.values.vital_signs_b_p_s + "/" + this.props.values.vital_signs_b_p_d + " | Resp: " + this.props.values.vital_signs_resp + " | Sp02: " + this.props.values.vital_signs_spo2 + " | GCS: E - " + this.props.values.vital_signs_gcs_e + ", V - " + this.props.values.vital_signs_gcs_v + ", M - " + this.props.values.vital_signs_gcs_m + " | Dolor: " + this.props.values.vital_signs_pain + " | Temp: " + this.props.values.vital_signs_temp + " | ETCO2: " + this.props.values.vital_signs_etco2 + "]";
            this.props.appendVitals(vitals);
            this.setState({ message: "" });
        }
    }

    showOptions = input => event => {
        var labels = document.getElementsByClassName('exam_label');
        var options = document.getElementsByClassName('exam_option');
        for (var i = 0; i < options.length; i++) {
            if (input === i) {
                labels[i].classList.add('active');
                options[i].style.display = "block";
            }
            else {
                labels[i].classList.remove('active');
                options[i].style.display = "none";
            }
        }
    }
    
    selectPain = input => event => {
        var pain = document.getElementsByClassName('pain');
        for(var i = 0; i < pain.length; i++) {
            if(input === i) {
                pain[i].classList.add('selected');
                this.props.setPain(input);
            }
            else { pain[i].classList.remove('selected'); }
        }
    }

    render() {
        const { values } = this.props;
        var vitalList = [];
        for (var i = 0; i < values.vital_signs.length; i++) {
            var current = values.vital_signs[i].split(" | ");
            var etco2 = current[current.length - 1];
            etco2 = etco2.substring(etco2.lastIndexOf(": ") + 2, etco2.indexOf("]"));
            vitalList.push(<ShowVital
                time={current[0].split(": ")[1]}
                pulse={current[1].split(": ")[1]}
                bp={current[2].split(": ")[1]}
                resp={current[3].split(": ")[1]}
                sp02={current[4].split(": ")[1]}
                gcs={current[5].split(": ")[1]}
                pain={current[6].split(": ")[1]}
                temp={current[7].split(": ")[1]}
                etco2={etco2}
            />)
        }
        return (
            <div className="assessment">
                <div className="content">
                    <h2 className="mb-2">{this.context.translate('physical-exam')}</h2>
                    <h3>{this.context.translate('assessments')}</h3>
                    <Row>
                        <Col>
                            <div className="exam_label active" onClick={this.showOptions(0)}>{this.context.translate('Skin')}</div>
                            <div className="exam_label" onClick={this.showOptions(1)}>{this.context.translate('Mental')}</div>
                            <div className="exam_label" onClick={this.showOptions(2)}>{this.context.translate('Neurological')}</div>
                            <div className="exam_label" onClick={this.showOptions(3)}>{this.context.translate('Head')}</div>
                            <div className="exam_label" onClick={this.showOptions(4)}>{this.context.translate('Neck')}</div>
                            <div className="exam_label" onClick={this.showOptions(5)}>{this.context.translate('Chest')}</div>
                            <div className="exam_label" onClick={this.showOptions(6)}>{this.context.translate('Abdomen')}</div>
                            <div className="exam_label" onClick={this.showOptions(7)}>{this.context.translate('Pelvis')}</div>
                            <div className="exam_label" onClick={this.showOptions(8)}>{this.context.translate('Back')}</div>
                            <div>
                                <div className="exam_split">{this.context.translate('Upper-arm')}</div>
                                <div className="exam_label v2" onClick={this.showOptions(9)}>{this.context.translate('Left')}</div>
                                <div className="exam_label v3" onClick={this.showOptions(10)}>{this.context.translate('Right')}</div>
                            </div>
                            <div>
                                <div className="exam_split">{this.context.translate('Lower-arm')}</div>
                                <div className="exam_label v2" onClick={this.showOptions(11)}>{this.context.translate('Left')}</div>
                                <div className="exam_label v3" onClick={this.showOptions(12)}>{this.context.translate('Right')}</div>
                            </div>
                            <div>
                                <div className="exam_split">{this.context.translate('Hand-wrist')}</div>
                                <div className="exam_label v2" onClick={this.showOptions(13)}>{this.context.translate('Left')}</div>
                                <div className="exam_label v3" onClick={this.showOptions(14)}>{this.context.translate('Right')}</div>
                            </div>
                            <div>
                                <div className="exam_split">{this.context.translate('Upper-leg')}</div>
                                <div className="exam_label v2" onClick={this.showOptions(15)}>{this.context.translate('Left')}</div>
                                <div className="exam_label v3" onClick={this.showOptions(16)}>{this.context.translate('Right')}</div>
                            </div>
                            <div>
                                <div className="exam_split">{this.context.translate('Lower-leg')}</div>
                                <div className="exam_label v2" onClick={this.showOptions(17)}>{this.context.translate('Left')}</div>
                                <div className="exam_label v3" onClick={this.showOptions(18)}>{this.context.translate('Right')}</div>
                            </div>
                            <div className="last-child">
                                <div className="exam_split">{this.context.translate('Ankle-foot')}</div>
                                <div className="exam_label v2" onClick={this.showOptions(19)}>{this.context.translate('Left')}</div>
                                <div className="exam_label v3" onClick={this.showOptions(20)}>{this.context.translate('Right')}</div>
                            </div>
                        </Col>
                        <Col>
                            <div id="skin" className="exam_option" style={{ display: 'block' }}>
                                <b>{this.context.translate('Skin')}</b>
                                <label><input type="checkbox" name="skin" value="Normal" checked={values.assessmentCheckBoxes[1]} onChange={this.props.handleAssessmentCheckboxes(1)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="skin" value="Pálido" checked={values.assessmentCheckBoxes[2]} onChange={this.props.handleAssessmentCheckboxes(2)} /> {this.context.translate('Pale')}</label>
                                <label><input type="checkbox" name="skin" value="Cianótico" checked={values.assessmentCheckBoxes[3]} onChange={this.props.handleAssessmentCheckboxes(3)} /> {this.context.translate('Cyanotic')}</label>
                                <label><input type="checkbox" name="skin" value="Moteado" checked={values.assessmentCheckBoxes[4]} onChange={this.props.handleAssessmentCheckboxes(4)} /> {this.context.translate('Mottled')}</label>
                                <label><input type="checkbox" name="skin" value="recarga capilar <2 sec" checked={values.assessmentCheckBoxes[5]} onChange={this.props.handleAssessmentCheckboxes(5)} /> {this.context.translate('Cap-refill-<2-sec')}</label>
                                <label><input type="checkbox" name="skin" value="recarga capilar >4sec" checked={values.assessmentCheckBoxes[6]} onChange={this.props.handleAssessmentCheckboxes(6)} /> {this.context.translate('Cap-refill-2-4-sec')}</label>
                                <label><input type="checkbox" name="skin" value="Caliente" checked={values.assessmentCheckBoxes[7]} onChange={this.props.handleAssessmentCheckboxes(7)} /> {this.context.translate('Hot')}</label>
                                <label><input type="checkbox" name="skin" value="Fresco / Frío" checked={values.assessmentCheckBoxes[8]} onChange={this.props.handleAssessmentCheckboxes(8)} /> {this.context.translate('Cool/cold')}</label>
                                <label><input type="checkbox" name="skin" value="Húmedo" checked={values.assessmentCheckBoxes[9]} onChange={this.props.handleAssessmentCheckboxes(9)} /> {this.context.translate('Clammy')}</label>
                                <label><input type="checkbox" name="skin" value="Diaforético" checked={values.assessmentCheckBoxes[10]} onChange={this.props.handleAssessmentCheckboxes(10)} /> {this.context.translate('Diaphoretic')}</label>
                                <label><input type="checkbox" name="skin" value="Enrojecida" checked={values.assessmentCheckBoxes[11]} onChange={this.props.handleAssessmentCheckboxes(11)} /> {this.context.translate('Flushed')}</label>
                                <label><input type="checkbox" name="skin" value="Erupción" checked={values.assessmentCheckBoxes[12]} onChange={this.props.handleAssessmentCheckboxes(12)} /> {this.context.translate('Rash')}</label>
                            </div>
                            <div id="mental" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Mental')}</b>
                                <label><input type="checkbox" name="mental" value="Normal" checked={values.assessmentCheckBoxes[13]} onChange={this.props.handleAssessmentCheckboxes(13)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="mental" value="Persona orientado" checked={values.assessmentCheckBoxes[14]} onChange={this.props.handleAssessmentCheckboxes(14)} /> {this.context.translate('Oriented-person')}</label>
                                <label><input type="checkbox" name="mental" value="Lugar orientado" checked={values.assessmentCheckBoxes[15]} onChange={this.props.handleAssessmentCheckboxes(15)} /> {this.context.translate('Oriented-place')}</label>
                                <label><input type="checkbox" name="mental" value="Tiempo orientado" checked={values.assessmentCheckBoxes[16]} onChange={this.props.handleAssessmentCheckboxes(16)} /> {this.context.translate('Oriented-time')}</label>
                                <label><input type="checkbox" name="mental" value="Evento orientado" checked={values.assessmentCheckBoxes[17]} onChange={this.props.handleAssessmentCheckboxes(17)} /> {this.context.translate('Oriented-event')}</label>
                                <label><input type="checkbox" name="mental" value="Confundido" checked={values.assessmentCheckBoxes[18]} onChange={this.props.handleAssessmentCheckboxes(18)} /> {this.context.translate('Confused')}</label>
                                <label><input type="checkbox" name="mental" value="Letárgico" checked={values.assessmentCheckBoxes[19]} onChange={this.props.handleAssessmentCheckboxes(19)} /> {this.context.translate('Lethargic-New')}</label>
                                <label><input type="checkbox" name="mental" value="Insensible" checked={values.assessmentCheckBoxes[20]} onChange={this.props.handleAssessmentCheckboxes(20)} /> {this.context.translate('Unresponsive')}</label>
                                <label><input type="checkbox" name="mental" value="Combativo" checked={values.assessmentCheckBoxes[21]} onChange={this.props.handleAssessmentCheckboxes(21)} /> {this.context.translate('Combative')}</label>
                                <label><input type="checkbox" name="mental" value="Pensamiento suicida / Acción" checked={values.assessmentCheckBoxes[22]} onChange={this.props.handleAssessmentCheckboxes(22)} /> {this.context.translate('Suicidal-thinking/action')}</label>
                                <label><input type="checkbox" name="mental" value="Alucinaciones" checked={values.assessmentCheckBoxes[23]} onChange={this.props.handleAssessmentCheckboxes(23)} /> {this.context.translate('Hallucinations')}</label>
                                <label><input type="checkbox" name="mental" value="Ansioso" checked={values.assessmentCheckBoxes[24]} onChange={this.props.handleAssessmentCheckboxes(24)} /> {this.context.translate('anxious')}</label>
                                <label><input type="checkbox" name="mental" value="Deprimido" checked={values.assessmentCheckBoxes[25]} onChange={this.props.handleAssessmentCheckboxes(25)} /> {this.context.translate('depressed')}</label>
                                <label><input type="checkbox" name="mental" value="Parece deteriorado" checked={values.assessmentCheckBoxes[26]} onChange={this.props.handleAssessmentCheckboxes(26)} /> {this.context.translate('appears_impaired')}</label>
                            </div>
                            <div id="neurological" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Neurological')}</b>
                                <label><input type="checkbox" name="neurological" value="Normal" checked={values.assessmentCheckBoxes[27]} onChange={this.props.handleAssessmentCheckboxes(27)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="neurological" value="Discurso sordo" checked={values.assessmentCheckBoxes[28]} onChange={this.props.handleAssessmentCheckboxes(28)} /> {this.context.translate('Slurred-speech')}</label>
                                <label><input type="checkbox" name="neurological" value="Caída facial izquierda" checked={values.assessmentCheckBoxes[29]} onChange={this.props.handleAssessmentCheckboxes(29)} /> {this.context.translate('Left-facial-droop')}</label>
                                <label><input type="checkbox" name="neurological" value="Caída facial derecha" checked={values.assessmentCheckBoxes[30]} onChange={this.props.handleAssessmentCheckboxes(30)} /> {this.context.translate('Right-facial-droop')}</label>
                                <label><input type="checkbox" name="neurological" value="Debilidad del lado izquierdo" checked={values.assessmentCheckBoxes[31]} onChange={this.props.handleAssessmentCheckboxes(31)} /> {this.context.translate('Left-side-weakness')}</label>
                                <label><input type="checkbox" name="neurological" value="Debilidad del lado derecho" checked={values.assessmentCheckBoxes[32]} onChange={this.props.handleAssessmentCheckboxes(32)} /> {this.context.translate('Right-side-weakness')}</label>
                                <label><input type="checkbox" name="neurological" value="Hemiplejia del lado izquierdo" checked={values.assessmentCheckBoxes[33]} onChange={this.props.handleAssessmentCheckboxes(33)} /> {this.context.translate('Left-side-hemiplegia')}</label>
                                <label><input type="checkbox" name="neurological" value="Hemiplejia del lado derecho" checked={values.assessmentCheckBoxes[34]} onChange={this.props.handleAssessmentCheckboxes(34)} /> {this.context.translate('Right-side-hemiplegia')}</label>
                                <label><input type="checkbox" name="neurological" value="Asimiento" checked={values.assessmentCheckBoxes[35]} onChange={this.props.handleAssessmentCheckboxes(35)} /> {this.context.translate('Seizure')}</label>
                                <label><input type="checkbox" name="neurological" value="Postura" checked={values.assessmentCheckBoxes[36]} onChange={this.props.handleAssessmentCheckboxes(36)} /> {this.context.translate('Posturing')}</label>
                                <label><input type="checkbox" name="neurological" value="Los pupilas señalan" checked={values.assessmentCheckBoxes[37]} onChange={this.props.handleAssessmentCheckboxes(37)} /> {this.context.translate('Pupils-pinpoint')}</label>
                                <label><input type="checkbox" name="neurological" value="Pupilas dilatadas" checked={values.assessmentCheckBoxes[38]} onChange={this.props.handleAssessmentCheckboxes(38)} /> {this.context.translate('Pupils-dilated')}</label>
                                <label><input type="checkbox" name="neurological" value="Pupilas a la izquierda > derecho" checked={values.assessmentCheckBoxes[39]} onChange={this.props.handleAssessmentCheckboxes(39)} /> {this.context.translate('Pupil-Left->-Right')}</label>
                                <label><input type="checkbox" name="neurological" value="Pupilas a la derecha > izquierda" checked={values.assessmentCheckBoxes[40]} onChange={this.props.handleAssessmentCheckboxes(40)} /> {this.context.translate('Pupil-Left->-left')}</label>
                                <label><input type="checkbox" name="neurological" value="Pupilas no reactivos" checked={values.assessmentCheckBoxes[41]} onChange={this.props.handleAssessmentCheckboxes(41)} /> {this.context.translate('Pupils-nonreactive')}</label>
                            </div>
                            <div id="head" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Head')}</b>
                                <label><input type="checkbox" name="head" value="Normal" checked={values.assessmentCheckBoxes[42]} onChange={this.props.handleAssessmentCheckboxes(42)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="head" value="Abrasión" checked={values.assessmentCheckBoxes[43]} onChange={this.props.handleAssessmentCheckboxes(43)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="head" value="Laceración" checked={values.assessmentCheckBoxes[44]} onChange={this.props.handleAssessmentCheckboxes(44)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="head" value="Herida punzante" checked={values.assessmentCheckBoxes[45]} onChange={this.props.handleAssessmentCheckboxes(45)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="head" value="Sangrado" checked={values.assessmentCheckBoxes[46]} onChange={this.props.handleAssessmentCheckboxes(46)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="head" value="Contusión" checked={values.assessmentCheckBoxes[47]} onChange={this.props.handleAssessmentCheckboxes(47)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="head" value="Dolor" checked={values.assessmentCheckBoxes[48]} onChange={this.props.handleAssessmentCheckboxes(48)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="head" value="Hinchazón" checked={values.assessmentCheckBoxes[49]} onChange={this.props.handleAssessmentCheckboxes(49)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="head" value="Deformidad" checked={values.assessmentCheckBoxes[50]} onChange={this.props.handleAssessmentCheckboxes(50)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="head" value="Quemar delantero" checked={values.assessmentCheckBoxes[51]} onChange={this.props.handleAssessmentCheckboxes(51)} /> {this.context.translate('Burn')} ({this.context.translate('front-part')})</label>
                                <label><input type="checkbox" name="head" value="Quemar trasero" checked={values.assessmentCheckBoxes[52]} onChange={this.props.handleAssessmentCheckboxes(52)} /> {this.context.translate('Burn')} ({this.context.translate('back-part')})</label>
                            </div>
                            <div id="neck" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Neck')}</b>
                                <label><input type="checkbox" name="neck" value="Normal" checked={values.assessmentCheckBoxes[53]} onChange={this.props.handleAssessmentCheckboxes(53)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="neck" value="Abrasión" checked={values.assessmentCheckBoxes[54]} onChange={this.props.handleAssessmentCheckboxes(54)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="neck" value="Laceración" checked={values.assessmentCheckBoxes[55]} onChange={this.props.handleAssessmentCheckboxes(55)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="neck" value="Herida punzante" checked={values.assessmentCheckBoxes[56]} onChange={this.props.handleAssessmentCheckboxes(56)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="neck" value="Sangrado" checked={values.assessmentCheckBoxes[57]} onChange={this.props.handleAssessmentCheckboxes(57)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="neck" value="Contusión" checked={values.assessmentCheckBoxes[58]} onChange={this.props.handleAssessmentCheckboxes(58)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="neck" value="Dolor" checked={values.assessmentCheckBoxes[59]} onChange={this.props.handleAssessmentCheckboxes(59)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="neck" value="Hinchazón" checked={values.assessmentCheckBoxes[60]} onChange={this.props.handleAssessmentCheckboxes(60)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="neck" value="Deformidad" checked={values.assessmentCheckBoxes[61]} onChange={this.props.handleAssessmentCheckboxes(61)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="neck" value="Quemar delantero" checked={values.assessmentCheckBoxes[62]} onChange={this.props.handleAssessmentCheckboxes(62)} /> {this.context.translate('Burn')} ({this.context.translate('front-part')})</label>
                                <label><input type="checkbox" name="neck" value="Quemar trasero" checked={values.assessmentCheckBoxes[63]} onChange={this.props.handleAssessmentCheckboxes(63)} /> {this.context.translate('Burn')} ({this.context.translate('back-part')})</label>
                            </div>
                            <div id="chest" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Chest')}</b>
                                <label><input type="checkbox" name="chest" value="Normal" checked={values.assessmentCheckBoxes[64]} onChange={this.props.handleAssessmentCheckboxes(64)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="chest" value="Respiración sibilante" checked={values.assessmentCheckBoxes[65]} onChange={this.props.handleAssessmentCheckboxes(65)} /> {this.context.translate('Wheezing')}</label>
                                <label><input type="checkbox" name="chest" value="Respiración trabajada" checked={values.assessmentCheckBoxes[66]} onChange={this.props.handleAssessmentCheckboxes(66)} /> {this.context.translate('Respiration-labored')}</label>
                                <label><input type="checkbox" name="chest" value="Respiración desigual" checked={values.assessmentCheckBoxes[67]} onChange={this.props.handleAssessmentCheckboxes(67)} /> {this.context.translate('Respiration-uneven')}</label>
                                <label><input type="checkbox" name="chest" value="Respiración superficial" checked={values.assessmentCheckBoxes[68]} onChange={this.props.handleAssessmentCheckboxes(68)} /> {this.context.translate('Respiration-shallow')}</label>
                                <label><input type="checkbox" name="chest" value="Respiración ausente" checked={values.assessmentCheckBoxes[69]} onChange={this.props.handleAssessmentCheckboxes(69)} /> {this.context.translate('Respiration-absent')}</label>
                                <label><input type="checkbox" name="chest" value="Los sonidos izquierdos disminuyeronv" checked={values.assessmentCheckBoxes[70]} onChange={this.props.handleAssessmentCheckboxes(70)} /> {this.context.translate('Breath-sounds-decrease-left')}</label>
                                <label><input type="checkbox" name="chest" value="Sonidos correctos disminuidos" checked={values.assessmentCheckBoxes[71]} onChange={this.props.handleAssessmentCheckboxes(71)} /> {this.context.translate('Breath-sounds-decreased-right')}</label>
                                <label><input type="checkbox" name="chest" value="Abrasión" checked={values.assessmentCheckBoxes[72]} onChange={this.props.handleAssessmentCheckboxes(72)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="chest" value="Laceración" checked={values.assessmentCheckBoxes[73]} onChange={this.props.handleAssessmentCheckboxes(73)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="chest" value="Herida punzante" checked={values.assessmentCheckBoxes[74]} onChange={this.props.handleAssessmentCheckboxes(74)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="chest" value="Sangrado" checked={values.assessmentCheckBoxes[75]} onChange={this.props.handleAssessmentCheckboxes(75)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="chest" value="Contusión" checked={values.assessmentCheckBoxes[76]} onChange={this.props.handleAssessmentCheckboxes(76)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="chest" value="Dolor" checked={values.assessmentCheckBoxes[77]} onChange={this.props.handleAssessmentCheckboxes(77)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="chest" value="Hinchazón" checked={values.assessmentCheckBoxes[78]} onChange={this.props.handleAssessmentCheckboxes(78)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="chest" value="Deformidad" checked={values.assessmentCheckBoxes[79]} onChange={this.props.handleAssessmentCheckboxes(79)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="chest" value="Quemar" checked={values.assessmentCheckBoxes[80]} onChange={this.props.handleAssessmentCheckboxes(80)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="abdomen" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Abdomen')}</b>
                                <label><input type="checkbox" name="abdomen" value="Normal" checked={values.assessmentCheckBoxes[81]} onChange={this.props.handleAssessmentCheckboxes(81)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="abdomen" value="Rígido" checked={values.assessmentCheckBoxes[82]} onChange={this.props.handleAssessmentCheckboxes(82)} /> {this.context.translate('Rigid')}</label>
                                <label><input type="checkbox" name="abdomen" value="Abrasión" checked={values.assessmentCheckBoxes[83]} onChange={this.props.handleAssessmentCheckboxes(83)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="abdomen" value="Laceración" checked={values.assessmentCheckBoxes[84]} onChange={this.props.handleAssessmentCheckboxes(84)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="abdomen" value="Herida punzante" checked={values.assessmentCheckBoxes[85]} onChange={this.props.handleAssessmentCheckboxes(85)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="abdomen" value="Sangrado" checked={values.assessmentCheckBoxes[86]} onChange={this.props.handleAssessmentCheckboxes(86)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="abdomen" value="Contusión" checked={values.assessmentCheckBoxes[87]} onChange={this.props.handleAssessmentCheckboxes(87)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="abdomen" value="Dolor" checked={values.assessmentCheckBoxes[88]} onChange={this.props.handleAssessmentCheckboxes(88)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="abdomen" value="Hinchazón" checked={values.assessmentCheckBoxes[89]} onChange={this.props.handleAssessmentCheckboxes(89)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="abdomen" value="Deformidad" checked={values.assessmentCheckBoxes[90]} onChange={this.props.handleAssessmentCheckboxes(90)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="abdomen" value="Quemar" checked={values.assessmentCheckBoxes[91]} onChange={this.props.handleAssessmentCheckboxes(91)} /> {this.context.translate('Burn')}</label>
                                <label><input type="checkbox" name="abdomen" value="Embarazada" checked={values.assessmentCheckBoxes[92]} onChange={this.props.handleAssessmentCheckboxes(92)} /> {this.context.translate('Pregnant')}</label>
                            </div>
                            <div id="pelvis" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Pelvis')}</b>
                                <label><input type="checkbox" name="pelvis" value="Normal" checked={values.assessmentCheckBoxes[93]} onChange={this.props.handleAssessmentCheckboxes(93)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="pelvis" value="Abrasión" checked={values.assessmentCheckBoxes[94]} onChange={this.props.handleAssessmentCheckboxes(94)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="pelvis" value="Laceración" checked={values.assessmentCheckBoxes[95]} onChange={this.props.handleAssessmentCheckboxes(95)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="pelvis" value="Herida punzante" checked={values.assessmentCheckBoxes[96]} onChange={this.props.handleAssessmentCheckboxes(96)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="pelvis" value="Sangrado" checked={values.assessmentCheckBoxes[97]} onChange={this.props.handleAssessmentCheckboxes(97)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="pelvis" value="Contusión" checked={values.assessmentCheckBoxes[98]} onChange={this.props.handleAssessmentCheckboxes(98)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="pelvis" value="Dolor" checked={values.assessmentCheckBoxes[99]} onChange={this.props.handleAssessmentCheckboxes(99)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="pelvis" value="Hinchazón" checked={values.assessmentCheckBoxes[100]} onChange={this.props.handleAssessmentCheckboxes(100)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="pelvis" value="Deformidad" checked={values.assessmentCheckBoxes[101]} onChange={this.props.handleAssessmentCheckboxes(101)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="pelvis" value="Quemar" checked={values.assessmentCheckBoxes[102]} onChange={this.props.handleAssessmentCheckboxes(102)} /> {this.context.translate('Burn')}</label>
                                <label><input type="checkbox" name="pelvis" value="Entumecimiento" checked={values.assessmentCheckBoxes[103]} onChange={this.props.handleAssessmentCheckboxes(103)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="pelvis" value="Inestable" checked={values.assessmentCheckBoxes[104]} onChange={this.props.handleAssessmentCheckboxes(104)} /> {this.context.translate('Unstable')}</label>
                            </div>
                            <div id="back" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Back')}</b>
                                <label><input type="checkbox" name="back" value="Normal" checked={values.assessmentCheckBoxes[105]} onChange={this.props.handleAssessmentCheckboxes(105)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="back" value="Abrasión" checked={values.assessmentCheckBoxes[106]} onChange={this.props.handleAssessmentCheckboxes(106)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="back" value="Laceración" checked={values.assessmentCheckBoxes[107]} onChange={this.props.handleAssessmentCheckboxes(107)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="back" value="Herida punzante" checked={values.assessmentCheckBoxes[108]} onChange={this.props.handleAssessmentCheckboxes(108)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="back" value="Sangrado" checked={values.assessmentCheckBoxes[109]} onChange={this.props.handleAssessmentCheckboxes(109)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="back" value="Contusión" checked={values.assessmentCheckBoxes[110]} onChange={this.props.handleAssessmentCheckboxes(110)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="back" value="Dolor" checked={values.assessmentCheckBoxes[111]} onChange={this.props.handleAssessmentCheckboxes(111)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="back" value="Hinchazón" checked={values.assessmentCheckBoxes[112]} onChange={this.props.handleAssessmentCheckboxes(112)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="back" value="Deformidad" checked={values.assessmentCheckBoxes[113]} onChange={this.props.handleAssessmentCheckboxes(113)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="back" value="Quemar" checked={values.assessmentCheckBoxes[114]} onChange={this.props.handleAssessmentCheckboxes(114)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="left_upper_arm" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Left-upper-arm')}</b>
                                <label><input type="checkbox" name="left_upper_arm" value="Normal" checked={values.assessmentCheckBoxes[115]} onChange={this.props.handleAssessmentCheckboxes(115)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="left_upper_arm" value="Abrasión" checked={values.assessmentCheckBoxes[116]} onChange={this.props.handleAssessmentCheckboxes(116)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="left_upper_arm" value="Laceración" checked={values.assessmentCheckBoxes[117]} onChange={this.props.handleAssessmentCheckboxes(117)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="left_upper_arm" value="Herida punzante" checked={values.assessmentCheckBoxes[118]} onChange={this.props.handleAssessmentCheckboxes(118)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="left_upper_arm" value="Sangrado" checked={values.assessmentCheckBoxes[119]} onChange={this.props.handleAssessmentCheckboxes(119)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="left_upper_arm" value="Contusión" checked={values.assessmentCheckBoxes[120]} onChange={this.props.handleAssessmentCheckboxes(120)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="left_upper_arm" value="Dolor" checked={values.assessmentCheckBoxes[121]} onChange={this.props.handleAssessmentCheckboxes(121)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="left_upper_arm" value="Hinchazón" checked={values.assessmentCheckBoxes[122]} onChange={this.props.handleAssessmentCheckboxes(122)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="left_upper_arm" value="Deformidad" checked={values.assessmentCheckBoxes[123]} onChange={this.props.handleAssessmentCheckboxes(123)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="left_upper_arm" value="Fractura abierta" checked={values.assessmentCheckBoxes[124]} onChange={this.props.handleAssessmentCheckboxes(124)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="left_upper_arm" value="Entumecimiento" checked={values.assessmentCheckBoxes[125]} onChange={this.props.handleAssessmentCheckboxes(125)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="left_upper_arm" value="Quemar" checked={values.assessmentCheckBoxes[126]} onChange={this.props.handleAssessmentCheckboxes(126)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="right_upper_arm" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Right-upper-arm')}</b>
                                <label><input type="checkbox" name="right_upper_arm" value="Normal" checked={values.assessmentCheckBoxes[127]} onChange={this.props.handleAssessmentCheckboxes(127)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="right_upper_arm" value="Abrasión" checked={values.assessmentCheckBoxes[128]} onChange={this.props.handleAssessmentCheckboxes(128)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="right_upper_arm" value="Laceración" checked={values.assessmentCheckBoxes[129]} onChange={this.props.handleAssessmentCheckboxes(129)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="right_upper_arm" value="Herida punzante" checked={values.assessmentCheckBoxes[130]} onChange={this.props.handleAssessmentCheckboxes(130)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="right_upper_arm" value="Sangrado" checked={values.assessmentCheckBoxes[131]} onChange={this.props.handleAssessmentCheckboxes(131)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="right_upper_arm" value="Contusión" checked={values.assessmentCheckBoxes[132]} onChange={this.props.handleAssessmentCheckboxes(132)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="right_upper_arm" value="Dolor" checked={values.assessmentCheckBoxes[133]} onChange={this.props.handleAssessmentCheckboxes(133)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="right_upper_arm" value="Hinchazón" checked={values.assessmentCheckBoxes[134]} onChange={this.props.handleAssessmentCheckboxes(134)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="right_upper_arm" value="Deformidad" checked={values.assessmentCheckBoxes[135]} onChange={this.props.handleAssessmentCheckboxes(135)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="right_upper_arm" value="Fractura abierta" checked={values.assessmentCheckBoxes[136]} onChange={this.props.handleAssessmentCheckboxes(136)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="right_upper_arm" value="Entumecimiento" checked={values.assessmentCheckBoxes[137]} onChange={this.props.handleAssessmentCheckboxes(137)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="right_upper_arm" value="Quemar" checked={values.assessmentCheckBoxes[138]} onChange={this.props.handleAssessmentCheckboxes(138)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="left_lower_arm" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Left-lower-arm')}</b>
                                <label><input type="checkbox" name="left_lower_arm" value="Normal" checked={values.assessmentCheckBoxes[139]} onChange={this.props.handleAssessmentCheckboxes(139)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="left_lower_arm" value="Abrasión" checked={values.assessmentCheckBoxes[140]} onChange={this.props.handleAssessmentCheckboxes(140)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="left_lower_arm" value="Laceración" checked={values.assessmentCheckBoxes[141]} onChange={this.props.handleAssessmentCheckboxes(141)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="left_lower_arm" value="Herida punzante" checked={values.assessmentCheckBoxes[142]} onChange={this.props.handleAssessmentCheckboxes(142)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="left_lower_arm" value="Sangrado" checked={values.assessmentCheckBoxes[143]} onChange={this.props.handleAssessmentCheckboxes(143)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="left_lower_arm" value="Contusión" checked={values.assessmentCheckBoxes[144]} onChange={this.props.handleAssessmentCheckboxes(144)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="left_lower_arm" value="Dolor" checked={values.assessmentCheckBoxes[145]} onChange={this.props.handleAssessmentCheckboxes(145)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="left_lower_arm" value="Hinchazón" checked={values.assessmentCheckBoxes[146]} onChange={this.props.handleAssessmentCheckboxes(146)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="left_lower_arm" value="Deformidad" checked={values.assessmentCheckBoxes[147]} onChange={this.props.handleAssessmentCheckboxes(147)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="left_lower_arm" value="Fractura abierta" checked={values.assessmentCheckBoxes[148]} onChange={this.props.handleAssessmentCheckboxes(148)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="left_lower_arm" value="Entumecimiento" checked={values.assessmentCheckBoxes[149]} onChange={this.props.handleAssessmentCheckboxes(149)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="left_lower_arm" value="Quemar" checked={values.assessmentCheckBoxes[150]} onChange={this.props.handleAssessmentCheckboxes(150)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="right_lower_arm" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Right-lower-arm')}</b>
                                <label><input type="checkbox" name="right_lower_arm" value="Normal" checked={values.assessmentCheckBoxes[151]} onChange={this.props.handleAssessmentCheckboxes(151)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="right_lower_arm" value="Abrasión" checked={values.assessmentCheckBoxes[152]} onChange={this.props.handleAssessmentCheckboxes(152)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="right_lower_arm" value="Laceración" checked={values.assessmentCheckBoxes[153]} onChange={this.props.handleAssessmentCheckboxes(153)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="right_lower_arm" value="Herida punzante" checked={values.assessmentCheckBoxes[154]} onChange={this.props.handleAssessmentCheckboxes(154)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="right_lower_arm" value="Sangrado" checked={values.assessmentCheckBoxes[155]} onChange={this.props.handleAssessmentCheckboxes(155)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="right_lower_arm" value="Contusión" checked={values.assessmentCheckBoxes[156]} onChange={this.props.handleAssessmentCheckboxes(156)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="right_lower_arm" value="Dolor" checked={values.assessmentCheckBoxes[157]} onChange={this.props.handleAssessmentCheckboxes(157)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="right_lower_arm" value="Hinchazón" checked={values.assessmentCheckBoxes[158]} onChange={this.props.handleAssessmentCheckboxes(158)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="right_lower_arm" value="Deformidad" checked={values.assessmentCheckBoxes[159]} onChange={this.props.handleAssessmentCheckboxes(159)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="right_lower_arm" value="Fractura abierta" checked={values.assessmentCheckBoxes[160]} onChange={this.props.handleAssessmentCheckboxes(160)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="right_lower_arm" value="Entumecimiento" checked={values.assessmentCheckBoxes[161]} onChange={this.props.handleAssessmentCheckboxes(161)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="right_lower_arm" value="Quemar" checked={values.assessmentCheckBoxes[162]} onChange={this.props.handleAssessmentCheckboxes(162)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="left_hand_wrist" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Left-hand-/-wrist')}</b>
                                <label><input type="checkbox" name="left_hand_wrist" value="Normal" checked={values.assessmentCheckBoxes[163]} onChange={this.props.handleAssessmentCheckboxes(163)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="left_hand_wrist" value="Abrasión" checked={values.assessmentCheckBoxes[164]} onChange={this.props.handleAssessmentCheckboxes(164)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="left_hand_wrist" value="Laceración" checked={values.assessmentCheckBoxes[165]} onChange={this.props.handleAssessmentCheckboxes(165)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="left_hand_wrist" value="Herida punzante" checked={values.assessmentCheckBoxes[166]} onChange={this.props.handleAssessmentCheckboxes(166)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="left_hand_wrist" value="Sangrado" checked={values.assessmentCheckBoxes[167]} onChange={this.props.handleAssessmentCheckboxes(167)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="left_hand_wrist" value="Contusión" checked={values.assessmentCheckBoxes[168]} onChange={this.props.handleAssessmentCheckboxes(168)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="left_hand_wrist" value="Dolor" checked={values.assessmentCheckBoxes[169]} onChange={this.props.handleAssessmentCheckboxes(169)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="left_hand_wrist" value="Hinchazón" checked={values.assessmentCheckBoxes[170]} onChange={this.props.handleAssessmentCheckboxes(170)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="left_hand_wrist" value="Deformidad" checked={values.assessmentCheckBoxes[171]} onChange={this.props.handleAssessmentCheckboxes(171)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="left_hand_wrist" value="Fractura abierta" checked={values.assessmentCheckBoxes[172]} onChange={this.props.handleAssessmentCheckboxes(172)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="left_hand_wrist" value="Entumecimiento" checked={values.assessmentCheckBoxes[173]} onChange={this.props.handleAssessmentCheckboxes(173)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="left_hand_wrist" value="Quemar" checked={values.assessmentCheckBoxes[174]} onChange={this.props.handleAssessmentCheckboxes(174)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="right_hand_wrist" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Right-hand-/-wrist')}</b>
                                <label><input type="checkbox" name="right_hand_wrist" value="Normal" checked={values.assessmentCheckBoxes[175]} onChange={this.props.handleAssessmentCheckboxes(175)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="right_hand_wrist" value="Abrasión" checked={values.assessmentCheckBoxes[176]} onChange={this.props.handleAssessmentCheckboxes(176)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="right_hand_wrist" value="Laceración" checked={values.assessmentCheckBoxes[177]} onChange={this.props.handleAssessmentCheckboxes(177)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="right_hand_wrist" value="Herida punzante" checked={values.assessmentCheckBoxes[178]} onChange={this.props.handleAssessmentCheckboxes(178)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="right_hand_wrist" value="Sangrado" checked={values.assessmentCheckBoxes[179]} onChange={this.props.handleAssessmentCheckboxes(179)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="right_hand_wrist" value="Contusión" checked={values.assessmentCheckBoxes[180]} onChange={this.props.handleAssessmentCheckboxes(180)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="right_hand_wrist" value="Dolor" checked={values.assessmentCheckBoxes[181]} onChange={this.props.handleAssessmentCheckboxes(181)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="right_hand_wrist" value="Hinchazón" checked={values.assessmentCheckBoxes[182]} onChange={this.props.handleAssessmentCheckboxes(182)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="right_hand_wrist" value="Deformidad" checked={values.assessmentCheckBoxes[183]} onChange={this.props.handleAssessmentCheckboxes(183)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="right_hand_wrist" value="Fractura abierta" checked={values.assessmentCheckBoxes[184]} onChange={this.props.handleAssessmentCheckboxes(184)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="right_hand_wrist" value="Entumecimiento" checked={values.assessmentCheckBoxes[185]} onChange={this.props.handleAssessmentCheckboxes(185)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="right_hand_wrist" value="Quemar" checked={values.assessmentCheckBoxes[186]} onChange={this.props.handleAssessmentCheckboxes(186)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="left_upper_leg" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Left-upper-leg')}</b>
                                <label><input type="checkbox" name="left_upper_leg" value="Normal" checked={values.assessmentCheckBoxes[187]} onChange={this.props.handleAssessmentCheckboxes(187)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="left_upper_leg" value="Abrasión" checked={values.assessmentCheckBoxes[188]} onChange={this.props.handleAssessmentCheckboxes(188)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="left_upper_leg" value="Laceración" checked={values.assessmentCheckBoxes[189]} onChange={this.props.handleAssessmentCheckboxes(189)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="left_upper_leg" value="Herida punzante" checked={values.assessmentCheckBoxes[190]} onChange={this.props.handleAssessmentCheckboxes(190)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="left_upper_leg" value="Sangrado" checked={values.assessmentCheckBoxes[191]} onChange={this.props.handleAssessmentCheckboxes(191)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="left_upper_leg" value="Contusión" checked={values.assessmentCheckBoxes[192]} onChange={this.props.handleAssessmentCheckboxes(192)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="left_upper_leg" value="Dolor" checked={values.assessmentCheckBoxes[193]} onChange={this.props.handleAssessmentCheckboxes(193)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="left_upper_leg" value="Hinchazón" checked={values.assessmentCheckBoxes[194]} onChange={this.props.handleAssessmentCheckboxes(194)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="left_upper_leg" value="Deformidad" checked={values.assessmentCheckBoxes[195]} onChange={this.props.handleAssessmentCheckboxes(195)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="left_upper_leg" value="Fractura abierta" checked={values.assessmentCheckBoxes[196]} onChange={this.props.handleAssessmentCheckboxes(196)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="left_upper_leg" value="Entumecimiento" checked={values.assessmentCheckBoxes[197]} onChange={this.props.handleAssessmentCheckboxes(197)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="left_upper_leg" value="Quemar" checked={values.assessmentCheckBoxes[198]} onChange={this.props.handleAssessmentCheckboxes(198)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="right_upper_leg" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Right-upper-leg')}</b>
                                <label><input type="checkbox" name="right_upper_leg" value="Normal" checked={values.assessmentCheckBoxes[199]} onChange={this.props.handleAssessmentCheckboxes(199)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="right_upper_leg" value="Abrasión" checked={values.assessmentCheckBoxes[200]} onChange={this.props.handleAssessmentCheckboxes(200)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="right_upper_leg" value="Laceración" checked={values.assessmentCheckBoxes[201]} onChange={this.props.handleAssessmentCheckboxes(201)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="right_upper_leg" value="Herida punzante" checked={values.assessmentCheckBoxes[202]} onChange={this.props.handleAssessmentCheckboxes(202)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="right_upper_leg" value="Sangrado" checked={values.assessmentCheckBoxes[203]} onChange={this.props.handleAssessmentCheckboxes(203)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="right_upper_leg" value="Contusión" checked={values.assessmentCheckBoxes[204]} onChange={this.props.handleAssessmentCheckboxes(204)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="right_upper_leg" value="Dolor" checked={values.assessmentCheckBoxes[205]} onChange={this.props.handleAssessmentCheckboxes(205)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="right_upper_leg" value="Hinchazón" checked={values.assessmentCheckBoxes[206]} onChange={this.props.handleAssessmentCheckboxes(206)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="right_upper_leg" value="Deformidad" checked={values.assessmentCheckBoxes[207]} onChange={this.props.handleAssessmentCheckboxes(207)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="right_upper_leg" value="Fractura abierta" checked={values.assessmentCheckBoxes[208]} onChange={this.props.handleAssessmentCheckboxes(208)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="right_upper_leg" value="Entumecimiento" checked={values.assessmentCheckBoxes[209]} onChange={this.props.handleAssessmentCheckboxes(209)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="right_upper_leg" value="Quemar" checked={values.assessmentCheckBoxes[210]} onChange={this.props.handleAssessmentCheckboxes(210)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="left_lower_leg" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Left-lower-leg')}</b>
                                <label><input type="checkbox" name="left_lower_leg" value="Normal" checked={values.assessmentCheckBoxes[211]} onChange={this.props.handleAssessmentCheckboxes(211)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="left_lower_leg" value="Abrasión" checked={values.assessmentCheckBoxes[212]} onChange={this.props.handleAssessmentCheckboxes(212)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="left_lower_leg" value="Laceración" checked={values.assessmentCheckBoxes[213]} onChange={this.props.handleAssessmentCheckboxes(213)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="left_lower_leg" value="Herida punzante" checked={values.assessmentCheckBoxes[214]} onChange={this.props.handleAssessmentCheckboxes(214)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="left_lower_leg" value="Sangrado" checked={values.assessmentCheckBoxes[215]} onChange={this.props.handleAssessmentCheckboxes(215)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="left_lower_leg" value="Contusión" checked={values.assessmentCheckBoxes[216]} onChange={this.props.handleAssessmentCheckboxes(216)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="left_lower_leg" value="Dolor" checked={values.assessmentCheckBoxes[217]} onChange={this.props.handleAssessmentCheckboxes(217)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="left_lower_leg" value="Hinchazón" checked={values.assessmentCheckBoxes[218]} onChange={this.props.handleAssessmentCheckboxes(218)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="left_lower_leg" value="Deformidad" checked={values.assessmentCheckBoxes[219]} onChange={this.props.handleAssessmentCheckboxes(219)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="left_lower_leg" value="Fractura abierta" checked={values.assessmentCheckBoxes[220]} onChange={this.props.handleAssessmentCheckboxes(220)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="left_lower_leg" value="Entumecimiento" checked={values.assessmentCheckBoxes[221]} onChange={this.props.handleAssessmentCheckboxes(221)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="left_lower_leg" value="Quemar" checked={values.assessmentCheckBoxes[222]} onChange={this.props.handleAssessmentCheckboxes(222)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="right_lower_leg" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Right-lower-leg')}</b>
                                <label><input type="checkbox" name="right_lower_leg" value="Normal" checked={values.assessmentCheckBoxes[223]} onChange={this.props.handleAssessmentCheckboxes(223)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="right_lower_leg" value="Abrasión" checked={values.assessmentCheckBoxes[224]} onChange={this.props.handleAssessmentCheckboxes(224)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="right_lower_leg" value="Laceración" checked={values.assessmentCheckBoxes[225]} onChange={this.props.handleAssessmentCheckboxes(225)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="right_lower_leg" value="Herida punzante" checked={values.assessmentCheckBoxes[226]} onChange={this.props.handleAssessmentCheckboxes(226)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="right_lower_leg" value="Sangrado" checked={values.assessmentCheckBoxes[227]} onChange={this.props.handleAssessmentCheckboxes(227)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="right_lower_leg" value="Contusión" checked={values.assessmentCheckBoxes[228]} onChange={this.props.handleAssessmentCheckboxes(228)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="right_lower_leg" value="Dolor" checked={values.assessmentCheckBoxes[229]} onChange={this.props.handleAssessmentCheckboxes(229)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="right_lower_leg" value="Hinchazón" checked={values.assessmentCheckBoxes[230]} onChange={this.props.handleAssessmentCheckboxes(230)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="right_lower_leg" value="Deformidad" checked={values.assessmentCheckBoxes[231]} onChange={this.props.handleAssessmentCheckboxes(231)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="right_lower_leg" value="Fractura abierta" checked={values.assessmentCheckBoxes[232]} onChange={this.props.handleAssessmentCheckboxes(232)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="right_lower_leg" value="Entumecimiento" checked={values.assessmentCheckBoxes[233]} onChange={this.props.handleAssessmentCheckboxes(233)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="right_lower_leg" value="Quemar" checked={values.assessmentCheckBoxes[234]} onChange={this.props.handleAssessmentCheckboxes(234)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="left_ankle_foot" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Left-ankle-/-foot')}</b>
                                <label><input type="checkbox" name="left_ankle_foot" value="Normal" checked={values.assessmentCheckBoxes[235]} onChange={this.props.handleAssessmentCheckboxes(235)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="left_ankle_foot" value="Abrasión" checked={values.assessmentCheckBoxes[236]} onChange={this.props.handleAssessmentCheckboxes(236)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="left_ankle_foot" value="Laceración" checked={values.assessmentCheckBoxes[237]} onChange={this.props.handleAssessmentCheckboxes(237)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="left_ankle_foot" value="Herida punzante" checked={values.assessmentCheckBoxes[238]} onChange={this.props.handleAssessmentCheckboxes(238)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="left_ankle_foot" value="Sangrado" checked={values.assessmentCheckBoxes[239]} onChange={this.props.handleAssessmentCheckboxes(239)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="left_ankle_foot" value="Contusión" checked={values.assessmentCheckBoxes[240]} onChange={this.props.handleAssessmentCheckboxes(240)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="left_ankle_foot" value="Dolor" checked={values.assessmentCheckBoxes[241]} onChange={this.props.handleAssessmentCheckboxes(241)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="left_ankle_foot" value="Hinchazón" checked={values.assessmentCheckBoxes[242]} onChange={this.props.handleAssessmentCheckboxes(242)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="left_ankle_foot" value="Deformidad" checked={values.assessmentCheckBoxes[243]} onChange={this.props.handleAssessmentCheckboxes(243)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="left_ankle_foot" value="Fractura abierta" checked={values.assessmentCheckBoxes[244]} onChange={this.props.handleAssessmentCheckboxes(244)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="left_ankle_foot" value="Entumecimiento" checked={values.assessmentCheckBoxes[245]} onChange={this.props.handleAssessmentCheckboxes(245)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="left_ankle_foot" value="Quemar" checked={values.assessmentCheckBoxes[246]} onChange={this.props.handleAssessmentCheckboxes(246)} /> {this.context.translate('Burn')}</label>
                            </div>
                            <div id="right_ankle_foot" className="exam_option" style={{ display: 'none' }}>
                                <b>{this.context.translate('Right-ankle-/-foot')}</b>
                                <label><input type="checkbox" name="right_ankle_foot" value="Normal" checked={values.assessmentCheckBoxes[247]} onChange={this.props.handleAssessmentCheckboxes(247)} /> {this.context.translate('Normal')}</label>
                                <label><input type="checkbox" name="right_ankle_foot" value="Abrasión" checked={values.assessmentCheckBoxes[248]} onChange={this.props.handleAssessmentCheckboxes(248)} /> {this.context.translate('Abrasion')}</label>
                                <label><input type="checkbox" name="right_ankle_foot" value="Laceración" checked={values.assessmentCheckBoxes[249]} onChange={this.props.handleAssessmentCheckboxes(249)} /> {this.context.translate('Laceration')}</label>
                                <label><input type="checkbox" name="right_ankle_foot" value="Herida punzante" checked={values.assessmentCheckBoxes[250]} onChange={this.props.handleAssessmentCheckboxes(250)} /> {this.context.translate('Puncture-wound')}</label>
                                <label><input type="checkbox" name="right_ankle_foot" value="Sangrado" checked={values.assessmentCheckBoxes[251]} onChange={this.props.handleAssessmentCheckboxes(251)} /> {this.context.translate('Bleeding')}</label>
                                <label><input type="checkbox" name="right_ankle_foot" value="Contusión" checked={values.assessmentCheckBoxes[252]} onChange={this.props.handleAssessmentCheckboxes(252)} /> {this.context.translate('Contusion')}</label>
                                <label><input type="checkbox" name="right_ankle_foot" value="Dolor" checked={values.assessmentCheckBoxes[253]} onChange={this.props.handleAssessmentCheckboxes(253)} /> {this.context.translate('Pain')}</label>
                                <label><input type="checkbox" name="right_ankle_foot" value="Hinchazón" checked={values.assessmentCheckBoxes[254]} onChange={this.props.handleAssessmentCheckboxes(254)} /> {this.context.translate('Swelling')}</label>
                                <label><input type="checkbox" name="right_ankle_foot" value="Deformidad" checked={values.assessmentCheckBoxes[255]} onChange={this.props.handleAssessmentCheckboxes(255)} /> {this.context.translate('Deformity')}</label>
                                <label><input type="checkbox" name="right_ankle_foot" value="Fractura abierta" checked={values.assessmentCheckBoxes[256]} onChange={this.props.handleAssessmentCheckboxes(256)} /> {this.context.translate('Open-fracture')}</label>
                                <label><input type="checkbox" name="right_ankle_foot" value="Entumecimiento" checked={values.assessmentCheckBoxes[257]} onChange={this.props.handleAssessmentCheckboxes(257)} /> {this.context.translate('Numbness')}</label>
                                <label><input type="checkbox" name="right_ankle_foot" value="Quemar" checked={values.assessmentCheckBoxes[258]} onChange={this.props.handleAssessmentCheckboxes(258)} /> {this.context.translate('Burn')}</label>
                            </div>
                        </Col>
                    </Row>
                    <h3>{this.context.translate('Pulse')} / {this.context.translate('Burn')}</h3>
                    <table className="cform">
                        <tbody>
                            <tr>
                                <th width="20%">{this.context.translate('Pulse-Strength')}</th>
                                <td width="30%">
                                    <select name="pulse_strength" value={values.pulse_strength} onChange={this.props.handleChange('pulse_strength')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="Normal">Normal</option>
                                        <option value="Débil">{this.context.translate('Weak')}</option>
                                        <option value="Ausente">{this.context.translate('Absent')}</option>
                                        <option value="Delimitador">{this.context.translate('Bounding')}</option>
                                    </select>
                                </td>
                                <th width="20%">{this.context.translate('Pulse-Rate')}</th>
                                <td width="30%">
                                    <select name="pulse_rate" value={values.pulse_rate} onChange={this.props.handleChange('pulse_rate')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="Regular">{this.context.translate('Regular')}</option>
                                        <option value="Irregular">{this.context.translate('Irregular')}</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>{this.context.translate('burn-calculation')}</th>
                                <td><input type="number" className="calculation" disabled value={values.bsa} /> (BSA%)</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3><label className="v2" style={{ lineHeight: '40px' }}>{this.context.translate('Stroke-')} <input type="checkbox" name="none" value="stroke" checked={values.assessmentCheckBoxes[259]} onChange={this.props.handleAssessmentCheckboxes(259)} /></label></h3>
                    {values.assessmentCheckBoxes[259] ?
                        <table className="cform">
                            <tbody>
                                <tr>
                                    <th width="20%">{this.context.translate('Time-of-onset')}</th>
                                    <td width="30%"><input type="text" name="stroke_time" placeholder="--:--" value={values.stroke_time} onChange={this.props.handleChange('stroke_time')} /></td>
                                    <th width="20%">{this.context.translate('Facial-droop')}</th>
                                    <td width="30%">
                                        <select name="stroke_facial_droop" value={values.stroke_facial_droop} onChange={this.props.handleChange('stroke_facial_droop')}>
                                            <option disabled selected value="">{this.context.translate('select')}</option>
                                            <option value="Sí">{this.context.translate('Yes')}</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('Arm-Drift')}</th>
                                    <td>
                                        <select name="stroke_arm_drift" value={values.stroke_arm_drift} onChange={this.props.handleChange('stroke_arm_drift')}>
                                            <option disabled selected value="">{this.context.translate('select')}</option>
                                            <option value="Sí">{this.context.translate('Yes')}</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                    <th>{this.context.translate('Abnormal-Speech')}</th>
                                    <td>
                                        <select name="stroke_abnormal_speech" value={values.stroke_abnormal_speech} onChange={this.props.handleChange('stroke_abnormal_speech')}>
                                            <option disabled selected value="">{this.context.translate('select')}</option>
                                            <option value="Sí">{this.context.translate('Yes')}</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        : null}
                    <h3><label className="v2" style={{ lineHeight: '40px' }}>{this.context.translate('Vital-Signs')} <input type="checkbox" name="none" value="vitalSigns" checked={values.assessmentCheckBoxes[260]} onChange={this.props.handleAssessmentCheckboxes(260)} /></label></h3>
                    {values.assessmentCheckBoxes[260] ?
                        <div>
                            <table className="treatment">
                                <tbody>
                                    <tr>
                                        <th>{this.context.translate('Time')}</th>
                                        <th>{this.context.translate('Pulse')}</th>
                                        <th>{this.context.translate('B/P')}</th>
                                        <th>{this.context.translate('Resp')}</th>
                                        <th>{this.context.translate('Sp02')}</th>
                                        <th>{this.context.translate('Temp')}</th>
                                        <th>{this.context.translate('ETCO2')}</th>
                                        <th>{this.context.translate('Pain')}</th>
                                        <th>{this.context.translate('GCS')}</th>
                                    </tr>
                                    {vitalList}
                                </tbody>
                            </table>
                            <table className="cform">
                                <tbody>
                                    <tr>
                                        <th width="20%">{this.context.translate('Time')}</th>
                                        <td width="30%"><input type="text" name="vital_signs_time" placeholder="--:--" value={values.vital_signs_time} onChange={this.props.handleChange('vital_signs_time')} /></td>
                                        <th width="20%">{this.context.translate('Pulse')}</th>
                                        <td width="30%"><input type="text" name="vital_signs_pulse" value={values.vital_signs_pulse} onChange={this.props.handleChange('vital_signs_pulse')} /></td>
                                    </tr>
                                    <tr>
                                        <th>B/P</th>
                                        <td><input type="text" style={{ width: '80px', marginRight: '0px' }} name="vital_signs_b_p_s" pattern="\d*" maxLength="3" value={values.vital_signs_b_p_s} onChange={this.props.handleChange('vital_signs_b_p_s')} /> / <input type="text" style={{ width: '80px', marginRight: '0px' }} name="vital_signs_b_p_d" pattern="\d*" maxLength="3" value={values.vital_signs_b_p_d} onChange={this.props.handleChange('vital_signs_b_p_d')} /></td>
                                        <th>Resp</th>
                                        <td><input type="text" name="vital_signs_resp" value={values.vital_signs_resp} onChange={this.props.handleChange('vital_signs_resp')} /></td>
                                    </tr>
                                    <tr>
                                        <th>Sp02</th>
                                        <td><input type="text" name="vital_signs_spo2" value={values.vital_signs_spo2} onChange={this.props.handleChange('vital_signs_spo2')} /></td>
                                        <th>Temp</th>
                                        <td><input type="text" name="vital_signs_temp" value={values.vital_signs_temp} onChange={this.props.handleChange('vital_signs_temp')} /></td>
                                    </tr>
                                    <tr>
                                        <th>ETC02</th>
                                        <td><input type="text" name="vital_signs_etco2" value={values.vital_signs_etco2} onChange={this.props.handleChange('vital_signs_etco2')} /></td>
                                    </tr>
                                    <tr>
                                        <th className="top">{this.context.translate('Pain')}</th>
                                        <td colSpan="4">
                                            <div className="pain selected" onClick={this.selectPain(0)}>0</div>
                                            <div className="pain v1" onClick={this.selectPain(1)}>1</div>
                                            <div className="pain v2" onClick={this.selectPain(2)}>2</div>
                                            <div className="pain v3" onClick={this.selectPain(3)}>3</div>
                                            <div className="pain v4" onClick={this.selectPain(4)}>4</div>
                                            <div className="pain v5" onClick={this.selectPain(5)}>5</div>
                                            <div className="pain v6" onClick={this.selectPain(6)}>6</div>
                                            <div className="pain v7" onClick={this.selectPain(7)}>7</div>
                                            <div className="pain v8" onClick={this.selectPain(8)}>8</div>
                                            <div className="pain v9" onClick={this.selectPain(9)}>9</div>
                                            <div className="pain v10" onClick={this.selectPain(10)}>10</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="top">GCS</th>
                                        <td colSpan="4">
                                            <Row>
                                                <Col>
                                                    <b>{this.context.translate('GCS-e')}</b>
                                                    <label><input type="radio" name="vital_signs_gcs_e" value="1" checked={values.vital_signs_gcs_e.includes("1")} onChange={this.props.handleChange('vital_signs_gcs_e')} /> 1 - {this.context.translate('none')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_e" value="2" checked={values.vital_signs_gcs_e.includes("2")} onChange={this.props.handleChange('vital_signs_gcs_e')} /> 2 - {this.context.translate('to-pain')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_e" value="3" checked={values.vital_signs_gcs_e.includes("3")} onChange={this.props.handleChange('vital_signs_gcs_e')} /> 3 - {this.context.translate('to-voice')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_e" value="4" checked={values.vital_signs_gcs_e.includes("4")} onChange={this.props.handleChange('vital_signs_gcs_e')} /> 4 - {this.context.translate('spontaneous')}</label>
                                                    <label>-</label>
                                                    <label>-</label>
                                                </Col>
                                                <Col>
                                                    <b>{this.context.translate('GCS-v')}</b>
                                                    <label><input type="radio" name="vital_signs_gcs_v" value="1" checked={values.vital_signs_gcs_v.includes("1")} onChange={this.props.handleChange('vital_signs_gcs_v')} /> 1 - {this.context.translate('none')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_v" value="2" checked={values.vital_signs_gcs_v.includes("2")} onChange={this.props.handleChange('vital_signs_gcs_v')} /> 2 - {this.context.translate('inc-sounds')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_v" value="3" checked={values.vital_signs_gcs_v.includes("3")} onChange={this.props.handleChange('vital_signs_gcs_v')} /> 3 - {this.context.translate('ina-words')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_v" value="4" checked={values.vital_signs_gcs_v.includes("4")} onChange={this.props.handleChange('vital_signs_gcs_v')} /> 4 - {this.context.translate('confused')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_v" value="5" checked={values.vital_signs_gcs_v.includes("5")} onChange={this.props.handleChange('vital_signs_gcs_v')} /> 5 - {this.context.translate('oriented')}</label>
                                                    <label>-</label>
                                                </Col>
                                                <Col>
                                                    <b>{this.context.translate('GCS-m')}</b>
                                                    <label><input type="radio" name="vital_signs_gcs_m" value="1" checked={values.vital_signs_gcs_m.includes("1")} onChange={this.props.handleChange('vital_signs_gcs_m')} /> 1 - {this.context.translate('none')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_m" value="2" checked={values.vital_signs_gcs_m.includes("2")} onChange={this.props.handleChange('vital_signs_gcs_m')} /> 2 - {this.context.translate('ab-extension')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_m" value="3" checked={values.vital_signs_gcs_m.includes("3")} onChange={this.props.handleChange('vital_signs_gcs_m')} /> 3 - {this.context.translate('ab-flexion')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_m" value="4" checked={values.vital_signs_gcs_m.includes("4")} onChange={this.props.handleChange('vital_signs_gcs_m')} /> 4 - {this.context.translate('withdraw-pain')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_m" value="5" checked={values.vital_signs_gcs_m.includes("5")} onChange={this.props.handleChange('vital_signs_gcs_m')} /> 5 - {this.context.translate('localise-pain')}</label>
                                                    <label><input type="radio" name="vital_signs_gcs_m" value="6" checked={values.vital_signs_gcs_m.includes("6")} onChange={this.props.handleChange('vital_signs_gcs_m')} /> 6 - {this.context.translate('obeys-command')}</label>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4"><div className="addvital"><input type="button" onClick={this.addVitals} value={this.context.translate('add-vitals')} /></div></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="message">{this.context.translate(this.state.message)}</div>
                        </div>
                        : null}
                    <h3>{this.context.translate('Additional-findings')}</h3>
                    <div>
                        <textarea type="text" placeholder="Enter Text" className="mb-3" rows="10" cols="100" onChange={this.props.handleChange('extra_findings')} value={values.extra_findings} />
                    </div>
                    <input type="button" className="left" onClick={this.back} value={this.context.translate('previous')} />
                    <input type="button" className="right" onClick={this.saveAndContinue} value={this.context.translate('next')} />
                </div>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                    <div className="tab" onClick={this.navigate(1)}>
                        <img src="/callIcon.png" alt="Call" />
                        <b>{this.context.translate('call')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(2)}>
                        <img src="/patientIcon.png" alt="Patient" />
                        <b>{this.context.translate('patient')}</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(3)}>
                        <img src="/assessmentIcon.png" alt="Physical Exam" />
                        <b>{this.context.translate('physical-exam')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/interventionsIcon.png" alt="Interventions" />
                        <b>{this.context.translate('interventions')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(5)}>
                        <img src="/confirmIcon.png" alt="Confirm" />
                        <b>{this.context.translate('confirm')}</b>
                    </div>
                </div>
            </div >
        )
    }
}