# 1 git

## 1.1 git clone 远程地址, 在 git checkout -b dev 切换到 dev 分支需要 pull origin dev 才能拿到最新的代码 ==> clone -b dev 可以直接拿到远程 dev 的最新代码

# 2 npm

## 2.1 全局包安装后无法使用思路

1.  先 yarn global list 查看全局包是否安装成功
2.  安装成功则 yarn global bin 查看包的路径, 复制将其设置在系统环境变量 Path 中
