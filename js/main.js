//scroll to top on load

window.addEventListener('load',()=>{
  window.scrollTo(0,0);
})

//navigation change on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll',()=>{
  //detect scrolling from the top and change the nav background
  if(window.pageYOffset > 0){
    nav.classList.add('scrolled');
  }
  else{
    nav.classList.remove('scrolled');
  }
})

//smooth scroll and active class change on scroll or on click

function removeActiveClass(links) {
  links.forEach(link => {
    link.classList.remove('active');
  })
}

let links = document.querySelectorAll('.menu-link');

window.addEventListener('scroll', () => {
  links.forEach(link => {
    //target section
    let scrollAmount = window.pageYOffset;
    let targetSection = document.querySelector(link.getAttribute('href'));
    let top = targetSection.offsetTop;
    let bottom = top + targetSection.scrollHeight;
    if (top - scrollAmount - nav.scrollHeight <= 0 && bottom - scrollAmount >= 0) {
      removeActiveClass(links);
      link.classList.add('active');
    }
    else {
      link.classList.remove('active');
    }
  })
})

//smooth scroll behavior

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    let target = link.getAttribute('href');
    scroll(target, 400);
  });
})

function scroll(target, duration) {
  //animation target(destination)
  const el = document.querySelector(target);
  //scroll amount
  const scrollAmount = window.pageYOffset;
  //distance from the top
  const position = el.getBoundingClientRect().top + scrollAmount;
  //animation distance
  const animationDistance = position - scrollAmount - nav.scrollHeight + 10;
  let startTime = null;
  function animate(time) {
    if (startTime === null) startTime = time;
    let timeElapsed = time - startTime;
    let run = easing(timeElapsed, scrollAmount, animationDistance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animate);
  }
  //accelerate half way, than decelerate
  function easing(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };
  requestAnimationFrame(animate);
}

//open side menu

const burger = document.querySelector('.burger');
const overlay = document.querySelector('.side-menu-overlay');
const sideMenu = document.querySelector('.side-menu');
const closeBtn = document.querySelector('.close');
burger.addEventListener('click',()=>{
  overlay.classList.add('active');
  sideMenu.classList.add('active');
})

//close side menu

overlay.addEventListener('click', ()=>{
  overlay.classList.remove('active');
  sideMenu.classList.remove('active');
})
closeBtn.addEventListener('click', ()=>{
  overlay.classList.remove('active');
  sideMenu.classList.remove('active');
})

//every time user clicks on side nav link, close side nav
const sideNavLinks = document.querySelectorAll('.side-menu-nav .menu-link');
sideNavLinks.forEach(link=>{
  link.addEventListener('click', () => {
    overlay.classList.remove('active');
    sideMenu.classList.remove('active');
  });
})