/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2025 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict' // 엄격 모드 사용 (에러를 더 엄격하게 체크)

  // 1. 저장소 관련 함수
  // 로컬 스토리지에서 'theme'이라는 이름으로 저장된 값을 가져옵니다.
  const getStoredTheme = () => localStorage.getItem('theme')
  // 로컬 스토리지에 'theme'이라는 이름으로 사용자가 선택한 값을 저장합니다.
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  // 2. 우선순위 결정 함수 (무슨 테마를 보여줄까?)
  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme() // 일단 저장된 게 있는지 확인
    if (storedTheme) {
      return storedTheme // 저장된 게 있으면 그거 사용
    }

    // 저장된 게 없으면? 브라우저(OS)가 다크모드인지 확인해서 맞춤형으로 리턴
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // 3. 실제 HTML에 테마를 적용하는 함수
  const setTheme = theme => {
    if (theme === 'auto') {
      // 'auto'라면 다시 시스템 설정을 체크해서 적용
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      // 'light'나 'dark'라면 해당 값을 바로 HTML의 data-bs-theme 속성에 넣음
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  // 페이지가 로드될 때 바로 실행: 가장 적절한 테마를 찾아 적용함
  setTheme(getPreferredTheme())

  // 4. UI(버튼 상태) 업데이트 함수
  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme') // 테마 스위처 버튼 찾기

    if (!themeSwitcher) {
      return // 버튼 없으면 함수 종료
    }

    // 화면에 보이는 텍스트나 아이콘 요소를 찾음
    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    // 현재 선택된 테마와 일치하는 메뉴 항목(버튼)을 찾음
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    // 모든 버튼에서 'active' 클래스를 제거 (초기화)
    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    // 지금 선택한 버튼에만 'active' 추가 (활성화 표시)
    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    
    // 메인 아이콘을 선택한 테마의 아이콘으로 교체
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    
    // 웹 접근성(스크린 리더기 등)을 위한 라벨 업데이트
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus() // 필요 시 버튼에 포커스 이동
    }
  }

  // 5. 시스템 설정 변경 감지 리스너
  // 사용자가 윈도우/맥 설정을 '다크' <-> '라이트'로 바꿀 때 실시간으로 반응
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    // 단, 사용자가 직접 'light'나 'dark'를 고정해둔 상태가 아닐 때만 자동 변경
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  // 6. 페이지 로드 완료 후 실행될 이벤트
  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme()) // 현재 테마에 맞춰 버튼 UI 업데이트

    // 모든 테마 선택 버튼에 '클릭' 이벤트 추가
    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value') // 클릭한 버튼의 테마 값 가져오기
          setStoredTheme(theme) // 1. 저장소에 저장
          setTheme(theme)      // 2. HTML에 적용
          showActiveTheme(theme, true) // 3. 버튼 UI 업데이트
        })
      })
  })
})()