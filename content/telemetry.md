

## Telemetry Service
Telemetry Services provide time-series data from vehicle parameters and location. This history is available in three formats:

* "messages format" provides time-series of the raw, unfiltered messages from a device
* "locations format" returns time-series of locations with corresponding vehicle parameters returned as valid GeoJSON
* "telemetry snapshots" deliver time-series history of one or more vehicle parameters
All of these data formats are provided using stream pagination.

The reported format of each parameter can be different depending on the type of vehicle or the vehicle’s condition.

Some parameters change often, and others not at all. For example, Telemetry Service sends RPM, vehicle speed, etc. as often as possible, location with every message when available. However, Fuel Type or O2 Sensor Locations will never change.

In any case, all parameters that are provided by a vehicle are reported at least once every minute or so after startup.

## Telemetry Messages
Telemetry messages are collected aproximately every second and contain a variety of data. Vinli attempts to include the following data points in every message:
* `locatation`
* `accel`
* `vehicleSpeed`
* `rpm`
* `intakeManifoldPressure`
* `calculatedLoadValue`
* `massAirFlow`

Occasionaly, these data points will not be included in a telemetry message for reasons that are beyond our control. Such as GPS unable to obtain connection (driving through a tunnel) or the vehicle CAN BUS being unable to respond to data requests at a fast enough rate.

When working with the Telemetry API the following query paramaters are valid:
* `until` - Results will contain messages whose timestamps are less than or equal to the until value. If an until value is not specified, the current time when the call is made will be used as the until value.
* `since` - Results will contain messages whose timestamps are greater than the since value. If a since value is not specified, no lower limit will be placed on the returned snapshots.
* `limit` - Results will contain no more than limit number of messages. Max limit is 100. Default limit is 20.

