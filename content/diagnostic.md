
## Diagnostic Service Overview
In addition to transmitting real-time vehicle telemetry information, the Vinli Device interrogates the vehicle for the status of the malfunction indicator lamp MIL or Check Engine Light. If the device detects that the MIL is illuminated, it requests the active diagnostic trouble codes DTCs for the vehicle. All of this information is sent to the Vinli Platform and can be accessed via the Diagnostic Service API.

## Get DTCs for a Vehicle
This provides historical record of DTC codes for a given vehicle. Each time a new DTC code is seen, it triggers a DTC Event. These events either resolve when the DTC code is no longer seen or remain open until the code is resolved.

The state query param may be used to filter the response. Valid values are active and inactive. These will filter the response to only include either DTC codes that are still on presently or not. The absence of the state query param will not filter the response and so the response will contain the full history DTC codes.

```endpoint
GET https://diagnostic.vin.li/api/v1/vehicles/47fa348e-c3fa-4cad-8272-61940eae7748/codes
```
#### Request
```curl
curl -X GET "https://diagnostic.vin.li/api/v1/vehicles/47fa348e-c3fa-4cad-8272-61940eae7748/codes"
```
```objc
getDtcsForVehicleWithId:(NSString *) timeSeries:(VLTimeSeries *) onSuccess:^(VLDtcPager *dtcPager, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```

#### Response
```json
{
  "codes": [
    {
      "id": "dd46be07-24d0-48ad-be76-c459d35661ed",
      "deviceId": "397c302b-b083-4e5f-940b-15824b228e0b",
      "vehicleId": "7e94bdb6-7578-484d-99f5-37dec3e172b6",
      "number": "P0102",
      "description": "Mass or Volume Air Flow Sensor \"A\" Circuit Low",
      "start": "2015-12-01T19:58:58.279Z",
      "stop": null,
      "links": {
        "code": "http://diagnostic.vin.li/api/v1/codes/27268249-a716-402c-8550-7fc0d4ae6335",
        "device": "http://platform.vin.li/api/v1/devices/397c302b-b083-4e5f-940b-15824b228e0b",
        "vehicle": "http://platform.vin.li/api/v1/vehicles/7e94bdb6-7578-484d-99f5-37dec3e172b6"
      }
    },
    {
      "id": "02ad82a5-f6e6-4957-8f65-bc791d7399ae",
      "deviceId": "397c302b-b083-4e5f-940b-15824b228e0b",
      "vehicleId": "7e94bdb6-7578-484d-99f5-37dec3e172b6",
      "number": "P0101",
      "description": "Mass or Volume Air Flow Sensor \"A\" Circuit Range/Performance",
      "start": "2015-12-01T19:58:58.279Z",
      "stop": null,
      "links": {
        "code": "http://diagnostic.vin.li/api/v1/codes/a5cc128c-9a9b-487d-a6dd-375a9cc62dc4",
        "device": "http://platform.vin.li/api/v1/devices/397c302b-b083-4e5f-940b-15824b228e0b",
        "vehicle": "http://platform.vin.li/api/v1/vehicles/7e94bdb6-7578-484d-99f5-37dec3e172b6"
      }
    },
    {
      "id": "91e105ab-4f65-434e-8f41-088735299319",
      "deviceId": "397c302b-b083-4e5f-940b-15824b228e0b",
      "vehicleId": "7e94bdb6-7578-484d-99f5-37dec3e172b6",
      "number": "P0100",
      "description": "Mass or Volume Air Flow Sensor \"A\" Circuit",
      "start": "2015-12-01T19:58:58.279Z",
      "stop": null,
      "links": {
        "code": "http://diagnostic.vin.li/api/v1/codes/88853bda-e43e-4f60-bd72-8083ff02c85f",
        "device": "http://platform.vin.li/api/v1/devices/397c302b-b083-4e5f-940b-15824b228e0b",
        "vehicle": "http://platform.vin.li/api/v1/vehicles/7e94bdb6-7578-484d-99f5-37dec3e172b6"
      }
    }
  ],
  "meta": {
    "pagination": {
      "remaining": 0,
      "until": "2015-12-01T19:58:58.761Z",
      "since": "1970-01-01T00:00:00.000Z",
      "limit": 20,
      "sortDir": "desc",
      "links": {}
    }
  }
}
```

