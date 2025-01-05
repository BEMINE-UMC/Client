# Be-Mine Front Repository

## Stack

---

React
- UI를 재사용 가능한 컴포넌트로 나누어 개발 효율과 유지보수성
- 많은 개발자와 기업이 사용하고 있어 참고 자료와 라이브러리가 풍부
- 렌더링 성능을 최적화하며 효율적으로 UI를 업데이트  

TypeScript  
- 정적 타입 검사
- 코드 자동 완성, 리팩토링 지원 등 개발 생산성을 극대화
- 큰 프로젝트에서도 유지보수하기 쉽고 협업에 유리

Tanstack Query
- 서버 상태를 클라이언트에 일관되게 유지하고 캐싱, 백그라운드 리페치 등을 제공
- 데이터 변경 시 자동으로 다시 가져와서 수동으로 상태를 관리할 필요가 없음
- 상태 관리 코드가 줄어들어 개발이 간결해지고, 로딩/에러 상태도 쉽게 처리
- 중복 요청 방지, 캐시를 통한 빠른 응답 등으로 네트워크 성능을 개선

Zustand
- Redux와 비교해 설정이 간단하고 코드가 직관적
- useStore를 통해 상태에 직접 접근하고 업데이트

Styled-components
- CSS-in-JS: JavaScript 파일 내에서 스타일을 작성할 수 있어 컴포넌트와 스타일을 한 곳에서 관리
- 동적 스타일링: props와 상태에 따라 동적으로 스타일을 변경

React Router  
- SPA에서 URL 기반으로 페이지를 이동하고 렌더링
- Nested Routes: 중첩된 라우팅 구조를 지원해 복잡한 UI도 간단하게 구성

eslint + prettier  
- 일관된 코드 스타일을 유지하고 문법 오류를 방지
- Prettier를 통해 코드를 자동으로 정리하고 가독성을 높임
- 팀 협업 최적화, 개발 생산성 향상

# Convention
## Branch

---

### Main

<aside>

❗프로덕션 배포 가능한 상태 유지  
❗직접 작업 금지  
❗develop 브랜치에서 merge를 통해 업데이트  
</aside>

### Develop

<aside>

❗개발의 기본 브랜치, 모든 기능이 merge 되는 브랜치  
❗직접 배포 금지  
❗다음 릴리즈를 준비하는 작업은 모두 develop에서  

</aside>

### Feature

<aside>

❗새로운 기능이나 변경 사항을 개발  
❗이름 형식: feature/#이슈번호-기능명    
❗브랜치 상태 공유를 위해 주기적으로 develop rebase 하거나 병합  

</aside>

---

## Flow

<aside>
💡

### 새 기능 개발

1. repo에서 이슈 생성
2. develop 브랜치에서 feature 브랜치 생성

```bash
git checkout develop
git checkout -b feature/#이슈번호-기능명...
```

1. 작업 완료 후, develop 브랜치로 merge
2. 작업 완료 후 feature 브랜치 삭제

### 긴급 버그 수정

1. repo에서 이슈 생성
2. main 브랜치에서 hotfix 브랜치 생성

```bash
git checkout main
git checkout -b hotfix/#이슈번호-버그명..
```

1. 버그 수정 후, main과 develop 브랜치 병합
2. hotfix 브랜치 삭제

</aside>

## Code

---

eslint + prettier 컨벤션 사용

## Issue

```markdown
name: 이슈 템플릿  
about: "\b해당 이슈 생성 템플릿을 사용하여 이슈 생성"  
title: ''  
labels: ''  
assignees: ''

---

## ✅ Description

설명을 작성하세요.

## ✔️ TODO

- [ ]
- [ ]

## ETC

### Pull Request
---

```

## Pull Request

---

## #️⃣ Issue Number

<!--- ex) #이슈번호, #이슈번호 -->

## 📝 요약(Summary)

<!--- 변경 사항 및 관련 이슈에 대해 간단하게 작성해주세요. 어떻게보다 무엇을 왜 수정했는지 설명해주세요. -->

