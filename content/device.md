
## Device Service

Each Vinli device has an associated Device ID by which it is referred to within the platform. However, before your application can access any data or perform any actions on a Device, it must be authorized by the owner of the device.

### Get Devices
This returns a paginated list of devices that are registered with your application sorted chronologically by when the device was added.

```endpoint
GET https://platform.vin.li/api/v1/devices
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://platform.vin.li/api/v1/devices"
```
```bash
vinli device list
```
```swift
//gets devices for logged in user

getDevicesOnSuccess({ (devicePager: VLDevicePager?, response: HTTPURLResponse?) in
    //success block
    }, onFailure: { (error:Error?, response: HTTPURLResponse?, bodyString: String?) in
    //failure block
})
```
```objc
//gets devices for logged in user

getDevicesOnSuccess:^(VLDevicePager *devicePager, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }

// OR get devices with a limit
getDevicesWithLimit:(nullable NSNumber *) offset:(nullable NSNumber *) onSuccess:^(VLDevicePager *devicePager, NSHTTPURLResponse *response) {
        //onSucccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```

#### Response
```bash
┌──────────────────────────────────────┬─────────────────┬─────────────────────────────────────────┐
│ ID                                   │ Name            │ Created                                 │
├──────────────────────────────────────┼─────────────────┼─────────────────────────────────────────┤
│ cb217b2d-df2c-43f7-b510-8bc3e11b4b79 │ Mystery Machine │ Thu Apr 26 2016 09:56:18 GMT-0500 (CDT) │
│ 7cac0d62-854f-41c3-a5b2-ba43c460058a │ 84 Sheepdog     │ Thu Apr 26 2016 09:56:51 GMT-0500 (CDT) │
│ 62975d30-b7dc-40f9-8412-ccd367572101 │ Mirth Mobile    │ Thu Apr 26 2016 10:02:22 GMT-0500 (CDT) │
└──────────────────────────────────────┴─────────────────┴─────────────────────────────────────────┘
                                                                                  Showing 1 - 3 of 3
```
```json
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
  "devices": [
    {
      "id": "ab4c96ec-4052-4002-9576-bef5d8eb8517",
      "name": "Vrrrooom",
      "chipId": "VV89CCF24172",
      "createdAt": "2016-06-07T16:50:38.148Z",
      "icon": "https://vinli-public.s3.amazonaws.com/auth-service/prod/efd48eaf-4dfb-2a1e-8207-0e1037638532/cirpxptlm00000fbulfuxzxxj",
      "links": {
        "self": "https://platform.vin.li/api/v1/devices/ab4c96ec-4052-4002-9576-bef5d8eb8517",
        "vehicles": "https://platform.vin.li/api/v1/devices/ab4c96ec-4052-4002-9576-bef5d8eb8517/vehicles",
        "latestVehicle": "https://platform.vin.li/api/v1/devices/ab4c96ec-4052-4002-9576-bef5d8eb8517/vehicles/_latest",
        "rules": "https://rules.vin.li/api/v1/devices/ab4c96ec-4052-4002-9576-bef5d8eb8517/rules",
        "events": "https://events.vin.li/api/v1/devices/ab4c96ec-4052-4002-9576-bef5d8eb8517/events",
        "subscriptions": "https://events.vin.li/api/v1/devices/ab4c96ec-4052-4002-9576-bef5d8eb8517/subscriptions",
        "trips": "https://trips.vin.li/api/v1/devices/ab4c96ec-4052-4002-9576-bef5d8eb8517/trips"
      }
    },
    {
      "id": "2a73c50d-1121-4913-94e6-770f22a5e979",
      "name": "Virtual Vinli Hot Rod",
      "chipId": "VV2A406C5147",
      "createdAt": "2016-09-14T09:02:20.998Z",
      "icon": "https://vinli-public.s3.amazonaws.com/auth-service/prod/eed49eaf-4dfb-2a1e-8207-0e1037638532/cirpxptlm00000fbulguozxzj",
      "links": {
        "self": "https://platform.vin.li/api/v1/devices/2a73c50d-1121-4913-94e6-770f22a5e979",
        "vehicles": "https://platform.vin.li/api/v1/devices/2a73c50d-1121-4913-94e6-770f22a5e979/vehicles",
        "latestVehicle": "https://platform.vin.li/api/v1/devices/2a73c50d-1121-4913-94e6-770f22a5e979/vehicles/_latest",
        "rules": "https://rules.vin.li/api/v1/devices/2a73c50d-1121-4913-94e6-770f22a5e979/rules",
        "events": "https://events.vin.li/api/v1/devices/2a73c50d-1121-4913-94e6-770f22a5e979/events",
        "subscriptions": "https://events.vin.li/api/v1/devices/2a73c50d-1121-4913-94e6-770f22a5e979/subscriptions",
        "trips": "https://trips.vin.li/api/v1/devices/1a73c50d-1171-4915-94e8-170a21a5e978/trips"
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 2,
      "limit": 20,
      "offset": 0,
      "links": {
        "first": "https://platform.vin.li/api/v1/devices?limit=20&offset=0",
        "last": "https://platform.vin.li/api/v1/devices?limit=20&offset=0"
      }
    }
  }
}
```


