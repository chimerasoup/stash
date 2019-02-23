import ApolloClient, { ApolloQueryResult } from "apollo-boost";
import * as GQL from "./generated-graphql";
import { ListFilterModel } from "../models/list-filter";

class StashService {
  private client: ApolloClient<{}>

  constructor() {
    this.client = new ApolloClient({
      uri: "http://192.168.1.200:9998/graphql"
    });
  }

  findScenes(filter: ListFilterModel): Promise<ApolloQueryResult<GQL.FindScenesQuery>> {
    let scene_filter = {};
    // if (!!filter && filter.criteriaFilterOpen) {
      scene_filter = filter.makeSceneFilter();
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
        scene_filter: scene_filter
      }
    })
  }

  findScene(id: string) {
    return this.client.query<GQL.FindSceneQuery, GQL.FindSceneVariables>({
      query: GQL.FindSceneDocument,
      variables: { id }
    })
  }

  getAllTagsForFilter() {
    return this.client.query<GQL.AllTagsForFilterQuery>({ query: GQL.AllTagsForFilterDocument })
  }

  getAllPerformersForFilter() {
    return this.client.query<GQL.AllPerformersForFilterQuery>({ query: GQL.AllPerformersForFilterDocument })
  }

  stats() {
    return this.client.query<GQL.StatsQuery>({ query: GQL.StatsDocument })
  }
}

const win = window as any
win.StashService = new StashService();

export function getStashService(): StashService {
  return (window as any).StashService;
}