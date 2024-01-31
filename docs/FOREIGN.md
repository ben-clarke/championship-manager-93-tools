# Foreign players

> When the seagulls follow the trawler, it is because they think sardines will be thrown into the sea. Thank you.
>
> -- <cite>Eric Cantona</cite>

The following document includes information regarding the `FOREIGN.DAT` file. It directly maps to the Foreign players list in the game.

The `.dat` file represented using Hex numbering and in most cases each 2 digit combination of numbers represents a piece of information related to the player, the exceptions being the `first name` (1st and 2nd column) and `surname` (3rd and 4th column), which are both represented by 4 digits instead.

It contains all the domestic players in the game and very similar to the `LEAGUE.DAT` file. With the differences being:

- There an additional `club` column in the league data. This the `6th` column in the foreign data
- The domestic players are grouped by the club they are assigned to, with the team separator being `0bb8`, this in not present in this file.

### Column representation

| Column(s) | Player data      | Notes                                               |
| --------- | ---------------- | --------------------------------------------------- |
| 1 and 2   | First name       | See mapping for [First name](./CODES.md), although editing relevant `CMEXE` file can change this |
| 3 and 4   | Surname          | See mapping for [Surname](./CODES.md), although editing relevant `CMEXE` file can change this    |
| 5         | Transfer status  | `00` = available, `01` = not for sale               |
| 6         | Club             | See mapping for [Foreign club](./CODES.md)          |
| 7         | Injury status    | `00` = fit, `01` = injured                          |
| 8         | GK               | `00` = no, `01` = yes                               |
| 9         | DEF              | `00` = no, `01` = yes                               |
| 10        | MID              | `00` = no, `01` = yes                               |
| 11        | ATT              | `00` = no, `01` = yes                               |
| 12        | Left sided       | `00` = no, `01` = yes                               |
| 13        | Right sided      | `00` = no, `01` = yes                               |
| 14        | Central          | `00` = no, `01` = yes                               |
| 15        | Age              | Hex representation of decimal number, eg. `29 = 1d` |
| 16        | Character        | See mapping for [Character](./CODES.md), although editing relevant `CMEXE` file can change this   |
| 17        | Nationality      | See mapping for [Nationality](./CODES.md), although editing relevant `CMEXE` file can change this |
| 18        | Current skill    | Max 200 in Hex representation                       |
| 19        | Passing          | Out of 20, `ff` to randomise                        |
| 20        | Tackling         | Out of 20, `ff` to randomise                        |
| 21        | Pace             | Out of 20, `ff` to randomise                        |
| 22        | Heading          | Out of 20, `ff` to randomise                        |
| 23        | Flair            | Out of 20, `ff` to randomise                        |
| 24        | Creativity       | Out of 20, `ff` to randomise                        |
| 25        | Goalscoring      | Out of 20, `ff` to randomise                        |
| 26        | Injury proneness | Out of 10  `ff` to randomise                        |
| 27        | Potential        | Max 200 in Hex representation                       |
| 28        | Agility          | Out of 20, `ff` to randomise                        |
| 29        | Aggression       | Out of 20, `ff` to randomise                        |
| 30        | Influence        | Out of 20, `ff` to randomise                        |
| 31        | Temperament      | Out of 20, `ff` to randomise                        |
| 32        | Consistency      | Out of 20, `ff` to randomise                        |
| 33        | Stamina          | Out of 20, `ff` to randomise                        |

Then from column `34` until the end of player code (`ff`) is the player history that repeats in the same 4 column format until there is no more history. Note, a player does not need any history.

| Column | Historic data | Notes                                               |
| ------ | --------------| --------------------------------------------------- |
| 1 (34) | Year          | Hex in final 2 character (`1993` -> `93` -> `5d`)   |
| 2 (35) | Club          | See mapping for [Nationality](./CODES.md), although editing relevant `CMEXE` file can change this |
| 3 (36) | Appearances   | Hex representation of decimal number, eg. `29 = 1d` |
| 4 (37) | Goals         | Hex representation of decimal number, eg. `29 = 1d` |
