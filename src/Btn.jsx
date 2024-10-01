//rfce : 선언적 함수 형태로 컴포넌트 생성

import React from 'react'

function BtnA() {
  return (
    <div className='BtnA'>Btn</div>;
  )
}


function BtnB() {
    return (
      <div className='BtnB'>Btn</div>;
    )
  }

//하나의 jsx파일에서 복수개의 컴포넌트 함수를 export가능
//함수가 2개인 경우는 default라고 쓰면 안된다
//함수는 객체이기때문에 복수요소를 열거형으로 묶을 수 있다

// export default Btn
export {BtnA, BtnB};