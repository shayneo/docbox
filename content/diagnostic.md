
## Diagnostic Service Overview
In addition to transmitting real-time vehicle telemetry information, the Vinli Device interrogates the vehicle for the status of the malfunction indicator lamp (MIL) or “Check Engine Light”. If the device detects that the MIL is illuminated, it requests the active diagnostic trouble codes (DTCs) for the vehicle. All of this information is sent to the Vinli Platform and can be accessed via the Diagnostic Service API.

## Get DTCs for a Vehicle
This provides historical record of DTC codes for a given vehicle. Each time a new DTC code is seen, it triggers a DTC Event. These events either resolve when the DTC code is no longer seen or remain “open” until the code is resolved.

The state query param may be used to filter the response. Valid values are active and inactive. These will filter the response to only include either DTC codes that are still on presently or not. The absence of the state query param will not filter the response and so the response will contain the full history DTC codes.

```endpoint
GET https://diagnostic.vin.li/api/v1/vehicles/47fa348e-c3fa-4cad-8272-61940eae7748/codes
```

## Get a DTC

## DTC Lookup