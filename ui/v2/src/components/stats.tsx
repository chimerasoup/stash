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
import * as GQL from '../core/generated-graphql';
import { getStashService } from '../core/StashService';
import { ApolloQueryResult } from 'apollo-boost';

type StatsProps = {}
type StatsState = {
  data: ApolloQueryResult<GQL.StatsQuery>
}

export class Stats extends React.PureComponent<StatsProps, StatsState> {
  async componentDidMount() {
    await this.fetch();
  }

  private async fetch() {
    const result = await getStashService().stats();
    this.setState({data: result});
  }

  public render() {
    if (!this.state) return '...';
    const { loading, data, errors } = this.state.data;
    if (errors || loading) return '...';

    return (
      <div>
        <span>Scenes {data.stats.scene_count}</span>
        <span>Galleries {data.stats.gallery_count}</span>
      </div>
    );
  }
}