import React, { Component } from 'react';
import { Line } from 'rc-progress';
import Rating from 'react-rating';
import {CSSTransitionGroup} from 'react-transition-group';



class ProcessingRequest extends Component {
    state = {
        progress: '0'
    }
   componentDidMount(){
       this.props.chatContainer.scrollTop = this.props.chatContainer.scrollHeight + 100;
       this.interval = setInterval(()=>{
            this.setState({progress: +this.state.progress+20+''}, ()=>{
                this.props.chatContainer.scrollTop = this.props.chatContainer.scrollHeight + 100;
                if(this.state.progress === '100'){
                    clearInterval(this.interval)
                }
            })
       }, 2000)
   }
    render() {
        return (
            <CSSTransitionGroup
                        transitionName="processing"
                        transitionAppear={true}
                        transitionAppearTimeout={1300}
                        transitionLeave={false}
                        transitionEnter={false}
                    >
            <div className="request-wrapper">
                <h5>Analyzing your data...</h5>
                <div className="progress-block">
                    <p className="progress-p">Connecting to municipal databases</p>
                     <Line percent={this.state.progress} strokeWidth="0.5" strokeColor="#f63d8a" />
                </div>
                {+this.state.progress > 20 ? 
                    <CSSTransitionGroup
                        transitionName="processing"
                        transitionAppear={true}
                        transitionAppearTimeout={1300}
                        transitionLeave={false}
                        transitionEnter={false}
                    >
                        <div className="building">
                        <p className="progress-p">Building Age</p>
                        <Rating
                            quiet
                            initialRating={0.5}
                            emptySymbol={<i class="far fa-star"></i>}
                            fullSymbol={<i class="fas fa-star"></i>}
                            />
                        </div> 
                    </CSSTransitionGroup>
                : null}
                {+this.state.progress >40 ? 
                    <CSSTransitionGroup
                            transitionName="processing"
                            transitionAppear={true}
                            transitionAppearTimeout={1300}
                            transitionLeave={false}
                            transitionEnter={false}
                        >
                    <div className="building">
                    <p className="progress-p">Building Burability</p>
                    <Rating
                        quiet
                        initialRating={4.5}
                        emptySymbol={<i class="far fa-star"></i>}
                        fullSymbol={<i class="fas fa-star"></i>}
                        />
                </div> 
                </CSSTransitionGroup>
                : null}
                {+this.state.progress > 60 ? 
                    <CSSTransitionGroup
                        transitionName="processing"
                        transitionAppear={true}
                        transitionAppearTimeout={1300}
                        transitionLeave={false}
                        transitionEnter={false}
                    >
                    <div className="building">
                    <p className="progress-p">Distance From Coast</p>
                    <Rating
                        quiet
                        initialRating={2}
                        emptySymbol={<i class="far fa-star"></i>}
                        fullSymbol={<i class="fas fa-star"></i>}
                        />
                </div>
                </CSSTransitionGroup>
                
                 : null}
                {this.state.progress > 80 ?
                    <CSSTransitionGroup
                        transitionName="processing"
                        transitionAppear={true}
                        transitionAppearTimeout={1300}
                        transitionLeave={false}
                        transitionEnter={false}
                    >
                    <div className="building">
                    <p className="progress-p">Fire House Proximility</p>
                    <Rating
                        className="rating"
                        quiet
                        initialRating={4.5}
                        emptySymbol={<i class="far fa-star"></i>}
                        fullSymbol={<i class="fas fa-star"></i>}
                        />
                </div>
                </CSSTransitionGroup>
                 : null}
            </div>
            </CSSTransitionGroup>
        );
    }
}

export default ProcessingRequest;
