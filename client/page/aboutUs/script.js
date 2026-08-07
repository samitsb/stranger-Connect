$(function () {
    const $gallery = $('.gallery');
    const $slides = $('.gallery-slide');
    const $dots = $('.gallery-dot');
    const $prev = $('.gallery-btn-prev');
    const $next = $('.gallery-btn-next');
    let currentIndex = 0;
    let autoplayId;

    function showSlide(index) {
        currentIndex = (index + $slides.length) % $slides.length;
        $slides.removeClass('active').eq(currentIndex).addClass('active');
        $dots.removeClass('active').eq(currentIndex).addClass('active');
    }

    function startAutoplay() {
        clearInterval(autoplayId);
        autoplayId = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 4000);
    }

    $prev.on('click', function (event) {
        event.stopPropagation();
        showSlide(currentIndex - 1);
        startAutoplay();
    });

    $next.on('click', function (event) {
        event.stopPropagation();
        showSlide(currentIndex + 1);
        startAutoplay();
    });

    $dots.on('click', function (event) {
        event.stopPropagation();
        showSlide(parseInt($(this).data('index'), 10));
        startAutoplay();
    });

    $gallery.on('click', '.gallery-stage', function (event) {
        if ($(event.target).closest('.gallery-btn, .gallery-dot').length) {
            return;
        }

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if ($gallery[0].requestFullscreen) {
            $gallery[0].requestFullscreen();
        }
    });

    $(document).on('fullscreenchange', function () {
        $gallery.toggleClass('is-fullscreen', !!document.fullscreenElement);
    });

    $gallery.on('mouseenter', function () {
        clearInterval(autoplayId);
    }).on('mouseleave', function () {
        startAutoplay();
    });

    showSlide(0);
    startAutoplay();
});
