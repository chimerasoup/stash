import { Maybe } from "../models";

export class TextUtils {
  public static truncate(value: Maybe<string>, limit: number = 100, tail: string = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + tail : value;
  }
}