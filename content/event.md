

## Event Service Overview
The Vinli platform emits events for devices and vehicles at key moments in the vehicle/driver/developer lifecycle. By default, the platform will capture standard events for important things, like when the vehicle starts up, when a trip is compeleted, or when a device loses connection.

Developers can also define their own "Rules", or criteria that trigger events. Rules can be defined using PID data ([see here](http://dev.vin.li/parameters.json)) or with geofencing.

Events can be monitored by creating "Subscriptions". Subscriptions include a developer-defined URL, Vinli will POST a notification to this URL whenever the eventType as defined in the subscription occurs.

### Event Types
There are many types of events that the platform will track on a device-by-device basis. These include:

* `startup`
* `shutdown`
* `rule-enter`
* `rule-leave`
* `dtc-on`
* `dtc-off`
* `collision`
* `trip-started`
* `trip-orphaned`
* `trip-stopped`
* `trip-completed`
* `distance-trigger`

### Objects
Almost all events occur in the context of a higher-level object. For example, `startup` and `shutdown` events occur in relation to a given Vehicle, `rule-enter` and `rule-leave` events occur in relation to a given Rule. This information is available as part of the event object property. Additionally, subscriptions can specifically reference a given object. For example, a subscription to startup events can optionally reference a particular Vehicle; in this way, an App will only be notified of startups where the Device is attached to a particular Vehicle.

NOTE: Subscriptions for event types `rule-enter`, `rule-leave`, or `rule-*` must reference a single Rule. When creating the subscription, the Rule is checked to ensure that it belongs to this particular device.

## Event API
Returns the list all events for a given Device in reverse-chronological order. Each Event contains information regarding the device, the object involved in the event, and associated metadata.

The following fields are contained within an event response:

* `id` - ID of the event
* `timestamp` - Timestamp when the event occurred
* `deviceId` - ID of the device
* `vehicleId` - ID of the vehicle
* `eventType` - Type of event
* `object` - Information about the object of the event (i.e. the associated Rule or Vehicle)
* `meta` - Optional data depending on the type of event. For instance, for a `rule-enter` or `rule-leave` event, the meta property contains information about the Rule itself and the state and direction of the event
* `links` - object containing links to associated data

### Get Events for a Device
```endpoint
GET https://events.vin.li/api/v1/devices/68d489c0-d7a2-11e3-9c1a-0800200c9a66/events
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://events.vin.li/api/v1/devices/68d489c0-d7a2-11e3-9c1a-0800200c9a66/events"
```
#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "events": [
        {
            "id": "0e9a17ff-6f81-436f-9686-2f517928fe65",
            "timestamp": "2016-12-20T17:44:04.587Z",
            "deviceId": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "eventType": "trip-stopped",
            "object": {
                "id": "1b8b9447-428c-4c0d-631d-1bc27b401c15",
                "type": "trip"
            },
            "meta": {
                "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f"
            },
            "links": {
                "self": "https://events.vin.li/api/v1/events/0e9a17ff-6f81-436f-9686-2f517928fe65",
                "notifications": "https://events.vin.li/api/v1/events/0e9a17ff-6f81-436f-9686-2f517928fe65/notifications"
            }
        },
        {
            "id": "49f0f996-ace4-4fb2-bcd1-be1ae4979866",
            "timestamp": "2016-12-20T17:44:04.587Z",
            "deviceId": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "eventType": "shutdown",
            "object": {
                "id": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
                "type": "vehicle"
            },
            "meta": null,
            "links": {
                "self": "https://events.vin.li/api/v1/events/49f0f996-ace4-4fb2-bcd1-be1ae4979866",
                "notifications": "https://events.vin.li/api/v1/events/49f0f996-ace4-4fb2-bcd1-be1ae4979866/notifications"
            }
        },
        {
            "id": "6bcad159-a0dc-4962-97bb-52195b02abd7",
            "timestamp": "2016-12-14T22:40:28.064Z",
            "deviceId": "eb4f66ec-4050-4052-9559-baf5d8eb8511",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "eventType": "dtc-on",
            "object": {
                "id": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
                "type": "vehicle"
            },
            "meta": {
                "code": "313bc7d7-1fc6-491f-9e02-c3d02e64994c"
            },
            "links": {
                "self": "https://events.vin.li/api/v1/events/6bcad159-a0dc-4962-97bb-52195b02abd7",
                "notifications": "https://events.vin.li/api/v1/events/6bcad159-a0dc-4962-97bb-52195b02abd7/notifications"
            }
        },
        {
            "id": "3aacec4e-e478-31ec-7008-0aad4093c328",
            "timestamp": "2016-12-20T17:42:33.131Z",
            "deviceId": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "eventType": "rule-enter",
            "object": {
                "id": "b40439e2-8c9b-4684-a2c9-daaa76d9a13c",
                "type": "rule"
            },
            "meta": {
                "direction": "enter",
                "firstEval": false,
                "rule": {
                "id": "b40439e2-8c9b-4684-a2c9-daaa76d9a13c",
                "name": "got to work",
                "deviceId": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
                "object": {
                    "id": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
                    "type": "device"
                },
                "boundaries": [
                    {
                    "id": "652c3b9c-aace-420d-aa29-0aa518659317",
                    "type": "polygon",
                    "coordinates": [
                        [
                        [
                            -96.7904305458069,
                            32.7828150725714
                        ],
                        [
                            -96.7917609214783,
                            32.782544470838
                        ],
                        [
                            -96.7914605140686,
                            32.7811914498245
                        ],
                        [
                            -96.7906773090363,
                            32.7810381061449
                        ],
                        [
                            -96.7893040180206,
                            32.7816604994394
                        ],
                        [
                            -96.788467168808,
                            32.782535450766
                        ],
                        [
                            -96.7894649505615,
                            32.7828511527404
                        ],
                        [
                            -96.7903876304626,
                            32.7828150725714
                        ],
                        [
                            -96.7904305458069,
                            32.7828150725714
                        ]
                        ]
                    ]
                    }
                ],
                "evaluated": true,
                "covered": true,
                "createdAt": "2016-12-20T01:15:38.843987+00:00",
                "links": {
                    "self": "https://rules.vin.li/api/v1/rules/b40439e2-8c9b-4684-a2c9-daaa76d9a13c",
                    "events": "https://events.vin.li/api/v1/devices/68d489c0-d7a2-11e3-9c1a-0800200c9a66/events?type=rule-*&objectId=b40439e2-8c9b-4684-a2c9-daaa76d9a13c",
                    "subscriptions": "https://events.vin.li/api/v1/devices/68d489c0-d7a2-11e3-9c1a-0800200c9a66/subscriptions?objectType=rule&objectId=b40439e2-8c9b-4684-a2c9-daaa76d9a13c"
                }
                },
                "message": {
                "id": "edfe24c4-bcd0-4912-b63f-e1581eacf431",
                "timestamp": "2016-12-20T17:42:33.131Z",
                "snapshot": {
                    "location": {
                    "lat": 32.782804,
                    "lon": -96.789367
                    },
                    "accel": {
                    "maxZ": -5.094887,
                    "maxX": 0.651226,
                    "maxY": -5.899343,
                    "minX": 0.268152,
                    "minY": -6.014265,
                    "minZ": -6.703799
                    },
                    "rpm": 1280,
                    "calculatedLoadValue": 17.254901960784313,
                    "designOBDRequirements": "OBD-II as defined by the CARB",
                    "vehicleSpeed": 50,
                    "intakeManifoldPressure": 23,
                    "massAirFlow": 3.9
                }
            }
        },
        "links": {
            "self": "https://events.vin.li/api/v1/events/3aacec4e-e478-31ec-7008-0aad4093c328",
            "notifications": "https://events.vin.li/api/v1/events/3aacec4e-e478-31ec-7008-0aad4093c328/notifications"
        }
        },
            {
            "id": "217d0534-bc62-3fc3-9f58-3114fe9bc765",
            "timestamp": "2016-12-20T21:33:05.285Z",
            "deviceId": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "vehicleId": null,
            "eventType": "rule-enter",
            "object": {
                "id": "3a18675d-b404-8918-a3d4-15693472ae13",
                "type": "rule"
            },
            "meta": {
                "direction": "enter",
                "firstEval": false,
                "rule": {
                "id": "3a18675d-b404-8918-a3d4-15693472ae13",
                "name": "Speedster!",
                "deviceId": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
                "object": {
                    "id": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
                    "type": "device"
                },
                "boundaries": [
                    {
                    "id": "95c9ea11-17ae-3991-8b2f-d3acb86672f3",
                    "type": "parametric",
                    "parameter": "vehicleSpeed",
                    "min": 65
                    }
                ],
                "evaluated": true,
                "covered": true,
                "createdAt": "2016-12-20T21:31:15.359984+00:00",
                "links": {
                    "self": "https://rules.vin.li/api/v1/rules/3a18675d-b404-8918-a3d4-15693472ae13",
                    "events": "https://events.vin.li/api/v1/devices/68d489c0-d7a2-11e3-9c1a-0800200c9a66/events?type=rule-*&objectId=3a18675d-b404-8918-a3d4-15693472ae13",
                    "subscriptions": "https://events.vin.li/api/v1/devices/68d489c0-d7a2-11e3-9c1a-0800200c9a66/subscriptions?objectType=rule&objectId=3a18675d-b404-8918-a3d4-15693472ae13"
                }
                },
                "message": {
                "id": "7a8582b0-d6b4-48a9-9c34-7af932295b4a",
                "timestamp": "2016-12-20T21:33:05.285Z",
                "snapshot": {
                    "location": {
                    "lat": 32.77653,
                    "lon": -96.799442
                    },
                    "accel": {
                    "maxZ": 9.883315,
                    "maxX": 2.489982,
                    "maxY": -4.252124,
                    "minX": -0.995993,
                    "minY": -7.929636,
                    "minZ": 4.290431
                    },
                    "calculatedLoadValue": 18.431372549019606,
                    "intakeManifoldPressure": 27,
                    "rpm": 3320,
                    "massAirFlow": 6.64,
                    "longTermFuelTrimBank1": -1.5625,
                    "vehicleSpeed": 67,
                    "shortTermFuelTrimBank2": 0
                }
                }
            },
            "links": {
                "self": "https://events.vin.li/api/v1/events/217d0534-bc62-3fc3-9f58-3114fe9bc765",
                "notifications": "https://events.vin.li/api/v1/events/217d0534-bc62-3fc3-9f58-3114fe9bc765/notifications"
            }
        },
        {
            "id": "b3d2444-78ec-45d8-8073-13421ad2ef96",
            "timestamp": "2016-12-19T13:31:00.491Z",
            "deviceId": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "eventType": "phone-home",
            "object": {
                "id": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
                "type": "vehicle"
            },
            "meta": null,
            "links": {
                "self": "https://events.vin.li/api/v1/events/b3d2444-78ec-45d8-8073-13421ad2ef96",
                "notifications": "https://events.vin.li/api/v1/events/b3d2444-78ec-45d8-8073-13421ad2ef96/notifications"
            }
        },
    ],
    "meta": {
        "pagination": {
            "remaining": 7993,
            "until": "2016-12-20T21:04:26.443Z",
            "since": "1970-01-01T00:00:00.000Z",
            "limit": 10,
            "sortDir": "desc",
            "links": {
                "prior": "https://events.vin.li/api/v1/devices/68d489c0-d7a2-11e3-9c1a-0800200c9a66/events?limit=100&until=1482013267165"
            }
        }
    }
}
``` 

### Get Events for a Vehicle
```endpoint
GET https://events.vin.li/api/v1/vehicles/48ef1264-7fd2-4319-8789-g9a6b85b7a8f/events
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://events.vin.li/api/v1/vehicles/48ef1264-7fd2-4319-8789-g9a6b85b7a8f/events"
```
#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "events": [
        {
            "id": "0e9a17ff-6f81-436f-9686-2f517928fe65",
            "timestamp": "2016-12-20T17:44:04.587Z",
            "deviceId": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "eventType": "trip-stopped",
            "object": {
                "id": "1b8b9447-428c-4c0d-631d-1bc27b401c15",
                "type": "trip"
            },
            "meta": {
                "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f"
            },
            "links": {
                "self": "https://events.vin.li/api/v1/events/0e9a17ff-6f81-436f-9686-2f517928fe65",
                "notifications": "https://events.vin.li/api/v1/events/0e9a17ff-6f81-436f-9686-2f517928fe65/notifications"
            }
        },
        {
            "id": "49f0f996-ace4-4fb2-bcd1-be1ae4979866",
            "timestamp": "2016-12-20T17:44:04.587Z",
            "deviceId": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "eventType": "shutdown",
            "object": {
                "id": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
                "type": "vehicle"
            },
            "meta": null,
            "links": {
                "self": "https://events.vin.li/api/v1/events/49f0f996-ace4-4fb2-bcd1-be1ae4979866",
                "notifications": "https://events.vin.li/api/v1/events/49f0f996-ace4-4fb2-bcd1-be1ae4979866/notifications"
            }
        },
        {
            "id": "6bcad159-a0dc-4962-97bb-52195b02abd7",
            "timestamp": "2016-12-14T22:40:28.064Z",
            "deviceId": "eb4f66ec-4050-4052-9559-baf5d8eb8511",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "eventType": "dtc-on",
            "object": {
                "id": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
                "type": "vehicle"
            },
            "meta": {
                "code": "313bc7d7-1fc6-491f-9e02-c3d02e64994c"
            },
            "links": {
                "self": "https://events.vin.li/api/v1/events/6bcad159-a0dc-4962-97bb-52195b02abd7",
                "notifications": "https://events.vin.li/api/v1/events/6bcad159-a0dc-4962-97bb-52195b02abd7/notifications"
            }
        }
    ],
    "meta": {
        "pagination": {
            "remaining": 1214,
            "until": "2016-10-20T18:09:29.977Z",
            "since": "1970-01-01T00:00:00.000Z",
            "limit": 3,
            "sortDir": "desc",
            "links": {
                "prior": "https://events.vin.li/api/v1/vehicles/48ef1264-7fd2-4319-8789-g9a6b85b7a8f/events?until=1476971981756"
            }
        }
    }
}
``` 

