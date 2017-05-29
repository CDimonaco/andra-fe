/**
 * Created by cdimonaco on 28/05/2017.
 */
import React from "react"
import {Line} from 'react-chartjs-2';

const graphConfiguration = {
    labels: ['0', '-1', '-2', '-3', '-4', '-5','6'],
    datasets: [
        {
            label: 'Rilevazioni nelle precedenti sei ore',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }
    ]
};
export default class ValuesChart extends React.Component{
    constructor(props){
        super(props);
        this.buildDataset = this.buildDataset.bind(this);
        this.state = {data:{},input:this.props.raw,show:false};
    }

    buildDataset(){
        //Costruiamo il dataset per chart.js, useremo un grafico "line",
        //sul grafico mostreremo l'andamento dei valori nelle scorse sei ore,
        //Dei valori di input filtreremo quelli delle passate sei ore e li inseriremo in degli array divisi per ora.
        //Dopodichè calcoleremo la media per ognuno e genereremo il punto sul grafico.
        let graphvalues = [];
        let timeslices = {0:[],1:[],2:[],3:[],4:[],5:[],6:[]};
        let now = new Date();
        let ago = new Date(now - 6*60*60*1000);
        console.log(ago);
        console.log(this.state.input);
        this.state.input.forEach(function (item) {
            let valueTime = new Date(item.timestamp);
            let valueTimeUtc = new Date(valueTime.getUTCFullYear(), valueTime.getUTCMonth(), valueTime.getUTCDate(),  valueTime.getUTCHours(), valueTime.getUTCMinutes(), valueTime.getUTCSeconds());
            console.log(valueTimeUtc);
            if(valueTimeUtc < now && valueTimeUtc > ago){
                let offset = now.getHours() - valueTimeUtc.getHours();
                console.log(offset);
                timeslices[offset].push(item);
            }
        });
        //Calcolo il valore medio delle rilevazioni orarie
        for(let key in timeslices){
            if(timeslices[key].length === 0){
                break; //Esco dal ciclo poichè significa che ho una "fascia oraria" mancante, ergo non ho abbastanza valori
                       //per costruire il grafico.
            }
            let sum = 0;
            timeslices[key].forEach(function (value) {
                sum += value.value;
            });
            let avg = sum/timeslices[key].length;
            graphvalues.push(avg);
        }
        console.log(graphvalues.length);
        if(graphvalues.length === 6){
            console.log("here");
            let graphConf = graphConfiguration;
            graphConf["datasets"][0]["data"] = graphvalues;
            this.setState({show:true,data:graphConf});
        }

    }

    componentDidMount(){
        this.buildDataset();
    }

    render(){
        return(
            <div style={{marginBottom:15}}>
                {this.state.show ?
                    <Line data={this.state.data}/>
                :<h4 className="text-center">Non ci sono abbastanza valori per comporre il grafico</h4>}
            </div>
        );
    }
}

    
