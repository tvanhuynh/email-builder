(function(b,a){if(typeof define=="function"&&define.amd){define(b)}else{if(typeof module!="undefined"&&typeof exports=="object"){module.exports=b()}else{a.rangy=b()}}})(function(){var u="object",d="function",A="undefined";var a=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"];var q=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"];var l=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"];var I=["collapse","compareEndPoints","duplicate","moveToElementText","parentElement","select","setEndPoint","getBoundingClientRect"];function D(Q,P){var O=typeof Q[P];return O==d||(!!(O==u&&Q[P]))||O=="unknown"}function y(P,O){return !!(typeof P[O]==u&&P[O])}function f(P,O){return typeof P[O]!=A}function w(O){return function(R,Q){var P=Q.length;while(P--){if(!O(R,Q[P])){return false}}return true}}var j=w(D);var t=w(y);var g=w(f);function z(O){return O&&j(O,I)&&g(O,l)}function M(O){return y(O,"body")?O.body:O.getElementsByTagName("body")[0]}var b=[].forEach?function(O,P){O.forEach(P)}:function(P,R){for(var Q=0,O=P.length;Q<O;++Q){R(P[Q],Q)}};var v={};var C=(typeof window!=A&&typeof document!=A);var k={isHostMethod:D,isHostObject:y,isHostProperty:f,areHostMethods:j,areHostObjects:t,areHostProperties:g,isTextRange:z,getBody:M,forEach:b};var h={version:"1.3.0",initialized:false,isBrowser:C,supported:true,util:k,features:{},modules:v,config:{alertOnFail:false,alertOnWarn:false,preferTextRange:false,autoInitialize:(typeof rangyAutoInitialize==A)?true:rangyAutoInitialize}};function H(O){if(typeof console!=A&&D(console,"log")){console.log(O)}}function p(P,O){if(C&&O){alert(P)}else{H(P)}}function m(O){h.initialized=true;h.supported=false;p("Rangy is not supported in this environment. Reason: "+O,h.config.alertOnFail)}h.fail=m;function n(O){p("Rangy warning: "+O,h.config.alertOnWarn)}h.warn=n;var o;if({}.hasOwnProperty){k.extend=o=function(S,Q,O){var T,R;for(var P in Q){if(Q.hasOwnProperty(P)){T=S[P];R=Q[P];if(O&&T!==null&&typeof T=="object"&&R!==null&&typeof R=="object"){o(T,R,true)}S[P]=R}}if(Q.hasOwnProperty("toString")){S.toString=Q.toString}return S};k.createOptions=function(O,Q){var P={};o(P,Q);if(O){o(P,O)}return P}}else{m("hasOwnProperty not supported")}if(!C){m("Rangy can only run in a browser")}(function(){var O;if(C){var P=document.createElement("div");P.appendChild(document.createElement("span"));var R=[].slice;try{if(R.call(P.childNodes,0)[0].nodeType==1){O=function(S){return R.call(S,0)}}}catch(Q){}}if(!O){O=function(U){var T=[];for(var V=0,S=U.length;V<S;++V){T[V]=U[V]}return T}}k.toArray=O})();var i;if(C){if(D(document,"addEventListener")){i=function(Q,O,P){Q.addEventListener(O,P,false)}}else{if(D(document,"attachEvent")){i=function(Q,O,P){Q.attachEvent("on"+O,P)}}else{m("Document does not have required addEventListener or attachEvent method")}}k.addListener=i}var N=[];function c(O){return O.message||O.description||String(O)}function K(){if(!C||h.initialized){return}var Q;var X=false,R=false;if(D(document,"createRange")){Q=document.createRange();if(j(Q,q)&&g(Q,a)){X=true}}var T=M(document);if(!T||T.nodeName.toLowerCase()!="body"){m("No body element found");return}if(T&&D(T,"createTextRange")){Q=T.createTextRange();if(z(Q)){R=true}}if(!X&&!R){m("Neither Range nor TextRange are available");return}h.initialized=true;h.features={implementsDomRange:X,implementsTextRange:R};var P,V;for(var O in v){if((P=v[O]) instanceof x){P.init(P,h)}}for(var S=0,U=N.length;S<U;++S){try{N[S](h)}catch(W){V="Rangy init listener threw an exception. Continuing. Detail: "+c(W);H(V)}}}function F(O,Q,P){if(P){O+=" in module "+P.name}h.warn("DEPRECATED: "+O+" is deprecated. Please use "+Q+" instead.")}function J(O,P,R,Q){O[P]=function(){F(P,R,Q);return O[R].apply(O,k.toArray(arguments))}}k.deprecationNotice=F;k.createAliasForDeprecatedMethod=J;h.init=K;h.addInitListener=function(O){if(h.initialized){O(h)}else{N.push(O)}};var s=[];h.addShimListener=function(O){s.push(O)};function E(Q){Q=Q||window;K();for(var P=0,O=s.length;P<O;++P){s[P](Q)}}if(C){h.shim=h.createMissingNativeApi=E;J(h,"createMissingNativeApi","shim")}function x(O,Q,P){this.name=O;this.dependencies=Q;this.initialized=false;this.supported=false;this.initializer=P}x.prototype={init:function(){var R=this.dependencies||[];for(var Q=0,O=R.length,S,P;Q<O;++Q){P=R[Q];S=v[P];if(!S||!(S instanceof x)){throw new Error("required module '"+P+"' not found")}S.init();if(!S.supported){throw new Error("required module '"+P+"' not supported")}}this.initializer(this)},fail:function(O){this.initialized=true;this.supported=false;throw new Error(O)},warn:function(O){h.warn("Module "+this.name+": "+O)},deprecationNotice:function(O,P){h.warn("DEPRECATED: "+O+" in module "+this.name+" is deprecated. Please use "+P+" instead")},createError:function(O){return new Error("Error in Rangy "+this.name+" module: "+O)}};function r(O,Q,R){var P=new x(O,Q,function(U){if(!U.initialized){U.initialized=true;try{R(h,U);U.supported=true}catch(T){var S="Module '"+O+"' failed to load: "+c(T);H(S);if(T.stack){H(T.stack)}}}});v[O]=P;return P}h.createModule=function(O){var R,Q;if(arguments.length==2){R=arguments[1];Q=[]}else{R=arguments[2];Q=arguments[1]}var P=r(O,Q,R);if(h.initialized&&h.supported){P.init()}};h.createCoreModule=function(O,P,Q){r(O,P,Q)};function G(){}h.RangePrototype=G;h.rangePrototype=new G();function B(){}h.selectionPrototype=new B();h.createCoreModule("DomUtil",[],function(R,P){var ah="undefined";var T=R.util;var ax=T.getBody;if(!T.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])){P.fail("document missing a Node creation method")}if(!T.isHostMethod(document,"getElementsByTagName")){P.fail("document missing getElementsByTagName method")}var av=document.createElement("div");if(!T.areHostMethods(av,["insertBefore","appendChild","cloneNode"]||!T.areHostObjects(av,["previousSibling","nextSibling","childNodes","parentNode"]))){P.fail("Incomplete Element implementation")}if(!T.isHostProperty(av,"innerHTML")){P.fail("Element is missing innerHTML property")}var ay=document.createTextNode("test");if(!T.areHostMethods(ay,["splitText","deleteData","insertData","appendData","cloneNode"]||!T.areHostObjects(av,["previousSibling","nextSibling","childNodes","parentNode"])||!T.areHostProperties(ay,["data"]))){P.fail("Incomplete Text Node implementation")}var aB=function(aC,aE){var aD=aC.length;while(aD--){if(aC[aD]===aE){return true}}return false};function V(aD){var aC;return typeof aD.namespaceURI==ah||((aC=aD.namespaceURI)===null||aC=="http://www.w3.org/1999/xhtml")}function ai(aD){var aC=aD.parentNode;return(aC.nodeType==1)?aC:null}function ac(aD){var aC=0;while((aD=aD.previousSibling)){++aC}return aC}function ak(aC){switch(aC.nodeType){case 7:case 10:return 0;case 3:case 8:return aC.length;default:return aC.childNodes.length}}function Z(aD,aC){var aE=[],aF;for(aF=aD;aF;aF=aF.parentNode){aE.push(aF)}for(aF=aC;aF;aF=aF.parentNode){if(aB(aE,aF)){return aF}}return null}function Y(aC,aD,aF){var aE=aF?aD:aD.parentNode;while(aE){if(aE===aC){return true}else{aE=aE.parentNode}}return false}function at(aC,aD){return Y(aC,aD,true)}function ap(aD,aC,aG){var aE,aF=aG?aD:aD.parentNode;while(aF){aE=aF.parentNode;if(aE===aC){return aF}aF=aE}return null}function Q(aD){var aC=aD.nodeType;return aC==3||aC==4||aC==8}function O(aD){if(!aD){return false}var aC=aD.nodeType;return aC==3||aC==8}function U(aF,aD){var aC=aD.nextSibling,aE=aD.parentNode;if(aC){aE.insertBefore(aF,aC)}else{aE.appendChild(aF)}return aF}function aj(aH,aE,aD){var aG=aH.cloneNode(false);aG.deleteData(0,aE);aH.deleteData(aE,aH.length-aE);U(aG,aH);if(aD){for(var aF=0,aC;aC=aD[aF++];){if(aC.node==aH&&aC.offset>aE){aC.node=aG;aC.offset-=aE}else{if(aC.node==aH.parentNode&&aC.offset>ac(aH)){++aC.offset}}}}return aG}function az(aC){if(aC.nodeType==9){return aC}else{if(typeof aC.ownerDocument!=ah){return aC.ownerDocument}else{if(typeof aC.document!=ah){return aC.document}else{if(aC.parentNode){return az(aC.parentNode)}else{throw P.createError("getDocument: no document found for node")}}}}}function ab(aC){var aD=az(aC);if(typeof aD.defaultView!=ah){return aD.defaultView}else{if(typeof aD.parentWindow!=ah){return aD.parentWindow}else{throw P.createError("Cannot get a window object for node")}}}function aA(aC){if(typeof aC.contentDocument!=ah){return aC.contentDocument}else{if(typeof aC.contentWindow!=ah){return aC.contentWindow.document}else{throw P.createError("getIframeDocument: No Document object found for iframe element")}}}function aw(aC){if(typeof aC.contentWindow!=ah){return aC.contentWindow}else{if(typeof aC.contentDocument!=ah){return aC.contentDocument.defaultView}else{throw P.createError("getIframeWindow: No Window object found for iframe element")}}}function an(aC){return aC&&T.isHostMethod(aC,"setTimeout")&&T.isHostObject(aC,"document")}function am(aF,aD,aC){var aE;if(!aF){aE=document}else{if(T.isHostProperty(aF,"nodeType")){aE=(aF.nodeType==1&&aF.tagName.toLowerCase()=="iframe")?aA(aF):az(aF)}else{if(an(aF)){aE=aF.document}}}if(!aE){throw aD.createError(aC+"(): Parameter must be a Window object or DOM node")}return aE}function W(aD){var aC;while((aC=aD.parentNode)){aD=aC}return aD}function aq(aF,aH,aE,aG){var aC,aI,aK,aJ,aD;if(aF==aE){return aH===aG?0:(aH<aG)?-1:1}else{if((aC=ap(aE,aF,true))){return aH<=ac(aC)?-1:1}else{if((aC=ap(aF,aE,true))){return ac(aC)<aG?-1:1}else{aI=Z(aF,aE);if(!aI){throw new Error("comparePoints error: nodes have no common ancestor")}aK=(aF===aI)?aI:ap(aF,aI,true);aJ=(aE===aI)?aI:ap(aE,aI,true);if(aK===aJ){throw P.createError("comparePoints got to case 4 and childA and childB are the same!")}else{aD=aI.firstChild;while(aD){if(aD===aK){return -1}else{if(aD===aJ){return 1}}aD=aD.nextSibling}}}}}}var af=false;function ae(aC){var aE;try{aE=aC.parentNode;return false}catch(aD){return true}}(function(){var aC=document.createElement("b");aC.innerHTML="1";var aD=aC.firstChild;aC.innerHTML="<br />";af=ae(aD);R.features.crashyTextNodes=af})();function ag(aC){if(!aC){return"[No node]"}if(af&&ae(aC)){return"[Broken node]"}if(Q(aC)){return'"'+aC.data+'"'}if(aC.nodeType==1){var aD=aC.id?' id="'+aC.id+'"':"";return"<"+aC.nodeName+aD+">[index:"+ac(aC)+",length:"+aC.childNodes.length+"]["+(aC.innerHTML||"[innerHTML not supported]").slice(0,25)+"]"}return aC.nodeName}function ao(aD){var aC=az(aD).createDocumentFragment(),aE;while((aE=aD.firstChild)){aC.appendChild(aE)}return aC}var aa;if(typeof window.getComputedStyle!=ah){aa=function(aC,aD){return ab(aC).getComputedStyle(aC,null)[aD]}}else{if(typeof document.documentElement.currentStyle!=ah){aa=function(aC,aD){return aC.currentStyle?aC.currentStyle[aD]:""}}else{P.fail("No means of obtaining computed style properties found")}}function ar(aH,aE,aG){var aC=ax(aH);var aF=aH.createElement("div");aF.contentEditable=""+!!aG;if(aE){aF.innerHTML=aE}var aD=aC.firstChild;if(aD){aC.insertBefore(aF,aD)}else{aC.appendChild(aF)}return aF}function X(aC){return aC.parentNode.removeChild(aC)}function S(aC){this.root=aC;this._next=aC}S.prototype={_current:null,hasNext:function(){return !!this._next},next:function(){var aE=this._current=this._next;var aD,aC;if(this._current){aD=aE.firstChild;if(aD){this._next=aD}else{aC=null;while((aE!==this.root)&&!(aC=aE.nextSibling)){aE=aE.parentNode}this._next=aC}}return this._current},detach:function(){this._current=this._next=this.root=null}};function au(aC){return new S(aC)}function ad(aC,aD){this.node=aC;this.offset=aD}ad.prototype={equals:function(aC){return !!aC&&this.node===aC.node&&this.offset==aC.offset},inspect:function(){return"[DomPosition("+ag(this.node)+":"+this.offset+")]"},toString:function(){return this.inspect()}};function al(aC){this.code=this[aC];this.codeName=aC;this.message="DOMException: "+this.codeName}al.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11,INVALID_NODE_TYPE_ERR:24};al.prototype.toString=function(){return this.message};R.dom={arrayContains:aB,isHtmlNamespace:V,parentElement:ai,getNodeIndex:ac,getNodeLength:ak,getCommonAncestor:Z,isAncestorOf:Y,isOrIsAncestorOf:at,getClosestAncestorIn:ap,isCharacterDataNode:Q,isTextOrCommentNode:O,insertAfter:U,splitDataNode:aj,getDocument:az,getWindow:ab,getIframeWindow:aw,getIframeDocument:aA,getBody:ax,isWindow:an,getContentDocument:am,getRootContainer:W,comparePoints:aq,isBrokenNode:ae,inspectNode:ag,getComputedStyleProperty:aa,createTestElement:ar,removeNode:X,fragmentFromNodeChildren:ao,createIterator:au,DomPosition:ad};R.DOMException=al});h.createCoreModule("DomRange",["DomUtil"],function(ad,a7){var ag=ad.dom;var aV=ad.util;var av=ag.DomPosition;var aM=ad.DOMException;var az=ag.isCharacterDataNode;var R=ag.getNodeIndex;var ay=ag.isOrIsAncestorOf;var a8=ag.getDocument;var aX=ag.comparePoints;var a3=ag.splitDataNode;var aP=ag.getClosestAncestorIn;var aC=ag.getNodeLength;var a5=ag.arrayContains;var ah=ag.getRootContainer;var ak=ad.features.crashyTextNodes;var a0=ag.removeNode;function aR(ba,a9){return(ba.nodeType!=3)&&(ay(ba,a9.startContainer)||ay(ba,a9.endContainer))}function aY(a9){return a9.document||a8(a9.startContainer)}function O(a9){return ah(a9.startContainer)}function al(a9){return new av(a9.parentNode,R(a9))}function W(a9){return new av(a9.parentNode,R(a9)+1)}function S(ba,bc,bb){var a9=ba.nodeType==11?ba.firstChild:ba;if(az(bc)){if(bb==bc.length){ag.insertAfter(ba,bc)}else{bc.parentNode.insertBefore(ba,bb==0?bc:a3(bc,bb))}}else{if(bb>=bc.childNodes.length){bc.appendChild(ba)}else{bc.insertBefore(ba,bc.childNodes[bb])}}return a9}function X(bc,bb,a9){P(bc);P(bb);if(aY(bb)!=aY(bc)){throw new aM("WRONG_DOCUMENT_ERR")}var bd=aX(bc.startContainer,bc.startOffset,bb.endContainer,bb.endOffset),ba=aX(bc.endContainer,bc.endOffset,bb.startContainer,bb.startOffset);return a9?bd<=0&&ba>=0:bd<0&&ba>0}function ae(bb){var ba;for(var bc,bd=aY(bb.range).createDocumentFragment(),a9;bc=bb.next();){ba=bb.isPartiallySelectedSubtree();bc=bc.cloneNode(!ba);if(ba){a9=bb.getSubtreeIterator();bc.appendChild(ae(a9));a9.detach()}if(bc.nodeType==10){throw new aM("HIERARCHY_REQUEST_ERR")}bd.appendChild(bc)}return bd}function aZ(ba,bd,a9){var bb,bf;a9=a9||{stop:false};for(var bc,be;bc=ba.next();){if(ba.isPartiallySelectedSubtree()){if(bd(bc)===false){a9.stop=true;return}else{be=ba.getSubtreeIterator();aZ(be,bd,a9);be.detach();if(a9.stop){return}}}else{bb=ag.createIterator(bc);while((bf=bb.next())){if(bd(bf)===false){a9.stop=true;return}}}}}function aA(ba){var a9;while(ba.next()){if(ba.isPartiallySelectedSubtree()){a9=ba.getSubtreeIterator();aA(a9);a9.detach()}else{ba.remove()}}}function aU(ba){for(var bb,bc=aY(ba.range).createDocumentFragment(),a9;bb=ba.next();){if(ba.isPartiallySelectedSubtree()){bb=bb.cloneNode(false);a9=ba.getSubtreeIterator();bb.appendChild(aU(a9));a9.detach()}else{ba.remove()}if(bb.nodeType==10){throw new aM("HIERARCHY_REQUEST_ERR")}bc.appendChild(bb)}return bc}function aD(bb,a9,bc){var be=!!(a9&&a9.length),bd;var bf=!!bc;if(be){bd=new RegExp("^("+a9.join("|")+")$")}var ba=[];aZ(new aj(bb,false),function(bh){if(be&&!bd.test(bh.nodeType)){return}if(bf&&!bc(bh)){return}var bi=bb.startContainer;if(bh==bi&&az(bi)&&bb.startOffset==bi.length){return}var bg=bb.endContainer;if(bh==bg&&az(bg)&&bb.endOffset==0){return}ba.push(bh)});return ba}function a2(a9){var ba=(typeof a9.getName=="undefined")?"Range":a9.getName();return"["+ba+"("+ag.inspectNode(a9.startContainer)+":"+a9.startOffset+", "+ag.inspectNode(a9.endContainer)+":"+a9.endOffset+")]"}function aj(bb,ba){this.range=bb;this.clonePartiallySelectedTextNodes=ba;if(!bb.collapsed){this.sc=bb.startContainer;this.so=bb.startOffset;this.ec=bb.endContainer;this.eo=bb.endOffset;var a9=bb.commonAncestorContainer;if(this.sc===this.ec&&az(this.sc)){this.isSingleCharacterDataNode=true;this._first=this._last=this._next=this.sc}else{this._first=this._next=(this.sc===a9&&!az(this.sc))?this.sc.childNodes[this.so]:aP(this.sc,a9,true);this._last=(this.ec===a9&&!az(this.ec))?this.ec.childNodes[this.eo-1]:aP(this.ec,a9,true)}}}aj.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:false,reset:function(){this._current=null;this._next=this._first},hasNext:function(){return !!this._next},next:function(){var a9=this._current=this._next;if(a9){this._next=(a9!==this._last)?a9.nextSibling:null;if(az(a9)&&this.clonePartiallySelectedTextNodes){if(a9===this.ec){(a9=a9.cloneNode(true)).deleteData(this.eo,a9.length-this.eo)}if(this._current===this.sc){(a9=a9.cloneNode(true)).deleteData(0,this.so)}}}return a9},remove:function(){var ba=this._current,bb,a9;if(az(ba)&&(ba===this.sc||ba===this.ec)){bb=(ba===this.sc)?this.so:0;a9=(ba===this.ec)?this.eo:ba.length;if(bb!=a9){ba.deleteData(bb,a9-bb)}}else{if(ba.parentNode){a0(ba)}else{}}},isPartiallySelectedSubtree:function(){var a9=this._current;return aR(a9,this.range)},getSubtreeIterator:function(){var ba;if(this.isSingleCharacterDataNode){ba=this.range.cloneRange();ba.collapse(false)}else{ba=new ap(aY(this.range));var be=this._current;var bc=be,a9=0,bd=be,bb=aC(be);if(ay(be,this.sc)){bc=this.sc;a9=this.so}if(ay(be,this.ec)){bd=this.ec;bb=this.eo}aQ(ba,bc,a9,bd,bb)}return new aj(ba,this.clonePartiallySelectedTextNodes)},detach:function(){this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};var aF=[1,3,4,5,7,8,10];var aW=[2,9,11];var Y=[5,6,10,12];var an=[1,3,4,5,7,8,10,11];var a6=[1,3,4,5,7,8];function ab(a9){return function(bb,bd){var ba,bc=bd?bb:bb.parentNode;while(bc){ba=bc.nodeType;if(a5(a9,ba)){return bc}bc=bc.parentNode}return null}}var a4=ab([9,11]);var au=ab(Y);var am=ab([6,10,12]);function ac(ba,a9){if(am(ba,a9)){throw new aM("INVALID_NODE_TYPE_ERR")}}function Q(a9,ba){if(!a5(ba,a9.nodeType)){throw new aM("INVALID_NODE_TYPE_ERR")}}function aG(a9,ba){if(ba<0||ba>(az(a9)?a9.length:a9.childNodes.length)){throw new aM("INDEX_SIZE_ERR")}}function aO(ba,a9){if(a4(ba,true)!==a4(a9,true)){throw new aM("WRONG_DOCUMENT_ERR")}}function aB(a9){if(au(a9,true)){throw new aM("NO_MODIFICATION_ALLOWED_ERR")}}function aI(ba,a9){if(!ba){throw new aM(a9)}}function V(a9,ba){return ba<=(az(a9)?a9.length:a9.childNodes.length)}function aq(a9){return(!!a9.startContainer&&!!a9.endContainer&&!(ak&&(ag.isBrokenNode(a9.startContainer)||ag.isBrokenNode(a9.endContainer)))&&ah(a9.startContainer)==ah(a9.endContainer)&&V(a9.startContainer,a9.startOffset)&&V(a9.endContainer,a9.endOffset))}function P(a9){if(!aq(a9)){throw new Error("Range error: Range is not valid. This usually happens after DOM mutation. Range: ("+a9.inspect()+")")}}var aH=document.createElement("style");var ax=false;try{aH.innerHTML="<b>x</b>";ax=(aH.firstChild.nodeType==3)}catch(aw){}ad.features.htmlParsingConforms=ax;var ai=ax?function(bb){var ba=this.startContainer;var bc=a8(ba);if(!ba){throw new aM("INVALID_STATE_ERR")}var a9=null;if(ba.nodeType==1){a9=ba}else{if(az(ba)){a9=ag.parentElement(ba)}}if(a9===null||(a9.nodeName=="HTML"&&ag.isHtmlNamespace(a8(a9).documentElement)&&ag.isHtmlNamespace(a9))){a9=bc.createElement("body")}else{a9=a9.cloneNode(false)}a9.innerHTML=bb;return ag.fragmentFromNodeChildren(a9)}:function(ba){var bb=aY(this);var a9=bb.createElement("body");a9.innerHTML=ba;return ag.fragmentFromNodeChildren(a9)};function ao(bb,a9){P(bb);var bf=bb.startContainer,be=bb.startOffset,bc=bb.endContainer,ba=bb.endOffset;var bd=(bf===bc);if(az(bc)&&ba>0&&ba<bc.length){a3(bc,ba,a9)}if(az(bf)&&be>0&&be<bf.length){bf=a3(bf,be,a9);if(bd){ba-=be;bc=bf}else{if(bc==bf.parentNode&&ba>=R(bf)){ba++}}be=0}bb.setStartAndEnd(bf,be,bc,ba)}function T(ba){P(ba);var a9=ba.commonAncestorContainer.parentNode.cloneNode(false);a9.appendChild(ba.cloneContents());return a9.innerHTML}var aJ=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"];var aN=0,aS=1,aa=2,U=3;var aK=0,aL=1,aT=2,aE=3;aV.extend(ad.rangePrototype,{compareBoundaryPoints:function(be,bb){P(this);aO(this.startContainer,bb.startContainer);var bg,ba,bf,a9;var bd=(be==U||be==aN)?"start":"end";var bc=(be==aS||be==aN)?"start":"end";bg=this[bd+"Container"];ba=this[bd+"Offset"];bf=bb[bc+"Container"];a9=bb[bc+"Offset"];return aX(bg,ba,bf,a9)},insertNode:function(ba){P(this);Q(ba,an);aB(this.startContainer);if(ay(ba,this.startContainer)){throw new aM("HIERARCHY_REQUEST_ERR")}var a9=S(ba,this.startContainer,this.startOffset);this.setStartBefore(a9)},cloneContents:function(){P(this);var bb,ba;if(this.collapsed){return aY(this).createDocumentFragment()}else{if(this.startContainer===this.endContainer&&az(this.startContainer)){bb=this.startContainer.cloneNode(true);bb.data=bb.data.slice(this.startOffset,this.endOffset);ba=aY(this).createDocumentFragment();ba.appendChild(bb);return ba}else{var a9=new aj(this,true);bb=ae(a9);a9.detach()}return bb}},canSurroundContents:function(){P(this);aB(this.startContainer);aB(this.endContainer);var a9=new aj(this,true);var ba=(a9._first&&(aR(a9._first,this))||(a9._last&&aR(a9._last,this)));a9.detach();return !ba},surroundContents:function(ba){Q(ba,a6);if(!this.canSurroundContents()){throw new aM("INVALID_STATE_ERR")}var a9=this.extractContents();if(ba.hasChildNodes()){while(ba.lastChild){ba.removeChild(ba.lastChild)}}S(ba,this.startContainer,this.startOffset);ba.appendChild(a9);this.selectNode(ba)},cloneRange:function(){P(this);var a9=new ap(aY(this));var ba=aJ.length,bb;while(ba--){bb=aJ[ba];a9[bb]=this[bb]}return a9},toString:function(){P(this);var bb=this.startContainer;if(bb===this.endContainer&&az(bb)){return(bb.nodeType==3||bb.nodeType==4)?bb.data.slice(this.startOffset,this.endOffset):""}else{var a9=[],ba=new aj(this,true);aZ(ba,function(bc){if(bc.nodeType==3||bc.nodeType==4){a9.push(bc.data)}});ba.detach();return a9.join("")}},compareNode:function(bb){P(this);var ba=bb.parentNode;var bd=R(bb);if(!ba){throw new aM("NOT_FOUND_ERR")}var bc=this.comparePoint(ba,bd),a9=this.comparePoint(ba,bd+1);if(bc<0){return(a9>0)?aT:aK}else{return(a9>0)?aL:aE}},comparePoint:function(a9,ba){P(this);aI(a9,"HIERARCHY_REQUEST_ERR");aO(a9,this.startContainer);if(aX(a9,ba,this.startContainer,this.startOffset)<0){return -1}else{if(aX(a9,ba,this.endContainer,this.endOffset)>0){return 1}}return 0},createContextualFragment:ai,toHtml:function(){return T(this)},intersectsNode:function(bc,a9){P(this);if(ah(bc)!=O(this)){return false}var bb=bc.parentNode,be=R(bc);if(!bb){return true}var bd=aX(bb,be,this.endContainer,this.endOffset),ba=aX(bb,be+1,this.startContainer,this.startOffset);return a9?bd<=0&&ba>=0:bd<0&&ba>0},isPointInRange:function(a9,ba){P(this);aI(a9,"HIERARCHY_REQUEST_ERR");aO(a9,this.startContainer);return(aX(a9,ba,this.startContainer,this.startOffset)>=0)&&(aX(a9,ba,this.endContainer,this.endOffset)<=0)},intersectsRange:function(a9){return X(this,a9,false)},intersectsOrTouchesRange:function(a9){return X(this,a9,true)},intersection:function(a9){if(this.intersectsRange(a9)){var bc=aX(this.startContainer,this.startOffset,a9.startContainer,a9.startOffset),ba=aX(this.endContainer,this.endOffset,a9.endContainer,a9.endOffset);var bb=this.cloneRange();if(bc==-1){bb.setStart(a9.startContainer,a9.startOffset)}if(ba==1){bb.setEnd(a9.endContainer,a9.endOffset)}return bb}return null},union:function(a9){if(this.intersectsOrTouchesRange(a9)){var ba=this.cloneRange();if(aX(a9.startContainer,a9.startOffset,this.startContainer,this.startOffset)==-1){ba.setStart(a9.startContainer,a9.startOffset)}if(aX(a9.endContainer,a9.endOffset,this.endContainer,this.endOffset)==1){ba.setEnd(a9.endContainer,a9.endOffset)}return ba}else{throw new aM("Ranges do not intersect")}},containsNode:function(ba,a9){if(a9){return this.intersectsNode(ba,false)}else{return this.compareNode(ba)==aE}},containsNodeContents:function(a9){return this.comparePoint(a9,0)>=0&&this.comparePoint(a9,aC(a9))<=0},containsRange:function(a9){var ba=this.intersection(a9);return ba!==null&&a9.equals(ba)},containsNodeText:function(bb){var bc=this.cloneRange();bc.selectNode(bb);var ba=bc.getNodes([3]);if(ba.length>0){bc.setStart(ba[0],0);var a9=ba.pop();bc.setEnd(a9,a9.length);return this.containsRange(bc)}else{return this.containsNodeContents(bb)}},getNodes:function(a9,ba){P(this);return aD(this,a9,ba)},getDocument:function(){return aY(this)},collapseBefore:function(a9){this.setEndBefore(a9);this.collapse(false)},collapseAfter:function(a9){this.setStartAfter(a9);this.collapse(true)},getBookmark:function(a9){var bd=aY(this);var bb=ad.createRange(bd);a9=a9||ag.getBody(bd);bb.selectNodeContents(a9);var bc=this.intersection(bb);var be=0,ba=0;if(bc){bb.setEnd(bc.startContainer,bc.startOffset);be=bb.toString().length;ba=be+bc.toString().length}return{start:be,end:ba,containerNode:a9}},moveToBookmark:function(bg){var bc=bg.containerNode;var a9=0;this.setStart(bc,0);this.collapse(true);var be=[bc],ba,bb=false,bh=false;var bf,bd,bi;while(!bh&&(ba=be.pop())){if(ba.nodeType==3){bf=a9+ba.length;if(!bb&&bg.start>=a9&&bg.start<=bf){this.setStart(ba,bg.start-a9);bb=true}if(bb&&bg.end>=a9&&bg.end<=bf){this.setEnd(ba,bg.end-a9);bh=true}a9=bf}else{bi=ba.childNodes;bd=bi.length;while(bd--){be.push(bi[bd])}}}},getName:function(){return"DomRange"},equals:function(a9){return ap.rangesEqual(this,a9)},isValid:function(){return aq(this)},inspect:function(){return a2(this)},detach:function(){}});function ar(a9){a9.START_TO_START=aN;a9.START_TO_END=aS;a9.END_TO_END=aa;a9.END_TO_START=U;a9.NODE_BEFORE=aK;a9.NODE_AFTER=aL;a9.NODE_BEFORE_AND_AFTER=aT;a9.NODE_INSIDE=aE}function af(a9){ar(a9);ar(a9.prototype)}function a1(a9,ba){return function(){P(this);var bg=this.startContainer,bf=this.startOffset,bb=this.commonAncestorContainer;var bd=new aj(this,true);var be,bh;if(bg!==bb){be=aP(bg,bb,true);bh=W(be);bg=bh.node;bf=bh.offset}aZ(bd,aB);bd.reset();var bc=a9(bd);bd.detach();ba(this,bg,bf,bg,bf);return bc}}function Z(ba,be){function bd(bg,bf){return function(bh){Q(bh,aF);Q(ah(bh),aW);var bi=(bg?al:W)(bh);(bf?a9:bc)(this,bi.node,bi.offset)}}function a9(bg,bi,bj){var bh=bg.endContainer,bf=bg.endOffset;if(bi!==bg.startContainer||bj!==bg.startOffset){if(ah(bi)!=ah(bh)||aX(bi,bj,bh,bf)==1){bh=bi;bf=bj}be(bg,bi,bj,bh,bf)}}function bc(bf,bg,bj){var bi=bf.startContainer,bh=bf.startOffset;if(bg!==bf.endContainer||bj!==bf.endOffset){if(ah(bg)!=ah(bi)||aX(bg,bj,bi,bh)==-1){bi=bg;bh=bj}be(bf,bi,bh,bg,bj)}}var bb=function(){};bb.prototype=ad.rangePrototype;ba.prototype=new bb();aV.extend(ba.prototype,{setStart:function(bf,bg){ac(bf,true);aG(bf,bg);a9(this,bf,bg)},setEnd:function(bf,bg){ac(bf,true);aG(bf,bg);bc(this,bf,bg)},setStartAndEnd:function(){var bh=arguments;var bj=bh[0],bi=bh[1],bg=bj,bf=bi;switch(bh.length){case 3:bf=bh[2];break;case 4:bg=bh[2];bf=bh[3];break}be(this,bj,bi,bg,bf)},setBoundary:function(bg,bh,bf){this["set"+(bf?"Start":"End")](bg,bh)},setStartBefore:bd(true,true),setStartAfter:bd(false,true),setEndBefore:bd(true,false),setEndAfter:bd(false,false),collapse:function(bf){P(this);if(bf){be(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset)}else{be(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)}},selectNodeContents:function(bf){ac(bf,true);be(this,bf,0,bf,aC(bf))},selectNode:function(bg){ac(bg,false);Q(bg,aF);var bh=al(bg),bf=W(bg);be(this,bh.node,bh.offset,bf.node,bf.offset)},extractContents:a1(aU,be),deleteContents:a1(aA,be),canSurroundContents:function(){P(this);aB(this.startContainer);aB(this.endContainer);var bf=new aj(this,true);var bg=(bf._first&&aR(bf._first,this)||(bf._last&&aR(bf._last,this)));bf.detach();return !bg},splitBoundaries:function(){ao(this)},splitBoundariesPreservingPositions:function(bf){ao(this,bf)},normalizeBoundaries:function(){P(this);var bm=this.startContainer,bh=this.startOffset,bl=this.endContainer,bf=this.endOffset;var bj=function(bq){var bp=bq.nextSibling;if(bp&&bp.nodeType==bq.nodeType){bl=bq;bf=bq.length;bq.appendData(bp.data);a0(bp)}};var bn=function(br){var bq=br.previousSibling;if(bq&&bq.nodeType==br.nodeType){bm=br;var bp=br.length;bh=bq.length;br.insertData(0,bq.data);a0(bq);if(bm==bl){bf+=bh;bl=bm}else{if(bl==br.parentNode){var bs=R(br);if(bf==bs){bl=br;bf=bp}else{if(bf>bs){bf--}}}}}};var bk=true;var bo;if(az(bl)){if(bf==bl.length){bj(bl)}else{if(bf==0){bo=bl.previousSibling;if(bo&&bo.nodeType==bl.nodeType){bf=bo.length;if(bm==bl){bk=false}bo.appendData(bl.data);a0(bl);bl=bo}}}}else{if(bf>0){var bi=bl.childNodes[bf-1];if(bi&&az(bi)){bj(bi)}}bk=!this.collapsed}if(bk){if(az(bm)){if(bh==0){bn(bm)}else{if(bh==bm.length){bo=bm.nextSibling;if(bo&&bo.nodeType==bm.nodeType){if(bl==bo){bl=bm;bf+=bm.length}bm.appendData(bo.data);a0(bo)}}}}else{if(bh<bm.childNodes.length){var bg=bm.childNodes[bh];if(bg&&az(bg)){bn(bg)}}}}else{bm=bl;bh=bf}be(this,bm,bh,bl,bf)},collapseToPoint:function(bf,bg){ac(bf,true);aG(bf,bg);this.setStartAndEnd(bf,bg)}});af(ba)}function at(a9){a9.collapsed=(a9.startContainer===a9.endContainer&&a9.startOffset===a9.endOffset);a9.commonAncestorContainer=a9.collapsed?a9.startContainer:ag.getCommonAncestor(a9.startContainer,a9.endContainer)}function aQ(ba,bc,a9,bd,bb){ba.startContainer=bc;ba.startOffset=a9;ba.endContainer=bd;ba.endOffset=bb;ba.document=ag.getDocument(bc);at(ba)}function ap(a9){this.startContainer=a9;this.startOffset=0;this.endContainer=a9;this.endOffset=0;this.document=a9;at(this)}Z(ap,aQ);aV.extend(ap,{rangeProperties:aJ,RangeIterator:aj,copyComparisonConstants:af,createPrototypeRange:Z,inspect:a2,toHtml:T,getRangeDocument:aY,rangesEqual:function(ba,a9){return ba.startContainer===a9.startContainer&&ba.startOffset===a9.startOffset&&ba.endContainer===a9.endContainer&&ba.endOffset===a9.endOffset}});ad.DomRange=ap});h.createCoreModule("WrappedRange",["DomRange"],function(aa,S){var O,P;var W=aa.dom;var X=aa.util;var R=W.DomPosition;var ac=aa.DomRange;var Y=W.getBody;var ae=W.getContentDocument;var Z=W.isCharacterDataNode;if(aa.features.implementsDomRange){(function(){var ai;var ap=ac.rangeProperties;function af(ar){var at=ap.length,au;while(at--){au=ap[at];ar[au]=ar.nativeRange[au]}ar.collapsed=(ar.startContainer===ar.endContainer&&ar.startOffset===ar.endOffset)}function ak(au,ax,at,ay,av){var ar=(au.startContainer!==ax||au.startOffset!=at);var az=(au.endContainer!==ay||au.endOffset!=av);var aw=!au.equals(au.nativeRange);if(ar||az||aw){au.setEnd(ay,av);au.setStart(ax,at)}}var ah;O=function(ar){if(!ar){throw S.createError("WrappedRange: Range must be specified")}this.nativeRange=ar;af(this)};ac.createPrototypeRange(O,ak);ai=O.prototype;ai.selectNode=function(ar){this.nativeRange.selectNode(ar);af(this)};ai.cloneContents=function(){return this.nativeRange.cloneContents()};ai.surroundContents=function(ar){this.nativeRange.surroundContents(ar);af(this)};ai.collapse=function(ar){this.nativeRange.collapse(ar);af(this)};ai.cloneRange=function(){return new O(this.nativeRange.cloneRange())};ai.refresh=function(){af(this)};ai.toString=function(){return this.nativeRange.toString()};var ao=document.createTextNode("test");Y(document).appendChild(ao);var al=document.createRange();al.setStart(ao,0);al.setEnd(ao,0);try{al.setStart(ao,1);ai.setStart=function(ar,at){this.nativeRange.setStart(ar,at);af(this)};ai.setEnd=function(ar,at){this.nativeRange.setEnd(ar,at);af(this)};ah=function(ar){return function(at){this.nativeRange[ar](at);af(this)}}}catch(an){ai.setStart=function(at,au){try{this.nativeRange.setStart(at,au)}catch(ar){this.nativeRange.setEnd(at,au);this.nativeRange.setStart(at,au)}af(this)};ai.setEnd=function(at,au){try{this.nativeRange.setEnd(at,au)}catch(ar){this.nativeRange.setStart(at,au);this.nativeRange.setEnd(at,au)}af(this)};ah=function(ar,at){return function(av){try{this.nativeRange[ar](av)}catch(au){this.nativeRange[at](av);this.nativeRange[ar](av)}af(this)}}}ai.setStartBefore=ah("setStartBefore","setEndBefore");ai.setStartAfter=ah("setStartAfter","setEndAfter");ai.setEndBefore=ah("setEndBefore","setStartBefore");ai.setEndAfter=ah("setEndAfter","setStartAfter");ai.selectNodeContents=function(ar){this.setStartAndEnd(ar,0,W.getNodeLength(ar))};al.selectNodeContents(ao);al.setEnd(ao,3);var aq=document.createRange();aq.selectNodeContents(ao);aq.setEnd(ao,4);aq.setStart(ao,2);if(al.compareBoundaryPoints(al.START_TO_END,aq)==-1&&al.compareBoundaryPoints(al.END_TO_START,aq)==1){ai.compareBoundaryPoints=function(at,ar){ar=ar.nativeRange||ar;if(at==ar.START_TO_END){at=ar.END_TO_START}else{if(at==ar.END_TO_START){at=ar.START_TO_END}}return this.nativeRange.compareBoundaryPoints(at,ar)}}else{ai.compareBoundaryPoints=function(at,ar){return this.nativeRange.compareBoundaryPoints(at,ar.nativeRange||ar)}}var ag=document.createElement("div");ag.innerHTML="123";var aj=ag.firstChild;var am=Y(document);am.appendChild(ag);al.setStart(aj,1);al.setEnd(aj,2);al.deleteContents();if(aj.data=="13"){ai.deleteContents=function(){this.nativeRange.deleteContents();af(this)};ai.extractContents=function(){var ar=this.nativeRange.extractContents();af(this);return ar}}else{}am.removeChild(ag);am=null;if(X.isHostMethod(al,"createContextualFragment")){ai.createContextualFragment=function(ar){return this.nativeRange.createContextualFragment(ar)}}Y(document).removeChild(ao);ai.getName=function(){return"WrappedRange"};aa.WrappedRange=O;aa.createNativeRange=function(ar){ar=ae(ar,S,"createNativeRange");return ar.createRange()}})()}if(aa.features.implementsTextRange){var T=function(ak){var ai=ak.parentElement();var ag=ak.duplicate();ag.collapse(true);var aj=ag.parentElement();ag=ak.duplicate();ag.collapse(false);var ah=ag.parentElement();var af=(aj==ah)?aj:W.getCommonAncestor(aj,ah);return af==ai?af:W.getCommonAncestor(ai,af)};var Q=function(af){return af.compareEndPoints("StartToEnd",af)==0};var U=function(af,ar,ap,ag,aj){var at=af.duplicate();at.collapse(ap);var ah=at.parentElement();if(!W.isOrIsAncestorOf(ar,ah)){ah=ar}if(!ah.canHaveHTML){var ao=new R(ah.parentNode,W.getNodeIndex(ah));return{boundaryPosition:ao,nodeInfo:{nodeIndex:ao.offset,containerElement:ao.node}}}var ai=W.getDocument(ah).createElement("span");if(ai.parentNode){W.removeNode(ai)}var aB,az=ap?"StartToStart":"StartToEnd";var au,ak,aq,av;var am=(aj&&aj.containerElement==ah)?aj.nodeIndex:0;var aw=ah.childNodes.length;var al=aw;var ay=al;while(true){if(ay==aw){ah.appendChild(ai)}else{ah.insertBefore(ai,ah.childNodes[ay])}at.moveToElementText(ai);aB=at.compareEndPoints(az,af);if(aB==0||am==al){break}else{if(aB==-1){if(al==am+1){break}else{am=ay}}else{al=(al==am+1)?am:ay}}ay=Math.floor((am+al)/2);ah.removeChild(ai)}av=ai.nextSibling;if(aB==-1&&av&&Z(av)){at.setEndPoint(ap?"EndToStart":"EndToEnd",af);var an;if(/[\r\n]/.test(av.data)){var ax=at.duplicate();var aA=ax.text.replace(/\r\n/g,"\r").length;an=ax.moveStart("character",aA);while((aB=ax.compareEndPoints("StartToEnd",ax))==-1){an++;ax.moveStart("character",1)}}else{an=at.text.length}aq=new R(av,an)}else{au=(ag||!ap)&&ai.previousSibling;ak=(ag||ap)&&ai.nextSibling;if(ak&&Z(ak)){aq=new R(ak,0)}else{if(au&&Z(au)){aq=new R(au,au.data.length)}else{aq=new R(ah,W.getNodeIndex(ai))}}}W.removeNode(ai);return{boundaryPosition:aq,nodeInfo:{nodeIndex:ay,containerElement:ah}}};var ad=function(af,ah){var ai,al,aj=af.offset;var am=W.getDocument(af.node);var ag,an,ao=Y(am).createTextRange();var ak=Z(af.node);if(ak){ai=af.node;al=ai.parentNode}else{an=af.node.childNodes;ai=(aj<an.length)?an[aj]:null;al=af.node}ag=am.createElement("span");ag.innerHTML="&#feff;";if(ai){al.insertBefore(ag,ai)}else{al.appendChild(ag)}ao.moveToElementText(ag);ao.collapse(!ah);al.removeChild(ag);if(ak){ao[ah?"moveStart":"moveEnd"]("character",aj)}return ao};P=function(af){this.textRange=af;this.refresh()};P.prototype=new ac(document);P.prototype.refresh=function(){var ai,af,ah;var ag=T(this.textRange);if(Q(this.textRange)){af=ai=U(this.textRange,ag,true,true).boundaryPosition}else{ah=U(this.textRange,ag,true,false);ai=ah.boundaryPosition;af=U(this.textRange,ag,false,false,ah.nodeInfo).boundaryPosition}this.setStart(ai.node,ai.offset);this.setEnd(af.node,af.offset)};P.prototype.getName=function(){return"WrappedTextRange"};ac.copyComparisonConstants(P);var ab=function(af){if(af.collapsed){return ad(new R(af.startContainer,af.startOffset),true)}else{var ai=ad(new R(af.startContainer,af.startOffset),true);var ah=ad(new R(af.endContainer,af.endOffset),false);var ag=Y(ac.getRangeDocument(af)).createTextRange();ag.setEndPoint("StartToStart",ai);ag.setEndPoint("EndToEnd",ah);return ag}};P.rangeToTextRange=ab;P.prototype.toTextRange=function(){return ab(this)};aa.WrappedTextRange=P;if(!aa.features.implementsDomRange||aa.config.preferTextRange){var V=(function(af){return af("return this;")()})(Function);if(typeof V.Range=="undefined"){V.Range=P}aa.createNativeRange=function(af){af=ae(af,S,"createNativeRange");return Y(af).createTextRange()};aa.WrappedRange=P}}aa.createRange=function(af){af=ae(af,S,"createRange");return new aa.WrappedRange(aa.createNativeRange(af))};aa.createRangyRange=function(af){af=ae(af,S,"createRangyRange");return new ac(af)};X.createAliasForDeprecatedMethod(aa,"createIframeRange","createRange");X.createAliasForDeprecatedMethod(aa,"createIframeRangyRange","createRangyRange");aa.addShimListener(function(ag){var af=ag.document;if(typeof af.createRange=="undefined"){af.createRange=function(){return aa.createRange(af)}}af=ag=null})});h.createCoreModule("WrappedSelection",["DomRange","WrappedRange"],function(X,R){X.config.checkSelectionRanges=true;var ax="boolean";var aA="number";var Q=X.dom;var ac=X.util;var aL=ac.isHostMethod;var aP=X.DomRange;var T=X.WrappedRange;var aK=X.DOMException;var ar=Q.DomPosition;var aH;var ae;var ab=X.features;var aX="Control";var aW=Q.getDocument;var aV=Q.getBody;var aC=aP.rangesEqual;function U(aZ){return(typeof aZ=="string")?/^backward(s)?$/i.test(aZ):!!aZ}function an(a1,aZ){if(!a1){return window}else{if(Q.isWindow(a1)){return a1}else{if(a1 instanceof au){return a1.win}else{var a0=Q.getContentDocument(a1,R,aZ);return Q.getWindow(a0)}}}}function ad(aZ){return an(aZ,"getWinSelection").getSelection()}function ah(aZ){return an(aZ,"getDocSelection").document.selection}function aU(aZ){var a0=false;if(aZ.anchorNode){a0=(Q.comparePoints(aZ.anchorNode,aZ.anchorOffset,aZ.focusNode,aZ.focusOffset)==1)}return a0}var aS=aL(window,"getSelection"),aJ=ac.isHostObject(document,"selection");ab.implementsWinGetSelection=aS;ab.implementsDocSelection=aJ;var ak=aJ&&(!aS||X.config.preferTextRange);if(ak){aH=ah;X.isSelectionValid=function(a0){var a1=an(a0,"isSelectionValid").document,aZ=a1.selection;return(aZ.type!="None"||aW(aZ.createRange().parentElement())==a1)}}else{if(aS){aH=ad;X.isSelectionValid=function(){return true}}else{R.fail("Neither document.selection or window.getSelection() detected.");return false}}X.getNativeSelection=aH;var aI=aH();if(!aI){R.fail("Native selection was null (possibly issue 138?)");return false}var av=X.createNativeRange(document);var aw=aV(document);var aF=ac.areHostProperties(aI,["anchorNode","focusNode","anchorOffset","focusOffset"]);ab.selectionHasAnchorAndFocus=aF;var ag=aL(aI,"extend");ab.selectionHasExtend=ag;var aY=(typeof aI.rangeCount==aA);ab.selectionHasRangeCount=aY;var aO=false;var aM=true;var ao=ag?function(a2,aZ){var a1=aP.getRangeDocument(aZ);var a0=X.createRange(a1);a0.collapseToPoint(aZ.endContainer,aZ.endOffset);a2.addRange(aE(a0));a2.extend(aZ.startContainer,aZ.startOffset)}:null;if(ac.areHostMethods(aI,["addRange","getRangeAt","removeAllRanges"])&&typeof aI.rangeCount==aA&&ab.implementsDomRange){(function(){var a0=window.getSelection();if(a0){var a4=a0.rangeCount;var a6=(a4>1);var a7=[];var a9=aU(a0);for(var a5=0;a5<a4;++a5){a7[a5]=a0.getRangeAt(a5)}var a2=Q.createTestElement(document,"",false);var a3=a2.appendChild(document.createTextNode("\u00a0\u00a0\u00a0"));var a1=document.createRange();a1.setStart(a3,1);a1.collapse(true);a0.removeAllRanges();a0.addRange(a1);aM=(a0.rangeCount==1);a0.removeAllRanges();if(!a6){var a8=window.navigator.appVersion.match(/Chrome\/(.*?) /);if(a8&&parseInt(a8[1])>=36){aO=false}else{var aZ=a1.cloneRange();a1.setStart(a3,0);aZ.setEnd(a3,3);aZ.setStart(a3,2);a0.addRange(a1);a0.addRange(aZ);aO=(a0.rangeCount==2)}}Q.removeNode(a2);a0.removeAllRanges();for(a5=0;a5<a4;++a5){if(a5==0&&a9){if(ao){ao(a0,a7[a5])}else{X.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend");a0.addRange(a7[a5])}}else{a0.addRange(a7[a5])}}}})()}ab.selectionSupportsMultipleRanges=aO;ab.collapsedNonEditableSelectionsSupported=aM;var W=false,Z;if(aw&&aL(aw,"createControlRange")){Z=aw.createControlRange();if(ac.areHostProperties(Z,["item","add"])){W=true}}ab.implementsControlRange=W;if(aF){ae=function(aZ){return aZ.anchorNode===aZ.focusNode&&aZ.anchorOffset===aZ.focusOffset}}else{ae=function(aZ){return aZ.rangeCount?aZ.getRangeAt(aZ.rangeCount-1).collapsed:false}}function P(a1,aZ,a2){var a0=a2?"end":"start",a3=a2?"start":"end";a1.anchorNode=aZ[a0+"Container"];a1.anchorOffset=aZ[a0+"Offset"];a1.focusNode=aZ[a3+"Container"];a1.focusOffset=aZ[a3+"Offset"]}function am(a0){var aZ=a0.nativeSelection;a0.anchorNode=aZ.anchorNode;a0.anchorOffset=aZ.anchorOffset;a0.focusNode=aZ.focusNode;a0.focusOffset=aZ.focusOffset}function aB(aZ){aZ.anchorNode=aZ.focusNode=null;aZ.anchorOffset=aZ.focusOffset=0;aZ.rangeCount=0;aZ.isCollapsed=true;aZ._ranges.length=0}function aE(aZ){var a0;if(aZ instanceof aP){a0=X.createNativeRange(aZ.getDocument());a0.setEnd(aZ.endContainer,aZ.endOffset);a0.setStart(aZ.startContainer,aZ.startOffset)}else{if(aZ instanceof T){a0=aZ.nativeRange}else{if(ab.implementsDomRange&&(aZ instanceof Q.getWindow(aZ.startContainer).Range)){a0=aZ}}}return a0}function aa(a1){if(!a1.length||a1[0].nodeType!=1){return false}for(var a0=1,aZ=a1.length;a0<aZ;++a0){if(!Q.isAncestorOf(a1[0],a1[a0])){return false}}return true}function aG(a0){var aZ=a0.getNodes();if(!aa(aZ)){throw R.createError("getSingleElementFromRange: range "+a0.inspect()+" did not consist of a single element")}return aZ[0]}function az(aZ){return !!aZ&&typeof aZ.text!="undefined"}function aD(a1,a0){var aZ=new T(a0);a1._ranges=[aZ];P(a1,aZ,false);a1.rangeCount=1;a1.isCollapsed=aZ.collapsed}function aj(a2){a2._ranges.length=0;if(a2.docSelection.type=="None"){aB(a2)}else{var a1=a2.docSelection.createRange();if(az(a1)){aD(a2,a1)}else{a2.rangeCount=a1.length;var aZ,a3=aW(a1.item(0));for(var a0=0;a0<a2.rangeCount;++a0){aZ=X.createRange(a3);aZ.selectNode(a1.item(a0));a2._ranges.push(aZ)}a2.isCollapsed=a2.rangeCount==1&&a2._ranges[0].collapsed;P(a2,a2._ranges[a2.rangeCount-1],false)}}}function aq(a0,a3){var a1=a0.docSelection.createRange();var aZ=aG(a3);var a7=aW(a1.item(0));var a4=aV(a7).createControlRange();for(var a2=0,a5=a1.length;a2<a5;++a2){a4.add(a1.item(a2))}try{a4.add(aZ)}catch(a6){throw R.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)")}a4.select();aj(a0)}var af;if(aL(aI,"getRangeAt")){af=function(a1,aZ){try{return a1.getRangeAt(aZ)}catch(a0){return null}}}else{if(aF){af=function(a0){var a1=aW(a0.anchorNode);var aZ=X.createRange(a1);aZ.setStartAndEnd(a0.anchorNode,a0.anchorOffset,a0.focusNode,a0.focusOffset);if(aZ.collapsed!==this.isCollapsed){aZ.setStartAndEnd(a0.focusNode,a0.focusOffset,a0.anchorNode,a0.anchorOffset)}return aZ}}}function au(aZ,a1,a0){this.nativeSelection=aZ;this.docSelection=a1;this._ranges=[];this.win=a0;this.refresh()}au.prototype=X.selectionPrototype;function ap(aZ){aZ.win=aZ.anchorNode=aZ.focusNode=aZ._ranges=null;aZ.rangeCount=aZ.anchorOffset=aZ.focusOffset=0;aZ.detached=true}var aT=[];function aN(a3,a2){var aZ=aT.length,a0,a1;while(aZ--){a0=aT[aZ];a1=a0.selection;if(a2=="deleteAll"){ap(a1)}else{if(a0.win==a3){if(a2=="delete"){aT.splice(aZ,1);return true}else{return a1}}}}if(a2=="deleteAll"){aT.length=0}return null}var al=function(a1){if(a1&&a1 instanceof au){a1.refresh();return a1}a1=an(a1,"getNativeSelection");var a0=aN(a1);var aZ=aH(a1),a2=aJ?ah(a1):null;if(a0){a0.nativeSelection=aZ;a0.docSelection=a2;a0.refresh()}else{a0=new au(aZ,a2,a1);aT.push({win:a1,selection:a0})}return a0};X.getSelection=al;ac.createAliasForDeprecatedMethod(X,"getIframeSelection","getSelection");var O=au.prototype;function Y(a5,a0){var a6=aW(a0[0].startContainer);var a3=aV(a6).createControlRange();for(var a2=0,a4,aZ=a0.length;a2<aZ;++a2){a4=aG(a0[a2]);try{a3.add(a4)}catch(a1){throw R.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)")}}a3.select();aj(a5)}if(!ak&&aF&&ac.areHostMethods(aI,["removeAllRanges","addRange"])){O.removeAllRanges=function(){this.nativeSelection.removeAllRanges();aB(this)};var S=function(a0,aZ){ao(a0.nativeSelection,aZ);a0.refresh()};if(aY){O.addRange=function(a0,a4){if(W&&aJ&&this.docSelection.type==aX){aq(this,a0)}else{if(U(a4)&&ag){S(this,a0)}else{var a2;if(aO){a2=this.rangeCount}else{this.removeAllRanges();a2=0}var aZ=aE(a0).cloneRange();try{this.nativeSelection.addRange(aZ)}catch(a1){}this.rangeCount=this.nativeSelection.rangeCount;if(this.rangeCount==a2+1){if(X.config.checkSelectionRanges){var a3=af(this.nativeSelection,this.rangeCount-1);if(a3&&!aC(a3,a0)){a0=new T(a3)}}this._ranges[this.rangeCount-1]=a0;P(this,a0,V(this.nativeSelection));this.isCollapsed=ae(this)}else{this.refresh()}}}}}else{O.addRange=function(aZ,a0){if(U(a0)&&ag){S(this,aZ)}else{this.nativeSelection.addRange(aE(aZ));this.refresh()}}}O.setRanges=function(a0){if(W&&aJ&&a0.length>1){Y(this,a0)}else{this.removeAllRanges();for(var a1=0,aZ=a0.length;a1<aZ;++a1){this.addRange(a0[a1])}}}}else{if(aL(aI,"empty")&&aL(av,"select")&&W&&ak){O.removeAllRanges=function(){try{this.docSelection.empty();if(this.docSelection.type!="None"){var a2;if(this.anchorNode){a2=aW(this.anchorNode)}else{if(this.docSelection.type==aX){var a0=this.docSelection.createRange();if(a0.length){a2=aW(a0.item(0))}}}if(a2){var a1=aV(a2).createTextRange();a1.select();this.docSelection.empty()}}}catch(aZ){}aB(this)};O.addRange=function(aZ){if(this.docSelection.type==aX){aq(this,aZ)}else{X.WrappedTextRange.rangeToTextRange(aZ).select();this._ranges[0]=aZ;this.rangeCount=1;this.isCollapsed=this._ranges[0].collapsed;P(this,aZ,false)}};O.setRanges=function(aZ){this.removeAllRanges();var a0=aZ.length;if(a0>1){Y(this,aZ)}else{if(a0){this.addRange(aZ[0])}}}}else{R.fail("No means of selecting a Range or TextRange was found");return false}}O.getRangeAt=function(aZ){if(aZ<0||aZ>=this.rangeCount){throw new aK("INDEX_SIZE_ERR")}else{return this._ranges[aZ].cloneRange()}};var ay;if(ak){ay=function(a0){var aZ;if(X.isSelectionValid(a0.win)){aZ=a0.docSelection.createRange()}else{aZ=aV(a0.win.document).createTextRange();aZ.collapse(true)}if(a0.docSelection.type==aX){aj(a0)}else{if(az(aZ)){aD(a0,aZ)}else{aB(a0)}}}}else{if(aL(aI,"getRangeAt")&&typeof aI.rangeCount==aA){ay=function(a1){if(W&&aJ&&a1.docSelection.type==aX){aj(a1)}else{a1._ranges.length=a1.rangeCount=a1.nativeSelection.rangeCount;if(a1.rangeCount){for(var a0=0,aZ=a1.rangeCount;a0<aZ;++a0){a1._ranges[a0]=new X.WrappedRange(a1.nativeSelection.getRangeAt(a0))}P(a1,a1._ranges[a1.rangeCount-1],V(a1.nativeSelection));a1.isCollapsed=ae(a1)}else{aB(a1)}}}}else{if(aF&&typeof aI.isCollapsed==ax&&typeof av.collapsed==ax&&ab.implementsDomRange){ay=function(a1){var aZ,a0=a1.nativeSelection;if(a0.anchorNode){aZ=af(a0,0);a1._ranges=[aZ];a1.rangeCount=1;am(a1);a1.isCollapsed=ae(a1)}else{aB(a1)}}}else{R.fail("No means of obtaining a Range or TextRange from the user's selection was found");return false}}}O.refresh=function(a0){var aZ=a0?this._ranges.slice(0):null;var a2=this.anchorNode,a3=this.anchorOffset;ay(this);if(a0){var a1=aZ.length;if(a1!=this._ranges.length){return true}if(this.anchorNode!=a2||this.anchorOffset!=a3){return true}while(a1--){if(!aC(aZ[a1],this._ranges[a1])){return true}}return false}};var at=function(a3,a1){var a0=a3.getAllRanges();a3.removeAllRanges();for(var a2=0,aZ=a0.length;a2<aZ;++a2){if(!aC(a1,a0[a2])){a3.addRange(a0[a2])}}if(!a3.rangeCount){aB(a3)}};if(W&&aJ){O.removeRange=function(a3){if(this.docSelection.type==aX){var a1=this.docSelection.createRange();var aZ=aG(a3);var a7=aW(a1.item(0));var a5=aV(a7).createControlRange();var a0,a6=false;for(var a2=0,a4=a1.length;a2<a4;++a2){a0=a1.item(a2);if(a0!==aZ||a6){a5.add(a1.item(a2))}else{a6=true}}a5.select();aj(this)}else{at(this,a3)}}}else{O.removeRange=function(aZ){at(this,aZ)}}var V;if(!ak&&aF&&ab.implementsDomRange){V=aU;O.isBackward=function(){return V(this)}}else{V=O.isBackward=function(){return false}}O.isBackwards=O.isBackward;O.toString=function(){var a1=[];for(var a0=0,aZ=this.rangeCount;a0<aZ;++a0){a1[a0]=""+this._ranges[a0]}return a1.join("")};function aQ(a0,aZ){if(a0.win.document!=aW(aZ)){throw new aK("WRONG_DOCUMENT_ERR")}}O.collapse=function(a0,a1){aQ(this,a0);var aZ=X.createRange(a0);aZ.collapseToPoint(a0,a1);this.setSingleRange(aZ);this.isCollapsed=true};O.collapseToStart=function(){if(this.rangeCount){var aZ=this._ranges[0];this.collapse(aZ.startContainer,aZ.startOffset)}else{throw new aK("INVALID_STATE_ERR")}};O.collapseToEnd=function(){if(this.rangeCount){var aZ=this._ranges[this.rangeCount-1];this.collapse(aZ.endContainer,aZ.endOffset)}else{throw new aK("INVALID_STATE_ERR")}};O.selectAllChildren=function(a0){aQ(this,a0);var aZ=X.createRange(a0);aZ.selectNodeContents(a0);this.setSingleRange(aZ)};O.deleteFromDocument=function(){if(W&&aJ&&this.docSelection.type==aX){var a3=this.docSelection.createRange();var a2;while(a3.length){a2=a3.item(0);a3.remove(a2);Q.removeNode(a2)}this.refresh()}else{if(this.rangeCount){var a0=this.getAllRanges();if(a0.length){this.removeAllRanges();for(var a1=0,aZ=a0.length;a1<aZ;++a1){a0[a1].deleteContents()}this.addRange(a0[aZ-1])}}}};O.eachRange=function(a2,a1){for(var a0=0,aZ=this._ranges.length;a0<aZ;++a0){if(a2(this.getRangeAt(a0))){return a1}}};O.getAllRanges=function(){var aZ=[];this.eachRange(function(a0){aZ.push(a0)});return aZ};O.setSingleRange=function(aZ,a0){this.removeAllRanges();this.addRange(aZ,a0)};O.callMethodOnEachRange=function(aZ,a1){var a0=[];this.eachRange(function(a2){a0.push(a2[aZ].apply(a2,a1||[]))});return a0};function aR(aZ){return function(a1,a2){var a0;if(this.rangeCount){a0=this.getRangeAt(0);a0["set"+(aZ?"Start":"End")](a1,a2)}else{a0=X.createRange(this.win.document);a0.setStartAndEnd(a1,a2)}this.setSingleRange(a0,this.isBackward())}}O.setStart=aR(true);O.setEnd=aR(false);X.rangePrototype.select=function(aZ){al(this.getDocument()).setSingleRange(this,aZ)};O.changeEachRange=function(a0){var aZ=[];var a1=this.isBackward();this.eachRange(function(a2){a0(a2);aZ.push(a2)});this.removeAllRanges();if(a1&&aZ.length==1){this.addRange(aZ[0],"backward")}else{this.setRanges(aZ)}};O.containsNode=function(a0,aZ){return this.eachRange(function(a1){return a1.containsNode(a0,aZ)},true)||false};O.getBookmark=function(aZ){return{backward:this.isBackward(),rangeBookmarks:this.callMethodOnEachRange("getBookmark",[aZ])}};O.moveToBookmark=function(a3){var aZ=[];for(var a2=0,a1,a0;a1=a3.rangeBookmarks[a2++];){a0=X.createRange(this.win);a0.moveToBookmark(a1);aZ.push(a0)}if(a3.backward){this.setSingleRange(aZ[0],"backward")}else{this.setRanges(aZ)}};O.saveRanges=function(){return{backward:this.isBackward(),ranges:this.callMethodOnEachRange("cloneRange")}};O.restoreRanges=function(aZ){this.removeAllRanges();for(var a1=0,a0;a0=aZ.ranges[a1];++a1){this.addRange(a0,(aZ.backward&&a1==0))}};O.toHtml=function(){var aZ=[];this.eachRange(function(a0){aZ.push(aP.toHtml(a0))});return aZ.join("")};if(ab.implementsTextRange){O.getNativeTextRange=function(){var a1,a0;if((a1=this.docSelection)){var aZ=a1.createRange();if(az(aZ)){return aZ}else{throw R.createError("getNativeTextRange: selection is a control selection")}}else{if(this.rangeCount>0){return X.WrappedTextRange.rangeToTextRange(this.getRangeAt(0))}else{throw R.createError("getNativeTextRange: selection contains no range")}}}}function ai(a5){var a4=[];var a2=new ar(a5.anchorNode,a5.anchorOffset);var a0=new ar(a5.focusNode,a5.focusOffset);var a1=(typeof a5.getName=="function")?a5.getName():"Selection";if(typeof a5.rangeCount!="undefined"){for(var a3=0,aZ=a5.rangeCount;a3<aZ;++a3){a4[a3]=aP.inspect(a5.getRangeAt(a3))}}return"["+a1+"(Ranges: "+a4.join(", ")+")(anchor: "+a2.inspect()+", focus: "+a0.inspect()+"]"}O.getName=function(){return"WrappedSelection"};O.inspect=function(){return ai(this)};O.detach=function(){aN(this.win,"delete");ap(this)};au.detachAll=function(){aN(null,"deleteAll")};au.inspect=ai;au.isDirectionBackward=U;X.Selection=au;X.selectionPrototype=O;X.addShimListener(function(aZ){if(typeof aZ.getSelection=="undefined"){aZ.getSelection=function(){return al(aZ)}}aZ=null})});var e=false;var L=function(O){if(!e){e=true;if(!h.initialized&&h.config.autoInitialize){K()}}};if(C){if(document.readyState=="complete"){L()}else{if(D(document,"addEventListener")){document.addEventListener("DOMContentLoaded",L,false)}i(window,"load",L)}}return h},this);

/**
 * Class Applier module for Rangy.
 * Adds, removes and toggles classes on Ranges and Selections
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * https://github.com/timdown/rangy
 *
 * Depends on Rangy core.
 *
 * Copyright 2015, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.1-dev
 * Build date: 20 May 2015
 */
(function(factory, root) {
    if (typeof define == "function" && define.amd) {
        // AMD. Register as an anonymous module with a dependency on Rangy.
        define(["./rangy-core"], factory);
    } else if (typeof module != "undefined" && typeof exports == "object") {
        // Node/CommonJS style
        module.exports = factory( require("rangy") );
    } else {
        // No AMD or CommonJS support so we use the rangy property of root (probably the global variable)
        factory(root.rangy);
    }
})(function(rangy) {
    rangy.createModule("ClassApplier", ["WrappedSelection"], function(api, module) {
        var dom = api.dom;
        var DomPosition = dom.DomPosition;
        var contains = dom.arrayContains;
        var util = api.util;
        var forEach = util.forEach;


        var defaultTagName = "span";
        var createElementNSSupported = util.isHostMethod(document, "createElementNS");

        function each(obj, func) {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    if (func(i, obj[i]) === false) {
                        return false;
                    }
                }
            }
            return true;
        }

        function trim(str) {
            return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        }

        function classNameContainsClass(fullClassName, className) {
            return !!fullClassName && new RegExp("(?:^|\\s)" + className + "(?:\\s|$)").test(fullClassName);
        }

        // Inefficient, inelegant nonsense for IE's svg element, which has no classList and non-HTML className implementation
        function hasClass(el, className) {
            if (typeof el.classList == "object") {
                return el.classList.contains(className);
            } else {
                var classNameSupported = (typeof el.className == "string");
                var elClass = classNameSupported ? el.className : el.getAttribute("class");
                return classNameContainsClass(elClass, className);
            }
        }

        function addClass(el, className) {
            if (typeof el.classList == "object") {
                el.classList.add(className);
            } else {
                var classNameSupported = (typeof el.className == "string");
                var elClass = classNameSupported ? el.className : el.getAttribute("class");
                if (elClass) {
                    if (!classNameContainsClass(elClass, className)) {
                        elClass += " " + className;
                    }
                } else {
                    elClass = className;
                }
                if (classNameSupported) {
                    el.className = elClass;
                } else {
                    el.setAttribute("class", elClass);
                }
            }
        }

        var removeClass = (function() {
            function replacer(matched, whiteSpaceBefore, whiteSpaceAfter) {
                return (whiteSpaceBefore && whiteSpaceAfter) ? " " : "";
            }

            return function(el, className) {
                if (typeof el.classList == "object") {
                    el.classList.remove(className);
                } else {
                    var classNameSupported = (typeof el.className == "string");
                    var elClass = classNameSupported ? el.className : el.getAttribute("class");
                    elClass = elClass.replace(new RegExp("(^|\\s)" + className + "(\\s|$)"), replacer);
                    if (classNameSupported) {
                        el.className = elClass;
                    } else {
                        el.setAttribute("class", elClass);
                    }
                }
            };
        })();

        function getClass(el) {
            var classNameSupported = (typeof el.className == "string");
            return classNameSupported ? el.className : el.getAttribute("class");
        }

        function sortClassName(className) {
            return className && className.split(/\s+/).sort().join(" ");
        }

        function getSortedClassName(el) {
            return sortClassName( getClass(el) );
        }

        function haveSameClasses(el1, el2) {
            return getSortedClassName(el1) == getSortedClassName(el2);
        }

        function hasAllClasses(el, className) {
            var classes = className.split(/\s+/);
            for (var i = 0, len = classes.length; i < len; ++i) {
                if (!hasClass(el, trim(classes[i]))) {
                    return false;
                }
            }
            return true;
        }

        function canTextBeStyled(textNode) {
            var parent = textNode.parentNode;
            return (parent && parent.nodeType == 1 && !/^(textarea|style|script|select|iframe)$/i.test(parent.nodeName));
        }

        function movePosition(position, oldParent, oldIndex, newParent, newIndex) {
            var posNode = position.node, posOffset = position.offset;
            var newNode = posNode, newOffset = posOffset;

            if (posNode == newParent && posOffset > newIndex) {
                ++newOffset;
            }

            if (posNode == oldParent && (posOffset == oldIndex  || posOffset == oldIndex + 1)) {
                newNode = newParent;
                newOffset += newIndex - oldIndex;
            }

            if (posNode == oldParent && posOffset > oldIndex + 1) {
                --newOffset;
            }

            position.node = newNode;
            position.offset = newOffset;
        }

        function movePositionWhenRemovingNode(position, parentNode, index) {
            if (position.node == parentNode && position.offset > index) {
                --position.offset;
            }
        }

        function movePreservingPositions(node, newParent, newIndex, positionsToPreserve) {
            // For convenience, allow newIndex to be -1 to mean "insert at the end".
            if (newIndex == -1) {
                newIndex = newParent.childNodes.length;
            }

            var oldParent = node.parentNode;
            var oldIndex = dom.getNodeIndex(node);

            forEach(positionsToPreserve, function(position) {
                movePosition(position, oldParent, oldIndex, newParent, newIndex);
            });

            // Now actually move the node.
            if (newParent.childNodes.length == newIndex) {
                newParent.appendChild(node);
            } else {
                newParent.insertBefore(node, newParent.childNodes[newIndex]);
            }
        }

        function removePreservingPositions(node, positionsToPreserve) {

            var oldParent = node.parentNode;
            var oldIndex = dom.getNodeIndex(node);

            forEach(positionsToPreserve, function(position) {
                movePositionWhenRemovingNode(position, oldParent, oldIndex);
            });

            dom.removeNode(node);
        }

        function moveChildrenPreservingPositions(node, newParent, newIndex, removeNode, positionsToPreserve) {
            var child, children = [];
            while ( (child = node.firstChild) ) {
                movePreservingPositions(child, newParent, newIndex++, positionsToPreserve);
                children.push(child);
            }
            if (removeNode) {
                removePreservingPositions(node, positionsToPreserve);
            }
            return children;
        }

        function replaceWithOwnChildrenPreservingPositions(element, positionsToPreserve) {
            return moveChildrenPreservingPositions(element, element.parentNode, dom.getNodeIndex(element), true, positionsToPreserve);
        }

        function rangeSelectsAnyText(range, textNode) {
            var textNodeRange = range.cloneRange();
            textNodeRange.selectNodeContents(textNode);

            var intersectionRange = textNodeRange.intersection(range);
            var text = intersectionRange ? intersectionRange.toString() : "";

            return text != "";
        }

        function getEffectiveTextNodes(range) {
            var nodes = range.getNodes([3]);

            // Optimization as per issue 145

            // Remove non-intersecting text nodes from the start of the range
            var start = 0, node;
            while ( (node = nodes[start]) && !rangeSelectsAnyText(range, node) ) {
                ++start;
            }

            // Remove non-intersecting text nodes from the start of the range
            var end = nodes.length - 1;
            while ( (node = nodes[end]) && !rangeSelectsAnyText(range, node) ) {
                --end;
            }

            return nodes.slice(start, end + 1);
        }

        function elementsHaveSameNonClassAttributes(el1, el2) {
            if (el1.attributes.length != el2.attributes.length) return false;
            for (var i = 0, len = el1.attributes.length, attr1, attr2, name; i < len; ++i) {
                attr1 = el1.attributes[i];
                name = attr1.name;
                if (name != "class") {
                    attr2 = el2.attributes.getNamedItem(name);
                    if ( (attr1 === null) != (attr2 === null) ) return false;
                    if (attr1.specified != attr2.specified) return false;
                    if (attr1.specified && attr1.nodeValue !== attr2.nodeValue) return false;
                }
            }
            return true;
        }

        function elementHasNonClassAttributes(el, exceptions) {
            for (var i = 0, len = el.attributes.length, attrName; i < len; ++i) {
                attrName = el.attributes[i].name;
                if ( !(exceptions && contains(exceptions, attrName)) && el.attributes[i].specified && attrName != "class") {
                    return true;
                }
            }
            return false;
        }

        var getComputedStyleProperty = dom.getComputedStyleProperty;
        var isEditableElement = (function() {
            var testEl = document.createElement("div");
            return typeof testEl.isContentEditable == "boolean" ?
                function (node) {
                    return node && node.nodeType == 1 && node.isContentEditable;
                } :
                function (node) {
                    if (!node || node.nodeType != 1 || node.contentEditable == "false") {
                        return false;
                    }
                    return node.contentEditable == "true" || isEditableElement(node.parentNode);
                };
        })();

        function isEditingHost(node) {
            var parent;
            return node && node.nodeType == 1 &&
                (( (parent = node.parentNode) && parent.nodeType == 9 && parent.designMode == "on") ||
                (isEditableElement(node) && !isEditableElement(node.parentNode)));
        }

        function isEditable(node) {
            return (isEditableElement(node) || (node.nodeType != 1 && isEditableElement(node.parentNode))) && !isEditingHost(node);
        }

        var inlineDisplayRegex = /^inline(-block|-table)?$/i;

        function isNonInlineElement(node) {
            return node && node.nodeType == 1 && !inlineDisplayRegex.test(getComputedStyleProperty(node, "display"));
        }

        // White space characters as defined by HTML 4 (http://www.w3.org/TR/html401/struct/text.html)
        var htmlNonWhiteSpaceRegex = /[^\r\n\t\f \u200B]/;

        function isUnrenderedWhiteSpaceNode(node) {
            if (node.data.length == 0) {
                return true;
            }
            if (htmlNonWhiteSpaceRegex.test(node.data)) {
                return false;
            }
            var cssWhiteSpace = getComputedStyleProperty(node.parentNode, "whiteSpace");
            switch (cssWhiteSpace) {
                case "pre":
                case "pre-wrap":
                case "-moz-pre-wrap":
                    return false;
                case "pre-line":
                    if (/[\r\n]/.test(node.data)) {
                        return false;
                    }
            }

            // We now have a whitespace-only text node that may be rendered depending on its context. If it is adjacent to a
            // non-inline element, it will not be rendered. This seems to be a good enough definition.
            return isNonInlineElement(node.previousSibling) || isNonInlineElement(node.nextSibling);
        }

        function getRangeBoundaries(ranges) {
            var positions = [], i, range;
            for (i = 0; range = ranges[i++]; ) {
                positions.push(
                    new DomPosition(range.startContainer, range.startOffset),
                    new DomPosition(range.endContainer, range.endOffset)
                );
            }
            return positions;
        }

        function updateRangesFromBoundaries(ranges, positions) {
            for (var i = 0, range, start, end, len = ranges.length; i < len; ++i) {
                range = ranges[i];
                start = positions[i * 2];
                end = positions[i * 2 + 1];
                range.setStartAndEnd(start.node, start.offset, end.node, end.offset);
            }
        }

        function isSplitPoint(node, offset) {
            if (dom.isCharacterDataNode(node)) {
                if (offset == 0) {
                    return !!node.previousSibling;
                } else if (offset == node.length) {
                    return !!node.nextSibling;
                } else {
                    return true;
                }
            }

            return offset > 0 && offset < node.childNodes.length;
        }

        function splitNodeAt(node, descendantNode, descendantOffset, positionsToPreserve) {
            var newNode, parentNode;
            var splitAtStart = (descendantOffset == 0);

            if (dom.isAncestorOf(descendantNode, node)) {
                return node;
            }

            if (dom.isCharacterDataNode(descendantNode)) {
                var descendantIndex = dom.getNodeIndex(descendantNode);
                if (descendantOffset == 0) {
                    descendantOffset = descendantIndex;
                } else if (descendantOffset == descendantNode.length) {
                    descendantOffset = descendantIndex + 1;
                } else {
                    throw module.createError("splitNodeAt() should not be called with offset in the middle of a data node (" +
                        descendantOffset + " in " + descendantNode.data);
                }
                descendantNode = descendantNode.parentNode;
            }

            if (isSplitPoint(descendantNode, descendantOffset)) {
                // descendantNode is now guaranteed not to be a text or other character node
                newNode = descendantNode.cloneNode(false);
                parentNode = descendantNode.parentNode;
                if (newNode.id) {
                    newNode.removeAttribute("id");
                }
                var child, newChildIndex = 0;

                while ( (child = descendantNode.childNodes[descendantOffset]) ) {
                    movePreservingPositions(child, newNode, newChildIndex++, positionsToPreserve);
                }
                movePreservingPositions(newNode, parentNode, dom.getNodeIndex(descendantNode) + 1, positionsToPreserve);
                return (descendantNode == node) ? newNode : splitNodeAt(node, parentNode, dom.getNodeIndex(newNode), positionsToPreserve);
            } else if (node != descendantNode) {
                newNode = descendantNode.parentNode;

                // Work out a new split point in the parent node
                var newNodeIndex = dom.getNodeIndex(descendantNode);

                if (!splitAtStart) {
                    newNodeIndex++;
                }
                return splitNodeAt(node, newNode, newNodeIndex, positionsToPreserve);
            }
            return node;
        }

        function areElementsMergeable(el1, el2) {
            return el1.namespaceURI == el2.namespaceURI &&
                el1.tagName.toLowerCase() == el2.tagName.toLowerCase() &&
                haveSameClasses(el1, el2) &&
                elementsHaveSameNonClassAttributes(el1, el2) &&
                getComputedStyleProperty(el1, "display") == "inline" &&
                getComputedStyleProperty(el2, "display") == "inline";
        }

        function createAdjacentMergeableTextNodeGetter(forward) {
            var siblingPropName = forward ? "nextSibling" : "previousSibling";

            return function(textNode, checkParentElement) {
                var el = textNode.parentNode;
                var adjacentNode = textNode[siblingPropName];
                if (adjacentNode) {
                    // Can merge if the node's previous/next sibling is a text node
                    if (adjacentNode && adjacentNode.nodeType == 3) {
                        return adjacentNode;
                    }
                } else if (checkParentElement) {
                    // Compare text node parent element with its sibling
                    adjacentNode = el[siblingPropName];
                    if (adjacentNode && adjacentNode.nodeType == 1 && areElementsMergeable(el, adjacentNode)) {
                        var adjacentNodeChild = adjacentNode[forward ? "firstChild" : "lastChild"];
                        if (adjacentNodeChild && adjacentNodeChild.nodeType == 3) {
                            return adjacentNodeChild;
                        }
                    }
                }
                return null;
            };
        }

        var getPreviousMergeableTextNode = createAdjacentMergeableTextNodeGetter(false),
            getNextMergeableTextNode = createAdjacentMergeableTextNodeGetter(true);

    
        function Merge(firstNode) {
            this.isElementMerge = (firstNode.nodeType == 1);
            this.textNodes = [];
            var firstTextNode = this.isElementMerge ? firstNode.lastChild : firstNode;
            if (firstTextNode) {
                this.textNodes[0] = firstTextNode;
            }
        }

        Merge.prototype = {
            doMerge: function(positionsToPreserve) {
                var textNodes = this.textNodes;
                var firstTextNode = textNodes[0];
                if (textNodes.length > 1) {
                    var firstTextNodeIndex = dom.getNodeIndex(firstTextNode);
                    var textParts = [], combinedTextLength = 0, textNode, parent;
                    forEach(textNodes, function(textNode, i) {
                        parent = textNode.parentNode;
                        if (i > 0) {
                            parent.removeChild(textNode);
                            if (!parent.hasChildNodes()) {
                                dom.removeNode(parent);
                            }
                            if (positionsToPreserve) {
                                forEach(positionsToPreserve, function(position) {
                                    // Handle case where position is inside the text node being merged into a preceding node
                                    if (position.node == textNode) {
                                        position.node = firstTextNode;
                                        position.offset += combinedTextLength;
                                    }
                                    // Handle case where both text nodes precede the position within the same parent node
                                    if (position.node == parent && position.offset > firstTextNodeIndex) {
                                        --position.offset;
                                        if (position.offset == firstTextNodeIndex + 1 && i < len - 1) {
                                            position.node = firstTextNode;
                                            position.offset = combinedTextLength;
                                        }
                                    }
                                });
                            }
                        }
                        textParts[i] = textNode.data;
                        combinedTextLength += textNode.data.length;
                    });
                    firstTextNode.data = textParts.join("");
                }
                return firstTextNode.data;
            },

            getLength: function() {
                var i = this.textNodes.length, len = 0;
                while (i--) {
                    len += this.textNodes[i].length;
                }
                return len;
            },

            toString: function() {
                var textParts = [];
                forEach(this.textNodes, function(textNode, i) {
                    textParts[i] = "'" + textNode.data + "'";
                });
                return "[Merge(" + textParts.join(",") + ")]";
            }
        };

        var optionProperties = ["elementTagName", "ignoreWhiteSpace", "applyToEditableOnly", "useExistingElements",
            "removeEmptyElements", "onElementCreate"];

        // TODO: Populate this with every attribute name that corresponds to a property with a different name. Really??
        var attrNamesForProperties = {};

        function ClassApplier(className, options, tagNames) {
            var normalize, i, len, propName, applier = this;
            applier.cssClass = applier.className = className; // cssClass property is for backward compatibility

            var elementPropertiesFromOptions = null, elementAttributes = {};

            // Initialize from options object
            if (typeof options == "object" && options !== null) {
                if (typeof options.elementTagName !== "undefined") {
                    options.elementTagName = options.elementTagName.toLowerCase();
                }
                tagNames = options.tagNames;
                elementPropertiesFromOptions = options.elementProperties;
                elementAttributes = options.elementAttributes;

                for (i = 0; propName = optionProperties[i++]; ) {
                    if (options.hasOwnProperty(propName)) {
                        applier[propName] = options[propName];
                    }
                }
                normalize = options.normalize;
            } else {
                normalize = options;
            }

            // Backward compatibility: the second parameter can also be a Boolean indicating to normalize after unapplying
            applier.normalize = (typeof normalize == "undefined") ? true : normalize;

            // Initialize element properties and attribute exceptions
            applier.attrExceptions = [];
            var el = document.createElement(applier.elementTagName);
            applier.elementProperties = applier.copyPropertiesToElement(elementPropertiesFromOptions, el, true);
            each(elementAttributes, function(attrName, attrValue) {
                applier.attrExceptions.push(attrName);
                // Ensure each attribute value is a string
                elementAttributes[attrName] = "" + attrValue;
            });
            applier.elementAttributes = elementAttributes;

            applier.elementSortedClassName = applier.elementProperties.hasOwnProperty("className") ?
                sortClassName(applier.elementProperties.className + " " + className) : className;

            // Initialize tag names
            applier.applyToAnyTagName = false;
            var type = typeof tagNames;
            if (type == "string") {
                if (tagNames == "*") {
                    applier.applyToAnyTagName = true;
                } else {
                    applier.tagNames = trim(tagNames.toLowerCase()).split(/\s*,\s*/);
                }
            } else if (type == "object" && typeof tagNames.length == "number") {
                applier.tagNames = [];
                for (i = 0, len = tagNames.length; i < len; ++i) {
                    if (tagNames[i] == "*") {
                        applier.applyToAnyTagName = true;
                    } else {
                        applier.tagNames.push(tagNames[i].toLowerCase());
                    }
                }
            } else {
                applier.tagNames = [applier.elementTagName];
            }
        }

        ClassApplier.prototype = {
            elementTagName: defaultTagName,
            elementProperties: {},
            elementAttributes: {},
            ignoreWhiteSpace: true,
            applyToEditableOnly: false,
            useExistingElements: true,
            removeEmptyElements: true,
            onElementCreate: null,

            copyPropertiesToElement: function(props, el, createCopy) {
                var s, elStyle, elProps = {}, elPropsStyle, propValue, elPropValue, attrName;

                for (var p in props) {
                    if (props.hasOwnProperty(p)) {
                        propValue = props[p];
                        elPropValue = el[p];

                        // Special case for class. The copied properties object has the applier's class as well as its own
                        // to simplify checks when removing styling elements
                        if (p == "className") {
                            addClass(el, propValue);
                            addClass(el, this.className);
                            el[p] = sortClassName(el[p]);
                            if (createCopy) {
                                elProps[p] = propValue;
                            }
                        }

                        // Special case for style
                        else if (p == "style") {
                            elStyle = elPropValue;
                            if (createCopy) {
                                elProps[p] = elPropsStyle = {};
                            }
                            for (s in props[p]) {
                                if (props[p].hasOwnProperty(s)) {
                                    elStyle[s] = propValue[s];
                                    if (createCopy) {
                                        elPropsStyle[s] = elStyle[s];
                                    }
                                }
                            }
                            this.attrExceptions.push(p);
                        } else {
                            el[p] = propValue;
                            // Copy the property back from the dummy element so that later comparisons to check whether
                            // elements may be removed are checking against the right value. For example, the href property
                            // of an element returns a fully qualified URL even if it was previously assigned a relative
                            // URL.
                            if (createCopy) {
                                elProps[p] = el[p];

                                // Not all properties map to identically-named attributes
                                attrName = attrNamesForProperties.hasOwnProperty(p) ? attrNamesForProperties[p] : p;
                                this.attrExceptions.push(attrName);
                            }
                        }
                    }
                }

                return createCopy ? elProps : "";
            },

            copyAttributesToElement: function(attrs, el) {
                for (var attrName in attrs) {
                    if (attrs.hasOwnProperty(attrName) && !/^class(?:Name)?$/i.test(attrName)) {
                        el.setAttribute(attrName, attrs[attrName]);
                    }
                }
            },

            appliesToElement: function(el) {
                return contains(this.tagNames, el.tagName.toLowerCase());
            },

            getEmptyElements: function(range) {
                var applier = this;
                return range.getNodes([1], function(el) {
                    return applier.appliesToElement(el) && !el.hasChildNodes();
                });
            },

            hasClass: function(node) {
                return node.nodeType == 1 &&
                    (this.applyToAnyTagName || this.appliesToElement(node)) &&
                    hasClass(node, this.className);
            },

            getSelfOrAncestorWithClass: function(node) {
                while (node) {
                    if (this.hasClass(node)) {
                        return node;
                    }
                    node = node.parentNode;
                }
                return null;
            },

            isModifiable: function(node) {
                return !this.applyToEditableOnly || isEditable(node);
            },

            // White space adjacent to an unwrappable node can be ignored for wrapping
            isIgnorableWhiteSpaceNode: function(node) {
                return this.ignoreWhiteSpace && node && node.nodeType == 3 && isUnrenderedWhiteSpaceNode(node);
            },

            // Normalizes nodes after applying a class to a Range.
            postApply: function(textNodes, range, positionsToPreserve, isUndo) {
                var firstNode = textNodes[0], lastNode = textNodes[textNodes.length - 1];

                var merges = [], currentMerge;

                var rangeStartNode = firstNode, rangeEndNode = lastNode;
                var rangeStartOffset = 0, rangeEndOffset = lastNode.length;

                var textNode, precedingTextNode;

                // Check for every required merge and create a Merge object for each
                forEach(textNodes, function(textNode) {
                    precedingTextNode = getPreviousMergeableTextNode(textNode, !isUndo);
                    if (precedingTextNode) {
                        if (!currentMerge) {
                            currentMerge = new Merge(precedingTextNode);
                            merges.push(currentMerge);
                        }
                        currentMerge.textNodes.push(textNode);
                        if (textNode === firstNode) {
                            rangeStartNode = currentMerge.textNodes[0];
                            rangeStartOffset = rangeStartNode.length;
                        }
                        if (textNode === lastNode) {
                            rangeEndNode = currentMerge.textNodes[0];
                            rangeEndOffset = currentMerge.getLength();
                        }
                    } else {
                        currentMerge = null;
                    }
                });

                // Test whether the first node after the range needs merging
                var nextTextNode = getNextMergeableTextNode(lastNode, !isUndo);

                if (nextTextNode) {
                    if (!currentMerge) {
                        currentMerge = new Merge(lastNode);
                        merges.push(currentMerge);
                    }
                    currentMerge.textNodes.push(nextTextNode);
                }

                // Apply the merges
                if (merges.length) {
                    for (i = 0, len = merges.length; i < len; ++i) {
                        merges[i].doMerge(positionsToPreserve);
                    }

                    // Set the range boundaries
                    range.setStartAndEnd(rangeStartNode, rangeStartOffset, rangeEndNode, rangeEndOffset);
                }
            },

            createContainer: function(parentNode) {
                var doc = dom.getDocument(parentNode);
                var namespace;
                var el = createElementNSSupported && !dom.isHtmlNamespace(parentNode) && (namespace = parentNode.namespaceURI) ?
                    doc.createElementNS(parentNode.namespaceURI, this.elementTagName) :
                    doc.createElement(this.elementTagName);

                this.copyPropertiesToElement(this.elementProperties, el, false);
                this.copyAttributesToElement(this.elementAttributes, el);
                addClass(el, this.className);
                if (this.onElementCreate) {
                    this.onElementCreate(el, this);
                }
                return el;
            },

            elementHasProperties: function(el, props) {
                var applier = this;
                return each(props, function(p, propValue) {
                    if (p == "className") {
                        // For checking whether we should reuse an existing element, we just want to check that the element
                        // has all the classes specified in the className property. When deciding whether the element is
                        // removable when unapplying a class, there is separate special handling to check whether the
                        // element has extra classes so the same simple check will do.
                        return hasAllClasses(el, propValue);
                    } else if (typeof propValue == "object") {
                        if (!applier.elementHasProperties(el[p], propValue)) {
                            return false;
                        }
                    } else if (el[p] !== propValue) {
                        return false;
                    }
                });
            },

            elementHasAttributes: function(el, attrs) {
                return each(attrs, function(name, value) {
                    if (el.getAttribute(name) !== value) {
                        return false;
                    }
                });
            },

            applyToTextNode: function(textNode, positionsToPreserve) {

                // Check whether the text node can be styled. Text within a <style> or <script> element, for example,
                // should not be styled. See issue 283.
                if (canTextBeStyled(textNode)) {
                    var parent = textNode.parentNode;
                    if (parent.childNodes.length == 1 &&
                        this.useExistingElements &&
                        this.appliesToElement(parent) &&
                        this.elementHasProperties(parent, this.elementProperties) &&
                        this.elementHasAttributes(parent, this.elementAttributes)) {

                        addClass(parent, this.className);
                    } else {
                        var textNodeParent = textNode.parentNode;
                        var el = this.createContainer(textNodeParent);
                        textNodeParent.insertBefore(el, textNode);
                        el.appendChild(textNode);
                    }
                }

            },

            isRemovable: function(el) {
                return el.tagName.toLowerCase() == this.elementTagName &&
                    getSortedClassName(el) == this.elementSortedClassName &&
                    this.elementHasProperties(el, this.elementProperties) &&
                    !elementHasNonClassAttributes(el, this.attrExceptions) &&
                    this.elementHasAttributes(el, this.elementAttributes) &&
                    this.isModifiable(el);
            },

            isEmptyContainer: function(el) {
                var childNodeCount = el.childNodes.length;
                return el.nodeType == 1 &&
                    this.isRemovable(el) &&
                    (childNodeCount == 0 || (childNodeCount == 1 && this.isEmptyContainer(el.firstChild)));
            },

            removeEmptyContainers: function(range) {
                var applier = this;
                var nodesToRemove = range.getNodes([1], function(el) {
                    return applier.isEmptyContainer(el);
                });

                var rangesToPreserve = [range];
                var positionsToPreserve = getRangeBoundaries(rangesToPreserve);

                forEach(nodesToRemove, function(node) {
                    removePreservingPositions(node, positionsToPreserve);
                });

                // Update the range from the preserved boundary positions
                updateRangesFromBoundaries(rangesToPreserve, positionsToPreserve);
            },

            undoToTextNode: function(textNode, range, ancestorWithClass, positionsToPreserve) {
                if (!range.containsNode(ancestorWithClass)) {
                    // Split out the portion of the ancestor from which we can remove the class
                    //var parent = ancestorWithClass.parentNode, index = dom.getNodeIndex(ancestorWithClass);
                    var ancestorRange = range.cloneRange();
                    ancestorRange.selectNode(ancestorWithClass);
                    if (ancestorRange.isPointInRange(range.endContainer, range.endOffset)) {
                        splitNodeAt(ancestorWithClass, range.endContainer, range.endOffset, positionsToPreserve);
                        range.setEndAfter(ancestorWithClass);
                    }
                    if (ancestorRange.isPointInRange(range.startContainer, range.startOffset)) {
                        ancestorWithClass = splitNodeAt(ancestorWithClass, range.startContainer, range.startOffset, positionsToPreserve);
                    }
                }

                if (this.isRemovable(ancestorWithClass)) {
                    replaceWithOwnChildrenPreservingPositions(ancestorWithClass, positionsToPreserve);
                } else {
                    removeClass(ancestorWithClass, this.className);
                }
            },

            splitAncestorWithClass: function(container, offset, positionsToPreserve) {
                var ancestorWithClass = this.getSelfOrAncestorWithClass(container);
                if (ancestorWithClass) {
                    splitNodeAt(ancestorWithClass, container, offset, positionsToPreserve);
                }
            },

            undoToAncestor: function(ancestorWithClass, positionsToPreserve) {
                if (this.isRemovable(ancestorWithClass)) {
                    replaceWithOwnChildrenPreservingPositions(ancestorWithClass, positionsToPreserve);
                } else {
                    removeClass(ancestorWithClass, this.className);
                }
            },

            applyToRange: function(range, rangesToPreserve) {
                var applier = this;
                rangesToPreserve = rangesToPreserve || [];

                // Create an array of range boundaries to preserve
                var positionsToPreserve = getRangeBoundaries(rangesToPreserve || []);

                range.splitBoundariesPreservingPositions(positionsToPreserve);

                // Tidy up the DOM by removing empty containers
                if (applier.removeEmptyElements) {
                    applier.removeEmptyContainers(range);
                }

                var textNodes = getEffectiveTextNodes(range);

                if (textNodes.length) {
                    forEach(textNodes, function(textNode) {
                        if (!applier.isIgnorableWhiteSpaceNode(textNode) && !applier.getSelfOrAncestorWithClass(textNode) &&
                                applier.isModifiable(textNode)) {
                            applier.applyToTextNode(textNode, positionsToPreserve);
                        }
                    });
                    var lastTextNode = textNodes[textNodes.length - 1];
                    range.setStartAndEnd(textNodes[0], 0, lastTextNode, lastTextNode.length);
                    if (applier.normalize) {
                        applier.postApply(textNodes, range, positionsToPreserve, false);
                    }

                    // Update the ranges from the preserved boundary positions
                    updateRangesFromBoundaries(rangesToPreserve, positionsToPreserve);
                }

                // Apply classes to any appropriate empty elements
                var emptyElements = applier.getEmptyElements(range);

                forEach(emptyElements, function(el) {
                    addClass(el, applier.className);
                });
            },

            applyToRanges: function(ranges) {

                var i = ranges.length;
                while (i--) {
                    this.applyToRange(ranges[i], ranges);
                }


                return ranges;
            },

            applyToSelection: function(win) {
                var sel = api.getSelection(win);
                sel.setRanges( this.applyToRanges(sel.getAllRanges()) );
            },

            undoToRange: function(range, rangesToPreserve) {
                var applier = this;
                // Create an array of range boundaries to preserve
                rangesToPreserve = rangesToPreserve || [];
                var positionsToPreserve = getRangeBoundaries(rangesToPreserve);


                range.splitBoundariesPreservingPositions(positionsToPreserve);

                // Tidy up the DOM by removing empty containers
                if (applier.removeEmptyElements) {
                    applier.removeEmptyContainers(range, positionsToPreserve);
                }

                var textNodes = getEffectiveTextNodes(range);
                var textNode, ancestorWithClass;
                var lastTextNode = textNodes[textNodes.length - 1];

                if (textNodes.length) {
                    applier.splitAncestorWithClass(range.endContainer, range.endOffset, positionsToPreserve);
                    applier.splitAncestorWithClass(range.startContainer, range.startOffset, positionsToPreserve);
                    for (var i = 0, len = textNodes.length; i < len; ++i) {
                        textNode = textNodes[i];
                        ancestorWithClass = applier.getSelfOrAncestorWithClass(textNode);
                        if (ancestorWithClass && applier.isModifiable(textNode)) {
                            applier.undoToAncestor(ancestorWithClass, positionsToPreserve);
                        }
                    }
                    // Ensure the range is still valid
                    range.setStartAndEnd(textNodes[0], 0, lastTextNode, lastTextNode.length);


                    if (applier.normalize) {
                        applier.postApply(textNodes, range, positionsToPreserve, true);
                    }

                    // Update the ranges from the preserved boundary positions
                    updateRangesFromBoundaries(rangesToPreserve, positionsToPreserve);
                }

                // Remove class from any appropriate empty elements
                var emptyElements = applier.getEmptyElements(range);

                forEach(emptyElements, function(el) {
                    removeClass(el, applier.className);
                });
            },

            undoToRanges: function(ranges) {
                // Get ranges returned in document order
                var i = ranges.length;

                while (i--) {
                    this.undoToRange(ranges[i], ranges);
                }

                return ranges;
            },

            undoToSelection: function(win) {
                var sel = api.getSelection(win);
                var ranges = api.getSelection(win).getAllRanges();
                this.undoToRanges(ranges);
                sel.setRanges(ranges);
            },

            isAppliedToRange: function(range) {
                if (range.collapsed || range.toString() == "") {
                    return !!this.getSelfOrAncestorWithClass(range.commonAncestorContainer);
                } else {
                    var textNodes = range.getNodes( [3] );
                    if (textNodes.length)
                    for (var i = 0, textNode; textNode = textNodes[i++]; ) {
                        if (!this.isIgnorableWhiteSpaceNode(textNode) && rangeSelectsAnyText(range, textNode) &&
                                this.isModifiable(textNode) && !this.getSelfOrAncestorWithClass(textNode)) {
                            return false;
                        }
                    }
                    return true;
                }
            },

            isAppliedToRanges: function(ranges) {
                var i = ranges.length;
                if (i == 0) {
                    return false;
                }
                while (i--) {
                    if (!this.isAppliedToRange(ranges[i])) {
                        return false;
                    }
                }
                return true;
            },

            isAppliedToSelection: function(win) {
                var sel = api.getSelection(win);
                return this.isAppliedToRanges(sel.getAllRanges());
            },

            toggleRange: function(range) {
                if (this.isAppliedToRange(range)) {
                    this.undoToRange(range);
                } else {
                    this.applyToRange(range);
                }
            },

            toggleSelection: function(win) {
                if (this.isAppliedToSelection(win)) {
                    this.undoToSelection(win);
                } else {
                    this.applyToSelection(win);
                }
            },

            getElementsWithClassIntersectingRange: function(range) {
                var elements = [];
                var applier = this;
                range.getNodes([3], function(textNode) {
                    var el = applier.getSelfOrAncestorWithClass(textNode);
                    if (el && !contains(elements, el)) {
                        elements.push(el);
                    }
                });
                return elements;
            },

            detach: function() {}
        };

        function createClassApplier(className, options, tagNames) {
            return new ClassApplier(className, options, tagNames);
        }

        ClassApplier.util = {
            hasClass: hasClass,
            addClass: addClass,
            removeClass: removeClass,
            getClass: getClass,
            hasSameClasses: haveSameClasses,
            hasAllClasses: hasAllClasses,
            replaceWithOwnChildren: replaceWithOwnChildrenPreservingPositions,
            elementsHaveSameNonClassAttributes: elementsHaveSameNonClassAttributes,
            elementHasNonClassAttributes: elementHasNonClassAttributes,
            splitNodeAt: splitNodeAt,
            isEditableElement: isEditableElement,
            isEditingHost: isEditingHost,
            isEditable: isEditable
        };

        api.CssClassApplier = api.ClassApplier = ClassApplier;
        api.createClassApplier = createClassApplier;
        util.createAliasForDeprecatedMethod(api, "createCssClassApplier", "createClassApplier", module);
    });
    
    return rangy;
}, this);