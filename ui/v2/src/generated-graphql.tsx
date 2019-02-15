/* tslint:disable */
// Generated in 2019-02-15T14:13:25-08:00
export type Maybe<T> = T | null;

export interface SceneFilterType {
  /** Filter by rating */
  rating?: Maybe<number>;
  /** Filter by resolution */
  resolution?: Maybe<ResolutionEnum>;
  /** Filter to only include scenes which have markers. `true` or `false` */
  has_markers?: Maybe<string>;
  /** Filter to only include scenes missing this property */
  is_missing?: Maybe<string>;
  /** Filter to only include scenes with this studio */
  studio_id?: Maybe<string>;
  /** Filter to only include scenes with these tags */
  tags?: Maybe<string[]>;
  /** Filter to only include scenes with this performer */
  performer_id?: Maybe<string>;
}

export interface FindFilterType {
  q?: Maybe<string>;

  page?: Maybe<number>;

  per_page?: Maybe<number>;

  sort?: Maybe<string>;

  direction?: Maybe<SortDirectionEnum>;
}

export interface SceneMarkerFilterType {
  /** Filter to only include scene markers with this tag */
  tag_id?: Maybe<string>;
  /** Filter to only include scene markers with these tags */
  tags?: Maybe<string[]>;
  /** Filter to only include scene markers attached to a scene with these tags */
  scene_tags?: Maybe<string[]>;
  /** Filter to only include scene markers with these performers */
  performers?: Maybe<string[]>;
}

export interface PerformerFilterType {
  /** Filter by favorite */
  filter_favorites?: Maybe<boolean>;
}

export interface SceneUpdateInput {
  clientMutationId?: Maybe<string>;

  id: string;

  title?: Maybe<string>;

  details?: Maybe<string>;

  url?: Maybe<string>;

  date?: Maybe<string>;

  rating?: Maybe<number>;

  studio_id?: Maybe<string>;

  gallery_id?: Maybe<string>;

  performer_ids?: Maybe<string[]>;

  tag_ids?: Maybe<string[]>;
}

export interface SceneMarkerCreateInput {
  title: string;

  seconds: number;

  scene_id: string;

  primary_tag_id: string;

  tag_ids?: Maybe<string[]>;
}

export interface SceneMarkerUpdateInput {
  id: string;

  title: string;

  seconds: number;

  scene_id: string;

  primary_tag_id: string;

  tag_ids?: Maybe<string[]>;
}

export interface PerformerCreateInput {
  name?: Maybe<string>;

  url?: Maybe<string>;

  birthdate?: Maybe<string>;

  ethnicity?: Maybe<string>;

  country?: Maybe<string>;

  eye_color?: Maybe<string>;

  height?: Maybe<string>;

  measurements?: Maybe<string>;

  fake_tits?: Maybe<string>;

  career_length?: Maybe<string>;

  tattoos?: Maybe<string>;

  piercings?: Maybe<string>;

  aliases?: Maybe<string>;

  twitter?: Maybe<string>;

  instagram?: Maybe<string>;

  favorite?: Maybe<boolean>;
  /** This should be base64 encoded */
  image: string;
}

export interface PerformerUpdateInput {
  id: string;

  name?: Maybe<string>;

  url?: Maybe<string>;

  birthdate?: Maybe<string>;

  ethnicity?: Maybe<string>;

  country?: Maybe<string>;

  eye_color?: Maybe<string>;

  height?: Maybe<string>;

  measurements?: Maybe<string>;

  fake_tits?: Maybe<string>;

  career_length?: Maybe<string>;

  tattoos?: Maybe<string>;

  piercings?: Maybe<string>;

  aliases?: Maybe<string>;

  twitter?: Maybe<string>;

  instagram?: Maybe<string>;

  favorite?: Maybe<boolean>;
  /** This should be base64 encoded */
  image?: Maybe<string>;
}

export interface StudioCreateInput {
  name: string;

  url?: Maybe<string>;
  /** This should be base64 encoded */
  image: string;
}

export interface StudioUpdateInput {
  id: string;

  name?: Maybe<string>;

  url?: Maybe<string>;
  /** This should be base64 encoded */
  image?: Maybe<string>;
}

export interface TagCreateInput {
  name: string;
}

export interface TagUpdateInput {
  id: string;

  name: string;
}

export interface TagDestroyInput {
  id: string;
}

export enum ResolutionEnum {
  Low = "LOW",
  Standard = "STANDARD",
  StandardHd = "STANDARD_HD",
  FullHd = "FULL_HD",
  FourK = "FOUR_K"
}

export enum SortDirectionEnum {
  Asc = "ASC",
  Desc = "DESC"
}

// ====================================================
// Documents
// ====================================================

export type FindScenesVariables = {
  filter?: Maybe<FindFilterType>;
  scene_filter?: Maybe<SceneFilterType>;
  scene_ids?: Maybe<number[]>;
};

export type FindScenesQuery = {
  __typename?: "Query";

  findScenes: FindScenesFindScenes;
};

export type FindScenesFindScenes = {
  __typename?: "FindScenesResultType";

  count: number;

  scenes: FindScenesScenes[];
};

export type FindScenesScenes = SlimSceneDataFragment;

export type FindSceneVariables = {
  id: string;
  checksum?: Maybe<string>;
};

export type FindSceneQuery = {
  __typename?: "Query";

  findScene: Maybe<FindSceneFindScene>;

  sceneMarkerTags: FindSceneSceneMarkerTags[];
};

export type FindSceneFindScene = SceneDataFragment;

export type FindSceneSceneMarkerTags = {
  __typename?: "SceneMarkerTag";

  tag: FindSceneTag;

  scene_markers: FindSceneSceneMarkers[];
};

export type FindSceneTag = {
  __typename?: "Tag";

  id: string;

  name: string;
};

export type FindSceneSceneMarkers = SceneMarkerDataFragment;

export type FindSceneForEditingVariables = {
  id?: Maybe<string>;
};

export type FindSceneForEditingQuery = {
  __typename?: "Query";

  findScene: Maybe<FindSceneForEditingFindScene>;

  allPerformers: FindSceneForEditingAllPerformers[];

  allTags: FindSceneForEditingAllTags[];

  allStudios: FindSceneForEditingAllStudios[];

  validGalleriesForScene: FindSceneForEditingValidGalleriesForScene[];
};

export type FindSceneForEditingFindScene = SceneDataFragment;

export type FindSceneForEditingAllPerformers = {
  __typename?: "Performer";

  id: string;

  name: Maybe<string>;

  birthdate: Maybe<string>;

  image_path: Maybe<string>;
};

export type FindSceneForEditingAllTags = {
  __typename?: "Tag";

  id: string;

  name: string;
};

export type FindSceneForEditingAllStudios = {
  __typename?: "Studio";

  id: string;

  name: string;
};

export type FindSceneForEditingValidGalleriesForScene = {
  __typename?: "Gallery";

  id: string;

  path: string;
};

export type FindSceneMarkersVariables = {
  filter?: Maybe<FindFilterType>;
  scene_marker_filter?: Maybe<SceneMarkerFilterType>;
};

export type FindSceneMarkersQuery = {
  __typename?: "Query";

  findSceneMarkers: FindSceneMarkersFindSceneMarkers;
};

export type FindSceneMarkersFindSceneMarkers = {
  __typename?: "FindSceneMarkersResultType";

  count: number;

  scene_markers: FindSceneMarkersSceneMarkers[];
};

export type FindSceneMarkersSceneMarkers = SceneMarkerDataFragment;

export type SceneWallVariables = {
  q?: Maybe<string>;
};

