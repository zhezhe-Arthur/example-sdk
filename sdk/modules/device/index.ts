import { NativeBridge } from "@/sdk/core/bridge";

export const device = {
    async scan() {
        const res = await NativeBridge.scan()
        return {
            code: 200,
            meseeage: "成功",
            data: res,
        }
    }
}