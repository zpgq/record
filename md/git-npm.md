# 1 git
## 1.1 git clone 远程地址, 在git checkout -b dev切换到dev分支需要pull origin dev才能拿到最新的代码 ==> clone -b dev可以直接拿到远程dev的最新代码

# 2 npm
## 2.1 全局包安装后无法使用思路
   1. 先yarn global list查看全局包是否安装成功
   2. 安装成功则yarn global bin查看包的路径, 复制将其设置在系统环境变量Path中