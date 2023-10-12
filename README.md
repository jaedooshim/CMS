# CMS - 콘텐츠 관리 시스템

## BackEnd - 심재두
## FrontEnd - 인한별

## # 프로젝트 소개
CMS (Content Management System)
<br> 
회원가입,로그인,인증,게시판 등 필요한 작업에 사용하기 위해서 간단한 수정을 통한 재사용성을 목적으로 진행

## Rest API

| Content              | Method     | Path             |
| -------------------- | ---------- |------------------|
| 로그인                   | `POST`     | /auth/login      |
| 소셜로그인-google         | `GET`      | /google/login    |
| 소셜로그인-google redirect| `GET`      | /google/redirect |
| 로그아웃                  | `POST`      | /auth/logout     |
| 회원가입                  | `POST`      | /users           |
| 회원탈퇴                  | `DELETE`      | /users           |
                      