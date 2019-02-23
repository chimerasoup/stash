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
  ButtonGroup,
  AnchorButton,
  Popover,
  Menu,
  MenuItem,
  Divider,
} from "@blueprintjs/core";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { ListFilter as Filter, Criteria } from '../../models/list';
import { AddFilter } from './AddFilter';

type ListFilterProps = {
  onChangePageSize: (pageSize: number) => void
  onChangeQuery: (query: string) => void
  onChange: (filter: Filter) => void
  filter: Filter
}
type ListFilterState = {}

const PAGE_SIZE_OPTIONS = ["20", "40", "60", "120"];

export class ListFilter extends React.PureComponent<ListFilterProps, ListFilterState> {
  private searchCallback: any
  constructor(props: ListFilterProps) {
    super(props)

    // this.route.queryParams.subscribe(params => {
    //   this.filter.configureFromQueryParameters(params, this.stashService);
    //   if (params['q'] != null) {
    //     this.searchFormControl.setValue(this.filter.searchTerm);
    //   }
    // });

    this.props.filter.configureForFilterMode(this.props.filter.filterMode);
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

  private onChangeQuery(event: SyntheticEvent<HTMLInputElement>) {
    event.persist();
    this.searchCallback(event);
  }

  private onChangeSortDirection(_: any) {
    if (this.props.filter.sortDirection === 'asc') {
      this.props.filter.sortDirection = 'desc';
    } else {
      this.props.filter.sortDirection = 'asc';
    }
    this.props.onChange(this.props.filter);
  }

  private onChangeSortBy(event: React.MouseEvent<any>) {
    this.props.filter.sortBy = event.currentTarget.text;
    this.props.onChange(this.props.filter);
  }

  private onAddCriteria(criteria: Criteria) {
    this.props.filter.criterions.push(criteria);
    this.props.onChange(this.props.filter);
  }

  public render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', margin: '10px auto'}}>
        <InputGroup
          large={true}
          placeholder="Search..."
          onChange={this.onChangeQuery.bind(this)}
          className="filter-item" />
        <HTMLSelect
          large={true}
          style={{flexBasis: 'min-content'}}
          options={PAGE_SIZE_OPTIONS}
          onChange={this.onChangePageSize.bind(this)}
          className="filter-item" />
        <ControlGroup
          className="filter-item">
          <AnchorButton
            rightIcon={ this.props.filter.sortDirection === 'asc' ? 'caret-up' : 'caret-down' }
            onClick={this.onChangeSortDirection.bind(this)}>
              { this.props.filter.sortDirection === 'asc' ? 'Ascending' : 'Descending' }
          </AnchorButton>
          <Popover position="bottom">
            <Button large={true}>{this.props.filter.sortBy}</Button>
            <Menu>
              {this.props.filter.sortByOptions.map(option => (
                <MenuItem onClick={this.onChangeSortBy.bind(this)} text={option} key={option} />
              ))}
            </Menu>
          </Popover>
        </ControlGroup>

        <AddFilter filter={this.props.filter} onAddCriteria={this.onAddCriteria.bind(this)} />
      </div>
    );
  }
}