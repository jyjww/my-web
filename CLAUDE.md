# CLAUDE.md

## Personal Portfolio Website Design Specification (v1.0)

# Project Vision

이 프로젝트는 **개발자 포트폴리오**가 아니다.

이 사이트의 목적은

> "장예지라는 사람이 어떻게 지금의 개발자가 되었는가"

를 하나의 이야기처럼 보여주는 것이다.

Resume를 읽는 느낌이 아니라,
한 권의 잡지(Magazine) 혹은 Journal을 읽는 경험을 목표로 한다.

사용자는 이 사이트를 둘러본 뒤

* 이 사람은 어떤 사람인지
* 무엇을 좋아하는지
* 왜 개발자가 되었는지
* 어떤 문제를 해결하는 사람인지

를 자연스럽게 이해해야 한다.

---

# Design Keywords

절대 화려하지 않다.

느낌은

* Apple
* MUJI
* Kinfolk
* Monocle Magazine
* Aesop
* Read.cv

를 적절히 섞는다.

### Personality

차분함

여백

감성

미니멀

따뜻함

조용한 사람

기록하는 사람

관찰하는 사람

---

# Color Palette

절대 채도가 높은 파란색 사용 금지.

## Background

#FAF9F6

## Primary Text

#222222

## Secondary Text

#5B6168

## Accent

#60758A

## Border

#E9E7E2

전체적으로 따뜻한 아이보리 기반.

---

# Typography

Heading

Cormorant Garamond

Body

Pretendard

Heading은 감성

Body는 가독성

---

# Website Structure

Home

Journey

Projects

Writing

Resume

---

# HOME

## Hero

첫 화면은

좌측

```
Hello,

I'm Yejee.
```

그 아래

```
I observe the world,

solve problems,

and build things

that make life easier.
```

그 아래

```
Developer

Traveler

Teacher

Wine Lover
```

우측

파리에서 찍은 큰 사진

(화면의 절반 이상)

절대 텍스트보다 사진이 작으면 안 된다.

Hero에서는
"개발자"보다
"사람"을 먼저 보여준다.

---

# SECTION 2

## Things I Love

제목

```
Things I Love
```

카드 형태.

예시

Travel

Wine

Photography

Reading

Cafe

Coding

Music

각 카드는

사진 하나

제목

작은 아이콘

Hover 효과

클릭 가능

---

# Travel

Travel을 누르면

새 페이지가 아니라

Travel Detail Page

---

상단

세계지도

Visited Countries 표시

예시

France

Australia

Japan

Korea

앞으로 계속 추가 가능하도록 구현.

지도의 마커를 누르면

아래 Gallery가 해당 도시로 변경된다.

---

좌측

Visited Cities

```
Paris

Sydney

Tokyo

Seoul
```

리스트

클릭 가능

---

우측

Instagram 스타일 Gallery

사진 Grid

2~3 columns

사진 클릭

→ Full Screen Viewer

Lightbox

---

사진 아래에는

짧은 글

예시

```
Paris taught me

to slow down

and observe.

The little details inspire me

in both life

and work.
```

절대 긴 글 금지.

한 도시당

2~4줄.

---

# Journey

About Me 대신

Journey

사용.

Timeline 형식.

예시

2014

University

↓

2020

Blizzard

↓

2022

KEC

↓

2023

Krafton Jungle

↓

2024~

Developer

Timeline은

스크롤 애니메이션.

---

Journey 하단에는

Education

Certificates

Languages

추가.

예시

Education

* Hanyang University

* Krafton Jungle

Certificates

* SQLD

* Information Processing Engineer

Languages

* Korean

* English

---

# Projects

여기가

개발 포트폴리오.

카드형.

예시

Recho

사진

Problem

Solution

Result

Tech Stack

Github

Demo

모든 프로젝트 동일 구조.

Result는 숫자를 강조.

예시

×5.6

80%

-90%

등.

---

# Writing

개발 블로그.

주제

Redis

Canvas API

React Native

FFmpeg

AWS

NestJS

카드 형태.

---

# Resume

HTML Resume

PDF Resume

둘 다 제공.

PDF는 바로 다운로드 가능.

---

# Desktop Layout

Hero

↓

Things I Love

↓

Journey

↓

Projects

↓

Writing

↓

Resume

↓

Footer

전체는

Magazine Layout

느낌.

여백을 충분히 사용.

---

# Mobile Layout

모바일은

PC 축소판이 아니다.

완전히 새롭게 구성한다.

순서

Hero

↓

Things I Love

↓

Journey

↓

Travel

↓

Projects

↓

Writing

↓

Resume

---

## Hero

사진 먼저.

전체 Width.

그 아래

```
Hello,

I'm Yejee.
```

그 아래

소개.

---

## Things I Love

2 columns

Card Grid

---

## Journey

Timeline

Vertical

---

## Travel

세계지도

↓

Visited Cities

↓

Instagram Gallery

↓

짧은 글

---

## Bottom Navigation

Home

Journey

Projects

Writing

Resume

Bottom Tab 형태.

---

# Motion

애니메이션은 최소.

사용

Fade

Slide Up

Scale

Hover

사용하지 말 것

Parallax

Particle

3D

Heavy Motion

Neon

---

# Image Style

모든 사진은

따뜻한 톤.

과도한 필터 금지.

실제 여행 사진 사용.

예정

Paris

Sydney

Cafe

Wine

Desk

Book

Nature

Coding

---

# UI Philosophy

사이트는

"나를 자랑하는 공간"

이 아니라

"나를 소개하는 공간"

이어야 한다.

프로젝트보다

사람이 먼저.

개발보다

이야기가 먼저.

기술보다

경험이 먼저.

사용자가

스크롤을 끝냈을 때

"이 사람과 함께 일하면 어떤 느낌일까?"

를 상상할 수 있어야 한다.

이것이 이 프로젝트의 가장 중요한 목표이다.
