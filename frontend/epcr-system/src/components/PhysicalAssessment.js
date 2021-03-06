import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { MainContext } from '../Auth'
import '../styles/PhysicalAssessment.css'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class PhysicalAssessment extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        // Creating Assessment checkboxes object
        this.state = {
            showStr: false
        }
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
        const vitals = "[Hora: " + this.props.values.vital_signs_time + " Pulso: " + this.props.values.vital_signs_pulse + " B/P: " + this.props.values.vital_signs_b_p + " Resp: " + this.props.values.vital_signs_resp + " Sp02: " + this.props.values.vital_signs_spo2 + " GCS: " + this.props.values.vital_signs_gcs + " Dolor: " + this.props.values.vital_signs_pain + " Temp: " + this.props.values.vital_signs_temp + " ETCO2: " + this.props.values.vital_signs_temp + "]";
        this.props.appendVitals(vitals);
    }

    render() {
        const{values} = this.props;
        console.log(values);
        return (
            <div className="assessment">
                <div className="content">
                    <h2 className="mb-2">Physical Exam</h2>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Skin</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="skin" value="Normal" checked={values.assessmentCheckBoxes[1]} onChange={this.props.handleAssessmentCheckboxes(1)} />
                            <Form.Check type="checkbox" label={`Pale`} name="skin" value="Pale" checked={values.assessmentCheckBoxes[2]} onChange={this.props.handleAssessmentCheckboxes(2)} />
                            <Form.Check type="checkbox" label={`Cyanotic`} name="skin" value="Cyanotic" checked={values.assessmentCheckBoxes[3]} onChange={this.props.handleAssessmentCheckboxes(3)} />
                            <Form.Check type="checkbox" label={`Mottled`} name="skin" value="Mottled" checked={values.assessmentCheckBoxes[4]} onChange={this.props.handleAssessmentCheckboxes(4)} />
                            <Form.Check type="checkbox" label={`Cap refill <2 sec`} name="skin" value="Cap refill <2 sec" checked={values.assessmentCheckBoxes[5]} onChange={this.props.handleAssessmentCheckboxes(5)} />
                            <Form.Check type="checkbox" label={`Cap refill >4 sec`} name="skin" value="Cap refill >4 sec" checked={values.assessmentCheckBoxes[6]} onChange={this.props.handleAssessmentCheckboxes(6)} />
                            <Form.Check type="checkbox" label={`Hot`} name="skin" value="Hot" checked={values.assessmentCheckBoxes[7]} onChange={this.props.handleAssessmentCheckboxes(7)} />
                            <Form.Check type="checkbox" label={`Cool/cold`} name="skin" value="Cool/cold" checked={values.assessmentCheckBoxes[8]} onChange={this.props.handleAssessmentCheckboxes(8)} />
                            <Form.Check type="checkbox" label={`Clammy`} name="skin" value="Clammy" checked={values.assessmentCheckBoxes[9]} onChange={this.props.handleAssessmentCheckboxes(9)} />
                            <Form.Check type="checkbox" label={`Diaphoretic`} name="skin" value="Diaphoretic" checked={values.assessmentCheckBoxes[10]} onChange={this.props.handleAssessmentCheckboxes(10)} />
                            <Form.Check type="checkbox" label={`Flushed`} name="skin" value="Flushed" checked={values.assessmentCheckBoxes[11]} onChange={this.props.handleAssessmentCheckboxes(11)} />
                            <Form.Check type="checkbox" label={`Rash`} name="skin" value="Rash" checked={values.assessmentCheckBoxes[12]} onChange={this.props.handleAssessmentCheckboxes(12)} />
                        </Col>

                        <Form.Label column sm={2}>Mental</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="mental" value="Normal" checked={values.assessmentCheckBoxes[13]} onChange={this.props.handleAssessmentCheckboxes(13)} />
                            <Form.Check type="checkbox" label={`Oriented person`} name="mental" value="Oriented person" checked={values.assessmentCheckBoxes[14]} onChange={this.props.handleAssessmentCheckboxes(14)} />
                            <Form.Check type="checkbox" label={`Oriented place`} name="mental" value="Oriented place" checked={values.assessmentCheckBoxes[15]} onChange={this.props.handleAssessmentCheckboxes(15)} />
                            <Form.Check type="checkbox" label={`Oriented time`} name="mental" value="Oriented time" checked={values.assessmentCheckBoxes[16]} onChange={this.props.handleAssessmentCheckboxes(16)} />
                            <Form.Check type="checkbox" label={`Oriented event`} name="mental" value="Oriented event" checked={values.assessmentCheckBoxes[17]} onChange={this.props.handleAssessmentCheckboxes(17)} />
                            <Form.Check type="checkbox" label={`Confused`} name="mental" value="Confused" checked={values.assessmentCheckBoxes[18]} onChange={this.props.handleAssessmentCheckboxes(18)} />
                            <Form.Check type="checkbox" label={`Lethargic`} name="mental" value="Lethargic" checked={values.assessmentCheckBoxes[19]} onChange={this.props.handleAssessmentCheckboxes(19)} />
                            <Form.Check type="checkbox" label={`Unresponsive`} name="mental" value="Unresponsive" checked={values.assessmentCheckBoxes[20]} onChange={this.props.handleAssessmentCheckboxes(20)} />
                            <Form.Check type="checkbox" label={`Combative`} name="mental" value="Combative" checked={values.assessmentCheckBoxes[21]} onChange={this.props.handleAssessmentCheckboxes(21)} />
                            <Form.Check type="checkbox" label={`Suicidal thinking/action`} name="mental" value="Suicidal thinking/action" checked={values.assessmentCheckBoxes[22]} onChange={this.props.handleAssessmentCheckboxes(22)} />
                            <Form.Check type="checkbox" label={`Hallucinations`} name="mental" value="Hallucinations" checked={values.assessmentCheckBoxes[23]} onChange={this.props.handleAssessmentCheckboxes(23)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Neurological</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="neurological" value="Normal" checked={values.assessmentCheckBoxes[24]} onChange={this.props.handleAssessmentCheckboxes(24)} />
                            <Form.Check type="checkbox" label={`Pale`} name="neurological" value="Pale" checked={values.assessmentCheckBoxes[25]} onChange={this.props.handleAssessmentCheckboxes(25)} />
                            <Form.Check type="checkbox" label={`Normal`} name="neurological" value="Normal" checked={values.assessmentCheckBoxes[26]} onChange={this.props.handleAssessmentCheckboxes(26)} />
                            <Form.Check type="checkbox" label={`Slurred speech`} name="neurological" value="Slurred speech" checked={values.assessmentCheckBoxes[27]} onChange={this.props.handleAssessmentCheckboxes(27)} />
                            <Form.Check type="checkbox" label={`Left facial droop`} name="neurological" value="Left facial droop" checked={values.assessmentCheckBoxes[28]} onChange={this.props.handleAssessmentCheckboxes(28)} />
                            <Form.Check type="checkbox" label={`Right facial droop`} name="neurological" value="Right facial droop" checked={values.assessmentCheckBoxes[29]} onChange={this.props.handleAssessmentCheckboxes(29)} />
                            <Form.Check type="checkbox" label={`Left side weakness`} name="neurological" value="Left side weakness" checked={values.assessmentCheckBoxes[30]} onChange={this.props.handleAssessmentCheckboxes(30)} />
                            <Form.Check type="checkbox" label={`Right side weakness`} name="neurological" value="Right side weakness" checked={values.assessmentCheckBoxes[31]} onChange={this.props.handleAssessmentCheckboxes(31)}/>
                            <Form.Check type="checkbox" label={`Left side hemiplegia`} name="neurological" value="Left side hemiplegia" checked={values.assessmentCheckBoxes[32]} onChange={this.props.handleAssessmentCheckboxes(32)} />
                            <Form.Check type="checkbox" label={`Right side hemiplegia`} name="neurological" value="Right side hemiplegia" checked={values.assessmentCheckBoxes[33]} onChange={this.props.handleAssessmentCheckboxes(33)} />
                            <Form.Check type="checkbox" label={`Seizure`} name="neurological" value="Seizure" checked={values.assessmentCheckBoxes[34]} onChange={this.props.handleAssessmentCheckboxes(34)} />
                            <Form.Check type="checkbox" label={`Posturing`} name="neurological" value="Posturing" checked={values.assessmentCheckBoxes[35]} onChange={this.props.handleAssessmentCheckboxes(35)} />
                            <Form.Check type="checkbox" label={`Pupils pinpoint`} name="neurological" value="Pupils pinpoint" checked={values.assessmentCheckBoxes[36]} onChange={this.props.handleAssessmentCheckboxes(36)} />
                            <Form.Check type="checkbox" label={`Pupils dilated`} name="neurological" value="Pupils dilated" checked={values.assessmentCheckBoxes[37]} onChange={this.props.handleAssessmentCheckboxes(37)} />
                            <Form.Check type="checkbox" label={`Pupil Left > Right`} name="neurological" value="Pupil Left > Right" checked={values.assessmentCheckBoxes[38]} onChange={this.props.handleAssessmentCheckboxes(38)} />
                            <Form.Check type="checkbox" label={`Pupil Right > left`} name="neurological" value="Pupil Right > left" checked={values.assessmentCheckBoxes[39]} onChange={this.props.handleAssessmentCheckboxes(39)} />
                            <Form.Check type="checkbox" label={`Pupils nonreactive`} name="neurological" value="Pupils nonreactive" checked={values.assessmentCheckBoxes[40]} onChange={this.props.handleAssessmentCheckboxes(40)} />
                        </Col>

                        <Form.Label column sm={2}>Head</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="head" value="Normal" checked={values.assessmentCheckBoxes[41]} onChange={this.props.handleAssessmentCheckboxes(41)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="head" value="Abrasion" checked={values.assessmentCheckBoxes[42]} onChange={this.props.handleAssessmentCheckboxes(42)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="head" value="Laceration" checked={values.assessmentCheckBoxes[43]} onChange={this.props.handleAssessmentCheckboxes(43)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="head" value="Puncture wound" checked={values.assessmentCheckBoxes[44]} onChange={this.props.handleAssessmentCheckboxes(44)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="head" value="Bleeding" checked={values.assessmentCheckBoxes[46]} onChange={this.props.handleAssessmentCheckboxes(46)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="head" value="Contusion" checked={values.assessmentCheckBoxes[47]} onChange={this.props.handleAssessmentCheckboxes(47)} />
                            <Form.Check type="checkbox" label={`Pain`} name="head" value="Pain" checked={values.assessmentCheckBoxes[48]} onChange={this.props.handleAssessmentCheckboxes(48)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="head" value="Swelling" checked={values.assessmentCheckBoxes[49]} onChange={this.props.handleAssessmentCheckboxes(49)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="head" value="Deformity" checked={values.assessmentCheckBoxes[50]} onChange={this.props.handleAssessmentCheckboxes(50)} />
                            <Form.Check type="checkbox" label={`Burn`} name="head" value="Burn" checked={values.assessmentCheckBoxes[51]} onChange={this.props.handleAssessmentCheckboxes(51)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Neck</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="neck" value="Normal" checked={values.assessmentCheckBoxes[52]} onChange={this.props.handleAssessmentCheckboxes(52)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="neck" value="Abrasion" checked={values.assessmentCheckBoxes[53]} onChange={this.props.handleAssessmentCheckboxes(53)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="neck" value="Laceration" checked={values.assessmentCheckBoxes[54]} onChange={this.props.handleAssessmentCheckboxes(54)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="neck" value="Puncture wound" checked={values.assessmentCheckBoxes[55]} onChange={this.props.handleAssessmentCheckboxes(55)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="neck" value="Bleeding" checked={values.assessmentCheckBoxes[56]} onChange={this.props.handleAssessmentCheckboxes(56)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="neck" value="Contusion" checked={values.assessmentCheckBoxes[57]} onChange={this.props.handleAssessmentCheckboxes(57)} />
                            <Form.Check type="checkbox" label={`Pain`} name="neck" value="Pain" checked={values.assessmentCheckBoxes[58]} onChange={this.props.handleAssessmentCheckboxes(58)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="neck" value="Swelling" checked={values.assessmentCheckBoxes[59]} onChange={this.props.handleAssessmentCheckboxes(59)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="neck" value="Deformity" checked={values.assessmentCheckBoxes[60]} onChange={this.props.handleAssessmentCheckboxes(60)} />
                            <Form.Check type="checkbox" label={`Burn`} name="neck" value="Burn" checked={values.assessmentCheckBoxes[61]} onChange={this.props.handleAssessmentCheckboxes(61)} />
                        </Col>

                        <Form.Label column sm={2}>Chest</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="chest" value="Normal" checked={values.assessmentCheckBoxes[62]} onChange={this.props.handleAssessmentCheckboxes(62)} />
                            <Form.Check type="checkbox" label={`Wheezing`} name="chest" value="Wheezing" checked={values.assessmentCheckBoxes[63]} onChange={this.props.handleAssessmentCheckboxes(63)} />
                            <Form.Check type="checkbox" label={`Respiration labored`} name="chest" value="Respiration labored" checked={values.assessmentCheckBoxes[64]} onChange={this.props.handleAssessmentCheckboxes(64)} />
                            <Form.Check type="checkbox" label={`Respiration uneven`} name="chest" value="Respiration uneven" checked={values.assessmentCheckBoxes[65]} onChange={this.props.handleAssessmentCheckboxes(65)} />
                            <Form.Check type="checkbox" label={`Respiration shallow`} name="chest" value="Respiration shallow" checked={values.assessmentCheckBoxes[66]} onChange={this.props.handleAssessmentCheckboxes(66)} />
                            <Form.Check type="checkbox" label={`Respiration absent`} name="chest" value="Respiration absent" checked={values.assessmentCheckBoxes[67]} onChange={this.props.handleAssessmentCheckboxes(67)} />
                            <Form.Check type="checkbox" label={`Breath sounds decrease left`} name="chest" value="Breath sounds decrease left" checked={values.assessmentCheckBoxes[68]} onChange={this.props.handleAssessmentCheckboxes(68)} />
                            <Form.Check type="checkbox" label={`Breath sounds decreased right`} name="chest" value="Breath sounds decreased right" checked={values.assessmentCheckBoxes[69]} onChange={this.props.handleAssessmentCheckboxes(69)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="chest" value="Deformity" checked={values.assessmentCheckBoxes[70]} onChange={this.props.handleAssessmentCheckboxes(70)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="chest" value="Abrasion" checked={values.assessmentCheckBoxes[71]} onChange={this.props.handleAssessmentCheckboxes(71)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="chest" value="Laceration" checked={values.assessmentCheckBoxes[72]} onChange={this.props.handleAssessmentCheckboxes(72)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="chest" value="Puncture wound" checked={values.assessmentCheckBoxes[73]} onChange={this.props.handleAssessmentCheckboxes(73)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="chest" value="Bleeding" checked={values.assessmentCheckBoxes[74]} onChange={this.props.handleAssessmentCheckboxes(74)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="chest" value="Contusion" checked={values.assessmentCheckBoxes[75]} onChange={this.props.handleAssessmentCheckboxes(75)} />
                            <Form.Check type="checkbox" label={`Pain`} name="chest" value="Pain" checked={values.assessmentCheckBoxes[76]} onChange={this.props.handleAssessmentCheckboxes(76)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="chest" value="Swelling" checked={values.assessmentCheckBoxes[77]} onChange={this.props.handleAssessmentCheckboxes(77)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="chest" value="Deformity" checked={values.assessmentCheckBoxes[78]} onChange={this.props.handleAssessmentCheckboxes(78)} />
                            <Form.Check type="checkbox" label={`Burn`} name="chest" value="Burn" checked={values.assessmentCheckBoxes[79]} onChange={this.props.handleAssessmentCheckboxes(79)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Abdomen</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="abdomen" value="Normal" checked={values.assessmentCheckBoxes[80]} onChange={this.props.handleAssessmentCheckboxes(80)} />
                            <Form.Check type="checkbox" label={`Rigid`} name="abdomen" value="Rigid" checked={values.assessmentCheckBoxes[81]} onChange={this.props.handleAssessmentCheckboxes(81)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="abdomen" value="Abrasion" checked={values.assessmentCheckBoxes[82]} onChange={this.props.handleAssessmentCheckboxes(82)}/>
                            <Form.Check type="checkbox" label={`Laceration`} name="abdomen" value="Laceration" checked={values.assessmentCheckBoxes[83]} onChange={this.props.handleAssessmentCheckboxes(83)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="abdomen" value="Puncture wound" checked={values.assessmentCheckBoxes[84]} onChange={this.props.handleAssessmentCheckboxes(84)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="abdomen" value="Bleeding" checked={values.assessmentCheckBoxes[85]} onChange={this.props.handleAssessmentCheckboxes(85)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="abdomen" value="Contusion" checked={values.assessmentCheckBoxes[86]} onChange={this.props.handleAssessmentCheckboxes(86)} />
                            <Form.Check type="checkbox" label={`Pain`} name="abdomen" value="Pain" checked={values.assessmentCheckBoxes[87]} onChange={this.props.handleAssessmentCheckboxes(87)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="abdomen" value="Swelling" checked={values.assessmentCheckBoxes[88]} onChange={this.props.handleAssessmentCheckboxes(88)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="abdomen" value="Deformity" checked={values.assessmentCheckBoxes[89]} onChange={this.props.handleAssessmentCheckboxes(89)} />
                            <Form.Check type="checkbox" label={`Burn`} name="abdomen" value="Burn" checked={values.assessmentCheckBoxes[90]} onChange={this.props.handleAssessmentCheckboxes(90)} />
                            <Form.Check type="checkbox" label={`Pregnant`} name="abdomen" value="Pregnant" checked={values.assessmentCheckBoxes[91]} onChange={this.props.handleAssessmentCheckboxes(91)} />
                        </Col>

                        <Form.Label column sm={2}>Pelvis</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="pelvis" value="Normal" checked={values.assessmentCheckBoxes[92]} onChange={this.props.handleAssessmentCheckboxes(92)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="pelvis" value="Abrasion" checked={values.assessmentCheckBoxes[93]} onChange={this.props.handleAssessmentCheckboxes(93)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="pelvis" value="Laceration" checked={values.assessmentCheckBoxes[94]} onChange={this.props.handleAssessmentCheckboxes(94)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="pelvis" value="Puncture wound" checked={values.assessmentCheckBoxes[95]} onChange={this.props.handleAssessmentCheckboxes(95)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="pelvis" value="Bleeding" checked={values.assessmentCheckBoxes[96]} onChange={this.props.handleAssessmentCheckboxes(96)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="pelvis" value="Contusion" checked={values.assessmentCheckBoxes[97]} onChange={this.props.handleAssessmentCheckboxes(97)} />
                            <Form.Check type="checkbox" label={`Pain`} name="pelvis" value="Pain" checked={values.assessmentCheckBoxes[98]} onChange={this.props.handleAssessmentCheckboxes(98)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="pelvis" value="Swelling" checked={values.assessmentCheckBoxes[99]} onChange={this.props.handleAssessmentCheckboxes(99)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="pelvis" value="Deformity" checked={values.assessmentCheckBoxes[100]} onChange={this.props.handleAssessmentCheckboxes(100)} />
                            <Form.Check type="checkbox" label={`Burn`} name="pelvis" value="Burn" checked={values.assessmentCheckBoxes[101]} onChange={this.props.handleAssessmentCheckboxes(101)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="pelvis" value="Unstable" checked={values.assessmentCheckBoxes[102]} onChange={this.props.handleAssessmentCheckboxes(102)} />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Back</Form.Label>
                            <Col sm={4} className="mt-2">
                                <Form.Check type="checkbox" label={`Normal`} name="back" value="Normal" checked={values.assessmentCheckBoxes[103]} onChange={this.props.handleAssessmentCheckboxes(103)} />
                                <Form.Check type="checkbox" label={`Abrasion`} name="back" value="Abrasion" checked={values.assessmentCheckBoxes[104]} onChange={this.props.handleAssessmentCheckboxes(104)} />
                                <Form.Check type="checkbox" label={`Laceration`} name="back" value="Laceration" checked={values.assessmentCheckBoxes[105]} onChange={this.props.handleAssessmentCheckboxes(105)} />
                                <Form.Check type="checkbox" label={`Puncture wound`} name="back" value="Puncture wound" checked={values.assessmentCheckBoxes[106]} onChange={this.props.handleAssessmentCheckboxes(106)} />
                                <Form.Check type="checkbox" label={`Bleeding`} name="back" value="Bleeding" checked={values.assessmentCheckBoxes[107]} onChange={this.props.handleAssessmentCheckboxes(107)} />
                                <Form.Check type="checkbox" label={`Contusion`} name="back" value="Contusion" checked={values.assessmentCheckBoxes[108]} onChange={this.props.handleAssessmentCheckboxes(108)} />
                                <Form.Check type="checkbox" label={`Pain`} name="back" value="Pain" checked={values.assessmentCheckBoxes[109]} onChange={this.props.handleAssessmentCheckboxes(109)} />
                                <Form.Check type="checkbox" label={`Swelling`} name="back" value="Swelling" checked={values.assessmentCheckBoxes[110]} onChange={this.props.handleAssessmentCheckboxes(110)} />
                                <Form.Check type="checkbox" label={`Deformity`} name="back" value="Deformity" checked={values.assessmentCheckBoxes[111]} onChange={this.props.handleAssessmentCheckboxes(111)} />
                                <Form.Check type="checkbox" label={`Burn`} name="back" value="Burn" checked={values.assessmentCheckBoxes[113]} onChange={this.props.handleAssessmentCheckboxes(113)} />
                            </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Left Upper Arm</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="left_upper_arm" value="Normal" checked={values.assessmentCheckBoxes[114]} onChange={this.props.handleAssessmentCheckboxes(114)}/>
                            <Form.Check type="checkbox" label={`Abrasion`} name="left_upper_arm" value="Abrasion" checked={values.assessmentCheckBoxes[115]} onChange={this.props.handleAssessmentCheckboxes(115)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="left_upper_arm" value="Laceration" checked={values.assessmentCheckBoxes[116]} onChange={this.props.handleAssessmentCheckboxes(116)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="left_upper_arm" value="Puncture wound" checked={values.assessmentCheckBoxes[117]} onChange={this.props.handleAssessmentCheckboxes(117)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="left_upper_arm" value="Bleeding" checked={values.assessmentCheckBoxes[118]} onChange={this.props.handleAssessmentCheckboxes(118)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="left_upper_arm" value="Contusion" checked={values.assessmentCheckBoxes[119]} onChange={this.props.handleAssessmentCheckboxes(119)} />
                            <Form.Check type="checkbox" label={`Pain`} name="left_upper_arm" value="Pain" checked={values.assessmentCheckBoxes[120]} onChange={this.props.handleAssessmentCheckboxes(120)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="left_upper_arm" value="Swelling" checked={values.assessmentCheckBoxes[121]} onChange={this.props.handleAssessmentCheckboxes(121)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="left_upper_arm" value="Deformity" checked={values.assessmentCheckBoxes[122]} onChange={this.props.handleAssessmentCheckboxes(122)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="left_upper_arm" value="Open Fracture" checked={values.assessmentCheckBoxes[123]} onChange={this.props.handleAssessmentCheckboxes(123)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="left_upper_arm" value="Numbness" checked={values.assessmentCheckBoxes[124]} onChange={this.props.handleAssessmentCheckboxes(124)} />
                            <Form.Check type="checkbox" label={`Burn`} name="left_upper_arm" value="Burn" checked={values.assessmentCheckBoxes[125]} onChange={this.props.handleAssessmentCheckboxes(125)} />
                        </Col>

                        <Form.Label column sm={2}>Right Upper Arm</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="right_upper_arm" value="Normal" checked={values.assessmentCheckBoxes[126]} onChange={this.props.handleAssessmentCheckboxes(126)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="right_upper_arm" value="Abrasion" checked={values.assessmentCheckBoxes[127]} onChange={this.props.handleAssessmentCheckboxes(127)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="right_upper_arm" value="Laceration" checked={values.assessmentCheckBoxes[128]} onChange={this.props.handleAssessmentCheckboxes(128)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="right_upper_arm" value="Puncture wound" checked={values.assessmentCheckBoxes[129]} onChange={this.props.handleAssessmentCheckboxes(129)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="right_upper_arm" value="Bleeding" checked={values.assessmentCheckBoxes[130]} onChange={this.props.handleAssessmentCheckboxes(130)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="right_upper_arm" value="Contusion" checked={values.assessmentCheckBoxes[131]} onChange={this.props.handleAssessmentCheckboxes(131)} />
                            <Form.Check type="checkbox" label={`Pain`} name="right_upper_arm" value="Pain" checked={values.assessmentCheckBoxes[132]} onChange={this.props.handleAssessmentCheckboxes(132)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="right_upper_arm" value="Swelling" checked={values.assessmentCheckBoxes[133]} onChange={this.props.handleAssessmentCheckboxes(133)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="right_upper_arm" value="Deformity" checked={values.assessmentCheckBoxes[134]} onChange={this.props.handleAssessmentCheckboxes(134)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="right_upper_arm" value="Open Fracture" checked={values.assessmentCheckBoxes[135]} onChange={this.props.handleAssessmentCheckboxes(135)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="right_upper_arm" value="Numbness" checked={values.assessmentCheckBoxes[136]} onChange={this.props.handleAssessmentCheckboxes(136)} />
                            <Form.Check type="checkbox" label={`Burn`} name="right_upper_arm" value="Burn" checked={values.assessmentCheckBoxes[137]} onChange={this.props.handleAssessmentCheckboxes(137)} />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Left Lower Arm</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="left_lower_arm" value="Normal" checked={values.assessmentCheckBoxes[138]} onChange={this.props.handleAssessmentCheckboxes(138)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="left_lower_arm" value="Abrasion" checked={values.assessmentCheckBoxes[139]} onChange={this.props.handleAssessmentCheckboxes(139)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="left_lower_arm" value="Laceration" checked={values.assessmentCheckBoxes[140]} onChange={this.props.handleAssessmentCheckboxes(140)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="left_lower_arm" value="Puncture wound" checked={values.assessmentCheckBoxes[141]} onChange={this.props.handleAssessmentCheckboxes(141)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="left_lower_arm" value="Bleeding" checked={values.assessmentCheckBoxes[142]} onChange={this.props.handleAssessmentCheckboxes(142)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="left_lower_arm" value="Contusion" checked={values.assessmentCheckBoxes[143]} onChange={this.props.handleAssessmentCheckboxes(143)} />
                            <Form.Check type="checkbox" label={`Pain`} name="left_lower_arm" value="Pain" checked={values.assessmentCheckBoxes[144]} onChange={this.props.handleAssessmentCheckboxes(144)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="left_lower_arm" value="Swelling" checked={values.assessmentCheckBoxes[145]} onChange={this.props.handleAssessmentCheckboxes(145)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="left_lower_arm" value="Deformity" checked={values.assessmentCheckBoxes[146]} onChange={this.props.handleAssessmentCheckboxes(146)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="left_lower_arm" value="Open Fracture" checked={values.assessmentCheckBoxes[147]} onChange={this.props.handleAssessmentCheckboxes(147)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="left_lower_arm" value="Numbness" checked={values.assessmentCheckBoxes[148]} onChange={this.props.handleAssessmentCheckboxes(148)} />
                            <Form.Check type="checkbox" label={`Burn`} name="left_lower_arm" value="Burn" checked={values.assessmentCheckBoxes[149]} onChange={this.props.handleAssessmentCheckboxes(149)} />
                        </Col>

                        <Form.Label column sm={2}>Right Lower Arm</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="right_lower_arm" value="Normal" checked={values.assessmentCheckBoxes[150]} onChange={this.props.handleAssessmentCheckboxes(150)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="right_lower_arm" value="Abrasion" checked={values.assessmentCheckBoxes[151]} onChange={this.props.handleAssessmentCheckboxes(151)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="right_lower_arm" value="Laceration" checked={values.assessmentCheckBoxes[152]} onChange={this.props.handleAssessmentCheckboxes(152)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="right_lower_arm" value="Puncture wound" checked={values.assessmentCheckBoxes[153]} onChange={this.props.handleAssessmentCheckboxes(153)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="right_lower_arm" value="Bleeding" checked={values.assessmentCheckBoxes[154]} onChange={this.props.handleAssessmentCheckboxes(154)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="right_lower_arm" value="Contusion" checked={values.assessmentCheckBoxes[155]} onChange={this.props.handleAssessmentCheckboxes(155)} />
                            <Form.Check type="checkbox" label={`Pain`} name="right_lower_arm" value="Pain" checked={values.assessmentCheckBoxes[156]} onChange={this.props.handleAssessmentCheckboxes(156)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="right_lower_arm" value="Swelling" checked={values.assessmentCheckBoxes[157]} onChange={this.props.handleAssessmentCheckboxes(157)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="right_lower_arm" value="Deformity" checked={values.assessmentCheckBoxes[158]} onChange={this.props.handleAssessmentCheckboxes(158)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="right_lower_arm" value="Open Fracture" checked={values.assessmentCheckBoxes[159]} onChange={this.props.handleAssessmentCheckboxes(159)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="right_lower_arm" value="Numbness" checked={values.assessmentCheckBoxes[160]} onChange={this.props.handleAssessmentCheckboxes(160)} />
                            <Form.Check type="checkbox" label={`Burn`} name="right_lower_arm" value="Burn" checked={values.assessmentCheckBoxes[161]} onChange={this.props.handleAssessmentCheckboxes(161)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Left hand/wrist</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="left_hand_wrist" value="Normal" checked={values.assessmentCheckBoxes[162]} onChange={this.props.handleAssessmentCheckboxes(162)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="left_hand_wrist" value="Abrasion" checked={values.assessmentCheckBoxes[163]} onChange={this.props.handleAssessmentCheckboxes(163)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="left_hand_wrist" value="Laceration" checked={values.assessmentCheckBoxes[164]} onChange={this.props.handleAssessmentCheckboxes(164)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="left_hand_wrist" value="Puncture wound" checked={values.assessmentCheckBoxes[165]} onChange={this.props.handleAssessmentCheckboxes(165)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="left_hand_wrist" value="Bleeding" checked={values.assessmentCheckBoxes[166]} onChange={this.props.handleAssessmentCheckboxes(166)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="left_hand_wrist" value="Contusion" checked={values.assessmentCheckBoxes[167]} onChange={this.props.handleAssessmentCheckboxes(167)} />
                            <Form.Check type="checkbox" label={`Pain`} name="left_hand_wrist" value="Pain" checked={values.assessmentCheckBoxes[168]} onChange={this.props.handleAssessmentCheckboxes(168)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="left_hand_wrist" value="Swelling" checked={values.assessmentCheckBoxes[169]} onChange={this.props.handleAssessmentCheckboxes(169)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="left_hand_wrist" value="Deformity" checked={values.assessmentCheckBoxes[170]} onChange={this.props.handleAssessmentCheckboxes(170)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="left_hand_wrist" value="Open Fracture" checked={values.assessmentCheckBoxes[171]} onChange={this.props.handleAssessmentCheckboxes(171)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="left_hand_wrist" value="Numbness" checked={values.assessmentCheckBoxes[172]} onChange={this.props.handleAssessmentCheckboxes(172)} />
                            <Form.Check type="checkbox" label={`Burn`} name="left_hand_wrist" value="Burn" checked={values.assessmentCheckBoxes[173]} onChange={this.props.handleAssessmentCheckboxes(173)} />
                        </Col>

                        <Form.Label column sm={2}>Right hand/wrist</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="right_hand_wrist" value="Normal" checked={values.assessmentCheckBoxes[174]} onChange={this.props.handleAssessmentCheckboxes(174)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="right_hand_wrist" value="Abrasion" checked={values.assessmentCheckBoxes[175]} onChange={this.props.handleAssessmentCheckboxes(175)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="right_hand_wrist" value="Laceration" checked={values.assessmentCheckBoxes[176]} onChange={this.props.handleAssessmentCheckboxes(176)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="right_hand_wrist" value="Puncture wound" checked={values.assessmentCheckBoxes[177]} onChange={this.props.handleAssessmentCheckboxes(177)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="right_hand_wrist" value="Bleeding" checked={values.assessmentCheckBoxes[178]} onChange={this.props.handleAssessmentCheckboxes(178)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="right_hand_wrist" value="Contusion" checked={values.assessmentCheckBoxes[179]} onChange={this.props.handleAssessmentCheckboxes(179)} />
                            <Form.Check type="checkbox" label={`Pain`} name="right_hand_wrist" value="Pain" checked={values.assessmentCheckBoxes[180]} onChange={this.props.handleAssessmentCheckboxes(180)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="right_hand_wrist" value="Swelling" checked={values.assessmentCheckBoxes[181]} onChange={this.props.handleAssessmentCheckboxes(181)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="right_hand_wrist" value="Deformity" checked={values.assessmentCheckBoxes[182]} onChange={this.props.handleAssessmentCheckboxes(182)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="right_hand_wrist" value="Open Fracture" checked={values.assessmentCheckBoxes[183]} onChange={this.props.handleAssessmentCheckboxes(183)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="right_hand_wrist" value="Numbness" checked={values.assessmentCheckBoxes[184]} onChange={this.props.handleAssessmentCheckboxes(184)} />
                            <Form.Check type="checkbox" label={`Burn`} name="right_hand_wrist" value="Burn" checked={values.assessmentCheckBoxes[185]} onChange={this.props.handleAssessmentCheckboxes(185)} />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Left Upper Leg</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="left_upper_leg" value="Normal" checked={values.assessmentCheckBoxes[186]} onChange={this.props.handleAssessmentCheckboxes(186)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="left_upper_leg" value="Abrasion" checked={values.assessmentCheckBoxes[187]} onChange={this.props.handleAssessmentCheckboxes(187)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="left_upper_leg" value="Laceration" checked={values.assessmentCheckBoxes[188]} onChange={this.props.handleAssessmentCheckboxes(188)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="left_upper_leg" value="Puncture wound" checked={values.assessmentCheckBoxes[189]} onChange={this.props.handleAssessmentCheckboxes(189)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="left_upper_leg" value="Bleeding" checked={values.assessmentCheckBoxes[190]} onChange={this.props.handleAssessmentCheckboxes(190)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="left_upper_leg" value="Contusion" checked={values.assessmentCheckBoxes[191]} onChange={this.props.handleAssessmentCheckboxes(191)} />
                            <Form.Check type="checkbox" label={`Pain`} name="left_upper_leg" value="Pain" checked={values.assessmentCheckBoxes[192]} onChange={this.props.handleAssessmentCheckboxes(192)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="left_upper_leg" value="Swelling" checked={values.assessmentCheckBoxes[193]} onChange={this.props.handleAssessmentCheckboxes(193)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="left_upper_leg" value="Deformity" checked={values.assessmentCheckBoxes[194]} onChange={this.props.handleAssessmentCheckboxes(194)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="left_upper_leg" value="Open Fracture" checked={values.assessmentCheckBoxes[195]} onChange={this.props.handleAssessmentCheckboxes(195)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="left_upper_leg" value="Numbness" checked={values.assessmentCheckBoxes[196]} onChange={this.props.handleAssessmentCheckboxes(197)} />
                            <Form.Check type="checkbox" label={`Burn`} name="left_upper_leg" value="Burn" checked={values.assessmentCheckBoxes[197]} onChange={this.props.handleAssessmentCheckboxes(197)} />
                        </Col>

                        <Form.Label column sm={2}>Right Upper Leg</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="right_upper_leg" value="Normal" checked={values.assessmentCheckBoxes[198]} onChange={this.props.handleAssessmentCheckboxes(198)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="right_upper_leg" value="Abrasion" checked={values.assessmentCheckBoxes[199]} onChange={this.props.handleAssessmentCheckboxes(199)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="right_upper_leg" value="Laceration" checked={values.assessmentCheckBoxes[200]} onChange={this.props.handleAssessmentCheckboxes(200)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="right_upper_leg" value="Puncture wound" checked={values.assessmentCheckBoxes[201]} onChange={this.props.handleAssessmentCheckboxes(201)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="right_upper_leg" value="Bleeding" checked={values.assessmentCheckBoxes[202]} onChange={this.props.handleAssessmentCheckboxes(202)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="right_upper_leg" value="Contusion" checked={values.assessmentCheckBoxes[203]} onChange={this.props.handleAssessmentCheckboxes(203)} />
                            <Form.Check type="checkbox" label={`Pain`} name="right_upper_leg" value="Pain" checked={values.assessmentCheckBoxes[204]} onChange={this.props.handleAssessmentCheckboxes(204)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="right_upper_leg" value="Swelling" checked={values.assessmentCheckBoxes[205]} onChange={this.props.handleAssessmentCheckboxes(205)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="right_upper_leg" value="Deformity" checked={values.assessmentCheckBoxes[206]} onChange={this.props.handleAssessmentCheckboxes(206)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="right_upper_leg" value="Open Fracture" checked={values.assessmentCheckBoxes[207]} onChange={this.props.handleAssessmentCheckboxes(207)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="right_upper_leg" value="Numbness" checked={values.assessmentCheckBoxes[208]} onChange={this.props.handleAssessmentCheckboxes(208)} />
                            <Form.Check type="checkbox" label={`Burn`} name="right_upper_leg" value="Burn" checked={values.assessmentCheckBoxes[209]} onChange={this.props.handleAssessmentCheckboxes(209)} />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Left Lower Leg</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="left_lower_leg" value="Normal" checked={values.assessmentCheckBoxes[210]} onChange={this.props.handleAssessmentCheckboxes(210)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="left_lower_leg" value="Abrasion" checked={values.assessmentCheckBoxes[211]} onChange={this.props.handleAssessmentCheckboxes(211)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="left_lower_leg" value="Laceration" checked={values.assessmentCheckBoxes[212]} onChange={this.props.handleAssessmentCheckboxes(212)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="left_lower_leg" value="Puncture wound" checked={values.assessmentCheckBoxes[213]} onChange={this.props.handleAssessmentCheckboxes(213)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="left_lower_leg" value="Bleeding" checked={values.assessmentCheckBoxes[214]} onChange={this.props.handleAssessmentCheckboxes(214)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="left_lower_leg" value="Contusion" checked={values.assessmentCheckBoxes[215]} onChange={this.props.handleAssessmentCheckboxes(215)} />
                            <Form.Check type="checkbox" label={`Pain`} name="left_lower_leg" value="Pain" checked={values.assessmentCheckBoxes[216]} onChange={this.props.handleAssessmentCheckboxes(216)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="left_lower_leg" value="Swelling" checked={values.assessmentCheckBoxes[217]} onChange={this.props.handleAssessmentCheckboxes(217)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="left_lower_leg" value="Deformity" checked={values.assessmentCheckBoxes[218]} onChange={this.props.handleAssessmentCheckboxes(218)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="left_lower_leg" value="Open Fracture" checked={values.assessmentCheckBoxes[219]} onChange={this.props.handleAssessmentCheckboxes(219)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="left_lower_leg" value="Numbness" checked={values.assessmentCheckBoxes[220]} onChange={this.props.handleAssessmentCheckboxes(220)} />
                            <Form.Check type="checkbox" label={`Burn`} name="left_lower_leg" value="Burn" checked={values.assessmentCheckBoxes[222]} onChange={this.props.handleAssessmentCheckboxes(222)} />
                        </Col>

                        <Form.Label column sm={2}>Right Lower Leg</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="right_lower_leg" value="Normal" checked={values.assessmentCheckBoxes[223]} onChange={this.props.handleAssessmentCheckboxes(233)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="right_lower_leg" value="Abrasion" checked={values.assessmentCheckBoxes[224]} onChange={this.props.handleAssessmentCheckboxes(224)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="right_lower_leg" value="Laceration" checked={values.assessmentCheckBoxes[225]} onChange={this.props.handleAssessmentCheckboxes(225)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="right_lower_leg" value="Puncture wound" checked={values.assessmentCheckBoxes[226]} onChange={this.props.handleAssessmentCheckboxes(227)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="right_lower_leg" value="Bleeding" checked={values.assessmentCheckBoxes[228]} onChange={this.props.handleAssessmentCheckboxes(228)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="right_lower_leg" value="Contusion" checked={values.assessmentCheckBoxes[229]} onChange={this.props.handleAssessmentCheckboxes(229)} />
                            <Form.Check type="checkbox" label={`Pain`} name="right_lower_leg" value="Pain" checked={values.assessmentCheckBoxes[230]} onChange={this.props.handleAssessmentCheckboxes(230)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="right_lower_leg" value="Swelling" checked={values.assessmentCheckBoxes[231]} onChange={this.props.handleAssessmentCheckboxes(231)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="right_lower_leg" value="Deformity" checked={values.assessmentCheckBoxes[232]} onChange={this.props.handleAssessmentCheckboxes(232)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="right_lower_leg" value="Open Fracture" checked={values.assessmentCheckBoxes[233]} onChange={this.props.handleAssessmentCheckboxes(233)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="right_lower_leg" value="Numbness" checked={values.assessmentCheckBoxes[234]} onChange={this.props.handleAssessmentCheckboxes(234)} />
                            <Form.Check type="checkbox" label={`Burn`} name="right_lower_leg" value="Burn" checked={values.assessmentCheckBoxes[235]} onChange={this.props.handleAssessmentCheckboxes(235)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Left Ankle/Foot</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="left_ankle_foot" value="Normal" checked={values.assessmentCheckBoxes[236]} onChange={this.props.handleAssessmentCheckboxes(236)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="left_ankle_foot" value="Abrasion" checked={values.assessmentCheckBoxes[237]} onChange={this.props.handleAssessmentCheckboxes(237)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="left_ankle_foot" value="Laceration" checked={values.assessmentCheckBoxes[238]} onChange={this.props.handleAssessmentCheckboxes(238)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="left_ankle_foot" value="Puncture wound" checked={values.assessmentCheckBoxes[239]} onChange={this.props.handleAssessmentCheckboxes(239)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="left_ankle_foot" value="Bleeding" checked={values.assessmentCheckBoxes[240]} onChange={this.props.handleAssessmentCheckboxes(240)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="left_ankle_foot" value="Contusion" checked={values.assessmentCheckBoxes[241]} onChange={this.props.handleAssessmentCheckboxes(241)} />
                            <Form.Check type="checkbox" label={`Pain`} name="left_ankle_foot" value="Pain" checked={values.assessmentCheckBoxes[242]} onChange={this.props.handleAssessmentCheckboxes(242)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="left_ankle_foot" value="Swelling" checked={values.assessmentCheckBoxes[243]} onChange={this.props.handleAssessmentCheckboxes(243)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="left_ankle_foot" value="Deformity" checked={values.assessmentCheckBoxes[244]} onChange={this.props.handleAssessmentCheckboxes(244)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="left_ankle_foot" value="Open Fracture" checked={values.assessmentCheckBoxes[245]} onChange={this.props.handleAssessmentCheckboxes(245)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="left_ankle_foot" value="Numbness" checked={values.assessmentCheckBoxes[246]} onChange={this.props.handleAssessmentCheckboxes(246)} />
                            <Form.Check type="checkbox" label={`Burn`} name="left_ankle_foot" value="Burn" checked={values.assessmentCheckBoxes[247]} onChange={this.props.handleAssessmentCheckboxes(247)} />
                        </Col>

                        <Form.Label column sm={2}>Right Lower Leg</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="right_ankle_foot" value="Normal" checked={values.assessmentCheckBoxes[248]} onChange={this.props.handleAssessmentCheckboxes(248)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="right_ankle_foot" value="Abrasion" checked={values.assessmentCheckBoxes[249]} onChange={this.props.handleAssessmentCheckboxes(249)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="right_ankle_foot" value="Laceration" checked={values.assessmentCheckBoxes[250]} onChange={this.props.handleAssessmentCheckboxes(250)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="right_ankle_foot" value="Puncture wound" checked={values.assessmentCheckBoxes[251]} onChange={this.props.handleAssessmentCheckboxes(251)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="right_ankle_foot" value="Bleeding" checked={values.assessmentCheckBoxes[252]} onChange={this.props.handleAssessmentCheckboxes(252)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="right_ankle_foot" value="Contusion" checked={values.assessmentCheckBoxes[253]} onChange={this.props.handleAssessmentCheckboxes(253)} />
                            <Form.Check type="checkbox" label={`Pain`} name="right_ankle_foot" value="Pain" checked={values.assessmentCheckBoxes[254]} onChange={this.props.handleAssessmentCheckboxes(254)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="right_ankle_foot" value="Swelling" checked={values.assessmentCheckBoxes[255]} onChange={this.props.handleAssessmentCheckboxes(255)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="right_ankle_foot" value="Deformity" checked={values.assessmentCheckBoxes[256]} onChange={this.props.handleAssessmentCheckboxes(256)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="right_ankle_foot" value="Open Fracture" checked={values.assessmentCheckBoxes[257]} onChange={this.props.handleAssessmentCheckboxes(257)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="right_ankle_foot" value="Numbness" checked={values.assessmentCheckBoxes[258]} onChange={this.props.handleAssessmentCheckboxes(258)} />
                            <Form.Check type="checkbox" label={`Burn`} name="right_ankle_foot" value="Burn" checked={values.assessmentCheckBoxes[259]} onChange={this.props.handleAssessmentCheckboxes(259)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Pulse - Strength</Form.Label>
                        <Col sm={3} className="mt-2">
                            <Form.Control as="select" size="sm" onChange={this.props.handleChange('pulse_strength')} value={values.pulse_strength}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Normal">Normal</option>
                                <option value="Weak">Weak</option>
                                <option value="Absent">Absent</option>
                                <option value="Bounding">Bounding</option>
                            </Form.Control>
                        </Col>
                        <Col sm={1}></Col>

                        <Form.Label column sm={2}>Pulse - Rate</Form.Label>
                        <Col sm={3} className="mt-2">
                            <Form.Control as="select" size="sm" onChange={this.props.handleChange('pulse_rate')} value={values.pulse_rate}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Regular">Regular</option>
                                <option value="Irregular">Irregular</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2} className="font-weight-bold">Stroke</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" name="none" value="none" label={``} checked={values.assessmentCheckBoxes[260]} onChange={this.props.handleAssessmentCheckboxes(260)}/>
                        </Col>
                    </Form.Group>


                    {values.assessmentCheckBoxes[260] ?
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Time</Form.Label>
                            <Col sm={4} className="mt-2">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Time"
                                    onChange={this.props.handleChange('stroke_time')}
                                    value={values.stroke_time}
                                />
                            </Col>

                            <Form.Label column sm={2}>Facial Droop</Form.Label>
                            <Col sm={3} className="mt-2">
                                <Form.Control as="select" size="sm" onChange={this.props.handleChange('stroke_facial_droop')} value={values.stroke_facial_droop}>
                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Col>

                            <Form.Label column sm={2}>Arm Drift</Form.Label>
                            <Col sm={4} className="mt-2">
                                <Form.Control as="select" size="sm" onChange={this.props.handleChange('stroke_arm_drift')} value={values.stroke_arm_droop}>
                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Col>

                            <Form.Label column sm={2}>Abnormal Speech</Form.Label>
                            <Col sm={3} className="mt-2">
                                <Form.Control as="select" size="sm" onChange={this.props.handleChange('stroke_abnormal_speech')} value={values.stroke_abnormal_speech}>
                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                                :  null }

                    <Form.Group as={Row}>
                        <Form.Label column sm={2} className="font-weight-bold">Vital Signs</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" name="none" value="vitalSigns" label={``} checked={values.assessmentCheckBoxes[261]} onChange={this.props.handleAssessmentCheckboxes(261)} />
                        </Col>
                    </Form.Group>

                    {values.assessmentCheckBoxes[261] ?
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Time</Form.Label>
                            <Col sm={4} className="mt-2">
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={this.props.handleChange('vital_signs_time')}
                                    value={values.vital_signs_time}
                                />
                            </Col>
                            <Form.Label column sm={2}>Pulse</Form.Label>
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
                        
                        <Form.Label column sm={2}>Pain</Form.Label>
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
                            <Button className="left" onClick={this.addVitals}>Add Vitals</Button>
                        </Form.Group>
                        : null}
                            

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Additional Findings</Form.Label>
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
                    <div className="tab" onClick={this.navigate(3)}>
                        <img src="/profile.png" />
                        <b>Interventions</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(4)}>
                        <img src="/profile.png" />
                        <b>Physical Assessment</b>
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