## Query by State
A request like `GET https://diagnostic.vin.li/api/v1/vehicles/47fa348e-c3fa-4cad-8272-61940eae7748/codes` will return all DTCs for a given vehicle, but sometimes you only want DTCs that are currently active (or inactive). To do this, simply add the `state` query parameter.

`state` will accept the following options:
* `active`
* `inactive`
* `all` (which is the default)

```endpoint
GET https://diagnostic.vin.li/api/v1/vehicles/47fa348e-c3fa-4cad-8272-61940eae7748/codes?state=active
```

## Get a DTC
This route returns a specific DTC occurrence.

```endpoint
GET https://diagnostic.vin.li/api/v1/codes/313cc7d7-1ad6-491k-9e02-a3f48e62984a
```
#### Request
```curl
curl -X GET "https://diagnostic.vin.li/api/v1/codes/313cc7d7-1ad6-491k-9e02-a3f48e62984a"
```
```objc
getCodeWithId:(NSString *) onSuccess:^(VLCode *code, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```

#### Response
```json
{
  "code": {
    "id": "313cc7d7-1ad6-491k-9e02-a3f48e62984a",
    "make": "generic",
    "system": "powertrain",
    "subsystem": "Fuel and air metering",
    "number": "P0087",
    "description": "Fuel Rail/System Pressure - Too Low Bank 1",
    "links": {
      "self": "https://diagnostic.vin.li/api/v1/codes/313cc7d7-1ad6-491k-9e02-a3f48e62984a"
    }
  }
}
```

## Battery Status
This provides a general health status for a vehicle’s battery. Possible statuses include:
* `green` indicates that the battery is likely to start
* `yellow` indicates that the battery may have issues starting
* `red` indicates a battery is likely to not start
* `null` indicates that Vinli could not determine the status based on the data provided

```endpoint
GET https://diagnostic.vin.li/api/v1/vehicles/38ff2972-7fd2-4319-8389-b9a8b84a7c8f/battery_statuses/_current
```

#### Request
```curl
curl -X GET "https://diagnostic.vin.li/api/v1/vehicles/38ff2972-7fd2-4319-8389-b9a8b84a7c8f/battery_statuses/_current"
```
```objc
getCurrentBatteryStatusWithVehicleId:(nonnull NSString *) onSuccess:^(VLBatteryStatus *batteryStatus, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```

#### Response
```json
{
  "batteryStatus": {
    "status": "green",
    "timestamp": "2016-08-21T20:00:22.680Z"
  }
}
```

## DTC Lookup
Get Information About a DTC Code
There’s a lot of information encoded in the DTC codes reported by a Vehicle. This method is meant to provide this information for a given DTC code so that your Application can present useful information to the end-user.

```endpoint
GET https://diagnostic.vin.li/api/v1/codes?number=P0001
```
#### Request
```curl
curl -X GET "https://diagnostic.vin.li/api/v1/codes?number=P0001"
```
```objc
getCodesWithPID:(NSString *) limit:(NSNumber *) offset:(NSNumber *) onSuccess:^(VLCodePager *codePager, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```

#### Response
```json
{
  "codes": [
    {
      "id": "2db60bc5-0548-43ee-91c0-c34d59ce71ce",
      "make": "generic", 
      "system": "powertrain",
      "subsystem": "Fuel and air metering",
      "number": "P0001",
      "description": "Fuel Volume Regulator Control Circuit/Open",
      "links": {
        "self": "https://diagnostic.vin.li/api/v1/codes/2db60bc5-0548-43ee-91c0-c34d59ce71ce"
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 7195,
      "limit": 20,
      "offset": 0,
      "links": {
        "first": "https://diagnostic.vin.li/api/v1/codes?number=P0001&make=generic&limit=20&offset=0",
        "last": "https://diagnostic.vin.li/api/v1/codes?number=P0001&make=generic&limit=20&offset=7180",
        "next": "https://diagnostic.vin.li/api/v1/codes?number=P0001&make=generic&limit=20&offset=20"
      }
    }
  }
}
```