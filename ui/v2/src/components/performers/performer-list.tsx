import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

interface PerformerListProps {}
interface PerformerListState {}

export class PerformerList extends React.PureComponent<PerformerListProps, PerformerListState> {
  public render() {
    return (
      <span>
        performers
      </span>
    );
  }
}
