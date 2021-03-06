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



function getQueryStringValue (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

// borrowed from https://gist.github.com/niyazpk/f8ac616f181f6042d1e0
function updateUrlParameter (uri, key, value) {
    // remove the hash part before operating on the uri
    var
        i = uri.indexOf('#'),
        hash = i === -1 ? '' : uri.substr(i)
        ;

    uri = i === -1 ? uri : uri.substr(0, i);

    var
        re = new RegExp("([?&])" + key + "=.*?(&|$)", "i"),
        separator = uri.indexOf('?') !== -1 ? "&" : "?"
        ;

    if (!value) {
        // remove key-value pair if value is empty
        uri = uri.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');

        if (uri.slice(-1) === '?') {
            uri = uri.slice(0, -1);
        }
        // replace first occurrence of & by ? if no ? is present

        if (uri.indexOf('?') === -1) {
            uri = uri.replace(/&/, '?');
        }

    } else if (uri.match(re)) {
        uri = uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        uri = uri + separator + key + "=" + value;
    }
    return uri + hash;
}

var
    lang = getQueryStringValue('lang') || 'en',
    stretching = getQueryStringValue('stretching') || 'auto'
    ;

$('select[name=lang]').on('change', function () {
    window.location.href = updateUrlParameter(window.location.href, 'lang', $(this).val());
}).val(lang);

$('select[name=stretching]').on('change', function () {
    window.location.href = updateUrlParameter(window.location.href, 'stretching', $(this).val());

}).val(stretching);

$('select[name=sources]').on('change', function () {
    var
        _this = $(this),
        media = _this.closest('.players').find('.media-wrapper').find('.mejs__container').attr('id'),
        player = mejs.players[media]
        ;

    player.setSrc(_this.val().replace('&amp;', '&'));
    player.load();

    var renderer = $('#' + player.media.id + '-rendername');
    renderer.find('.src').html('<a href="' + _this.val() + '" target="_blank">' + _this.val() + '</a>')
        .end()
        .find('.renderer').html(player.media.rendererName)
        .end()
        .find('.error').html('')
    ;

});

// These media types cannot play at all on iOS, so disabling them
if (mejs.Features.isiOS) {
    $('select').find('option[value^="rtmp"]').prop('disabled', true)
        .end()
        .find('option[value$="webm"]').prop('disabled', true)
        .end()
        .find('option[value$=".mpd"]').prop('disabled', true)
        .end()
        .find('option[value$=".ogg"]').prop('disabled', true)
        .end()
        .find('option[value*=".flv"]').prop('disabled', true);
}

$(document).ready(function () {

    mejs.i18n.language(lang);

    $('video, audio').mediaelementplayer({
        stretching: stretching,
        pluginPath: '../build/',
        success: function (media) {
            $(media).closest('.media-wrapper').find('.mejs__container').attr('lang', mejs.i18n.language());

            var renderer = $('#' + media.id + '-rendername');

            media.addEventListener('loadedmetadata', function (e) {
                var src = media.originalNode.getAttribute('src').replace('&amp;', '&');
                if (src !== null && src !== undefined) {
                    renderer.find('.src').html('<a href="' + src + '" target="_blank">' + src + '</a>')
                        .end()
                        .find('.renderer').html(media.rendererName)
                        .end()
                        .find('.error').html('')
                    ;
                }
            }, false);

            media.addEventListener('error', function (e) {
                renderer.find('.error').html('<strong>Error</strong>: ' + e.message);
            }, false);
        }
    });
});


$(window).scroll(function(event) {
    if($(this).scrollTop() > 150) {
        $("header.header").removeClass('d-none')
    }
    else {
        $("header.header").addClass('d-none')
    }
});