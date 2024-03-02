import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const notesInitial=[
        {
          "_id": "65decefb31da8077af8d42ce",
          "user": "65ddb5d2452a3dcd0f8b3986",
          "title": "Backend",
          "description": " Web Development Course",
          "tag": "Youtube",
          "date": "2024-02-28T06:13:15.498Z",
          "__v": 0
        },
        {
          "_id": "65defe193f7f2d4bd63e11ca",
          "user": "65ddb5d2452a3dcd0f8b3986",
          "title": "DSA",
          "description": " Striver DSA Course",
          "tag": "LeetCode",
          "date": "2024-02-28T09:34:17.280Z",
          "__v": 0
        }
      ]

      const [notes,setNotes]=useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;