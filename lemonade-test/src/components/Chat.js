import React, { Component } from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import Message from './Message';
import AgentProfile from './AgentProfile';
import {data} from '../storage/data.js';
import ButtonAnswer from './ButtonAnswer';
import CheckboxAnswer from './CheckboxAnswer';
import DateAnswer from './DateAnswer';
import InputAnswer from './InputAnswer'
import ProcessingRequest from './ProcessingRequest'

let checkboxesQuestions = [
    {
        label: 'rommates',
        name: 'Rommates',
        disabled: false
    },
    {
        label: 'fire alarm',
        name: 'fireAlarm',
        disabled: false
    },
    {
        label: 'burglar alarm',
        name: 'burglarAlarm',
        disabeled: false
    }
]

let ButtonQuestions = [
    {
        label: 'Rent',
        name: 'buttonOne',
        message: 'I am a renter'
    },
    {
        label: 'Own',
        name: 'buttonTwo',
        message: 'I am the owner'
    },
]

let OneButtonQuestion = [
    {
        label: 'Approve',
        name: 'approveButton',
        message: 'I aggree to the terms of service'
    }
]

class Chat extends Component {
    state = {
        chats: [],
        currentMessage: 0,
        currentQuestion: 0,
        answerBox: null,
        checkboxesAnswers: null,
        showButtonAnswer: false,
        showCheckboxAnswer: false,
        showDateAnswer: false,
        showInputAnswer: false
    }
    renderNewMessage = () => {
            if(data.length < this.state.currentMessage){
                clearInterval(this.messageInterval)
            }
            if(data[this.state.currentMessage].type === 'processing'){
                let newMessage = {...data[this.state.currentMessage]}
                this.setState({ 
                    chats: [...this.state.chats, newMessage]
                })
                clearInterval(this.messageInterval);
                return;
            }
            let newMessage = {
                username: "Alice Chen",
                img: "https://c1.staticflickr.com/2/1632/24704515719_3a89353ffa_b.jpg",
            }
            this.setState({
                chats: [...this.state.chats, newMessage],
            }, ()=>{this.chatContainer.scrollTop = this.chatContainer.scrollHeight + 400})

            setTimeout(()=>{
                let newState = {...this.state};
                newState.chats[newState.chats.length - 1].content =<p>{data[this.state.currentMessage].content}</p>

                if(data[this.state.currentMessage].question !== data[this.state.currentMessage + 1].question){
                    clearInterval(this.messageInterval);
                    this.onWaitingForAnswer(data[this.state.currentMessage].question)
                }

                this.setState({
                    chats: newState.chats,
                    currentMessage: this.state.currentMessage + 1,
                    currentQuestion: data[this.state.currentMessage].question
                })
                
            }, 2000)
        }
    
    onWaitingForAnswer = (question) => {
       this.setState({
           answerBox: question
       });
       this.chatContainer.scrollTop = this.chatContainer.scrollHeight + 1000;
    }

    sendTheAnswer = (content) => {
        let newMessage = {
                username: "Maks Andreev",
                content: <p>{content}</p>,
                img: "https://kachrapatra.files.wordpress.com/2015/08/143.jpg",
            }
        this.setState({
            chats: [...this.state.chats, newMessage],
            currentMessage: this.state.currentMessage + 1,
            answerBox: null
        }, ()=>{
            this.chatContainer.scrollTop = this.chatContainer.scrollHeight + 400
        })
        this.messageInterval = setInterval(()=>{this.renderNewMessage()}, 3000)
    }


    onCheckboxesSend = (checkboxesAnswers) => {
        let answer = 'I have '
        checkboxesAnswers.map((checkbox, index, array)=>{
            if(array.length - 1 === index){
                answer = answer + ` and a ${checkbox.label}.`
            }else{
                answer = answer + `, ${checkbox.label}`
            }
        })
        this.sendTheAnswer(answer)
    }

    onButtonAnswer = (answer) => {
        this.sendTheAnswer(answer)
    }

    onInputAnswer = (answer) => {
        this.sendTheAnswer(answer)
    }

    onDateAnswer = (answer) => {
        this.sendTheAnswer(answer)
    }

    componentDidMount(){
        this.renderNewMessage()
        this.messageInterval = setInterval(()=>{this.renderNewMessage()}, 5000)
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight + 1000;
    }

    render() {
        let {chats} = this.state;
        let username = 'Maks Andreev';
        
        return (
            <div ref={(chat)=>this.chatContainer = chat} className="chat-container" >
                <AgentProfile/>
                <ul className="chats" 
                ref="chats"
                style={{marginBottom: this.state.answerBox === 0 || this.state.answerBox === 1 || this.state.answerBox === 4   ? '50px' : (this.state.answerBox === 2 ? '200px' :( this.state.answerBox === 3 ? '270px' : '0px'))}}
                >
                    
                    {
                        chats.map((chat, index, array) =>{
                            if(!chat.username && chat.type === 'processing'){
                                return (<ProcessingRequest chatContainer={this.chatContainer}/>)
                            }


                            let isLastItem;
                            if(array[index+1] && chat.username === array[index+1].username){
                                isLastItem = false;
                            }else{
                                isLastItem = true;
                            }
                            
                            return (
                            <div key={index} className="message-container">
                             {isLastItem ? <img 
                                className={`user-image ${username === chat.username ? "right" : "left"}`} 
                                src={chat.img} 
                                alt={`${chat.username}'s profile pic`} 
                            /> : null}
                                <CSSTransitionGroup
                                    transitionName="messages"
                                    transitionAppear={true}
                                    transitionAppearTimeout={2300}
                                    transitionLeave={false}
                                    transitionEnter={false}
                                >
                                    <Message key={index} chat={chat} last={isLastItem} user={username} />
                                </CSSTransitionGroup>
                            </div>
                            )
                        })
                    }
                </ul>
                   <div className="answer-type">
                        {this.state.answerBox === 0 ? <InputAnswer onInputSubmit={this.onInputAnswer}/> : null}
                        {this.state.answerBox === 1 ? <ButtonAnswer
                            type={2}
                            buttonData={ButtonQuestions}
                            onButtonAnswer={this.onButtonAnswer}
                        /> : null}
                        {this.state.answerBox === 2 ? <CheckboxAnswer
                            checkboxes={checkboxesQuestions}
                            onCheckboxesSend={this.onCheckboxesSend}
                             /> : null}
                        {this.state.answerBox === 3 ? <DateAnswer onDatePick={this.onDateAnswer}/> : null}
                        {this.state.answerBox === 4 ? <ButtonAnswer
                            buttonData={OneButtonQuestion}
                            onButtonAnswer={this.onButtonAnswer}
                        /> : null}
                   </div>
            </div>
        );
    }
}

export default Chat;
