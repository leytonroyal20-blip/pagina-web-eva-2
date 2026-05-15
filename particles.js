const particlesContainer =
    document.querySelector('#particles');

for (let i = 0; i < 40; i++) {

    const particle =
        document.createElement('span');

    particle.className = 'particle';

    particle.style.left =
        Math.random() * 100 + 'vw';

    particle.style.animationDuration =
        5 + Math.random() * 10 + 's';

    particle.style.opacity =
        Math.random();

    particle.style.width =
        2 + Math.random() * 5 + 'px';

    particle.style.height =
        particle.style.width;

    particlesContainer.appendChild(particle);

}
