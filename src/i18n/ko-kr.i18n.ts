import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'광고 차단기에 의해 차단되었거나 일시적으로 사용할 수 없습니다.',
		label: 'Simple Icons 후원하기',
		loading: '후원을 위한 작은 공간',
		support:
			'광고는 Simple Icons 운영에 도움이 됩니다. 이해해 주셔서 감사합니다.',
		unavailable: '여기에는 보통 광고가 표시됩니다',
	},
	footer: {
		iconMissing: '아이콘이 없나요?',
		iconOutdated: '아이콘이 최신이 아닌가요?',
		line1:
			'{Simple Icons 기여자|https://github.com/simple-icons/simple-icons/graphs/contributors} 가 관리하는 {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} 프로젝트입니다.',
		line2:
			'{GitHub|https://github.com/simple-icons/simple-icons}를 통해 요청, 수정, 또는 기여할 수 있습니다.',
		line3:
			'{Open Collective|https://opencollective.com/simple-icons}를 통한 여러분의 기부로 운영됩니다.',
		madeWithLove: 'GitHub에서 ❤️으로 제작',
		reportOutdated: '구버전 아이콘 제보하기',
		submitRequest: '요청하기',
	},
	header: {
		iconPreviewer: '미리보기 생성기',
		openGraphGenerator: 'OpenGraph 생성기',
	},
	languageName: '한국어',
	modal: {
		aliases: '다른 이름',
		color: '색상',
		copied: '{} 클립보드에 복사됨',
		copy: '{} 복사',
		download: '다운로드',
		guidelines: '브랜드 가이드라인',
		license: '라이센스',
		source: '출처',
		sourceAndGuidelines: '출처 및 가이드라인',
		svgColored: '컬러 SVG',
		svgPath: '경로만',
		svgPlain: '단색 SVG',
		title: '브랜드',
	},
	openGraph: {
		apply: '변경 사항 적용',
		canvas: '캔버스 설정',
		clipboardUnavailable:
			'이 브라우저에서는 이미지를 복사할 수 없습니다. 이미지를 다운로드하세요.',
		copied: '이미지가 클립보드에 복사되었습니다',
		copy: '이미지 복사',
		copyError:
			'이미지를 복사하지 못했습니다. 클립보드 권한을 확인하거나 다운로드하세요.',
		description: 'Simple Icons로 공유할 이미지를 만드세요.',
		download: '{} 다운로드',
		downloaded: '이미지가 다운로드되었습니다',
		export: '이미지 내보내기',
		exportError: '이미지를 내보내지 못했습니다. 다시 시도하세요.',
		exportHint: '원본 캔버스 크기로 다운로드합니다. 이미지는 PNG로 복사됩니다.',
		format: '파일 형식',
		gap: '간격',
		height: '높이',
		invalidSettings:
			'캔버스 크기는 128–4096 px, 아이콘은 8–256 px, 간격은 0–256 px로 설정하세요. 아이콘과 여백이 캔버스 안에 들어가야 합니다.',
		loadError: '아이콘을 불러오지 못했습니다. 다시 시도하세요.',
		loading: '아이콘 불러오는 중…',
		originalSize: '원본 크기로 내보내기',
		preview: '미리보기',
		reset: '초기화',
		retry: '다시 시도',
		shuffleIcons: '무작위로 정렬',
		size: '아이콘 크기',
		width: '너비',
	},
	preview: {
		brand: '브랜드',
		centered: '아이콘은 (12, 12)를 중심으로 배치해야 합니다.',
		collinear: '같은 직선 위의 불필요한 선분을 제거하세요.',
		copyScreenshot: '미리보기 복사',
		downloadSvg: 'SVG 다운로드',
		exportError: '이미지를 내보내지 못했습니다. 다시 시도하세요.',
		fix: '수정',
		invalidFile: '경로가 포함된 SVG 파일을 업로드하세요.',
		invalidPath: '크기가 0이 아닌 유효한 SVG 경로를 입력하세요.',
		loadError: '아이콘을 불러오지 못했습니다. 다시 시도하세요.',
		moreSuggestions: '더 많은 제안',
		negativeZero: '음수 0을 0으로 바꾸세요.',
		path: '경로',
		precision: '소수점 이하 세 자리까지만 사용하세요.',
		savePreview: '미리보기 저장',
		show: '보기',
		size: '아이콘의 가장 긴 변은 24px이어야 합니다.',
		uploadSvg: 'SVG 업로드',
	},
	search: {
		noIconsFound: '아이콘을 찾을 수 없습니다',
		searchByBrand: '브랜드로 검색...',
	},
	settings: {
		actual: '원본 색상',
		actualTooltip:
			'아이콘의 원래 색상을 표시합니다. 일부 아이콘은 잘 보이지 않을 수 있습니다.',
		contrast: '대비',
		contrastTooltip: '아이콘이 잘 보이도록 대비 필터를 적용합니다.',
		language: '언어 변경',
		reset: '초기화',
		themeAuto: '시스템 색 구성',
		themeDark: '어두운 색 구성',
		themeLight: '밝은 색 구성',
		zoom: '확대/축소',
	},
	share: {
		actionIntentText: 'Simple Icons: {}개의 유명 브랜드를 위한 SVG 아이콘',
		share: '공유하기',
		yourMastodonInstance: 'Mastodon 인스턴스',
	},
	thirdParties: {
		extensions: '확장',
		libraries: '라이브러리',
	},
};

export default translation;
