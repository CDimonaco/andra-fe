/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from 'react';

const Errors = (props) =>{
    if(!props.errors || props.errors.length === 0){
        return <tr></tr>
    }

    return(
        <div>
            {props.errors.map(function(value,key){
                return <p className="alert alert-danger" key={key}>{value}</p>;
            })}
        </div>
    )
};
export default Errors;
