import { CriterionValueType, CriterionType } from "./types";
import { getStashService } from "../../core/StashService";

interface CriterionConfig {
  valueType: CriterionValueType;
  parameterName: string;
  options: any[];
}

export class Criterion {
  type: CriterionType = CriterionType.None;
  valueType: CriterionValueType = CriterionValueType.Single;
  options: any[] = [];
  parameterName: string = '';
  value: string = '';
  values: string[] = [];

  async configure(type: CriterionType) {
    this.type = type;

    let config: CriterionConfig = {
      valueType: CriterionValueType.Single,
      parameterName: '',
      options: []
    };

    switch (type) {
      case CriterionType.Rating:
        config.parameterName = 'rating';
        config.options = [1, 2, 3, 4, 5];
        break;
      case CriterionType.Resolution:
        config.parameterName = 'resolution';
        config.options = ['240p', '480p', '720p', '1080p', '4k'];
        break;
      case CriterionType.Favorite:
        config.parameterName = 'filter_favorites';
        config.options = ['true', 'false'];
        break;
      case CriterionType.HasMarkers:
        config.parameterName = 'has_markers';
        config.options = ['true', 'false'];
        break;
      case CriterionType.IsMissing:
        config.parameterName = 'is_missing';
        config.options = ['title', 'url', 'date', 'gallery', 'studio', 'performers'];
        break;
      case CriterionType.Tags:
        config = await this.configureTags('tags');
        break;
      case CriterionType.SceneTags:
        config = await this.configureTags('scene_tags');
        break;
      case CriterionType.Performers:
        config = await this.configurePerformers('performers');
        break;
      case CriterionType.None:
      default: break;
    }

    this.valueType = config.valueType;
    this.parameterName = config.parameterName;
    this.options = config.options;

    this.value = ''; // Need this or else we send invalid value to the new filter
    // this.values = []; // TODO this seems to break the "Multiple" filters
  }

  private async configureTags(name: string) {
    const result = await getStashService().getAllTagsForFilter();
    return {
      valueType: CriterionValueType.Multiple,
      parameterName: name,
      options: result.data.allTags.map(item => {
        return { id: item.id, name: item.name };
      })
    };
  }

  private async configurePerformers(name: string) {
    const result = await getStashService().getAllPerformersForFilter();
    return {
      valueType: CriterionValueType.Multiple,
      parameterName: name,
      options: result.data.allPerformers.map(item => {
        return { id: item.id, name: item.name, image_path: item.image_path };
      })
    };
  }
}