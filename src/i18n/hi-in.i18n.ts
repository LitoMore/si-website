import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'विज्ञापन अवरोधक इसे रोक सकता है या यह अस्थायी रूप से अनुपलब्ध हो सकता है।',
		label: 'Simple Icons का समर्थन करें',
		loading: 'सहयोग के लिए थोड़ी सी जगह',
		support: 'विज्ञापन Simple Icons को सहयोग देते हैं। समझने के लिए धन्यवाद।',
		unavailable: 'यहाँ सामान्यतः एक विज्ञापन होता है',
	},
	footer: {
		iconMissing: 'आइकन गायब है?',
		iconOutdated: 'आइकन पुराना है?',
		line1:
			'{Simple Icons योगदानकर्ता|https://github.com/simple-icons/simple-icons/graphs/contributors} द्वारा बनाए रखा गया {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} प्रोजेक्ट।',
		line2:
			'अनुरोध, सुधार और योगदान के लिए {GitHub|https://github.com/simple-icons/simple-icons} का उपयोग करें।',
		line3:
			'{Open Collective|https://opencollective.com/simple-icons} पर आपके दान से कृपापूर्वक समर्थित।',
		madeWithLove: 'GitHub पर ❤️ के साथ बनाया गया',
		reportOutdated: 'पुराने आइकन की रिपोर्ट करें',
		submitRequest: 'अनुरोध भेजें',
	},
	header: {
		iconPreviewer: 'पूर्वावलोकन जेनरेटर',
		openGraphGenerator: 'OpenGraph जनरेटर',
	},
	languageName: 'हिन्दी',
	modal: {
		aliases: 'वैकल्पिक नाम',
		color: 'रंग',
		copied: '{} क्लिपबोर्ड पर कॉपी किया गया',
		copy: '{} कॉपी करें',
		download: 'डाउनलोड करें',
		guidelines: 'ब्रांड दिशानिर्देश',
		license: 'लाइसेंस',
		source: 'स्रोत',
		sourceAndGuidelines: 'स्रोत और दिशानिर्देश',
		svgColored: 'रंगीन SVG',
		svgPath: 'केवल पथ',
		svgPlain: 'एकरंगी SVG',
		title: 'ब्रांड',
	},
	openGraph: {
		apply: 'बदलाव लागू करें',
		canvas: 'कैनवास सेटिंग',
		clipboardUnavailable:
			'इस ब्राउज़र में चित्र कॉपी करना उपलब्ध नहीं है। चित्र डाउनलोड करें।',
		copied: 'चित्र क्लिपबोर्ड पर कॉपी किया गया',
		copy: 'चित्र कॉपी करें',
		copyError:
			'चित्र कॉपी नहीं हो सका। क्लिपबोर्ड की अनुमतियाँ जाँचें या चित्र डाउनलोड करें।',
		description: 'Simple Icons से साझा करने के लिए चित्र बनाएँ।',
		download: '{} डाउनलोड करें',
		downloaded: 'चित्र डाउनलोड किया गया',
		export: 'चित्र निर्यात करें',
		exportError: 'चित्र निर्यात नहीं हो सका। फिर से प्रयास करें।',
		exportHint:
			'डाउनलोड में कैनवास का मूल आकार उपयोग होता है। चित्र PNG के रूप में कॉपी किए जाते हैं।',
		format: 'फ़ाइल प्रारूप',
		gap: 'अंतर',
		height: 'ऊँचाई',
		invalidSettings:
			'आयाम 128–4096 px, आइकन 8–256 px और अंतर 0–256 px रखें। आइकन अपने हाशियों सहित कैनवास में समाना चाहिए।',
		loadError: 'आइकन लोड नहीं हो सके। फिर से प्रयास करें।',
		loading: 'आइकन लोड हो रहे हैं…',
		originalSize: 'मूल आकार में निर्यात',
		preview: 'पूर्वावलोकन',
		reset: 'रीसेट करें',
		retry: 'फिर से प्रयास करें',
		shuffleIcons: 'यादृच्छिक रूप से क्रमबद्ध करें',
		size: 'आइकन का आकार',
		width: 'चौड़ाई',
	},
	preview: {
		brand: 'ब्रांड',
		centered: 'आइकन (12, 12) पर केंद्रित होना चाहिए।',
		collinear: 'अनावश्यक समरेखीय रेखाखंड हटाएँ।',
		copyScreenshot: 'पूर्वावलोकन कॉपी करें',
		downloadSvg: 'SVG डाउनलोड करें',
		exportError: 'चित्र निर्यात नहीं हो सका। फिर से प्रयास करें।',
		fix: 'ठीक करें',
		invalidFile: 'पथ वाली SVG फ़ाइल अपलोड करें।',
		invalidPath: 'शून्य से अधिक आकार वाला वैध SVG पथ दर्ज करें।',
		loadError: 'आइकन लोड नहीं हो सके। फिर से प्रयास करें।',
		moreSuggestions: 'और सुझाव',
		negativeZero: 'ऋणात्मक शून्य को शून्य से बदलें।',
		path: 'पथ',
		precision: 'दशमलव के बाद अधिकतम तीन अंक रखें।',
		savePreview: 'पूर्वावलोकन सहेजें',
		show: 'दिखाएं',
		size: 'आइकन की सबसे लंबी भुजा 24px होनी चाहिए।',
		uploadSvg: 'SVG अपलोड करें',
	},
	search: {
		noIconsFound: 'कोई आइकन नहीं मिला',
		searchByBrand: 'ब्रांड से खोजें...',
	},
	settings: {
		actual: 'मूल रंग',
		actualTooltip: 'आइकन के मूल रंग दिखाता है। कुछ रंग स्पष्ट नहीं दिख सकते।',
		contrast: 'कंट्रास्ट',
		contrastTooltip: 'आइकन को स्पष्ट दिखाने के लिए कंट्रास्ट फ़िल्टर लगाता है।',
		language: 'भाषा बदलें',
		reset: 'रीसेट करें',
		themeAuto: 'सिस्टम कलर स्कीम',
		themeDark: 'डार्क कलर स्कीम',
		themeLight: 'लाइट कलर स्कीम',
		zoom: 'ज़ूम',
	},
	share: {
		actionIntentText: 'Simple Icons: लोकप्रिय ब्रांड्स के लिए {} SVG आइकन',
		share: 'इसे साझा करें',
		yourMastodonInstance: 'आपका Mastodon सर्वर',
	},
	thirdParties: {
		extensions: 'एक्सटेंशन',
		libraries: 'लाइब्रेरी',
	},
};

export default translation;
