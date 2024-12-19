import AsyncStorage from '@react-native-async-storage/async-storage';
import { userBasicInfoType } from './Type.ts';

type LoginChangeListener = () => void;

class User {
    private static instance: User;
    private loggedIn: boolean = false; // 登录状态
    private loginChangeListeners: LoginChangeListener[] = []; // 监听器数组
    private userData: userBasicInfoType = {
        uid: 'not logged in',
        userName: 'unknown',
        avatar: 'unknown',
        school: 'unknown',
        major: 'unknown',
    };

    // 私有构造函数，防止外部实例化
    private constructor() {
        this.loadFromStorage().then(() => {
            // 数据加载完成后，通知所有监听器
            this.notifyLoginChange();
        });
    }

    // 获取单例实例
    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    }

    // 从存储中加载数据
    private async loadFromStorage(): Promise<void> {
        try {
            const loggedIn = await AsyncStorage.getItem('@loggedIn');
            const userData = await AsyncStorage.getItem('@userData');

            if (loggedIn !== null) {
                this.loggedIn = JSON.parse(loggedIn);
            }

            if (userData !== null) {
                this.userData = JSON.parse(userData);
            }
        } catch (error) {
            console.error('Failed to load data from AsyncStorage:', error);
        }
    }

    // 保存登录状态到存储
    private async saveToStorage(): Promise<void> {
        try {
            await AsyncStorage.setItem('@loggedIn', JSON.stringify(this.loggedIn));
            await AsyncStorage.setItem('@userData', JSON.stringify(this.userData));
        } catch (error) {
            console.error('Failed to save data to AsyncStorage:', error);
        }
    }

    // 设置登录状态
    public setLoggedIn(loggedIn: boolean): void {
        if (this.loggedIn !== loggedIn) {
            this.loggedIn = loggedIn;
            this.saveToStorage(); // 保存到存储
            this.notifyLoginChange();
        }
    }

    // 获取登录状态
    public isLoggedIn(): boolean {
        return this.loggedIn;
    }

    // 添加登录状态变化监听器
    public onLoginChange(listener: LoginChangeListener): void {
        this.loginChangeListeners.push(listener);
    }

    // 移除登录状态变化监听器
    public offLoginChange(listener: LoginChangeListener): void {
        this.loginChangeListeners = this.loginChangeListeners.filter(
            (l) => l !== listener
        );
    }

    // 通知所有监听器登录状态变化
    private notifyLoginChange(): void {
        this.loginChangeListeners.forEach((listener) => listener());
    }

    // 设置用户信息
    public setUserData(userData: userBasicInfoType): void {
        this.userData = { ...this.userData, ...userData };
        this.saveToStorage(); // 保存到存储
    }

    // 获取用户信息
    public getUserData(): userBasicInfoType {
        return this.userData;
    }
}

export { User };