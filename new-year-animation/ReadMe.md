# 如何设计一个3D的立方体,顺便学习git的一些知识

## 理解git中的三棵树的基本架构

### git三棵树包括

1. 工作区(Working Directory):本地文件系统实际存在的文件,也就是我们写代码的地方.

2. 暂存区(Staging Area),也叫作索引(Index),保存了下一次将要提交的文件列表.

3. 版本库(Repository),保存了项目的所有历史版本,包括了各个版本的文件内存和版本信息等.这三棵树共同组成了 Git 的核心工作流程，让我们能够方便地管理版本、协作开发和撤销更改等操作。

#### git基础知识点

1. git add ./ReadMe.md 将ReadMe.md文件从Working Tree 添加到 Staging Tree后 git restore --staged .\ReadMe.md

2. git commit 的用法如下

3. git restore 的用法如下

4. 如何理解git中的分支模型

    - git分支是指向变更快照的指针(时间和空间需求上低开销)
    - 一个对变更修改进行封装的模型
    - 隔离问题代码，并行开发提高效率
    - git将分支存储为commit的引用,因此分支实际上是一些列commit的head
    - git branch可以看做是edit/stage/commit 过程的抽象

