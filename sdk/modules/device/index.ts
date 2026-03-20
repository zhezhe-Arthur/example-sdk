import { NativeBridge } from "@/sdk/core/bridge";

export const device = {
    // 伪代码
    async scan() {
        const res = await NativeBridge.scan()
        return {
            code: 200,
            meseeage: "成功",
            data: res,
        }
    },

    // 获取手机电量
    async getBatteryLevel() {
        const res = await NativeBridge.getBatteryLevel()
        return {
            code: 200,
            meseeage: "成功",
            data: res,
        }
    },

    // 获取UUID
    async getUUID() {
        const res = await NativeBridge.getUUID()
        return {
            code: 200,
            meseeage: "成功",
            data: res,
        }
    }
}