# assets/js/

- `main.js` — 유일한 스크립트. 흐름은 `data/*.json` fetch(없으면 `data/*.example.json`으로 자동 폴백) → URL/localStorage로 모드(job/grad) 결정 → 모드별로 항목 필터링·정렬 → `#sections`에 DOM 렌더링 → 토글 클릭 시 재렌더링. 빌드 도구 없이 브라우저에서 바로 동작하는 순수 ES 모듈입니다.

세부 렌더링 규칙과 스키마는 `docs/ARCHITECTURE.md`를 참고하세요.
