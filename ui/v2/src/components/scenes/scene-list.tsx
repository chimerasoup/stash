import React from 'react';
import {
  Button,
  Card,
  Elevation,
} from "@blueprintjs/core";
import { SceneCard } from "./scene-card";
import * as GQL from '../../generated-graphql';
import { ListFilter } from '../list/ListFilter';

type SceneListProps = {}
type SceneListState = {}

const vars: GQL.FindScenesVariables = {
  filter: {
    q: ""
  }
}

export class SceneList extends React.PureComponent<SceneListProps, SceneListState> {
  public render() {
    return (
      <GQL.FindScenesComponent variables={vars}>
        {({ loading, error, data }) => {
          if (error || loading) return '...';

          return (
            <div>
              <ListFilter />
              <div className="grid">
                {data!.findScenes.scenes.map(scene => (
                  <SceneCard scene={scene} />
                ))}
              </div>
            </div>
          )
        }}
      </GQL.FindScenesComponent>
    );
  }
}