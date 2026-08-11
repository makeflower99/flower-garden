# assets/css/

- `main.css` — 전체 레이아웃과 테마. 상단 `:root`에 컬러/폰트/간격 CSS 변수가 모여 있어, 톤을 바꾸려면 여기 변수만 수정하면 됩니다. 디자인 결정 근거는 `docs/DESIGN.md`.
- `print.css` — `@media print`로만 적용되는 인쇄/PDF 저장용 스타일. "PDF로 저장" 버튼(`window.print()`)을 눌렀을 때 네비게이션/토글을 숨기고 이력서만 깔끔하게 출력합니다.
