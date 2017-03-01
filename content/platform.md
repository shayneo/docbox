

## Basics

Vinli Platform Service:

* authenticates your application, Vinli device and
* configures pagination

Authentication using OAUTH 2 is mandatory for all Vinli apps. Apps must authenticate themselves and user actions to use Vinli services.

Vinli paginates data using:
* resource lists for static resources, or
* streams for rapidly changing data

Pagination can alter the format of dates and times. It’s an important topic for apps that rely on telemetry data.

## Authentication
Apps must authenticate through Vinli Platform services. When you register an app in the [Vinli Developer Portal](https://dev.vin.li/), the Vinli Platform assigns a unique App ID and App Secret. Your app will need both, to authenticate with Vinli services.

All API calls must use HTTP/SSL. Vinli will reject all plain HTTP calls at the socket level.

### Application Authentication
Each request must include the App ID and App Secret in the Authorization header of the request. This takes the form of a standard BasicAuth header where the App ID is the username and the App Secret is the password. For example, an Application with the following credentials:

* App ID: `c87d5be0-2e69-11e4-8c21-0800200c9a66`
* App Secret: `HKLFFoSILb8VHFJD`
could request a list of all of its Devices using CURL with

`curl -u c87d5be0-2e69-11e4-8c21-0800200c9a66:HKLFFoSILb8VHFJD https://platform.vin.li/api/v1/devices`

and CURL will take care of setting the Authorization header. Almost all HTTP libraries can handle BasicAuth for you, as long as you have a username and password.

If you must implement BasicAuth yourself, follow the steps below to generate the header value:

1. Combine the App ID and App Secret using a colon. Ex: `c87d5be0-2e69-11e4-8c21-0800200c9a66:HKLFFoSILb8VHFJD`
2. Encode the string as Base64 (specifically the RFC2045-MIME variant).
3. Prepend the string “Basic ” (note the space after the word ‘Basic’) to the the encoded string.

For the example above, the Authorization header would be sent as:

`Authorization: Basic Yzg3ZDViZTAtMmU2OS0xMWU0LThjMjEtMDgwMDIwMGM5YTY2OkhLTEZGb1NJTGI4VkhGSkQ=`

Important: the App Secret should be kept safe and rotated often. You can reset the App Secret from the <a href="https://dev.vin.li/#/apps" target="_blank"> App Management page</a> of the Developer Portal.

### User Action Authentication
Vinli services require user actions to authernticate with OAuth 2.

In general, there are two types of OAuth 2 clients, those that expect response tokens and those that expect response codes.

Vinli supports two OAuth 2 flows:

* Implicit Grant Flow is used for clients that cannot secure their App Secret. For example, web clients and mobile apps.
* Authorization Code Flow is used for clients that can be secured against leaking their App Secret. For example, server clients or clients that require long-lived access.

Implicit Grant Flow clients are directly granted a token by the authentication service in exchange for their ID, redirect URI, and the user’s approval.

Authorization Code clients use a user-facing component to obtain a code from the authentication service in exchange for their ID, redirect URI, and the user’s approval. The user-facing component then hands the code to the secure client. The secure client can then obtain an access token from the authentication service in exchange for its ID, secret, and the authentication code.

To initiate the authentication flow, the client directs the user to:

`https://auth.vin.li/oauth/authorization/new?client_id={clientId}&redirect_uri={redirectUri}&response_type={responseType}`

Response Type options include:
* `code` - which will generate an Authorization code (following the Authorization Code Flow as described above)
* `token` - which will generate an access token (following the Implicate Granat Flow as described above)

After user authentication and app approval, the app should redirect to the provided redirect URI, which must match the redirect URI registered for the client. For the access token, the requested data will be in the fragment (after the #) portion of the URI. For the authentication code, the requested data will be in the query (after the ?). Error will be returned in the body.

### Developer Device Authentication
If you are testing with a Vinli device or a Virtual Vinli device that you want access to with your application, you'll need to follow the same Authentication flow that users would. There is no connection between your My Vinli account and your Vinli Developer account.

The easiest way to authenticate your device and generate a bearor token is to use the Implicate Grant Flow as described above. To do this:

1. Creat an App in the developer portal
2. Add a "Web" client to your app
3. Populate this URL with the Id and redirectUri from your client `https://auth.vin.li/oauth/authorization/new?client_id={clientId}&redirect_uri={redirectUri}&response_type=token`
4. Load the URL in your browser, and login with your My Vinli credentials
5. The access token will be appended to your Rediect URI (after the `#`) once you've successfully logged in
6. Optionally, you can hold on to the access token for future use

## Pagination
Vinli APIs paginate all list responses. Pagination varies slightly depending on the type of data being returned:

* Resource lists for relatively static resources (devices, groups, etc.)
* Streams for rapidly changing data (telemetry, location, etc.)

### Resource List Plagination
This pagination uses `offset` and `limit` to page through a sorted lists of objects. By default this sorting is based on the creation time and is sorted in reverse chronological order, i.e. time series order. The first item in the list is the most recent. This order can be modified using the `sortBy` and `sortDirection` parameters. As part of the `meta` property’s pagination field in the response, the API will return:

* `total` - the total number of items available regardless of pagination
* `limit` - the limit used for the list returned (This will be the limit requested by the client unless one was not passed, in which case the default for this method will be returned, or unless the limit requested by the client was larger than the max allowed for the method, in which case the maximum allowable limit will be returned)
* `offset` - the offset used for the list returned (This will be the offset requested by the client unless one was not passed in the call, in which case 0 will be returned)
* `links` - an object containing URLs for traversing the pages of the list
* `first` - URL for the first page
* `last` - URL for the last page
* `next` - URL for the next page (If the current page is the last page, this field will not be returned.)
* `prev` - URL for the previous page (If the current page is the first page, this field will not be returned.)

Pagination is done within the context of any other URL parameters passed. For instance, if a client requests transactions `since` January 1st, 2016 `until` February 1st, 2016 in chronological order, passing an `offset` of 0 will return the transactions starting on January 1st. Incrementing the `offset` value will page through only the results that fall within the original constraints (i.e. the last page will contain the last transaction prior to February 1st). The `total` returned will be the total available resources that match the constraints (in this case, `since` and `until`). As with all other requests, attempting to increase the `offset` beyond `total` will result in an empty response.

### Stream Pagination
This pagination uses the `since` and `until` parameters to traverse a constantly growing list of items. The most important use of this type of pagination is when dealing with historical data from Telemetry Services. In this situation, data are constantly being added to the front of the list as vehicles report additional telemetry information. In order to keep consistent paging, time constraints are placed on the data returned. In this way a single URL will continue to return the same set of data, even as more data are added to the front of the list.

* `remaining` - the number of items previous to the last item in the returned results and after the `since` parameters
* `limit` - the limit used for the list returned (This will be the limit requested by the client unless one was not passed, in which case the default for this method will be returned, or unless the limit requested by the client was larger than the max allowed for the method, in which case the maximum allowable limit will be returned)
* `links` - an object containing URLs for traversing the pages of the list * `prior` - URL for the next (older) page (If the current page is the oldest page, this field will not be returned.)

## Dates and Times

### Submitting Dates
As part of URLs, dates can be submitted in two ways: ISO8601 formatted or Unix Time. Both are accepted by the platform APIs and will be converted equally. As an example, the following are all equivalent as far as the Vinli platform is concerned and will retrieve the same set of snapshots (those occuring after 12:32pm CDT on September 7th, 2014):

ISO 8601

* `2014-09-07T17:32:57.893Z` --> `https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/snapshots?since=2014-09-07T17%3A32%3A57.893Z`
* `2014-09-07T17:32:57.893+00:00` --> `https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/snapshots?since=2014-09-07T17%3A32%3A57.893%2B00%3A00`
* `2014-09-07T12:32:57.893-05:00`--> `https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/snapshots?since=2014-09-07T12%3A32%3A57.893-05%3A00`

Unix Time

`1410111177893` --> `https://telemetry.vin.li/api/v1/devices/27a2ac50-d7bd-11e3-9c1a-0800200c9a66/snapshots?since=1410111177893`

There is obviously a lot that could be discussed regarding the benefits and drawbacks of each style of date. In general, Unix Time is completely unambiguous, is smaller in footprint (for URLs and storage), does not need to be URL encoded, and is available easily in all major lanuganges; however, ISO 8601 is much easier to read and debug as a human.

In either case, Vinli will handle the dates without issue.

### Receiving Dates

Where possible, Vinli Platform’s APIs will return dates as ISO 8601 formatted Strings. This makes working with the API with debugging tools much easier as the dates will already be easily human-readable. All major date libraries are able to parse ISO 8601 natively without much fuss.

Pagination metadata that uses the “Stream Pagination”, will generally return URLs with Unix Time query parameters. As stated above, this avoids any issues with URL encoding and provides for slightly smaller URLs.