export type SceneWallQuery = {
  __typename?: "Query";

  sceneWall: SceneWallSceneWall[];
};

export type SceneWallSceneWall = SceneDataFragment;

export type MarkerWallVariables = {
  q?: Maybe<string>;
};

export type MarkerWallQuery = {
  __typename?: "Query";

  markerWall: MarkerWallMarkerWall[];
};

export type MarkerWallMarkerWall = SceneMarkerDataFragment;

export type FindPerformersVariables = {
  filter?: Maybe<FindFilterType>;
  performer_filter?: Maybe<PerformerFilterType>;
};

export type FindPerformersQuery = {
  __typename?: "Query";

  findPerformers: FindPerformersFindPerformers;
};

export type FindPerformersFindPerformers = {
  __typename?: "FindPerformersResultType";

  count: number;

  performers: FindPerformersPerformers[];
};

export type FindPerformersPerformers = PerformerDataFragment;

export type FindPerformerVariables = {
  id: string;
};

export type FindPerformerQuery = {
  __typename?: "Query";

  findPerformer: Maybe<FindPerformerFindPerformer>;
};

export type FindPerformerFindPerformer = PerformerDataFragment;

export type FindStudiosVariables = {
  filter?: Maybe<FindFilterType>;
};

export type FindStudiosQuery = {
  __typename?: "Query";

  findStudios: FindStudiosFindStudios;
};

export type FindStudiosFindStudios = {
  __typename?: "FindStudiosResultType";

  count: number;

  studios: FindStudiosStudios[];
};

export type FindStudiosStudios = StudioDataFragment;

export type FindStudioVariables = {
  id: string;
};

export type FindStudioQuery = {
  __typename?: "Query";

  findStudio: Maybe<FindStudioFindStudio>;
};

export type FindStudioFindStudio = StudioDataFragment;

export type FindGalleriesVariables = {
  filter?: Maybe<FindFilterType>;
};

export type FindGalleriesQuery = {
  __typename?: "Query";

  findGalleries: FindGalleriesFindGalleries;
};

export type FindGalleriesFindGalleries = {
  __typename?: "FindGalleriesResultType";

  count: number;

  galleries: FindGalleriesGalleries[];
};

export type FindGalleriesGalleries = GalleryDataFragment;

export type FindGalleryVariables = {
  id: string;
};

export type FindGalleryQuery = {
  __typename?: "Query";

  findGallery: Maybe<FindGalleryFindGallery>;
};

export type FindGalleryFindGallery = GalleryDataFragment;

export type FindTagVariables = {
  id: string;
};

export type FindTagQuery = {
  __typename?: "Query";

  findTag: Maybe<FindTagFindTag>;
};

export type FindTagFindTag = TagDataFragment;

export type MarkerStringsVariables = {
  q?: Maybe<string>;
  sort?: Maybe<string>;
};

export type MarkerStringsQuery = {
  __typename?: "Query";

  markerStrings: MarkerStringsMarkerStrings[];
};

export type MarkerStringsMarkerStrings = {
  __typename?: "MarkerStringsResultType";

  id: string;

  count: number;

  title: string;
};

export type ScrapeFreeonesVariables = {
  performer_name: string;
};

export type ScrapeFreeonesQuery = {
  __typename?: "Query";

  scrapeFreeones: Maybe<ScrapeFreeonesScrapeFreeones>;
};

export type ScrapeFreeonesScrapeFreeones = {
  __typename?: "ScrapedPerformer";

  name: Maybe<string>;

  url: Maybe<string>;

  twitter: Maybe<string>;

  instagram: Maybe<string>;

  birthdate: Maybe<string>;

  ethnicity: Maybe<string>;

  country: Maybe<string>;

  eye_color: Maybe<string>;

  height: Maybe<string>;

  measurements: Maybe<string>;

  fake_tits: Maybe<string>;

  career_length: Maybe<string>;

  tattoos: Maybe<string>;

  piercings: Maybe<string>;

  aliases: Maybe<string>;
};

export type ScrapeFreeonesPerformersVariables = {
  q: string;
};

export type ScrapeFreeonesPerformersQuery = {
  __typename?: "Query";

  scrapeFreeonesPerformerList: string[];
};

export type AllTagsVariables = {};

export type AllTagsQuery = {
  __typename?: "Query";

  allTags: AllTagsAllTags[];
};

export type AllTagsAllTags = TagDataFragment;

export type AllPerformersForFilterVariables = {};

export type AllPerformersForFilterQuery = {
  __typename?: "Query";

  allPerformers: AllPerformersForFilterAllPerformers[];
};

export type AllPerformersForFilterAllPerformers = SlimPerformerDataFragment;

export type AllTagsForFilterVariables = {};

export type AllTagsForFilterQuery = {
  __typename?: "Query";

  allTags: AllTagsForFilterAllTags[];
};

export type AllTagsForFilterAllTags = {
  __typename?: "Tag";

  id: string;

  name: string;
};

export type StatsVariables = {};

export type StatsQuery = {
  __typename?: "Query";

  stats: StatsStats;
};

export type StatsStats = {
  __typename?: "StatsResultType";

  scene_count: number;

  gallery_count: number;

  performer_count: number;

  studio_count: number;

  tag_count: number;
};

export type SceneUpdateVariables = {
  id: string;
  title?: Maybe<string>;
  details?: Maybe<string>;
  url?: Maybe<string>;
  date?: Maybe<string>;
  rating?: Maybe<number>;
  studio_id?: Maybe<string>;
  gallery_id?: Maybe<string>;
  performer_ids?: Maybe<string[]>;
  tag_ids?: Maybe<string[]>;
};

export type SceneUpdateMutation = {
  __typename?: "Mutation";

  sceneUpdate: Maybe<SceneUpdateSceneUpdate>;
};

export type SceneUpdateSceneUpdate = SceneDataFragment;

export type PerformerCreateVariables = {
  name?: Maybe<string>;
  url?: Maybe<string>;
  birthdate?: Maybe<string>;
  ethnicity?: Maybe<string>;
  country?: Maybe<string>;
  eye_color?: Maybe<string>;
  height?: Maybe<string>;
  measurements?: Maybe<string>;
  fake_tits?: Maybe<string>;
  career_length?: Maybe<string>;
  tattoos?: Maybe<string>;
  piercings?: Maybe<string>;
  aliases?: Maybe<string>;
  twitter?: Maybe<string>;
  instagram?: Maybe<string>;
  favorite?: Maybe<boolean>;
  image: string;
};

export type PerformerCreateMutation = {
  __typename?: "Mutation";

  performerCreate: Maybe<PerformerCreatePerformerCreate>;
};

export type PerformerCreatePerformerCreate = PerformerDataFragment;

export type PerformerUpdateVariables = {
  id: string;
  name?: Maybe<string>;
  url?: Maybe<string>;
  birthdate?: Maybe<string>;
  ethnicity?: Maybe<string>;
  country?: Maybe<string>;
  eye_color?: Maybe<string>;
  height?: Maybe<string>;
  measurements?: Maybe<string>;
  fake_tits?: Maybe<string>;
  career_length?: Maybe<string>;
  tattoos?: Maybe<string>;
  piercings?: Maybe<string>;
  aliases?: Maybe<string>;
  twitter?: Maybe<string>;
  instagram?: Maybe<string>;
  favorite?: Maybe<boolean>;
  image?: Maybe<string>;
};

export type PerformerUpdateMutation = {
  __typename?: "Mutation";

  performerUpdate: Maybe<PerformerUpdatePerformerUpdate>;
};

