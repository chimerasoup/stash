import React, { RefObject } from 'react';
import {
  Card,
  Elevation,
} from "@blueprintjs/core";
import * as GQL from '../generated-graphql';
import { Link } from 'react-router-dom';

type SceneCardProps = {
  scene: GQL.SlimSceneDataFragment
}
type SceneCardState = {}

export class SceneCard extends React.PureComponent<SceneCardProps, SceneCardState> {
  videoTag: RefObject<HTMLVideoElement>
  constructor(props: SceneCardProps) {
    super(props);
    this.videoTag = React.createRef();
  }

  private onMouseEnter() {
    const videoTag = this.videoTag.current;
    if (!videoTag) return;
    videoTag.play();
  }

  private onMouseLeave() {
    const videoTag = this.videoTag.current;
    if (!videoTag) return;
    videoTag.pause();
  }

  public render() {
    return (
      <Card className="grid-item" elevation={Elevation.ONE} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
        <Link to={`/scenes/${this.props.scene.id}`} className="image previewable">
          <video className="preview" loop poster={this.props.scene.paths.screenshot || ""} ref={this.videoTag}>
            {!!this.props.scene.paths.preview ? <source src={this.props.scene.paths.preview} /> : ''}
          </video>
        </Link>
        <h5><a href="#">{this.props.scene.title}</a></h5>
        <p>{this.props.scene.details}</p>
      </Card>
    );
  }
}