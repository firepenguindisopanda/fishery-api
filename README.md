# fishery-api
A fish selling company api to provide data about the fishes and fishermen and sales

## Database Tables

Fisherfolk table, Fish table, Caught, Sold

## Fisherfolk table attributes

- fisherid - string
- firstname - string
- lastname - string
- home address - string
- phone - string
- username - string
- email - string
- password - string
- status - enum

## Fish table attributes

Field Name | Datatype | Other Information
--- | --- | ---
FishId | AutoNumber | Primary Key
FishName | String | field size 200, required

## Packages Installed

- npm install express sequelize pg pg-hstore body-parser cors jsonwebtoken bcryptjs --save
