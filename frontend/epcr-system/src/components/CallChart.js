import React, { Component } from 'react'; 
import { MainContext } from '../Auth';
import { CanvasJSChart } from 'canvasjs-react-charts';
import moment from 'moment';


export default class CallChart extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            options: ""
        };
    }

    saveAsPdf = () => {
        window.print();
    }

    render() {
        var zeroToFour, fiveToEight, nineToTwelve, thirteenToSixteen, seventeenToTwenty, twentyOneToTwentyFour;
        zeroToFour = fiveToEight = nineToTwelve = thirteenToSixteen = seventeenToTwenty = twentyOneToTwentyFour = 0;
        if (this.props.dates) {
            this.props.dates.forEach(element => {
                const { dispatch_date_time } = element;
                var day = moment(dispatch_date_time).utc();
                if (day.day() === parseInt(this.props.day)) {
                    if (day.hour() >= 0 && day.hour() <= 4) {
                        zeroToFour += 1;
                    }
                    else if (day.hour() >= 5 && day.hour() <= 8) {
                        fiveToEight += 1;
                    }
                    else if (day.hour() >= 9 && day.hour() <= 12) {
                        nineToTwelve += 1;
                    }
                    else if (day.hour() >= 13 && day.hour() <= 16) {
                        thirteenToSixteen += 1;
                    }
                    else if (day.hour() >= 17 && day.hour() <= 20) {
                        seventeenToTwenty += 1;
                    }
                    else {
                        twentyOneToTwentyFour += 1;
                    }
                }
            });
        }

        const options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: this.context.translate('trend-call')
            },
            axisX: {
                title: this.context.translate('Time'),
            },
            axisY: {
                title: this.context.translate('number'),
                interval: 10,
                includeZero: true
            },
            data: [{
                type: "column",
                dataPoints: [
                    { label: "00:00-04:00", y: zeroToFour },
                    { label: "05:00-08:00", y: fiveToEight },
                    { label: "09:00-12:00", y: nineToTwelve },
                    { label: "13:00-16:00", y: thirteenToSixteen },
                    { label: "17:00-20:00", y: seventeenToTwenty },
                    { label: "21:00-24:00", y: twentyOneToTwentyFour }
                ]
            }]
        }

        return(
            <React.Fragment>
                {options && <CanvasJSChart options={options}/>}
                {options && <div className="text-center"><input type="button" style={{marginTop: '20px'}} onClick={this.saveAsPdf} value={this.context.translate('print')} /></div>}
            </React.Fragment>         
            )
        }
}