import { useState } from "react";
import Chats from "./Chats";
export default function ChatSection() {
    const [displayChat, setDisplayChat] = useState<boolean>(false);
    return (
        <>
            {displayChat ? <Chats onClick={()=>setDisplayChat(!displayChat)}/> : <div className="w-10 h-10 rounded-full bg-white">
                <img src="/chat.png" alt="Chat Section" onClick={() => setDisplayChat(!displayChat)}/>
            </div>}
        </>
    );
}

