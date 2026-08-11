# Troubleshooting

문제가 생길 때마다 아래 형식으로 이어서 기록하세요: 증상 → 원인 → 해결.

## 템플릿
```
### [날짜] 증상 요약
- 증상:
- 원인:
- 해결:
```

## 자주 발생할 수 있는 문제 (미리 기록)

### `data/*.json`을 못 불러옴 / 화면이 비어있음
- 증상: 콘솔에 `Failed to fetch` 또는 CORS 에러, 화면에 "데이터를 불러오지 못했습니다" 메시지
- 원인: `index.html`을 `file://`로 직접 열면 브라우저가 로컬 JSON에 대한 `fetch()`를 CORS로 차단함
- 해결: 로컬 정적 서버로 열기 — `python -m http.server 8000` 또는 `npx serve` 실행 후 `http://localhost:8000` 접속

### 내 실제 데이터를 채웠는데 계속 예시("(예시)") 이력서가 보임
- 증상: `data/*.json`을 분명히 수정했는데 화면엔 여전히 "홍길동 (예시)" 같은 placeholder 내용이 나옴
- 원인: 파일명이 `data/<이름>.json`이 아니라 `.example.json`으로 저장됐거나, `data/` 경로가 아닌 다른 곳에 저장됨 — `main.js`는 `data/<이름>.json`이 없을 때만 `data/<이름>.example.json`으로 자동 폴백한다
- 해결: 브라우저 콘솔에서 `[resume] ... 예시 데이터(...)를 대신 불러왔습니다` 로그가 있는지 확인하고, 해당 파일이 정확히 `data/<이름>.json` 경로에 있는지 확인 (`CONTENT_GUIDE.md`의 "처음 시작하기" 참고)

### 콘솔에 schemaVersion 경고가 뜸
- 증상: `[resume] data/profile.json schemaVersion(...) !== main.js가 기대하는 버전(...)`
- 원인: `data/*.json` 구조를 바꿨는데 `assets/js/main.js`의 `EXPECTED_SCHEMA_VERSION`을 안 올렸거나, 반대로 렌더링 코드만 바뀌고 데이터 버전을 안 올린 경우
- 해결: `docs/CHANGELOG.md`에서 최근 Data/Backend 변경 내역을 확인하고, `profile.json.schemaVersion`과 `main.js`의 `EXPECTED_SCHEMA_VERSION`을 같은 값으로 맞춘 뒤 CHANGELOG에 기록
