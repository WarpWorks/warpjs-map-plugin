# @warp-works/warpjs-map-plugin

This plugin will display a relationship between entities. Let's imagine the
following simplified schema example:

- State
    - City
- Transport
    - TransportCompany
- Utility
    - UtilityCompany
- Price

One use would be to display the `Price` for a given `City` and
`TransportCompany`. Imagine the following fictive example:

For `State XYZ` and `Taxi`:

|            | City S | City SW | City N | City E |
|------------|--------|---------|--------|--------|
| Taxi South | X      | X       |        |        |
| Taxi North |        |         | X      |        |
| Taxi East  |        |         |        | X      |
| Taxi West  |        | X       |        |        |
| Taxi All   | X      | X       | X      | X      |


## Configuration

Add the following configuration section to your projects:

    {
      "plugins": [
        {
          "name": "@warp-works/warpjs-map-plugin",
          "path": "/map",
          "config": {
            "mapMarkerType": "Your-Map-Entity",
            "mapTypes": [
              "Default-Column-Type",
              "Default-Row-Type",
              "Alternative-Row-Type-1",
              "Alternative-Row-Type-2"
            ],
            "paginationSettings": {
              "xs": 3,
              "sm": 4,
              "md": 5,
              "lg": 5
            }
          }
        }
      ]
    }

- `mapMarkerType` is the entity name that is used has intersection between
  sub-columns and sub-rows.
- `mapTypes` are the entity names that are available as columns or rows. The
  first map type is used as the default column type, when none are defined. The
  second map type is used as the default row type, when none are defined. The
  logic is as follow:

    - If neither column nor row are defined, the first one is taken as column
      and the second one as row;
    - If column is defined but not the row, the first item in the `mapTypes`
      list that is not the column is used as the row.
    - If both column and row are defined, they will be used.

- The remaining map types will be used as alternative row options.

Each of these types must have a sub entity (an entity that the parent entity is
the given type).

## Exposed routes

This plugin exposes the following routes:

- `W2:plugin:map:main` To access the default map browser configuration.
- `W2:plugin:map:column` To access a specific entity as `column`.
- `W2:plugin:map:column-row` To access specific entities as `column` and `row`.
