
## Rules
Rule Service allows you to create developer-defined rules based on vehicle parameters, geofences, or a combination of both.

Rule Service evaluates a vehicle’s location and operating parameters. When the vehicle satisfies all of the boundary conditions for a Rule, an Event is created.

A Rule contains:

1. a Device identifier
2. a collection of Boundaries for the Device
3. a state which is always exactly one of:


* `unevaluated` meaning not enough geospatial data is available
* `uncovered` meaning at least one of the boundaries conditions is unsatisfied
* `covered` meaning that all of the boundary conditions are satisfied

A Rule is `covered` when all boundary conditions are true. A Rule is `uncovered` when at least one boundary condition is false. When there is insufficient data to determine whether a Rule is `covered` or `uncovered` the Rule’s state is `unevaluated`.

When sufficient geospatial data is available to change state, the Rule Service:
* changes the state of the Rule to `covered` or `uncovered`, and
* creates either a `rule-enter` or `rule-leave` event for applications

For example, suppose an app establishes a Boundary condition around the home of a vehicle owner. When the owner drives home from work, the Rule Service detects that a geospatial Boundary condition is satisfied, The service sets the Rule state to `covered` and then sends a `rule-entry` event to the app.

Likewise, when the vehicle owner leaves home for work, the Rule Service detects that a geospatial Boundary condition is no longer met. The service sets the Rule state to `uncovered` and then sends a `rule-leave` event to the app.

Applications can subscribe to these events in three ways:

* to the `rule-entry` only
* to the `rule-leave` only
* or to both with `rule-*`

## Boundaries
A Boundary is either:

* a geospatial boundary that defines a region on the Earth’s surface, or
* a parametric boundary that defines a range for some vehicle parameter

A geospatial boundary defines a circular, or polygonal geographic region by specifying:

* a single geographic point, and
* a radius in meters

OR
* an array of coordinates that make up a polygonal region



A Parametric boundary specifies either:

* a bounded range, such as “RPM between 2000 and 4000”, or
* an unbounded range, such as “RPM greater than 3500”

A Rule is “covered” when all Boundary conditions are true. This fact has important implications for rule design.

* Suppose an app developer adds two disjoint geospatial boundaries to a rule. The rule can never enter the “covered” state nor ever fire a “rule-entry” or “rule-leave” event. It will forever remain in the “unevaluated” state. Because the Device can only be in one location at a time, at best it can only satisfy one of the boundary conditions but never both.
* Similarly, a rule will never fire an event if the rule contains two disjoint parametric boundaries for the same vehicle parameter. For example, “RPM greater than 3500” and “RPM less than 2000” will forever remain in the “unevaluated” state.
Because of these implications, the Rule Service allows at most one geospatial boundary in a Rule. This eliminates the problem of disjoint geospatial regions. However, app developers must still avoid creating disjoint parametric boundaries.

## Rule API
Rules are immutable. Once created, a rule cannot be modified. To change a Rule, your app must delete an existing rule, and then create another one. Immutability ensures that a Rule is always in a perfectly consistent state.

### Get Rules for a Device
```endpoint
GET https://rules.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/rules
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://rules.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/rules"
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "rules" : [
        {
            "id" : "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "name" : "Speed over 70mph",
            "deviceId" : "de01abb1-453d-4293-831a-f0d804b48fdf",
            "evaluated": true,
            "covered": false,
            "createdAt": "2015-06-01T21:26:51.086Z",
            "links" : {
                "self" : "https://rules.vin.li/api/v1/rules/68d489c0-d7a2-11e3-9c1a-0800200c9a66",
                "events": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/events?type=rule&objectId=68d489c0-d7a2-11e3-9c1a-0800200c9a66",
                "subscriptions": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?objectType=rule&objectId=68d489c0-d7a2-11e3-9c1a-0800200c9a66"
            }
        },
    ...
    ],
    "meta" : {
        "pagination" : {
            "total" : 1431,
            "offset" : 0,
            "limit" : 20,
            "links" : {
                "first" : "https://rules.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/rules?offset=0&limit=20",
                "last" : "https://rules.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/rules?offset=1420&limit=20",
                "next" : "https://rules.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/rules?offset=20&limit=20"
            }
        }
    }
}
```

