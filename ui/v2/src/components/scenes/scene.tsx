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
import * as GQL from '../../generated-graphql';

type SceneProps = {
  match: any
}
type SceneState = {
  scene: GQL.SceneDataFragment
}

export class Scene extends React.PureComponent<SceneProps, SceneState> {
  public render() {
    const id = this.props.match.params.id
    const vars: GQL.FindSceneVariables = {
      id: id
    }

    return (
      <GQL.FindSceneComponent variables={vars}>
      {({ loading, error, data }) => {
        if (error) return error.message;
        if (error || loading || !data) return '...';
        // this.setState(() => ({ scene: data!.findScene! }))
        const scene = data.findScene
        if (!scene) return '...';
        return (
          <div>
            <h1 className="bp3-heading">{scene.title}</h1>
            {scene.path}
          </div>
        )
      }}
      </GQL.FindSceneComponent>
    );
  }
}