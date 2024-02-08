function makeSectionsClickable() {
    const clickableSections = document.querySelectorAll('.clickable-section');

    clickableSections.forEach(section => {
        // Remove existing event listeners to prevent duplication
        section.removeEventListener('click', onSectionClick);
        section.removeEventListener('mouseover', onSectionMouseOver);
        section.removeEventListener('mouseout', onSectionMouseOut);

        // Attach new event listeners
        section.addEventListener('click', onSectionClick);
        section.addEventListener('mouseover', onSectionMouseOver);
        section.addEventListener('mouseout', onSectionMouseOut);
    });
}

function onSectionClick(event) {
    const arrowLink = event.currentTarget.querySelector('.arrow-link');
    window.location.href = arrowLink.href;
}

function onSectionMouseOver(event) {
    const arrowSvg = event.currentTarget.querySelector('.arrow-link svg');
    const heading = event.currentTarget.querySelector('h2');
    const img = event.currentTarget.querySelector('img');

    arrowSvg.style.transform = 'rotate(0deg)';
    if (img) img.style.transform = 'scale(1.1)';
    if (event.currentTarget.classList.contains('bright-section')) {
        heading.classList.add('cool-contrast-gradient');
    } else {
        heading.classList.add('gradient-text');
    }
}

function onSectionMouseOut(event) {
    const arrowSvg = event.currentTarget.querySelector('.arrow-link svg');
    const heading = event.currentTarget.querySelector('h2');
    const img = event.currentTarget.querySelector('img');

    arrowSvg.style.transform = 'rotate(-45deg)';
    if (img) img.style.transform = 'scale(1.0)';
    heading.classList.remove('gradient-text', 'cool-contrast-gradient');
}

document.addEventListener('DOMContentLoaded', makeSectionsClickable);
document.addEventListener('astro:after-swap', makeSectionsClickable);
