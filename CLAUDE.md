# CLAUDE.md

이 저장소에서 작업할 때 매번 확인해야 할 것들을 요약한 진입점 문서입니다.

## 프로젝트 한 줄 요약
빌드 도구 없는 정적 HTML/CSS/JS 이력서·포트폴리오 사이트. `data/*.json` 하나의 소스를 이직(job)/대학원(grad) 두 모드로 다르게 렌더링한다.

## 문서 지도
| 궁금한 것 | 볼 문서 |
|---|---|
| 데이터 필드가 뭐가 있는지, 렌더링이 어떻게 동작하는지 | `docs/ARCHITECTURE.md` |
| 왜 이런 디자인/톤을 택했는지 | `docs/DESIGN.md` |
| 지금까지 뭘 했는지 | `docs/PLAN.md` |
| 앞으로 할 일(배포, 다크모드 등) | `docs/ROADMAP.md` |
| 과거에 겪은 문제와 해결법 | `docs/TROUBLESHOOTING.md` |
| 버전별 변경 이력 | `docs/CHANGELOG.md` |
| `CLAUDE.md` 자체가 왜 이렇게 바뀌어왔는지 | `docs/CLAUDE_LOG.md` |
| 콘텐츠(경력/프로젝트 등) 추가하는 법 | `CONTENT_GUIDE.md` |

각 폴더 안의 `README.md`도 그 폴더의 역할을 짧게 설명합니다.

## 작업 전 체크리스트
- 데이터 필드 구조를 바꾸기 전엔 `docs/ARCHITECTURE.md`를 먼저 읽는다
- 디자인/톤(컬러, 레이아웃, 컴포넌트)을 바꾸기 전엔 `docs/DESIGN.md`를 먼저 읽는다
- 스키마(`schemaVersion`)나 디자인 시스템을 바꾸면 반드시 `docs/CHANGELOG.md`에 항목을 추가하고, 디자인 변경이 참조하는 데이터 필드가 실제로 존재하는지 교차 확인한다
- 콘텐츠만 추가/수정하는 경우(경력, 프로젝트 등)는 `data/*.json`만 건드리면 되고 코드는 손댈 필요 없다
- **개인 데이터 vs 공개 템플릿**: `data/*.json`은 실제 개인 데이터로 `.gitignore`에 의해 커밋되지 않는다. `data/*.example.json`이 GitHub에 올라가는 공개 템플릿이다. 데이터 스키마(필드)를 추가/변경하면 대응하는 `*.example.json`도 반드시 같이 갱신할 것 — 안 그러면 공개 템플릿이 낡아서 다른 사람이 클론했을 때 깨진다.
- **`CLAUDE.md`를 수정하면 반드시 `docs/CLAUDE_LOG.md`에 무엇을·왜 바꿨는지 기록한다** — 규칙이 바뀐 이유를 남겨야 다음 세션이 같은 문제를 반복하지 않는다.

## 로컬 실행
`fetch()`로 로컬 JSON을 읽기 때문에 `index.html`을 `file://`로 직접 열면 CORS 에러가 난다. 로컬 서버로 열 것:
```
python -m http.server 8000
# 또는
npx serve
```

## 배포 관련 제약
배포는 사용자가 본인 Windows PC + 기존 Cloudflare 환경에 직접 진행한다. Claude는 실제 서버/네트워크/방화벽 설정을 수행하지 않으며, 보안 고려사항은 `docs/ROADMAP.md`에 권장사항으로만 남긴다.
