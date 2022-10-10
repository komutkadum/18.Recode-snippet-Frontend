import { useContext,useState } from 'react'
import {Navbar, Nav, Container,NavDropdown,Form } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink,useHistory } from 'react-router-dom';
import { signOut } from '../authentication';
import { FirebaseContext } from '../firebase'
import '../styles/header.css'

function Header() {
    const firebase = useContext(FirebaseContext);
    const [user] = useAuthState(firebase.auth);
    const history = useHistory();
    const [search, setSearch] = useState();
    
    const searchSubmit = (e) => {
        e.preventDefault();
        history.push(`/other?search=${search}`);
        setSearch("")
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" className='py-2' sticky="top" variant="dark">
            <Container>
            <Navbar.Brand>
                <NavLink  activeStyle={{color:"white"}} className="active d-flex" to="/">
                    <img src={process.env.PUBLIC_URL + '/code.png'} alt="recode snippet icon" style={{width:"30px",height:"30px"}}/> &nbsp;Recode Snippet
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Form className="d-flex" onSubmit={searchSubmit}>
                        <Form.Control
                        type="text"
                        placeholder="Search other eg: john doe"
                        className="me-2 w-full"
                        aria-label="Search"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        />
                    </Form>
                    {user&&<Nav.Link>
                        <NavLink  activeStyle={{color:"white"}} className="active" to="/snippet">
                            <i className="fas fa-code"></i> My Snippet 
                        </NavLink>
                    </Nav.Link>}
                    
                    {user&&<Nav.Link>
                        <NavLink  activeStyle={{color:"white"}} className="active" to="/addcode">
                           <i className="fas fa-plus-circle"></i> Add Snippet
                        </NavLink>
                    </Nav.Link>}
                    
                </Nav>
                
                <Nav>
                    <Nav.Link >
                        <NavLink  activeStyle={{color:"white"}} className="active d-flex" to="/profile">
                            {user&&<><img src={user.photoURL} alt={user.displayName} style={{width:"24px",height:"24px",borderRadius:"50%"}}/> 
                            &nbsp;{user.displayName}</>}
                        </NavLink>
                    </Nav.Link>
                    <NavDropdown title="Options" drop="left"  id="navbarScrollingDropdown">
                        {user&&<NavDropdown.Item onClick={()=>signOut(firebase)}>
                            {user&&<><i className="fas fa-sign-out-alt"></i> Logout</>}
                        </NavDropdown.Item>}
                        {!user&&<NavDropdown.Item onClick={()=>history.push('/signin')}>
                            <i className="fas fa-sign-out-alt"></i> Login
                        </NavDropdown.Item>}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
            
        </Navbar>
    )
}





export default Header
