import React from 'react';
import dummy from "../images/dummy.png";
import Text from "./text";

function ChatContent({chats}) {
    return (
        <>
            <div className='d-flex mb-3'>
                <div className='user-list-thumb-wrapper mr-4 align-self-end'>
                    <img src={dummy} alt=""/>
                </div>
                <Text text={chats.text}/>
            </div>
            {/*<small>{timeConverter(chats.dateTime.seconds,'H-M')}</small>*/}
        </>

    );
}

export default ChatContent;