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
import queryString from "query-string";
import React from "react";
import ReactJWPlayer from "react-jw-player";
import { BrowserRouter, Link, Route } from "react-router-dom";
import * as GQL from "../../core/generated-graphql";
import { getStashService } from "../../core/StashService";
import { IBaseProps } from "../../models";
import { ScenePlayer } from "./ScenePlayer";

interface ISceneProps extends IBaseProps {}
interface ISceneState {
  data: ApolloQueryResult<GQL.FindSceneQuery>;
}

export class Scene extends React.PureComponent<ISceneProps, ISceneState> {
  private timestamp: number = 0;
  public async componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    if (!!queryParams.t && typeof queryParams.t === "string") {
      this.timestamp = parseInt(queryParams.t, 10);
    }
    await this.fetch();
  }

  public render() {

    if (!this.state) { return "..."; }
    const { loading, data, errors } = this.state.data;
    if (!!errors) { return errors[0].message; }
    if (errors || loading) { return "..."; }

    const scene = data.findScene;
    if (!scene) { return "..."; }

    return (
      <>
        <ScenePlayer scene={scene} timestamp={this.timestamp} />
        <h1 className="bp3-heading">{scene.title}</h1>
        {scene.path}
      </>
    );
  }

  private async fetch() {
    const id = this.props.match.params.id;
    const result = await getStashService().findScene(id);
    this.setState({data: result});
  }
}
