
document.getElementById('toggleButton').addEventListener('click', function () {
    const content = document.getElementById('toggleContent');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
});


    document.querySelectorAll('.thumbnail').forEach(img => {
    img.addEventListener('click', function () {
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modalImage');
        modal.style.display = 'block';
        modalImg.src = this.src;
    });
});

document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
});
