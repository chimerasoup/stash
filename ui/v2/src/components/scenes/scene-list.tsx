import { ApolloQueryResult } from "apollo-boost";
import queryString from "query-string";
import React from "react";
import * as GQL from "../../core/generated-graphql";
import { getStashService } from "../../core/StashService";
import { IBaseProps } from "../../models/base-props";
import { ListFilterModel, SceneListState as ListState } from "../../models/list-filter";
import { ListFilter } from "../list/ListFilter";
import { Pagination } from "../list/Pagination";
import { SceneCard } from "./SceneCard";

interface ISceneListProps extends IBaseProps {}
interface ISceneListState {
  data: ApolloQueryResult<GQL.FindScenesQuery>;
}

export default class SceneList extends React.Component<ISceneListProps, ISceneListState> {
  private listState: ListState = new ListState();

  constructor(props: ISceneListProps) {
    super(props);
    this.onChangePageSize = this.onChangePageSize.bind(this);
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  public async componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    this.listState.filter.configureFromQueryParameters(queryParams);
    await this.fetch();
  }

  public render() {
    if (!this.state) { return "..."; }
    const { loading, data, errors } = this.state.data;

    if (errors || loading) { return "..."; }
    if (Object.getOwnPropertyNames(data).length === 0) { return "..."; }
    if (!data) { return "..."; }

    return (
      <div>
        <ListFilter
          onChangePageSize={this.onChangePageSize}
          onChangeQuery={this.onChangeQuery}
          filter={this.listState.filter}
          onChange={this.onChangeFilter}
        />
        <div className="grid">
          {data.findScenes.scenes.map((scene) => (<SceneCard key={scene.id} scene={scene} />))}
        </div>
        <Pagination
          itemsPerPage={this.listState.filter.itemsPerPage}
          currentPage={this.listState.filter.currentPage}
          totalItems={this.listState.totalCount}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }

  private async onChangePageSize(pageSize: number) {
    this.listState.filter.itemsPerPage = pageSize;
    await this.fetch();
  }

  private async onChangeQuery(query: string) {
    this.listState.filter.searchTerm = query;
    await this.fetch();
  }

  private async onChangeFilter(filter: ListFilterModel) {
    this.listState.filter = filter;
    await this.fetch();
  }

  private async onChangePage(page: number) {
    this.listState.filter.currentPage = page;
    await this.fetch();
  }

  private async fetch() {
    const location = Object.assign({}, this.props.history.location);
    location.search = this.listState.filter.makeQueryParameters();
    this.props.history.replace(location);

    const result = await getStashService().findScenes(this.listState.filter);
    this.listState.totalCount = result.data.findScenes.count;
    this.setState({data: result});
  }
}
