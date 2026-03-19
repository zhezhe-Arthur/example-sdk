
export const NativeBridge = {
    scan() {
        console.log("bridge 调用原生的scan");
        return Promise.resolve({devices: []})
    },

    getSystemInfo() {
        console.log("bridge 调用原生的getSystemInfo");
        return Promise.resolve({
            platform: "mock",
            verson: "1.0",
        })
    },
}