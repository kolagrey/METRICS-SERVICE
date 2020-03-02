# Metrics Service API

## How to use this repo

## First Thing First
```sh

$ git clone https://github.com/kolagrey/METRICS-SERVICE

```


## Method 1 (With Docker).

```sh

$ cd METRICS-SERVICE

$ docker build -t metrics-service-image .

$ docker run -d -p 6969:6969 --name metrics-service-container metrics-service-image

```


## Method 2 (Without Docker).

### Install dependencies using

```sh

$ cd METRICS-SERVICE

$ npm install 

```

### Start the server using 

```sh
    
    $ npm start

```

This will start the server at http://localhost:6969

## Available Routes

- [POST] http://localhost:6969/metric/:key --> Create new entry for provider key.
```sh

    // Example 1 body payload

    { 
        "value": 10
    }

    // Returned payload

    HTTP Status: 200

    {}

    // Example 2 body payload

    { 
        "value": 30
    }

    // Returned payload

    HTTP Status: 200

    {}
    
```

- [GET] http://localhost:6969/metric/:key/sum --> Get sum of all entry for the last hour for the provider key

```sh
    // Returned payload

    HTTP Status: 200

    {
        value: 40
    }
    
```

## Testing

```sh
    
    $ npm test

```