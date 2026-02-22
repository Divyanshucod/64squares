import Chat from "./Chat";

export default function Chats({onClick}:{onClick: ()=>void}){
    return <>
      <div className="min-w-100 max-w-150 min-h-50 max-h-100 relative flex flex-col bg-amber-200">
          <button className="absolute top-1 right-6" onClick={onClick}>X</button>
          <div className="flex-1 min-h-[75%] overflow-y-auto">
             <Chat/>
              <Chat/>
               <Chat/>
                <Chat/>
          </div>
          <div className="w-full flex gap-1">
             <input placeholder="Enter message" className="w-full"/>
             <button>Send</button>
          </div>
      </div>
    </>
}


