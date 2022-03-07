import {
  InMemoryCache,
  defaultDataIdFromObject,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';

function dataIdFromObject(obj): string | null {
  switch (obj.__typename) {
    case 'UserSearch':
      return `UserSearch:${obj.type}:${obj.id}`;
    case 'EventStatsPlayerInstanceType':
      return `EventStatsPlayerInstanceType:${obj.nomination}${obj.id}`;
    case 'EventConfigColorsType':
      return `${Math.random()}`;
    case 'MatchGameStatsType':
      return `MatchGameStatsType:${obj.gameId}${obj.matchId}`;
    default:
      return defaultDataIdFromObject(obj);
  }
}
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'MatchGameStatsType',
          possibleTypes: [
            {
              name: 'MatchGameDOTA2StatsType',
            },
            {
              name: 'MatchGameCSGOStatsType',
            },
          ],
        },
        {
          kind: 'INTERFACE',
          name: 'TeamPlayerFantasyStats',
          possibleTypes: [
            {
              name: 'TeamPlayerFantasyCsgoStats',
            },
            {
              name: 'TeamPlayerFantasyDota2Stats',
            },
          ],
        },
        {
          kind: 'INTERFACE',
          name: 'EventFantasyTeamPlayerStats',
          possibleTypes: [
            {
              name: 'EventFantasyTeamPlayerCsgoStats',
            },
            {
              name: 'EventFantasyTeamPlayerDota2Stats',
            },
          ],
        },
        {
          kind: 'INTERFACE',
          name: 'PagedGlobalSearchResultType',
          possibleTypes: [
            {
              name: 'PagedEventBaseType',
            },
            {
              name: 'PagedMatchBaseType',
            },
            {
              name: 'PagedTournamentBaseType',
            },
            {
              name: 'PagedPostType',
            },
            {
              name: 'PagedTeamType',
            },
            {
              name: 'PagedTeamPlayerType',
            },
            {
              name: 'PagedQuizType',
            },
          ],
        },
      ],
    },
  },
});

export default function createCache(): unknown {
  return new InMemoryCache({
    dataIdFromObject,
    fragmentMatcher,
  });
}
