import React from 'react';
import {
  Button,
  Card,
  Elevation,
} from "@blueprintjs/core";
import { SceneCard } from "./scene-card";
import * as GQL from '../../generated-graphql';
import { ListFilter } from '../list/ListFilter';
import { NamedProps, ChildProps } from 'react-apollo';

type SceneListProps = {}
type SceneListState = {
  variables: GQL.FindScenesVariables
}

class SceneList extends React.Component<GQL.FindScenesProps<SceneListProps>, SceneListState> {
  constructor(props: SceneListProps) {
    super(props);
    // this.state = {
    //   variables: {
    //     filter: {
    //       q: "",
    //       per_page: 60
    //     }
    //   }
    // };
    // this.onChangePageSize = this.onChangePageSize.bind(this);
  }

  // componentDidUpdate(previousProps: GQL.FindScenesProps<SceneListProps>) {
  //   if (previousProps.data!.variables.filter!.per_page != 60) return
  //   this.props.data!.refetch();
  // }

  private onChangePageSize(pageSize: number) {
    // let newState = Object.assign({}, this.state);
    // newState.variables.filter!.per_page = pageSize;
    // this.setState(newState);
    if (!this.props.data) return;
    if (!this.props.data.variables.filter) this.props.data.variables.filter = {}
    this.props.data.variables.filter.per_page = pageSize;
    this.props.data.refetch();
  }

  private onChangeQuery(query: string) {
    if (!this.props.data) return;
    if (!this.props.data.variables.filter) this.props.data.variables.filter = {}
    this.props.data.variables.filter.q = query;
    this.props.data.refetch();
  }

  public render() {
    if (!this.props.data) return '...';
    const { loading, findScenes, error } = this.props.data;

    if (error || loading) return '...';
    if (Object.getOwnPropertyNames(findScenes).length === 0) return '...';
    if (!findScenes) return '...';

    return (
      <div>
        <ListFilter
          onChangePageSize={this.onChangePageSize.bind(this)}
          onChangeQuery={this.onChangeQuery.bind(this)} />
        <div className="grid">
          {findScenes.scenes.map(scene => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>
      </div>
    )
  }
}

export default GQL.FindScenesHOC<{}, SceneListProps>({
  options: {
    variables: {
      filter: {
        per_page: 20
      },
      scene_filter: {},
      scene_ids: []
    }
  }
})(SceneList);