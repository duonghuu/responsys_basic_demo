
import { redis } from "./fakeRedis.js";
import { responsysQueue } from "./fakeQueue.js";
let myQueue = [];
async function activityStreamHandler(lastId) {
    let startId = lastId;

    let isFirst = startId ? false : true;

    // if (!startId) {
    //   let lastResult = await redis.xrevrange("activity-stream", "+", "-", "COUNT", 1);
    //   if (lastResult.length > 0) {
    //     let [key, messages] = lastResult[0];
    //     startId = key;
    //   }
    // }

    // console.log('activityStreamHandler', lastId);

    const results = await redis.xrange("activity-stream", startId ? startId : "-", "+", "COUNT", 1);

    // console.log('activityStreamHandler', lastId, results.length);

    if (results.length > 0) {

        let [key, messages] = results[results.length - 1];
        lastId = key;

        //if (startId !== lastId) {

        let activities = {};
        let arrQueue = [];

        for (let i = 0; i < results.length; i++) {
            let [key, messages] = results[i];

            if ((i === 0 && isFirst) || (i > 0)) {
                let data;
                try {
                    data = JSON.parse(messages[1]);
                    arrQueue.push(data);
                } catch (err) { }

                if (data && !activities[data.activity]) {
                    activities[data.activity] = [];
                }
                activities[data.activity].push(data);
            }

            if (key !== lastId) {
                let del = await redis.xdel("activity-stream", key);
            }
        }

        //end activity by batch
        for (let key in activities) {
            let activity = activities[key];

            let arrQueue = [];
            for (let i = 0; i < activity.length; i++) {

                arrQueue.push(activity[i]);

                if ((arrQueue.length >= 100) || (i === activity.length - 1)) {

                    //send to queue
                    // responsysQueue.add({
                    //     type: 'ADD_ACTIVITY_ARRAY',
                    //     activity: key,
                    //     data: arrQueue
                    // });
                    myQueue.push({
                        type: 'ADD_ACTIVITY_ARRAY',
                        activity: key,
                        data: arrQueue
                    })
                    //reset queue
                    arrQueue = [];
                }
            }
        }
        //}
    }
    // setTimeout(function () {

    //     activityStreamHandler(lastId);
    // }, 5000);
}

activityStreamHandler();