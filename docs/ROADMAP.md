# Roadmap (추후 계획 / 백로그)

지금 범위 밖으로 미룬 항목들. 우선순위 없이 생각날 때마다 추가하고, 착수하면 `docs/PLAN.md`로 옮기세요.

## 배포 (Windows PC + Cloudflare)
사용자가 직접 진행할 부분. Claude는 실제 서버/네트워크 설정을 수행하지 않음 — 아래는 보안을 고려한 권장 방향만 기록:
- 인바운드 포트를 라우터에서 직접 열지 말고 **Cloudflare Tunnel(cloudflared)**로 로컬 정적 서버를 노출 (기존에 1개 서빙 중인 것과 동일한 방식 유지 권장)
- 정적 파일만 서빙하는 가벼운 서버 사용 (예: Caddy, `serve`) — 관리자 인터페이스나 디렉터리 리스팅 비활성화
- Cloudflare 쪽에서 "Always Use HTTPS", 봇/DDoS 보호(Bot Fight Mode 등) 활성화
- 이 사이트는 백엔드/DB가 없는 정적 파일이라 서버 취약점 자체가 거의 없음 — 위 항목은 "노출 경로"를 최소화하는 데 집중
- 커스텀 도메인(makeflower 관련) 연결 시 Cloudflare DNS + Tunnel 라우팅 설정

## 콘텐츠/기능
- Skills 섹션을 태그 나열 대신 간단한 시각화(막대/레벨 배지)로 — 필요 시 dataviz 스킬 가이드 참고해 컬러 재사용
- 프로젝트 카드에 이미지/스크린샷 슬롯 추가
- 다국어(영문 이력서) 버전 — `summary`, `bullets` 등에 `en` 키 추가하는 방식으로 확장 가능
- research 섹션에 Google Scholar/arXiv 링크 아이콘화

## 디자인
- 다크모드 (`prefers-color-scheme` 대응, CSS 변수는 이미 분리돼 있어 확장 용이)
- 인쇄 레이아웃 2단 컬럼 옵션 (긴 이력서 대비)

## 인프라/관리
- 데이터 유효성 검사 스크립트(스키마 lint) — 필드 누락/오탈자 방지
- `schemaVersion` 자동 증가 또는 CI 체크 (지금은 수동 관리)
