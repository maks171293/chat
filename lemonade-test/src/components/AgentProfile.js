import React, { Component } from 'react';
import GoStar from 'react-icons/lib/go/star'

class AgentProfile extends Component {
    state = {
        rating: 5
    }
    render() {
            let stars = [];
            let a = 0;
            while(a < this.state.rating){
                a++;
            stars.push(<GoStar key={a}/>)
            }
        return (
            <div className="agent-profile">
                <div className="agent-img">
                </div>
                <h2 className="agent-name">Maya</h2>
                <div className="agent-rating">
                    { stars }
                </div>
                <div className="agent-desc">
                    <p>Personal Insurance Assistant</p>
                </div>
            </div>
        );
    }
}

export default AgentProfile;
