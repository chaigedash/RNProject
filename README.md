# RNProject

## 配环境记录

### 环境

```
jdk: 17
node: 19.8.1
react: 18.3.1,
react-native: 0.76.3
```

**VPN**：英国

### 下载gradle卡死/超时

把android/gradle/wrapper/gradle-wrapper.properties中的 `distributionUrl` 设置成腾讯镜像站的对应版本下载链接，注意 `:` 要转义

### 报错com.facebook.react.settings

删了`node_module` ，重新 `npm i` 再 `yarn android` 

### 下载依赖特别慢

校园网换成热点，梯子挂香港

## 启动项目之后报错

### 初启动时, `The development server returned response errorcode: 500`

关了，`npm start -- --reset-cache` 重启，然后等了一会就好了...

### 突然, `Unable to load script from assets index.android.bundle...`

- 新创建一个项目试试
  - fetch error，网络问题，挂梯子不管用
  - 静置两天（周六的问题，周日摆了，周一好了）
- 新项目也起不来，环境问题
- 靠，一定一定要把Android设备的网络打开...
- 然后 `adb reverse tcp:8081 tcp:8081` 就通了，FUCK!!!

## 调试工具

在nodejs界面输入d可以呼出开发者工具

**❗ ❗ ❗ network暂时没解决❗ ❗ ❗**

## 访问后端

用 `http://10.0.2.2` 来替代 `http://localhost` 。

## 引入ICON库

*移动端不天然支持svg，所以icon库是通过字体文件 `.ttf` 实现的*

引入库的时候，`.ttf`文件存在 `node_module` 里

将ttf文件复制一份到 `android/app/src/main/assets/fonts` 路径下，缺少文件夹就直接创建就行

引入belike:

```js
import FontAwesome from 'react-native-vector-icons/FontAwesome';
```

## 一些指令

```powershell
npm start --reset-cache
```