### Get Messages
```endpoint
GET https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/messages
```
#### Request
```curl
curl -X GET "https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/messages"
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "messages" : [
        {
            "id": "c5c55c92-59ae-440d-881e-24f6b287ac32",
            "timestamp": "2016-12-19T14:21:45.846Z",
            "data": {
                "location": {
                "type": "Point",
                "coordinates": [
                    -96.790123,
                    32.782034
                ]
                },
                "accel": {
                "maxZ": -5.707806,
                "maxX": -0.344767,
                "maxY": -7.240103,
                "minX": -0.651226,
                "minY": -7.27841,
                "minZ": -7.316718
                },
                "designOBDRequirements": "OBD-II as defined by the CARB",
                "rpm": 940,
                "vehicleSpeed": 16,
                "intakeManifoldPressure": 32,
                "calculatedLoadValue": 29.019607843137255,
                "massAirFlow": 4.49
            },
            "links": {
                "self": "https://telemetry.vin.li/api/v1/messages/c5c55c92-59ae-440d-881e-24f6b287ac32?deviceId=27a2ac50-d7bd-11e3-9c1a-0800200c9a66"
            }
        },
        {
            "id": "8bc21558-0ec5-4a77-b82e-e6a23c95675c",
            "timestamp": "2016-12-19T14:21:45.000Z",
            "data": {
                "location": {
                "type": "Point",
                "coordinates": [
                    -96.790127,
                    32.782054
                ]
                },
                "accel": {
                "maxZ": -5.286424,
                "maxX": -0.651226,
                "maxY": -7.393332,
                "minX": -1.072608,
                "minY": -7.43164,
                "minZ": -7.661484
                },
                "rpm": 1027,
                "oxygenSensorVoltage1b": 0.69,
                "shortTermFuelTrim1b": 0,
                "vehicleSpeed": 15,
                "intakeManifoldPressure": 39,
                "calculatedLoadValue": 34.509803921568626,
                "massAirFlow": 5.76
            },
            "links": {
                "self": "https://telemetry.vin.li/api/v1/messages/8bc21558-0ec5-4a77-b82e-e6a23c95675c?deviceId=27a2ac50-d7bd-11e3-9c1a-0800200c9a66"
            }
        },
        {
            "id": "fa23ac3c-9987-46ee-8969-bedaabd7819f",
            "timestamp": "2016-12-19T14:21:44.069Z",
            "data": {
                "location": {
                "type": "Point",
                "coordinates": [
                    -96.790113,
                    32.782085
                ]
                },
                "accel": {
                "maxZ": -6.24411,
                "maxX": -0.727841,
                "maxY": -6.971951,
                "minX": -1.608912,
                "minY": -7.27841,
                "minZ": -7.316718
                },
                "rpm": 902,
                "oxygenSensorLocations": [
                "Bank 1 Sensor 1",
                "Bank 1 Sensor 2"
                ],
                "vehicleSpeed": 15,
                "intakeManifoldPressure": 40
            },
            "links": {
                "self": "https://telemetry.vin.li/api/v1/messages/fa23ac3c-9987-46ee-8969-bedaabd7819f?deviceId=27a2ac50-d7bd-11e3-9c1a-0800200c9a66"
            }
        },
        {
            "id": "3297440a-b839-41a8-9559-75e308a6e384",
            "timestamp": "2016-12-19T14:21:43.210Z",
            "data": {
                "location": {
                "type": "Point",
                "coordinates": [
                    -96.790111,
                    32.782127
                ]
                },
                "accel": {
                "maxZ": -6.703799,
                "maxX": -0.612919,
                "maxY": -6.397339,
                "minX": -0.612919,
                "minY": -7.58487,
                "minZ": -6.742106
                },
                "calculatedLoadValue": 36.86274509803921,
                "massAirFlow": 6.1,
                "rpm": 888,
                "absoluteThrottleSensorPosition": 13.72549019607843
            },
            "links": {
                "self": "https://telemetry.vin.li/api/v1/messages/3297440a-b839-41a8-9559-75e308a6e384?deviceId=27a2ac50-d7bd-11e3-9c1a-0800200c9a66"
            }
        },
    ],
    "meta": {
        "pagination": {
            "remaining": 709,
            "until": "2016-12-19T19:53:39.244Z",
            "since": "1970-01-01T00:00:00.000Z",
            "limit": 4,
            "sortDir": "desc",
            "links": {
                "prior": "https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/messages?limit=5&until=1461943861926"
            }
        }
    }
}
```

### Get a Message
Returns a particular message by messageId. This is primarily used when a specific message is referenced by a different service.

