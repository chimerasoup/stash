import {
  SlimSceneDataFragment,
  PerformerDataFragment,
  StudioDataFragment,
  GalleryDataFragment,
  SceneMarkerDataFragment,
} from '../../core/generated-graphql';
import { ListFilterModel } from './filter';
import { FilterMode } from './types';

export class ListState<T> {
  totalCount: number = 0;
  scrollY: number = 0;
  filter: ListFilterModel = new ListFilterModel();
  data: T[] = [];

  reset() {
    this.data = [];
    this.totalCount = 0;
  }
}

export class SceneListState extends ListState<SlimSceneDataFragment> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Scenes;
  }
}

export class PerformerListState extends ListState<PerformerDataFragment> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Performers;
  }
}

export class StudioListState extends ListState<StudioDataFragment> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Studios;
  }
}

export class GalleryListState extends ListState<GalleryDataFragment> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Galleries;
  }
}

export class SceneMarkerListState extends ListState<SceneMarkerDataFragment> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.SceneMarkers;
  }
}
