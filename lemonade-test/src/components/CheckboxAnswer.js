import React, { Component } from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';


class ButtonAnswer extends Component {
    state = {
        checkboxesAnswers: []
    }
    componentDidMount(){
        let checkboxesAnswers = this.props.checkboxes.map((answer)=>{
            return {
                name: answer.name,
                label: answer.label,
                checked: true
            }
        });
        this.setState({
            checkboxesAnswers
        })
    }

    onCheckboxChange = (e, name) => {
        let isChecked = e.target.checked;
        let updatedCheckboxAnswers = this.state.checkboxesAnswers.map((checkbox, index)=>{
            if(checkbox.name === name){
                checkbox.checked = isChecked;
            }
            return checkbox
        })
        this.setState({
            checkboxesAnswers: updatedCheckboxAnswers
        })
    }

    onCheckboxSendClick = () => {
        this.props.onCheckboxesSend(this.state.checkboxesAnswers);
    }

    render() {
        return (
            
            <div className="checkboxes-container">
                <div className="checkboxes-wrapper">
                {
                    this.props.checkboxes.map((checkbox, index)=>{
                        return (
                        <label key={checkbox.name}>
                            <Checkbox
                                name="my-checkbox"
                                defaultChecked
                                className="checkbox"
                                onChange={(e)=>{this.onCheckboxChange(e, checkbox.name)}}
                                disabled={checkbox.disabled}
                            />
                                {checkbox.label}
                        </label>
                        )
                    })
                }
                </div>
                <button
                    className="checkbox-send"
                    onClick={this.onCheckboxSendClick}
                >
                Send
                </button>
            </div>
        );
    }
}

export default ButtonAnswer;
