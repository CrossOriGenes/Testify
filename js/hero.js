/* 
* scroll animations
*/

//set the properties of the built in constructor 
ScrollReveal({
    reset: true,
    distance: '40px',
    duration: 2000,
    delay: 400
});

//on reveal animations for section 1
ScrollReveal().reveal('.main-title', { delay: 400 });
ScrollReveal().reveal('.image1', { delay: 700, origin: 'right' });
ScrollReveal().reveal('p', { delay: 500 });
ScrollReveal().reveal('.hero-actions', { delay: 500 });
ScrollReveal().reveal('.circle1', { delay: 700, origin: 'bottom' });
ScrollReveal().reveal('.circle2', { delay: 700, origin: 'top' });

//on reveal animations for section section 2
ScrollReveal().reveal('.image2', { delay: 500, origin: 'left' });
ScrollReveal().reveal('.shape1', { delay: 700, origin: 'top' });
ScrollReveal().reveal('.shape2', { delay: 700, origin: 'bottom' });
ScrollReveal().reveal('.instructions-list li', { delay: 600, origin: 'top', interval: 200 });


/* 
* change active navigation 
* on mousescroll 
*/
const sections = document.querySelectorAll('section');
const navli = document.querySelectorAll('header nav a');
window.addEventListener("scroll", () => {
    let len = sections.length;
    while (--len && window.scrollY + 97 < sections[len].offsetTop) { }
    navli.forEach(item => item.classList.remove('active'));
    navli[++len].classList.add('active');
});

/* 
* close sidebar on tab selection 
*/
navli.forEach(options => {
	options.onclick = function(){
		document.querySelector('.btn-close').click();
	}
});


/* 
* redirect to exam page 
* on start exam button click 
*/
document.getElementById('redirect-btn').addEventListener('click', () => {
    window.location.href = './exam.html';
});

/* 
* redirect to login page on logout 
*/
document.getElementById('logout-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});