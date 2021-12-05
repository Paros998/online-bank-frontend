import React, { CSSProperties } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import OnLogout from "../../components/OnLogout/OnLogout";
import ClientSideNavbar from "../../components/SideNavbar/Client/ClientSideNavbar";
import ClientNavbar from "../../components/AuthorisedNavbar/Client/ClientNavbar";
import Home from "./Home/Home";
import CyclicalTransfers from "./CyclicalTransfers/CyclicalTransfers";
import History from "./History/History";
import Account from "./Account/Account";
import Transfer from "./Transfer/Transfer";

const containerStyle: CSSProperties = {
  paddingLeft: '220px',
  paddingTop: '20px',
  paddingRight: '50px'
};

const ClientAuthorisedViews = () => {
  return (
    <Router>
      <ClientNavbar/>

      <ClientSideNavbar/>

      <Container
        className='bg-secondary-light h-100'
        style={containerStyle}
        fluid
      >
        <Switch>
          <Route path='/client/home'>
            <Home/>
          </Route>

          <Route path='/client/transfer'>
            <Transfer />
          </Route>

          <Route path='/client/account'>
            <Account />
          </Route>

          <Route path='/client/history'>
            <History />
          </Route>

          <Route path='/client/cyclical-transfers'>
            <CyclicalTransfers />
          </Route>

          <Route path='*'>
            <OnLogout/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default ClientAuthorisedViews;
