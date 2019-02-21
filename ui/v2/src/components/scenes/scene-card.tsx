import React, { RefObject } from 'react';
import {
  Card,
  Elevation,
} from "@blueprintjs/core";
import * as GQL from '../../core/generated-graphql';
import { Link } from 'react-router-dom';

type SceneCardProps = {
  scene: GQL.SlimSceneDataFragment
}
type SceneCardState = {}

export class SceneCard extends React.PureComponent<SceneCardProps, SceneCardState> {
  private isPlaying = false;
  private isHovering = false;
  private previewPath: GQL.Maybe<string> = null;
  videoTag: RefObject<HTMLVideoElement>
  constructor(props: SceneCardProps) {
    super(props);
    this.videoTag = React.createRef();
  }

  componentDidMount() {
    const videoTag = this.videoTag.current;
    if (!videoTag) return;
    videoTag.volume = 0.05;
    videoTag.onplaying = () => {
      if (this.isHovering === true) {
        this.isPlaying = true;
      } else {
        videoTag.pause();
      }
    };
    videoTag.onpause = () => this.isPlaying = false;
  }

  private onMouseEnter() {
    this.isHovering = true;
    if (!this.previewPath) {
      this.previewPath = this.props.scene.paths.preview;
      this.forceUpdate();
    }

    const videoTag = this.videoTag.current;
    if (!videoTag) return;
    if (videoTag.paused && !this.isPlaying) {
      videoTag.play().catch(error => {
        console.log(error.message)
      });
    }
  }

  private onMouseLeave() {
    this.isHovering = false;

    const videoTag = this.videoTag.current;
    if (!videoTag) return;
    if (!videoTag.paused && this.isPlaying) {
      videoTag.pause();
    }
  }

  public render() {
    return (
      <Card className="grid-item" elevation={Elevation.ONE} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
        <Link to={`/scenes/${this.props.scene.id}`} className="image previewable">
          <video className="preview" loop poster={this.props.scene.paths.screenshot || ""} ref={this.videoTag}>
            {!!this.previewPath ? <source src={this.previewPath} /> : ''}
          </video>
        </Link>
        <h5 className="bp3-heading"><a href="#">{this.props.scene.title}</a></h5>
        <p>{this.props.scene.details}</p>
        <p>{this.props.scene.path}</p>
      </Card>
    );
  }
}