# 콘텐츠 추가 가이드

이 사이트는 코드를 건드리지 않고 `data/` 안의 JSON 파일만 수정하면 화면에 반영됩니다. 스키마 상세는 `docs/ARCHITECTURE.md`, 이 문서는 "실제로 뭘 어떻게 추가하는지"에 집중합니다.

## 처음 시작하기
저장소를 클론하면 `data/*.example.json`(공개 템플릿)만 있고, 진짜 개인 데이터 파일(`data/*.json`)은 `.gitignore`에 의해 커밋되지 않으므로 없는 상태입니다. 그래도 사이트는 바로 동작합니다 — `main.js`가 `data/profile.json`을 못 찾으면 자동으로 `data/profile.example.json`을 읽어서 예시 이력서를 보여줍니다(다른 섹션 파일도 동일).

실제 내용으로 바꾸려면:
1. 각 `data/<이름>.example.json`을 복사해서 같은 폴더에 `data/<이름>.json`으로 저장 (예: `profile.example.json` → `profile.json`)
2. 그 안의 "(예시)" 표시된 값을 실제 정보로 교체
3. `data/*.json`은 `.gitignore`에 이미 등록돼 있어 절대 커밋되지 않으니 안심하고 개인정보를 채워도 됩니다
4. 실제 프로필 사진은 `assets/img/private/`에 넣고(이미 `.gitignore`에 등록됨) `profile.json`의 `photo` 경로를 그쪽으로 지정하세요 (공개 템플릿에는 `assets/img/avatar-placeholder.svg`만 유지)

## 공통 규칙
모든 섹션 항목은 아래 세 필드를 가집니다.
- `modes`: `["job"]` / `["grad"]` / `["job","grad"]` — 이 항목을 어느 모드에서 보여줄지
- `priority`: `{ "job": 숫자, "grad": 숫자 }` — 같은 섹션 안에서 정렬 순서 (작을수록 위)
- `emphasis`(선택): `"high"`로 설정하면 카드가 강조 테두리로 표시됨 (대표 프로젝트/논문 등)

## 예시: 프로젝트 추가하기 (`data/projects.json`)
배열에 새 객체를 하나 추가합니다.
```json
{
  "id": "proj-recsys-2026",
  "title": "추천 시스템 개인 프로젝트",
  "description": "협업 필터링 기반 추천 엔진을 처음부터 구현.",
  "links": { "repo": "https://github.com/your-id/recsys", "demo": "" },
  "stack": ["Python", "PyTorch"],
  "highlights": {
    "job": ["A/B 테스트로 클릭률 12% 개선", "실시간 서빙 API로 배포"],
    "grad": ["문제를 오프라인 지표 대비 온라인 지표 괴리 관점에서 분석", "관련 논문 3편 리뷰 후 방법론 선정"]
  },
  "modes": ["job", "grad"],
  "priority": { "job": 2, "grad": 3 }
}
```
- `highlights.job`과 `highlights.grad`를 다르게 써서, 같은 프로젝트라도 이직 화면에는 임팩트 중심, 대학원 화면에는 문제정의/방법론 중심 문구가 보이게 할 수 있습니다.
- 대학원 지원에서만 언급하고 싶다면 `"modes": ["grad"]`만 남기세요.

## 예시: 경력 추가하기 (`data/experience.json`)
`bullets`도 프로젝트와 동일하게 `{ "job": [...], "grad": [...] }` 형태로 모드별 문구를 나눌 수 있습니다.

## 예시: 논문/연구 추가하기 (`data/research.json`)
```json
{
  "id": "paper-2026-workshop",
  "title": "논문 제목",
  "venue": "학회/워크샵명",
  "year": "2026",
  "authors": "본인, 공동저자",
  "link": "https://arxiv.org/abs/...",
  "type": "paper",
  "modes": ["grad"],
  "priority": { "job": 9, "grad": 1 }
}
```
job 모드에서도 보이고 싶으면 `"modes": ["job", "grad"]`로 바꾸면 됩니다.

## 그 외 섹션
- `education.json`: `school, degree, period, thesis(선택)`
- `skills.json`: 카테고리 단위로 `{ category, items[] }`
- `awards.json`: `title, org, year`

## 기본 정보/소개 문구 수정 (`data/profile.json`)
- `basics`에 이름/타이틀/연락처/링크
- `summary.job`, `summary.grad`에 모드별 한 줄~세 줄 소개
- `photo`에 사진 경로를 넣으면 히어로 영역에 표시 (없으면 자동으로 placeholder 사용)

## 반영 확인
로컬 서버(`python -m http.server` 등)로 `index.html`을 열고 상단 "이직/대학원" 토글을 눌러 두 모드에서 모두 잘 보이는지 확인하세요.

## 구조 자체를 바꾸고 싶다면
필드를 추가/제거하는 등 스키마 자체를 바꾸는 경우는 콘텐츠 추가와 다릅니다 — `docs/ARCHITECTURE.md`를 먼저 읽고, `docs/CHANGELOG.md`에 변경 이력을 남기세요 (자세한 규칙은 `CLAUDE.md` 참고).
