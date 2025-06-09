$(document).ready(function() {
    var currentPage = location.pathname.split('/').pop();
    
    $('#navbar .nav li').each(function() {
        var $this = $(this);
        var link = $this.find('a').attr('href');
        
        if (currentPage === '' || currentPage === 'index.html') {
            if (link === 'index.html' || link === '.') {
                $this.addClass('active');
            }
        } 
        else if (link === currentPage) {
            $this.addClass('active');
        }
    });
    
    $('a[href^="#"]').on('click', function(event) {
        if (this.pathname === window.location.pathname) {
            event.preventDefault();
            var target = $(this.getAttribute('href'));
            if (target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
            }
        }
    });
    
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        alert('Сообщение отправлено! В реальном проекте здесь будет реализована отправка данных на сервер.');
        $(this)[0].reset();
    });
    
    $(window).scroll(function() {
        $('.timeline-item').each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (scroll > position - windowHeight + 200) {
                $(this).addClass('fadeInUp');
            }
        });
    });
});