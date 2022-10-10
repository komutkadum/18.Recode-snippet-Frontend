import React, { useEffect, useState } from 'react'
import { Categories } from '.';
import {Container,Accordion,Badge,Card,ButtonGroup,Button, ListGroup, FormControl, Alert} from 'react-bootstrap'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/snippet.css'
import Spinner from '../spinner'
import axios from 'axios';
import { useHistory } from 'react-router';
import { deleteSnippet } from '../api';
import Swal from 'sweetalert2';
import { timeAgo } from '../utility/timeAgo';
import { searchRoute, snippetRoute } from '../api/apiRoutes';
import { useQuery } from './Other';

function Snippet() {
  
    const [snippetData, setSnippetData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [zeroData, setZeroData] = useState(false);
    const [currentTag, setCurrentTag] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const history = useHistory();
    const query = useQuery();
    useEffect(()=>{
        const fetch = async() =>{
            setDataLoading(true);
            setZeroData(false);
            setCurrentTag("")
            // for all
            let url = `${snippetRoute}/${localStorage.getItem('userid')}?page=${page}`
            if(query.get('user')){
                url = `${snippetRoute}/${query.get('user')}?page=${page}`;
            }
            await axios.get(url)
            .then(res=>{
                setDataLoading(false)
                setSnippetData(res.data.myLists);
                setTotalPage(res.data.totalPages);
                setPage(parseInt(res.data.currentPage));
                if(res.data.myLists.length<1){
                    setZeroData(true);
                }
            })
            .catch(err=>{
                setDataLoading(false);
                console.log(err);
            })
        }
        fetch();
    },[query,page]);

    const editSnippet = (id) =>{
        return history.push(`/addcode?id=${id}`);
    }
    const deleteSnippetCode =  (id,title,index)=>{
         deleteSnippet(id,title,index,snippetData,setSnippetData);
    }
    return (
        <Container fluid="sm" className="spinner__container">
            {
                dataLoading?
                    <Spinner />:<>
                    <SearchInput 
                        setSnippetData={setSnippetData} 
                        setZeroData={setZeroData} 
                        setCurrentTag={setCurrentTag} 
                        setDataLoading={setDataLoading}/>
                    <Categories 
                        setSnippetData={setSnippetData} 
                        currentTag={currentTag} 
                        setCurrentTag={setCurrentTag} 
                        setZeroData={setZeroData} 
                        setDataLoading={setDataLoading}/>  
                    <ListGroup 
                        style={{marginTop:"15px"}} as="ul" variant="flush">
                        <Accordion>
                            {
                            snippetData&&snippetData.map((value,index)=>(
                                <CodeAccordionList key={value._id}
                                    value={value} 
                                    editSnippet={editSnippet}
                                    deleteSnippetCode={deleteSnippetCode}
                                    index={index}
                                    query={query}
                                    />
                            ))
                            }
                        </Accordion>
                    </ListGroup>
                    {zeroData&&<Alert variant="danger"><center>No Snippet Present!</center></Alert>}
                    <div size="sm" className='mt-4 d-flex justify-content-center' style={{columnGap:"20px",alignItems:"center"}}>
                        <Button onClick={()=>setPage(prev=>prev-1)} disabled={page<=1}>Prev</Button>
                        <Button variant='light' disabled>{page}</Button>
                        <Button onClick={()=>setPage(prev=>prev+1)} disabled={totalPage==page}>Next</Button>
                    </div>
                    </>
            }
        </Container>
    )
}

const CodeAccordionList = ({value,editSnippet,deleteSnippetCode,index,query}) =>{
    const customBadgeStyle = {
        border:'1px solid #8e44ad',color:'#8e44ad'
    }
    const copyToClipboard = (value) =>{
        navigator.clipboard.writeText(value)
        Swal.fire({title : "Copied To Clipboard",icon: "success"})
    }
    return (
            <ListGroup.Item  style={{borderBottom:'4px solid grey'}}>   
                <Accordion.Toggle 
                    as={Card.Header} 
                    style={{cursor:"pointer",textAlign:"center",background:"transparent",border:0,fontWeight:"bold",color:"grey"}} 
                    eventKey={value._id}>
                    <span style={{textTransform:"capitalize"}}>{value.title}</span> &nbsp;
                    <i className="fas fa-chevron-down"></i> &nbsp;
                    <Badge style={customBadgeStyle}>{value.tags}</Badge>&nbsp;&nbsp;
                    <Badge style={customBadgeStyle}>{value.language}</Badge>&nbsp;&nbsp;
                    <Badge style={customBadgeStyle}>{timeAgo(value.date)}</Badge>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={value._id}>
                    <>
                        <SyntaxHighlighter language={value.language} style={a11yDark}>
                            {value.snippet}
                        </SyntaxHighlighter>
                        <div style={{display:'flex',justifyContent:"center"}}>
                            <ButtonGroup size="sm" style={{marginTop:"10px",marginBottom:"10px"}}>
                                <Button 
                                    variant="secondary" 
                                    className="rounded"
                                    onClick={() =>copyToClipboard(value.snippet)}>
                                    <i className="fas fa-copy"></i> &nbsp;Copy
                                </Button>
                                {(!query.get('user')||{})&&
                                    <>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button 
                                        variant="success" 
                                        className="rounded" 
                                        onClick={()=>editSnippet(value._id)}>
                                        <i className="fas fa-edit"></i> &nbsp;Edit
                                    </Button>
                                    </>
                                }
                                {!query.get('user')&&<>
                                &nbsp;&nbsp;&nbsp;
                                <Button 
                                    variant="danger" 
                                    className="rounded" 
                                    onClick={()=>deleteSnippetCode(value._id,value.title,index)}>
                                    <i className="fas fa-trash-alt"></i> &nbsp;Delete
                                </Button>
                                </>
                                }
                            </ButtonGroup>
                        </div>
                    </>
                </Accordion.Collapse>
            </ListGroup.Item>
    );
}

const SearchInput = ({setSnippetData,setDataLoading,setZeroData,setCurrentTag}) => {
    const [searchValue, setSearchValue] = useState("");
    let query = useQuery();
    const searchSnippet = async(e) =>{
        e.preventDefault();
        if(searchValue==="") return;
        setZeroData(false);
        setDataLoading(true);
        setCurrentTag("")
        await axios.post(searchRoute,{
            searchValue,
            userId : query.get('user')?query.get('user'):localStorage.getItem('userid')
        }).then(res=>{
            if(res.data.message!=="success"){
                setDataLoading(false);
                return;
            }
            setSnippetData(res.data.data);
            setDataLoading(false);
            if(res.data.data.length<1){
                setZeroData(true);
            }
        }).catch(err=>{
            setDataLoading(false);
            console.log(err);
        })
    }
    return (
        <form 
            onSubmit={searchSnippet} 
            style={{marginTop:"15px",display:"flex"}}>
            <FormControl 
                value={searchValue} 
                onChange={(e)=>setSearchValue(e.target.value)} 
                placeholder="search by title..." 
                required/>
            <Button 
                type='submit'
                variant="success" 
                onClick={searchSnippet}>Search</Button>
        </form>
    );
}

export default Snippet
