# Changelog

기획/디자인 변경과 데이터(백엔드) 스키마 변경을 같은 타임라인에 기록합니다. 스키마 구조를 바꾸거나(`schemaVersion` 증가) 디자인 시스템(컬러/레이아웃/컴포넌트)을 바꿀 때는 반드시 여기에 항목을 추가하세요. 버전 번호는 `data/profile.json`의 `schemaVersion` 및 `docs/DESIGN.md` 상단의 Design version과 맞춥니다. `CLAUDE.md` 자체의 변경 이력은 여기서는 Process 항목으로 짧게만 남기고, 자세한 맥락은 `docs/CLAUDE_LOG.md`를 따로 확인하세요.

## [0.2.0] - 2026-08-11
### Data/Backend (docs/ARCHITECTURE.md 기준)
- `data/*.json`(개인 데이터)과 `data/*.example.json`(공개 템플릿) 분리 — `.gitignore`가 `data/*.json`을 무시하고 `*.example.json`만 커밋하도록 이미 설정돼 있었으나 example 파일 자체가 없어 템플릿이 동작하지 않던 문제를 해결
- `assets/js/main.js`에 `fetchJsonWithFallback()` 추가: 개인 데이터 파일이 없으면 자동으로 대응하는 `.example.json`을 읽어 렌더링 (스키마 필드 변경 없음, `schemaVersion`은 유지)

### Process (docs/CLAUDE_LOG.md 기준)
- `docs/CLAUDE_LOG.md` 신설 — `CLAUDE.md` 변경 시 반드시 무엇을·왜 바꿨는지 기록하도록 규칙화, 문서 지도에 반영

## [0.1.0] - 2026-08-11
### Design (docs/DESIGN.md 기준)
- 초기 디자인 시스템 확정: 미니멀 레이아웃, 세이지 그린(`#7a8c66`) 포인트 컬러, makeflower 라인아트 꽃 모티프(파비콘/로고/프로필 placeholder에 한정)
- job/grad 공통 디자인 시스템, 모드 토글 버튼만 활성 상태 강조
- 인쇄 전용 스타일(print.css) 추가

### Data/Backend (docs/ARCHITECTURE.md 기준)
- `schemaVersion: 1`로 초기 스키마 확정: `profile`, `experience`, `projects`, `research`, `education`, `skills`, `awards`
- 항목 공통 필드(`modes`, `priority`, `emphasis`) 및 모드별 문구 분기(`bullets`/`highlights` 객체) 도입
- 예시/플레이스홀더 데이터로 전 섹션 채움 (실제 콘텐츠는 추후 교체 예정 — docs/PLAN.md)
