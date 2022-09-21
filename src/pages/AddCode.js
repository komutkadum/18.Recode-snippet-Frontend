import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import axios from 'axios'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-gitignore";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-clojure";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/mode-elixir";
import "ace-builds/src-noconflict/mode-erlang";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/theme-monokai";
import { useHistory,useLocation } from 'react-router-dom';
import {  updateSnippet } from '../api';
import { snippetRoute } from '../api/apiRoutes';

function AddCode() {
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState("");
    const [codeAce, setCodeAce] = useState("");
    const [languageValue, setLanguageValue] = useState("");
    const [editCode, setEditCode] = useState(false);
    const languageList = ['javascript','java','html','gitignore','c_cpp','clojure','python','css','json','swift', 'elixir','erlang','kotlin'];
    const tagsList = ['express','django','github','algorithm','datastructure','flask','styles','php','others','react'];
    const history = useHistory();
    const query = useQuery();

    useEffect(()=>{
        const checkCode = async() =>{
            if(query.get('id')){
                await axios.get(`${snippetRoute}/${localStorage.getItem('userid')}/${query.get('id')}`)
                .then(res=>{
                    setTitle(res.data[0].title)
                    setTags(res.data[0].tags);
                    setLanguageValue(res.data[0].language);
                    setCodeAce(res.data[0].snippet);
                    setEditCode(true);

                }).catch(err=>{
                    console.log("Error in addcde useeffect")
                    console.log(err);
                })
            }
            if(!query.get('id')){
                // alert("hello")
                setTitle("")
                setTags("");
                setLanguageValue("");
                setCodeAce("");
                setEditCode(false);
            }
        }
        checkCode();
    },[query.get('id')])

    const updateCode = () =>{
        updateSnippet(title,codeAce,tags,languageValue,history,query,"update")
    }

    const submitCode = () =>{
        updateSnippet(title,codeAce,tags,languageValue,history,query,"submit")
    }
    
    return (
        <>
            <Container style={{marginTop:"15px"}}>
                <div style={{display:"grid",gridGap:"10px",gridTemplateColumns:"1fr 1fr 1fr",justifyContent:"space-evenly"}}>
                    <input 
                        onChange={(e)=>setTitle(e.target.value)} 
                        value={title} placeholder="enter title" 
                        style={{marginBottom:"15px",width:"100%",padding:"5px",outline:"none"}}/>
                    <select 
                        onChange={(e)=>setTags(e.target.value)} 
                        value={tags}
                        style={{marginBottom:"15px",width:"100%",padding:"5px",outline:"none"}}>
                        <option value="">select tags</option>
                        {
                            tagsList.map((value, index)=>(
                                <option key={index} value={value}>{value}</option>
                            ))
                        }
                    </select>
                    <select 
                        onChange={(e)=>setLanguageValue(e.target.value)} 
                        value={languageValue}
                        style={{marginBottom:"15px",width:"100%",padding:"5px",outline:"none"}}>
                        <option value="">select language</option>
                        {
                            languageList.map((value,index)=>(
                                <option key={index} value={value}>{value}</option>
                            ))
                        }
                    </select>

                </div>
                <AceEditor
                    placeholder="write your code..."
                    mode={languageValue}
                    theme="monokai"
                    value={codeAce}
                    width="100%"
                    onChange={(value)=>setCodeAce(value)}
                    fontSize={16}   
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    wrapEnabled={true}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers : true,
                        tabSize: 4,
                    }}/>
                
                {
                    editCode?<Button onClick={updateCode} variant="danger" style={{marginTop:"15px",marginBottom:"15px",float:"right"}}>
                        Update &nbsp;<i className="fas fa-caret-square-right"></i>
                    </Button>:
                    <Button onClick={submitCode} variant="danger" style={{marginTop:"15px",float:"right"}}>
                    Submit &nbsp;<i className="fas fa-caret-square-right"></i>
                    </Button>
                }
            </Container>
        </>
    )
}



function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default AddCode
