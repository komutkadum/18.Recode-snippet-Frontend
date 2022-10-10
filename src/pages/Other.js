import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  Button, Container, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import {NavLink, useLocation} from 'react-router-dom'
import { searchOtherSnippetRoute } from '../api/apiRoutes';
import Spinner from '../spinner';

function Other() {
  let query = useQuery();
  const [data, setData] = useState([]);
  const [zeroData, setZeroData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetch = async() =>{
        // for all
        setZeroData(false);
        setLoading(true);
        let url = `${searchOtherSnippetRoute}?search=${query.get('search')}`
        await axios.get(url)
        .then(res=>{
            setData(res.data.data);
            setLoading(false);
            console.log(res.data.data)
            if(res.data.data.length<1){
                setZeroData(true);
            }
        })
        .catch(err=>{
            console.log(err);
            setLoading(false);
        })
    }
    fetch();
  },[query])
  return (
    <Container style={{marginTop:"2rem",maxWidth:"500px"}}>
        <ListGroup as="ol" >
            {
                loading?<Spinner/>:
                data.map((item, id)=>(
                    <ListGroup.Item as="li" key={item._id} className="d-flex justify-content-center mb-4 align-items-center">
                        <Image src={item.picture} width="80" className='rounded'/>
                        <div className="ms-2 me-auto ">
                            <h3 className="fw-bold" style={{textTransform:"capitalize"}}>{item.name}</h3>
                            <NavLink to={`/snippet?user=${item._id}`}><Button size='sm'>View Snippets</Button></NavLink>
                        </div>
                    </ListGroup.Item>
                ))
            }
            {
                zeroData&&<ListGroupItem as="li" style={{textAlign:"center"}}>
                    No user found
                </ListGroupItem>
            }
        </ListGroup>
    </Container>
  )
}

export function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default Other