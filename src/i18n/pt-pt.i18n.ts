import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'O anúncio pode estar bloqueado ou temporariamente indisponível.',
		label: 'Apoiar o Simple Icons',
		loading: 'Um pequeno espaço de apoio',
		support:
			'Os anúncios ajudam a apoiar o Simple Icons. Obrigado pela compreensão.',
		unavailable: 'Normalmente apareceria aqui um anúncio',
	},
	footer: {
		iconMissing: 'Ícone ausente?',
		iconOutdated: 'Ícone desatualizado?',
		line1:
			'Um projeto {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} mantido pelo {contribuidores do Simple Icons|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Use {GitHub|https://github.com/simple-icons/simple-icons} para solicitações, correções e contribuições.',
		line3:
			'Gentilmente apoiado por suas doações em {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Feito com ❤️ no GitHub',
		reportOutdated: 'Ícone de relatório desatualizado',
		submitRequest: 'Envie uma solicitação',
	},
	header: {
		iconPreviewer: 'Gerador de visualização',
		openGraphGenerator: 'Gerador de OpenGraph',
	},
	languageName: 'Português',
	modal: {
		aliases: 'Nomes alternativos',
		color: 'Cor',
		copied: '{} copiado para a área de transferência',
		copy: 'Copiar {}',
		download: 'Baixar',
		guidelines: 'Guias da marca',
		license: 'Licença',
		source: 'Origem',
		sourceAndGuidelines: 'Origem e diretrizes',
		svgColored: 'SVG colorido',
		svgPath: 'Apenas caminho',
		svgPlain: 'SVG monocromático',
		title: 'Marca',
	},
	openGraph: {
		apply: 'Aplicar alterações',
		canvas: 'Definições da tela',
		clipboardUnavailable:
			'Este navegador não permite copiar imagens. Transfira a imagem.',
		copied: 'Imagem copiada para a área de transferência',
		copy: 'Copiar imagem',
		copyError:
			'Não foi possível copiar a imagem. Verifique as permissões da área de transferência ou transfira a imagem.',
		description: 'Crie uma imagem para partilhar com o Simple Icons.',
		download: 'Baixar {}',
		downloaded: 'Imagem transferida',
		export: 'Exportar imagem',
		exportError: 'Não foi possível exportar a imagem. Tente novamente.',
		exportHint:
			'As transferências usam o tamanho original da tela. As imagens são copiadas como PNG.',
		format: 'Formato do ficheiro',
		gap: 'Espaçamento',
		height: 'Altura',
		invalidSettings:
			'Utilize dimensões de 128–4096 px, ícones de 8–256 px e espaçamentos de 0–256 px. O ícone com as suas margens deve caber na tela.',
		loadError: 'Não foi possível carregar os ícones. Tente novamente.',
		loading: 'A carregar ícones…',
		originalSize: 'Exportação no tamanho original',
		preview: 'Pré-visualização',
		reset: 'Repor',
		retry: 'Tentar novamente',
		shuffleIcons: 'Classificar aleatoriamente',
		size: 'Tamanho dos ícones',
		width: 'Largura',
	},
	preview: {
		brand: 'Marca',
		centered: 'O ícone deve estar centrado em (12, 12).',
		collinear: 'Remova o segmento colinear redundante.',
		copyScreenshot: 'Copiar visualização',
		downloadSvg: 'Baixar SVG',
		exportError: 'Não foi possível exportar a imagem. Tente novamente.',
		fix: 'Corrigir',
		invalidFile: 'Carregue um ficheiro SVG que contenha um caminho.',
		invalidPath:
			'Introduza um caminho SVG válido com tamanho diferente de zero.',
		loadError: 'Não foi possível carregar os ícones. Tente novamente.',
		moreSuggestions: 'Mais sugestões',
		negativeZero: 'Substitua o zero negativo por zero.',
		path: 'Caminho',
		precision: 'Utilize no máximo três casas decimais.',
		savePreview: 'Salvar visualização',
		show: 'Mostrar',
		size: 'O lado mais comprido do ícone deve medir 24px.',
		uploadSvg: 'Carregar SVG',
	},
	search: {
		noIconsFound: 'Não foram encontrados ícones',
		searchByBrand: 'Pesquisar por marca...',
	},
	settings: {
		actual: 'Cores originais',
		actualTooltip:
			'Mostra as cores originais dos ícones. Alguns podem ser difíceis de distinguir.',
		contrast: 'Contraste',
		contrastTooltip:
			'Aplica um filtro de contraste para melhorar a visibilidade dos ícones.',
		language: 'Mudar idioma',
		reset: 'Repor',
		themeAuto: 'Esquema de cores do sistema',
		themeDark: 'Esquema de cores escuras',
		themeLight: 'Esquema de cores claras',
		zoom: 'Zoom',
	},
	share: {
		actionIntentText: 'Simple Icons: {} ícones SVG para marcas populares',
		share: 'Compartilhe isso',
		yourMastodonInstance: 'A sua instância Mastodon',
	},
	thirdParties: {
		extensions: 'Extensões',
		libraries: 'Bibliotecas',
	},
};

export default translation;
