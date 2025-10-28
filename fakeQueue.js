// fakeQueue.js
export const responsysQueue = {
    add: async (payload) => {
        console.log("📤 Fake Queue add called:", JSON.stringify(payload, null, 2));
    },
};
