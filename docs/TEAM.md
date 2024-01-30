# Teams

The following document includes information regarding the `TEAM.DAT` file.

The `.dat` file represented using Hex numbering and in most cases each 2 digit combination of numbers represents a piece of information related to the team, the exceptions being:
 - the home colours, where both the text and background are represented by a single digit each (3rd column) **CM93 only**
 - the away colours, where both the text and background are represented by a single digit each (4th column) **CM93 only**
 - the `manager first name` (10th and 11th column), `manager surname` (12th and 13th column)
 - the `assistant first name` (18th and 19th column), `assistant surname` (20th and 21st column) which are both represented by 4 digits instead.

## Column representation

There are slight differences in the columns for each version of CM.

### CM93

| Column(s) | Team data             | Notes                                               |
| --------- | --------------------- | --------------------------------------------------- |
| 1         | Capacity             | Hex representation of decimal number, eg. `29 = 1d`, in thousands, so `29` is `29,000` |
| 2         | Seated capacity      | Hex representation of decimal number, eg. `29 = 1d`, in thousands, so `29` is `29,000` |
| 3         | Home colours         | Text and background colours, see [Colours](#Colours) |
| 4         | Away colours         | Text and background colours, see [Colours](#Colours) |
| 5         | Attractiveness       | The attractiveness of the team to players, see [Attractiveness](#Attractiveness)|
| 6         | **UNKNOWN**          | |
| 7         | Money                | Amount of money the team starts with, see [Money](#Money) |
| 8         | **UNKNOWN**          | |
| 9         | Board confidence     | Hex representation of decimal number, eg. `29 = 1d` which is then the percentage amount |
| 10 and 11 | Manager first name   | See mapping for [First name](./CODES.md), although editing relevant `CMEXE` |
| 12 and 13 | Manager surname      | See mapping for [First name](./CODES.md), although editing relevant `CMEXE` |
| 14        | Style of play        | |
| 15        | Formation            | |
| 16        | Manager reputation   | The reputation of the manager, see [Manager reputation](#Manager-reputation) |
| 17        | Manager character    | See mapping for [Character](./CODES.md) |
| 18 and 19 | Assistant first name | See mapping for [First name](./CODES.md), although editing relevant `CMEXE` |
| 20 and 21 | Assistant first name | See mapping for [First name](./CODES.md), although editing relevant `CMEXE` |

### CM94 (and EOS)

| Column(s) | Team data             | Notes                                               |
| --------- | --------------------- | --------------------------------------------------- |
| 1         | Capacity             | Hex representation of decimal number, eg. `29 = 1d`, in thousands, so `29` is `29,000` |
| 2         | Seated capacity      | Hex representation of decimal number, eg. `29 = 1d`, in thousands, so `29` is `29,000` |
| 3         | Home colours (text)  | Text and background colours, see [Colours](#Colours) |
| 4         | Home colours (bkgrd) | Text and background colours, see [Colours](#Colours) |
| 5         | Away colours (text)  | Text and background colours, see [Colours](#Colours) |
| 6         | Away colours (bkgrd) | Text and background colours, see [Colours](#Colours) |
| 7         | Attractiveness       | The attractiveness of the team to players, see [Attractiveness](#Attractiveness)|
| 8         | **UNKNOWN**          | |
| 9         | Money                | Amount of money the team starts with, see [Money](#Money) |
| 10        | **UNKNOWN**          | |
| 11        | Board confidence     | Hex representation of decimal number, eg. `29 = 1d` which is then the percentage amount |
| 12 and 13 | Manager first name   | See mapping for [First name](./CODES.md), although editing relevant `CMEXE` |
| 14 and 15 | Manager surname      | See mapping for [First name](./CODES.md), although editing relevant `CMEXE` |
| 16        | Style of play        | |
| 17        | Formation            | |
| 18        | Manager reputation   | The reputation of the manager, see [Manager reputation](#Manager-reputation) |
| 19        | Manager character    | See mapping for [Character](./CODES.md) |
| 20 and 21 | Assistant first name | See mapping for [First name](./CODES.md), although editing relevant `CMEXE` |
| 22 and 23 | Assistant first name | See mapping for [First name](./CODES.md), although editing relevant `CMEXE` |

## Colours

Depending on the version of CM you are playing the colours will be represented slightly differently.

In CM93 the colours follow a simple pattern, in every hexadecimal pair, the first character is the text and the second character is a background colour.

In CM94 the colours have are a 2 digit hexadecimal, like most data.

###  Colour codes

| Code (CM93) |  Code (CM95) | Colour      |
| ----------- | ------------ | ----------- |
| 0           | 00           | Black       |
| 1           | 01           | White       |
| 2           | 02           | Red         |
| 3           | 03           | Green       |
| 4           | 04           | Blue        |
| 5           | 05           | Blue 2 (pale yellow??)      |
| 6           | 06           | Yellow      |
| 7           | 07           | Pink        |
| 8           | 08           | Grey        |
| 9           | 09           | Orange      |
| a           | 0a           | Dark Blue   |
| b           | 0b           | Purple      |
| c           | 0c           | Light Blue  |
| d           | 0d           | Turquoise   |
| e           | 0e           | Pale grey   |
| f           | 0f           | Light Green |

## Attractiveness

This represents how attractive the team is when signing a player

| Code | Attractiveness          | Examples |
| ---- | ------------ | -------- |
| 11   | Super        | Man Utd, Liverpool |
| 10   | High         | Aston Villa, Sheff Wed, Tottenham, Man City, Arsenal, plus 8 more |
| 0f   | Medium       | Norwich, Coventry, Blackburn, Q.P.R., Ipswich, plus 13 more |
| 0e   | Low          | Wimbledon, Oldham, Millwall, Swindon, Portsmouth, plus 17 more |
| 0d   | None         | Oxford, Brentford, Cambridge, Bristol C, Southend, plus 20 more |

## Money

> Why do you want to sign Zidane when we have Tim Sherwood?
>
> -- <cite>Jack Walker, Blackburn owner</cite>

Each club is assigned a value that when converted from hexadecimal to decimal is the starting money amount multiplier.

The formula for CM93 is as follows (where X is the assigned value):

```
money = (X * 250K) + 250K
```

So the teams assigned to `0` would be given a maximum of `250K`, but this could be less as there has also been an element of randomisation added in.

Teams assigned to `1` would get `500K`, so they can get between 250K and 500K

All the way up to `19` who get `5M` thanks to being bankrolled by Jack Walker.

In the `CM94` version the multiplier goes all the way up to `70`, which equates to `19M` to account for the influx of money into the game between '93 and '95. The formula seems to be **very** slightly different, but it basically works out the same. If you assign a team a low number they will get less money, if you assigned a team a high value they will get lots of money.

## Manager reputation

> I wouldn't say I was the best manager in the business. But I was in the top one.
>
> -- <cite>Brian Clough</cite>

The manager reputation is a hexadecimal representation of decimal number, eg. `29 = 1d` and it ranges from 100 - 200 (possibly lower, but those were the lowest assigned).

The value then maps to a rating:

| Decimal value | Rating |
| ------------- | ------ |
| 170 - 200     | Superb |
| 150 - 169     | V. Good |
| 120 - 149     | Good |
| less than 120 | Fair |
| 255           | Randomised (either Fair or Unknown) |

## Unknown columns

> Do I not like that
>
> -- <cite>Graham Taylor</cite>

There are currently a few columns which purpose has not yet been identified.
