$(document).ready(function () {
    window.human = false;


    var canvasEl = document.querySelector('.fireworks');
    var ctx = canvasEl.getContext('2d');
    var numberOfParticules = 30;
    var pointerX = 0;
    var pointerY = 0;
    var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
    var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];


    function setCanvasSize() {
        canvasEl.width = window.innerWidth * 2;
        canvasEl.height = window.innerHeight * 2;
        canvasEl.style.width = window.innerWidth + 'px';
        canvasEl.style.height = window.innerHeight + 'px';
        canvasEl.getContext('2d').scale(2, 2);
    }

    function updateCoords(e) {
        pointerX = e.clientX || e.touches[0].clientX;
        pointerY = e.clientY || e.touches[0].clientY;
    }

    function setParticuleDirection(p) {
        var angle = anime.random(0, 360) * Math.PI / 180;
        var value = anime.random(50, 180);
        var radius = [-1, 1][anime.random(0, 1)] * value;
        return {
            x: p.x + radius * Math.cos(angle),
            y: p.y + radius * Math.sin(angle)
        }
    }

    function createParticule(x, y) {
        var p = {};
        p.x = x;
        p.y = y;
        p.color = colors[anime.random(0, colors.length - 1)];
        p.radius = anime.random(16, 32);
        p.endPos = setParticuleDirection(p);
        p.draw = function () {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
        return p;
    }

    function createCircle(x, y) {
        var p = {};
        p.x = x;
        p.y = y;
        p.color = '#FFF';
        p.radius = 0.1;
        p.alpha = .5;
        p.lineWidth = 6;
        p.draw = function () {
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            ctx.lineWidth = p.lineWidth;
            ctx.strokeStyle = p.color;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        return p;
    }

    function renderParticule(anim) {
        for (var i = 0; i < anim.animatables.length; i++) {
            anim.animatables[i].target.draw();
        }
    }

    function animateParticules(x, y) {
        var circle = createCircle(x, y);
        var particules = [];
        for (var i = 0; i < numberOfParticules; i++) {
            particules.push(createParticule(x, y));
        }
        anime.timeline().add({
            targets: particules,
            x: function (p) {
                return p.endPos.x;
            },
            y: function (p) {
                return p.endPos.y;
            },
            radius: 0.1,
            duration: anime.random(1200, 1800),
            easing: 'easeOutExpo',
            update: renderParticule
        })
            .add({
                targets: circle,
                radius: anime.random(80, 160),
                lineWidth: 0,
                alpha: {
                    value: 0,
                    easing: 'linear',
                    duration: anime.random(600, 800),
                },
                duration: anime.random(1200, 1800),
                easing: 'easeOutExpo',
                update: renderParticule,
                offset: 0
            });
    }

    var render = anime({
        duration: Infinity,
        update: function () {
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        }
    });

    document.addEventListener(tap, function (e) {
        window.human = true;
        render.play();
        updateCoords(e);
        animateParticules(pointerX, pointerY);
    }, false);

    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    function autoClick() {
        if (window.human) return;
        animateParticules(
            anime.random(centerX - 50, centerX + 50),
            anime.random(centerY - 50, centerY + 50)
        );
        anime({duration: 200}).finished.then(autoClick);
    }

    autoClick();
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize, false);

    var pathEls = document.querySelectorAll('path');
    for (var i = 0; i < pathEls.length; i++) {
        var pathEl = pathEls[i];
        var offset = anime.setDashoffset(pathEl);
        pathEl.setAttribute('stroke-dashoffset', offset);
        anime({
            targets: pathEl,
            strokeDashoffset: [offset, 0],
            duration: anime.random(1000, 3000),
            delay: anime.random(0, 2000),
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine',
            autoplay: true
        });
    }
    $("#welcom").hide();
    $("#welcom").show(2000);

    $(".content").click(function () {
        $("canvas").hide(1000);
        $("#welcom").hide(1000);
    });

    var hidden = $('#tel,#email,footer,#experience,#presentation,#maitrise,#portfolio,h2,.ligne,.h-2,.h-3,.ligne2,.ligne3');


    $(window).on('load', function () {
        if (window.matchMedia("(min-width: 600px)").matches) {
            hidden.hide();
            html.style('overflow-y', 'hidden');
        } else {
            hidden.show();
            html.style('overflow-y', 'scroll');
            $('#top1,#top2,#top3,#top4').hide();
        }
    })
    ;
    $('header').on('click', function (){
        if (window.matchMedia("(min-width: 600px)").matches) {
            $('#top1,#top2,#top3').show();}
        else{
            $('#top1,#top2,#top3,#top4').hide();
        }
    })



    $('#presentation1').on('click', function (a) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $('#presentation,.ligne,h2').show();
            $('html').css('overflow-y', 'hidden');
            $('#header').hide();

        } else {

            hidden.show();
            $('html').css('overflow-y', 'scroll');
            $('#top1,#top2,#top3,#top4').hide();
        }
    })
    ;


    $('#maitrise1').on('click', function (b) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $('#maitrise,.h-2,.ligne2').show();
            $('html').css('overflow-y', 'hidden');
            $('#header').hide();

        } else {

            hidden.show();
            $('html').css('overflow-y', 'scroll');
            $('#top1,#top2,#top3,#top4').hide();
        }
    })
    ;

    $('#experience1').on('click', function (b) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $('#experience,.h-3,.ligne3').show();
            $('html').css('overflow-y', 'hidden');
            $('#header').hide();

        } else {

            hidden.show();
            $('html').css('overflow-y', 'scroll');
            $('#top1,#top2,#top3,#top4').hide();
        }
    })
    ;


    $('#portfolio1').on('click', function (b) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $('#portfolio,.h-4,.ligne4').show();
            $('html').css('overflow-y', 'scroll');
            $('#header').hide();

        } else {

            hidden.show();
            $('html').css('overflow-y', 'scroll');
            $('#top1,#top2,#top3,#top4').hide();
        }
    })
    ;


    $('#footer__wrapper1').on('click', function (d) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $('footer').show();
            $('html').css('overflow-y', 'hidden');
            $('#header').hide();
        } else {

            hidden.show();
            $('html').css('overflow-y', 'scroll');
            $('#top1,#top2,#top3,#top4').hide();

        }
    })
    ;


    $('#top1').on('click', function (e) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $('#header').show();
            $('html').css('overflow-y', 'hidden');
            $('#presentation,.ligne,h2').hide();

        }})
    ;


    $('#top2').on('click', function (f) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $('#header').show();
            $('html').css('overflow-y', 'hidden');
            $('#maitrise').hide();

        } else {

            hidden.show();
            $('html').css('overflow-y', 'scroll');
            $('#top1,#top2,#top3,#top4').hide();
        }
    })
    ;
    $('#top3').on('click', function (f) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $('#header').show();
            $('html').css('overflow-y', 'hidden');
            $('#experience').hide();

        } else {

            hidden.show();
            $('html').css('overflow-y', 'scroll');
            $('#top1,#top2,#top3,#top4').hide();
        }
    })
    ;


    $('#top4').on('click', function (g) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $('#header').show();
            $('html').css('overflow-y', 'hidden');
            $('#portfolio').hide();

        } else {

           hidden.show();
            $('html').css('overflow-y', 'scroll');
            $('#top1,#top2,#top3,#top4').hide();
        }
    })
    ;


    $('#top5').on('click', function (h) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $('#header').show();
            $('html').css('overflow-y', 'hidden');
           hidden.hide();

        } else {

            hidden.show();
            $('html').css('overflow-y', 'scroll');
            $('#top1,#top2,#top3,#top4').hide();
        }
    })
    ;
    $('#tel1').on('click', function (){
        $('#tel').show();
    });

    $('#gmail').on('click', function (){
        $('#email').show();
    });



})