export type PerformerUpdatePerformerUpdate = PerformerDataFragment;

export type StudioCreateVariables = {
  name: string;
  url?: Maybe<string>;
  image: string;
};

export type StudioCreateMutation = {
  __typename?: "Mutation";

  studioCreate: Maybe<StudioCreateStudioCreate>;
};

export type StudioCreateStudioCreate = StudioDataFragment;

export type StudioUpdateVariables = {
  id: string;
  name?: Maybe<string>;
  url?: Maybe<string>;
  image?: Maybe<string>;
};

export type StudioUpdateMutation = {
  __typename?: "Mutation";

  studioUpdate: Maybe<StudioUpdateStudioUpdate>;
};

export type StudioUpdateStudioUpdate = StudioDataFragment;

export type TagCreateVariables = {
  name: string;
};

export type TagCreateMutation = {
  __typename?: "Mutation";

  tagCreate: Maybe<TagCreateTagCreate>;
};

export type TagCreateTagCreate = TagDataFragment;

export type TagDestroyVariables = {
  id: string;
};

export type TagDestroyMutation = {
  __typename?: "Mutation";

  tagDestroy: boolean;
};

export type TagUpdateVariables = {
  id: string;
  name: string;
};

export type TagUpdateMutation = {
  __typename?: "Mutation";

  tagUpdate: Maybe<TagUpdateTagUpdate>;
};

export type TagUpdateTagUpdate = TagDataFragment;

export type SceneMarkerCreateVariables = {
  title: string;
  seconds: number;
  scene_id: string;
  primary_tag_id: string;
  tag_ids?: Maybe<string[]>;
};

export type SceneMarkerCreateMutation = {
  __typename?: "Mutation";

  sceneMarkerCreate: Maybe<SceneMarkerCreateSceneMarkerCreate>;
};

export type SceneMarkerCreateSceneMarkerCreate = SceneMarkerDataFragment;

export type SceneMarkerUpdateVariables = {
  id: string;
  title: string;
  seconds: number;
  scene_id: string;
  primary_tag_id: string;
  tag_ids?: Maybe<string[]>;
};

export type SceneMarkerUpdateMutation = {
  __typename?: "Mutation";

  sceneMarkerUpdate: Maybe<SceneMarkerUpdateSceneMarkerUpdate>;
};

export type SceneMarkerUpdateSceneMarkerUpdate = SceneMarkerDataFragment;

export type SceneMarkerDestroyVariables = {
  id: string;
};

export type SceneMarkerDestroyMutation = {
  __typename?: "Mutation";

  sceneMarkerDestroy: boolean;
};

export type MetadataImportVariables = {};

export type MetadataImportQuery = {
  __typename?: "Query";

  metadataImport: string;
};

export type MetadataExportVariables = {};

export type MetadataExportQuery = {
  __typename?: "Query";

  metadataExport: string;
};

export type MetadataScanVariables = {};

export type MetadataScanQuery = {
  __typename?: "Query";

  metadataScan: string;
};

export type MetadataGenerateVariables = {};

export type MetadataGenerateQuery = {
  __typename?: "Query";

  metadataGenerate: string;
};

export type MetadataCleanVariables = {};

export type MetadataCleanQuery = {
  __typename?: "Query";

  metadataClean: string;
};

export type MetadataUpdateVariables = {};

export type MetadataUpdateSubscription = {
  __typename?: "Subscription";

  metadataUpdate: string;
};

export type GalleryDataFragment = {
  __typename?: "Gallery";

  id: string;

  checksum: string;

  path: string;

  title: Maybe<string>;

  files: GalleryDataFiles[];
};

export type GalleryDataFiles = {
  __typename?: "GalleryFilesType";

  index: number;

  name: Maybe<string>;

  path: Maybe<string>;
};

export type SlimPerformerDataFragment = {
  __typename?: "Performer";

  id: string;

  name: Maybe<string>;

  image_path: Maybe<string>;
};

export type PerformerDataFragment = {
  __typename?: "Performer";

  id: string;

  checksum: string;

  name: Maybe<string>;

  url: Maybe<string>;

  twitter: Maybe<string>;

  instagram: Maybe<string>;

  birthdate: Maybe<string>;

  ethnicity: Maybe<string>;

  country: Maybe<string>;

  eye_color: Maybe<string>;

  height: Maybe<string>;

  measurements: Maybe<string>;

  fake_tits: Maybe<string>;

  career_length: Maybe<string>;

  tattoos: Maybe<string>;

  piercings: Maybe<string>;

  aliases: Maybe<string>;

  favorite: boolean;

  image_path: Maybe<string>;

  scene_count: Maybe<number>;
};

export type SceneMarkerDataFragment = {
  __typename?: "SceneMarker";

  id: string;

  title: string;

  seconds: number;

  stream: string;

  preview: string;

  scene: SceneMarkerDataScene;

  primary_tag: SceneMarkerDataPrimaryTag;

  tags: SceneMarkerDataTags[];
};

export type SceneMarkerDataScene = {
  __typename?: "Scene";

  id: string;
};

export type SceneMarkerDataPrimaryTag = {
  __typename?: "Tag";

  id: string;

  name: string;
};

export type SceneMarkerDataTags = {
  __typename?: "Tag";

  id: string;

  name: string;
};

export type SlimSceneDataFragment = {
  __typename?: "Scene";

  id: string;

  checksum: string;

  title: Maybe<string>;

  details: Maybe<string>;

  url: Maybe<string>;

  date: Maybe<string>;

  rating: Maybe<number>;

  path: string;

  file: SlimSceneDataFile;

  paths: SlimSceneDataPaths;

  scene_markers: SlimSceneDataSceneMarkers[];

  gallery: Maybe<SlimSceneDataGallery>;

  studio: Maybe<SlimSceneDataStudio>;

  tags: SlimSceneDataTags[];

  performers: SlimSceneDataPerformers[];
};

export type SlimSceneDataFile = {
  __typename?: "SceneFileType";

  size: Maybe<string>;

  duration: Maybe<number>;

  video_codec: Maybe<string>;

  audio_codec: Maybe<string>;

  width: Maybe<number>;

  height: Maybe<number>;

  framerate: Maybe<number>;

  bitrate: Maybe<number>;
};

export type SlimSceneDataPaths = {
  __typename?: "ScenePathsType";

  screenshot: Maybe<string>;

  preview: Maybe<string>;

  stream: Maybe<string>;

  webp: Maybe<string>;

  vtt: Maybe<string>;

  chapters_vtt: Maybe<string>;
};

export type SlimSceneDataSceneMarkers = {
  __typename?: "SceneMarker";

  id: string;

  title: string;

  seconds: number;
};

export type SlimSceneDataGallery = {
  __typename?: "Gallery";

  id: string;

  path: string;

  title: Maybe<string>;
};

export type SlimSceneDataStudio = {
  __typename?: "Studio";

  id: string;

  name: string;

  image_path: Maybe<string>;
};

export type SlimSceneDataTags = {
  __typename?: "Tag";

  id: string;

  name: string;
};

export type SlimSceneDataPerformers = {
  __typename?: "Performer";

  id: string;

  name: Maybe<string>;

  favorite: boolean;

  image_path: Maybe<string>;
};

export type SceneDataFragment = {
  __typename?: "Scene";

  id: string;

  checksum: string;

  title: Maybe<string>;

  details: Maybe<string>;

  url: Maybe<string>;

  date: Maybe<string>;

  rating: Maybe<number>;

  path: string;

  file: SceneDataFile;

  paths: SceneDataPaths;

  scene_markers: SceneDataSceneMarkers[];

  is_streamable: boolean;

  gallery: Maybe<SceneDataGallery>;

  studio: Maybe<SceneDataStudio>;

  tags: SceneDataTags[];

  performers: SceneDataPerformers[];
};

