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
import * as GQL from '../generated-graphql';

type SceneProps = {
  match: any
}
type SceneState = {
  scene: GQL.SceneDataFragment
}

export class Scene extends React.PureComponent<SceneProps, SceneState> {

  componentDidMount () {
    const { id } = this.props.match.id
    const vars: GQL.FindSceneVariables = {
      id: id
    }

    {
      <GQL.FindSceneComponent variables={vars}>
      {({ loading, error, data }) => {
        if (error || loading) return '...';
        this.setState(() => ({ scene: data!.findScene! }))
      }}
      </GQL.FindSceneComponent>
    }
  }

  public render() {
    return (
      <span>
        {this.state.scene.title}
      </span>
    );
  }
}