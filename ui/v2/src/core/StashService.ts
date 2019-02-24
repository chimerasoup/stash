import ApolloClient, { ApolloQueryResult } from "apollo-boost";
import { ListFilterModel } from "../models/list-filter";
import * as GQL from "./generated-graphql";

class StashService {
  private client: ApolloClient<{}>;

  constructor() {
    this.client = new ApolloClient({
      uri: "http://192.168.1.200:9998/graphql",
    });
  }

  public findScenes(filter: ListFilterModel): Promise<ApolloQueryResult<GQL.FindScenesQuery>> {
    let sceneFilter = {};
    // if (!!filter && filter.criteriaFilterOpen) {
    sceneFilter = filter.makeSceneFilter();
    // }
    // if (filter.customCriteria) {
    //   filter.customCriteria.forEach(criteria => {
    //     scene_filter[criteria.key] = criteria.value;
    //   });
    // }

    return this.client.query<GQL.FindScenesQuery, GQL.FindScenesVariables>({
      query: GQL.FindScenesDocument,
      variables: {
        filter: filter.makeFindFilter(),
        scene_filter: sceneFilter,
      },
    });
  }

  public findScene(id: string) {
    return this.client.query<GQL.FindSceneQuery, GQL.FindSceneVariables>({
      query: GQL.FindSceneDocument,
      variables: { id },
    });
  }

  public getAllTagsForFilter() {
    return this.client.query<GQL.AllTagsForFilterQuery>({ query: GQL.AllTagsForFilterDocument });
  }

  public getAllPerformersForFilter() {
    return this.client.query<GQL.AllPerformersForFilterQuery>({ query: GQL.AllPerformersForFilterDocument });
  }

  public stats() {
    return this.client.query<GQL.StatsQuery>({ query: GQL.StatsDocument });
  }
}

const win = window as any;
win.StashService = new StashService();

export function getStashService(): StashService {
  return (window as any).StashService;
}
