import React from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  EditableText,
} from "@blueprintjs/core";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import * as GQL from '../../core/generated-graphql';

type PerformerProps = {
  match: any
}
type PerformerState = {
  scene: GQL.PerformerDataFragment
}

export class Performer extends React.PureComponent<PerformerProps, PerformerState> {
  public render() {
    const id = this.props.match.params.id
    const vars: GQL.FindPerformerVariables = {
      id: id
    }

    return (
      <GQL.FindPerformerComponent variables={vars}>
      {({ loading, error, data }) => {
        if (error) return error.message;
        if (error || loading || !data) return '...';
        // this.setState(() => ({ scene: data!.findScene! }))
        const performer = data.findPerformer
        if (!performer) return '...';
        return (
          <div>
            <h1 className="bp3-heading"><EditableText maxLength={255} defaultValue={performer.name!} placeholder="Name" /></h1>
            {/* <h1 className="bp3-heading">{performer.name}</h1> */}
          </div>
        )
      }}
      </GQL.FindPerformerComponent>
    );
  }
}