# Architecture

Design version reference: see `docs/CHANGELOG.md`. Data schema version: `data/profile.json.schemaVersion` (currently `1`).

## 개요
빌드 도구가 없는 정적 사이트입니다. 브라우저가 `index.html`을 열면 `assets/js/main.js`가 `data/*.json`을 `fetch()`로 읽어 DOM을 직접 그립니다. 콘텐츠(데이터)와 표현(HTML/CSS)과 로직(JS)이 분리되어 있어, 콘텐츠 추가는 JSON 수정만으로 끝납니다.

```
data/*.json  --fetch-->  main.js  --DOM 생성-->  index.html의 #sections
                              ^
                        모드(job/grad) 결정: URL ?mode= > localStorage > 기본값 "job"
```

## 파일 역할
- `index.html` — 정적 셸. 헤더(브랜드/모드 토글/PDF 버튼), 히어로(사진/이름/소개), `#sections`(빈 컨테이너)만 있고 실제 콘텐츠는 JS가 채운다.
- `assets/js/main.js` — 유일한 스크립트. `DATA_FILES`에 정의된 JSON을 모두 읽고, `RENDERERS` 맵(섹션명 → 렌더 함수)으로 각 섹션을 그린다.
- `assets/css/main.css` — 레이아웃/테마. CSS 변수(`:root`)로 컬러/폰트/간격 관리.
- `assets/css/print.css` — `@media print` 전용. PDF 저장(`window.print()`) 시에만 적용.
- `data/*.json` — 실제 개인 콘텐츠. `.gitignore`로 무시되어 커밋되지 않는다.
- `data/*.example.json` — 공개 템플릿(placeholder 데이터). 저장소에 커밋되는 유일한 데이터 파일이며, `*.json`이 없을 때 자동 폴백으로 사용된다. 아래 스키마 참고.

## 데이터 스키마
### 공통 필드 (섹션 리스트 항목)
| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | string | 고유 slug |
| `modes` | string[] | `"job"`/`"grad"` 중 이 항목이 보일 모드 |
| `priority` | `{job:number, grad:number}` | 모드별 정렬 순서, 작을수록 위 |
| `emphasis` | `"high"` (선택) | 카드에 강조 테두리 적용 (`card--emphasis`) |

### `profile.json`
```json
{
  "schemaVersion": 1,
  "basics": { "name", "title", "email", "location", "links": { "github", "linkedin", "scholar", "blog" } },
  "photo": "assets/img/avatar-placeholder.svg",
  "summary": { "job": "...", "grad": "..." },
  "sectionOrder": { "job": [...], "grad": [...] }
}
```
- `sectionOrder`는 `"summary"`를 포함해 기획 의도를 문서화하지만, 렌더러는 히어로(요약)를 항상 페이지 최상단에 고정하고 `#sections`를 만들 때 `"summary"`는 건너뛴다.
- `photo`가 비어있지 않으면 항상 표시(기본값은 placeholder SVG) — 실제 사진 유무와 무관하게 레이아웃이 깨지지 않는다.

### `experience.json`, `projects.json`
공통 필드 외:
- `experience`: `org, role, period, stack[], bullets: {job:[], grad:[]}`
- `projects`: `title, description, links:{repo,demo}, stack[], highlights: {job:[], grad:[]}`

`bullets`/`highlights`는 모드별로 완전히 다른 문구를 쓸 수 있도록 객체 형태. `main.js`의 `bulletsFor(item, mode)`가 `item.bullets[mode] || item.bullets.job || []` 순서로 폴백한다.

### `research.json`
`title, venue, year, authors, link, type(paper/poster/preprint)`. grad 전용 항목은 `modes: ["grad"]`로 job 모드에서 자동 숨김.

### `education.json`
`school, degree, period, thesis(선택)`.

### `skills.json`
카테고리 그룹 배열: `category, items[]`. 다른 섹션과 동일한 `modes`/`priority` 패턴을 따르지만 `bullets` 없이 태그만 렌더링.

### `awards.json`
`title, org, year`.

## 렌더링 파이프라인 (main.js)
1. `getInitialMode()` — `?mode=` → `localStorage.resumeMode` → `"job"` 순으로 결정
2. `fetchAll()` — 데이터 파일마다 `fetchJsonWithFallback(path)`를 병렬 호출: 먼저 `data/<이름>.json`을 요청하고, 실패(404 등)하면 `data/<이름>.example.json`으로 자동 폴백한다. 폴백이 발생하면 `console.info`로 "예시 데이터를 보고 있다"는 안내를 남긴다. 이 덕분에 저장소를 클론한 직후(`data/*.json`이 없는 상태)에도 사이트가 즉시 예시 이력서로 동작한다.
3. `profile.schemaVersion !== EXPECTED_SCHEMA_VERSION`이면 콘솔 경고 (구조 변경을 콘텐츠 작업 중 놓치지 않도록) — `.example.json`도 항상 같은 스키마를 따라야 하므로 스키마를 바꿀 때는 두 종류 파일을 함께 갱신한다.
4. `setMode(data, mode)`:
   - `renderHero()` — 이름/타이틀/요약/링크/사진
   - `renderSections()` — `sectionOrder[mode]`(summary 제외) 순서로 순회, 섹션별 `RENDERERS[name](items, mode)` 호출 → `byModePriority()`로 필터링·정렬 → 카드 HTML 생성
5. 토글 버튼 클릭 시 데이터 재요청 없이 `setMode()`만 다시 호출 (in-memory 데이터 재사용)
6. "PDF로 저장" 버튼은 `window.print()`만 호출 — 실제 레이아웃 변경은 `print.css`가 담당

## 보안 메모
서버 사이드 코드가 전혀 없는 순수 정적 파일이므로 SQLi/RCE 등 서버 취약점 자체가 존재하지 않는다. 유일한 동적 동작은 브라우저 내 `fetch()`로 같은 오리진의 JSON을 읽는 것뿐이며 외부 입력을 받지 않는다. 자가호스팅 시 보안 고려사항은 `docs/ROADMAP.md`와 루트 `README.md` 참고.
