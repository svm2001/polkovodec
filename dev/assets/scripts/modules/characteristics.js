export default function characteristics() {
    const items = document.querySelectorAll('.characteristics__item');
    const images = document.querySelectorAll('.characteristics__poster img');
    const container = document.querySelector('.characteristics__items');

    const showDefaultImage = () => {
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'rotateY(90deg)';
            img.classList.remove('active');
        });
        images[0].style.opacity = '1';
        images[0].style.transform = 'rotateY(0)';
    };

    showDefaultImage();

    items.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
          const title = item.querySelector('.characteristics__item-text')
          const text = item.querySelector('.characteristics__item-text')
          const icon = item.querySelector('.characteristics__item-icon')
          items.length > index + 1 
            ? icon.style.transform = `translateY(${text.offsetHeight}px)`
            : '';

          images.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'rotateY(90deg)';
            img.classList.remove('active');
          });
          images[index].style.opacity = '1';
          images[index].style.transform = 'rotateY(0)';
          images[index].classList.add('active');            
        });

        item.addEventListener('mouseleave', () => {
          const title = item.querySelector('.characteristics__item-text')
          const text = item.querySelector('.characteristics__item-text')
          const icon = item.querySelector('.characteristics__item-icon')
          items.length > index + 1 
            ? icon.style.transform = `translateY(0px)`
            : '';          
        });
    });

    container.addEventListener('mouseleave', showDefaultImage);
}