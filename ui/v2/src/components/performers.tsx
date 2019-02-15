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
import { BrowserRouter, Route, Link } from 'react-router-dom';

type PerformersProps = {}
type PerformersState = {}

export class Performers extends React.PureComponent<PerformersProps, PerformersState> {
  public render() {
    return (
      <span>
        performers
      </span>
    );
  }
}