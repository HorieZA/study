const a = true;
const b = false;

// 내보내기 위한 함수 
// exports.a;

// 단, 내보내기위해서면 module 이라는 함수를 입력 하여 아래와 같이 입력해야함
// module.exports = { a };

// 다중으로 보내기
module.exports = { a, b };
