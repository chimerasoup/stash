import { HotkeysTarget, Hotkeys, Hotkey } from "@blueprintjs/core";
import React from "react";
import ReactJWPlayer from "react-jw-player";
import * as GQL from "../../core/generated-graphql";
import { IBaseProps } from "../../models";

interface IScenePlayerProps {
  scene: GQL.SceneDataFragment;
  timestamp: number;
}
interface IScenePlayerState {}

@HotkeysTarget
export class ScenePlayer extends React.Component<IScenePlayerProps, IScenePlayerState> {
  private playerId = "main-jwplayer";
  private player: any;

  constructor(props: IScenePlayerProps) {
    super(props);
    this.onReady = this.onReady.bind(this);
  }

  public render() {
    const config = this.makeConfig(this.props.scene);
    return (
      <>
        <div id="jwplayer-container">
          <ReactJWPlayer
            playerId={this.playerId}
            playerScript="https://content.jwplatform.com/libraries/QRX6Y71b.js"
            customProps={config}
            onReady={this.onReady}
          />
        </div>
      </>
    );
  }

  public renderHotkeys() {
    const onIncrease = () => {
      const currentPlaybackRate = !!this.player ? this.player.getPlaybackRate() : 1;
      this.player.setPlaybackRate(currentPlaybackRate + 0.5);
    };
    const onDecrease = () => {
      const currentPlaybackRate = !!this.player ? this.player.getPlaybackRate() : 1;
      this.player.setPlaybackRate(currentPlaybackRate - 0.5);
    };
    const onReset = () => { this.player.setPlaybackRate(1); };

    return (
      <Hotkeys>
        <Hotkey
          global={true}
          combo="num2"
          label="Increase playback speed"
          preventDefault={true}
          onKeyDown={onIncrease}
        />
        <Hotkey
          global={true}
          combo="num1"
          label="Decrease playback speed"
          preventDefault={true}
          onKeyDown={onDecrease}
        />
        <Hotkey
          global={true}
          combo="num0"
          label="Reset playback speed"
          preventDefault={true}
          onKeyDown={onReset}
        />
      </Hotkeys>
    );
  }

  private makeConfig(scene: GQL.SceneDataFragment) {
    if (!scene.paths.stream) { return {}; }
    return {
      file: scene.paths.stream,
      image: scene.paths.screenshot,
      tracks: [
        {
          file: scene.paths.vtt,
          kind: "thumbnails",
        },
        {
          file: scene.paths.chapters_vtt,
          kind: "chapters",
        },
      ],
      primary: "html5",
      autostart: false,
      playbackRateControls: true,
      playbackRates: [0.75, 1, 1.5, 2, 3, 4],
    };
  }

  private onReady() {
    this.player = (window as any).jwplayer("main-jwplayer");
    if (this.props.timestamp > 0) {
      this.player.seek(this.props.timestamp);
    }
  }
}
