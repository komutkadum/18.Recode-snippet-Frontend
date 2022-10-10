import { Suspense } from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {Profile, SignIn, Snippet,ProtectedRoute,AddCode,Home} from './'
import Header from '../utility/Header';
import Spinner from '../spinner'
import Other from './Other';
function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Spinner color="orange"/>}>
      <Switch>
        <Route exact path="/signin" component={SignIn}/>
        <ProtectedRoute exact path="/profile" component={Profile}/>
        <ProtectedRoute exact path="/addcode" component={AddCode}/>
        <Route exact path="/snippet" component={Snippet}/>
        <Route exact path='/other' component={Other}/>
        <Route exact path="/" component={Home} />
      </Switch>
      </Suspense>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
