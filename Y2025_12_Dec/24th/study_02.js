var state = false;
let css = 0;
let z = 0;
// jquery를 쓰기위한 설정
function a() {
    console.log("a");
}
// 콜백 함수 () {}
// function (){}
function fn() {
    // jquery
    console.log("fn() 콜백 함수");
}
// 애로우 함수 () => {}
const fn2 = () => { }

$(() => {
    // 드디어 jquery 영역!!
    console.log("애로우 함수 study_02.js");
    function b() {
        console.log("b()");
    }
});

$(function () {
    console.log("콜백 함수 study_02.js");
});

$(fn);

$(document).ready(() => {
    // 드디어 jquery 영역!!
    console.log("$(document).ready(); study_02.js");
    function view01() {
        const k = 25;
        var html = "";

        for (let i = 0; i < k; i++) {
            css = 1;
            if (i % 2 === 0) css = 2
            html += `<div class="bg${css}"></div>`;
        }

        $("section").html(html);
        state = true;
    }
    // 임의 영역 그리기
    function view02(css) {
        const k = 25;
        var html = "";
        // let css = 6; => 상단에 선언해주었음

        for (let i = 0; i < k; i++) {
            let z = 1;
            if (i % 2 === 0) z = 2
            if (i === css) z = 3
            html += `<div class="bg${z}"></div>`;
        }

        $("section").html(html);
        state = true;
    }
    // 순차 그리기 베이스
    function view03(css) {
        const k = 25;
        var html = "";
        // let css = 1; => 상단에 선언해주었음
        // if (css >= 5 && css <= -1) {
        //     console.log(`값이 ${css}라 불가능합니다.`);
        // } else {
        //     for (let i = 0; i < k; i++) {
        //         if (css === 4 || css === 0) css = 1;
        //         html += `<div class="bg${css++}"></div>`;
        //     }

        //     $("section").html(html);
        //     state = true;
        // }
        for (let i = 0; i < k; i++) {
            if (css > 3 || css < 1) css = 1;
            html += `<div class="bg${css++}"></div>`;
        }

        $("section").html(html);
        state = true;
    }
    // jquery 기능으로만 구현
    // $("button").click(function (e) {
    //     console.log(e.target);
    //     const index = $("button").index(e.target);
    //     if (index === 0) view01();
    // });
    $("button").off().on("click", function (e) {
        console.log(e);
        const index = $("button").index(e.target);
        if (index === 0) {
            view01();
        } else if (index === 1) {
            $("section").empty();
            state = false;
        } else if (index === 2) {
            if (!state) {
                view01();
                console.log("view01()");
            } else {
                $("section").empty();
                state = false;
            }
        } else if (index === 3) {
            view02(6);
        } else if (index === 4) {
            view03(3);
        } else if (index === 5) {
            view03(2);
        } else if (index === 6) {
            view03(1);
        }
    });
});