
# NoWay

A brief description of what this project does and who it's for


## Demo

- [demoLink1](https://drive.google.com/file/d/1pSaGIDEtcM-XmPJak_nZ6Mssc4cG5uYW/view?usp=drive_link)
- [demoLink2](https://drive.google.com/file/d/1x2HZc2gG3Tu4LInNPUDaE8FMJ9c68KOH/view?usp=sharing)


## Features

- displays the shortest distance between source and destination.
- displays shortest path one must take to reach destintion with minimum distance
Kapili to Core 5:
27 to 51
shortest 1204 via lecture hall
earlier 1356 via KV gate
Kapili to Market Complex
27 to 2
shortest 1534 via conference hall circle
earlier 2027 via serpentine
Kapili to Hospital
shortest 1509 via Dhansiri
earlier 1667 via subansiri
Brahmaputra to subansiri
shortest 1100 via kapili
earlier 1464 via kameng
Barak to Core 5 
shortest 1835 via bridge
earlier 1948 via kapil -> tapri -> hashtag

average speed : 1.31 m/s
earlier distance 8462
reduced: 1052
travel time: 12%reduced

## API Reference

#### Get shortest distance between node A and node B 

```http
  GET /shortd/<int:A>/<int:B>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `source` | `integer` | **Required**|
| `destination` | `integer` |     **Required**      |




## Tech Stack

**Client:** React

**Server:** Flask, Python


## Used By

This project is used by the following:

- Students of IIT Guwahati


## FAQ

#### How will obtain my shortest path from source to destination?

Every possible source and destination is mapped with a number ranging from (1 to 64). Path in the application will display the nodes in order to reach the destination. 



## Authors

- [@Anurag Pandey](https://github.com/dis-28)

