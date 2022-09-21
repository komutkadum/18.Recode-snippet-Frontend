import { Row,Col, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import {useContext,useEffect,useState} from 'react'
import { FirebaseContext } from '../firebase'   
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/profile.css'
import axios from 'axios';
import Spinner from '../spinner'
import Swal from 'sweetalert2';
import { profileRoute } from '../api/apiRoutes';

function Profile() {
    const firebase = useContext(FirebaseContext);
    const [user] = useAuthState(firebase.auth);
    const [profileLoading, setProfieLoading] = useState(true);
    const [profileData, setProfileData] = useState({});
    useEffect(()=>{
        const fetch = async() =>{
            await axios.get(`${profileRoute}/${localStorage.getItem('userid')}`)
            .then(res=>{
                setProfieLoading(false);
                if(res.data.message!=='success'){
                    Swal.fire({
                        title: "Something went wrong",
                        icon: "error",
                        text: "Please provide correct information and reload again!!!"
                    })
                    return;
                }
                setProfileData(res.data.data);
            })
            .catch(err=>{
                setProfieLoading(false);
                console.log(err);
            })
        }
        fetch();
    },[]);

    return (<>
        {profileLoading?<Spinner color="#0f5132"/>:
        <Container fluid="sm" className="profile__container">
            <Row>
                <Col sm={4} style={{display:'flex',justifyContent:"center",marginTop:"15px"}}>
                    <div className="profile__card profile__background">
                    <img src={profileData&&profileData.picture} alt={profileData&&profileData.name} style={{width:"150px",borderRadius:"50%"}}/><br/>
                    <h4>{user&&user.displayName}</h4>
                    <h5>{user&&user.title}</h5>
                    </div>
                </Col>
                
                <Col sm={8}>
                    <Row>
                        <Col sm={12}  style={{marginTop:"15px"}} >
                            <ListGroup >
                                <ListGroupItem className="profile__links__container profile__background">
                                    <span className="profile__links">Full Name : </span>&nbsp;
                                    <span>{profileData&&profileData.name}</span>
                                </ListGroupItem>
                                <ListGroupItem  className="profile__links__container profile__background">
                                    <span className="profile__links">Email : </span>&nbsp;
                                    <span style={{textTransform:"lowercase"}}>{profileData&&profileData.email}</span>
                                </ListGroupItem>
                                <ListGroupItem className="profile__links__container profile__background">
                                    <span className="profile__links">Phone : </span>&nbsp;
                                    <span>{profileData&&profileData.phone}</span>
                                </ListGroupItem>
                                <ListGroupItem className="profile__links__container profile__background">
                                    <span className="profile__links">Address : </span>&nbsp;
                                    <span>{profileData&&profileData.address}</span>
                                </ListGroupItem>    
                            </ListGroup>
                        </Col>
                        <Col sm={12}  style={{marginTop:"15px"}}>
                            <ListGroup >
                                <ListGroupItem className="profile__links__container profile__background">
                                    <span className="profile__links"><i className="fas fa-globe-africa"></i> Website : </span>&nbsp;
                                    <span className="profile__links__content">{profileData&&profileData.website}</span>
                                </ListGroupItem>
                                <ListGroupItem className="profile__links__container profile__background">
                                    <span className="profile__links"><i className="fab fa-github"></i> Github : </span>&nbsp;
                                    <span className="profile__links__content">{profileData&&profileData.github}</span>
                                </ListGroupItem>
                                <ListGroupItem className="profile__links__container profile__background">
                                    <span className="profile__links"><i className="fab fa-twitter"></i> Twitter : </span>&nbsp;
                                    <span className="profile__links__content">{profileData&&profileData.twitter}</span>
                                </ListGroupItem>
                                <ListGroupItem className="profile__links__container profile__background">
                                    <span className="profile__links"><i className="fab fa-facebook"></i> Facebook : </span>&nbsp;
                                    <span className="profile__links__content">{profileData&&profileData.facebook}</span>
                                </ListGroupItem>
                                <ListGroupItem className="profile__links__container profile__background">
                                    <span className="profile__links"><i className="fab fa-instagram"></i> Instagram : </span>&nbsp;
                                    <span className="profile__links__content">{profileData&&profileData.instagram}</span>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </Col>
               
            </Row>
        </Container>}</>
    )
}

export default Profile
