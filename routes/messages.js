var express = require('express');
var db = require('../utils/firebase');
var geofire = require('geofire-common');
var router = express.Router();

/* GET all messages within 50 km radius of location  */
router.get('/', function (req, res, next) {
    const center = [parseFloat(req.query.lat), parseFloat(req.query.long)];
    const radiusInM = 100 * 1000;

    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
        const q = db.collection('messages')
            .orderBy('geohash')
            .startAt(b[0])
            .endAt(b[1]);

        promises.push(q.get());
    }


    // Collect all the query results together into a single list
    Promise.all(promises).then((snapshots) => {

        for (const snap of snapshots) {
            // console.log(snap.docs.length)
            for (const doc of snap.docs) {
                const loc = doc.get('to');
                const lat = loc.latitude;
                const lng = loc.longitude;

                // // We have to filter out a few false positives due to GeoHash
                // // accuracy, but most will match
                const distanceInKm = geofire.distanceBetween([lat, lng], center);
                const distanceInM = distanceInKm * 1000;
                if (distanceInM <= radiusInM) {
                    console.log(doc.get('message'));
                }
            }
        }
    });


    res.status(404).send("lol its not ready");
});

module.exports = router;


