
## Vinli API

Vinli is a platform for easily and quickly building connected car apps. Apps get vehicle data through Vinli services.

### Tier 1, raw data services
* Platform Service manages devices, gets vehicle information, and monitors transactions.
* Telemetry Service delivers time-series vehicle data.
* Event Service delivers vehicle events and offers powerful, rule-based event notifications.
* Diagnostic Service reveals the malfunction state of the vehicle and provides diagnostic trouble codes.
* Distance Service estimates the car odometer reading at a point in time and milage travelled in a time interval.

### Tier 2, structured data services:
* Trip Service organizes and summarizes telemetry by vehicle ignition and shutdown.
* Behavioral Service categorizes driver risk based on behavior, vehicle conditions, and geographical travel patterns. It assigns a risk score.
* Safety Service provides history and telemetry details of collisions.
* Rule Service creates event subscriptions based on vehicle state or geofences.

### Testing and Prototyping
You can quickly prototype an app using Virtual Vinli.

* select a Virtual Vinli Route
* get data from a Virtual Vinli Run of the route
* use the returned virtual data to test your ideas

### PIDs
Vinli supports most legislatively required, Mode 1 PIDs within the OBDII protocol. Additionally, we’re able to read the VIN. For a complete and up-to-date list of supported PIDs, please visit http://dev.vin.li/parameters.json

If you have a specific question about suppoted PIDs, or are interested in obtaining data points that aren’t shown in the parameters.json file, please email us at dev@vin.li