export enum DisplayMode {
  Grid,
  List,
  Wall
}

export enum FilterMode {
  Scenes,
  Performers,
  Studios,
  Galleries,
  SceneMarkers
}

export class CustomCriterion {
  key: string;
  value: string;
  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

export enum CriterionType {
  None,
  Rating,
  Resolution,
  Favorite,
  HasMarkers,
  IsMissing,
  Tags,
  SceneTags,
  Performers
}

export enum CriterionValueType {
  Single,
  Multiple
}

export class CriterionOption {
  label: string;
  value: CriterionType;
  constructor(type: CriterionType) {
    this.label = this.getLabel(type);
    this.value = type;
  }

  private getLabel(type: CriterionType): string {
    switch (type) {
      case CriterionType.None: return "No Filter";
      case CriterionType.Rating: return "Rating"
      case CriterionType.Resolution: return "Resolution"
      case CriterionType.Favorite: return "Favorite"
      case CriterionType.HasMarkers: return "Has Markers"
      case CriterionType.IsMissing: return "Is Missing Property"
      case CriterionType.Tags: return "Tags"
      case CriterionType.SceneTags: return "Scene Tags"
      case CriterionType.Performers: return "Performers"
    }
    return CriterionType[type]
  }
}