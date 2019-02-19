import React from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  ControlGroup,
  HTMLSelect,
  InputGroup,
} from "@blueprintjs/core";
import { BrowserRouter, Route, Link } from 'react-router-dom';

type ListFilterProps = {}
type ListFilterState = {}

const FILTER_OPTIONS = ["Filter", "Name - ascending", "Name - descending", "Price - ascending", "Price - descending"];

export class ListFilter extends React.PureComponent<ListFilterProps, ListFilterState> {
  public render() {
    return (
      <ControlGroup fill={true}>
          <HTMLSelect style={{width: '200px'}} options={FILTER_OPTIONS} />
          <InputGroup placeholder="Find filters..." />
          <Button style={{width: '200px'}} icon="arrow-right" />
      </ControlGroup>
    );
  }
}