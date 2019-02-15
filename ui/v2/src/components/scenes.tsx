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

type ScenesProps = {}
type ScenesState = {}

export class Scenes extends React.PureComponent<ScenesProps, ScenesState> {
  public render() {
    return (
      <span>
        scenes
      </span>
    );
  }
}