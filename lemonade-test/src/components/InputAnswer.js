import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import MdSend from 'react-icons/lib/md/send'

class InputAnswer extends Component {
    state = {
        address: ''
    }

    onInputChange = (address) => this.setState({ address })

    onInputSubmit = (event) => {
        event.preventDefault()
    
        geocodeByAddress(this.state.address)
        .then(results => this.props.onInputSubmit(results[0].formatted_address))
        .catch(error => console.error('Error', error))

    }

    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onInputChange,
        }
        return (
            <div className="input-wrapper">
                <PlacesAutocomplete inputProps={inputProps} />
                <button 
                className="input-button"
                onClick={this.onInputSubmit}
                ><MdSend/></button>
            </div>
        );
    }
}

export default InputAnswer;
