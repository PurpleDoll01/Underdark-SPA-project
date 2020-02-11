import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Layout from './components/Layout';


function App() {
    return(
        <BrowserRouter >
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />   
                    <Route exact path="/underdark/char" component={Characters} />   
                </Switch> 
            </Layout>
        </BrowserRouter>
    );
}

export default App;