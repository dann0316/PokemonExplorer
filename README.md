# React + TypeScript + Vite
# 포켓몬 Explorer

* 주요 개선 사항: react-query 사용해 중복 요청, 캐싱 필요한 훅에 적용

포켓몬 종과 포켓몬의 정보를 시각적으로 탐색할 수 있는 React기반 웹 앱
PokeAPI를 기반으로 정보를 가져왔으며, Breadcrumb 탐색 구조와 타입별 분류 UI 제공


- 배포 URL: https://elnidapokemonexplorer.netlify.app/


- 기술 스택 : React, Typescript, Vite, Tailwind Css, Axios, PokeAPI


# 아키텍쳐 및 폴더 구조:

> 레이어드 아키텍쳐 (Layered Architecure)

: 역할별로 layer로 분리하여 각 layer의 관심사를 분리하여 유지보수성과 확장성을 높임

> 폴더 구조

src/

├── components/        # 공통 UI 컴포넌트 (Breadcrumb, LoadingUI 등)

├── hooks/             # 커스텀 훅 모음

├── pages/             # 라우트 기반 페이지 컴포넌트

├── types/             # 타입 선언 파일

├── route.tsx          # 라우트 구조를 따로 만들어 놓은 파일

└── main.tsx           # 앱 진입점


# 설계 설명:

> 로직과 뷰 분리

: 데이터 fetch, 상태, 로직은 모두 hooks 폴더에 커스텀 훅으로 분리하여 추상화하고, 화면 UI와 기본적인 값 변경만 .tsx 컴포넌트에서 정의

> 컴포넌트 재사용성

: 만들다보니 Species List 페이지와 Pokemon List 페이지가 비슷하고, Overview 페이지와 Detail 페이지가 비슷하여 CommonListPage, CommonOverviewPage로 전용 공통 컴포넌트를 구성해 중복 제거

> Breadcrumb 구성

: route 파일에 따라 url과 라우트가 동작하며 사용자 위치 추적 가능


# 추가 구성 및 리팩토링

> 데스크탑, 태블릿, 모바일 환경에서도 보기 편하게 반응형으로 구성

> 특히 모바일 환경에서 Breadcrumb가 길어지는 것을 보완하기 위해 화면 보다 길어지면 해당 영역에만 가로 스크롤

> speciesList 페이지에서 offset과 limit을 활용하여 pagination

> pagination으로 인해 페이지가 길어졌을 때를 대비하여 scrollTop 버튼으로 한번에 페이지 제일 위로 이동 (behavior: smooth)

> 데이터 로딩 혹은 화면 로딩을 대비한 Loading UI 및 isLoading

> 내부 Breadcrumb 뿐만 아니라 header에 넣을 수 있는 Breadcrumb 훅을 따로 만듦


# 어려웠던 점과 해결 방법

> URL 기반 Breadcrumb 구성이 까다로웠음

: 동적 라우트처럼 URL이 복잡해지면서 Breadcrumb에서 id를 이름을 출력하는 것 -> useName, usePokemonListData 등의 커스텀 훅을 따로 만들고, fallback처리로 validation

> 전역 vs 독립 Breadcrumb 구조

: 각 라우트 페이지(PokemonList, SpeciesList, PokemonDetail 등) 내부에서 Breadcrumb 배열을 명시적으로 선언

필요한 정보(speciesName, pokemonName 등)를 각 컴포넌트 내에서 fetch하여 Breadcrumb에 직접 전달

전역 컴포넌트가 아닌 "각 라우트가 자신의 위치와 데이터에 맞는 Breadcrumb을 렌더링"하는 구조로 리팩터링

# 느낀 점/한계점

: 이번 프로젝트를 하면서 추상화와 디자인 패턴 그리고 React 다운 구성, 개발 방식에 대해서 깊이 고민할 수 있었습니다.

Ux적인 감각이나 사용자 흐름에 대한 부분은 생활 속에 자연스럽게 쌓은 경험으로 어느 정도 감이 있었지만, 막상 개발을 진행하면서 디자인 패턴과 React적으로
더 나은 구조가 어떤 모습인가에 대해 많은 고민을 하며 수정과 리팩토링을 진행했습니다.

처음에는 전역 상태나 전역 Breadcrumb 처럼 단순하게 구조를 짰지만, 진행 과정에서 각 라우트의 독립성, 커스텀 훅의 책임 분리, API 요청 최적화 등 '어떻게 설계하면 더
명확하고 유지보수하기 좋을지'에 대한 방향으로 구조를 개선했습니다.

마지막으로, 구현과 리팩토링을 반복하는 과정에서 기능을 만들어내는 것 외에 더 나은 구조를 고민하고 적용하는 데에서 성장하는 것 같아 재미있었습니다.

아직 배워야할 점이 많지만, 이번 프로젝트를 통해 유지보수성과 확장성을 고려한 개발이 중요하다는 것을 느꼈고, 구조적 설계와 사용자 중심의 개발 역량을 강화해 나가고자 합니다.