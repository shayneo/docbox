

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

## Event API

### Get Events for a Device

### Get Events for a Vehicle

### Get an Event

## Subscriptions

### Create a Subscription for a Device

### Create a Subscription for a Vehicle

### Create a Subscription for a Rule

### Get Subscriptions for a Device

### Get Subscriptions for a Vehicle

### Get a Subscription

### Update a Subscription

### Delete a Subscription

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

