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
import * as GQL from "../../core/generated-graphql";
import { getStashService } from "../../core/StashService";

interface SceneProps {
  match: any;
}
interface SceneState {
  data: ApolloQueryResult<GQL.FindSceneQuery>;
}

export class Scene extends React.PureComponent<SceneProps, SceneState> {
  public async componentDidMount() {
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
      <div>
        <h1 className="bp3-heading">{scene.title}</h1>
        {scene.path}
      </div>
    );
  }

  private async fetch() {
    const id = this.props.match.params.id;
    const result = await getStashService().findScene(id);
    this.setState({data: result});
  }
}
