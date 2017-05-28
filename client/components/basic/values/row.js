/**
 * Created by cdimonaco on 28/05/2017.
 */
import React from "react"


export default class ValuesRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {values:{},listindex:""}
    }

    componentWillMount(){
        console.log("will mount");
        if(this.props.value){
            this.setState({values:this.props.value})
        }

        if(this.props.listindex){
            this.setState({listindex:this.props.listindex})
        }
    }

    render(){
        if(!this.state.values){
            return(<tr></tr>);
        }

        return(

            <tr>
                <td>{this.state.listindex}</td>
                <td>{this.state.values.id}</td>
                <td>{this.state.values.value}</td>
                <td>{this.state.values.additional}</td>
                <td>{this.state.values.timestamp}</td>
            </tr>
        );
    }
}