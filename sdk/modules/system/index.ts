import { NativeBridge } from "@/sdk/core/bridge";

export const system = {
    async getInfo() {
        const res = await NativeBridge.getSystemInfo()

        return {
            code: 200,
            message: "成功",
            data: res,
        }
    }
    
}