import React from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const s1={"name":"kiran"}
    return (
        <NoteContext.Provider value={s1}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;