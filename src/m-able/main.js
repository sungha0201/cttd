var swiper = new Swiper('.main-section-03__swiper', {
  slidesPerView: 'auto',
  spaceBetween: 14
});
var section_03_swiper = new Swiper('.main-section-03__swiper', {
  slidesPerView: 'auto',
  spaceBetween: 20
});
//관련기사 버튼
const articleBtn = document.querySelectorAll('.article-btn');
articleBtn.forEach(function (btn) {
  let articleList = btn.nextElementSibling;
  btn.addEventListener('click', function () {
    this.classList.toggle('is-on');
    articleList.classList.toggle('is-on');
  });
});

//헤더 고정
const fixed = document.querySelector('.mable-gnb');
const upFixed = document.querySelector('.mable-header');
const fixedH = fixed.offsetHeight;
const upFixedH = upFixed.offsetHeight;
const nextElement = fixed.nextElementSibling;
let before = upFixedH;
console.log(nextElement);
window.addEventListener('scroll', () => {
  if (before < window.scrollY) {
    fixed.style.position = 'sticky';
    fixed.style.top = '0';
  } else {
    upFixed.style.position = 'fixed';
    upFixed.style.top = '0';
    fixed.style.top = `${upFixedH}px`;
    nextElement.style.marginTop = `${fixedH}px`;
  }
  before = window.scrollY;
});
