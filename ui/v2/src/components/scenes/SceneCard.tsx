import {
  Button,
  ButtonGroup,
  Card,
  Divider,
  Elevation,
  H4,
  Popover,
  Tag,
} from "@blueprintjs/core";
import React, { RefObject } from "react";
import { Link } from "react-router-dom";
import * as GQL from "../../core/generated-graphql";
import { ColorUtils } from "../../utils/color";
import { TextUtils } from "../../utils/text";

interface ISceneCardProps {
  scene: GQL.SlimSceneDataFragment;
}
interface ISceneCardState {}

export class SceneCard extends React.PureComponent<ISceneCardProps, ISceneCardState> {
  public videoTag: RefObject<HTMLVideoElement>;
  private isPlaying = false;
  private isHovering = false;
  private previewPath: GQL.Maybe<string>;
  constructor(props: ISceneCardProps) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.videoTag = React.createRef();
  }

  public componentDidMount() {
    const videoTag = this.videoTag.current;
    if (!videoTag) { return; }
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

  public render() {
    return (
      <Card
        className="grid-item"
        elevation={Elevation.ONE}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <Link to={`/scenes/${this.props.scene.id}`} className="image previewable">
          {this.maybeRenderRatingBanner()}
          <video className="preview" loop={true} poster={this.props.scene.paths.screenshot || ""} ref={this.videoTag}>
            {!!this.previewPath ? <source src={this.previewPath} /> : ""}
          </video>
        </Link>
        <div className="card-section">
          <H4 style={{textOverflow: "ellipsis", overflow: "hidden"}}>
            {!!this.props.scene.title ? this.props.scene.title : TextUtils.fileNameFromPath(this.props.scene.path)}
          </H4>
          <span className="bp3-text-small bp3-text-muted">{this.props.scene.date}</span>
          <p>{TextUtils.truncate(this.props.scene.details, 100, "... (continued)")}</p>
        </div>

        {this.maybeRenderPopoverButtonGroup()}

        <Divider />
        <span className="card-section centered">
          {this.props.scene.file.size !== undefined ? TextUtils.fileSize(parseInt(this.props.scene.file.size, 10)) : ""}
          &nbsp;|&nbsp;
          {this.props.scene.file.duration !== undefined ? TextUtils.secondsToTimestamp(this.props.scene.file.duration) : ""}
          &nbsp;|&nbsp;
          {this.props.scene.file.width} x {this.props.scene.file.height}
        </span>
        {this.maybeRenderStudio()}
      </Card>
    );
  }

  private maybeRenderRatingBanner() {
    if (!this.props.scene.rating) { return; }
    return (
      <div className={`rating-banner ${ColorUtils.classForRating(this.props.scene.rating)}`}>
        RATING: {this.props.scene.rating}
      </div>
    );
  }

  private maybeRenderTagPopoverButton() {
    if (this.props.scene.tags.length <= 0) { return; }

    const tags = this.props.scene.tags.map((tag) => (
      <Tag key={tag.id} className="tag-item">{tag.name}</Tag>
    ));
    return (
      <Popover interactionKind={"hover"} position="bottom">
        <Button
          icon="tag"
          text={this.props.scene.tags.length}
        />
        <>{tags}</>
      </Popover>
    );
  }

  private maybeRenderPerformerPopoverButton() {
    if (this.props.scene.performers.length <= 0) { return; }

    const performers = this.props.scene.performers.map((performer) => (
      <Tag key={performer.id} className="tag-item">{performer.name}</Tag>
    ));
    return (
      <Popover interactionKind={"hover"} position="bottom">
        <Button
          icon="person"
          text={this.props.scene.performers.length}
        />
        <>{performers}</>
      </Popover>
    );
  }

  private maybeRenderSceneMarkerPopoverButton() {
    if (this.props.scene.scene_markers.length <= 0) { return; }

    const sceneMarkers = this.props.scene.scene_markers.map((marker) => (
      <Tag key={marker.id} className="tag-item">{marker.title} - {TextUtils.secondsToTimestamp(marker.seconds)}</Tag>
    ));
    return (
      <Popover interactionKind={"hover"} position="bottom">
        <Button
          icon="map-marker"
          text={this.props.scene.scene_markers.length}
        />
        <>{sceneMarkers}</>
      </Popover>
    );
  }

  private maybeRenderPopoverButtonGroup() {
    if (this.props.scene.tags.length > 0 ||
        this.props.scene.performers.length > 0 ||
        this.props.scene.scene_markers.length > 0) {
      return (
        <>
          <Divider />
          <ButtonGroup minimal={true} className="card-section centered">
            {this.maybeRenderTagPopoverButton()}
            {this.maybeRenderPerformerPopoverButton()}
            {this.maybeRenderSceneMarkerPopoverButton()}
          </ButtonGroup>
        </>
      );
    }
  }

  private maybeRenderStudio() {
    if (!this.props.scene.studio) { return; }
    const style: React.CSSProperties = {
      backgroundImage: `url('${this.props.scene.studio.image_path}')`,
      width: "100%",
      height: "50px",
      lineHeight: 5,
      backgroundSize: "contain",
      display: "inline-block",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
    return (
      <>
        <Divider />
        <Link
          to={`/studios/${this.props.scene.studio.id}`}
          style={style}
        />
      </>
    );
  }

  private onMouseEnter() {
    this.isHovering = true;
    if (!this.previewPath) {
      this.previewPath = this.props.scene.paths.preview;
      this.forceUpdate();
    }

    const videoTag = this.videoTag.current;
    if (!videoTag) { return; }
    if (videoTag.paused && !this.isPlaying) {
      videoTag.play().catch((error) => {
        console.log(error.message);
      });
    }
  }

  private onMouseLeave() {
    this.isHovering = false;

    const videoTag = this.videoTag.current;
    if (!videoTag) { return; }
    if (!videoTag.paused && this.isPlaying) {
      videoTag.pause();
    }
  }
}