### Get a Rule
```endpoint
GET https://rules.vin.li/api/v1/rules/68d489c0-d7a2-11e3-9c1a-0800200c9a66
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://rules.vin.li/api/v1/rules/68d489c0-d7a2-11e3-9c1a-0800200c9a66"
```

#### Response
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "rule" : {
        "id" : "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
        "name" : "Speed over 35mph near Superdome",
        "boundaries" : [
            {
                "type" : "parametric",
                "parameter" : "vehicleSpeed",
                "min" : 35
            },
            {
                "type" : "radius",
                "lon" : -90.0811,
                "lat" : 29.9508,
                "radius" : 500
            }
        ],
        "deviceId" : "de01abb1-453d-4293-831a-f0d804b48fdf",
            "links" : {
            "self" : "https://rules.vin.li/api/v1/rules/68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "events": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/events?type=rule&objectId=68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "subscriptions": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?objectType=rule&objectId=68d489c0-d7a2-11e3-9c1a-0800200c9a66"
        }
    }
}
```

### Create a Rule for a Device
```endpoint
POST https://rules.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/rules
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X POST "https://rules.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/rules" -d '{
    "rule" : {
        "name" : "Speed over 35mph near Superdome",
        "boundaries" : [
            {
                "type" : "parametric",
                "parameter" : "vehicleSpeed",
                "min" : 35,
                "max" : null
            },
            {
                "type" : "radius",
                "lon" : -90.0811,
                "lat" : 29.9508,
                "radius" : 500
            }
        ]
    }
}'
```
```objc
coming soon
```

#### Body
```json
{
    "rule" : {
        "name" : "Speed over 35mph near Superdome",
        "boundaries" : [
            {
                "type" : "parametric",
                "parameter" : "vehicleSpeed",
                "min" : 35,
                "max" : null
            },
            {
                "type" : "radius",
                "lon" : -90.0811,
                "lat" : 29.9508,
                "radius" : 500
            }
        ]
    }
}
```
#### Polygon Example
```json
{
    "rule": {
        "name": "Polygon Boundary Example",
        "boundaries": [
            {
                "type": "polygon",
                "coordinates": [
                    [-96.7910099029541, 32.7838830957529],
                    [-96.7893073707819, 32.78267779866992],
                    [-96.79272651672362, 32.776558606411804],
                    [-96.79242610931395, 32.78189868775024],
                    [-96.79718971252441, 32.78254813524194],
                    [-96.7910099029541, 32.7838830957529]
                ]
            }
        ]
    }
}
```

#### Response
```json
HTTP/1.1 201 CREATED
```
```json
{
    "rule": {
        "id": "68d489c0-d7a2-11e3-9c1a-0800200c9a66",
        "name": "Speed over 35mph near the Superdome",
        "boundaries": [
            {
                "type": "parametric",
                "parameter": "vehicleSpeed",
                "min": 35
            },
            {
                "type": "radius",
                "lon": -90.0811,
                "lat": 29.9508,
                "radius": 500
            }
        ],
        "deviceId": "de01abb1-453d-4293-831a-f0d804b48fdf",
        "links": {
            "self": "https://rules.vin.li/api/v1/rules/68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "events": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/events?type=rule&objectId=68d489c0-d7a2-11e3-9c1a-0800200c9a66",
            "subscriptions": "https://events.vin.li/api/v1/devices/de01abb1-453d-4293-831a-f0d804b48fdf/subscriptions?objectType=rule&objectId=68d489c0-d7a2-11e3-9c1a-0800200c9a66"
        }
    }
}
```

### Delete a Rule

```endpoint
DELETE https://rules.vin.li/api/v1/rules/68d489c0-d7a2-11e3-9c1a-0800200c9a66
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X DELETE "https://rules.vin.li/api/v1/rules/68d489c0-d7a2-11e3-9c1a-0800200c9a66"
```

#### Response
```json
HTTP/1.1 204 NO CONTENT
```