export type SceneDataFile = {
  __typename?: "SceneFileType";

  size: Maybe<string>;

  duration: Maybe<number>;

  video_codec: Maybe<string>;

  audio_codec: Maybe<string>;

  width: Maybe<number>;

  height: Maybe<number>;

  framerate: Maybe<number>;

  bitrate: Maybe<number>;
};

export type SceneDataPaths = {
  __typename?: "ScenePathsType";

  screenshot: Maybe<string>;

  preview: Maybe<string>;

  stream: Maybe<string>;

  webp: Maybe<string>;

  vtt: Maybe<string>;

  chapters_vtt: Maybe<string>;
};

export type SceneDataSceneMarkers = SceneMarkerDataFragment;

export type SceneDataGallery = GalleryDataFragment;

export type SceneDataStudio = StudioDataFragment;

export type SceneDataTags = TagDataFragment;

export type SceneDataPerformers = PerformerDataFragment;

export type StudioDataFragment = {
  __typename?: "Studio";

  id: string;

  checksum: string;

  name: string;

  url: Maybe<string>;

  image_path: Maybe<string>;

  scene_count: Maybe<number>;
};

export type TagDataFragment = {
  __typename?: "Tag";

  id: string;

  name: string;

  scene_count: Maybe<number>;

  scene_marker_count: Maybe<number>;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export const SlimPerformerDataFragmentDoc = gql`
  fragment SlimPerformerData on Performer {
    id
    name
    image_path
  }
`;

export const SlimSceneDataFragmentDoc = gql`
  fragment SlimSceneData on Scene {
    id
    checksum
    title
    details
    url
    date
    rating
    path
    file {
      size
      duration
      video_codec
      audio_codec
      width
      height
      framerate
      bitrate
    }
    paths {
      screenshot
      preview
      stream
      webp
      vtt
      chapters_vtt
    }
    scene_markers {
      id
      title
      seconds
    }
    gallery {
      id
      path
      title
    }
    studio {
      id
      name
      image_path
    }
    tags {
      id
      name
    }
    performers {
      id
      name
      favorite
      image_path
    }
  }
`;

export const SceneMarkerDataFragmentDoc = gql`
  fragment SceneMarkerData on SceneMarker {
    id
    title
    seconds
    stream
    preview
    scene {
      id
    }
    primary_tag {
      id
      name
    }
    tags {
      id
      name
    }
  }
`;

export const GalleryDataFragmentDoc = gql`
  fragment GalleryData on Gallery {
    id
    checksum
    path
    title
    files {
      index
      name
      path
    }
  }
`;

export const StudioDataFragmentDoc = gql`
  fragment StudioData on Studio {
    id
    checksum
    name
    url
    image_path
    scene_count
  }
`;

export const TagDataFragmentDoc = gql`
  fragment TagData on Tag {
    id
    name
    scene_count
    scene_marker_count
  }
`;

export const PerformerDataFragmentDoc = gql`
  fragment PerformerData on Performer {
    id
    checksum
    name
    url
    twitter
    instagram
    birthdate
    ethnicity
    country
    eye_color
    height
    measurements
    fake_tits
    career_length
    tattoos
    piercings
    aliases
    favorite
    image_path
    scene_count
  }
`;

export const SceneDataFragmentDoc = gql`
  fragment SceneData on Scene {
    id
    checksum
    title
    details
    url
    date
    rating
    path
    file {
      size
      duration
      video_codec
      audio_codec
      width
      height
      framerate
      bitrate
    }
    paths {
      screenshot
      preview
      stream
      webp
      vtt
      chapters_vtt
    }
    scene_markers {
      ...SceneMarkerData
    }
    is_streamable
    gallery {
      ...GalleryData
    }
    studio {
      ...StudioData
    }
    tags {
      ...TagData
    }
    performers {
      ...PerformerData
    }
  }

  ${SceneMarkerDataFragmentDoc}
  ${GalleryDataFragmentDoc}
  ${StudioDataFragmentDoc}
  ${TagDataFragmentDoc}
  ${PerformerDataFragmentDoc}
`;

// ====================================================
// Components
// ====================================================

export const FindScenesDocument = gql`
  query FindScenes(
    $filter: FindFilterType
    $scene_filter: SceneFilterType
    $scene_ids: [Int!]
  ) {
    findScenes(
      filter: $filter
      scene_filter: $scene_filter
      scene_ids: $scene_ids
    ) {
      count
      scenes {
        ...SlimSceneData
      }
    }
  }

  ${SlimSceneDataFragmentDoc}
`;
export class FindScenesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindScenesQuery, FindScenesVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindScenesQuery, FindScenesVariables>
        query={FindScenesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindScenesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindScenesQuery, FindScenesVariables>
> &
  TChildProps;
export function FindScenesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindScenesQuery,
        FindScenesVariables,
        FindScenesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindScenesQuery,
    FindScenesVariables,
    FindScenesProps<TChildProps>
  >(FindScenesDocument, operationOptions);
}
export const FindSceneDocument = gql`
  query FindScene($id: ID!, $checksum: String) {
    findScene(id: $id, checksum: $checksum) {
      ...SceneData
    }
    sceneMarkerTags(scene_id: $id) {
      tag {
        id
        name
      }
      scene_markers {
        ...SceneMarkerData
      }
    }
  }

  ${SceneDataFragmentDoc}
  ${SceneMarkerDataFragmentDoc}
`;
export class FindSceneComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindSceneQuery, FindSceneVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindSceneQuery, FindSceneVariables>
        query={FindSceneDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindSceneProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindSceneQuery, FindSceneVariables>
> &
  TChildProps;
export function FindSceneHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindSceneQuery,
        FindSceneVariables,
        FindSceneProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindSceneQuery,
    FindSceneVariables,
    FindSceneProps<TChildProps>
  >(FindSceneDocument, operationOptions);
}
export const FindSceneForEditingDocument = gql`
  query FindSceneForEditing($id: ID) {
    findScene(id: $id) {
      ...SceneData
    }
    allPerformers {
      id
      name
      birthdate
      image_path
    }
    allTags {
      id
      name
    }
    allStudios {
      id
      name
    }
    validGalleriesForScene(scene_id: $id) {
      id
      path
    }
  }

  ${SceneDataFragmentDoc}
`;
export class FindSceneForEditingComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      FindSceneForEditingQuery,
      FindSceneForEditingVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<FindSceneForEditingQuery, FindSceneForEditingVariables>
        query={FindSceneForEditingDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindSceneForEditingProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindSceneForEditingQuery, FindSceneForEditingVariables>
> &
  TChildProps;
export function FindSceneForEditingHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindSceneForEditingQuery,
        FindSceneForEditingVariables,
        FindSceneForEditingProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindSceneForEditingQuery,
    FindSceneForEditingVariables,
    FindSceneForEditingProps<TChildProps>
  >(FindSceneForEditingDocument, operationOptions);
}
export const FindSceneMarkersDocument = gql`
  query FindSceneMarkers(
    $filter: FindFilterType
    $scene_marker_filter: SceneMarkerFilterType
  ) {
    findSceneMarkers(
      filter: $filter
      scene_marker_filter: $scene_marker_filter
    ) {
      count
      scene_markers {
        ...SceneMarkerData
      }
    }
  }

  ${SceneMarkerDataFragmentDoc}
`;
export class FindSceneMarkersComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<FindSceneMarkersQuery, FindSceneMarkersVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<FindSceneMarkersQuery, FindSceneMarkersVariables>
        query={FindSceneMarkersDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindSceneMarkersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindSceneMarkersQuery, FindSceneMarkersVariables>
> &
  TChildProps;
export function FindSceneMarkersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindSceneMarkersQuery,
        FindSceneMarkersVariables,
        FindSceneMarkersProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindSceneMarkersQuery,
    FindSceneMarkersVariables,
    FindSceneMarkersProps<TChildProps>
  >(FindSceneMarkersDocument, operationOptions);
}
export const SceneWallDocument = gql`
  query SceneWall($q: String) {
    sceneWall(q: $q) {
      ...SceneData
    }
  }

  ${SceneDataFragmentDoc}
`;
export class SceneWallComponent extends React.Component<
  Partial<ReactApollo.QueryProps<SceneWallQuery, SceneWallVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<SceneWallQuery, SceneWallVariables>
        query={SceneWallDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SceneWallProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<SceneWallQuery, SceneWallVariables>
> &
  TChildProps;
export function SceneWallHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SceneWallQuery,
        SceneWallVariables,
        SceneWallProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SceneWallQuery,
    SceneWallVariables,
    SceneWallProps<TChildProps>
  >(SceneWallDocument, operationOptions);
}
export const MarkerWallDocument = gql`
  query MarkerWall($q: String) {
    markerWall(q: $q) {
      ...SceneMarkerData
    }
  }

  ${SceneMarkerDataFragmentDoc}
`;
export class MarkerWallComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MarkerWallQuery, MarkerWallVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MarkerWallQuery, MarkerWallVariables>
        query={MarkerWallDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MarkerWallProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MarkerWallQuery, MarkerWallVariables>
> &
  TChildProps;
export function MarkerWallHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MarkerWallQuery,
        MarkerWallVariables,
        MarkerWallProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MarkerWallQuery,
    MarkerWallVariables,
    MarkerWallProps<TChildProps>
  >(MarkerWallDocument, operationOptions);
}
export const FindPerformersDocument = gql`
  query FindPerformers(
    $filter: FindFilterType
    $performer_filter: PerformerFilterType
  ) {
    findPerformers(filter: $filter, performer_filter: $performer_filter) {
      count
      performers {
        ...PerformerData
      }
    }
  }

  ${PerformerDataFragmentDoc}
`;
export class FindPerformersComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindPerformersQuery, FindPerformersVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindPerformersQuery, FindPerformersVariables>
        query={FindPerformersDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindPerformersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindPerformersQuery, FindPerformersVariables>
> &
  TChildProps;
export function FindPerformersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindPerformersQuery,
        FindPerformersVariables,
        FindPerformersProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindPerformersQuery,
    FindPerformersVariables,
    FindPerformersProps<TChildProps>
  >(FindPerformersDocument, operationOptions);
}
export const FindPerformerDocument = gql`
  query FindPerformer($id: ID!) {
    findPerformer(id: $id) {
      ...PerformerData
    }
  }

  ${PerformerDataFragmentDoc}
`;
export class FindPerformerComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindPerformerQuery, FindPerformerVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindPerformerQuery, FindPerformerVariables>
        query={FindPerformerDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindPerformerProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindPerformerQuery, FindPerformerVariables>
> &
  TChildProps;
export function FindPerformerHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindPerformerQuery,
        FindPerformerVariables,
        FindPerformerProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindPerformerQuery,
    FindPerformerVariables,
    FindPerformerProps<TChildProps>
  >(FindPerformerDocument, operationOptions);
}
export const FindStudiosDocument = gql`
  query FindStudios($filter: FindFilterType) {
    findStudios(filter: $filter) {
      count
      studios {
        ...StudioData
      }
    }
  }

  ${StudioDataFragmentDoc}
`;
export class FindStudiosComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindStudiosQuery, FindStudiosVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindStudiosQuery, FindStudiosVariables>
        query={FindStudiosDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindStudiosProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindStudiosQuery, FindStudiosVariables>
> &
  TChildProps;
export function FindStudiosHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindStudiosQuery,
        FindStudiosVariables,
        FindStudiosProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindStudiosQuery,
    FindStudiosVariables,
    FindStudiosProps<TChildProps>
  >(FindStudiosDocument, operationOptions);
}
export const FindStudioDocument = gql`
  query FindStudio($id: ID!) {
    findStudio(id: $id) {
      ...StudioData
    }
  }

  ${StudioDataFragmentDoc}
`;
export class FindStudioComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindStudioQuery, FindStudioVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindStudioQuery, FindStudioVariables>
        query={FindStudioDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindStudioProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindStudioQuery, FindStudioVariables>
> &
  TChildProps;
export function FindStudioHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindStudioQuery,
        FindStudioVariables,
        FindStudioProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindStudioQuery,
    FindStudioVariables,
    FindStudioProps<TChildProps>
  >(FindStudioDocument, operationOptions);
}
export const FindGalleriesDocument = gql`
  query FindGalleries($filter: FindFilterType) {
    findGalleries(filter: $filter) {
      count
      galleries {
        ...GalleryData
      }
    }
  }

  ${GalleryDataFragmentDoc}
`;
export class FindGalleriesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindGalleriesQuery, FindGalleriesVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindGalleriesQuery, FindGalleriesVariables>
        query={FindGalleriesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindGalleriesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindGalleriesQuery, FindGalleriesVariables>
> &
  TChildProps;
export function FindGalleriesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindGalleriesQuery,
        FindGalleriesVariables,
        FindGalleriesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindGalleriesQuery,
    FindGalleriesVariables,
    FindGalleriesProps<TChildProps>
  >(FindGalleriesDocument, operationOptions);
}
export const FindGalleryDocument = gql`
  query FindGallery($id: ID!) {
    findGallery(id: $id) {
      ...GalleryData
    }
  }

  ${GalleryDataFragmentDoc}
`;
export class FindGalleryComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindGalleryQuery, FindGalleryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindGalleryQuery, FindGalleryVariables>
        query={FindGalleryDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindGalleryProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindGalleryQuery, FindGalleryVariables>
> &
  TChildProps;
export function FindGalleryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindGalleryQuery,
        FindGalleryVariables,
        FindGalleryProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindGalleryQuery,
    FindGalleryVariables,
    FindGalleryProps<TChildProps>
  >(FindGalleryDocument, operationOptions);
}
export const FindTagDocument = gql`
  query FindTag($id: ID!) {
    findTag(id: $id) {
      ...TagData
    }
  }

  ${TagDataFragmentDoc}
`;
export class FindTagComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindTagQuery, FindTagVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindTagQuery, FindTagVariables>
        query={FindTagDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindTagProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindTagQuery, FindTagVariables>
> &
  TChildProps;
export function FindTagHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindTagQuery,
        FindTagVariables,
        FindTagProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindTagQuery,
    FindTagVariables,
    FindTagProps<TChildProps>
  >(FindTagDocument, operationOptions);
}
export const MarkerStringsDocument = gql`
  query MarkerStrings($q: String, $sort: String) {
    markerStrings(q: $q, sort: $sort) {
      id
      count
      title
    }
  }
`;
export class MarkerStringsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MarkerStringsQuery, MarkerStringsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MarkerStringsQuery, MarkerStringsVariables>
        query={MarkerStringsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MarkerStringsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MarkerStringsQuery, MarkerStringsVariables>
> &
  TChildProps;
export function MarkerStringsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MarkerStringsQuery,
        MarkerStringsVariables,
        MarkerStringsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MarkerStringsQuery,
    MarkerStringsVariables,
    MarkerStringsProps<TChildProps>
  >(MarkerStringsDocument, operationOptions);
}
export const ScrapeFreeonesDocument = gql`
  query ScrapeFreeones($performer_name: String!) {
    scrapeFreeones(performer_name: $performer_name) {
      name
      url
      twitter
      instagram
      birthdate
      ethnicity
      country
      eye_color
      height
      measurements
      fake_tits
      career_length
      tattoos
      piercings
      aliases
    }
  }
`;
export class ScrapeFreeonesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ScrapeFreeonesQuery, ScrapeFreeonesVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ScrapeFreeonesQuery, ScrapeFreeonesVariables>
        query={ScrapeFreeonesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ScrapeFreeonesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<ScrapeFreeonesQuery, ScrapeFreeonesVariables>
> &
  TChildProps;
export function ScrapeFreeonesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ScrapeFreeonesQuery,
        ScrapeFreeonesVariables,
        ScrapeFreeonesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ScrapeFreeonesQuery,
    ScrapeFreeonesVariables,
    ScrapeFreeonesProps<TChildProps>
  >(ScrapeFreeonesDocument, operationOptions);
}
export const ScrapeFreeonesPerformersDocument = gql`
  query ScrapeFreeonesPerformers($q: String!) {
    scrapeFreeonesPerformerList(query: $q)
  }
`;
export class ScrapeFreeonesPerformersComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      ScrapeFreeonesPerformersQuery,
      ScrapeFreeonesPerformersVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        ScrapeFreeonesPerformersQuery,
        ScrapeFreeonesPerformersVariables
      >
        query={ScrapeFreeonesPerformersDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ScrapeFreeonesPerformersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    ScrapeFreeonesPerformersQuery,
    ScrapeFreeonesPerformersVariables
  >
> &
  TChildProps;
export function ScrapeFreeonesPerformersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ScrapeFreeonesPerformersQuery,
        ScrapeFreeonesPerformersVariables,
        ScrapeFreeonesPerformersProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ScrapeFreeonesPerformersQuery,
    ScrapeFreeonesPerformersVariables,
    ScrapeFreeonesPerformersProps<TChildProps>
  >(ScrapeFreeonesPerformersDocument, operationOptions);
}
export const AllTagsDocument = gql`
  query AllTags {
    allTags {
      ...TagData
    }
  }

  ${TagDataFragmentDoc}
`;
export class AllTagsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<AllTagsQuery, AllTagsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<AllTagsQuery, AllTagsVariables>
        query={AllTagsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AllTagsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<AllTagsQuery, AllTagsVariables>
> &
  TChildProps;
export function AllTagsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AllTagsQuery,
        AllTagsVariables,
        AllTagsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AllTagsQuery,
    AllTagsVariables,
    AllTagsProps<TChildProps>
  >(AllTagsDocument, operationOptions);
}
export const AllPerformersForFilterDocument = gql`
  query AllPerformersForFilter {
    allPerformers {
      ...SlimPerformerData
    }
  }

  ${SlimPerformerDataFragmentDoc}
`;
export class AllPerformersForFilterComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      AllPerformersForFilterQuery,
      AllPerformersForFilterVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        AllPerformersForFilterQuery,
        AllPerformersForFilterVariables
      >
        query={AllPerformersForFilterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AllPerformersForFilterProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    AllPerformersForFilterQuery,
    AllPerformersForFilterVariables
  >
> &
  TChildProps;
export function AllPerformersForFilterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AllPerformersForFilterQuery,
        AllPerformersForFilterVariables,
        AllPerformersForFilterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AllPerformersForFilterQuery,
    AllPerformersForFilterVariables,
    AllPerformersForFilterProps<TChildProps>
  >(AllPerformersForFilterDocument, operationOptions);
}
export const AllTagsForFilterDocument = gql`
  query AllTagsForFilter {
    allTags {
      id
      name
    }
  }
`;
export class AllTagsForFilterComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<AllTagsForFilterQuery, AllTagsForFilterVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<AllTagsForFilterQuery, AllTagsForFilterVariables>
        query={AllTagsForFilterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AllTagsForFilterProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<AllTagsForFilterQuery, AllTagsForFilterVariables>
> &
  TChildProps;
export function AllTagsForFilterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AllTagsForFilterQuery,
        AllTagsForFilterVariables,
        AllTagsForFilterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AllTagsForFilterQuery,
    AllTagsForFilterVariables,
    AllTagsForFilterProps<TChildProps>
  >(AllTagsForFilterDocument, operationOptions);
}
export const StatsDocument = gql`
  query Stats {
    stats {
      scene_count
      gallery_count
      performer_count
      studio_count
      tag_count
    }
  }
`;
export class StatsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<StatsQuery, StatsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<StatsQuery, StatsVariables>
        query={StatsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type StatsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<StatsQuery, StatsVariables>
> &
  TChildProps;
export function StatsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        StatsQuery,
        StatsVariables,
        StatsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    StatsQuery,
    StatsVariables,
    StatsProps<TChildProps>
  >(StatsDocument, operationOptions);
}
export const SceneUpdateDocument = gql`
  mutation SceneUpdate(
    $id: ID!
    $title: String
    $details: String
    $url: String
    $date: String
    $rating: Int
    $studio_id: ID
    $gallery_id: ID
    $performer_ids: [ID!] = []
    $tag_ids: [ID!] = []
  ) {
    sceneUpdate(
      input: {
        id: $id
        title: $title
        details: $details
        url: $url
        date: $date
        rating: $rating
        studio_id: $studio_id
        gallery_id: $gallery_id
        performer_ids: $performer_ids
        tag_ids: $tag_ids
      }
    ) {
      ...SceneData
    }
  }

  ${SceneDataFragmentDoc}
`;
export class SceneUpdateComponent extends React.Component<
  Partial<ReactApollo.MutationProps<SceneUpdateMutation, SceneUpdateVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<SceneUpdateMutation, SceneUpdateVariables>
        mutation={SceneUpdateDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SceneUpdateProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<SceneUpdateMutation, SceneUpdateVariables>
> &
  TChildProps;
export type SceneUpdateMutationFn = ReactApollo.MutationFn<
  SceneUpdateMutation,
  SceneUpdateVariables
>;
export function SceneUpdateHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SceneUpdateMutation,
        SceneUpdateVariables,
        SceneUpdateProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SceneUpdateMutation,
    SceneUpdateVariables,
    SceneUpdateProps<TChildProps>
  >(SceneUpdateDocument, operationOptions);
}
export const PerformerCreateDocument = gql`
  mutation PerformerCreate(
    $name: String
    $url: String
    $birthdate: String
    $ethnicity: String
    $country: String
    $eye_color: String
    $height: String
    $measurements: String
    $fake_tits: String
    $career_length: String
    $tattoos: String
    $piercings: String
    $aliases: String
    $twitter: String
    $instagram: String
    $favorite: Boolean
    $image: String!
  ) {
    performerCreate(
      input: {
        name: $name
        url: $url
        birthdate: $birthdate
        ethnicity: $ethnicity
        country: $country
        eye_color: $eye_color
        height: $height
        measurements: $measurements
        fake_tits: $fake_tits
        career_length: $career_length
        tattoos: $tattoos
        piercings: $piercings
        aliases: $aliases
        twitter: $twitter
        instagram: $instagram
        favorite: $favorite
        image: $image
      }
    ) {
      ...PerformerData
    }
  }

  ${PerformerDataFragmentDoc}
`;
export class PerformerCreateComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<PerformerCreateMutation, PerformerCreateVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<PerformerCreateMutation, PerformerCreateVariables>
        mutation={PerformerCreateDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type PerformerCreateProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<PerformerCreateMutation, PerformerCreateVariables>
> &
  TChildProps;
export type PerformerCreateMutationFn = ReactApollo.MutationFn<
  PerformerCreateMutation,
  PerformerCreateVariables
>;
export function PerformerCreateHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        PerformerCreateMutation,
        PerformerCreateVariables,
        PerformerCreateProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    PerformerCreateMutation,
    PerformerCreateVariables,
    PerformerCreateProps<TChildProps>
  >(PerformerCreateDocument, operationOptions);
}
export const PerformerUpdateDocument = gql`
  mutation PerformerUpdate(
    $id: ID!
    $name: String
    $url: String
    $birthdate: String
    $ethnicity: String
    $country: String
    $eye_color: String
    $height: String
    $measurements: String
    $fake_tits: String
    $career_length: String
    $tattoos: String
    $piercings: String
    $aliases: String
    $twitter: String
    $instagram: String
    $favorite: Boolean
    $image: String
  ) {
    performerUpdate(
      input: {
        id: $id
        name: $name
        url: $url
        birthdate: $birthdate
        ethnicity: $ethnicity
        country: $country
        eye_color: $eye_color
        height: $height
        measurements: $measurements
        fake_tits: $fake_tits
        career_length: $career_length
        tattoos: $tattoos
        piercings: $piercings
        aliases: $aliases
        twitter: $twitter
        instagram: $instagram
        favorite: $favorite
        image: $image
      }
    ) {
      ...PerformerData
    }
  }

  ${PerformerDataFragmentDoc}
`;
export class PerformerUpdateComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<PerformerUpdateMutation, PerformerUpdateVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<PerformerUpdateMutation, PerformerUpdateVariables>
        mutation={PerformerUpdateDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type PerformerUpdateProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<PerformerUpdateMutation, PerformerUpdateVariables>
> &
  TChildProps;
export type PerformerUpdateMutationFn = ReactApollo.MutationFn<
  PerformerUpdateMutation,
  PerformerUpdateVariables
>;
export function PerformerUpdateHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        PerformerUpdateMutation,
        PerformerUpdateVariables,
        PerformerUpdateProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    PerformerUpdateMutation,
    PerformerUpdateVariables,
    PerformerUpdateProps<TChildProps>
  >(PerformerUpdateDocument, operationOptions);
}
export const StudioCreateDocument = gql`
  mutation StudioCreate($name: String!, $url: String, $image: String!) {
    studioCreate(input: { name: $name, url: $url, image: $image }) {
      ...StudioData
    }
  }

  ${StudioDataFragmentDoc}
`;
export class StudioCreateComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<StudioCreateMutation, StudioCreateVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<StudioCreateMutation, StudioCreateVariables>
        mutation={StudioCreateDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type StudioCreateProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<StudioCreateMutation, StudioCreateVariables>
> &
  TChildProps;
export type StudioCreateMutationFn = ReactApollo.MutationFn<
  StudioCreateMutation,
  StudioCreateVariables
>;
export function StudioCreateHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        StudioCreateMutation,
        StudioCreateVariables,
        StudioCreateProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    StudioCreateMutation,
    StudioCreateVariables,
    StudioCreateProps<TChildProps>
  >(StudioCreateDocument, operationOptions);
}
export const StudioUpdateDocument = gql`
  mutation StudioUpdate($id: ID!, $name: String, $url: String, $image: String) {
    studioUpdate(input: { id: $id, name: $name, url: $url, image: $image }) {
      ...StudioData
    }
  }

  ${StudioDataFragmentDoc}
`;
export class StudioUpdateComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<StudioUpdateMutation, StudioUpdateVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<StudioUpdateMutation, StudioUpdateVariables>
        mutation={StudioUpdateDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type StudioUpdateProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<StudioUpdateMutation, StudioUpdateVariables>
> &
  TChildProps;
export type StudioUpdateMutationFn = ReactApollo.MutationFn<
  StudioUpdateMutation,
  StudioUpdateVariables
>;
export function StudioUpdateHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        StudioUpdateMutation,
        StudioUpdateVariables,
        StudioUpdateProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    StudioUpdateMutation,
    StudioUpdateVariables,
    StudioUpdateProps<TChildProps>
  >(StudioUpdateDocument, operationOptions);
}
export const TagCreateDocument = gql`
  mutation TagCreate($name: String!) {
    tagCreate(input: { name: $name }) {
      ...TagData
    }
  }

  ${TagDataFragmentDoc}
`;
export class TagCreateComponent extends React.Component<
  Partial<ReactApollo.MutationProps<TagCreateMutation, TagCreateVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<TagCreateMutation, TagCreateVariables>
        mutation={TagCreateDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type TagCreateProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<TagCreateMutation, TagCreateVariables>
> &
  TChildProps;
export type TagCreateMutationFn = ReactApollo.MutationFn<
  TagCreateMutation,
  TagCreateVariables
>;
export function TagCreateHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        TagCreateMutation,
        TagCreateVariables,
        TagCreateProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    TagCreateMutation,
    TagCreateVariables,
    TagCreateProps<TChildProps>
  >(TagCreateDocument, operationOptions);
}
export const TagDestroyDocument = gql`
  mutation TagDestroy($id: ID!) {
    tagDestroy(input: { id: $id })
  }
`;
export class TagDestroyComponent extends React.Component<
  Partial<ReactApollo.MutationProps<TagDestroyMutation, TagDestroyVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<TagDestroyMutation, TagDestroyVariables>
        mutation={TagDestroyDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type TagDestroyProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<TagDestroyMutation, TagDestroyVariables>
> &
  TChildProps;
export type TagDestroyMutationFn = ReactApollo.MutationFn<
  TagDestroyMutation,
  TagDestroyVariables
>;
export function TagDestroyHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        TagDestroyMutation,
        TagDestroyVariables,
        TagDestroyProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    TagDestroyMutation,
    TagDestroyVariables,
    TagDestroyProps<TChildProps>
  >(TagDestroyDocument, operationOptions);
}
export const TagUpdateDocument = gql`
  mutation TagUpdate($id: ID!, $name: String!) {
    tagUpdate(input: { id: $id, name: $name }) {
      ...TagData
    }
  }

  ${TagDataFragmentDoc}
`;
export class TagUpdateComponent extends React.Component<
  Partial<ReactApollo.MutationProps<TagUpdateMutation, TagUpdateVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<TagUpdateMutation, TagUpdateVariables>
        mutation={TagUpdateDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type TagUpdateProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<TagUpdateMutation, TagUpdateVariables>
> &
  TChildProps;
export type TagUpdateMutationFn = ReactApollo.MutationFn<
  TagUpdateMutation,
  TagUpdateVariables
>;
export function TagUpdateHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        TagUpdateMutation,
        TagUpdateVariables,
        TagUpdateProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    TagUpdateMutation,
    TagUpdateVariables,
    TagUpdateProps<TChildProps>
  >(TagUpdateDocument, operationOptions);
}
export const SceneMarkerCreateDocument = gql`
  mutation SceneMarkerCreate(
    $title: String!
    $seconds: Float!
    $scene_id: ID!
    $primary_tag_id: ID!
    $tag_ids: [ID!] = []
  ) {
    sceneMarkerCreate(
      input: {
        title: $title
        seconds: $seconds
        scene_id: $scene_id
        primary_tag_id: $primary_tag_id
        tag_ids: $tag_ids
      }
    ) {
      ...SceneMarkerData
    }
  }

  ${SceneMarkerDataFragmentDoc}
`;
export class SceneMarkerCreateComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      SceneMarkerCreateMutation,
      SceneMarkerCreateVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        SceneMarkerCreateMutation,
        SceneMarkerCreateVariables
      >
        mutation={SceneMarkerCreateDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SceneMarkerCreateProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<SceneMarkerCreateMutation, SceneMarkerCreateVariables>
> &
  TChildProps;
export type SceneMarkerCreateMutationFn = ReactApollo.MutationFn<
  SceneMarkerCreateMutation,
  SceneMarkerCreateVariables
>;
export function SceneMarkerCreateHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SceneMarkerCreateMutation,
        SceneMarkerCreateVariables,
        SceneMarkerCreateProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SceneMarkerCreateMutation,
    SceneMarkerCreateVariables,
    SceneMarkerCreateProps<TChildProps>
  >(SceneMarkerCreateDocument, operationOptions);
}
export const SceneMarkerUpdateDocument = gql`
  mutation SceneMarkerUpdate(
    $id: ID!
    $title: String!
    $seconds: Float!
    $scene_id: ID!
    $primary_tag_id: ID!
    $tag_ids: [ID!] = []
  ) {
    sceneMarkerUpdate(
      input: {
        id: $id
        title: $title
        seconds: $seconds
        scene_id: $scene_id
        primary_tag_id: $primary_tag_id
        tag_ids: $tag_ids
      }
    ) {
      ...SceneMarkerData
    }
  }

  ${SceneMarkerDataFragmentDoc}
`;
export class SceneMarkerUpdateComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      SceneMarkerUpdateMutation,
      SceneMarkerUpdateVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        SceneMarkerUpdateMutation,
        SceneMarkerUpdateVariables
      >
        mutation={SceneMarkerUpdateDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SceneMarkerUpdateProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<SceneMarkerUpdateMutation, SceneMarkerUpdateVariables>
> &
  TChildProps;
export type SceneMarkerUpdateMutationFn = ReactApollo.MutationFn<
  SceneMarkerUpdateMutation,
  SceneMarkerUpdateVariables
>;
export function SceneMarkerUpdateHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SceneMarkerUpdateMutation,
        SceneMarkerUpdateVariables,
        SceneMarkerUpdateProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SceneMarkerUpdateMutation,
    SceneMarkerUpdateVariables,
    SceneMarkerUpdateProps<TChildProps>
  >(SceneMarkerUpdateDocument, operationOptions);
}
export const SceneMarkerDestroyDocument = gql`
  mutation SceneMarkerDestroy($id: ID!) {
    sceneMarkerDestroy(id: $id)
  }
`;
export class SceneMarkerDestroyComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      SceneMarkerDestroyMutation,
      SceneMarkerDestroyVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        SceneMarkerDestroyMutation,
        SceneMarkerDestroyVariables
      >
        mutation={SceneMarkerDestroyDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SceneMarkerDestroyProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    SceneMarkerDestroyMutation,
    SceneMarkerDestroyVariables
  >
> &
  TChildProps;
export type SceneMarkerDestroyMutationFn = ReactApollo.MutationFn<
  SceneMarkerDestroyMutation,
  SceneMarkerDestroyVariables
>;
export function SceneMarkerDestroyHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SceneMarkerDestroyMutation,
        SceneMarkerDestroyVariables,
        SceneMarkerDestroyProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SceneMarkerDestroyMutation,
    SceneMarkerDestroyVariables,
    SceneMarkerDestroyProps<TChildProps>
  >(SceneMarkerDestroyDocument, operationOptions);
}
export const MetadataImportDocument = gql`
  query MetadataImport {
    metadataImport
  }
`;
export class MetadataImportComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MetadataImportQuery, MetadataImportVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MetadataImportQuery, MetadataImportVariables>
        query={MetadataImportDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MetadataImportProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MetadataImportQuery, MetadataImportVariables>
> &
  TChildProps;
export function MetadataImportHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MetadataImportQuery,
        MetadataImportVariables,
        MetadataImportProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MetadataImportQuery,
    MetadataImportVariables,
    MetadataImportProps<TChildProps>
  >(MetadataImportDocument, operationOptions);
}
export const MetadataExportDocument = gql`
  query MetadataExport {
    metadataExport
  }
`;
export class MetadataExportComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MetadataExportQuery, MetadataExportVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MetadataExportQuery, MetadataExportVariables>
        query={MetadataExportDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MetadataExportProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MetadataExportQuery, MetadataExportVariables>
> &
  TChildProps;
export function MetadataExportHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MetadataExportQuery,
        MetadataExportVariables,
        MetadataExportProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MetadataExportQuery,
    MetadataExportVariables,
    MetadataExportProps<TChildProps>
  >(MetadataExportDocument, operationOptions);
}
export const MetadataScanDocument = gql`
  query MetadataScan {
    metadataScan
  }
`;
export class MetadataScanComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MetadataScanQuery, MetadataScanVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MetadataScanQuery, MetadataScanVariables>
        query={MetadataScanDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MetadataScanProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MetadataScanQuery, MetadataScanVariables>
> &
  TChildProps;
export function MetadataScanHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MetadataScanQuery,
        MetadataScanVariables,
        MetadataScanProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MetadataScanQuery,
    MetadataScanVariables,
    MetadataScanProps<TChildProps>
  >(MetadataScanDocument, operationOptions);
}
export const MetadataGenerateDocument = gql`
  query MetadataGenerate {
    metadataGenerate
  }
`;
export class MetadataGenerateComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<MetadataGenerateQuery, MetadataGenerateVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<MetadataGenerateQuery, MetadataGenerateVariables>
        query={MetadataGenerateDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MetadataGenerateProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MetadataGenerateQuery, MetadataGenerateVariables>
> &
  TChildProps;
export function MetadataGenerateHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MetadataGenerateQuery,
        MetadataGenerateVariables,
        MetadataGenerateProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MetadataGenerateQuery,
    MetadataGenerateVariables,
    MetadataGenerateProps<TChildProps>
  >(MetadataGenerateDocument, operationOptions);
}
export const MetadataCleanDocument = gql`
  query MetadataClean {
    metadataClean
  }
`;
export class MetadataCleanComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MetadataCleanQuery, MetadataCleanVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MetadataCleanQuery, MetadataCleanVariables>
        query={MetadataCleanDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MetadataCleanProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MetadataCleanQuery, MetadataCleanVariables>
> &
  TChildProps;
export function MetadataCleanHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MetadataCleanQuery,
        MetadataCleanVariables,
        MetadataCleanProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MetadataCleanQuery,
    MetadataCleanVariables,
    MetadataCleanProps<TChildProps>
  >(MetadataCleanDocument, operationOptions);
}
export const MetadataUpdateDocument = gql`
  subscription MetadataUpdate {
    metadataUpdate
  }
`;
export class MetadataUpdateComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<
      MetadataUpdateSubscription,
      MetadataUpdateVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<
        MetadataUpdateSubscription,
        MetadataUpdateVariables
      >
        subscription={MetadataUpdateDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MetadataUpdateProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MetadataUpdateSubscription, MetadataUpdateVariables>
> &
  TChildProps;
export function MetadataUpdateHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MetadataUpdateSubscription,
        MetadataUpdateVariables,
        MetadataUpdateProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MetadataUpdateSubscription,
    MetadataUpdateVariables,
    MetadataUpdateProps<TChildProps>
  >(MetadataUpdateDocument, operationOptions);
}