```endpoint
GET https://telemetry.vin.li/api/v1/messages/2f11d630-141e-11e4-b717-5977b6c38d23
```
#### Request
```curl
curl -X GET "https://telemetry.vin.li/api/v1/messages/2f11d630-141e-11e4-b717-5977b6c38d23"
```
#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "message": {
        "id": "2f11d630-141e-11e4-b717-5977b6c38d23",
        "timestamp": "2017-01-25T14:53:00.973Z",
        "data": {
            "location": {
                "type": "Point",
                "coordinates": [
                -96.690244,
                32.732419
                ]
            },
            "accel": {
                "maxZ": -5.209809,
                "maxX": -0.268152,
                "maxY": -7.508255,
                "minX": -0.459689,
                "minY": -8.197788,
                "minZ": -5.975958
            },
            "vehicleSpeed": 7,
            "rpm": 1279,
            "intakeManifoldPressure": 49,
            "calculatedLoadValue": 38.8235294117647,
            "massAirFlow": 7.43
        },
        "links": {
        "self": "https://telemetry.vin.li/api/v1/messages/2f11d630-141e-11e4-b717-5977b6c38d23&deviceId=67599d41-e121-4df7-8bc6-177c9538441e"
        }
    }
}
```

##  Locations
The location property contains a valid GeoJSON FeatureCollection object consisting of Point features for each location. The timestamp for each location is the in the properties field of the feature.

Additionally, selected or all parameters that were recorded at each location can also be included in the properties object. When `all` is specified, this method acts just like the Device Messages method below, but it is formatted as valid GeoJSON.

Query Params
* `fields` - Can be `all` or a comma-separated list of parameter keys to be included in the properties field.
* `until` - Results will contain locations whose timestamps are less than or equal to the until value. If an until value is not specified, the current time when the call is made will be used as the until value.
* `since` - Results will contain locations whose timestamps are greater than the since value. If a since value is not specified, no lower limit will be placed on the returned locations.
* `limit` - Results will contain no more than limit number of locations.

### Get Locations
```endpoint
GET https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/locations?fields=rpm,vehicleSpeed
```

#### Request
```curl
curl -X GET "https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/locations?fields=rpm,vehicleSpeed"
```
#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "locations" : {
        "type" : "FeatureCollection",
        "features" : [
        {
            "type" : "Feature",
            "geometry" : {
            "type" : "Point",
            "coordinates" : [-90.0811, 29.9508]
            },
            "properties" : {
                "timestamp" : "2014-03-13T17:54:20.050Z",
                "rpm" : 1264,
                "vehicleSpeed" : 54
            }
        },
        {
            "type" : "Feature",
            "geometry" : {
            "type" : "Point",
            "coordinates" : [-90.08198, 29.9498]
            },
            "properties" : {
                "timestamp" : "2014-03-13T17:54:07.122Z",
                "rpm" : 1832
            }
        },
        ...
        ]
    },
    "meta" : {
        "pagination" : {
            "remaining": 469,
            "until": "2016-12-20T00:02:36.644Z",
            "since": "1970-01-01T00:00:00.000Z",
            "limit": 3,
            "sortDir": "desc",
            "links" : {
                "prior" : "https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/locations?until=1394733247121"
            }
        }
    }
}
```


## Snapshots
Snapshots allow you to request Telemetry messages containing specifc OBDII parameters.

* `fields` - Comma-separated list of parameter keys to filter by
* `until` - Results will contain snapshots whose timestamps are less than or equal to the until value. If an until value is not specified, the current time when the call is made will be used as the until value.
* `since` - Results will contain snapshots whose timestamps are greater than the since value. If a since value is not specified, no lower limit will be placed on the returned snapshots.
* `limit` - Results will contain no more than limit number of snapshots

Snapshots will return a messages containing at least 1 of the `fields` you requested.

### Get a Snapshot
```endpoint
GET https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/snapshots?fields=vehicleSpeed,rpm
```

#### Request
```curl
curl -X GET "https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/snapshots?fields=vehicleSpeed,rpm"
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "snapshots": [
        {
            "id": "090442e2-6c04-3473-bf15-549622329c79",
            "timestamp": "2016-12-19T23:05:43.074Z",
            "data": {
                "vehicleSpeed": 12,
                "rpm": 850
            },
            "links": {
                "self": "https://telemetry.vin.li/api/v1/messages/090442e2-6c04-3473-bf15-549622329c79"
            }
        },
        {
            "id": "b8664969-dfba-4536-b610-1cdc2657d8b2",
            "timestamp": "2016-12-19T23:05:42.198Z",
            "data": {
                "rpm": 1805
            },
            "links": {
                "self": "https://telemetry.vin.li/api/v1/messages/b8664969-dfba-4536-b610-1cdc2657d8b2"
            }
        },
        {
            "id": "89c4d874-cde5-4e7c-b7b4-59ce18d892d3",
            "timestamp": "2016-12-19T23:05:41.268Z",
            "data": {
                "vehicleSpeed": 19,
                "rpm": 1768
            },
            "links": {
                "self": "https://telemetry.vin.li/api/v1/messages/89c4d874-cde5-4e7c-b7b4-59ce18d892d3"
                }
        }
    ],
    "meta": {
        "pagination": {
            "remaining": 797812,
            "until": "2016-12-20T00:11:10.993Z",
            "since": "1970-01-01T00:00:00.000Z",
            "limit": 3,
            "sortDir": "desc",
            "links": {
                "prior": "https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/snapshots?fields=vehicleSpeed,rpm"
            }
        }
    }
}
```