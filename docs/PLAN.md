# Plan (현재 상태)

마지막 갱신: v0.2.0 (docs/CHANGELOG.md 참고)

## v0.2.0 — 공개 템플릿/개인 데이터 분리
- `data/*.json`(개인 데이터, gitignore) vs `data/*.example.json`(공개 템플릿, 커밋 대상) 분리
- `main.js`가 개인 데이터 파일이 없으면 자동으로 example로 폴백 → 클론 직후에도 바로 동작
- `docs/CLAUDE_LOG.md` 신설: `CLAUDE.md` 변경 이력을 별도로 추적해 같은 문제(예: gitignore만 설정하고 example 파일은 안 만드는 것)가 반복되지 않게 함
- 상세: `docs/CHANGELOG.md` `[0.2.0]`

## v0.1.0 — 초기 빌드 범위
- 빌드 도구 없는 정적 HTML/CSS/JS 이력서·포트폴리오 사이트
- `data/*.json` 단일 소스에서 job(이직)/grad(대학원) 두 모드로 다르게 렌더링
  - 모드별 요약 문구, 섹션 노출 순서, 항목별 노출 여부/정렬, bullets/highlights 문구까지 분리
- 사진 유무 모두 대응하는 히어로 레이아웃, makeflower 모티프를 절제해서 반영한 미니멀 디자인
- `window.print()` 기반 PDF 저장(인쇄 전용 스타일)
- 콘텐츠를 계속 채워나갈 수 있도록 스키마/가이드 문서화 (`CONTENT_GUIDE.md`, `docs/ARCHITECTURE.md`)
- 폴더별 README, 최상위 `CLAUDE.md`, 버전 관리(`schemaVersion` + `docs/CHANGELOG.md`) 체계 구축

## 완료 상태
- [x] 데이터 스키마 및 예시 콘텐츠 (`data/*.json`)
- [x] 렌더링 로직 및 모드 토글 (`assets/js/main.js`)
- [x] 미니멀 + makeflower 톤 스타일 (`assets/css/main.css`)
- [x] 인쇄/PDF 스타일 (`assets/css/print.css`)
- [x] 로컬 서버로 job/grad 두 모드 렌더링 확인 (브라우저 콘솔 에러 없음)
- [x] 문서 체계 (`docs/`, 폴더별 README, `CLAUDE.md`, `CONTENT_GUIDE.md`)

## 다음 사람(미래의 나)이 할 일
1. `data/*.example.json`을 복사해 `data/*.json`으로 만들고 실제 이력 데이터로 채우기 — 방법은 `CONTENT_GUIDE.md`의 "처음 시작하기"
2. 실제 프로필 사진이 있다면 `assets/img/private/`에 추가하고 `data/profile.json`(개인용)의 `photo` 경로 교체
3. 배포는 `docs/ROADMAP.md`의 안내를 따라 직접 진행 (Windows PC + Cloudflare)

큰 구조 변경(스키마/디자인 시스템)이 생기면 이 문서를 갱신하고 `docs/CHANGELOG.md`에 버전을 기록하세요.
