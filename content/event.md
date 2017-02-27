

## Overview
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

### Get Events for a Vehicle
```endpoint
GET https://events.vin.li/api/v1/vehicles/48ef1264-7fd2-4319-8789-g9a6b85b7a8f/events
```

### Get an Event
```endpoint
GET https://events.vin.li/api/v1/events/538f1195-a733-4ee7-a4e8-1fbbe7131f6a
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
curl -X POST "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions" -d '{
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
curl -X POST "https://events.vin.li/api/v1/vehicles/48ef1264-7fd2-4319-8789-g9a6b85b7a8f/subscriptions" -d '{
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
curl -X POST "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions" -d '{
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
curl -X GET "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions"
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
curl -X GET "https://events.vin.li/api/v1/vehicles/48ef1264-7fd2-4319-8789-g9a6b85b7a8f/subscriptions"
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
curl -X GET "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b"
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
curl -X POST "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions" -d '{
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
curl -X DELETE "https://events.vin.li/api/v1/subscriptions/917fb546-5666-4fdd-aed6-53fa099b313b"ß
```

#### Repsonse
```json
HTTP/1.1 204 NO CONTENT
```
## Notications

### Get a Notification

### Get Notifications for a Subscription

### Get Notifications for an Event

## Notification Payloads

### Rule-Leave

### Collision

### DTC-On

### Distance-Trigger

### Startup

