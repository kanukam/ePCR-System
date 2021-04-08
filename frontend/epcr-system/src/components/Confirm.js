import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Moment from 'react-moment';
import { MainContext } from '../Auth';
import '../App.css'

export default class Confirm extends Component {
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

    render() {
        const { values } = this.props;
        console.log(values.dispatch);
        return (
            <div className="form-confirm">
                <form>
                    <h2>Confirm Chart Report</h2>
                    <table className="simpleview">
                        <tbody>
                            <tr><th>{this.context.translate('response')}</th></tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('idate')}</i> {values.idate}<br/>
                                    <i>{this.context.translate('ino')}</i> {values.ino}<br/>
                                    <i>{this.context.translate('unit')}</i> {values.unit}<br/>
                                    <i>{this.context.translate('call-type')}</i> {values.ctype}<br/>
                                    <i>{this.context.translate('call-nature')}</i> {values.nature}<br/>
                                    <i>{this.context.translate('care-level')}</i> {values.care}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('iaddress')}</i> {values.loc}<br/>
                                    <i>{this.context.translate('location')}</i> {values.loctype}<br/>
                                    <i>{this.context.translate('disposition')}</i> {values.disp}<br/>
                                    <i>{this.context.translate('destination')}</i> {values.dest}<br/>
                                    <i>{this.context.translate('other-agencies')}</i> {values.agency.join()}<br/>
                                    <i>{this.context.translate('trauma-cause')}</i> {values.trauma}{values.fallht !== "" ? ", height: " + values.fallht + " m" : null}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('mci')}</i> {values.assessmentCheckBoxes[268] ? <text>Yes<br/>
                                    <i>{this.context.translate('num-patients')}</i> {values.ptct}<br/>
                                    <i>{this.context.translate('triage')}</i> {values.triage}</text> : "No"}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('vehicle-accident')}</i> {values.assessmentCheckBoxes[269] ? <text>Yes<br/>
                                        <i>{this.context.translate('type')}</i> {values.vatype}<br/>
                                        <i>{this.context.translate('impact')}</i> {values.impact}<br/>
                                        <i>{this.context.translate('safety-equip')}</i> {values.vasafe}<br/>
                                        <i>{this.context.translate('est-spd')}</i> {values.vaspd}<br/>
                                        <i>{this.context.translate('eject-vehicle')}</i> {values.vaeject}
                                    </text> : "No"}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('dispatch')}</i> {values.dispatch ? <Moment date={values.dispatch} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                    <i>{this.context.translate('enroute')}</i> {values.enroute ? <Moment date={values.enroute} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                    <i>{this.context.translate('arrscn')}</i> {values.arrscn ? <Moment date={values.arrscn} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                    <i>{this.context.translate('pcontact')}</i> {values.contact ? <Moment date={values.contact} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                    <i>{this.context.translate('dptscn')}</i> {values.dptscn ? <Moment date={values.dptscn} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                    <i>{this.context.translate('arrdes')}</i> {values.arrdes ? <Moment date={values.arrdes} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                    <i>{this.context.translate('trcare')}</i> {values.trcare ? <Moment date={values.trcare} format="DD-MM-YY hh:mm:ss A" /> : null}
                                </td>
                            </tr>
                            <tr><th>{this.context.translate('demographics')}</th></tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('full-name')}</i> {values.lname}, {values.fname}<br/>
                                    <i>{this.context.translate('pbirth')}</i> {values.birth ? <Moment date={values.birth} format="DD-MM-YY" /> : null}<br/>
                                    <i>{this.context.translate('classify')}</i> {values.classify}<br/>
                                    <i>{this.context.translate('psex')}</i> {values.gender}<br/>
                                    <i>{this.context.translate('pweight')}</i> {values.weight} kg<br/>
                                    <i>{this.context.translate('braslow')}</i> {values.bcolor}<br/>
                                    <i>{this.context.translate('address')}</i> {values.street}, {values.city}, {values.state}, {values.country} {values.zip}<br/>
                                    <i>{this.context.translate('phone')}</i> {values.phone}
                                </td>
                            </tr>
                            <tr><th>{this.context.translate('history')}</th></tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('hpi')}</i> {values.hpi}<br/>
                                    <i>{this.context.translate('given-by')}</i> {values.historyGiven.join()}<br/>
                                    <i>{this.context.translate('med-allergy')}</i> {values.medAllergy}<br/>
                                    <i>{this.context.translate('env-allergy')}</i> {values.envAllergy}<br/>
                                    <i>{this.context.translate('past-history')}</i> {values.pastHistory}{values.assessmentCheckBoxes[315] ? ",O - Other" + values.pastHistoryOther : null}
                                </td>
                            </tr>
                            <tr><th>{this.context.translate('assessments')}</th></tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('Skin')}</i> {values.skin.join()}<br/>
                                    <i>{this.context.translate('Mental')}</i> {values.mental.join()}<br/>
                                    <i>{this.context.translate('Neurological')}</i> {values.neurological.join()}<br/>
                                    <i>{this.context.translate('Head')}</i> {values.head.join()}<br/>
                                    <i>{this.context.translate('Neck')}</i> {values.neck.join()}<br/>
                                    <i>{this.context.translate('Chest')}</i> {values.chest}<br/>
                                    <i>{this.context.translate('Pulse')}</i> {this.context.translate('Pulse-Strength')}: {values.pulse_strength} | {this.context.translate('Pulse-Rate')}: {values.pulse_rate}<br/>
                                    <i>{this.context.translate('Abdomen')}</i> {values.abdomen.join()}<br/>
                                    <i>{this.context.translate('Pelvis')}</i> {values.pelvis.join()}<br/>
                                    <i>{this.context.translate('Back')}</i> {values.back.join()}<br/>
                                    <i>{this.context.translate('Left-upper-arm')}</i> {values.left_upper_arm.join()}<br/>
                                    <i>{this.context.translate('Left-lower-arm')}</i> {values.left_lower_arm.join()}<br/>
                                    <i>{this.context.translate('Left-hand-/-wrist')}</i> {values.left_hand_wrist.join()}<br/>
                                    <i>{this.context.translate('Left-upper-leg')}</i> {values.left_upper_leg.join()}<br/>
                                    <i>{this.context.translate('Left-lower-leg')}</i> {values.left_lower_leg.join()}<br/>
                                    <i>{this.context.translate('Left-ankle-/-foot')}</i> {values.left_ankle_foot.join()}<br/>
                                    <i>{this.context.translate('Right-upper-arm')}</i> {values.right_upper_arm.join()}<br/>
                                    <i>{this.context.translate('Right-lower-arm')}</i> {values.right_lower_arm.join()}<br/>
                                    <i>{this.context.translate('Right-hand-/-wrist')}</i> {values.right_hand_wrist.join()}<br/>
                                    <i>{this.context.translate('Right-upper-leg')}</i> {values.right_upper_leg.join()}<br/>
                                    <i>{this.context.translate('Right-lower-leg')}</i> {values.right_lower_leg.join()}<br/>
                                    <i>{this.context.translate('Right-ankle-/-foot')}</i> {values.right_ankle_foot.join()}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('vitals')}</i> {values.vital_signs.join()}
                                </td>
                            </tr>
                            <tr><th>{this.context.translate('interventions')}</th></tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('procedures')}</i> {values.procedures.join()}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('medications')}</i> {values.medications.join()}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('intake-output')}</i>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('obstetrics')}</i>
                                </td>
                            </tr>
                        </tbody>
                        <tr><th>{this.context.translate('response')}</th></tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('idate')}</i> {values.idate}<br/>
                                <i>{this.context.translate('ino')}</i> {values.ino}<br/>
                                <i>{this.context.translate('unit')}</i> {values.unit}<br/>
                                <i>{this.context.translate('call-type')}</i> {values.ctype}<br/>
                                <i>{this.context.translate('call-nature')}</i> {values.nature}<br/>
                                <i>{this.context.translate('care-level')}</i> {values.care}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('iaddress')}</i> {values.loc}<br/>
                                <i>{this.context.translate('location')}</i> {values.loctype}<br/>
                                <i>{this.context.translate('disposition')}</i> {values.disp}<br/>
                                <i>{this.context.translate('destination')}</i> {values.dest}<br/>
                                <i>{this.context.translate('other-agencies')}</i> {values.agency.join()}<br/>
                                <i>{this.context.translate('trauma-cause')}</i> {values.trauma}{values.fallht !== "" ? ", height: " + values.fallht + " m" : null}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('mci')}</i> {values.assessmentCheckBoxes[268] ? <text>Yes<br/>
                                <i>{this.context.translate('num-patients')}</i> {values.ptct}<br/>
                                <i>{this.context.translate('triage')}</i> {values.triage}</text> : "No"}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('vehicle-accident')}</i> {values.assessmentCheckBoxes[269] ? <text>Yes<br/>
                                    <i>{this.context.translate('type')}</i> {values.vatype}<br/>
                                    <i>{this.context.translate('impact')}</i> {values.impact}<br/>
                                    <i>{this.context.translate('safety-equip')}</i> {values.vasafe}<br/>
                                    <i>{this.context.translate('est-spd')}</i> {values.vaspd}<br/>
                                    <i>{this.context.translate('eject-vehicle')}</i> {values.vaeject}
                                </text> : "No"}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('dispatch')}</i> {values.dispatch ? <Moment date={values.dispatch} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <i>{this.context.translate('enroute')}</i> {values.enroute ? <Moment date={values.enroute} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <i>{this.context.translate('arrscn')}</i> {values.arrscn ? <Moment date={values.arrscn} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <i>{this.context.translate('pcontact')}</i> {values.contact ? <Moment date={values.contact} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <i>{this.context.translate('dptscn')}</i> {values.dptscn ? <Moment date={values.dptscn} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <i>{this.context.translate('arrdes')}</i> {values.arrdes ? <Moment date={values.arrdes} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <i>{this.context.translate('trcare')}</i> {values.trcare ? <Moment date={values.trcare} format="DD-MM-YY hh:mm:ss A" /> : null}
                            </td>
                        </tr>
                        <tr><th>{this.context.translate('demographics')}</th></tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('full-name')}</i> {values.lname}, {values.fname}<br/>
                                <i>{this.context.translate('pbirth')}</i> {values.birth ? <Moment date={values.birth} format="DD-MM-YY" /> : null}<br/>
                                <i>{this.context.translate('classify')}</i> {values.classify}<br/>
                                <i>{this.context.translate('psex')}</i> {values.gender}<br/>
                                <i>{this.context.translate('pweight')}</i> {values.weight} kg<br/>
                                <i>{this.context.translate('braslow')}</i> {values.bcolor}<br/>
                                <i>{this.context.translate('address')}</i> {values.street}, {values.city}, {values.state}, {values.country} {values.zip}<br/>
                                <i>{this.context.translate('phone')}</i> {values.phone}
                            </td>
                        </tr>
                        <tr><th>{this.context.translate('history')}</th></tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('hpi')}</i> {values.hpi}<br/>
                                <i>{this.context.translate('given-by')}</i> {values.historyGiven.join()}<br/>
                                <i>{this.context.translate('med-allergy')}</i> {values.medAllergy}<br/>
                                <i>{this.context.translate('env-allergy')}</i> {values.envAllergy}<br/>
                                <i>{this.context.translate('past-history')}</i> {values.pastHistory}{values.assessmentCheckBoxes[315] ? ",O - Other" + values.pastHistoryOther : null}
                            </td>
                        </tr>
                        <tr><th>{this.context.translate('assessments')}</th></tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('Skin')}</i> {values.skin.join()}<br/>
                                <i>{this.context.translate('Mental')}</i> {values.mental.join()}<br/>
                                <i>{this.context.translate('Neurological')}</i> {values.neurological.join()}<br/>
                                <i>{this.context.translate('Head')}</i> {values.head.join()}<br/>
                                <i>{this.context.translate('Neck')}</i> {values.neck.join()}<br/>
                                <i>{this.context.translate('Chest')}</i> {values.chest}<br/>
                                <i>{this.context.translate('Pulse')}</i> {this.context.translate('Pulse-Strength')}: {values.pulse_strength} | {this.context.translate('Pulse-Rate')}: {values.pulse_rate}<br/>
                                <i>{this.context.translate('Abdomen')}</i> {values.abdomen.join()}<br/>
                                <i>{this.context.translate('Pelvis')}</i> {values.pelvis.join()}<br/>
                                <i>{this.context.translate('Back')}</i> {values.back.join()}<br/>
                                <i>{this.context.translate('Left-upper-arm')}</i> {values.left_upper_arm.join()}<br/>
                                <i>{this.context.translate('Left-lower-arm')}</i> {values.left_lower_arm.join()}<br/>
                                <i>{this.context.translate('Left-hand-/-wrist')}</i> {values.left_hand_wrist.join()}<br/>
                                <i>{this.context.translate('Left-upper-leg')}</i> {values.left_upper_leg.join()}<br/>
                                <i>{this.context.translate('Left-lower-leg')}</i> {values.left_lower_leg.join()}<br/>
                                <i>{this.context.translate('Left-ankle-/-foot')}</i> {values.left_ankle_foot.join()}<br/>
                                <i>{this.context.translate('Right-upper-arm')}</i> {values.right_upper_arm.join()}<br/>
                                <i>{this.context.translate('Right-lower-arm')}</i> {values.right_lower_arm.join()}<br/>
                                <i>{this.context.translate('Right-hand-/-wrist')}</i> {values.right_hand_wrist.join()}<br/>
                                <i>{this.context.translate('Right-upper-leg')}</i> {values.right_upper_leg.join()}<br/>
                                <i>{this.context.translate('Right-lower-leg')}</i> {values.right_lower_leg.join()}<br/>
                                <i>{this.context.translate('Right-ankle-/-foot')}</i> {values.right_ankle_foot.join()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('vitals')}</i> {values.vital_signs.join()}
                            </td>
                        </tr>
                        <tr><th>{this.context.translate('interventions')}</th></tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('procedures')}</i> {values.procedures.join()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('medications')}</i> {values.medications.join()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('intake-output')}</i>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i>{this.context.translate('obstetrics')}</i>
                            </td>
                        </tr>
                    </table>
                    <small style={{color:'red'}} className="ml-2">{this.context.translate(values.message)}</small>
                    <Button className="left" onClick={this.back}>{this.context.translate('previous')}</Button>
                    <Button className="right" onClick={this.props.handleSubmit}>{this.context.translate('submit')}</Button>
                </form>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                <div className="tab" onClick={this.navigate(1)}>
                        <img src="/callIcon.png" />
                        <b>{this.context.translate('call')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(2)}>
                        <img src="/patientIcon.png" />
                        <b>{this.context.translate('patient')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(3)}>
                        <img src="/assessmentIcon.png" />
                        <b>{this.context.translate('physical-exam')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/interventionsIcon.png" />
                        <b>{this.context.translate('interventions')}</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(5)}>
                        <img src="/confirmIcon.png" />
                        <b>{this.context.translate('confirm')}</b>
                    </div>
                </div>
            </div>
        )
    }
}