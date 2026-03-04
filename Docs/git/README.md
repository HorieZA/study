# GIT과 GITHUB 이용하기 위한 CLI 

### 참조 자료 링크
> * [git](https://git-scm.com/)
> * [github](https://github.com/)

## 로컬에 git 설정
1. 사용자 이름 설정 (github 계정과 동일)
```bash
git config --global user.name "사용자이름"
```

2. 사용자 이메일 설정 (github 계정과 동일)
```bash
git config --global user.email "사용자이메일"
```

3. 정보 확인하기
```bash
git config --list
```

4. 사용자 정보 삭제
```bash
git config --global --unset user.name
git config --global --unset user.email
```

---

## github 저장소 생성 후 처음 코드 업로드
1. 초기화
```bash
git init
```

2. 파일 추가하기
```bash
git add .
```

3. 추가할 파일에 대한 설명 넣기 (히스토리)
```bash
git commit -m "설명내용"
```

4. github의 저장소와 로컬 프로젝트 연결
```bash
git remote add origin <github 저장소 주소>
```
- `github 저장소 주소` 부분은 조심하셔야 합니다.

5. 저장소 연결 확인
```bash
git remote -v
```

6. github로 보내기
```bash
git push origin main
```
- `branch` 확인하여 현재 작업하는 이름이 `main`인지 검색 필요합니다.
```bash
git branch
```

---

## github에 이어서 올리는 방법

1. 업데이트 대상 파일 추가하기
```bash
git add .
```

2. 설명 추가하기
```bash
git commit -m "설명내용"
```

3. github로 보내기
```bash
git push origin main
```
- 로컬에서 작업 후 업데이트 하려면 위의 세가지 Step만 반복하면 됩니다.
- `주의사항` push하기 전 항상 로컬의 내용이 최신이어야 합니다.

> `fetch` 원격 저장소와 로컬의 변경사항 확인
```bash
git fetch
```
> `pull` 원격 저장소 변경 내용 확인 및 최신 데이터 가져오기
```bash
git pull
```

---

## github로 그룹(팀) 프로젝트 진행 방법

1. github에서 소스코드 다운로드
```bash
git clone <github 저장소 주소> <폴더이름>
```
+ 주소는 같이 사용할 `github 저장소`
+ `폴더이름`은 선택사항이며, 폴더이름을 `github 저장소명`과 동일하게 하지 않고 자신만의 폴더 관리를 하기 위해서 사용 가능합니다.

2. 다운받은 로컬 저장소에서 자신만의 `branch` 만들기
```bash
git checkout -b <branch 이름>
```

3. 작업한 내용을 그룹(팀) github 저장소 올리기
```bash
git add .
git commit -m "작업한 설명"
git push origin <branch 이름>
```

4. github의 대표 branch에서 소스코드 가져오기 (pull)
```bash
git pull origin main
```

5. branch 이동하는 방법
```bash
git checkout <이동 대상 branch 이름>
```
