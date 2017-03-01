## Behavioral Service Overview

Based on long-term driving data, Vinli calculates and keeps track of behavioral statistics for particular devices and vehicles.

The scores reported by Behavioral Services are meant to convey a driver’s overall risk categorization based on historical data gathered by the Vinli device; they are by no means a be-all-end-all measure of the likelihood that a driver will be involved in a collision. Safe driving involves so many other factors that are not measurable by the Vinli Device; however, Behavioral Services attempts to categorize risk based on what data are available.

The results of these analysis are “Report Cards” for both a single Trip and for a Device’s lifetime. Each report is based on the results of three categories of behavior:

* Driver Behavior - the risk based on driving habits detected from the vehicle telemetry including aggressive inputs, erratic driving, speeding, etc.
* Vehicle Condition - the risk based on data gathered about vehicle’s maintenance condition
* Travel Patterns - the risk based on where the driver travels most frequently

## Report Cards
The Driver Report Card contains the letter grades for trips associated with a device. They are representd as school-like grades such as A or C.

### Get Report Cards for a Device
Returns a Report Card based on historical data for a specified period. In some cases, not enough information was gathered to generate a Report Card. In these cases, the grades will be reported as “I” (for “Incomplete” to keep the school report card metaphore going).

```endpoint
GET https://behavioral.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58/report_cards
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://behavioral.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58/report_cards"
```
```objc
getReportCardsForDeviceWithId:(nonnull NSString *) timeSeries:(nullable VLTimeSeries *) onSuccess:^(VLReportCardPager *reportCardPager, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```

#### Response
```json
{
  "reportCards" : [
    {
      "id": "549d628c-48dc-412d-8087-44a9f82f187e",
      "deviceId": "fe4bbc20-cc90-11e3-8e05-f3abac5b6b58",
      "vehicleId": "ca10cd7a-d2a5-4bb3-b47b-2aa0b8848f55",
      "tripId": "b9e58eb4-0743-45e9-b9c6-86500f5412bb",
      "grade": "A",
      "links": {
        "self": "https://behavioral.vin.li/api/v1/report_cards/549d628c-48dc-412d-8087-44a9f82f187e",
        "trip": "https://trips.vin.li/api/v1/trips/b9e58eb4-0743-45e9-b9c6-86500f5412bb",
        "device": "https://platform.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58",
        "vehicle": "https://platform.vin.li/api/v1/vehicles/ca10cd7a-d2a5-4bb3-b47b-2aa0b8848f55"
      }
    }
  ],
  "meta": {
    "pagination": {
      "remaining": 34,
      "until": "2015-08-13T22:20:59.330Z",
      "since": "1970-01-01T00:00:00.000Z",
      "limit": 20,
      "sortDir": "desc",
      "links": {
        "prior": "https://behavioral.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58/report_cards?until=1439418498459"
      }
    }
  }
}
```

### Get Report Cards for a Vehicle
Returns a Report Card based on historical data for a specified period for a given vehicle. In some cases, not enough information was gathered to generate a Report Card. In these cases, the grades will be reported as “I” (for “Incomplete” to keep the school report card metaphore going).

