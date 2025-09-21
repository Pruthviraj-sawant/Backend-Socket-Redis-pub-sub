import React, { useEffect } from "react";

import { useState } from "react";

export const App = () => {

const [socket,setSocket]=useState<any>(null);
const[latestmessage,setLatestmessage]=useState("");
const [message,setMessage]=useState("");


useEffect(()=>{
    
const ws=new WebSocket("ws://localhost:8006");
ws.onopen=()=>{
    console.log("Connected to the server");
    setSocket(ws);
};

ws.onmessage=(event)=>{
    
    console.log("Message from server ",event.data);
    setLatestmessage(event.data);
};

return ()=>{
    ws.close();
};
},[]);



if(!socket){
    return <div>Loading... conneting to server........</div>;
}

  return (
    <div>
      <input onChange={
        (e)=>{
            setMessage(e.target.value);
        }
      } />

<button onClick={()=>{
  socket.send(message); 
}}>send</button>
{latestmessage}


    </div>
  )
}

export default App;