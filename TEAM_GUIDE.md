# 팀 협업 가이드 (GitHub)

이 문서는 우리 팀(3명)이 GitHub를 사용하여 효율적으로 협업하기 위한 가이드입니다.

## 1. 팀원 초대하기 (방장)
가장 먼저 저장소(Repository)를 만든 사람이 팀원들을 초대해야 합니다.
1. GitHub 저장소 페이지로 이동합니다.
2. 상단 메뉴의 **Settings** 클릭.
3. 좌측 사이드바에서 **Collaborators** 클릭.
4. **Add people** 버튼을 누르고 팀원의 GitHub 아이디(또는 이메일)를 입력하여 초대장을 보냅니다.
5. 팀원들은 이메일로 온 초대장을 수락해야 접근 권한이 생깁니다.

## 2. 프로젝트 가져오기 (팀원)
팀원들은 자신의 컴퓨터에 프로젝트를 다운로드(Clone) 받아야 합니다.
```bash
# 터미널(VS Code)을 열고 프로젝트를 저장할 폴더로 이동 후:
git clone https://github.com/Felix-shin0514/innoHR-ryan_251124.git
```

## 3. 작업 규칙 (Workflow)
우리는 **Main 브랜치에 직접 커밋하지 않고**, 각자 기능을 만들어서 합치는 방식을 사용합니다.

### 1단계: 최신 코드 받기 (작업 시작 전 필수!)
작업을 시작하기 전에 항상 다른 팀원이 올린 코드를 받아와야 합니다.
```bash
git checkout main      # 메인 브랜치로 이동
git pull origin main   # 최신 코드 당겨오기
```

### 2단계: 내 작업 브랜치 만들기
내가 작업할 기능의 이름을 딴 브랜치를 만듭니다.
```bash
# 예: 로그인 기능 작업 시
git checkout -b feature/login-page
```

### 3단계: 작업 및 커밋
코드를 수정하고 저장한 뒤 커밋합니다.
```bash
git add .
git commit -m "로그인 페이지 레이아웃 작업 완료"
```

### 4단계: GitHub에 올리기 (Push)
내 브랜치를 GitHub에 올립니다.
```bash
git push origin feature/login-page
```

### 5단계: 합치기 요청 (Pull Request)
1. GitHub 저장소 페이지로 가면 "Compare & pull request" 버튼이 보입니다.
2. 버튼을 누르고 내용을 작성한 뒤 **Create Pull Request**를 클릭합니다.
3. 팀원들에게 리뷰를 요청하거나, 이상이 없으면 **Merge pull request**를 눌러 Main에 합칩니다.

## 4. 자주 쓰는 명령어 요약
| 명령어 | 설명 |
|---|---|
| `git status` | 현재 변경된 파일 확인 |
| `git log` | 커밋 기록 확인 |
| `git branch` | 현재 브랜치 확인 |
| `git checkout [브랜치명]` | 해당 브랜치로 이동 |
| `git checkout -b [새브랜치]` | 새 브랜치 만들고 이동 |
