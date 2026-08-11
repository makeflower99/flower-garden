# flower-garden

이직(취업)과 대학원 진학, 두 가지 목적으로 함께 쓸 수 있는 개인 이력서 및 포트폴리오 사이트입니다. 모든 콘텐츠는 `data/*.json` 하나의 소스에 저장되고, 상단 토글로 "이직 모드 / 대학원 모드"를 전환하면 같은 데이터를 다른 순서·다른 강조·다른 문구로 보여줍니다.

- 빌드 도구 없는 순수 HTML/CSS/JS 정적 사이트
- 콘텐츠 추가는 코드 수정 없이 `data/` 안 JSON 파일만 편집하면 됩니다 → [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)
- 프로젝트 구조와 작업 시 체크리스트는 [CLAUDE.md](./CLAUDE.md), 상세 문서는 [docs/](./docs) 참고

## 템플릿으로 쓰기 (fork 하시는 분들께)
`data/*.json`(실제 개인 데이터)은 `.gitignore`로 무시되어 이 저장소엔 올라가지 않습니다. 커밋되는 건 `data/*.example.json`(공개 예시 데이터)뿐이고, 사이트는 실제 데이터 파일이 없으면 자동으로 예시 데이터를 보여줍니다. 그래서 이 저장소를 클론/fork하면 바로 예시 이력서가 동작하고, 자기 데이터로 바꾸는 방법은 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)의 "처음 시작하기"를 따라가면 됩니다.

## 로컬에서 실행하기
`fetch()`로 로컬 JSON을 읽기 때문에 `index.html`을 더블클릭(`file://`)으로 열면 CORS 에러가 납니다. 로컬 정적 서버로 여세요.
```bash
python -m http.server 8000
# 또는
npx serve
```
그 후 `http://localhost:8000` 접속.

## PDF로 저장하기
헤더의 "PDF로 저장" 버튼을 누르면 브라우저 인쇄창이 뜨고, 인쇄 전용 스타일이 적용되어 지원서 제출용으로 바로 저장할 수 있습니다.

## 배포
실제 배포(Windows PC + Cloudflare Tunnel 등)는 직접 진행하는 것을 전제로 하며, 보안을 고려한 권장사항만 남겨둡니다.
- 정적 파일만 서빙 (백엔드/DB 없음 → 서버 사이드 취약점 자체가 없음)
- 라우터에서 인바운드 포트를 직접 열지 말고 Cloudflare Tunnel(cloudflared)로 로컬 서버를 노출
- 불필요한 관리자 인터페이스나 디렉터리 리스팅은 비활성화

자세한 배포 백로그는 [docs/ROADMAP.md](./docs/ROADMAP.md) 참고.

## 문서
| 문서 | 내용 |
|---|---|
| [CLAUDE.md](./CLAUDE.md) | 작업 전 체크리스트, 문서 지도 |
| [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) | 콘텐츠(경력/프로젝트/논문 등) 추가하는 법 |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | 데이터 스키마, 렌더링 로직 상세 |
| [docs/DESIGN.md](./docs/DESIGN.md) | 디자인/기획 의도와 결정 근거 |
| [docs/PLAN.md](./docs/PLAN.md) | 현재 진행 상태 |
| [docs/ROADMAP.md](./docs/ROADMAP.md) | 추후 계획(배포, 다크모드 등) |
| [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) | 문제/해결 기록 |
| [docs/CHANGELOG.md](./docs/CHANGELOG.md) | 버전별 기획/디자인/데이터 변경 이력 |
| [docs/CLAUDE_LOG.md](./docs/CLAUDE_LOG.md) | `CLAUDE.md`가 왜 지금 모습으로 바뀌어왔는지 |
