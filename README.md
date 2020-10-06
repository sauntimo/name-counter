# Name-counter
Node/Typescript app which demonstrates text search.

There are two input files included in the repo; one with a list of approximately 5,400 first names and one with the entire text of [Oliver Twist](https://en.wikipedia.org/wiki/Oliver_Twist). The app counts the occurences of each name in the text of the story and writes a file with results sorted from most to least frequent. 

The text search is handled by the [streamsearch](https://www.npmjs.com/package/streamsearch) npm package which implements the [Boyer–Moore–Horspool algorithm](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore%E2%80%93Horspool_algorithm). It takes around 20 seconds to run.

Note that the matching is case sensitive so a search for "Oliver" will return 830 results and a search for "OLIVER" will return 51. I considered lower casing the whole text to return both combined but that resulted in a large number of false potisitves for 2 letter names. 

### Installation

- clone the repo
  ```
  $ git clone git@github.com:sauntimo/name-counter.git name-counter
  ```
  
- initialise
  ```
  $ cd name-counter && sudo npm i -g 
  ```

### Usage

```
$ namecounter
```

![image](https://user-images.githubusercontent.com/2720466/94945032-fdf06c00-04d1-11eb-83cd-3466eff93b92.png)


### See Also

Similar functionality is also provided at via an API and a simple frontend at [name-counter-api.herokuapp.com](https://name-counter-api.herokuapp.com/), with code at [github.com/sauntimo/name-counter-api](https://github.com/sauntimo/name-counter-api).
