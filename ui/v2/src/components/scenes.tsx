import React from 'react';
import {
  Button,
  Card,
  Elevation,
} from "@blueprintjs/core";
import { SceneCard } from "./scene-card";
import * as GQL from '../generated-graphql';

type ScenesProps = {}
type ScenesState = {}

const vars: GQL.FindScenesVariables = {
  filter: {
    q: "adria"
  }
}

export class Scenes extends React.PureComponent<ScenesProps, ScenesState> {
  public render() {
    return (
      <GQL.FindScenesComponent variables={vars}>
        {({ loading, error, data }) => {
          if (error || loading) return '...';

          return (
            <div className="grid">
              {data!.findScenes.scenes.map(scene => (
                <SceneCard scene={scene} />
              ))}
            </div>
          )
        }}
      </GQL.FindScenesComponent>
    );
  }
}