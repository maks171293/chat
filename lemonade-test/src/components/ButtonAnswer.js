import React, { Component } from 'react';


class ButtonAnswer extends Component {
    render() {
        let {label: firstLabel, message: firstMessage} = this.props.buttonData[0];
        let secondLabel, secondMessage;
        if(this.props.buttonData.length > 1){
            secondLabel = this.props.buttonData[1].label;
            secondMessage = this.props.buttonData[1].message;
        }
        console.log(firstLabel, secondLabel )
        return (
            <div className="button-wrapper">
                <button className="button" onClick={()=>{this.props.onButtonAnswer(firstMessage)}}>
                    {firstLabel || "Answer 1"}
                </button>
                {
                    this.props.type === 2 ? 
                <button className="button" onClick={()=>{this.props.onButtonAnswer(secondMessage)}}>
                    {secondLabel || "Answer 2"}
                </button > : null
                }
            </div>
        );
    }
}

export default ButtonAnswer;
