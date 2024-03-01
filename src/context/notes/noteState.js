import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const s1={"name":"kiran","class":"15"}
    const [state,setState]=useState(s1);
    const update=()=>{
        setTimeout(()=>{
            setState({
                "name":"Kiran Kumar Reddy",
                "class":"16"
            })
        },1000)
    }
    return (
        <NoteContext.Provider value={{state:state,update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;