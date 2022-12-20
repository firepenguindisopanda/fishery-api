# fishery-api
A fish selling company api to provide data about the fishes and fishermen and sales

## Database Tables

Fisherfolk table, Fish table, Caught, Sold

## Fisherfolk table attributes

Field Name | Datatype | Other Information
--- | --- | ---
fisherid | AutoNumber | Primary Key
firstname | string | field size: 100, required
lastname | string | field size: 100, required
home address | string | not required
phone | string | field size: 11, not required
username | string | field size: 20, required
email | string | required
password | string | required
status | enum | required

## Fish table attributes

Field Name | Datatype | Other Information
--- | --- | ---
FishId | AutoNumber | Primary Key
FishName | String | field size 200, required

## Fish Caught table attributes (Bridge Table)

Field Name | Datatype | Other Information
--- | --- | ---
CaughtId | AutoNumber | Primary Key
FishId | Integer | Foreign Key: fishid (Fish)
FisherId | Integer | Foreign Key: fisherId (Fishfolk)
Weight | Integer | required
DateCaught | Date/Time | Date, required

## Packages Installed

- npm install express sequelize pg pg-hstore body-parser cors jsonwebtoken bcryptjs --save
