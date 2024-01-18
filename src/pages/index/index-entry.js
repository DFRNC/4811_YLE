require("./../../global/js/global-entry")

import "./index.scss"
import("../../components/head/head")
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollToPlugin from "gsap/ScrollToPlugin";

/**
 * outImageUrl - change image url in svg (if image save with link)
 * needContent - return content to js file
 * par - preserveAspectRatio attribute for svg
 * class - class for svg <svg class=""></svg>
 * ./img/test_svg/test.svg - path to svg in src
 */
let svgContent = require("!!svg-anim-loader?outImageUrl=./assets/img/&needContent=false&par='xMidYMid slice'&class=''!./img/animation.svg")
require("!!svg-anim-loader?outImageUrl=./assets/img/&needContent=false&par='xMidYMid slice'&class=''!./img/preloader.svg")
// console.log(svgContent);preserveAspectRatio="xMidYMid slice"
document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {


        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        let overlay = document.getElementById("overlay")
        let overlayBtn = document.querySelector("#overlay button")
        let audioDemo = document.getElementById("audioDemo")
        let skipBtn = document.querySelector(".skip-btn")
        overlayBtn.addEventListener('click', function () {
            overlay.style.display = 'none'
        })

        audioDemo.volume = 0.3;
        function forBtnPlay() {
            if (audioDemo.currentTime == 0) {
                audioDemo.load()
            }
            audioDemo.play();
        }

        function forBtnPause() {
            audioDemo.pause()
            audioDemo.currentTime = 0
        }

        function skipClick() {
            gsap.to(window, { duration: 0.5, scrollTo: animTl.scrollTrigger.labelToScroll('skip'), ease: "sine.inOut" })
        }

        function insertObject(target, text) {
            let targetElem = document.querySelector(target)
            targetElem.insertAdjacentHTML('afterend', `
            <g id = "${targetElem.getAttribute('id')}" > <foreignObject x="${targetElem.getAttribute('x')}" y="${targetElem.getAttribute('y')}" width="${targetElem.getAttribute('width')}" height="${targetElem.getAttribute('height')}">
                <div xmlns="http://www.w3.org/1999/xhtml">
                    ${document.querySelector(text).innerHTML}
                </div>
            </foreignObject></g>
        `)
            targetElem.style.display = 'none'
            targetElem.innerHTML = ''
        }

        insertObject('#imgDoorL', '.door1')
        insertObject('#imgDoorR', '.door2')

        let durationAnim = 15

        gsap.to('.animation', { duration: 0.5, opacity: 1, ease: "sine.inOut" })
        gsap.set('.doorL', { perspective: '500px' })
        gsap.set('.doorR', { perspective: '500px' })
        gsap.set('.doorL img', { transformOrigin: "0% 100%", transformStyle: "preserve-3d" })
        gsap.set('.doorR img', { transformOrigin: "100% 0%", transformStyle: "preserve-3d" })
        gsap.set('#man', { transformOrigin: "50% 50%" })
        gsap.set('#scalePreloader,#img01,#img02', { transformOrigin: "50% 50%" })
        gsap.to('.skip-btn', { duration: 1.5, transformOrigin: "50% 50%", repeat: -1, yoyo: true, scale: 1.05, ease: "sine.inOut" })
        gsap.set('#img02', { opacity: 0, transformOrigin: "50% 50%", scale: 3.5, x: "-70%", y: "-80%" })
        gsap.set('#bg-move', { transformOrigin: "center center" })
        let animTl = gsap.timeline({ defaults: { ease: "none" } })
            .addLabel('myLabel')
            .to('#img01', { duration: durationAnim, scale: 4.7, x: "-60%", y: "-60%", rotation: 25 })
            .to('#img01', { duration: durationAnim, opacity: 0 })
            .to('#bg-move', { duration: durationAnim, scale: 1.5 })
            .to('#animScene2', { duration: durationAnim, scale: 1.05 }, "<")

            .to('.doorL img', { duration: durationAnim * 2, rotationY: -25, })
            .to('.doorR img', { duration: durationAnim * 2, rotationY: 25 }, "<")
            .to('.preloader-text1', { duration: durationAnim * 2, opacity: 1 }, "<")
            .to('#lightDoor1Top,#lightDoor1Bottom,#lightDoor2', { duration: durationAnim * 2, opacity: 0.3 }, "<")
            .to('#man', { duration: durationAnim * 2, y: -35, scale: 0.85 }, "<")
            .to('.preloader-text1', { duration: durationAnim * 2, opacity: 0 })

            .to('.doorL img', { duration: durationAnim * 2, rotationY: -45, })
            .to('.doorR img', { duration: durationAnim * 2, rotationY: 45 }, "<")
            .to('.preloader-text2', { duration: durationAnim * 2, opacity: 1 }, "<")
            .to('#lightDoor1Top,#lightDoor1Bottom,#lightDoor2', { duration: durationAnim * 2, opacity: 0.6 }, "<")
            .to('#man', { duration: durationAnim * 2, y: -45, scale: 0.8 }, "<")
            .to('.preloader-text2', { duration: durationAnim * 2, opacity: 0 })

            .to('.doorL img', { duration: durationAnim * 2, rotationY: -75, })
            .to('.doorR img', { duration: durationAnim * 2, rotationY: 75 }, "<")
            .to('.preloader-text3', { duration: durationAnim * 2, opacity: 1 }, "<")
            .to('#lightDoor1Top,#lightDoor1Bottom,#lightDoor2', { duration: durationAnim * 2, opacity: 1 }, "<")
            .to('#man', { duration: durationAnim * 2, y: -65, scale: 0.7 }, "<")
            .to('.preloader-text3', { duration: durationAnim * 2, opacity: 0 }, ">+10.5")
            .addLabel('skip')

        let scrollDurSection = animTl.duration() * durationAnim
        ScrollTrigger.create({
            trigger: '.preloader',
            animation: animTl,
            start: "0% 0%",
            end: `bottom+=${scrollDurSection}px 100%`,
            pin: true,
            scrub: 1.5,
        })

        skipBtn.addEventListener("click", skipClick, false)
        skipBtn.addEventListener("mouseenter", forBtnPlay, false)
        skipBtn.addEventListener("mouseleave", forBtnPause, false)

        window.addEventListener('load', function () {
            animTl.reset();
        });

    })
})