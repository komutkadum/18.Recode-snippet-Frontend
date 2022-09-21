import React from 'react';
// import Profile from './Profile';
const Profile  = React.lazy(()=>import('./Profile'))
// import SignIn from './SignIn'
const SignIn  = React.lazy(()=>import('./SignIn'))
// import Snippet from './Snippet'
const Snippet  = React.lazy(()=>import('./Snippet'))
// import ProtectedRoute from './ProtectedRoute'
const ProtectedRoute  = React.lazy(()=>import('./ProtectedRoute'))
// import AddCode from './AddCode';
const AddCode  = React.lazy(()=>import('./AddCode'))
// import Categories from './Categories';
const Categories  = React.lazy(()=>import('./Categories'))
// import Home from './Home'
const Home  = React.lazy(()=>import('./Home'))


export { Profile,SignIn, Snippet,ProtectedRoute,AddCode,Categories,Home};