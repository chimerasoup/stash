import {
  DisplayMode,
  FilterMode,
  CustomCriterion,
  CriterionOption,
  CriterionType,
  CriterionValueType
} from "./types";
import { Criterion } from "./criterion";
import {
  SortDirectionEnum,
  FindFilterType,
  SceneFilterType,
  ResolutionEnum,
  PerformerFilterType,
  SceneMarkerFilterType
} from "../../core/generated-graphql";
import queryString from 'query-string';

export class ListFilterModel {
  searchTerm?: string;
  performers?: number[];
  currentPage = 1;
  itemsPerPage = 40;
  sortDirection = 'asc';
  sortBy?: string;
  displayModeOptions: DisplayMode[] = [];
  displayMode: DisplayMode = DisplayMode.Grid;
  filterMode: FilterMode = FilterMode.Scenes;
  sortByOptions: string[] = [];
  criteriaFilterOpen = false;
  criterionOptions: CriterionOption[] = [];
  criteria: Criterion[] = [];
  customCriteria: CustomCriterion[] = [];

  configureForFilterMode(filterMode: FilterMode) {
    switch (filterMode) {
      case FilterMode.Scenes:
        if (!!this.sortBy === false) { this.sortBy = 'date'; }
        this.sortByOptions = ['title', 'rating', 'date', 'filesize', 'duration', 'framerate', 'bitrate', 'random'];
        this.displayModeOptions = [
          DisplayMode.Grid,
          DisplayMode.List,
          DisplayMode.Wall
        ];
        this.criterionOptions = [
          new CriterionOption(CriterionType.None),
          new CriterionOption(CriterionType.Rating),
          new CriterionOption(CriterionType.Resolution),
          new CriterionOption(CriterionType.HasMarkers),
          new CriterionOption(CriterionType.IsMissing),
          new CriterionOption(CriterionType.Tags)
        ];
        break;
      case FilterMode.Performers:
        if (!!this.sortBy === false) { this.sortBy = 'name'; }
        this.sortByOptions = ['name', 'height', 'birthdate', 'scenes_count'];
        this.displayModeOptions = [
          DisplayMode.Grid,
          DisplayMode.List
        ];
        this.criterionOptions = [
          new CriterionOption(CriterionType.None),
          new CriterionOption(CriterionType.Favorite)
        ];
        break;
      case FilterMode.Studios:
        if (!!this.sortBy === false) { this.sortBy = 'name'; }
        this.sortByOptions = ['name', 'scenes_count'];
        this.displayModeOptions = [
          DisplayMode.Grid
        ];
        this.criterionOptions = [
          new CriterionOption(CriterionType.None)
        ];
        break;
      case FilterMode.Galleries:
        if (!!this.sortBy === false) { this.sortBy = 'title'; }
        this.sortByOptions = ['title', 'path'];
        this.displayModeOptions = [
          DisplayMode.Grid
        ];
        this.criterionOptions = [
          new CriterionOption(CriterionType.None)
        ];
        break;
      case FilterMode.SceneMarkers:
        if (!!this.sortBy === false) { this.sortBy = 'title'; }
        this.sortByOptions = ['title', 'seconds', 'scene_id', 'random', 'scenes_updated_at'];
        this.displayModeOptions = [
          DisplayMode.Wall
        ];
        this.criterionOptions = [
          new CriterionOption(CriterionType.None),
          new CriterionOption(CriterionType.Tags),
          new CriterionOption(CriterionType.SceneTags),
          new CriterionOption(CriterionType.Performers)
        ];
        break;
      default:
        this.sortByOptions = [];
        this.displayModeOptions = [];
        this.criterionOptions = [new CriterionOption(CriterionType.None)];
        break;
    }
    if (!!this.displayMode === false) { this.displayMode = this.displayModeOptions[0]; }
  }

