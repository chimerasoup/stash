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

type StatsProps = {}
type StatsState = {}

export class Stats extends React.PureComponent<StatsProps, StatsState> {
  public render() {
    return (
      <GQL.StatsComponent>
        {({ loading, error, data }) => {
          if (error || loading) return '...';

          return (
            <div>
              <span>Scenes {data!.stats.scene_count}</span>
              <span>Galleries {data!.stats.gallery_count}</span>
            </div>
          )
        }}
      </GQL.StatsComponent>
    );
  }
}