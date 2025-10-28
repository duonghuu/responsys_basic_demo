// fakeRedis.js
export const redis = {
    xrange: async (streamName, start, end, count, limit) => {
        console.log("🧩 Fake Redis xrange called:", { streamName, start, end, count, limit });

        // giả lập 3 record Redis stream
        return [
            ["1-0", ["data", JSON.stringify({ activity: "login", user_id: 1, time: "2025-10-23T10:00:00Z" })]],
            ["2-0", ["data", JSON.stringify({ activity: "view_page", user_id: 2, time: "2025-10-23T10:01:00Z" })]],
            ["3-0", ["data", JSON.stringify({ activity: "purchase", user_id: 3, time: "2025-10-23T10:02:00Z" })]],
        ];
    },

    xdel: async (streamName, key) => {
        console.log(`🗑️ Fake Redis xdel: deleted ${key} from ${streamName}`);
        return 1;
    },
};
