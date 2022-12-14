import {Card,Badge} from 'react-bootstrap'
import axios from 'axios';
import { snippetRoute } from '../api/apiRoutes';
import { useQuery } from './Other';

function Categories({setSnippetData,setDataLoading,setZeroData,setCurrentTag,currentTag}) {
    const tagsList = ['All','express','django','github','algorithm','datastructure','flask','styles','php','others','react'];
    let query = useQuery();
    const searchTags = async(tags) =>{
        // if the tag selected is the current tag
        // then dont call to the backend
        if(currentTag===tags){
            return;
        }
        setDataLoading(true);
        setZeroData(false);
        let userId = localStorage.getItem('userid');
        if(query.get('user')){
            userId = query.get('user');
        }
        let url = `${snippetRoute}/${userId}/search/${tags}`
        if(tags==='All'){
            url = `${snippetRoute}/${userId}`
        }
        await axios.get(url)
            .then(res=>{
                setDataLoading(false)
                setSnippetData(res.data);
                setCurrentTag(tags);
                if(res.data.length<1){
                    setZeroData(true);
                }
            })
            .catch(err=>{
                setDataLoading(false);
                console.log(err);
            })
    }
    return (
        <Card className="shadow-sm spinner__card__container">
            <Card.Body>
                <span style={{color:"grey"}}>Search by tags : </span>&nbsp;
                {tagsList.map((value,index)=>(
                    <Badge onClick={()=>searchTags(value)} key={index} className={`spinner__badge ${currentTag==value?"spinner__active":null}`} >{value}</Badge>
                ))}
            </Card.Body>
        </Card>
    )
}

export default Categories
