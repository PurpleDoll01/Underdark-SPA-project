import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Layout from './components/Layout';
import CharDetails from './pages/CharDetails';
import CharModify from './pages/CharModify';
import NotFound from './pages/NotFound';


function App() {
    return(
        <BrowserRouter >
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />   
                    <Route exact path="/underdark/char" component={Characters} /> 
                    <Route exact path="/characters/:charId/" component={CharDetails} /> 
                    <Route exact path="/characters/modify/:charId" component={CharModify} /> 
                    <Route component={NotFound} />
                </Switch> 
            </Layout>
        </BrowserRouter>
    );
}

export default App;