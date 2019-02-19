import React, { SyntheticEvent } from 'react';
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
import { debounce } from 'lodash';

type ListFilterProps = {
  onChangePageSize: (pageSize: number) => void
  onChangeQuery: (query: string) => void
}
type ListFilterState = {}

const FILTER_OPTIONS = ["Filter", "Name - ascending", "Name - descending", "Price - ascending", "Price - descending"];
const PAGE_SIZE_OPTIONS = ["20", "40", "60", "120"];

export class ListFilter extends React.PureComponent<ListFilterProps, ListFilterState> {
  private searchCallback: any
  constructor(props: ListFilterProps) {
    super(props)
    // this.onChangePageSize = this.onChangePageSize.bind(this);
  }

  componentWillMount() {
    const that = this;
    this.searchCallback = debounce(function (event) {
      that.props.onChangeQuery(event.target.value);
    }, 500);
  }

  private onChangePageSize(event: SyntheticEvent<HTMLSelectElement>) {
    const val = event!.currentTarget!.value
    this.props.onChangePageSize(parseInt(val))
  }

  // private onChangeQuery = debounce((event: SyntheticEvent<HTMLInputElement>) => {
  //   const val = event!.currentTarget!.value
  //   this.props.onChangeQuery(val)
  // }, 2000)
  private onChangeQuery(event: SyntheticEvent<HTMLInputElement>) {
    event.persist();
    this.searchCallback(event);
  }

  public render() {
    return (
      <div style={{width: '500px', margin: '10px auto'}}>
        <ControlGroup fill={true}>
          <InputGroup
            large={true}
            placeholder="Search..."
            onChange={this.onChangeQuery.bind(this)} />
          <HTMLSelect
            large={true}
            style={{flexBasis: 'min-content'}}
            options={PAGE_SIZE_OPTIONS}
            onChange={this.onChangePageSize.bind(this)} />
          <HTMLSelect large={true} style={{flexBasis: 'min-content'}} options={FILTER_OPTIONS} />
        </ControlGroup>
      </div>
    );
  }
}