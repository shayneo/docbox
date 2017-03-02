
## Transaction Service

### Get All Transactions
Returns a list of all transactions performed by this Application.

Results are returned in reverse-chronological order, i.e. time series order, using the “Stream Pagination” method.

```endpoint
GET https://platform.vin.li/api/v1/transactions
```

#### Request
```curl
curl -u APP_ID:APP_SECRET -X GET "https://platform.vin.li/api/v1/transactions"
```

#### Response
```json
HTTP/1.1 200 OK
```
```json
{
    "transactions" : [
        {
            "id": "e7924989-e942-4ebb-a566-427984b91af1",
            "timestamp": "2015-06-22T00:30:19.455Z",
            "path": "/api/v1/devices?limit=1",
            "statusCode": 200,
            "method": "GET",
            "service": "vinli-platform-service"
        },
        {
            "id": "b7d746ce-1794-4796-9dc9-30ae091d1ce6",
            "timestamp": "2015-06-20T21:41:13.520Z",
            "path": "/api/v1/devices/c38ce5f2-0c4d-4d82-b301-fd87af5fcbd3/locations?limit=20",
            "service": "vinli-telemetry-service",
            "method": "GET",
            "statusCode": 200
        },
        ...
    ],
    "meta": {
        "stats": {
        "periodTotal": 1058,
        "serviceUsage": {
            "vinli-dummy-service": 226,
            "vinli-platform-service": 222,
            "vinli-event-service": 219,
            "vinli-telemetry-service": 124,
            "vinli-distance-service": 69,
            "vinli-behavioral-service": 53,
            "vinli-rule-service": 53,
            "vinli-trip-service": 48,
            "vinli-diagnostic-service": 31,
            "vinli-safety-service": 13
        },
        "allTimeTotal": 1058
        },
        "pagination": {
            "remaining": 1038,
            "until": "2016-12-19T19:48:01.135Z",
            "since": "1970-01-01T00:00:00.000Z",
            "limit": 20,
            "sortDir": "desc",
            "links": {
                "prior": "https://platform.vin.li/api/v1/transactions?until=1481558446263"
            }
        }
    }
}
```