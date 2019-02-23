import React, { RefObject } from 'react';
import {
  Card,
  Elevation,
  H4,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Popover,
  Tag
} from "@blueprintjs/core";
import * as GQL from '../../core/generated-graphql';
import { Link } from 'react-router-dom';
import { TextUtils } from '../../utils/text';
import { ColorUtils } from '../../utils/color';

type SceneCardProps = {
  scene: GQL.SlimSceneDataFragment
}
type SceneCardState = {}

export class SceneCard extends React.PureComponent<SceneCardProps, SceneCardState> {
  private isPlaying = false;
  private isHovering = false;
  private previewPath: GQL.Maybe<string>;
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
          {!!this.props.scene.rating ?
            <div className={`rating-banner ${ColorUtils.classForRating(this.props.scene.rating)}`}>RATING: {this.props.scene.rating}</div>
          : ''}
          <video className="preview" loop poster={this.props.scene.paths.screenshot || ""} ref={this.videoTag}>
            {!!this.previewPath ? <source src={this.previewPath} /> : ''}
          </video>
        </Link>
        <div className="card-section">
          <H4 style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
            {!!this.props.scene.title ? this.props.scene.title : TextUtils.fileNameFromPath(this.props.scene.path)}
          </H4>
          <span className="bp3-text-small bp3-text-muted">{this.props.scene.date}</span>
          <p>{TextUtils.truncate(this.props.scene.details, 100, '... (continued)')}</p>
        </div>
        {this.props.scene.tags.length > 0 || this.props.scene.performers.length > 0 || this.props.scene.scene_markers.length > 0 ? (
          <>
            <Divider />
            <ButtonGroup className="card-section centered">
              {this.props.scene.tags.length > 0 ?
                <Popover position="bottom">
                  <Button
                    icon="tag"
                    text={this.props.scene.tags.length} />
                  <>
                    {this.props.scene.tags.map(tag => (
                      <Tag key={tag.id} className='tag-item'>{tag.name}</Tag>
                    ))}
                  </>
                </Popover>
              : ''}

              {this.props.scene.performers.length > 0 ?
                <Popover position="bottom">
                  <Button
                    icon="person"
                    text={this.props.scene.performers.length} />
                  <>
                    {this.props.scene.performers.map(performer => (
                      <Tag key={performer.id} className='tag-item'>{performer.name}</Tag>
                    ))}
                  </>
                </Popover>
              : ''}

              {this.props.scene.scene_markers.length > 0 ?
                <Popover position="bottom">
                  <Button
                    icon="map-marker"
                    text={this.props.scene.scene_markers.length} />
                  <>
                    {this.props.scene.scene_markers.map(marker => (
                      <Tag key={marker.id} className='tag-item'>{marker.title} - {TextUtils.secondsToTimestamp(marker.seconds)}</Tag>
                    ))}
                  </>
                </Popover>
              : ''}
            </ButtonGroup>
          </>
        ) : '' }
        <Divider />
        <span className="card-section centered">
          {this.props.scene.file.size !== undefined ? TextUtils.fileSize(parseInt(this.props.scene.file.size)) : ''}
          &nbsp;|&nbsp;
          {this.props.scene.file.duration !== undefined ? TextUtils.secondsToTimestamp(this.props.scene.file.duration) : ''}
          &nbsp;|&nbsp;
          {this.props.scene.file.width} x {this.props.scene.file.height}
        </span>
        {!!this.props.scene.studio ? (
          <>
            <Divider />
            <Link
              to={`/studios/${this.props.scene.studio.id}`}
              style={{
                backgroundImage: `url('${this.props.scene.studio.image_path}')`,
                width: '100%',
                height: '50px',
                lineHeight: 5,
                backgroundSize: 'contain',
                display: 'inline-block',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }} />
          </>
        ) : (
          ''
        )}
      </Card>
    );
  }
}