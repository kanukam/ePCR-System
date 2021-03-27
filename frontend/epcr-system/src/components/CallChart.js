import React, { Component } from 'react'; 
import { MainContext } from '../Auth';
import { CanvasJSChart } from 'canvasjs-react-charts';
import Button from 'react-bootstrap/Button';

export default class CallChart extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            options: ""
        };
    }

    saveAsPdf = (event) => {
        event.preventDefault();
        window.print();
    }

    render() {
        var zeroToFour, fiveToEight, nineToTwelve, thirteenToSixteen, seventeenToTwenty, twentyOneToTwentyFour;
        zeroToFour = fiveToEight = nineToTwelve = thirteenToSixteen = seventeenToTwenty = twentyOneToTwentyFour = 0;
        if (this.props.dates) {
            this.props.dates.forEach(element => {
                const { dispatch_date_time } = element;
                var day = new Date(dispatch_date_time);
                day.setDate(day.getDate() + 1);
                
                if (day.getDay() == parseInt(this.props.day)) {
                    if (day.getUTCHours() >= 0 && day.getUTCHours() <= 4) {
                        zeroToFour += 1;
                    }
                    else if (day.getUTCHours() >= 5 && day.getUTCHours() <= 8) {
                        fiveToEight += 1;
                    }
                    else if (day.getUTCHours() >= 9 && day.getUTCHours() <= 12) {
                        nineToTwelve += 1;
                    }
                    else if (day.getUTCHours() >= 13 && day.getUTCHours() <= 16) {
                        thirteenToSixteen += 1;
                    }
                    else if (day.getUTCHours() >= 17 && day.getUTCHours() <= 20) {
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
                title: this.context.translate('time'),
            },
            axisY: {
                title: this.context.translate('number'),
                interval: 10,
                includeZero: true
            },
            data: [{
                type: "column",
                dataPoints: [
                    { label: "0000-0400", y: zeroToFour },
                    { label: "0500-0800", y: fiveToEight },
                    { label: "0900-1200", y: nineToTwelve },
                    { label: "1300-1600", y: thirteenToSixteen },
                    { label: "1700-2000", y: seventeenToTwenty },
                    { label: "2100-2400", y: twentyOneToTwentyFour }
                ]
            }]
        }

        return(
            <React.Fragment>
                {options && <CanvasJSChart options={options}/>}
                {options && <div className="text-center"><Button className="mt-3 text-center" onClick={this.saveAsPdf}>{this.context.translate('save')}</Button></div>}
            </React.Fragment>         
            )
        }
}