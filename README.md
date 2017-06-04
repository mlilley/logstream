Supports two possible ways to deal with data sizes that exceed machine resources:

1. Keep device list in memory, store events in external storage.
   - Device.addEvent(), Device.getEvent() return promises so could be replaced with (async) write/read from external.
   - Device maintains eventCount as only info required to maintain top N devices.

2. Store everything in external storage.
   - InMemoryDeviceStore.addDevice() returns promise so can be replaced with (async) write to db.

Assuming method to actually retrieve the top devices is out of scope, but this could be achieved for example, through hosting an inproc http server that accepts requests for the top devices and streams them and their events back to the requestor, etc.

# Run it

(node 6 used)

$ npm install
$ npm start