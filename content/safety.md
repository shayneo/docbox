

## Overview
The Vinli Device is able to detect when a collision occurs based on internal sensor and select vehicle telemetry data. Using Vinli’s Safety Services, your application can access collision history and retrieve detailed collision details.

It's also possible for your app to subscribe to `collision` events.

Note: It is extremely important to remind the user to call their local emergency services number (9-1-1, 1-1-2, etc.). Vinli’s Safety Services, while built to be as reliable as possible, should not be used in place of standard emergency procedures.

## Collisions

### Get Collisions for a Device
```endpoint
GET https://safety.vin.li/api/v1/devices/8b8a1810-d6d8-11e3-9c1a-0800200c9a66/collisions
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://safety.vin.li/api/v1/devices/8b8a1810-d6d8-11e3-9c1a-0800200c9a66/collisions"
```

#### Response
```json
HTTP/1.1 200 OK
```
```json
{
    "collisions" : [
        {
            "id": "561f0fa0-3231-11e4-8c21-0800200c9a66",
            "deviceId": "8b8a1810-d6d8-11e3-9c1a-0800200c9a66",
            "vehicleId": "e619dc1d-b760-410f-b809-2578df22a755",
            "timestamp": "2016-12-21T18:37:30.938Z",
            "location" : {
                "latitude" : 32.766392,
                "longitude" : -96.917009
            },
            "links": {
                "self": "https://safety.vin.li/api/v1/collisions/561f0fa0-3231-11e4-8c21-0800200c9a66",
                "device": "https://platform.vin.li/api/v1/devices/8b8a1810-d6d8-11e3-9c1a-0800200c9a66",
                "vehicle": "https://platform.vin.li/api/v1/vehicles/e619dc1d-b760-410f-b809-2578df22a755"
            }
        },
        {
            "id": "014f029c-a5b6-4e15-f0dd-707920aa6b6f",
            "deviceId": "8b8a1810-d6d8-11e3-9c1a-0800200c9a66",
            "vehicleId": "e619dc1d-b760-410f-b809-2578df22a755",
            "timestamp": "2016-12-21T18:36:41.938Z",
            "location" : {
                "latitude" : 32.766392,
                "longitude" : -96.917009
            },
            "links": {
                "self": "https://safety.vin.li/api/v1/collisions/014f029c-a5b6-4e15-f0dd-707920aa6b6f",
                "device": "https://platform.vin.li/api/v1/devices/8b8a1810-d6d8-11e3-9c1a-0800200c9a66",
                "vehicle": "https://platform.vin.li/api/v1/vehicles/e619dc1d-b760-410f-b809-2578df22a755"
            }
        }
    ],
    "meta": {
        "pagination": {
            "remaining": 6,
            "until": "2016-09-19T22:48:40.524Z",
            "since": "1970-01-01T00:00:00.000Z",
            "limit": 2,
            "sortDir": "desc",
            "links": {
                "prior": "https://safety.vin.li/api/v1/devices/8b8a1810-d6d8-11e3-9c1a-0800200c9a66/collisions?until=1473961364647"
            }
        }
    }
}
```

### Get Collisions for a Vehicle
```endpoint
GET https://safety.vin.li/api/v1/vehicles/e619dc1d-b760-410f-b809-2578df22a755/collisions
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://safety.vin.li/api/v1/vehicles/e619dc1d-b760-410f-b809-2578df22a755/collisions"
```

#### Response
```json
HTTP/1.1 200 OK
```
```json
{
    "collisions" : [
        {
            "id": "561f0fa0-3231-11e4-8c21-0800200c9a66",
            "deviceId": "8b8a1810-d6d8-11e3-9c1a-0800200c9a66",
            "vehicleId": "e619dc1d-b760-410f-b809-2578df22a755",
            "timestamp": "2016-12-21T18:37:30.938Z",
            "location" : {
                "latitude" : 32.766392,
                "longitude" : -96.917009
            },
            "links": {
                "self": "https://safety.vin.li/api/v1/collisions/561f0fa0-3231-11e4-8c21-0800200c9a66",
                "device": "https://platform.vin.li/api/v1/devices/8b8a1810-d6d8-11e3-9c1a-0800200c9a66",
                "vehicle": "https://platform.vin.li/api/v1/vehicles/e619dc1d-b760-410f-b809-2578df22a755"
            }
        },
        {
            "id": "014f029c-a5b6-4e15-f0dd-707920aa6b6f",
            "deviceId": "8b8a1810-d6d8-11e3-9c1a-0800200c9a66",
            "vehicleId": "e619dc1d-b760-410f-b809-2578df22a755",
            "timestamp": "2016-12-21T18:36:41.938Z",
            "location" : {
                "latitude" : 32.766392,
                "longitude" : -96.917009
            },
            "links": {
                "self": "https://safety.vin.li/api/v1/collisions/014f029c-a5b6-4e15-f0dd-707920aa6b6f",
                "device": "https://platform.vin.li/api/v1/devices/8b8a1810-d6d8-11e3-9c1a-0800200c9a66",
                "vehicle": "https://platform.vin.li/api/v1/vehicles/e619dc1d-b760-410f-b809-2578df22a755"
            }
        }
    ],
    "meta": {
        "pagination": {
            "remaining": 6,
            "until": "2016-09-19T22:48:40.524Z",
            "since": "1970-01-01T00:00:00.000Z",
            "limit": 2,
            "sortDir": "desc",
            "links": {
                "prior": "https://safety.vin.li/api/v1/devices/8b8a1810-d6d8-11e3-9c1a-0800200c9a66/collisions?until=1473961364647"
            }
        }
    }
}
```

### Get a Collision
```endpoint
GET https://safety.vin.li/api/v1/collisions/e43ff87d-bb58-42da-998e-d7f10a3f7a64
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://safety.vin.li/api/v1/collisions/e43ff87d-bb58-42da-998e-d7f10a3f7a64"
```

#### Response
```json
HTTP/1.1 200 OK
```
```json
{
    "collision" : {
        "id": "014f029c-a5b6-4e15-f0dd-707920aa6b6f",
        "deviceId": "8b8a1810-d6d8-11e3-9c1a-0800200c9a66",
        "vehicleId": "e619dc1d-b760-410f-b809-2578df22a755",
        "timestamp": "2016-12-21T18:36:41.938Z",
        "location" : {
            "latitude" : 32.766392,
            "longitude" : -96.917009
        },
        "links": {
            "self": "https://safety.vin.li/api/v1/collisions/014f029c-a5b6-4e15-f0dd-707920aa6b6f",
            "device": "https://platform.vin.li/api/v1/devices/8b8a1810-d6d8-11e3-9c1a-0800200c9a66",
            "vehicle": "https://platform.vin.li/api/v1/vehicles/e619dc1d-b760-410f-b809-2578df22a755"
        }
    }
}
```