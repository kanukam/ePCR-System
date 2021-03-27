import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { MainContext } from '../Auth'
import '../styles/PhysicalAssessment.css'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class PhysicalAssessment extends Component {
    static contextType = MainContext;
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
        const vitals = "[Hora: " + this.props.values.vital_signs_time + " Pulso: " + this.props.values.vital_signs_pulse + " B/P: " + this.props.values.vital_signs_b_p + " Resp: " + this.props.values.vital_signs_resp + " Sp02: " + this.props.values.vital_signs_spo2 + " GCS: " + this.props.values.vital_signs_gcs + " Dolor: " + this.props.values.vital_signs_pain + " Temp: " + this.props.values.vital_signs_temp + " ETCO2: " + this.props.values.vital_signs_temp + "]";
        this.props.appendVitals(vitals);
    }

    render() {
        const{values} = this.props;
        console.log(values);
        return (
            <div className="assessment">
                <div className="content">
                    <h2 className="mb-2">{this.context.translate('physical-exam')}</h2>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Skin')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="skin" value="Normal" checked={values.assessmentCheckBoxes[1]} onChange={this.props.handleAssessmentCheckboxes(1)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pale')} name="skin" value="Pálido" checked={values.assessmentCheckBoxes[2]} onChange={this.props.handleAssessmentCheckboxes(2)} />
                            <Form.Check type="checkbox" label={this.context.translate('Cyanotic')} name="skin" value="Cianótico" checked={values.assessmentCheckBoxes[3]} onChange={this.props.handleAssessmentCheckboxes(3)} />
                            <Form.Check type="checkbox" label={this.context.translate('Mottled')} name="skin" value="Moteado" checked={values.assessmentCheckBoxes[4]} onChange={this.props.handleAssessmentCheckboxes(4)} />
                            <Form.Check type="checkbox" label={this.context.translate('Cap-refill-<2-sec')} name="skin" value="recarga capilar <2 sec" checked={values.assessmentCheckBoxes[5]} onChange={this.props.handleAssessmentCheckboxes(5)} />
                            <Form.Check type="checkbox" label={this.context.translate('Cap-refill-2-4-sec')} name="skin" value="recarga capilar >4sec" checked={values.assessmentCheckBoxes[6]} onChange={this.props.handleAssessmentCheckboxes(6)} />
                            <Form.Check type="checkbox" label={this.context.translate('Hot')} name="skin" value="Caliente" checked={values.assessmentCheckBoxes[7]} onChange={this.props.handleAssessmentCheckboxes(7)} />
                            <Form.Check type="checkbox" label={this.context.translate('Cool/cold')} name="skin" value="Fresco / Frío" checked={values.assessmentCheckBoxes[8]} onChange={this.props.handleAssessmentCheckboxes(8)} />
                            <Form.Check type="checkbox" label={this.context.translate('Clammy')} name="skin" value="Húmedo" checked={values.assessmentCheckBoxes[9]} onChange={this.props.handleAssessmentCheckboxes(9)} />
                            <Form.Check type="checkbox" label={this.context.translate('Diaphoretic')} name="skin" value="Diaforético" checked={values.assessmentCheckBoxes[10]} onChange={this.props.handleAssessmentCheckboxes(10)} />
                            <Form.Check type="checkbox" label={this.context.translate('Flushed')} name="skin" value="Enrojecida" checked={values.assessmentCheckBoxes[11]} onChange={this.props.handleAssessmentCheckboxes(11)} />
                            <Form.Check type="checkbox" label={this.context.translate('Rash')} name="skin" value="Erupción" checked={values.assessmentCheckBoxes[12]} onChange={this.props.handleAssessmentCheckboxes(12)} />
                        </Col>

                        <Form.Label column sm={2}>{this.context.translate('Mental')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="mental" value="Normal" checked={values.assessmentCheckBoxes[13]} onChange={this.props.handleAssessmentCheckboxes(13)} />
                            <Form.Check type="checkbox" label={this.context.translate('Oriented-person')} name="mental" value="Persona orientada" checked={values.assessmentCheckBoxes[14]} onChange={this.props.handleAssessmentCheckboxes(14)} />
                            <Form.Check type="checkbox" label={this.context.translate('Oriented-place')} name="mental" value="Lugar orientado" checked={values.assessmentCheckBoxes[15]} onChange={this.props.handleAssessmentCheckboxes(15)} />
                            <Form.Check type="checkbox" label={this.context.translate('Oriented-time')} name="mental" value="Tiempo orientado" checked={values.assessmentCheckBoxes[16]} onChange={this.props.handleAssessmentCheckboxes(16)} />
                            <Form.Check type="checkbox" label={this.context.translate('Oriented-event')} name="mental" value="Evento orientado" checked={values.assessmentCheckBoxes[17]} onChange={this.props.handleAssessmentCheckboxes(17)} />
                            <Form.Check type="checkbox" label={this.context.translate('Confused')} name="mental" value="Confundido" checked={values.assessmentCheckBoxes[18]} onChange={this.props.handleAssessmentCheckboxes(18)} />
                            <Form.Check type="checkbox" label={this.context.translate('Lethargic-New')} name="mental" value="Letárgico" checked={values.assessmentCheckBoxes[19]} onChange={this.props.handleAssessmentCheckboxes(19)} />
                            <Form.Check type="checkbox" label={this.context.translate('Unresponsive')} name="mental" value="Insensible" checked={values.assessmentCheckBoxes[20]} onChange={this.props.handleAssessmentCheckboxes(20)} />
                            <Form.Check type="checkbox" label={this.context.translate('Combative')} name="mental" value="Combativo" checked={values.assessmentCheckBoxes[21]} onChange={this.props.handleAssessmentCheckboxes(21)} />
                            <Form.Check type="checkbox" label={this.context.translate('Suicidal-thinking/action')} name="mental" value="Pensamiento suicida / Acción" checked={values.assessmentCheckBoxes[22]} onChange={this.props.handleAssessmentCheckboxes(22)} />
                            <Form.Check type="checkbox" label={this.context.translate('Hallucinations')} name="mental" value="Alucinaciones" checked={values.assessmentCheckBoxes[23]} onChange={this.props.handleAssessmentCheckboxes(23)} />
                            <Form.Check type="checkbox" label={this.context.translate('anxious')} name="mental" value="Ansioso" checked={values.assessmentCheckBoxes[2300]} onChange={this.props.handleAssessmentCheckboxes(2300)} />
                            <Form.Check type="checkbox" label={this.context.translate('depressed')} name="mental" value="Deprimido" checked={values.assessmentCheckBoxes[2301]} onChange={this.props.handleAssessmentCheckboxes(2301)} />
                            <Form.Check type="checkbox" label={this.context.translate('appears_impaired')} name="mental" value="Parece deteriorado" checked={values.assessmentCheckBoxes[2302]} onChange={this.props.handleAssessmentCheckboxes(2302)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Neurological')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="neurological" value="Normal" checked={values.assessmentCheckBoxes[24]} onChange={this.props.handleAssessmentCheckboxes(24)} />
                            <Form.Check type="checkbox" label={this.context.translate('Slurred-speech')} name="neurological" value="Discurso sordo" checked={values.assessmentCheckBoxes[27]} onChange={this.props.handleAssessmentCheckboxes(27)} />
                            <Form.Check type="checkbox" label={this.context.translate('Left-facial-droop')} name="neurological" value="Caída facial izquierda" checked={values.assessmentCheckBoxes[28]} onChange={this.props.handleAssessmentCheckboxes(28)} />
                            <Form.Check type="checkbox" label={this.context.translate('Right-facial-droop')} name="neurological" value="Caída facial derecha" checked={values.assessmentCheckBoxes[29]} onChange={this.props.handleAssessmentCheckboxes(29)} />
                            <Form.Check type="checkbox" label={this.context.translate('Left-side-weakness')} name="neurological" value="Debilidad del lado izquierdo" checked={values.assessmentCheckBoxes[30]} onChange={this.props.handleAssessmentCheckboxes(30)} />
                            <Form.Check type="checkbox" label={this.context.translate('Right-side-weakness')} name="neurological" value="Debilidad del lado derecho" checked={values.assessmentCheckBoxes[31]} onChange={this.props.handleAssessmentCheckboxes(31)}/>
                            <Form.Check type="checkbox" label={this.context.translate('Left-side-hemiplegia')} name="neurological" value="Hemiplejia del lado izquierdo" checked={values.assessmentCheckBoxes[32]} onChange={this.props.handleAssessmentCheckboxes(32)} />
                            <Form.Check type="checkbox" label={this.context.translate('Right-side-hemiplegia')} name="neurological" value="Hemiplejia del lado derecho" checked={values.assessmentCheckBoxes[33]} onChange={this.props.handleAssessmentCheckboxes(33)} />
                            <Form.Check type="checkbox" label={this.context.translate('Seizure')} name="neurological" value="Asimiento" checked={values.assessmentCheckBoxes[34]} onChange={this.props.handleAssessmentCheckboxes(34)} />
                            <Form.Check type="checkbox" label={this.context.translate('Posturing')} name="neurological" value="Postura" checked={values.assessmentCheckBoxes[35]} onChange={this.props.handleAssessmentCheckboxes(35)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pupils-pinpoint')} name="neurological" value="Los pupilas señalan" checked={values.assessmentCheckBoxes[36]} onChange={this.props.handleAssessmentCheckboxes(36)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pupils-dilated')} name="neurological" value="Pupilas dilatadas" checked={values.assessmentCheckBoxes[37]} onChange={this.props.handleAssessmentCheckboxes(37)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pupil-Left->-Right')} name="neurological" value="Pupilas a la izquierda > derecho" checked={values.assessmentCheckBoxes[38]} onChange={this.props.handleAssessmentCheckboxes(38)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pupil-Right->-left')} name="neurological" value="Pupilas a la derecha > izquierda" checked={values.assessmentCheckBoxes[39]} onChange={this.props.handleAssessmentCheckboxes(39)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pupils-nonreactive')} name="neurological" value="Pupilas no reactivos" checked={values.assessmentCheckBoxes[40]} onChange={this.props.handleAssessmentCheckboxes(40)} />
                        </Col>

                        <Form.Label column sm={2}>{this.context.translate('Head')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="head" value="Normal" checked={values.assessmentCheckBoxes[41]} onChange={this.props.handleAssessmentCheckboxes(41)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="head" value="Abrasión" checked={values.assessmentCheckBoxes[42]} onChange={this.props.handleAssessmentCheckboxes(42)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="head" value="Laceración" checked={values.assessmentCheckBoxes[43]} onChange={this.props.handleAssessmentCheckboxes(43)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="head" value="Herida punzante" checked={values.assessmentCheckBoxes[44]} onChange={this.props.handleAssessmentCheckboxes(44)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="head" value="Sangrado" checked={values.assessmentCheckBoxes[46]} onChange={this.props.handleAssessmentCheckboxes(46)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="head" value="Contusión" checked={values.assessmentCheckBoxes[47]} onChange={this.props.handleAssessmentCheckboxes(47)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')} name="head" value="Dolor" checked={values.assessmentCheckBoxes[48]} onChange={this.props.handleAssessmentCheckboxes(48)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="head" value="Hinchazón" checked={values.assessmentCheckBoxes[49]} onChange={this.props.handleAssessmentCheckboxes(49)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="head" value="Deformidad" checked={values.assessmentCheckBoxes[50]} onChange={this.props.handleAssessmentCheckboxes(50)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="head" value="Quemar" checked={values.assessmentCheckBoxes[51]} onChange={this.props.handleAssessmentCheckboxes(51)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Neck')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="neck" value="Normal" checked={values.assessmentCheckBoxes[52]} onChange={this.props.handleAssessmentCheckboxes(52)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="neck" value="Abrasión" checked={values.assessmentCheckBoxes[53]} onChange={this.props.handleAssessmentCheckboxes(53)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="neck" value="Laceración" checked={values.assessmentCheckBoxes[54]} onChange={this.props.handleAssessmentCheckboxes(54)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="neck" value="Herida punzante" checked={values.assessmentCheckBoxes[55]} onChange={this.props.handleAssessmentCheckboxes(55)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="neck" value="Sangrado" checked={values.assessmentCheckBoxes[56]} onChange={this.props.handleAssessmentCheckboxes(56)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="neck" value="Contusión" checked={values.assessmentCheckBoxes[57]} onChange={this.props.handleAssessmentCheckboxes(57)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="neck" value="Dolor" checked={values.assessmentCheckBoxes[58]} onChange={this.props.handleAssessmentCheckboxes(58)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="neck" value="Hinchazón" checked={values.assessmentCheckBoxes[59]} onChange={this.props.handleAssessmentCheckboxes(59)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="neck" value="Deformidad" checked={values.assessmentCheckBoxes[60]} onChange={this.props.handleAssessmentCheckboxes(60)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="neck" value="Quemar" checked={values.assessmentCheckBoxes[61]} onChange={this.props.handleAssessmentCheckboxes(61)} />
                        </Col>

                        <Form.Label column sm={2}>{this.context.translate('Chest')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="chest" value="Normal" checked={values.assessmentCheckBoxes[62]} onChange={this.props.handleAssessmentCheckboxes(62)} />
                            <Form.Check type="checkbox" label={this.context.translate('Wheezing')} name="chest" value="Respiración sibilante" checked={values.assessmentCheckBoxes[63]} onChange={this.props.handleAssessmentCheckboxes(63)} />
                            <Form.Check type="checkbox" label={this.context.translate('Respiration-labored')} name="chest" value="Respiración trabajada" checked={values.assessmentCheckBoxes[64]} onChange={this.props.handleAssessmentCheckboxes(64)} />
                            <Form.Check type="checkbox" label={this.context.translate('Respiration-uneven')} name="chest" value="Respiración desigual" checked={values.assessmentCheckBoxes[65]} onChange={this.props.handleAssessmentCheckboxes(65)} />
                            <Form.Check type="checkbox" label={this.context.translate('Respiration-shallow')} name="chest" value="Respiración superficial" checked={values.assessmentCheckBoxes[66]} onChange={this.props.handleAssessmentCheckboxes(66)} />
                            <Form.Check type="checkbox" label={this.context.translate('Respiration-absent')} name="chest" value="Respiración ausente" checked={values.assessmentCheckBoxes[67]} onChange={this.props.handleAssessmentCheckboxes(67)} />
                            <Form.Check type="checkbox" label={this.context.translate('Breath-sounds-decrease-left')} name="chest" value="Los sonidos izquierdos disminuyeronv" checked={values.assessmentCheckBoxes[68]} onChange={this.props.handleAssessmentCheckboxes(68)} />
                            <Form.Check type="checkbox" label={this.context.translate('Breath-sounds-decreased-right')} name="chest" value="Breath sounds decreased right" checked={values.assessmentCheckBoxes[69]} onChange={this.props.handleAssessmentCheckboxes(69)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="chest" value="Deformidad" checked={values.assessmentCheckBoxes[70]} onChange={this.props.handleAssessmentCheckboxes(70)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="chest" value="Abrasión" checked={values.assessmentCheckBoxes[71]} onChange={this.props.handleAssessmentCheckboxes(71)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="chest" value="Laceración" checked={values.assessmentCheckBoxes[72]} onChange={this.props.handleAssessmentCheckboxes(72)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="chest" value="Herida punzante" checked={values.assessmentCheckBoxes[73]} onChange={this.props.handleAssessmentCheckboxes(73)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="chest" value="Sangrado" checked={values.assessmentCheckBoxes[74]} onChange={this.props.handleAssessmentCheckboxes(74)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="chest" value="Contusión" checked={values.assessmentCheckBoxes[75]} onChange={this.props.handleAssessmentCheckboxes(75)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="chest" value="Dolor" checked={values.assessmentCheckBoxes[76]} onChange={this.props.handleAssessmentCheckboxes(76)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="chest" value="Hinchazón" checked={values.assessmentCheckBoxes[77]} onChange={this.props.handleAssessmentCheckboxes(77)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="chest" value="Deformidad" checked={values.assessmentCheckBoxes[78]} onChange={this.props.handleAssessmentCheckboxes(78)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="chest" value="Quemar" checked={values.assessmentCheckBoxes[79]} onChange={this.props.handleAssessmentCheckboxes(79)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Abdomen')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="abdomen" value="Normal" checked={values.assessmentCheckBoxes[80]} onChange={this.props.handleAssessmentCheckboxes(80)} />
                            <Form.Check type="checkbox" label={this.context.translate('Rigid')} name="abdomen" value="Rígido" checked={values.assessmentCheckBoxes[81]} onChange={this.props.handleAssessmentCheckboxes(81)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="abdomen" value="Abrasión" checked={values.assessmentCheckBoxes[82]} onChange={this.props.handleAssessmentCheckboxes(82)}/>
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="abdomen" value="Laceración" checked={values.assessmentCheckBoxes[83]} onChange={this.props.handleAssessmentCheckboxes(83)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="abdomen" value="Herida punzante" checked={values.assessmentCheckBoxes[84]} onChange={this.props.handleAssessmentCheckboxes(84)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="abdomen" value="Sangrado" checked={values.assessmentCheckBoxes[85]} onChange={this.props.handleAssessmentCheckboxes(85)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="abdomen" value="Contusión" checked={values.assessmentCheckBoxes[86]} onChange={this.props.handleAssessmentCheckboxes(86)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="abdomen" value="Dolor" checked={values.assessmentCheckBoxes[87]} onChange={this.props.handleAssessmentCheckboxes(87)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="abdomen" value="Hinchazón" checked={values.assessmentCheckBoxes[88]} onChange={this.props.handleAssessmentCheckboxes(88)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="abdomen" value="Deformidad" checked={values.assessmentCheckBoxes[89]} onChange={this.props.handleAssessmentCheckboxes(89)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="abdomen" value="Quemar" checked={values.assessmentCheckBoxes[90]} onChange={this.props.handleAssessmentCheckboxes(90)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pregnant')} name="abdomen" value="Embarazada" checked={values.assessmentCheckBoxes[91]} onChange={this.props.handleAssessmentCheckboxes(91)} />
                        </Col>

                        <Form.Label column sm={2}>{this.context.translate('Pelvis')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="pelvis" value="Normal" checked={values.assessmentCheckBoxes[92]} onChange={this.props.handleAssessmentCheckboxes(92)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="pelvis" value="Abrasión" checked={values.assessmentCheckBoxes[93]} onChange={this.props.handleAssessmentCheckboxes(93)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="pelvis" value="Laceración" checked={values.assessmentCheckBoxes[94]} onChange={this.props.handleAssessmentCheckboxes(94)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="pelvis" value="Herida punzante" checked={values.assessmentCheckBoxes[95]} onChange={this.props.handleAssessmentCheckboxes(95)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="pelvis" value="Sangrado" checked={values.assessmentCheckBoxes[96]} onChange={this.props.handleAssessmentCheckboxes(96)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="pelvis" value="Contusión" checked={values.assessmentCheckBoxes[97]} onChange={this.props.handleAssessmentCheckboxes(97)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="pelvis" value="Dolor" checked={values.assessmentCheckBoxes[98]} onChange={this.props.handleAssessmentCheckboxes(98)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="pelvis" value="Hinchazón" checked={values.assessmentCheckBoxes[99]} onChange={this.props.handleAssessmentCheckboxes(99)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="pelvis" value="Deformidad" checked={values.assessmentCheckBoxes[100]} onChange={this.props.handleAssessmentCheckboxes(100)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="pelvis" value="Quemar" checked={values.assessmentCheckBoxes[101]} onChange={this.props.handleAssessmentCheckboxes(101)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="pelvis" value="Entumecimiento" checked={values.assessmentCheckBoxes[102]} onChange={this.props.handleAssessmentCheckboxes(102)} />
                            <Form.Check type="checkbox" label={this.context.translate('Unstable')} name="pelvis" value="Inestable" checked={values.assessmentCheckBoxes[25]} onChange={this.props.handleAssessmentCheckboxes(25)} />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Back')}</Form.Label>
                            <Col sm={4} className="mt-2">
                                <Form.Check type="checkbox" label={this.context.translate('Normal')} name="back" value="Normal" checked={values.assessmentCheckBoxes[103]} onChange={this.props.handleAssessmentCheckboxes(103)} />
                                <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="back" value="Abrasión" checked={values.assessmentCheckBoxes[104]} onChange={this.props.handleAssessmentCheckboxes(104)} />
                                <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="back" value="Laceración" checked={values.assessmentCheckBoxes[105]} onChange={this.props.handleAssessmentCheckboxes(105)} />
                                <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="back" value="Herida punzante" checked={values.assessmentCheckBoxes[106]} onChange={this.props.handleAssessmentCheckboxes(106)} />
                                <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="back" value="Sangrado" checked={values.assessmentCheckBoxes[107]} onChange={this.props.handleAssessmentCheckboxes(107)} />
                                <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="back" value="Contusión" checked={values.assessmentCheckBoxes[108]} onChange={this.props.handleAssessmentCheckboxes(108)} />
                                <Form.Check type="checkbox" label={this.context.translate('Pain')}name="back" value="Dolor" checked={values.assessmentCheckBoxes[109]} onChange={this.props.handleAssessmentCheckboxes(109)} />
                                <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="back" value="Hinchazón" checked={values.assessmentCheckBoxes[110]} onChange={this.props.handleAssessmentCheckboxes(110)} />
                                <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="back" value="Deformidad" checked={values.assessmentCheckBoxes[111]} onChange={this.props.handleAssessmentCheckboxes(111)} />
                                <Form.Check type="checkbox" label={this.context.translate('Burn')} name="back" value="Quemar" checked={values.assessmentCheckBoxes[113]} onChange={this.props.handleAssessmentCheckboxes(113)} />
                            </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Left-upper-arm')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="left_upper_arm" value="Normal" checked={values.assessmentCheckBoxes[114]} onChange={this.props.handleAssessmentCheckboxes(114)}/>
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="left_upper_arm" value="Abrasión" checked={values.assessmentCheckBoxes[115]} onChange={this.props.handleAssessmentCheckboxes(115)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="left_upper_arm" value="Laceración" checked={values.assessmentCheckBoxes[116]} onChange={this.props.handleAssessmentCheckboxes(116)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="left_upper_arm" value="Herida punzante" checked={values.assessmentCheckBoxes[117]} onChange={this.props.handleAssessmentCheckboxes(117)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="left_upper_arm" value="Sangrado" checked={values.assessmentCheckBoxes[118]} onChange={this.props.handleAssessmentCheckboxes(118)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="left_upper_arm" value="Contusión" checked={values.assessmentCheckBoxes[119]} onChange={this.props.handleAssessmentCheckboxes(119)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="left_upper_arm" value="Dolor" checked={values.assessmentCheckBoxes[120]} onChange={this.props.handleAssessmentCheckboxes(120)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="left_upper_arm" value="Hinchazón" checked={values.assessmentCheckBoxes[121]} onChange={this.props.handleAssessmentCheckboxes(121)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="left_upper_arm" value="Deformidad" checked={values.assessmentCheckBoxes[122]} onChange={this.props.handleAssessmentCheckboxes(122)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="left_upper_arm" value="Fractura abierta" checked={values.assessmentCheckBoxes[123]} onChange={this.props.handleAssessmentCheckboxes(123)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="left_upper_arm" value="Numbness" checked={values.assessmentCheckBoxes[124]} onChange={this.props.handleAssessmentCheckboxes(124)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="left_upper_arm" value="Quemar" checked={values.assessmentCheckBoxes[125]} onChange={this.props.handleAssessmentCheckboxes(125)} />
                        </Col>

                        <Form.Label column sm={2}>{this.context.translate('Right-upper-arm')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="right_upper_arm" value="Normal" checked={values.assessmentCheckBoxes[126]} onChange={this.props.handleAssessmentCheckboxes(126)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="right_upper_arm" value="Abrasión" checked={values.assessmentCheckBoxes[127]} onChange={this.props.handleAssessmentCheckboxes(127)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="right_upper_arm" value="Laceración" checked={values.assessmentCheckBoxes[128]} onChange={this.props.handleAssessmentCheckboxes(128)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="right_upper_arm" value="Herida punzante" checked={values.assessmentCheckBoxes[129]} onChange={this.props.handleAssessmentCheckboxes(129)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="right_upper_arm" value="Sangrado" checked={values.assessmentCheckBoxes[130]} onChange={this.props.handleAssessmentCheckboxes(130)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="right_upper_arm" value="Contusión" checked={values.assessmentCheckBoxes[131]} onChange={this.props.handleAssessmentCheckboxes(131)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="right_upper_arm" value="Dolor" checked={values.assessmentCheckBoxes[132]} onChange={this.props.handleAssessmentCheckboxes(132)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="right_upper_arm" value="Hinchazón" checked={values.assessmentCheckBoxes[133]} onChange={this.props.handleAssessmentCheckboxes(133)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="right_upper_arm" value="Deformidad" checked={values.assessmentCheckBoxes[134]} onChange={this.props.handleAssessmentCheckboxes(134)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="right_upper_arm" value="Open Fracture" checked={values.assessmentCheckBoxes[135]} onChange={this.props.handleAssessmentCheckboxes(135)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="right_upper_arm" value="Numbness" checked={values.assessmentCheckBoxes[136]} onChange={this.props.handleAssessmentCheckboxes(136)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="right_upper_arm" value="Quemar" checked={values.assessmentCheckBoxes[137]} onChange={this.props.handleAssessmentCheckboxes(137)} />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Left-lower-arm')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="left_lower_arm" value="Normal" checked={values.assessmentCheckBoxes[138]} onChange={this.props.handleAssessmentCheckboxes(138)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="left_lower_arm" value="Abrasión" checked={values.assessmentCheckBoxes[139]} onChange={this.props.handleAssessmentCheckboxes(139)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="left_lower_arm" value="Laceración" checked={values.assessmentCheckBoxes[140]} onChange={this.props.handleAssessmentCheckboxes(140)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="left_lower_arm" value="Herida punzante" checked={values.assessmentCheckBoxes[141]} onChange={this.props.handleAssessmentCheckboxes(141)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="left_lower_arm" value="Sangrado" checked={values.assessmentCheckBoxes[142]} onChange={this.props.handleAssessmentCheckboxes(142)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="left_lower_arm" value="Contusión" checked={values.assessmentCheckBoxes[143]} onChange={this.props.handleAssessmentCheckboxes(143)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="left_lower_arm" value="Dolor" checked={values.assessmentCheckBoxes[144]} onChange={this.props.handleAssessmentCheckboxes(144)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="left_lower_arm" value="Hinchazón" checked={values.assessmentCheckBoxes[145]} onChange={this.props.handleAssessmentCheckboxes(145)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="left_lower_arm" value="Deformidad" checked={values.assessmentCheckBoxes[146]} onChange={this.props.handleAssessmentCheckboxes(146)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="left_lower_arm" value="Open Fracture" checked={values.assessmentCheckBoxes[147]} onChange={this.props.handleAssessmentCheckboxes(147)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="left_lower_arm" value="Numbness" checked={values.assessmentCheckBoxes[148]} onChange={this.props.handleAssessmentCheckboxes(148)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="left_lower_arm" value="Quemar" checked={values.assessmentCheckBoxes[149]} onChange={this.props.handleAssessmentCheckboxes(149)} />
                        </Col>

                        <Form.Label column sm={2}>{this.context.translate('Right-lower-arm')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="right_lower_arm" value="Normal" checked={values.assessmentCheckBoxes[150]} onChange={this.props.handleAssessmentCheckboxes(150)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="right_lower_arm" value="Abrasión" checked={values.assessmentCheckBoxes[151]} onChange={this.props.handleAssessmentCheckboxes(151)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="right_lower_arm" value="Laceración" checked={values.assessmentCheckBoxes[152]} onChange={this.props.handleAssessmentCheckboxes(152)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="right_lower_arm" value="Herida punzante" checked={values.assessmentCheckBoxes[153]} onChange={this.props.handleAssessmentCheckboxes(153)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="right_lower_arm" value="Sangrado" checked={values.assessmentCheckBoxes[154]} onChange={this.props.handleAssessmentCheckboxes(154)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="right_lower_arm" value="Contusión" checked={values.assessmentCheckBoxes[155]} onChange={this.props.handleAssessmentCheckboxes(155)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="right_lower_arm" value="Dolor" checked={values.assessmentCheckBoxes[156]} onChange={this.props.handleAssessmentCheckboxes(156)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="right_lower_arm" value="Hinchazón" checked={values.assessmentCheckBoxes[157]} onChange={this.props.handleAssessmentCheckboxes(157)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="right_lower_arm" value="Deformidad" checked={values.assessmentCheckBoxes[158]} onChange={this.props.handleAssessmentCheckboxes(158)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="right_lower_arm" value="Open Fracture" checked={values.assessmentCheckBoxes[159]} onChange={this.props.handleAssessmentCheckboxes(159)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="right_lower_arm" value="Numbness" checked={values.assessmentCheckBoxes[160]} onChange={this.props.handleAssessmentCheckboxes(160)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="right_lower_arm" value="Quemar" checked={values.assessmentCheckBoxes[161]} onChange={this.props.handleAssessmentCheckboxes(161)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Left-hand-/-wrist')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="left_hand_wrist" value="Normal" checked={values.assessmentCheckBoxes[162]} onChange={this.props.handleAssessmentCheckboxes(162)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="left_hand_wrist" value="Abrasión" checked={values.assessmentCheckBoxes[163]} onChange={this.props.handleAssessmentCheckboxes(163)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="left_hand_wrist" value="Laceración" checked={values.assessmentCheckBoxes[164]} onChange={this.props.handleAssessmentCheckboxes(164)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="left_hand_wrist" value="Herida punzante" checked={values.assessmentCheckBoxes[165]} onChange={this.props.handleAssessmentCheckboxes(165)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="left_hand_wrist" value="Sangrado" checked={values.assessmentCheckBoxes[166]} onChange={this.props.handleAssessmentCheckboxes(166)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="left_hand_wrist" value="Contusión" checked={values.assessmentCheckBoxes[167]} onChange={this.props.handleAssessmentCheckboxes(167)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="left_hand_wrist" value="Dolor" checked={values.assessmentCheckBoxes[168]} onChange={this.props.handleAssessmentCheckboxes(168)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="left_hand_wrist" value="Hinchazón" checked={values.assessmentCheckBoxes[169]} onChange={this.props.handleAssessmentCheckboxes(169)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="left_hand_wrist" value="Deformidad" checked={values.assessmentCheckBoxes[170]} onChange={this.props.handleAssessmentCheckboxes(170)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="left_hand_wrist" value="Open Fracture" checked={values.assessmentCheckBoxes[171]} onChange={this.props.handleAssessmentCheckboxes(171)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="left_hand_wrist" value="Numbness" checked={values.assessmentCheckBoxes[172]} onChange={this.props.handleAssessmentCheckboxes(172)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="left_hand_wrist" value="Quemar" checked={values.assessmentCheckBoxes[173]} onChange={this.props.handleAssessmentCheckboxes(173)} />
                        </Col>

                        <Form.Label column sm={2}>{this.context.translate('Right-hand-/-wrist')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="right_hand_wrist" value="Normal" checked={values.assessmentCheckBoxes[174]} onChange={this.props.handleAssessmentCheckboxes(174)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="right_hand_wrist" value="Abrasión" checked={values.assessmentCheckBoxes[175]} onChange={this.props.handleAssessmentCheckboxes(175)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="right_hand_wrist" value="Laceración" checked={values.assessmentCheckBoxes[176]} onChange={this.props.handleAssessmentCheckboxes(176)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="right_hand_wrist" value="Herida punzante" checked={values.assessmentCheckBoxes[177]} onChange={this.props.handleAssessmentCheckboxes(177)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="right_hand_wrist" value="Sangrado" checked={values.assessmentCheckBoxes[178]} onChange={this.props.handleAssessmentCheckboxes(178)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="right_hand_wrist" value="Contusión" checked={values.assessmentCheckBoxes[179]} onChange={this.props.handleAssessmentCheckboxes(179)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="right_hand_wrist" value="Dolor" checked={values.assessmentCheckBoxes[180]} onChange={this.props.handleAssessmentCheckboxes(180)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="right_hand_wrist" value="Hinchazón" checked={values.assessmentCheckBoxes[181]} onChange={this.props.handleAssessmentCheckboxes(181)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="right_hand_wrist" value="Deformidad" checked={values.assessmentCheckBoxes[182]} onChange={this.props.handleAssessmentCheckboxes(182)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="right_hand_wrist" value="Open Fracture" checked={values.assessmentCheckBoxes[183]} onChange={this.props.handleAssessmentCheckboxes(183)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="right_hand_wrist" value="Numbness" checked={values.assessmentCheckBoxes[184]} onChange={this.props.handleAssessmentCheckboxes(184)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="right_hand_wrist" value="Quemar" checked={values.assessmentCheckBoxes[185]} onChange={this.props.handleAssessmentCheckboxes(185)} />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Left-upper-leg')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="left_upper_leg" value="Normal" checked={values.assessmentCheckBoxes[186]} onChange={this.props.handleAssessmentCheckboxes(186)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="left_upper_leg" value="Abrasión" checked={values.assessmentCheckBoxes[187]} onChange={this.props.handleAssessmentCheckboxes(187)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="left_upper_leg" value="Laceración" checked={values.assessmentCheckBoxes[188]} onChange={this.props.handleAssessmentCheckboxes(188)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="left_upper_leg" value="Herida punzante" checked={values.assessmentCheckBoxes[189]} onChange={this.props.handleAssessmentCheckboxes(189)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="left_upper_leg" value="Sangrado" checked={values.assessmentCheckBoxes[190]} onChange={this.props.handleAssessmentCheckboxes(190)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="left_upper_leg" value="Contusión" checked={values.assessmentCheckBoxes[191]} onChange={this.props.handleAssessmentCheckboxes(191)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="left_upper_leg" value="Dolor" checked={values.assessmentCheckBoxes[192]} onChange={this.props.handleAssessmentCheckboxes(192)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="left_upper_leg" value="Hinchazón" checked={values.assessmentCheckBoxes[193]} onChange={this.props.handleAssessmentCheckboxes(193)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="left_upper_leg" value="Deformidad" checked={values.assessmentCheckBoxes[194]} onChange={this.props.handleAssessmentCheckboxes(194)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="left_upper_leg" value="Open Fracture" checked={values.assessmentCheckBoxes[195]} onChange={this.props.handleAssessmentCheckboxes(195)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="left_upper_leg" value="Numbness" checked={values.assessmentCheckBoxes[196]} onChange={this.props.handleAssessmentCheckboxes(197)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="left_upper_leg" value="Quemar" checked={values.assessmentCheckBoxes[197]} onChange={this.props.handleAssessmentCheckboxes(197)} />
                        </Col>

                        <Form.Label column sm={2}>{this.context.translate('Right-upper-leg')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="right_upper_leg" value="Normal" checked={values.assessmentCheckBoxes[198]} onChange={this.props.handleAssessmentCheckboxes(198)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="right_upper_leg" value="Abrasión" checked={values.assessmentCheckBoxes[199]} onChange={this.props.handleAssessmentCheckboxes(199)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="right_upper_leg" value="Laceración" checked={values.assessmentCheckBoxes[200]} onChange={this.props.handleAssessmentCheckboxes(200)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="right_upper_leg" value="Herida punzante" checked={values.assessmentCheckBoxes[201]} onChange={this.props.handleAssessmentCheckboxes(201)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="right_upper_leg" value="Sangrado" checked={values.assessmentCheckBoxes[202]} onChange={this.props.handleAssessmentCheckboxes(202)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="right_upper_leg" value="Contusión" checked={values.assessmentCheckBoxes[203]} onChange={this.props.handleAssessmentCheckboxes(203)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="right_upper_leg" value="Dolor" checked={values.assessmentCheckBoxes[204]} onChange={this.props.handleAssessmentCheckboxes(204)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="right_upper_leg" value="Hinchazón" checked={values.assessmentCheckBoxes[205]} onChange={this.props.handleAssessmentCheckboxes(205)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="right_upper_leg" value="Deformidad" checked={values.assessmentCheckBoxes[206]} onChange={this.props.handleAssessmentCheckboxes(206)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="right_upper_leg" value="Open Fracture" checked={values.assessmentCheckBoxes[207]} onChange={this.props.handleAssessmentCheckboxes(207)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="right_upper_leg" value="Numbness" checked={values.assessmentCheckBoxes[208]} onChange={this.props.handleAssessmentCheckboxes(208)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="right_upper_leg" value="Quemar" checked={values.assessmentCheckBoxes[209]} onChange={this.props.handleAssessmentCheckboxes(209)} />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Left-lower-leg')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="left_lower_leg" value="Normal" checked={values.assessmentCheckBoxes[210]} onChange={this.props.handleAssessmentCheckboxes(210)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="left_lower_leg" value="Abrasión" checked={values.assessmentCheckBoxes[211]} onChange={this.props.handleAssessmentCheckboxes(211)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="left_lower_leg" value="Laceración" checked={values.assessmentCheckBoxes[212]} onChange={this.props.handleAssessmentCheckboxes(212)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="left_lower_leg" value="Herida punzante" checked={values.assessmentCheckBoxes[213]} onChange={this.props.handleAssessmentCheckboxes(213)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="left_lower_leg" value="Sangrado" checked={values.assessmentCheckBoxes[214]} onChange={this.props.handleAssessmentCheckboxes(214)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="left_lower_leg" value="Contusión" checked={values.assessmentCheckBoxes[215]} onChange={this.props.handleAssessmentCheckboxes(215)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="left_lower_leg" value="Dolor" checked={values.assessmentCheckBoxes[216]} onChange={this.props.handleAssessmentCheckboxes(216)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="left_lower_leg" value="Hinchazón" checked={values.assessmentCheckBoxes[217]} onChange={this.props.handleAssessmentCheckboxes(217)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="left_lower_leg" value="Deformidad" checked={values.assessmentCheckBoxes[218]} onChange={this.props.handleAssessmentCheckboxes(218)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="left_lower_leg" value="Open Fracture" checked={values.assessmentCheckBoxes[219]} onChange={this.props.handleAssessmentCheckboxes(219)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="left_lower_leg" value="Numbness" checked={values.assessmentCheckBoxes[220]} onChange={this.props.handleAssessmentCheckboxes(220)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="left_lower_leg" value="Quemar" checked={values.assessmentCheckBoxes[222]} onChange={this.props.handleAssessmentCheckboxes(222)} />
                        </Col>

                        <Form.Label column sm={2}>{this.context.translate('Right-lower-leg')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="right_lower_leg" value="Normal" checked={values.assessmentCheckBoxes[223]} onChange={this.props.handleAssessmentCheckboxes(233)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="right_lower_leg" value="Abrasión" checked={values.assessmentCheckBoxes[224]} onChange={this.props.handleAssessmentCheckboxes(224)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="right_lower_leg" value="Laceración" checked={values.assessmentCheckBoxes[225]} onChange={this.props.handleAssessmentCheckboxes(225)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="right_lower_leg" value="Herida punzante" checked={values.assessmentCheckBoxes[226]} onChange={this.props.handleAssessmentCheckboxes(227)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="right_lower_leg" value="Sangrado" checked={values.assessmentCheckBoxes[228]} onChange={this.props.handleAssessmentCheckboxes(228)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="right_lower_leg" value="Contusión" checked={values.assessmentCheckBoxes[229]} onChange={this.props.handleAssessmentCheckboxes(229)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="right_lower_leg" value="Dolor" checked={values.assessmentCheckBoxes[230]} onChange={this.props.handleAssessmentCheckboxes(230)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="right_lower_leg" value="Hinchazón" checked={values.assessmentCheckBoxes[231]} onChange={this.props.handleAssessmentCheckboxes(231)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="right_lower_leg" value="Deformidad" checked={values.assessmentCheckBoxes[232]} onChange={this.props.handleAssessmentCheckboxes(232)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="right_lower_leg" value="Open Fracture" checked={values.assessmentCheckBoxes[233]} onChange={this.props.handleAssessmentCheckboxes(233)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="right_lower_leg" value="Numbness" checked={values.assessmentCheckBoxes[234]} onChange={this.props.handleAssessmentCheckboxes(234)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="right_lower_leg" value="Quemar" checked={values.assessmentCheckBoxes[235]} onChange={this.props.handleAssessmentCheckboxes(235)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Left-ankle-/-foot')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="left_ankle_foot" value="Normal" checked={values.assessmentCheckBoxes[236]} onChange={this.props.handleAssessmentCheckboxes(236)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="left_ankle_foot" value="Abrasión" checked={values.assessmentCheckBoxes[237]} onChange={this.props.handleAssessmentCheckboxes(237)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="left_ankle_foot" value="Laceración" checked={values.assessmentCheckBoxes[238]} onChange={this.props.handleAssessmentCheckboxes(238)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="left_ankle_foot" value="Herida punzante" checked={values.assessmentCheckBoxes[239]} onChange={this.props.handleAssessmentCheckboxes(239)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="left_ankle_foot" value="Sangrado" checked={values.assessmentCheckBoxes[240]} onChange={this.props.handleAssessmentCheckboxes(240)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="left_ankle_foot" value="Contusión" checked={values.assessmentCheckBoxes[241]} onChange={this.props.handleAssessmentCheckboxes(241)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="left_ankle_foot" value="Dolor" checked={values.assessmentCheckBoxes[242]} onChange={this.props.handleAssessmentCheckboxes(242)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="left_ankle_foot" value="Hinchazón" checked={values.assessmentCheckBoxes[243]} onChange={this.props.handleAssessmentCheckboxes(243)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="left_ankle_foot" value="Deformidad" checked={values.assessmentCheckBoxes[244]} onChange={this.props.handleAssessmentCheckboxes(244)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="left_ankle_foot" value="Open Fracture" checked={values.assessmentCheckBoxes[245]} onChange={this.props.handleAssessmentCheckboxes(245)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="left_ankle_foot" value="Numbness" checked={values.assessmentCheckBoxes[246]} onChange={this.props.handleAssessmentCheckboxes(246)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="left_ankle_foot" value="Quemar" checked={values.assessmentCheckBoxes[247]} onChange={this.props.handleAssessmentCheckboxes(247)} />
                        </Col>

                        <Form.Label column sm={2}>{this.context.translate('Right-ankle-/-foot')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={this.context.translate('Normal')} name="right_ankle_foot" value="Normal" checked={values.assessmentCheckBoxes[248]} onChange={this.props.handleAssessmentCheckboxes(248)} />
                            <Form.Check type="checkbox" label={this.context.translate('Abrasion')} name="right_ankle_foot" value="Abrasión" checked={values.assessmentCheckBoxes[249]} onChange={this.props.handleAssessmentCheckboxes(249)} />
                            <Form.Check type="checkbox" label={this.context.translate('Laceration')} name="right_ankle_foot" value="Laceración" checked={values.assessmentCheckBoxes[250]} onChange={this.props.handleAssessmentCheckboxes(250)} />
                            <Form.Check type="checkbox" label={this.context.translate('Puncture-wound')} name="right_ankle_foot" value="Herida punzante" checked={values.assessmentCheckBoxes[251]} onChange={this.props.handleAssessmentCheckboxes(251)} />
                            <Form.Check type="checkbox" label={this.context.translate('Bleeding')} name="right_ankle_foot" value="Sangrado" checked={values.assessmentCheckBoxes[252]} onChange={this.props.handleAssessmentCheckboxes(252)} />
                            <Form.Check type="checkbox" label={this.context.translate('Contusion')} name="right_ankle_foot" value="Contusión" checked={values.assessmentCheckBoxes[253]} onChange={this.props.handleAssessmentCheckboxes(253)} />
                            <Form.Check type="checkbox" label={this.context.translate('Pain')}name="right_ankle_foot" value="Dolor" checked={values.assessmentCheckBoxes[254]} onChange={this.props.handleAssessmentCheckboxes(254)} />
                            <Form.Check type="checkbox" label={this.context.translate('Swelling')} name="right_ankle_foot" value="Hinchazón" checked={values.assessmentCheckBoxes[255]} onChange={this.props.handleAssessmentCheckboxes(255)} />
                            <Form.Check type="checkbox" label={this.context.translate('Deformity')} name="right_ankle_foot" value="Deformidad" checked={values.assessmentCheckBoxes[256]} onChange={this.props.handleAssessmentCheckboxes(256)} />
                            <Form.Check type="checkbox" label={this.context.translate('Open-fracture')} name="right_ankle_foot" value="Open Fracture" checked={values.assessmentCheckBoxes[257]} onChange={this.props.handleAssessmentCheckboxes(257)} />
                            <Form.Check type="checkbox" label={this.context.translate('Numbness')} name="right_ankle_foot" value="Numbness" checked={values.assessmentCheckBoxes[258]} onChange={this.props.handleAssessmentCheckboxes(258)} />
                            <Form.Check type="checkbox" label={this.context.translate('Burn')} name="right_ankle_foot" value="Quemar" checked={values.assessmentCheckBoxes[259]} onChange={this.props.handleAssessmentCheckboxes(259)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>{this.context.translate('Pulse-Strength')}</Form.Label>
                        <Col sm={3} className="mt-2">
                            <Form.Control as="select" size="sm" onChange={this.props.handleChange('pulse_strength')} value={values.pulse_strength}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Normal">Normal</option>
                                <option value="Débil">{this.context.translate('Weak')}</option>
                                <option value="Ausente">{this.context.translate('Absent')}</option>
                                <option value="Delimitador">{this.context.translate('Bounding')}</option>
                            </Form.Control>
                        </Col>
                        <Col sm={1}></Col>

                        <Form.Label column sm={2}>{this.context.translate('Pulse-Rate')}</Form.Label>
                        <Col sm={3} className="mt-2">
                            <Form.Control as="select" size="sm" onChange={this.props.handleChange('pulse_rate')} value={values.pulse_rate}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Regular">{this.context.translate('Regular')}</option>
                                <option value="Irregular">{this.context.translate('Irregular')}</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2} className="font-weight-bold">{this.context.translate('Stroke-')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" name="none" value="none" label={``} checked={values.assessmentCheckBoxes[260]} onChange={this.props.handleAssessmentCheckboxes(260)}/>
                        </Col>
                    </Form.Group>


                    {values.assessmentCheckBoxes[260] ?
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>{this.context.translate('Time-of-onset')}</Form.Label>
                            <Col sm={4} className="mt-2">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Time"
                                    onChange={this.props.handleChange('stroke_time')}
                                    value={values.stroke_time}
                                />
                            </Col>

                            <Form.Label column sm={2}>{this.context.translate('Facial-droop')}</Form.Label>
                            <Col sm={3} className="mt-2">
                                <Form.Control as="select" size="sm" onChange={this.props.handleChange('stroke_facial_droop')} value={values.stroke_facial_droop}>
                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                    <option value="Sí">{this.context.translate('Yes')}</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Col>

                            <Form.Label column sm={2}>{this.context.translate('Arm-Drift')}</Form.Label>
                            <Col sm={4} className="mt-2">
                                <Form.Control as="select" size="sm" onChange={this.props.handleChange('stroke_arm_drift')} value={values.stroke_arm_droop}>
                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                    <option value="Sí">{this.context.translate('Yes')}</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Col>

                            <Form.Label column sm={2}>{this.context.translate('Abnormal-Speech')}</Form.Label>
                            <Col sm={3} className="mt-2">
                                <Form.Control as="select" size="sm" onChange={this.props.handleChange('stroke_abnormal_speech')} value={values.stroke_abnormal_speech}>
                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                    <option value="Sí">{this.context.translate('Yes')}</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                                :  null }

                    <Form.Group as={Row}>
                        <Form.Label column sm={2} className="font-weight-bold">{this.context.translate('Vital-Signs')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" name="none" value="vitalSigns" label={``} checked={values.assessmentCheckBoxes[261]} onChange={this.props.handleAssessmentCheckboxes(261)} />
                        </Col>
                    </Form.Group>

                    {values.assessmentCheckBoxes[261] ?
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>{this.context.translate('Time')}</Form.Label>
                            <Col sm={4} className="mt-2">
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={this.props.handleChange('vital_signs_time')}
                                    value={values.vital_signs_time}
                                />
                            </Col>
                            <Form.Label column sm={2}>{this.context.translate('Pulse')}</Form.Label>
                            <Col sm={4} className="mt-2">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=""
                                    onChange={this.props.handleChange('vital_signs_pulse')}
                                    value={values.vital_signs_pulse}
                                />
                            </Col>

                            <Form.Label column sm={2}>B/P</Form.Label>
                            <Col sm={4} className="mt-2">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=""
                                    onChange={this.props.handleChange('vital_signs_b_p')}
                                    value={values.vital_signs_b_p}
                                />
                            </Col>

                        <Form.Label column sm={2}>Resp</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                onChange={this.props.handleChange('vital_signs_resp')}
                                value={values.vital_signs_resp}
                            />
                        </Col>
                            
                        <Form.Label column sm={2}>Sp02</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                onChange={this.props.handleChange('vital_signs_spo2')}
                                value={values.vital_signs_spo2}
                            />
                        </Col>

                        <Form.Label column sm={2}>GCS</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                onChange={this.props.handleChange('vital_signs_gcs')}
                                value={values.vital_signs_gcs}
                            />
                        </Col>
                        
                            <Form.Label column sm={2}>{this.context.translate('Pain')}</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                onChange={this.props.handleChange('vital_signs_pain')}
                                value={values.vital_signs_pain}
                            />
                        </Col>

                        <Form.Label column sm={2}>Temp</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                onChange={this.props.handleChange('vital_signs_temp')}
                                value={values.vital_signs_temp}
                            />
                        </Col>

                            <Form.Label column sm={2}>ETCO2</Form.Label>
                            <Col sm={4} className="mt-2">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=""
                                    onChange={this.props.handleChange('vital_signs_etco2')}
                                    value={values.vital_signs_etco2}
                                />
                            </Col>
                            <Button className="left" onClick={this.addVitals}>{this.context.translate('add-vitals')}</Button>
                        </Form.Group>
                        : null}
                            

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>{this.context.translate('Additional-findings')}</Form.Label>
                        <Col sm={8} className="mt-2">
                            <textarea type="text" placeholder="Enter Text" className="mb-3" rows="10" cols="100" onChange={this.props.handleChange('extra_findings')} value={values.extra_findings}/> 
                        </Col>
                    </Form.Group>


                    <Button className="left" onClick={this.back}>Previous</Button>
                    <Button className="right" onClick={this.saveAndContinue}>Next</Button>
                </div>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                    <div className="tab" onClick={this.navigate(1)}>
                        <img src="/profile.png" />
                        <b>Call</b>
                    </div>
                    <div className="tab" onClick={this.navigate(2)}>
                        <img src="/profile.png" />
                        <b>Patient</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(3)}>
                        <img src="/profile.png" />
                        <b>Physical Exam</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/profile.png" />
                        <b>Interventions</b>
                    </div>
                    <div className="tab" onClick={this.navigate(5)}>
                        <img src="/profile.png" />
                        <b>Confirm</b>
                    </div>
                </div>
            </div>
        )
    }
}