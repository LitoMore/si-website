import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'Puede estar bloqueado por un bloqueador de anuncios o no estar disponible temporalmente.',
		label: 'Apoya a Simple Icons',
		loading: 'Un pequeño espacio de apoyo',
		support:
			'Los anuncios ayudan a mantener Simple Icons. Gracias por tu comprensión.',
		unavailable: 'Aquí normalmente aparecería un anuncio',
	},
	footer: {
		iconMissing: '¿Falta un icono?',
		iconOutdated: '¿Icono desactualizado?',
		line1:
			'Un proyecto {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} mantenido por los {contribuidores de Simple Icons|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Usa {GitHub|https://github.com/simple-icons/simple-icons} para solicitudes, correcciones y contribuciones.',
		line3:
			'Amablemente apoyado por tus donaciones en {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Hecho con ❤️ en GitHub',
		reportOutdated: 'Informa de un icono desactualizado',
		submitRequest: 'Envía una petición',
	},
	header: {
		iconPreviewer: 'Generador de vista previa',
		openGraphGenerator: 'Generador de OpenGraph',
	},
	languageName: 'Español',
	modal: {
		aliases: 'Nombres alternativos',
		color: 'Color',
		copied: 'Se ha copiado {} al portapapeles',
		copy: 'Copiar {}',
		download: 'Descargar',
		guidelines: 'Guías de marca',
		license: 'Licencia',
		source: 'Fuente',
		sourceAndGuidelines: 'Fuente y directrices',
		svgColored: 'SVG coloreado',
		svgPath: 'Solo trazado',
		svgPlain: 'SVG monocromo',
		title: 'Marca',
	},
	openGraph: {
		apply: 'Aplicar cambios',
		canvas: 'Configuración del lienzo',
		clipboardUnavailable:
			'Este navegador no permite copiar imágenes. Descarga la imagen.',
		copied: 'Imagen copiada al portapapeles',
		copy: 'Copiar imagen',
		copyError:
			'No se pudo copiar la imagen. Revisa los permisos del portapapeles o descárgala.',
		description: 'Crea una imagen para compartir con Simple Icons.',
		download: 'Descargar {}',
		downloaded: 'Imagen descargada',
		export: 'Exportar imagen',
		exportError: 'No se pudo exportar la imagen. Inténtalo de nuevo.',
		exportHint:
			'Las descargas usan el tamaño original del lienzo. Las imágenes se copian como PNG.',
		format: 'Formato de archivo',
		gap: 'Separación',
		height: 'Altura',
		invalidSettings:
			'Usa dimensiones de 128–4096 px, iconos de 8–256 px y separaciones de 0–256 px. El icono con sus márgenes debe caber en el lienzo.',
		loadError: 'No se pudieron cargar los iconos. Inténtalo de nuevo.',
		loading: 'Cargando iconos…',
		originalSize: 'Exportación al tamaño original',
		preview: 'Vista previa',
		reset: 'Restablecer',
		retry: 'Reintentar',
		shuffleIcons: 'Ordenar aleatoriamente',
		size: 'Tamaño del icono',
		width: 'Anchura',
	},
	preview: {
		brand: 'Marca',
		centered: 'El icono debe estar centrado en (12, 12).',
		collinear: 'Elimina el segmento colineal redundante.',
		copyScreenshot: 'Copiar vista',
		downloadSvg: 'Descargar SVG',
		exportError: 'No se pudo exportar la imagen. Inténtalo de nuevo.',
		fix: 'Arreglar',
		invalidFile: 'Sube un archivo SVG que contenga un trazado.',
		invalidPath:
			'Introduce un trazado SVG válido con un tamaño distinto de cero.',
		loadError: 'No se pudieron cargar los iconos. Inténtalo de nuevo.',
		moreSuggestions: 'Más sugerencias',
		negativeZero: 'Sustituye el cero negativo por cero.',
		path: 'Trazado',
		precision: 'Usa un máximo de tres decimales.',
		savePreview: 'Guardar vista',
		show: 'Mostrar',
		size: 'El lado más largo del icono debe medir 24px.',
		uploadSvg: 'Cargar SVG',
	},
	search: {
		noIconsFound: 'No se encontraron iconos',
		searchByBrand: 'Buscar por marca...',
	},
	settings: {
		actual: 'Colores originales',
		actualTooltip:
			'Muestra los colores originales de los iconos. Algunos pueden ser difíciles de distinguir.',
		contrast: 'Contraste',
		contrastTooltip:
			'Aplica un filtro de contraste para mejorar la visibilidad de los iconos.',
		language: 'Cambiar idioma',
		reset: 'Restablecer',
		themeAuto: 'Tema de color del sistema',
		themeDark: 'Tema oscuro',
		themeLight: 'Tema claro',
		zoom: 'Zoom',
	},
	share: {
		actionIntentText: 'Simple Icons: {} iconos SVG para marcas populares',
		share: 'Comparte esto',
		yourMastodonInstance: 'Tu instancia de Mastodon',
	},
	thirdParties: {
		extensions: 'Extensiones',
		libraries: 'Bibliotecas',
	},
};

export default translation;
