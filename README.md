# mung mung 백엔드

**설명 :** 강아지 산책 매칭 서비스 mung mung 백엔드 레포지토리입니다.

**작성일자 :** 2023.05.04

## 실행 방법

-   Execute Server
    ```bash
    npm run start:dev
    ```
-   Prettier
    ```bash
    npm run format:check # find code which is not following prettier
    npm run format:fix # fix code which is not following prettier
    ```
-   Eslint
    ```bash
    npm run lint:check # find code which is not following eslint
    npm run lint:fix # fix code which is not following eslint
    ```

### 커밋 규칙

커밋 메세지는 다음과 같은 형식으로 작성합니다.

```
Activity: Commit Message
```

-   Activities
    -   `int`: only for initial commit
    -   `doc`: changes document or comment
    -   `ftr`: add new feature
    -   `mod`: modify existing feature
    -   `fix`: fix an error or issue
    -   `rfc`: refactor code
    -   `add`: add new file or directory
    -   `rmv`: remove existing file or directory
-   Example
    -   `int: initial commit`
    -   `add: prettier and eslint`
    -   `rfc: refactoring code by prettier`
