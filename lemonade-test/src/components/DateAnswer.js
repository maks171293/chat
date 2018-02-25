import React, { Component } from 'react';
import DatePicker from 'react-mobile-datepicker';
import moment from 'moment';

class DateAnswer extends Component {
    state = {
        time: new Date()
    }
    componentDidMount(){
       
    }

    handleSelect = (time) => {
        this.setState({ time}, ()=>{
            let formatedDate = moment(this.state.time).format("MMM Do YY"); 
            this.props.onDatePick(formatedDate)
        });
        
    }

    onDatePickerClick = (event) => {
        
    }

    render() {
        return (
            <div className="datepicker-container">
                <div className="datepicker-wrapper">
                <DatePicker
                    value={this.state.time}
                    isOpen={true}
                    onSelect={this.handleSelect}
                    theme="ios"
                    isPopup={false}
                    className="lalalala"
                    showHeader={false}
                    confirmText={'Choose'}
                    showFormat='YYYY/MM/DD'
                    onCancel={this.handleCancel} />
                </div>
                <button
                    className="datepicker-choose"
                    onClick={this.onDatePickerClick}
                >
                Choose
                </button>
            </div>
        );
    }
}

export default DateAnswer;
