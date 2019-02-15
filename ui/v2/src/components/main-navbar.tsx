import React from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import { NavLink, Link } from 'react-router-dom';

type MainNavbarProps = {}
type MainNavbarState = {}

export class MainNavbar extends React.Component<MainNavbarProps, MainNavbarState> {
  public render() {
    return (
      <Navbar fixedToTop={true}>
        <div style={{margin: '0 auto', width: '480px'}}>
          <NavbarGroup align={Alignment.CENTER}>
            <NavbarHeading><Link to="/" className="bp3-button bp3-minimal">Stash</Link></NavbarHeading>
            <NavbarDivider />
            <NavLink exact to="/scenes" className="bp3-button bp3-minimal bp3-icon-video" activeClassName="bp3-active">Scenes</NavLink>
            <NavLink exact to="/performers" className="bp3-button bp3-minimal bp3-icon-person" activeClassName="bp3-active">Performers</NavLink>
          </NavbarGroup>
        </div>
      </Navbar>
    );
  }
}