## 🛠️ PR 유형

어떤 변경 사항이 있나요?

- [ ] 새로운 기능 추가
- [ ] 버그 수정
- [ ] CSS 등 사용자 UI 디자인 변경
- [ ] 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경)
- [ ] 코드 리팩토링
- [ ] 주석 추가 및 수정
- [ ] 문서 수정
- [ ] 테스트 추가, 테스트 리팩토링
- [ ] 빌드 부분 혹은 패키지 매니저 수정
- [ ] 파일 혹은 폴더명 수정
- [ ] 파일 혹은 폴더 삭제

## 💬 공유사항 to 리뷰어

<!--- 리뷰어가 중점적으로 봐줬으면 좋겠는 부분이 있으면 적어주세요. -->
<!--- 논의해야할 부분이 있다면 적어주세요.-->
<!--- ex) 메서드 XXX의 이름을 더 잘 짓고 싶은데 혹시 좋은 명칭이 있을까요? -->

## ✅ PR Checklist

PR이 다음 요구 사항을 충족하는지 확인하세요.

- [ ] 커밋 메시지 컨벤션에 맞게 작성했습니다.
- [ ] 변경 사항에 대한 테스트를 했습니다.(버그 수정/기능에 대한 테스트).


## Commit

---

```
## Git Convention

### commit message structure
제목 본문 꼬릿말로 구성

:gitmoji: <type> : <Subject>
body
footer
```

```markdown
### Type, gitmoji

깃모지, 태그 : 제목의 형태

- :sparkles: feat: 새로운 기능 추가, 새로운 디자인 관련 기능 추가 등
- :bug: fix: 버그 수정, 디자인 버그 수정 등
- :memo: docs: 문서 추가, 삭제, 수정
- :white_check_mark: test: 테스트 코드 추가
- :recycle: refactor: 코드 리팩토링
- :art: style: 코드 의미에 영향을 주지 않는 변경사항(코드 포맷팅, 세미콜론 누락 등..),
  레이아우스, UI/UX 디자인 변경 코드 작업 등 포함
- :wrench: chore: 빌드 부분 혹은 패키지 매니저 수정사항
- :truck: rename: 파일, 경로, route를 옮기거나 이름 변경
- :fire: remove: 삭제(파일, 코드)

### Body

- 본문은 한 줄 당 72자 내로 작성한다.
- 본문 내용은 양에 구애받지 않고 최대한 상세히 작성한다.
- 본문 내용은 어떻게 변경했는지 보다 무엇을 변경했는지 또는 왜 변경했는지를 설명한다.

### footer

꼬리말은 optional이고 이슈 트래커 ID를 작성한다.
꼬리말은 "유형: #이슈 번호" 형식으로 사용한다.
여러 개의 이슈 번호를 적을 때는 쉼표(,)로 구분한다.
이슈 트래커 유형은 다음 중 하나를 사용한다.

- Fixes: 이슈 수정중 (아직 해결되지 않은 경우)
- Resolves: 이슈를 해결했을 때 사용
- Ref: 참고할 이슈가 있을 때 사용
- Related to: 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)

  ex) Fixes: #45 Related to: #34, #23

### commit 예시

feat: "게시판 글쓰기 기능 구현"

사진 첨부, 글쓰기 API 개발

Resolves: #123
Ref: #456
Related to: #48, #45
```

## Layer

---

- component
    - 페이지 단위의 컴포넌트로 구분합니다.
- layout
    - 레이아웃을 구분합니다.
- pages
    - 페이지. 페이지 단위로 폴더를 구분합니다.
- provider
    - App 전역에서 사용하는 Provider를 구분합니다.
- store
    - 상태관리를 위한 store를 구분합니다.
- hook
    - 커스텀 훅을 구분합니다.
- apis
    - api 요청을 위한 함수를 구분합니다.
- styles
    - 전역 스타일을 구분합니다.
- types
    - 타입을 구분합니다.
