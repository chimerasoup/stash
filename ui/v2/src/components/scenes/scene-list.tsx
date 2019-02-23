import React from 'react';
import { SceneCard } from "./scene-card";
import * as GQL from '../../core/generated-graphql';
import { ListFilter } from '../list/ListFilter';
import { SceneListState as ListState, ListFilterModel } from '../../models/list-filter';
import { ApolloQueryResult } from 'apollo-boost';
import { getStashService } from '../../core/StashService';
import queryString from 'query-string';
import { BaseProps } from '../../models/base-props';

interface SceneListProps extends BaseProps {}
type SceneListState = {
  data: ApolloQueryResult<GQL.FindScenesQuery>
}

export default class SceneList extends React.Component<SceneListProps, SceneListState> {
  private listState: ListState = new ListState();

  async componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    this.listState.filter.configureFromQueryParameters(queryParams);
    await this.fetch();
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

  private async fetch() {
    const location = Object.assign({}, this.props.history.location);
    location.search = this.listState.filter.makeQueryParameters();
    this.props.history.push(location);



    const result = await getStashService().findScenes(this.listState.filter);
    this.setState({data: result});
  }

  public render() {
    if (!this.state) return '...';
    const { loading, data, errors } = this.state.data;

    if (errors || loading) return '...';
    if (Object.getOwnPropertyNames(data).length === 0) return '...';
    if (!data) return '...';

    return (
      <div>
        <ListFilter
          onChangePageSize={this.onChangePageSize.bind(this)}
          onChangeQuery={this.onChangeQuery.bind(this)}
          filter={this.listState.filter}
          onChange={this.onChangeFilter.bind(this)} />
        <div className="grid">
          {data.findScenes.scenes.map(scene => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>
      </div>
    )
  }
}
