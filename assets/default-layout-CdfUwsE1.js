const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/virtuoso-DsL8F-9X.js","assets/index-CxAyMAef.js","assets/rc-field-form-BjlAdArP.js","assets/index-HLwoAywX.css","assets/socials-Y7duWygY.js","assets/styled-components.browser.esm-CZmUZyT1.js","assets/controls-BwgPdDvU.js","assets/ZoomOutOutlined-DR5dnfMu.js","assets/index-21YUbTJp.js","assets/modalcontent-BiFCm-LZ.js"])))=>i.map(i=>d[i]);
import{C as $,u as N,a as V,b as G,F as H,P as U,c as W,r as J,M as K,d as q,e as y,w as Y,f as Q,g as X,h as Z,i as M,m as ee,j as te,k as F,l as t,n as C,R as z,o as j,p as L,_ as O,q as oe,s as se,t as v,v as D,x as ne,y as B,B as w,z as re,A as le,D as ae,E as ce,G as R,H as ie,I as ue,J as de,K as fe,L as _,N as me,O as ge}from"./index-CxAyMAef.js";import{a as i}from"./rc-field-form-BjlAdArP.js";import{w as he,E as pe,L as E,D as T}from"./socials-Y7duWygY.js";import{F as g,I as xe}from"./styled-components.browser.esm-CZmUZyT1.js";var ye=function(e,o){var r={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&o.indexOf(s)<0&&(r[s]=e[s]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,s=Object.getOwnPropertySymbols(e);n<s.length;n++)o.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(e,s[n])&&(r[s[n]]=e[s[n]]);return r};const Ce=e=>{const{prefixCls:o,className:r,closeIcon:s,closable:n,type:l,title:a,children:f,footer:h}=e,b=ye(e,["prefixCls","className","closeIcon","closable","type","title","children","footer"]),{getPrefixCls:m}=i.useContext($),k=m(),c=o||m("modal"),d=N(k),[P,I,S]=V(c,d),p=`${c}-confirm`;let x={};return l?x={closable:n??!1,title:"",footer:"",children:i.createElement(G,Object.assign({},e,{prefixCls:c,confirmPrefixCls:p,rootPrefixCls:k,content:f}))}:x={closable:n??!0,title:a,footer:h!==null&&i.createElement(H,Object.assign({},e)),children:f},P(i.createElement(U,Object.assign({prefixCls:c,className:W(I,`${c}-pure-panel`,l&&p,l&&`${p}-${l}`,r,S,d)},b,{closeIcon:J(c,s),closable:n},x)))},je=he(Ce);function A(e){return y(te(e))}const u=K;u.useModal=q;u.info=function(o){return y(Y(o))};u.success=function(o){return y(Q(o))};u.error=function(o){return y(X(o))};u.warning=A;u.warn=A;u.confirm=function(o){return y(Z(o))};u.destroyAll=function(){for(;M.length;){const o=M.pop();o&&o()}};u.config=ee;u._InternalPanelDoNotUseOrYouWillBeFired=je;const ve=()=>{const{iconFg:e}=F();return t.jsx(g,{children:t.jsx("img",{alt:"Simple Icons",src:`https://cdn.simpleicons.org/simpleicons/${e.slice(1)}?viewbox=auto`,style:{width:24,height:24}})})},be=()=>{const{galleryHeight:e}=C();return t.jsx(g,{vertical:!0,justify:"center",align:"center",gap:20,style:{height:e},children:t.jsx(z,{style:{color:"#0cf",fontSize:48},spin:!0})})},ke=i.lazy(()=>O(()=>import("./virtuoso-DsL8F-9X.js"),__vite__mapDeps([0,1,2,3,4,5]))),Pe=()=>{const[e]=j(),[o]=L(),{galleryHeight:r,galleryMargin:s}=C();return e.data.length===0?t.jsx(be,{}):e.data.length>0&&o.length===0?t.jsx(pe,{}):t.jsx(ke,{icons:o,galleryHeight:r,galleryMargin:s})},Ie=i.lazy(()=>O(()=>import("./controls-BwgPdDvU.js").then(e=>e.c),__vite__mapDeps([6,1,2,3,5,4,7,8]))),Se=()=>{const{padding:e}=C(),{headerBg:o}=F();return t.jsx(E.Header,{style:{position:"sticky",top:0,zIndex:1,width:"100%",height:"auto",boxShadow:"0px 0px 10px 0px rgba(0, 0, 0, 0.25)",padding:0,fontSize:24,lineHeight:1},children:t.jsxs(g,{gap:5,justify:"center",align:"center",style:{background:o,padding:`10px ${e}px`},children:[t.jsx(ve,{}),t.jsx(De,{}),t.jsx(Ie,{})]})})},we=i.lazy(()=>O(()=>import("./modalcontent-BiFCm-LZ.js"),__vite__mapDeps([9,1,2,3,5,4,7]))),_e=({icon:e})=>{const[{version:o}]=j(),{i18n:r}=v(),s=D(),n=async a=>{const f=await de(o,e.slug);if(a!=null&&a.path){const h=fe(f);s(r.modal.svgPath,h);return}if(a!=null&&a.colored){const h=f.replace("<svg ",`<svg fill="#${e.hex}" `);s(r.modal.svgColored,h);return}s(r.modal.svgPlain,f)},l=[{type:r.modal.svgPlain,onClick:()=>n()},{type:r.modal.svgColored,onClick:()=>n({colored:!0})},{type:r.modal.svgPath,onClick:()=>n({path:!0})}].map(a=>({key:a.type,label:t.jsx(g,{onClick:a.onClick,children:a.type},a.type)}));return t.jsx(T,{placement:"bottom",menu:{items:l},children:t.jsxs(w,{color:"default",children:[r.modal.copy," SVG"]})})},Ee=({icon:e})=>{const[{version:o}]=j(),{i18n:r}=v(),s=D(),n=[{title:"cdn.simpleicons.org",link:le(e.slug)},{title:"jsDelivr",link:ae(o,e.slug)},{title:"unpkg",link:ce(o,e.slug)}].map(l=>({key:l.title,label:t.jsx(g,{onClick:()=>s(l.title,l.link),children:l.title},l.title)}));return t.jsx(T,{placement:"bottom",menu:{items:n},children:t.jsxs(w,{color:"default",children:[r.modal.copy," CDN"]})})},Fe=({icon:e})=>{const[{version:o}]=j(),{i18n:r}=v(),s=l=>()=>ue(o,e.slug,e.hex,l),n=[{format:r.modal.svgPlain,onClick:()=>R(o,e.slug)},{format:r.modal.svgColored,onClick:()=>R(o,e.slug,e.hex)},{format:"PDF",onClick:()=>ie(o,e.slug)},{format:"PNG",onClick:s(_.PNG)},{format:"JPG",onClick:s(_.JPG)},{format:"WebP",onClick:s(_.WebP)}].map(l=>({key:l.format,label:t.jsx(g,{onClick:l.onClick,children:l.format},l.format)}));return t.jsx(T,{placement:"bottom",menu:{items:n},children:t.jsx(w,{color:"default",children:r.modal.download})})};function Oe(){const[e,o]=oe(),{isMobileSize:r}=C(),[s]=se(),{i18n:n}=v(),l=D(),a=(e==null?void 0:e.relativeColor)==="#fff";return t.jsx(ne,{theme:s===re.Actual?{algorithm:a?B.defaultAlgorithm:B.darkAlgorithm}:void 0,children:t.jsx(u,{centered:!0,destroyOnClose:!0,closeIcon:r,open:!!e,footer:e?t.jsx(g,{vertical:!0,gap:5,justify:"center",align:"center",children:t.jsxs(g,{wrap:!0,gap:5,justify:"center",children:[t.jsxs(w,{color:"default",onClick:()=>{l("slug",e.slug)},children:[n.modal.copy," Slug"]}),t.jsx(_e,{icon:e}),t.jsx(Ee,{icon:e}),t.jsx(Fe,{icon:e})]})}):[],onCancel:()=>{o(void 0)},children:t.jsx(i.Suspense,{fallback:t.jsx(z,{}),children:t.jsx(we,{icon:e})})})})}const De=()=>{const[e,o]=me(),[r]=j(),s=ge(),[,n]=L(),{isMobileSize:l}=C(),{isDark:a}=F(),{i18n:f}=v(),[h,b]=i.useState(!1),m=i.useRef(null),k=()=>{const c=e?s.search(e):r.data;n(c)};return i.useEffect(()=>{const c=d=>{var P,I,S,p,x;globalThis.document.activeElement!==((P=m.current)==null?void 0:P.input)&&d.key==="k"&&(d.metaKey||d.ctrlKey)&&(d.preventDefault(),(I=m.current)==null||I.focus({cursor:"all"})),d.key==="Escape"&&(d.preventDefault(),(p=(S=m.current)==null?void 0:S.input)!=null&&p.value?o(""):(x=m.current)==null||x.blur())};return globalThis.document.addEventListener("keydown",c),()=>globalThis.document.removeEventListener("keydown",c)},[]),i.useEffect(()=>{k()},[e]),t.jsx(xe,{ref:m,allowClear:!0,autoFocus:!0,value:e,suffix:h||l?null:t.jsx("span",{style:{padding:4,marginRight:-7,borderRadius:4,color:"rgba(0, 0, 0, 0.45)",backgroundColor:"rgba(0,0,0,0.06)",lineHeight:1,filter:a?"invert(1)":void 0},children:`${globalThis.navigator.platform.indexOf("Mac")===-1?"CTRL + ":"⌘"}K`}),placeholder:f.search.searchByBrand,onChange:c=>o(c.target.value.trim()),onFocus:()=>b(!0),onBlur:()=>b(!1)})},ze=i.memo(()=>t.jsxs(E,{children:[t.jsx(Se,{}),t.jsx(E.Content,{children:t.jsx(Pe,{})}),t.jsx(Oe,{})]}));export{ze as default};