### Get a Device
```endpoint
GET https://platform.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66
```
#### Request
```swift
getDeviceWithId(deviceId: String, onSuccess: { (device: VLDevice?, response: HTTPURLResponse?) in
            //success block
    }) { (error: Error?, response: HTTPURLResponse?, bodyString: String?) in
            //faulure block
    }
```
```objc
getDeviceWithId:(nonnull NSString *) onSuccess:^(VLDevice *device, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```
```curl
curl -u APP_ID:APP_SECRET -X GET "https://platform.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66"
```
#### Response
```json
{
  "device": {
    "id": "821374c0-d6d8-11e3-9c1a-0800200c9a66",
    "name": "Mystery Machine",
    "chipId": "VV55C6887CBA",
    "createdAt": "2016-04-07T14:56:18.306Z",
    "icon": "https://vinli-public.s3.amazonaws.com/auth-service/prod/3de63923-c9bc-4ca4-b1f1-50daed3ab76c/cimqf7cnm01020ecwvyx8ae45",
    "links": {
      "self": "https://platform.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66",
      "vehicles": "https://platform.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66/vehicles",
      "latestVehicle": "https://platform.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66/vehicles/_latest",
      "rules": "https://rules.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66/rules",
      "events": "https://events.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66/events",
      "subscriptions": "https://events.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66/subscriptions",
      "trips": "https://trips.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66/trips"
    }
  }
}
```


### Register a Device
This route is only accessible by Enterprise applications. Consumer applications gain and lose devices as users authorize access via the OAuth flow in My Vinli.

Your application may register a device after it has been authorized by the owner of the device (See section above on “Authentication for User Actions”). This step is necessary before your application can access any data from the device or perform any actions on the device.

A two-step process allow you to manage device authorization independent of user action. You can remove a device without requiring a user to revoke access to the device.

```endpoint
POST https://platform.vin.li/api/v1/devices
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X POST "https://platform.vin.li/api/v1/devices" -d '{
    "device": {
        "id": "821374c0-d6d8-11e3-9c1a-0800200c9a66"
    }
}
```
#### Body
```json
{
    "device": {
        "id": "821374c0-d6d8-11e3-9c1a-0800200c9a66"
    }
}
```

#### Response
```json
HTTP/1.1 201 CREATED
```
```json
{
    "device" : {
        "id" : "821374c0-d6d8-11e3-9c1a-0800200c9a66",
        "links" : {
            "self" : "https://platform.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66",
            "vehicles" : "https://platform.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66/vehicles",
            "latestVehicle" : "https://platform.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66/vehicles/_latest"
        }
    }
}
```

### Deregister a Device
This route is only accessible by Enterprise applications. Consumer applications gain and lose devices as users authorize access via the OAuth flow in MyVinli.

Deregistering a Device from your application prevents you from accessing that device’s data. Note this has several various effects on other section of the Vinli Platform. For instance, Event Services will remove any Rules associated with the device, Safety Services will remove any Emergency Contact actions from the Device (if your application registered the Device with Safety Services), and Diagnostic Services will remove any DTC alerts for this Device registered by your Application.

It’s important to note that deregistering a Device is an Application-level action that will have no effect on any other Application (yours or someone else’s) that has been authorized for the Device.

```endpoint
DELETE https://platform.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X DELETE "https://platform.vin.li/api/v1/devices/821374c0-d6d8-11e3-9c1a-0800200c9a66"
```

#### Response
```json
HTTP/1.1 204 NO CONTENT
```