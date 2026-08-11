# data/

이력서에 표시되는 모든 콘텐츠가 들어있는 폴더입니다. 코드를 건드리지 않고 이 안의 JSON 파일만 수정/추가하면 사이트에 반영됩니다.

## 예시(공개) vs 실제(비공개) 데이터
- `*.example.json` — 공개 템플릿. GitHub에 커밋되며, 실제 데이터가 없을 때 사이트가 자동으로 이걸 보여줍니다.
- `*.json`(예: `profile.json`) — 진짜 개인 데이터. `.gitignore`에 의해 절대 커밋되지 않습니다. 처음 시작하는 방법은 루트의 `CONTENT_GUIDE.md`의 "처음 시작하기" 참고.

## 파일
- `profile.json` / `profile.example.json` — 기본정보, 모드별(job/grad) 소개문구, 섹션 노출 순서
- `experience`, `projects`, `research`, `education`, `skills`, `awards` (각각 `.json`/`.example.json`) — 섹션별 항목 리스트

각 항목의 `modes`(어느 모드에서 보일지), `priority`(모드별 정렬 순서) 필드로 이직/대학원 화면이 달라집니다.

새 항목을 추가하는 구체적인 방법과 필드 설명은 루트의 `CONTENT_GUIDE.md`, 스키마 상세는 `docs/ARCHITECTURE.md`를 참고하세요. 스키마(필드)를 바꿀 때는 `*.json`뿐 아니라 대응하는 `*.example.json`도 함께 갱신하세요 — `CLAUDE.md` 체크리스트에도 명시돼 있습니다.
