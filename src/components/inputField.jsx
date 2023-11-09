import React from 'react';

const InputField = (props) => {
    return (
        <div className="mb-3">
            <label htmlfor="userId" className="form-label">{props.name}</label>
            <input
                type={props.type}
                className="form-control"
                id={props.id}
                value={props.value}
                name={props.name}
                onChange={props.handleChange} />
        </div>
    );
}

export default InputField;