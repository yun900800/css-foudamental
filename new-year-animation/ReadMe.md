
8. 为什么会创建git init --bare?什么时候使用 git init      directory --template=template_directory

    ```shell
      mkdir -p /path/to/template \ 
      echo "Hello World" >> /absolute/path/to/template/README \
      git init /new/repo/path --template=/absolute/path/to/template \ 
      cd /new/repo/path \ 
      cat /new/repo/path/README
    ```

9. git clone 有哪些使用场景?
    - 1. git clone <repo> <directory>
    - 2. git clone --branch <tag> <repo>

10. git stash 的本质是暂存
    - 1. git stash 默认会暂存staged change 和unstaged change,新建的文件和忽略的文件不会暂存

        ```shell
        $ git status
        On branch main
        Changes to be committed:

            new file:   style.css

        Changes not staged for commit:

            modified:   index.html

        $ git stash
        Saved working directory and index state WIP on main: 5002d47 our new homepage
        HEAD is now at 5002d47 our new homepage

        $ git status
        On branch main
        nothing to commit, working tree clean
        ```
    - 2. 恢复暂存信息的方法

        ```shell
        $ git status
        On branch main
        nothing to commit, working tree clean
        $ git stash pop
        On branch main
        Changes to be committed:

            new file:   style.css

        Changes not staged for commit:

            modified:   index.html

        Dropped refs/stash@{0} (32b3aa1d185dfe6d57b3c3cc3b32cbf3e380cc6a)

        //或者
        $ git stash apply
        On branch main
        Changes to be committed:

            new file:   style.css

        Changes not staged for commit:

            modified:   index.html

        //再来看一个demo
        $ script.js

        $ git status
        On branch main
        Changes to be committed:

            new file:   style.css

        Changes not staged for commit:

            modified:   index.html

        Untracked files:

            script.js

        $ git stash
        Saved working directory and index state WIP on main: 5002d47 our new homepage
        HEAD is now at 5002d47 our new homepage

        $ git status
        On branch main
        Untracked files:

            script.js

        //暂存没有跟踪的文件
        $ git status
        On branch main
        Changes to be committed:

            new file:   style.css

        Changes not staged for commit:

            modified:   index.html

        Untracked files:

            script.js

        $ git stash -u
        Saved working directory and index state WIP on main: 5002d47 our new homepage
        HEAD is now at 5002d47 our new homepage

        $ git status
        On branch main
        nothing to commit, working tree clean
        ```

        You can include changes to ignored files as well by passing the -a option (or --all) when running git stash.
        ![git-stash-level](image.png)
    - 3. 如何操作多个stash

        ```shell
        //查看stash
        $ git stash list
        stash@{0}: WIP on main: 5002d47 our new homepage
        stash@{1}: WIP on main: 5002d47 our new homepage
        stash@{2}: WIP on main: 5002d47 our new homepage
        //命名stash
        $ git stash save "add style to our site"
        Saved working directory and index state On main: add style to our site
        HEAD is now at 5002d47 our new homepage

        $ git stash list
        stash@{0}: On main: add style to our site
        stash@{1}: WIP on main: 5002d47 our new homepage
        stash@{2}: WIP on main: 5002d47 our new homepage
        //恢复
        git stash pop == git stash pop stash@{0}
        git stash pop stash@{2}
        ```

    - 4. 展示stash

        ```shell
        $ git stash show
        index.html | 1 +
        style.css | 3 +++
        2 files changed, 4 insertions(+)

        $ git stash show -p
        diff --git a/style.css b/style.css
        new file mode 100644
        index 0000000..d92368b
        --- /dev/null
        +++ b/style.css
        @@ -0,0 +1,3 @@
        +* {
        +  text-decoration: blink;
        +}
        diff --git a/index.html b/index.html
        index 9daeafb..ebdcbd2 100644
        --- a/index.html
        +++ b/index.html
        @@ -1 +1,2 @@
        +<link rel="stylesheet" href="style.css"/>
        ```