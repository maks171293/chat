import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';


const Message = ({chat, user, last}) => (

    <li 
        className={`chat ${user === chat.username ? "right" : "left"}`} 
        style={{
            marginTop: last ? '2px' : '2px', 
            marginBottom: last ? '10px' : '2px'
            }}
    >
        { /*last ? <img 
            src={chat.img} 
            alt={`${chat.username}'s profile pic`} 
        /> : null*/ }
        
            {chat.content}
        {!chat.content ?
        <p>
            <span key="1" className="message-buble one"></span>
             <span key="2" className="message-buble two"></span>
             <span key="3" className="message-buble three"></span> 
        </p> 
        : null
    }
             
    </li>
);

export default Message;