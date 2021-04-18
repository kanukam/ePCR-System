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
                                    <i>{this.context.translate('idate')}</i><span>{values.idate}</span><br/>
                                    <i>{this.context.translate('ino')}</i><span>{values.ino}</span><br/>
                                    <i>{this.context.translate('unit')}</i><span>{values.unit}</span><br/>
                                    <i>{this.context.translate('call-type')}</i><span>{values.ctype}</span><br/>
                                    <i>{this.context.translate('call-nature')}</i><span>{values.nature}</span><br/>
                                    <i>{this.context.translate('care-level')}</i><span>{values.care}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('iaddress')}</i><span>{values.loc}</span><br/>
                                    <i>{this.context.translate('location')}</i><span>{values.loctype}</span><br/>
                                    <i>{this.context.translate('disposition')}</i><span>{values.disp}</span><br/>
                                    <i>{this.context.translate('destination')}</i><span>{values.dest}</span><br/>
                                    <i>{this.context.translate('other-agencies')}</i><span>{values.agency.join()}</span><br/>
                                    <i>{this.context.translate('trauma-cause')}</i><span>{values.trauma}{values.fallht !== "" ? ", height: " + values.fallht + " m" : null}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('mci')}</i>{values.assessmentCheckBoxes[268] ? <text><span>Sí</span><br/>
                                    <i>{this.context.translate('num-patients')}</i><span>{values.ptct}</span><br/>
                                    <i>{this.context.translate('triage')}</i><span>{values.triage}</span></text> : <span>No</span>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('vehicle-accident')}</i>{values.assessmentCheckBoxes[269] ? <text><span>Sí</span><br/>
                                        <i>{this.context.translate('type')}</i><span>{values.vatype}</span><br/>
                                        <i>{this.context.translate('impact')}</i><span>{values.vaimpact}</span><br/>
                                        <i>{this.context.translate('safety-equip')}</i><span>{values.vasafe}</span><br/>
                                        <i>{this.context.translate('est-spd')}</i><span>{values.vaspd}</span><br/>
                                        <i>{this.context.translate('eject-vehicle')}</i><span>{values.vaeject}</span>
                                    </text> : <span>No</span>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('dispatch')}</i><span>{values.dispatch ? <Moment date={values.dispatch} format="DD-MM-YYYY hh:mm:ss A" /> : null}</span><br/>
                                    <i>{this.context.translate('enroute')}</i><span>{values.enroute ? <Moment date={values.enroute} format="DD-MM-YYYY hh:mm:ss A" /> : null}</span><br/>
                                    <i>{this.context.translate('arrscn')}</i><span>{values.arrscn ? <Moment date={values.arrscn} format="DD-MM-YYYY hh:mm:ss A" /> : null}</span><br/>
                                    <i>{this.context.translate('pcontact')}</i><span>{values.contact ? <Moment date={values.contact} format="DD-MM-YYYY hh:mm:ss A" /> : null}</span><br/>
                                    <i>{this.context.translate('dptscn')}</i><span>{values.dptscn ? <Moment date={values.dptscn} format="DD-MM-YYYY hh:mm:ss A" /> : null}</span><br/>
                                    <i>{this.context.translate('arrdes')}</i><span>{values.arrdes ? <Moment date={values.arrdes} format="DD-MM-YYYY hh:mm:ss A" /> : null}</span><br/>
                                    <i>{this.context.translate('trcare')}</i><span>{values.trcare ? <Moment date={values.trcare} format="DD-MM-YYYY hh:mm:ss A" /> : null}</span>
                                </td>
                            </tr>
                            <tr><th>{this.context.translate('demographics')}</th></tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('full-name')}</i><span>{values.lname}, {values.fname}</span><br/>
                                    <i>{this.context.translate('pbirth')}</i><span>{values.birth ? <Moment date={values.birth} format="DD-MM-YYYY" /> : null}</span><br/>
                                    <i>{this.context.translate('classify')}</i><span>{values.classify}</span><br/>
                                    <i>{this.context.translate('psex')}</i><span>{values.gender}</span><br/>
                                    <i>{this.context.translate('pweight')}</i><span>{values.weight? values.weight + " kg" : null} </span><br/>
                                    <i>{this.context.translate('braslow')}</i><span>{values.braslow}</span><br/>
                                    <i>{this.context.translate('address')}</i><span>{values.subdivision}, {values.street}, {values.blvd}, {values.km}, {values.city}, {values.state}</span><br/>
                                    <i>{this.context.translate('phone')}</i><span>{values.phone}</span>
                                </td>
                            </tr>
                            <tr><th>{this.context.translate('history')}</th></tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('hpi')}</i><span>{values.hpi}</span><br/>
                                    <i>{this.context.translate('given-by')}</i><span>{values.historyGiven.join()}</span><br/>
                                    <i>{this.context.translate('med-allergy')}</i><span>{values.medAllergy}</span><br/>
                                    <i>{this.context.translate('env-allergy')}</i><span>{values.envAllergy}</span><br/>
                                    <i>{this.context.translate('past-history')}</i><span>{values.pastHistory}{values.assessmentCheckBoxes[315] ? ",O - Other" + values.pastHistoryOther : null}</span>
                                </td>
                            </tr>
                            <tr><th>{this.context.translate('assessments')}</th></tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('Skin')}</i><span>{values.skin.join()}</span><br/>
                                    <i>{this.context.translate('Mental')}</i><span>{values.mental.join()}</span><br/>
                                    <i>{this.context.translate('Neurological')}</i><span>{values.neurological.join()}</span><br/>
                                    <i>{this.context.translate('Head')}</i><span>{values.head.join()}</span><br/>
                                    <i>{this.context.translate('Neck')}</i><span>{values.neck.join()}</span><br/>
                                    <i>{this.context.translate('Chest')}</i><span>{values.chest.join()}</span><br/>
                                    <i>{this.context.translate('Pulse')}</i><span>{(values.pulse_strength || values.pulse_rate) && this.context.translate('Pulse-Strength') + ":"} {(values.pulse_strength || values.pulse_rate) && values.pulse_strength + "  |  "}  {(values.pulse_strength || values.pulse_rate) && this.context.translate('Pulse-Rate') + ":"} {values.pulse_rate}</span><br/>
                                    <i>{this.context.translate('Abdomen')}</i><span>{values.abdomen.join()}</span><br/>
                                    <i>{this.context.translate('Pelvis')}</i><span>{values.pelvis.join()}</span><br/>
                                    <i>{this.context.translate('Back')}</i><span>{values.back.join()}</span><br/>
                                    <i>{this.context.translate('Left-upper-arm')}</i><span>{values.left_upper_arm.join()}</span><br/>
                                    <i>{this.context.translate('Left-lower-arm')}</i><span>{values.left_lower_arm.join()}</span><br/>
                                    <i>{this.context.translate('Left-hand-/-wrist')}</i><span>{values.left_hand_wrist.join()}</span><br/>
                                    <i>{this.context.translate('Left-upper-leg')}</i><span>{values.left_upper_leg.join()}</span><br/>
                                    <i>{this.context.translate('Left-lower-leg')}</i><span>{values.left_lower_leg.join()}</span><br/>
                                    <i>{this.context.translate('Left-ankle-/-foot')}</i><span>{values.left_ankle_foot.join()}</span><br/>
                                    <i>{this.context.translate('Right-upper-arm')}</i><span>{values.right_upper_arm.join()}</span><br/>
                                    <i>{this.context.translate('Right-lower-arm')}</i><span>{values.right_lower_arm.join()}</span><br/>
                                    <i>{this.context.translate('Right-hand-/-wrist')}</i><span>{values.right_hand_wrist.join()}</span><br/>
                                    <i>{this.context.translate('Right-upper-leg')}</i><span>{values.right_upper_leg.join()}</span><br/>
                                    <i>{this.context.translate('Right-lower-leg')}</i><span>{values.right_lower_leg.join()}</span><br/>
                                    <i>{this.context.translate('Right-ankle-/-foot')}</i><span>{values.right_ankle_foot.join()}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('vitals')}</i><span>{values.medications && values.vital_signs.map((element, idx) => {
                                        return (
                                            <div>
                                                {element}
                                                <br />
                                            </div>
                                        )
                                    })}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('Additional-findings')}</i><span>{values.extra_findings}</span>
                                </td>
                            </tr>
                            <tr><th>{this.context.translate('interventions')}</th></tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('procedures')}</i><span>{values.medications && values.procedures.map((element, idx) => {
                                        return (
                                            <div>
                                                {element}
                                                <br />
                                            </div>
                                        )
                                    })}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('medications')}</i><span>{values.medications && values.medications.map((element, idx) => {
                                            return (
                                                <div>
                                                   {element}
                                                    <br/>
                                                </div>
                                            )
                                        })}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('intake-output')}</i>{values.assessmentCheckBoxes[316] ? <text><span>Sí</span><br/>
                                        <i>{this.context.translate('bleeding')}</i><span>{this.context.translate('bpre-transport')}: {values.ioBleedPT} | {this.context.translate('btransport')}: {values.ioBleedT} | Total : {parseInt(values.ioBleedPT) + parseInt(values.ioBleedT)}</span><br/>
                                        <i>{this.context.translate('iv-fluid')}</i><span>{this.context.translate('bpre-transport')}: {values.ioIVPT} | {this.context.translate('btransport')}: {values.ioIVT} | Total : {parseInt(values.ioIVPT) + parseInt(values.ioIVT)}</span><br/>
                                        <i>{this.context.translate('oral-fluid')}</i><span>{this.context.translate('bpre-transport')}: {values.ioOralPT} | {this.context.translate('btransport')}: {values.ioOralT} | Total: {parseInt(values.ioOralPT) + parseInt(values.ioOralT)}</span><br/>
                                        <i>{this.context.translate('vomit')}</i><span>{this.context.translate('bpre-transport')}: {values.ioVomitPT} | {this.context.translate('btransport')}: {values.ioVomitT} | Total: {parseInt(values.ioVomitPT) + parseInt(values.ioVomitT)}</span>
                                    </text> : <span>No</span>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>{this.context.translate('obstetrics')}</i>{values.assessmentCheckBoxes[317] ? <text><span>Sí</span><br/>
                                        <i>{this.context.translate('gravid')}</i><span>{values.oGravid}</span><br/>
                                        <i>{this.context.translate('para')}</i><span>{values.oPara}</span><br/>
                                        <i>{this.context.translate('abortion')}</i><span>{values.oAbortion}</span><br/>
                                        <i>{this.context.translate('due-date')}</i><span>{values.oDuedate}</span><br/>
                                        <i>{this.context.translate('gestation')}</i><span>{values.oGestation} {this.context.translate('week')}s</span><br/>
                                        <i>{this.context.translate('vaginal-bleed')}</i><span>{values.oVaginalBleed}</span><br/>
                                        <i>{this.context.translate('contraction')}</i><span>{values.oContraction}</span><br/>
                                        <i>{this.context.translate('frequency')}</i><span>{values.oFrequency} {this.context.translate('minute')}s</span><br/>
                                        <i>{this.context.translate('duration')}</i><span>{values.oDuration} {this.context.translate('minute')}s</span><br/>
                                        <i>{this.context.translate('water-rupture')}</i><span>{values.oWaterRupture}</span><br/>
                                        {values.oWaterRupture === 'Sí' ? <text><i>{this.context.translate('water-color')}</i><span>{values.oWaterColor}</span></text> : null}
                                        <i>{this.context.translate('baby-moving')}</i><span>{values.oBabyMoving}</span><br/>
                                        <i>{this.context.translate('delivery-time')}</i><span>{values.oDelivery}</span><br/>
                                        <i>{this.context.translate('placenta')}</i><span>{values.oPlacenta}</span><br/>
                                        <i>{this.context.translate('baby-sex')}</i><span>{values.oBabySex}</span><br/>
                                        <i>{this.context.translate('born')}</i><span>{values.oBorn}</span><br/>
                                        <i>{this.context.translate('apgar')}</i><span>1 {this.context.translate('minute')}: {values.oAPGAR1} | 5 {this.context.translate('minute')}s: {values.oAPGAR5} | 10 {this.context.translate('minute')}s: {values.oAPGAR10}</span>
                                    </text> : <span>No</span>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <small style={{color:'red'}} className="ml-2">{this.context.translate(values.message)}</small>
                    <Button className="left" onClick={this.back}>{this.context.translate('previous')}</Button>
                    <Button className="right" onClick={this.props.handleSubmit}>{this.context.translate('submit')}</Button>
                </form>
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
                    <div className="tab" onClick={this.navigate(3)}>
                        <img src="/assessmentIcon.png" alt="Physical Exam" />
                        <b>{this.context.translate('physical-exam')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/interventionsIcon.png" alt="Interventions" />
                        <b>{this.context.translate('interventions')}</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(5)}>
                        <img src="/confirmIcon.png" alt="Confirm" />
                        <b>{this.context.translate('confirm')}</b>
                    </div>
                </div>
            </div>
        )
    }
}