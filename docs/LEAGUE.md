# Domestic players

> Judging by the shape of his face, he must have headed a lot of goals
>
> -- <cite>Harry Redknapp on Ian Dowie</cite>

The following document includes information regarding the `LEAGUE.DAT` file.

The `.dat` file represented using Hex numbering and in most cases each 2 digit combination of numbers represents a piece of information related to the player, the exceptions being the `first name` (1st and 2nd column) and `surname` (3rd and 4th column), which are both represented by 4 digits instead.

It contains all the domestic players in the game and very similar to the `FOREIGN.DAT` file. With the differences being:

- There no `club` column in the league data. This the `6th` column in the foreign data
- The players are grouped by the club they are assigned to, with the team separator being `0bb8`, which marks the end of the players from one team and the start of the next team.

As with the foreign players each player separated by a `ff`, which made slightly more complicated to parse the file due to `ff` also representing an random value in the player attributes section.

### Column representation

| Column(s) | Player data      | Notes                                               |
| --------- | ---------------- | --------------------------------------------------- |
| 1 and 2   | First name       | See mapping for [First name](./CODES.md), although editing relevant `CMEXE` file can change this |
| 3 and 4   | Surname          | See mapping for [Surname](./CODES.md), although editing relevant `CMEXE` file can change this    |
| 5         | Transfer status  | `00` = available, `01` = not for sale               |
| 6         | Injury status    | `00` = fit, `01` = injured                          |
| 7         | GK               | `00` = no, `01` = yes                               |
| 8         | DEF              | `00` = no, `01` = yes                               |
| 9         | MID              | `00` = no, `01` = yes                               |
| 10        | ATT              | `00` = no, `01` = yes                               |
| 11        | Right sided      | `00` = no, `01` = yes                               |
| 12        | Left sided       | `00` = no, `01` = yes                               |
| 13        | Central          | `00` = no, `01` = yes                               |
| 14        | Age              | Hex representation of decimal number, eg. `29 = 1d` |
| 15        | Character        | See mapping for [Character](./CODES.md), although editing relevant `CMEXE` file can change this   |
| 16        | Nationality      | See mapping for [Nationality](./CODES.md), although editing relevant `CMEXE` file can change this |
| 17        | Current skill    | Max 200 in Hex representation                       |
| 18        | Passing          | Out of 20, `ff` to randomise                        |
| 19        | Tackling         | Out of 20, `ff` to randomise                        |
| 20        | Pace             | Out of 20, `ff` to randomise                        |
| 21        | Heading          | Out of 20, `ff` to randomise                        |
| 22        | Flair            | Out of 20, `ff` to randomise                        |
| 23        | Creativity       | Out of 20, `ff` to randomise                        |
| 24        | Goalscoring      | Out of 20, `ff` to randomise                        |
| 25        | Injury proneness | Out of 10  `ff` to randomise                        |
| 26        | Potential        | Max 200 in Hex representation (`ff` is random)      |
| 27        | Agility          | Out of 20, `ff` to randomise                        |
| 28        | Aggression       | Out of 20, `ff` to randomise                        |
| 29        | Influence        | Out of 20, `ff` to randomise                        |
| 30        | Temperament      | Out of 20, `ff` to randomise                        |
| 31        | Consistency      | Out of 20, `ff` to randomise                        |
| 32        | Stamina          | Out of 20, `ff` to randomise                        |

Then from column `33` until the end of player code (`ff`) is the player history that repeats in the same 4 column format until there is no more history. Note, a player does not need any history.

| Column | Historic data | Notes                                               |
| ------ | --------------| --------------------------------------------------- |
| 1 (33) | Year          | Hex in final 2 character (`1993` -> `93` -> `5d`)   |
| 2 (34) | Club          | See mapping for [Domestic Clubs](./CODES.md), although editing relevant `CMEXE` file can change this |
| 3 (35) | Appearances   | Hex representation of decimal number, eg. `29 = 1d` |
| 4 (36) | Goals         | Hex representation of decimal number, eg. `29 = 1d` |
