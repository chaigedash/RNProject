import {verifyType} from "../Constant/Type.ts";

// 提取一些逻辑复杂或者需求易变的验证方法

const minNameLength = 2;
const maxNameLength = 10;
const minPwdLength = 6;
const maxPwdLength = 50;
export const verifyName = (name: string): verifyType => {
    const regex = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
    if (name.length < minNameLength || name.length > maxNameLength) {
        return {
            success: false,
            message: `用户名应为[${minNameLength}, ${maxNameLength}]位, 目前${name.length}位`,
        };
    }
    if (!regex.test(name)) {
        return {
            success: false,
            message: '用户名不合法, 只允许大小写英文、中文或下划线',
        };
    }
    return {
        success: true,
        message: '',
    };
}
export const verifyPassword = (password: string): verifyType => {
    if (password.length < 6 || password.length > 50) {
        return {
            success: false,
            message:`密码应为[${minPwdLength}, ${maxPwdLength}]位, 目前${password.length}位`,
        }
    }
    return {
        success: true,
        message: '',
    };
}