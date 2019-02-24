import { Maybe } from "../models";

export class TextUtils {

  public static truncate(value: Maybe<string>, limit: number = 100, tail: string = "..."): string {
    if (!value) { return ""; }
    return value.length > limit ? value.substring(0, limit) + tail : value;
  }

  public static fileSize(bytes: number = 0, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) { return "?"; }

    let unit = 0;
    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit++;
    }

    return bytes.toFixed(+precision) + " " + this.units[unit];
  }

  public static secondsToTimestamp(seconds: number): string {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  public static fileNameFromPath(path: string): string {
    if (!!path === false) { return "No File Name"; }
    return path.replace(/^.*[\\\/]/, "");
  }
  private static units = [
    "bytes",
    "kB",
    "MB",
    "GB",
    "TB",
    "PB",
  ];
}
