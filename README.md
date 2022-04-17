
##### FEEDBACK
> mission01
- 대체 텍스트에는 따로 링크,이미지를 쓸필요가 없다 : 스크린 리더에서 자동으로 읽어줌.
- h2는 전체 내용의 헤딩문구로 쓰임, 소제목은 h3로 !!.
- [removed]void(0) 사용 지양 : 개발자들에게 혼동을 줄 수 있으므로 href="#"("#none")을 넣어 링크주소를 넣도록 유도하는 게 좋음!
- ul,li 의 구조는 리스트의 성격 유무로 생각하고 쓰기!
- 스크린리더 예시영상 : <https://www.youtube.com/watch?v=hG-GS8VwAQY>

> mission02
- block__element는 block의 자식요소로만 올 수 있다.
- 아이콘이 들어가더라도 대체텍스트를 넣어주기!
- 의미없는 디자인적 요소인 아이콘은 css background넣어주기.
- p는 문단의 느낌이 강하므로 가격같은 요소들은 span태그로 써주기 추천.
- 상품명 마크업시 상품의 제목을 헤딩태그로 쓰기보다는 ₩<p class="item-info__name"><em></em></p>₩사용도 고려!
- 참고 
    <https://developer.mozilla.org/ko/docs/Web/HTML/Element/Heading_Elements>
    <https://developer.mozilla.org/ko/docs/Web/HTML/Element/p>