### Get an Event
```endpoint
GET https://events.vin.li/api/v1/events/538f1195-a733-4ee7-a4e8-1fbbe7131f6a
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://events.vin.li/api/v1/events/538f1195-a733-4ee7-a4e8-1fbbe7131f6a"
```
#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "event": {
        "id": "538f1195-a733-4ee7-a4e8-1fbbe7131f6a",
        "timestamp": "2015-05-22T23:33:57.000Z",
        "deviceId": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
        "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
        "stored": "2015-05-22T23:33:58.741Z",
        "storageLatency": 1741,
        "eventType": "rule-leave",
        "meta": {
            "direction": "leave",
            "firstEval": false,
            "rule": {
                "id": "429f9aa7-4c97-42c1-a459-ee1df6bc625b",
                "name": "Speed Limit",
                "deviceId": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
                "boundaries": [
                    {
                        "id": "0cadb0c8-a1c3-4176-86f2-20280ea72ad9",
                        "type": "parametric",
                        "parameter": "vehicleSpeed",
                        "min": 48
                    }
                ],
                "evaluated": true,
                "covered": false,
                "createdAt": null,
                "links": {
                    "self": "https://rules.vin.li/api/v1/rules/429f9aa7-4c97-42c1-a459-ee1df6bc625b"
                }
            },
            "message": {
                "id": "60afa670-d15b-4d2f-81bf-a068f4a9a7fb",
                "timestamp": "2015-05-22T23:33:57.000Z",
                "snapshot": {
                    "location": {
                        "lat": 33.0246240995378,
                        "lon": -97.0560955928522
                    },
                    "vehicleSpeed": 32
                }
            }
        },
        "object": {
            "id": "429f9aa7-4c97-42c1-a459-ee1df6bc625b",
            "type": "rule",
            "appId": "b75afd8f-7247-46e6-a0f9-04f187c9d9bd"
        },
        "links": {
            "self": "https://events.vin.li/api/v1/events/538f1195-a733-4ee7-a4e8-1fbbe7131f6a",
            "notifications": "https://events.vin.li/api/v1/events/538f1195-a733-4ee7-a4e8-1fbbe7131f6a/notifications"
        }
    }
}
```

## Subscriptions
In order to receive notification for events, your application should subscribe to events by type for each device or vehicle.

Each Subscription relates to a given event type or class of events from a given Device/Vehicle and specifies the external URL that will be called when the event occurs and any additional “App Data” that should be included.

### Create a Subscription for a Device
A Subscription must include, at a minimum an `eventType` and a `url`. Additionally, if the subscription references a given Rule, it must be included in the object.

Vinli will POST to the `url` you provide when the event you've subscribed to occurs.

```endpoint
POST https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions
```
#### Body
```json
{
    "subscription" : {
        "eventType" : "startup",
        "url": "https://myapp.com/notifications"
    }
}
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X POST "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions" -d '{
    "subscription" : {
        "eventType" : "startup",
        "url": "https://myapp.com/notifications"
    }
}'
```
```objc
//todo
```
#### Response
```json
HTTP/1.1 201 CREATED
Content-Type: application/json
```
```json
{
    "subscription" : {
        "id": "77965f0f-d468-48e1-9585-69d547900058",
        "deviceId": "de01abb1-453d-4293-831a-f0d804b48fdf",
        "eventType": "startup",
        "url": "https://myapp.com/notifications",
        "createdAt": "2015-06-16T12:54:09.876Z",
        "updatedAt": "2015-06-16T12:54:09.876Z",
        "links": {
            "self": "https://events.vin.li/api/v1/subscriptions/77965f0f-d468-48e1-9585-69d547900058",
            "notifications": "https://events.vin.li/api/v1/subscriptions/77965f0f-d468-48e1-9585-69d547900058/notifications"
        }
    }
}
```

### Create a Subscription for a Vehicle
```endpoint
POST https://events.vin.li/api/v1/vehicles/48ef1264-7fd2-4319-8789-g9a6b85b7a8f/subscriptions
```
#### Body
```json
{
    "subscription" : {
        "eventType" : "startup",
        "url": "https://myapp.com/notifications"
    }
}
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X POST "https://events.vin.li/api/v1/vehicles/48ef1264-7fd2-4319-8789-g9a6b85b7a8f/subscriptions" -d '{
    "subscription" : {
        "eventType" : "startup",
        "url": "https://myapp.com/notifications"
    }
}'
```
```objc
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "subscriptions": [
        {
            "id": "917fb546-5666-4fdd-aed6-53fa099b313b",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "eventType": "rule-*",
            "object": {
                "id": "58f815b9-693d-450a-8814-779c9bf8ad6f",
                "type": "rule"
            },
            "url": "https://myapp.com/notifications",
            "appData": "{\"message\":\"This is your app-specific data\"}"
            "createdAt": "2015-06-16T12:54:09.876Z",
            "updatedAt": "2015-06-16T12:54:09.876Z",
            "links": {
                "self": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b",
                "notifications": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b/notifications"
            }
        },
        {
            "id": "829fb457-4757-4fdd-aed6-53fa108b402b",
            "eventType": "startup",
            "url": "https://myapp.com/notifications",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "object": null,
            "appData": null,
            "createdAt": "2016-01-25T19:35:35.148Z",
            "updatedAt": "2016-01-25T19:35:35.148Z",
            "links": {
              "self": "https://events.vin.li/api/v1/subscriptions/829fb457-4757-4fdd-aed6-53fa108b402b",
              "notifications": "https://events.vin.li/api/v1/subscriptions/829fb457-4757-4fdd-aed6-53fa108b402b/notifications"
            }
        },
        ...
    ],
    "meta": {
        "pagination": {
            "total": 80,
            "limit": 20,
            "offset": 0,
            "links": {
                "first": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?offset=0&limit=20",
                "last": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?offset=60&limit=20",
                "next": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?offset=20&limit=20"
            }
        }
    }
}
```
### Create a Subscription for a Rule
When creating a Subscription to a Rule’s events, identification of the Rule is required. An application can only subscribe to Rule events for Rules to which it has access. A special eventType (`rule-*`) can be used to subscribe to both `rule-enter` and `rule-leave` events.

Also note that in the example below, `appData` is given so that this is passed on to the App whenever the subscription is triggered.

```endpoint
POST https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions
```
#### Body
```json
{
    "subscription" : {
        "eventType" : "rule-*",
        "url": "https://myapp.com/notifications",
        "appData": "{\"message\":\"This is your app-specific data\"}",
        "object": {
            "id": "41d68c9e-2914-4923-8593-3abdf299537c",
            "type": "rule"
        }
    }
}
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X POST "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions" -d '{
    "subscription" : {
        "eventType" : "rule-*",
        "url": "https://myapp.com/notifications",
        "appData": "{\"message\":\"This is your app-specific data\"}",
        "object": {
            "id": "41d68c9e-2914-4923-8593-3abdf299537c",
            "type": "rule"
        }
    }
}'
```

#### Response
```json
HTTP/1.1 201 CREATED
Content-Type: application/json
```
```json
{
    "subscription" : {
        "id": "917fb546-5666-4fdd-aed6-53fa099b313b",
        "deviceId": "de01abb1-453d-4293-831a-f0d804b48fdf",
        "eventType": "rule-*",
        "object": {
            "id": "58f815b9-693d-450a-8814-779c9bf8ad6f",
            "type": "rule"
        },
        "url": "https://myapp.com/notifications",
        "appData": "{\"message\":\"This is your app-specific data\"}"
        "createdAt": "2015-06-16T12:54:09.876Z",
        "updatedAt": "2015-06-16T12:54:09.876Z",
        "links": {
            "self": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b",
            "notifications": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b/notifications"
        }
    }
}
```

### Get Subscriptions for a Device
```endpoint
GET https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions"
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "subscriptions": [
        {
            "id": "917fb546-5666-4fdd-aed6-53fa099b313b",
            "deviceId": "de01abb1-453d-4293-831a-f0d804b48fdf",
            "eventType": "rule-*",
            "object": {
                "id": "58f815b9-693d-450a-8814-779c9bf8ad6f",
                "type": "rule"
            },
            "url": "https://myapp.com/notifications",
            "appData": "{\"message\":\"This is your app-specific data\"}"
            "createdAt": "2015-06-16T12:54:09.876Z",
            "updatedAt": "2015-06-16T12:54:09.876Z",
            "links": {
                "self": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b",
                "notifications": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b/notifications"
            }
        },
        ...
    ],
    "meta": {
        "pagination": {
            "total": 70,
            "limit": 20,
            "offset": 0,
            "links": {
                "first": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?offset=0&limit=20",
                "last": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?offset=60&limit=20",
                "next": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?offset=20&limit=20"
            }
        }
    }
}
```

### Get Subscriptions for a Vehicle
```endpoint
GET https://events.vin.li/api/v1/vehicles/48ef1264-7fd2-4319-8789-g9a6b85b7a8f/subscriptions
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://events.vin.li/api/v1/vehicles/48ef1264-7fd2-4319-8789-g9a6b85b7a8f/subscriptions"
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "subscriptions": [
        {
            "id": "917fb546-5666-4fdd-aed6-53fa099b313b",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "eventType": "rule-*",
            "object": {
                "id": "58f815b9-693d-450a-8814-779c9bf8ad6f",
                "type": "rule"
            },
            "url": "https://myapp.com/notifications",
            "appData": "{\"message\":\"This is your app-specific data\"}"
            "createdAt": "2015-06-16T12:54:09.876Z",
            "updatedAt": "2015-06-16T12:54:09.876Z",
            "links": {
                "self": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b",
                "notifications": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b/notifications"
            }
        },
        {
            "id": "829fb457-4757-4fdd-aed6-53fa108b402b",
            "eventType": "startup",
            "url": "https://myapp.com/notifications",
            "vehicleId": "48ef1264-7fd2-4319-8789-g9a6b85b7a8f",
            "object": null,
            "appData": null,
            "createdAt": "2016-01-25T19:35:35.148Z",
            "updatedAt": "2016-01-25T19:35:35.148Z",
            "links": {
              "self": "https://events.vin.li/api/v1/subscriptions/829fb457-4757-4fdd-aed6-53fa108b402b",
              "notifications": "https://events.vin.li/api/v1/subscriptions/829fb457-4757-4fdd-aed6-53fa108b402b/notifications"
            }
        },
        ...
    ],
    "meta": {
        "pagination": {
            "total": 80,
            "limit": 20,
            "offset": 0,
            "links": {
                "first": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?offset=0&limit=20",
                "last": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?offset=60&limit=20",
                "next": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?offset=20&limit=20"
            }
        }
    }
}
```

### Get a Subscription
```endpoint
GET https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b"
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "subscription": {
        "id": "917fb546-5666-4fdd-aed6-53fa099b313b",
        "deviceId": "de01abb1-453d-4293-831a-f0d804b48fdf",
        "eventType": "rule-*",
        "object": {
            "id": "58f815b9-693d-450a-8814-779c9bf8ad6f",
            "type": "rule"
        },
        "url": "https://myapp.com/notifications",
        "appData": "{\"message\":\"This is your app-specific data\"}"
        "createdAt": "2015-06-16T12:54:09.876Z",
        "updatedAt": "2015-06-16T12:54:09.876Z",
        "links": {
            "self": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b",
            "notifications": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b/notifications"
        }
    }
}
```

### Update a Subscription
Subscriptions are primarily immutable. The `url` and `appData` properties can be updated; however, the “functional” parts of the Subscription (`eventType`, `object`, etc.) are not modifiable.

```endpoint
POST https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions
```
#### Body
```json
{
    "subscription" : {
        "eventType" : "rule-*",
        "url": "https://myapp.com/v2/notifications",
        "appData": "{\"message\":\"This is some updated app-specific data\"}",
        "object": {
            "id": "41d68c9e-2914-4923-8593-3abdf299537c",
            "type": "rule"
        }
    }
}
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X POST "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions" -d '{
    "subscription" : {
        "eventType" : "rule-*",
        "url": "https://myapp.com/v2/notifications",
        "appData": "{\"message\":\"This is some updated app-specific data\"}",
        "object": {
            "id": "41d68c9e-2914-4923-8593-3abdf299537c",
            "type": "rule"
        }
    }
}'
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "subscription" : {
        "id": "917fb546-5666-4fdd-aed6-53fa099b313b",
        "deviceId": "de01abb1-453d-4293-831a-f0d804b48fdf",
        "eventType": "rule-*",
        "object": {
            "id": "58f815b9-693d-450a-8814-779c9bf8ad6f",
            "type": "rule"
        },
        "url": "https://myapp.com/v2/notifications",
        "appData": "{\"message\":\"This is some updated app-specific data\"}",
        "createdAt": "2015-06-16T12:54:09.876Z",
        "updatedAt": "2015-06-16T12:54:09.876Z",
        "links": {
            "self": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b",
            "notifications": "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b/notifications"
        }
    }
}
```

### Delete a Subscription
```endpoint
DELETE https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X DELETE "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b"ß
```

#### Repsonse
```json
HTTP/1.1 204 NO CONTENT
```
## Notications
Each time a subscription is triggered by an event, a new Notification is created that represents the event, subscription, and subsequent actions taken by the Vinli platform to notify your application.

Notification state is useful in debugging notification handlers on your App. This state, responseCode, and response properties will inform you as to the result of Event Services’ attempt to call the notification URL. A notification will be linked to one subscription and may contain additional metadata depending on the trigger of the subscription. In the case of subscriptions to Rules, this metadata

Fields included in a notification response include:

* `id` - ID of the notification
* `eventId` - ID of the event that triggered the notification
* `eventType` - Type of the associated event
* `eventTimestamp` - Time that the associated event occurred
* `subscriptionId` - ID of the subscription that this notification is associated with
* `url` - URL that was called by Event Service; this is copied from the subscription at the creation of the notification
* `payload` - String of the payload exactly as it was posted to the above URL
* `state` - Current state of the notification. State values may include created, queued, complete, or error

The state of a notification start as created and moves to queued as soon as it is placed in the notification queue to be processed. Once the notification has been posted to the callback URL, the state will be moved to complete if the HTTP transaction was completed and a response code in the 200s was received. If the HTTP call is not able to be completed or a response code other than the 200s, the state will become error.

If the notification is in the complete or error state, the fields below will be available in the response:

* `responseCode` - HTTP code received from the URL above
* `response` - String of the response from the URL above
* `notifiedAt` - Time that the HTTP call was initiated
* `respondedAt` - Time that the HTTP call was completed (if successful)

### Get a Notification
```endpoint
GET https://events.vin.li/api/v1/notifications/09704b59-83d9-44a5-a0f8-33d973bdac5e
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://events.vin.li/api/v1/notifications/09704b59-83d9-44a5-a0f8-33d973bdac5e"
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "notification": {
        "id": "09704b59-83d9-44a5-a0f8-33d973bdac5e",
        "eventId": "314d7fcd-d4d6-4b78-9804-b171db60790a",
        "eventType": "rule-leave",
        "eventTimestamp": "2015-06-16T13:12:34.000Z",
        "subscriptionId": "a896ff7d-ca46-4bf4-af71-b9b1573c3ef1",
        "state": "complete",
        "responseCode": 201,
        "response": "{\"status\":\"success\"}",
        "url": "https://myapp.com/notifications",
        "payload": "{\"notification\":{\"event\":{\"id\":\"314d7fcd-d4d6-4b78-9804-b171db60790a\",\"timestamp\":\"2015-06-16T13:12:34.000Z\",\"deviceId\":\"4bffefbb-9fba-43ee-aebe-ed7f7f2fae84\",\"stored\":\"2015-06-16T13:12:35.825Z\",\"storageLatency\":1825,\"eventType\":\"rule-leave\",\"meta\":{\"direction\":\"leave\",\"firstEval\":false,\"rule\":{\"id\":\"79f2e013-b6b9-44dd-9f34-4be5da971d7a\",\"name\":\"[geofence] Marlee\",\"deviceId\":\"4bffefbb-9fba-43ee-aebe-ed7f7f2fae84\",\"boundaries\":[],\"evaluated\":true,\"covered\":false,\"createdAt\":\"2015-06-16T12:54:09.601Z\",\"links\":{\"self\":\"https://rules.vin.li/api/v1/rules/79f2e013-b6b9-44dd-9f34-4be5da971d7a\",\"events\":\"https://events.vin.li/api/v1/devices/4bffefbb-9fba-43ee-aebe-ed7f7f2fae84/events?type=rule&objectId=79f2e013-b6b9-44dd-9f34-4be5da971d7a\",\"subscriptions\":\"https://events.vin.li/api/v1/devices/4bffefbb-9fba-43ee-aebe-ed7f7f2fae84/subscriptions?objectType=rule&objectId=79f2e013-b6b9-44dd-9f34-4be5da971d7a\"}},\"message\":{\"id\":\"cd339f3d-b0d8-49a9-a87d-ca7ee3a937e2\",\"timestamp\":\"2015-06-16T13:12:34.000Z\",\"snapshot\":{\"location\":{\"lat\":32.5536468870112,\"lon\":-96.1153222519258}}}},\"object\":{\"id\":\"79f2e013-b6b9-44dd-9f34-4be5da971d7a\",\"type\":\"rule\",\"appId\":\"b75afd8f-7247-46e6-a0f9-04f187c9d9bd\"}},\"subscription\":{\"id\":\"a896ff7d-ca46-4bf4-af71-b9b1573c3ef1\",\"deviceId\":\"4bffefbb-9fba-43ee-aebe-ed7f7f2fae84\",\"eventType\":\"rule-leave\",\"url\":\"https://myapp.com/notifications\",\"object\":{\"id\":\"79f2e013-b6b9-44dd-9f34-4be5da971d7a\",\"type\":\"rule\"},\"appData\":\"{\\\"message\\\":\\\"This is your app-specific data\\\"}\"}}}",
        "notifiedAt": "2015-06-16T13:12:35.862Z",
        "respondedAt": "2015-06-16T13:12:36.300Z",
        "createdAt": "2015-06-16T13:12:35.842Z",
        "links": {
            "self": "https://events.vin.li/api/v1/notifications/09704b59-83d9-44a5-a0f8-33d973bdac5e",
            "event": "https://events.vin.li/api/v1/devices/4bffefbb-9fba-43ee-aebe-ed7f7f2fae84/events/314d7fcd-d4d6-4b78-9804-b171db60790a",
            "subscription": "https://events.vin.li/api/v1/devices/4bffefbb-9fba-43ee-aebe-ed7f7f2fae84/subscriptions/a896ff7d-ca46-4bf4-af71-b9b1573c3ef1"
        }
    }
}
```

### Get Notifications for a Subscription
```endpoint
GET https://events.vin.li/api/v1/subscriptions/a896ff7d-ca46-4bf4-af71-b9b1573c3ef1/notifications
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://events.vin.li/api/v1/subscriptions/a896ff7d-ca46-4bf4-af71-b9b1573c3ef1/notifications"
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "notifications": [
        {
            "id": "09704b59-83d9-44a5-a0f8-33d973bdac5e",
            "eventId": "314d7fcd-d4d6-4b78-9804-b171db60790a",
            "eventType": "rule-leave",
            "eventTimestamp": "2015-06-16T13:12:34.000Z",
            "subscriptionId": "a896ff7d-ca46-4bf4-af71-b9b1573c3ef1",
            "state": "complete",
            "responseCode": 201,
            "response": "{\"status\":\"success\"}",
            "url": "https://myapp.com/notifications",
            "payload": "{...}",
            "notifiedAt": "2015-06-16T13:12:35.862Z",
            "respondedAt": "2015-06-16T13:12:36.300Z",
            "createdAt": "2015-06-16T13:12:35.842Z",
            "links": {
                "self": "https://events.vin.li/api/v1/notifications/09704b59-83d9-44a5-a0f8-33d973bdac5e",
                "event": "https://events.vin.li/api/v1/devices/4bffefbb-9fba-43ee-aebe-ed7f7f2fae84/events/314d7fcd-d4d6-4b78-9804-b171db60790a",
                "subscription": "https://events.vin.li/api/v1/devices/4bffefbb-9fba-43ee-aebe-ed7f7f2fae84/subscriptions/a896ff7d-ca46-4bf4-af71-b9b1573c3ef1"
            }
        }
    ],
    "meta": {
        "pagination": {
            "remaining": 2,
            "until": "2016-09-15T18:38:44.036Z",
            "since": "1970-01-01T00:00:00.000Z",
            "limit": 20,
            "sortDir": "desc",
            "links": {
                "prior": "https://events.vin.li/api/v1/subscriptions/f4366076-afe0-4b05-83ff-55b6ddde0984/notifications?until=1473961364647"
            }
        }
    }
}
```
### Get Notifications for an Event
Returns the notifications that were triggered for any subscription associated with a given event.
```endpoint
GET https://events.vin.li/api/v1/events/314d7fcd-d4d6-4b78-9804-b171db60790a/notifications
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://events.vin.li/api/v1/events/314d7fcd-d4d6-4b78-9804-b171db60790a/notifications"
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "notifications": [
        {
            "id": "09704b59-83d9-44a5-a0f8-33d973bdac5e",
            "eventId": "314d7fcd-d4d6-4b78-9804-b171db60790a",
            "eventType": "rule-leave",
            "eventTimestamp": "2015-06-16T13:12:34.000Z",
            "subscriptionId": "a896ff7d-ca46-4bf4-af71-b9b1573c3ef1",
            "state": "complete",
            "responseCode": 201,
            "response": "{\"status\":\"success\"}",
            "url": "https://myapp.com/notifications",
            "payload": "{...}",
            "notifiedAt": "2015-06-16T13:12:35.862Z",
            "respondedAt": "2015-06-16T13:12:36.300Z",
            "createdAt": "2015-06-16T13:12:35.842Z",
            "links": {
                "self": "https://events.vin.li/api/v1/notifications/09704b59-83d9-44a5-a0f8-33d973bdac5e",
                "event": "https://events.vin.li/api/v1/devices/4bffefbb-9fba-43ee-aebe-ed7f7f2fae84/events/314d7fcd-d4d6-4b78-9804-b171db60790a",
                "subscription": "https://events.vin.li/api/v1/devices/4bffefbb-9fba-43ee-aebe-ed7f7f2fae84/subscriptions/a896ff7d-ca46-4bf4-af71-b9b1573c3ef1"
            }
        }
    ],
    "meta": {
        "pagination": {
            "remaining": 0,
            "until": "2016-09-15T20:19:32.978Z",
            "since": "1970-01-01T00:00:00.000Z",
            "limit": 20,
            "sortDir": "desc",
            "links": {}
        }
    }
}
```
## Notification Payloads
When a subscription is triggered, an HTTP call using the “POST” method is made to the Subscription’s URL. This call uses content-type of “application/json” and sends a JSON representation containing a `notification` root object along with representations of the Event that triggered the notification and the associated Subscription. Below are several examples of Notifications for different types of Events.

Note that the `appData` attribute of the subscription property contains the Application-specific data that you created the Subscription with, if applicable.

In the example immediately below, the Subscription triggered is associated with a Rule. In this case, additional information is made available in the Notification including a representation of the Rule in the meta property. Additionally, a very useful property, `firstEval` is provided that lets your Application know whether or not this is the first evaluation of the Rule. The first evaluation of a Rule in which it can be established that the device is covered or not covered by the boundaries will always result in a notification. Using the firstEval property, your App can determine if the device was previously in a different state or was just in an unknown state.

### Rule-Leave
```json
{
    "notification": {
        "event": {
            "id": "314d7fcd-d4d6-4b78-9804-b171db60790a",
            "timestamp": "2015-06-16T13:12:34.000Z",
            "deviceId": "4bffefbb-9fba-43ee-aebe-ed7f7f2fae84",
            "eventType": "rule-leave",
            "object": {
                "id": "79f2e013-b6b9-44dd-9f34-4be5da971d7a",
                "type": "rule",
                "appId": "b75afd8f-7247-46e6-a0f9-04f187c9d9bd"
            },
            "meta": {
                "direction": "leave",
                "firstEval": false,
                "rule": {
                    "id": "79f2e013-b6b9-44dd-9f34-4be5da971d7a",
                    "name": "My Geofence",
                    "deviceId": "4bffefbb-9fba-43ee-aebe-ed7f7f2fae84",
                    "boundaries": [],
                    "evaluated": true,
                    "covered": false,
                    "createdAt": "2015-06-16T12:54:09.601Z",
                    "links": {
                        "self": "https://rules.vin.li/api/v1/rules/79f2e013-b6b9-44dd-9f34-4be5da971d7a",
                        "events": "https://events.vin.li/api/v1/devices/4bffefbb-9fba-43ee-aebe-ed7f7f2fae84/events?type=rule&objectId=79f2e013-b6b9-44dd-9f34-4be5da971d7a",
                        "subscriptions": "https://events.vin.li/api/v1/devices/4bffefbb-9fba-43ee-aebe-ed7f7f2fae84/subscriptions?objectType=rule&objectId=79f2e013-b6b9-44dd-9f34-4be5da971d7a"
                    }
                },
                "message": {
                    "id": "cd339f3d-b0d8-49a9-a87d-ca7ee3a937e2",
                    "timestamp": "2015-06-16T13:12:34.000Z",
                    "snapshot": {
                        "location": {
                            "lat": 32.5536468870112,
                            "lon": -96.1153222519258
                        }
                    }
                }
            }
        },
        "subscription": {
            "id": "a896ff7d-ca46-4bf4-af71-b9b1573c3ef1",
            "deviceId": "4bffefbb-9fba-43ee-aebe-ed7f7f2fae84",
            "eventType": "rule-leave",
            "url": "https://myapp.com/notifications",
            "object": {
                "id": "79f2e013-b6b9-44dd-9f34-4be5da971d7a",
                "type": "rule"
            },
            "appData": "{\"message\":\"This is your app-specific data\"}"
        }
    }
}
```

### Collision
```json
{
    "notification": {
        "event": {
            "id": "edae9b7a-c447-442d-aead-ee0bf4f5e6b4",
            "timestamp": "2016-08-22T23:12:59.607Z",
            "deviceId": "4bffefbb-9fba-43ee-aebe-ed7f7f2fae84",
            "stored": "2016-08-22T23:13:15.167Z",
            "storageLatency": 15560,
            "eventType": "collision",
            "object": {
                "id": "ba8d8890-3d4d-413a-ad8e-a3269d990e91",
                "type": "vehicle"
            },
            "links": {
                "self": "http://10.200.37.245:30003/api/v1/events/edae9b7a-c447-442d-aead-ee0bf4f5e6b4",
                "notifications": "http://10.200.37.245:30003/api/v1/events/edae9b7a-c447-442d-aead-ee0bf4f5e6b4/notifications"
            }
        },
        "subscription": {
            "id": "f4366076-afe0-4b05-83ff-55b6ddde0984",
            "deviceId": "4bffefbb-9fba-43ee-aebe-ed7f7f2fae84",
            "eventType": "collision",
            "url": "https://myapp.com/notifications",
            "appData": null,
            "createdAt": "2016-08-22T23:11:36.814Z",
            "updatedAt": "2016-08-22T23:11:36.814Z",
            "links": {
                "self": "http://10.200.37.245:30003/api/v1/subscriptions/f4366076-afe0-4b05-83ff-55b6ddde0984",
                "notifications": "http://10.200.37.245:30003/api/v1/subscriptions/f4366076-afe0-4b05-83ff-55b6ddde0984/notifications"
            }
        }
    }
}
```

### DTC-On
```json
{
    "notification": {
        "event": {
            "id": "aa2842c3-b647-48a1-80f1-cc6019ce387c",
            "timestamp": "2016-08-22T23:12:20.003Z",
            "deviceId": "4bffefbb-9fba-43ee-aebe-ed7f7f2fae84",
            "stored": "2016-08-22T23:12:22.036Z",
            "storageLatency": 2033,
            "eventType": "dtc-on",
            "meta": {
                "code": "313cc7d7-1ac6-491c-9e02-a3d08e62984a"
            },
            "object": {
                "id": "ba8d8890-3d4d-413a-ad8e-a3269d990e91",
                "type": "vehicle"
            },
            "links": {
                "self": "http://10.220.0.66:30003/api/v1/events/aa2842c3-b647-48a1-80f1-cc6019ce387c",
                "notifications": "http://10.220.0.66:30003/api/v1/events/aa2842c3-b647-48a1-80f1-cc6019ce387c/notifications"
            }
        },
        "subscription": {
            "id": "e480343c-172a-41da-81ef-ce7950790ee0",
            "deviceId": "4bffefbb-9fba-43ee-aebe-ed7f7f2fae84",
            "eventType": "dtc-on",
            "url": "https://myapp.com/notifications",
            "appData": null,
            "createdAt": "2016-08-22T23:09:22.023Z",
            "updatedAt": "2016-08-22T23:09:22.023Z",
            "links": {
                "self": "http://10.220.0.66:30003/api/v1/subscriptions/e480343c-172a-41da-81ef-ce7950790ee0",
                "notifications": "http://10.220.0.66:30003/api/v1/subscriptions/e480343c-172a-41da-81ef-ce7950790ee0/notifications"
            }
        }
    }
}
```
### Distance-Trigger
```json
{
    "notification": {
        "event": {
            "id": "4449b8a1-88ce-479e-83ba-46d233895519",
            "timestamp": "2016-07-18T22:32:41.737Z",
            "deviceId": "4bffefbb-9fba-43ee-aebe-ed7f7f2fae84",
            "stored": "2016-07-18T22:32:41.860Z",
            "storageLatency": 123,
            "eventType": "distance-trigger",
            "meta": {
                "odometerTrigger": {
                "id": "bc043c26-3d79-44ce-b08e-8193f4c5e493",
                "vehicleId": "03d8ec74-523b-4ff7-8f6f-8228146b93b9",
                "type": "specific",
                "threshold": 24146537.36,
                "events": 0,
                "links": {
                    "vehicle": "https://platform.vin.li/api/v1/vehicles/03d8ec74-523b-4ff7-8f6f-8228146b93b9"
                    }
                },
                "estimatedOdometer": 24158103.340000004
            },
            "object": {
                "id": "bc043c26-3d79-44ce-b08e-8193f4c5e493",
                "type": "odometer-trigger"
            },
            "links": {
                "self": "http://10.200.37.245:30003/api/v1/events/4449b8a1-88ce-479e-83ba-46d233895519",
                "notifications": "http://10.200.37.245:30003/api/v1/events/4449b8a1-88ce-479e-83ba-46d233895519/notifications"
            }
        },
        "subscription": {
            "id": "2fc61637-8e2d-465f-8518-cce48f205faf",
            "deviceId": "eb4f66ec-4050-4052-9559-baf5d8eb8511",
            "eventType": "distance-trigger",
            "url": "https://myapp.com/notifications",
            "appData": null,
            "createdAt": "2016-07-18T22:09:34.704Z",
            "updatedAt": "2016-07-18T22:09:34.704Z",
            "links": {
                "self": "http://10.200.37.245:30003/api/v1/subscriptions/2fc61637-8e2d-465f-8518-cce48f205faf",
                "notifications": "http://10.200.37.245:30003/api/v1/subscriptions/2fc61637-8e2d-465f-8518-cce48f205faf/notifications"
            }
        }
    }
}
```
### Startup
```json
{
    "notification": {
        "event": {
            "id": "5eca3320-7037-4eaf-8cea-08328bf25408",
            "timestamp": "2016-08-24T20:26:04.816Z",
            "deviceId": "4bffefbb-9fba-43ee-aebe-ed7f7f2fae84",
            "stored": "2016-08-24T20:26:08.809Z",
            "storageLatency": 3993,
            "eventType": "startup",
            "object": {
                "id": "2271db32-aa6c-4ae5-9d68-f371eb3d1cfb",
                "type": "vehicle"
            },
            "links": {
                "self": "http://10.220.0.66:30003/api/v1/events/5eca3320-7037-4eaf-8cea-08328bf25408",
                "notifications": "http://10.220.0.66:30003/api/v1/events/5eca3320-7037-4eaf-8cea-08328bf25408/notifications"
            }
        },
        "subscription": {
            "id": "050ea013-33f2-49ae-bcf2-f23032e6ca30",
            "deviceId": "4bffefbb-9fba-43ee-aebe-ed7f7f2fae84",
            "eventType": "startup",
            "url": "https://myapp.io/startup",
            "object": {
                "id": "2271db32-aa6c-4ae5-9d68-f371eb3d1cfb",
                "type": "vehicle"
            },
            "appData": null,
            "createdAt": "2016-08-24T20:25:18.017Z",
            "updatedAt": "2016-08-24T20:25:18.017Z",
            "links": {
                "self": "http://10.220.0.66:30003/api/v1/subscriptions/050ea013-33f2-49ae-bcf2-f23032e6ca30",
                "notifications": "http://10.220.0.66:30003/api/v1/subscriptions/050ea013-33f2-49ae-bcf2-f23032e6ca30/notifications"
            }
        }
    }
}
```