  configureFromQueryParameters(params: any) {
    if (params['sortby'] != null) {
      this.sortBy = params['sortby'];
    }
    if (params['sortdir'] != null) {
      this.sortDirection = params['sortdir'];
    }
    if (params['disp'] != null) {
      this.displayMode = params['disp'];
    }
    if (params['q'] != null) {
      this.searchTerm = params['q'];
    }
    if (params['p'] != null) {
      this.currentPage = Number(params['p']);
    }

    if (params['c'] != null) {
      this.criteria = [];

      let jsonParameters: any[];
      if (params['c'] instanceof Array) {
        jsonParameters = params['c'];
      } else {
        jsonParameters = [params['c']];
      }

      if (jsonParameters.length !== 0) {
        this.criteriaFilterOpen = true;
      }

      jsonParameters.forEach(jsonString => {
        const encodedCriterion = JSON.parse(jsonString);
        const criterion = new Criterion();
        criterion.configure(encodedCriterion.type);
        if (criterion.valueType === CriterionValueType.Single) {
          criterion.value = encodedCriterion.value;
        } else {
          criterion.values = encodedCriterion.values;
        }
        this.criteria.push(criterion);
      });
    }
  }

  makeQueryParameters(): string {
    const encodedCriterion: string[] = [];
    this.criteria.forEach(criterion => {
      const encodedCriteria: any = {};
      encodedCriteria.type = criterion.type;
      if (criterion.valueType === CriterionValueType.Single) {
        encodedCriteria.value = criterion.value;
      } else {
        encodedCriteria.values = criterion.values;
      }
      const jsonCriteria = JSON.stringify(encodedCriteria);
      encodedCriterion.push(jsonCriteria);
    });

    const result = {
      sortby: this.sortBy,
      sortdir: this.sortDirection,
      disp: this.displayMode,
      q: this.searchTerm,
      p: this.currentPage,
      c: encodedCriterion
    };
    return queryString.stringify(result)
  }

  // TODO: These don't support multiple of the same criteria, only the last one set is used.

  makeFindFilter(): FindFilterType {
    return {
      q: this.searchTerm,
      page: this.currentPage,
      per_page: this.itemsPerPage,
      sort: this.sortBy,
      direction: this.sortDirection === 'asc' ? SortDirectionEnum.Asc : SortDirectionEnum.Desc
    }
  }

  makeSceneFilter(): SceneFilterType {
    const result: SceneFilterType = {};
    this.criteria.forEach(criterion => {
      switch (criterion.type) {
        case CriterionType.Rating:
          result.rating = Number(criterion.value);
          break;
        case CriterionType.Resolution: {
          switch (criterion.value) {
            case '240p': result.resolution = ResolutionEnum.Low; break;
            case '480p': result.resolution = ResolutionEnum.Standard; break;
            case '720p': result.resolution = ResolutionEnum.StandardHd; break;
            case '1080p': result.resolution = ResolutionEnum.FullHd; break;
            case '4k': result.resolution = ResolutionEnum.FourK; break;
          }
          break;
        }
        case CriterionType.HasMarkers:
          result.has_markers = criterion.value;
          break;
        case CriterionType.IsMissing:
          result.is_missing = criterion.value;
          break;
        case CriterionType.Tags:
          result.tags = criterion.values;
          break;
      }
    });
    return result;
  }

  makePerformerFilter(): PerformerFilterType {
    const result: PerformerFilterType = {};
    this.criteria.forEach(criterion => {
      switch (criterion.type) {
        case CriterionType.Favorite:
          result.filter_favorites = criterion.value === 'true';
          break;
      }
    });
    return result;
  }

  makeSceneMarkerFilter(): SceneMarkerFilterType {
    const result: SceneMarkerFilterType = {};
    this.criteria.forEach(criterion => {
      switch (criterion.type) {
        case CriterionType.Tags:
          result.tags = criterion.values;
          break;
        case CriterionType.SceneTags:
          result.scene_tags = criterion.values;
          break;
        case CriterionType.Performers:
          result.performers = criterion.values;
          break;
      }
    });
    return result;
  }
}