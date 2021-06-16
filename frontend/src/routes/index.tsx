import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SignIn } from '../pages/auth/SignIn';
import { SignUp } from '../pages/auth/SignUp';
import { GlobalStyle } from '../styles/GlobalStyle';


export const Routes = () => (
    <BrowserRouter>
        <GlobalStyle/>
        <Switch>
            <Route path="/" exact component={SignIn}/>
            <Route path="/cadastrar" exact component={SignUp}/>

        </Switch>
    </BrowserRouter>
);