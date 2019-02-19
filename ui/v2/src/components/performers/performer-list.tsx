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

type PerformerListProps = {}
type PerformerListState = {}

export class PerformerList extends React.PureComponent<PerformerListProps, PerformerListState> {
  public render() {
    return (
      <span>
        performers
      </span>
    );
  }
}