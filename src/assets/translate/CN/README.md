# 快速开始

## 1、OneForAll的安装

`基础环境 : python3 , pip`

GitHub https://github.com/shmilylty/OneForAll 

Gitee  https://gitee.com/shmilylty/OneForAll

```
git clone https://github.com/shmilylty/OneForAll

cd OneForAll

pip3 install -r requirements.txt

python3 oneforall.py version
```
---
## 2、路径配置

python默认已指定python3

oneforall需要选择OneForAll目录中的oneforall.py文件

---
## 3、代理及API配置（可选）
From 官方wiki

命令行参数只提供了一些常用参数，更多详细的参数配置请见setting.py，如果你认为有些参数是命令界面经常使用到的或缺少了什么参数等问题非常欢迎反馈。由于众所周知的原因，如果要使用一些被墙的收集接口请先到setting.py配置代理，有些收集模块需要提供API（大多都是可以注册账号免费获取），如果需要使用请到api.py配置API信息，如果不使用请忽略有关报错提示。（详细模块请阅读收集模块说明）

---
PS: 其余高级用法请参考git中的wiki，本插件只负责联动及可视化。