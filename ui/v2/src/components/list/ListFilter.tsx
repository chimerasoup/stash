import {
  AnchorButton,
  Button,
  ControlGroup,
  HTMLSelect,
  InputGroup,
  ITagProps,
  Menu,
  MenuItem,
  Popover,
  Tag,
} from "@blueprintjs/core";
import { debounce } from "lodash";
import React, { SyntheticEvent } from "react";
import { Criterion, CriterionType, ListFilterModel } from "../../models/list-filter";
import { AddFilter } from "./AddFilter";

interface IListFilterProps {
  onChangePageSize: (pageSize: number) => void;
  onChangeQuery: (query: string) => void;
  onChange: (filter: ListFilterModel) => void;
  filter: ListFilterModel;
}
interface IListFilterState {}

const PAGE_SIZE_OPTIONS = ["20", "40", "60", "120"];

export class ListFilter extends React.PureComponent<IListFilterProps, IListFilterState> {
  private searchCallback: any;
  constructor(props: IListFilterProps) {
    super(props);
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onChangePageSize = this.onChangePageSize.bind(this);
    this.onChangeSortDirection = this.onChangeSortDirection.bind(this);
    this.onChangeSortBy = this.onChangeSortBy.bind(this);
    this.onAddCriterion = this.onAddCriterion.bind(this);
    this.onRemoveTag = this.onRemoveTag.bind(this);

    // this.route.queryParams.subscribe(params => {
    //   this.filter.configureFromQueryParameters(params, this.stashService);
    //   if (params['q'] != null) {
    //     this.searchFormControl.setValue(this.filter.searchTerm);
    //   }
    // });

    this.props.filter.configureForFilterMode(this.props.filter.filterMode);
  }

  public componentWillMount() {
    const that = this;
    this.searchCallback = debounce((event) => {
      that.props.onChangeQuery(event.target.value);
    }, 500);
  }

  public render() {
    return (
      <>
        <div className="filter-container">
          <InputGroup
            large={true}
            placeholder="Search..."
            defaultValue={this.props.filter.searchTerm}
            onChange={this.onChangeQuery}
            className="filter-item"
          />
          <HTMLSelect
            large={true}
            style={{flexBasis: "min-content"}}
            options={PAGE_SIZE_OPTIONS}
            onChange={this.onChangePageSize}
            className="filter-item"
          />
          <ControlGroup className="filter-item">
            <AnchorButton
              rightIcon={this.props.filter.sortDirection === "asc" ? "caret-up" : "caret-down"}
              onClick={this.onChangeSortDirection}
            >
              {this.props.filter.sortDirection === "asc" ? "Ascending" : "Descending"}
            </AnchorButton>
            <Popover position="bottom">
              <Button large={true}>{this.props.filter.sortBy}</Button>
              <Menu>{this.renderSortByOptions()}</Menu>
            </Popover>
          </ControlGroup>

          <AddFilter filter={this.props.filter} onAddCriterion={this.onAddCriterion} />
        </div>
        <div style={{display: "flex", justifyContent: "center", margin: "10px auto"}}>
          {this.renderFilterTags()}
        </div>
      </>
    );
  }

  private renderSortByOptions() {
    return this.props.filter.sortByOptions.map((option) => (
      <MenuItem onClick={this.onChangeSortBy} text={option} key={option} />
    ));
  }

  private renderFilterTags() {
    return this.props.filter.criteria.map((criterion) => (
      <Tag
        key={criterion.type}
        className="tag-item"
        itemID={criterion.type.toString()}
        onRemove={this.onRemoveTag}
      >
        {(CriterionType as any)[criterion.type]} with value {criterion.value}
      </Tag>
    ));
  }

  private onChangePageSize(event: SyntheticEvent<HTMLSelectElement>) {
    const val = event!.currentTarget!.value;
    this.props.onChangePageSize(parseInt(val, 10));
  }

  private onChangeQuery(event: SyntheticEvent<HTMLInputElement>) {
    event.persist();
    this.searchCallback(event);
  }

  private onChangeSortDirection(_: any) {
    if (this.props.filter.sortDirection === "asc") {
      this.props.filter.sortDirection = "desc";
    } else {
      this.props.filter.sortDirection = "asc";
    }
    this.props.onChange(this.props.filter);
  }

  private onChangeSortBy(event: React.MouseEvent<any>) {
    this.props.filter.sortBy = event.currentTarget.text;
    this.props.onChange(this.props.filter);
  }

  private onAddCriterion(criterion: Criterion) {
    this.props.filter.criteria.push(criterion);
    this.props.filter.currentPage = 1;
    this.props.onChange(this.props.filter);
    this.forceUpdate();
  }

  private onRemoveTag(e: React.MouseEvent<HTMLButtonElement>, tagProps: ITagProps) {
    console.log(`remove ${tagProps.itemID}`);
  }
}
