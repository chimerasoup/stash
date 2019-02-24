import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import * as GQL from "../core/generated-graphql";
import { getStashService } from "../core/StashService";

interface StatsProps {}
interface StatsState {
  data: ApolloQueryResult<GQL.StatsQuery>;
}

export class Stats extends React.PureComponent<StatsProps, StatsState> {
  public async componentDidMount() {
    await this.fetch();
  }

  public render() {
    if (!this.state) { return "..."; }
    const { loading, data, errors } = this.state.data;
    if (errors || loading) { return "..."; }

    return (
      <div>
        <span>Scenes {data.stats.scene_count}</span>
        <span>Galleries {data.stats.gallery_count}</span>
      </div>
    );
  }

  private async fetch() {
    const result = await getStashService().stats();
    this.setState({data: result});
  }
}
