![image](https://user-images.githubusercontent.com/101778169/234525035-73c7f3d0-146e-4919-badc-35285224a5e6.png)

# 짝발란스 FC Web Site

## ⚽️ 목표 ❓ 짝발란스 FC의 온라인 교류를 활성화 시켜보자!

## Version 2 ✨

## 🛠 기술 스택 🛠

<p align="left">
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=React Query&logoColor=white"/>
<img src="https://img.shields.io/badge/styled-components-DB7093?style=flat&logo=styled-components&logoColor=white"/>
</p>
<p align="left">
<img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white"/> 
</p>

<p align="left">
<img src="https://img.shields.io/badge/MariaDB-003545?style=flat&logo=MariaDB&logoColor=white"/>  
</p>
<p align="left">
<a href="https://velog.io/@tkdgk1996 "><img src="https://img.shields.io/badge/Tech%20Blog-11B48A?style=flat-square&logo=Vimeo&logoColor=white&link=https://velog.io/@tkdgk1996 "/>link!</a>
</p>

## Version1 대비 개선점 🆙

- 로그인: JWT 사용 보안을 높임
- data fetching: react-query를 사용해 API 호출 감소 [link](https://velog.io/@tkdgk1996/%EC%A7%9D%EB%B0%9C%EB%9E%80%EC%8A%A4-%EA%B3%A0%EB%8F%84%E)
 무한스크롤 (useInfiniteQuery 사용)을 통해 게시판 페이지 초기 로딩 속도를 개선 [link](https://velog.io/@tkdgk1996/%EC%A7%9D%EB%B0%9C%EB%9E%80%EC%8A%A4-%EA%B3%A0%EB%8F%84%ED%99%94-%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4-useInfiniteQuery)
- code splitting: Lazy-loading을 사용해 초기 로딩 속도를 개선 [link](https://velog.io/@tkdgk1996/Lieto-Lazy-Loading-React.Lazy-Suspense)
- 기존 Recoil을 통해 theme를 변경했던 코드를 Context API로 변경
- 디렉토리 구조를 변경(공통컴포넌트, custom Hook, api등)하여 반복되는 코드를 모듈화[link](https://velog.io/@tkdgk1996/%EC%A7%9D%EB%B0%9C%EB%9E%80%EC%8A%A4-%EA%B3%A0%EB%8F%84%ED%99%94-%EC%A4%91%EA%B0%84-%EB%A6%AC%ED%8E%99%ED%86%A0%EB%A7%81-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EA%B5%AC%EC%A1%B0-%EB%B3%80%EA%B2%BD)
- react-hook-form을 사용하여 join 코드 40% 감소 [link](https://velog.io/@tkdgk1996/%EC%A7%9D%EB%B0%9C%EB%9E%80%EC%8A%A4-%EA%B3%A0%EB%8F%84%ED%99%94-react-hook-form)
- [짝발란스 개발 과정](https://velog.io/@tkdgk1996/series/%ED%92%8B%EC%82%B4-%EB%8F%99%ED%98%B8%ED%9A%8C-SNS-%ED%94%8C%EB%9E%AB%ED%8F%BC-%EA%B0%9C%EB%B0%9C%EA%B8%B0)
- [짝발란스 고도화](https://velog.io/@tkdgk1996/posts?tag=%EA%B3%A0%EB%8F%84%ED%99%94)

## 기능목록

<center>
 <h2 align="center">로그인 및 회원가입 🔑</h2> 
</center>

<div align="center">
<h4>🏃 jwt를 통해 인증/인가</h4>
<h4>🏃 react-hook-form을 사용해 타당성 검증 및 입력받기</h4>
<h4>🏃 axios isntance를 통해 jwt 송신</h4>
</div>
 
<br/>

<img width="1413" alt="스크린샷 2024-04-22 오후 8 45 36" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/2ea7120a-db81-4824-88ce-09f0e19ed092">
<img width="1404" alt="스크린샷 2024-04-22 오후 8 47 40" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/a593a349-58d7-4a07-a7b4-e67e0b25d487">
<img width="1399" alt="스크린샷 2024-04-22 오후 8 49 11" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/29ea2713-3e58-4cb2-b185-e5df6a8d669c">
<img width="1382" alt="스크린샷 2024-04-22 오후 8 49 25" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/bffc87de-16f8-4055-b9a2-4039d95cd6e0">

<br/>

<center>
 <h2 align="center">게시판📋</h2> 
</center>

<div align="center">
<h4>🏃 파일 업로드 가능한 게시판</h4>
<h4>🏃 댓글 기능 제공</h4>
<h4>🏃 썸네일 기능 제공</h4>
<h4>🏃 무한 스크롤 적용</h4>
<h4>🏃 반응형으로 작성</h4>
<h4>🏃 react-query를 통해 fetching</h4>
</div>
<br/>
<img width="1384" alt="스크린샷 2024-04-22 오후 8 51 44" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/7ee42d3a-a41d-446f-8176-3b52b932f207">
<img width="1361" alt="스크린샷 2024-04-22 오후 8 51 56" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/de324ee8-1522-4f32-a18a-c5b983dc783d">
<img width="1364" alt="스크린샷 2024-04-22 오후 8 52 10" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/be77b929-60ab-4f52-970c-d2b13f764968">
<img width="1390" alt="스크린샷 2024-04-22 오후 8 52 36" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/74b5a8ad-36e5-43cd-b6d5-3745a6b39fb6">
<br/>

<center>
 <h2 align="center">선수정보 ⚽️</h2> 
</center>

<div align="center">
<h4>🏃 개인 정보를 알림</h4>
<h4>🏃 반응형으로 작성</h4>
</div>

<br/>
<img width="1381" alt="스크린샷 2024-04-22 오후 8 50 42" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/d069c514-309b-4894-8fe9-66c4623f5d33">

<center>
 <h2 align="center">경기 일정 스케줄링 📅</h2> 
</center>


<div align="center">
<h4>🏃 사용자들이 달력 UI를 통해 원하는 일정에 경기 일정 생성/수정/삭제</h4>
<h4>🏃 react-query를 통해 fetching</h4>
 </div>
 
<br/>
<p align="center">
<img width="1390" alt="스크린샷 2024-04-22 오후 8 53 17" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/4c1666af-1a1d-4ee6-8fbe-3fa1ddf4e223">
<img width="312" alt="스크린샷 2024-04-22 오후 8 53 32" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/f5c2ea66-ac1b-4481-b9b4-923fe6243d1d">
<img width="287" alt="스크린샷 2024-04-22 오후 8 53 44" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/cadd583a-1088-4238-8999-da16d1ffc5a4">
</p>
<br/>

<center>
 <h2 align="center">경기 피드백 ☕️</h2> 
</center>

<div align="center">
<h4>🏃 경기 일정 스케줄링 데이터를 기반으로 경기를 피드백함</h4>
<h4>🏃 mvp, 평점, 경기별 순위 정보 제공</h4>
 </div>
<br/>
<p align="center">
<img width="1418" alt="스크린샷 2024-04-22 오후 8 54 05" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/2d71d4ab-334d-4a91-a002-6ae2096a0a60">
<img width="461" alt="스크린샷 2024-04-22 오후 8 54 17" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/e7064d9c-d83c-4c6a-9f99-46fd8e3a4a08">
<img width="324" alt="스크린샷 2024-04-22 오후 8 54 30" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/338c216b-0eea-409c-a749-295c3640c059">
<img width="835" alt="스크린샷 2024-04-22 오후 8 55 06" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/0a036a5a-4deb-49e3-a42c-ee8dc420503b">
</p>
<br/>

<center>
 <h2 align="center">최신 축구 뉴스 🗞️</h2> 
</center>

 <div align="center">
<h4>🏃 최신 뉴스 제공 (더미 데이터)</h4>
<h4>🏃 Swiper를 통해 UI 개선</h4>
  </div> 
<br/>
<img width="1398" alt="스크린샷 2024-04-22 오후 8 49 57" src="https://github.com/updownpark2/JBFC_Site/assets/101778169/e9b49edd-61e8-443d-8784-a709cef3dcac">


<h2>Version1</h2>

## 기능목록

### 📌 로그인 및 회원가입

<li>회원가입 및 로그인 기능을 통해 회원을 관리 </li>
<li>중복검사를 통해 타당성 검증 </li>
<li>로그인 했을 때 해당 페이지를 보여주자 </li>

### 📌 날씨, 미세먼저 정보 제공 서비스

<li>날씨 정보를 제공하여 풋살하기 좋은 날을 선정할 수 있도록 하자 </li>
<li>미세먼지 정보를 제공하여 풋살하기 좋은 대기 상태를 점검하자  </li>
<li>ApexChart를 이용하여 수치를 그래프로 한 눈에 볼 수 있도록 하자</li>
<li>현재 위치 정보를 가져와 현재 위치에 해당하는 정보를 가져오자 </li>

### 📌 게시판 기능 서비스

<li>게시판 기능을 제공하여 회원들 간 생각과 글을 정리하자 </li>
<li>게시판에 댓글을 달 수 있도록 하여 회원간 쌍방향 소통을 서비스하자  </li>
<li>게시글과 댓글에 삭제기능을 서비스하자 </li>
<li>게시판의 카테고리를 나누어 한눈에 정리 된 게시판을 서비스하자</li>

### 📌 채팅 기능 서비스

<li>회원들간 실시간 소통이 가능하게 하자 </li>
<li>채팅방 두 개를 개설하여 매칭 및 공지방, 수다방을 구분하자</li>

## 🛠 기술 스택 🛠

<p align="center">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white"/>
</p>
<p align="center">
<img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white"/> 
<img src="https://img.shields.io/badge/Socket.io-010101?style=flat&logo=Socket.io&logoColor=white"/>
</p>
<p align="center">
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
 <img src="https://img.shields.io/badge/Recoil-61DAFB?style=flat&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=React Query&logoColor=white"/>
<img src="https://img.shields.io/badge/styled-components-DB7093?style=flat&logo=styled-components&logoColor=white"/>
</p>
<p align="center">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=MongoDB&logoColor=white"/>  
</p>
<p align="center"> 
<img src="https://img.shields.io/badge/amazonec2-FF9900?style=flat&logo=amazonec2&logoColor=white"/>  
<img src="https://img.shields.io/badge/vercel-000000?style=flat&logo=vercel&logoColor=white"/>  
</p>
<p align="center">
<a href="https://velog.io/@tkdgk1996 "><img src="https://img.shields.io/badge/Tech%20Blog-11B48A?style=flat-square&logo=Vimeo&logoColor=white&link=https://velog.io/@tkdgk1996 "/></a>
</p>

## 화면 구성 🗃

### 로그인 및 회원가입

<p align="left">

<img src=https://user-images.githubusercontent.com/101778169/234798311-5bc1494d-e6e5-4742-bfa4-75271ebeabf6.png  width="500" height="300"/>
<img src=https://user-images.githubusercontent.com/101778169/234798323-9f546ea7-c1e3-4ec4-be35-194f5c050b7c.png  width="500" height="300"/>
</p>

### 홈 화면

<p align="left">

<img src=https://user-images.githubusercontent.com/101778169/234798739-52deb849-359a-4029-9cda-f8652985719c.png  width="500" height="300"/>
</p>
<hr/>

### 날씨 및 미세먼지

<p align="left">

<img src=https://user-images.githubusercontent.com/101778169/234798588-a869db9c-29db-4b46-92aa-27437c90e348.png  width="500" height="300"/>
<img src=https://user-images.githubusercontent.com/101778169/235046210-7ca33693-4861-4442-8b74-ad1104caaace.png  width="500" height="300"/>

</p>

<hr/>

### 게시판

<p align="left">
<img src=https://user-images.githubusercontent.com/101778169/234798637-3099173f-7c60-48a9-900b-cd4405c9ee58.png  width="500" height="300"/>
</p>

<hr/>

### 채팅

<p align="left">

<img src=https://user-images.githubusercontent.com/101778169/234798703-c5693227-40f9-427b-bdca-a47ca2d44ba0.png  width="500" height="300"/>
</p>

<hr/>

## 배포된 웹 사이트

<h3>짝발란스 FC</h3>
 <a href="https://jbfc-site-f6eyczp6t-updownpark2.vercel.app/"><img src=https://user-images.githubusercontent.com/101778169/234801493-2983ef85-6cb2-435e-b64a-580ff3e7cae2.PNG width="100" height="100"/></a>

 <hr/>






<h3>조개소년의 Velog</h3>
<a href="https://velog.io/@tkdgk1996 "><img src=https://img.shields.io/badge/Tech%20Blog-11B48A?style=flat-square&logo=Vimeo&logoColor=white&link=https://velog.io/@tkdgk1996 width="180" height="100" /></a>