```endpoint
GET https://behavioral.vin.li/api/v1/vehicles/ca10cd7a-d2a5-4bb3-b47b-2aa0b8848f55/report_cards
```
#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://behavioral.vin.li/api/v1/vehicles/ca10cd7a-d2a5-4bb3-b47b-2aa0b8848f55/report_cards"
```
```objc
getReportCardsForVehicleWithId:(nonnull NSString *) timeSeries:(nullable VLTimeSeries *) onSuccess:^(VLReportCardPager *reportCardPager, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```

#### Response
```json
{
  "reportCards" : [
    {
      "id": "549d628c-48dc-412d-8087-44a9f82f187e",
      "deviceId": "fe4bbc20-cc90-11e3-8e05-f3abac5b6b58",
      "vehicleId": "ca10cd7a-d2a5-4bb3-b47b-2aa0b8848f55",
      "tripId": "b9e58eb4-0743-45e9-b9c6-86500f5412bb",
      "grade": "A",
      "links": {
        "self": "https://behavioral.vin.li/api/v1/report_cards/549d628c-48dc-412d-8087-44a9f82f187e",
        "trip": "https://trips.vin.li/api/v1/trips/b9e58eb4-0743-45e9-b9c6-86500f5412bb",
        "device": "https://platform.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58",
        "vehicle": "https://platform.vin.li/api/v1/vehicles/ca10cd7a-d2a5-4bb3-b47b-2aa0b8848f55"
      }
    }
  ],
  "meta": {
    "pagination": {
      "remaining": 34,
      "until": "2015-08-13T22:20:59.330Z",
      "since": "1970-01-01T00:00:00.000Z",
      "limit": 20,
      "sortDir": "desc",
      "links": {
        "prior": "https://behavioral-dev.vin.li/api/v1/vehicles/ca10cd7a-d2a5-4bb3-b47b-2aa0b8848f55/report_cards?until=1439418498459"
      }
    }
  }
}
```

### Get the Lifetime Report Card for a Device
Returns a Report Card based on all historical data available for a given Device, with a trip sample size that shows how many trips were used to calculate the overall grade.

```endpoint
GET https://behavioral.vin.li/api/v1/devices/602c6490-d7a3-11e3-9c1a-0800200c9a66/report_cards/overall
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://behavioral.vin.li/api/v1/devices/602c6490-d7a3-11e3-9c1a-0800200c9a66/report_cards/overall"
```
```objc
//null the VLTimeSeries
getOverallReportCardForDeviceWithId:(nonnull NSString *) timeSeries:(nullable VLTimeSeries *) onSuccess:^(VLOverallReportCard *reportCard, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```

#### Response
```json
{
  "reportCard": {
    "overallGrade": "A"
  },

  "tripSampleSize": 1131,
  "gradeCount": {
    "B": "108",
    "F": "1",
    "I": "9",
    "C": "24",
    "A": "1000",
    "D": "1"
  }
}
```

### Get a Report Card for a Time Segment
Returns a Report Card based on all historical data available for a given Device or Vehicle, within a time segment that you’ve defined using since and until query parameters.

This is helpful if you want to present the user something like, “Last week your driving score was a C”.

```endpoint
GET https://behavioral.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58/report_cards/overall?since=2016-12-05&until=2016-12-13
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://behavioral.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58/report_cards/overall?since=2016-12-05&until=2016-12-13"
```
```objc
//pass a VLTimeSeries for the date/time range you desire
getOverallReportCardForDeviceWithId:(nonnull NSString *) timeSeries:(nullable VLTimeSeries *) onSuccess:^(VLOverallReportCard *reportCard, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```

#### Response
```json
{
  "reportCard": {
    "overallGrade": "A"
  },
  "tripSampleSize": 50,
  "gradeCount": {
    "B": "135",
    "F": "1",
    "I": "9",
    "C": "24",
    "A": "1182",
    "D": "1"
  }
}
```

### Get a Report Card for a Trip
The Trip-specific Report Card contains the same data as the Long-Term and Lifetime Report Card but is specific for a particular Trip.

In some cases, the Trip is too short to generate the data necessary for the Report Card analysis to be run. In these cases, the grades will be reported as “I”.

```endpoint
GET https://behavioral.vin.li/api/v1/trips/b9e58eb4-0743-45e9-b9c6-86500f5412bb/report_cards/_current
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://behavioral.vin.li/api/v1/trips/b9e58eb4-0743-45e9-b9c6-86500f5412bb/report_cards/_current"
```
```objc
getReportCardForTripWithId:(nonnull NSString *) onSuccess:^(VLReportCard *reportCard, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```

#### Response
```json
{
  "reportCard" : {
    "id": "549d628c-48dc-412d-8087-44a9f82f187e",
    "deviceId": "fe4bbc20-cc90-11e3-8e05-f3abac5b6b58",
    "vehicleId": "ca10cd7a-d2a5-4bb3-b47b-2aa0b8848f55",
    "tripId": "b9e58eb4-0743-45e9-b9c6-86500f5412bb",
    "grade": "I",
    "links": {
      "self": "https://behavioral.vin.li/api/v1/report_cards/549d628c-48dc-412d-8087-44a9f82f187e",
      "trip": "https://trips.vin.li/api/v1/trips/b9e58eb4-0743-45e9-b9c6-86500f5412bb",
      "device": "https://platform.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58",
      "vehicle": "https://platform.vin.li/api/v1/vehicles/ca10cd7a-d2a5-4bb3-b47b-2aa0b8848f55"
    }
  }
}
```

### Get a Report Card
Returns a Report Card based on a specified report card id.

```endpoint
GET https://behavioral.vin.li/api/v1/report_cards/549d628c-48dc-412d-8087-44a9f82f187e
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://behavioral.vin.li/api/v1/report_cards/549d628c-48dc-412d-8087-44a9f82f187e"
```
```objc
getReportCardWithId:(nonnull NSString *) onSuccess:^(VLReportCard *reportCard, NSHTTPURLResponse *response) {
        //onSuccessBlock
    } onFailure:^(NSError *error, NSHTTPURLResponse *response, NSString *bodyString) {
        //onFailureBlock
    }
```

#### Response
```json
{
  "reportCard" : {
    "id": "549d628c-48dc-412d-8087-44a9f82f187e",
    "deviceId": "fe4bbc20-cc90-11e3-8e05-f3abac5b6b58",
    "vehicleId": "ca10cd7a-d2a5-4bb3-b47b-2aa0b8848f55",
    "tripId": "b9e58eb4-0743-45e9-b9c6-86500f5412bb"
    "grade": "I"
    "links": {
      "self": "https://behavioral.vin.li/api/v1/report_cards/549d628c-48dc-412d-8087-44a9f82f187e",
      "trip": "https://trips.vin.li/api/v1/trips/b9e58eb4-0743-45e9-b9c6-86500f5412bb",
      "device": "https://platform.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58",
      "vehicle": "https://platform.vin.li/api/v1/vehicles/ca10cd7a-d2a5-4bb3-b47b-2aa0b8848f55"
    }
  }
}
```