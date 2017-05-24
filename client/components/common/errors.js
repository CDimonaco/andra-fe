/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from 'react';

export default class Errors extends React.Component{
    constructor(props){
        super(props);
        this.state = {errors:null}
    }
    componentDidMount(){
        if(this.props.errors){
            this.setState({errors: this.props.errors});
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    render(){
        //Se non ci sono errori.
        if(!this.state.errors || typeof this.state.errors !== typeof [] || this.state.errors.length <= 0){
            return(
                <div/>
            );
        }

        return(
            <div>
                {this.state.errors.map(function(value,key){
                        return <p className="alert alert-danger" key={key}>{value}</p>;
                    })
                }
            </div>
        );
    }
}