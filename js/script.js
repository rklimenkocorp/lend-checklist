$('.chxtocheck').click(function(){
    $(this).closest('label').toggleClass('checked');
})
$('.slick_document').slick({
    infinite: true,
    slidesToShow: 3,
    prevArrow:'<button class="btn btn-outline-blue btn-arrow btn-arrow__prev"><span class="mdi mdi-chevron-left"></span></button>',
    nextArrow:'<button class="btn btn-outline-blue btn-arrow btn-arrow__next"><span class="mdi mdi-chevron-right"></span></button>',
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
})

$('.mgnf_pop').magnificPopup({
    delegate: '.mgn_img', // child items selector, by clicking on it popup will open
    type: 'image',
    gallery:{
        enabled:true,
        tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
    }

    // other options
});

$('.slick_document').magnificPopup({
    delegate: '.sert_img', // child items selector, by clicking on it popup will open
    type: 'image',
    gallery:{
        enabled:true,
        tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
    }

    // other options
});