"strict mode"

$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(catalog__tab-active)', function () {
        $(this)
            .addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
            .eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back')

    // Modal 

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('fast');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
    });

    $('.button-mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('fast');
        })

    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Խնդրում եմ լրացրեք ձեր անունը",
                    minlength: jQuery.validator.format("Լրացրեք առնվազն {0} նիշ")
                },
                phone: "Խնդրում եմ լրացրեք ձեր հեռախոսահամարը",
                email: {
                    required: "Խնդրում եմ լրացրեք ձեր էլ․ հասցեն",
                    email: "Սխալ էլ․ հասցե"
                }
            }
        });
    }
    validateForms('#consultation-form')
    validateForms('#order form')
    validateForms('#consultation form')

    $('input[name=phone]').mask('+374(99)(99-99-99)')

    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        };

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    //smooth scroll and pageup
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function () {
        const _href = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(_href).offset().top + 'px' });
        return false;
    })

    new WOW().init();
});
