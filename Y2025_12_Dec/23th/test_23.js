// 파스칼 출력
let H = 5;
for(let i=0;i<H;i++) {
    let print = "";
    let num = 1;
    for(let s=0;s<H-i-1;s++) {
        print+=" ";
    }
    for(let j=0;j<=i;j++) {
        print+=num;
        num=num*(i-j)/(j+1);
    }
    console.log(print);
}

let Hs = 5;
const cnt=Hs-1;
for(let i=0; i <= 2*Hs-1; i++) {
    let prit = "";
    let num = 1;
    for(let j=0; j <= 2*Hs-1; j++) {
        if(Math.abs(i-cnt)+Math.abs(j-cnt) <= cnt) {
            prit+=num;
            num=num*(i-j)/(j+1);
        } else {
            prit+=" ";
        }
    }
    console.log(prit);
}
//마름모 출력
// const h=3;
// let a="";
// for(let i=1;i<=h;i++) {
//     a="";
//     for(let j=0;j<h-i;j++) {
//         a+=" ";
//     }
//     for(let k=0;k<2*i-1;k++) {
//         a+="◆"
//     }
//     console.log(a);
// }
// 역순영역
// for(let i=h-1;i=>1;i--){
//     a="";
    
//     console.log(a);

// }
const n = 3;
const center=n-1;
let a = "";
for(let i=0; i <= 2*n-1; i++) {
    a="";
    for(let j=0; j <= 2*n-1; j++) {
        if(Math.abs(i-center)+Math.abs(j-center) <= center) {
            a+="◆";
        } else {
            a+=" ";
        }
    }
    console.log(a);
}

let l = 5;
let cent = (l-1)/2;
let txt = "";
let x = "";
let y = "";

for(let i=0; i < l; i++) {
    txt = "";
    for(let j=0; j < l; j++) {
        x = Math.abs(i-cent);
        y = Math.abs(j-cent);
        if(x+y<=cent) {
            txt+="◆";
        } else { 
            txt+=" ";
        }
    }
    console.log(txt);
}