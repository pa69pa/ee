/*
 * Eeeeasy editor v0.1.0 - jQuery plugin for make web-editor. https://github.com/pa69pa/ee
 * (c) pa69pa 2018
 */
(function($){
 var E=-1;
 var lem={'min-height':'1em','_height':'1em'};
 var ignKey=[16,17,18,20,27,225];
 var l={};
 var ico={
	i:'&#xE23F;'
	,b:'&#xE238;'
	,l:'&#xE250;'
	,seta:'&#xE15F;'
 };
 if(typeof setMNFontIcons !== 'undefined')setMNFontIcons(ico);

/*****************************
* Init ALL
* inside $( document ).ready(function() {   ...   }
* a = array of editor_fields and buttons
* this = $(root_block) where make EE
*/
$.fn.makeEE=function(a){//console.log('MAKE EE=',this,' arr=',a)
 E++;
 if(E==0){
	if(typeof setMNLangs !== 'undefined')l=setMNLangs('lib/langs/ee',['ru','en']);
 }
 if(typeof getMNFontIcons !== 'undefined')getMNFontIcons();
 this.addClass('ee-root');
 var m = $('<div class="ee-cel colspan menu">');
 m.appendTo(this);
 this.ee={menu:m,es:[],ks:{}};

 addB.call(this,[ico.i,[band,unba],'mico',{key:[73,"ctrlKey"],tag:'I',com:'italic'}]);
 addB.call(this,[ico.b,[band,unba],'mico',{key:[66,"ctrlKey"],tag:'B',com:'bold'}]);
 addB.call(this,[ico.l,[geta,unba],'mico',
	{
	  key:[76,"ctrlKey"]
	 ,tag:'A',attr:'href',pre:'http://'
	 ,com:['createLink','unlink']
	}]);

 if(a!=null){
	var r=this;
	$.each(a,function(k,v){
	 if(k.slice(0,4)=="butt") addB.call(r,v);
	 else addE.call(r,k,v);
	})
 }else addE.call(this);

 var s=$('<div id="ee-edit'+E+this.ee.es.length+'" class="ee-stat" contenteditable />');
 s.css(lem).focus(staf.bind(this)).appendTo(this);
 aniEnd(s);
 this.ee.stat=s;
 var b = $('<i class="ee-button ee-seta mico">'+ico.seta+'</i>').css('display','none');
 b.mousedown(function(e){e.preventDefault();
	if(seta.call($(this),e))$(this).addClass('ee-shadow-pulse')})
 .mouseup(function(e){e.preventDefault();//foc()
}).appendTo(this);
 aniEnd(b);
 this.ee.statB=b;
 s.bind("keydown", function(e){
	if(e.ctrlKey && e.keyCode==13){
		b.mousedown();
		e.preventDefault();
	}
 })

 this.ee.addButton=addB.bind(this);
 this.ee.lang=l;
//console.log('EE',this.ee)
 return this
};/////// End $.fn.makeEE

/*****************************
* Event on animationend
*/
function aniEnd(b){
 b.on('cssanimationend animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
	function(){$(this).removeClass('ee-shadow-pulse')});
}
/*****************************
* Set tag and/or attribute on selected text
* e = jQuery Event on mousedown
* this = $(button)
*/
function seta(e){//console.log('SETA this=',this,' e=',e)
 var ed = this.data('eeFocus');
 var ee = ed.data('rootEE').ee;
 var e4 = this.data('fortEE');
 var at = ee.stat.text().trim();
//console.log('SETA attr=',at,' focus=',ed)
 if(at==null || at=='')return false;

 foc.call(this);
 return bandEx.call(this,ed.data('rngEE'),e4,at)
}
/*****************************
* On event on focus on status_line
— when from editor_field under caret see attribute (ex. 'href') at status_line
— and go to edit it — change focus on status_line
* this = $(root_block) where make EE
*/
function staf(e){//console.log('STAF this=',this,this.ee.stat.data('mType'))
 var s=this.ee.stat;
 if(s.data('mType')=='TA'){
	var b=this.ee.statB;
	b.fadeIn();
	var ed=b.data('eeFocus');
	var rng=ed.data('rngEE');

//	if(rng.collapsed){
		var n=selCu.call(ed,rng,b.data('fortEE'));
		n.className += " ee-shadow-beacon";
		s.data('mType',null);
		s.focus();
		var rnS = document.createRange();
		rnS.selectNode(s[0].firstChild);
		rnS.collapse(false);
		var sel=window.getSelection();
		sel.removeAllRanges();
		sel.addRange(rnS);
//console.log('STAF n=',n)
//	}else{
//console.log('STAF rng=',rng)
//	}
 }
}
/*****************************
* Take selected text into NEW tags with attribute
* here we go to confirm an attribute for tag
* e = jQuery Event on mousedown
* this = focused editor_field
*/
function geta(e){//console.log('GETA this=',this)
 var rng = rnget(this);

 var ee=this.data('rootEE').ee;
 if(rng.collapsed){
	 setM.call(ee.stat,l.w('s',"Select anything please"),'sel');
	 return false
 }

 var b=$(e.target);
 b.data('eeFocus',null);
 var e4=b.data('fortEE');
 if(bandEx.call(this,rng,e4,e4.pre)){
	rng=window.getSelection().getRangeAt(0);
	this.data('rngEE',rng);
	setA.call(ee.stat,'');
	ee.statB.data('fortEE',e4).data('eeFocus',this).fadeIn();
	ee.stat.attr('placeholder',e4.pre).data('mType','GA');

	//console.log('GetTA rng',rng)
	var n=selCu.call(this,rng,e4);
	n.className += " ee-shadow-beacon";

	ee.stat.focus()
 }
 return false;
};
/*****************************
* Take selected text into tags
* e = jQuery Event on mousedown
* this = focused editor_field
*/
function band(e){//console.log('BAND this=',this)
 var rng = rnget(this);

// if(rng.startContainer==rng.endContainer && rng.startOffset==rng.endOffset){
 if(rng.collapsed){
	 setM.call(this.data('rootEE').ee.stat,l.w('s',"Select anything please"),'sel');
	 return false
 }
 return bandEx.call(this,rng,$(e.target).data('fortEE'))
};
/*****************************
* Create new tag for band() throu document.execCommand
* rng = Range
* e4 = button.data('fortEE')
* this = focused editor_field
*/
function bandEx(rng,e4,attr){//console.log('BAND-Ex rng=',rng,' com=',e4.com)
 var c = e4.com;
 if(c==null)return bandEl(rng,e4);
 else{	if(document.execCommand(((typeof c == 'string')?c:c[0]), false, attr)){
		this.data('rngEE',window.getSelection().getRangeAt(0));
		return true;
	}else return bandEl(rng,e4)
 }
};
/*****************************
* Create new tag for bandEx() throu document.createElement
* rng = Range
* e4 = button.data('fortEE')
*/
function bandEl(rng,e4){//console.log('BAND-El rng=',rng,' tag=',e4.tag)
 var t = e4.tag;
 var el = document.createElement(t);
 try {
	rng.surroundContents(el);
 }catch (err){
	var c = rng.cloneContents();//console.log('BAND-El cloneContents=',c)
	if(c==null)el.innerHTML = rng.toString();
	else el.appendChild(c);
	rng.deleteContents();
	rng.insertNode(el);
 }
 return true
};
/*****************************
* Remove anchor tag from select\caret text under cursor
* e = jQuery Event on mousedown
* this = focused editor_field
*/
function unba(e){//console.log('UNBA this=',this)
 var rng = rnget(this);

 var e4 = $(e.target).data('fortEE');
 var n=null;
 if(rng.collapsed)n=selCu.call(this,rng,e4);

 var c = e4.com;
 if(c==null)return unbaEl(rng,((n==null)?selCu.call(this,rng,e4):n));
 else{	if(document.execCommand(((typeof c == 'string')?c:c[1]), false, null))return true;
	else return unbaEl(rng,((n==null)?selCu.call(this,rng,e4):n));
 }
};
/*****************************
* Get current range from editor_field or new
* f = focused editor_field
*/
function rnget(f){//console.log('UNBA this=',this)
 var rng = f.data('rngEE');
 if(rng==null)rng=window.getSelection().getRangeAt(0);
 return rng
};
/*****************************
* Select node under cursor — for unba() & staf()
* rng = Range
* e4 = $(button).data('fortEE')
* this = focused editor_field
* return = selected node
*/
function selCu(rng,e4){//console.log('selCu this=',this,' rng',rng)
 var aP = $(this).data('rngAP');
 var aT = $(this).data('rngAT');
 if(aP==null || aT==null || aP.length==0 || aT.length==0){
//console.log('selCu 111 aP=',aP,' aT',aT)
	aP=[];aT=[];
	getP(rng.startContainer.parentNode,aP,aT)
 };
//console.log('selCu aP=',aP,' aT',aT)
 var t = e4.tag;
 var j = $.inArray(t,aT);//console.log('selCu myNode=',aP[j])//,' inner=',aP[j].innerHTML)
 rng.selectNode(aP[j]);
 return aP[j];
};
/*****************************
* Remove anchor tag from text under cursor — for unba()
* rng = Range
* nod = selected node
*/
function unbaEl(rng,nod){//console.log('UNBA-El this=',this)
 var el = document.createElement("div");
 el.innerHTML = nod.innerHTML;
 var n, df = document.createDocumentFragment();
 while((n = el.firstChild)){
	df.appendChild(n);
 }
 rng.deleteContents();
 rng.insertNode(df);
 return true
};

/*****************************
* Adding new button
* a = [button_array]
* this = $(root_block) where make EE
*/
function addB(a){//console.log('addB this=',this,' arr=',a)
 var b,n;
 if(typeof a[0] == 'string') b=a[0];
 else{b=a[0][0];n=a[0][1]}

 b = $('<i class="ee-button">'+b+'</i>');
 if(n!=null) b.data('nameTog',n);
 if(a[2]!=null) (typeof a[2] == 'string')?b.addClass(a[2]):b.css(a[2]);
 if(a[3]!=null){
	b.data('fortEE',a[3]);
	if(a[3].tag!=null)b.addClass('ee-tag');
	if(a[3].attr!=null)b.addClass('ee-attr');
	if(a[3].key!=null){
	 if(typeof a[3].key == 'string') this.ee.ks.char.push([a[3].key,b]);
	 else{
		if(this.ee.ks[a[3].key[1]]==null)this.ee.ks[a[3].key[1]]=[];
		this.ee.ks[a[3].key[1]].push([a[3].key[0],b])
	 }
	}
 }else b.data('fortEE',{});

 b.data('fortEE').func=a[1];
 b.appendTo(this.ee.menu);

 var r = this;
 if(typeof a[1] == 'function'){// easy button
	b.mousedown(function(e){
		if(clk.call(a[1],r,e))b.addClass('ee-shadow-pulse')
	});
	//b.bind("touchstart",clk.bind(a[1],r,b));//////////??????????????????????????????
	aniEnd(b)

 }else{// toggle button
	b.mousedown(clkT.bind(b,a[1],r));
	//b.bind("touchstart",clkT.bind(b,a[1],r));///////////???????????????????????????????
 };
 //b.mouseup(foc);
 b.mouseup(function(e){e.preventDefault();foc()})
 return b
};
/*****************************
* Click on toggle button
* f = [ func_on_down, func_on_up ]
* r = $(root_block) where make EE
* e = jQuery Event on mousedown
* this = $(button)
*/
function clkT(f,r,e){//console.log('CLK TOGGLE button=',this,' event=',e,' root=',r,' func=',f)
 if(this.hasClass('ee-toggle')){
	if(clk.call(f[1],r,e))setT.call(this,false)
 }else{
	if(clk.call(f[0],r,e))setT.call(this,true)
 }
};
/*****************************
* Set CSS if down or up toggle was happy
* v = true — make toggle_button as down OR v = false — as up
* this = $(button)
*/
function setT(v){
 //var t = this.data('eeToggle');
 //this.data('eeToggle',!t);

 if(v)this.addClass('ee-toggle');
 else this.removeClass('ee-toggle');

 var n = this.data('nameTog');
 if(n!=null){
	this.data('nameTog',this.text());
	this.text(n)
 }
};
/*****************************
* Return focus and selectionRange after Click on button
* this = button
*/
function foc(){
 var f = $(this).data('eeFocus');
 if(f!=null){
	f.focus();
	var r=f.data('rngEE');
	if(r){
	 var sel = window.getSelection();
//console.log('FOC start=',r.startContainer,r.startOffset)
	 //r.setEnd(r.startContainer,r.startOffset);
	 //r.collapse(true);
	 sel.removeAllRanges();
	 sel.addRange(r);
	}
 };
 $(this).data('eeFocus',null)
};
/*****************************
* Click on button — has focus? — if has run function
* r = $(root_block) where make EE
* event = jQuery Event on click
* this = function for click on button
*/
function clk(r,e){//console.log('CLK this=',this,' event=',e,' root=',r)
 //e.stopPropagation();
 e.preventDefault();
 var b = $(e.target);
 if(r.ee.es.length==1){
	b.data('eeFocus',es[0])
	return this.call(r.ee.es[0],e)
 }else{
	var d = null;

	$.each(r.ee.es,function(i){
	 if(this.is(':focus')){d=this;return false}
	});

	if(d==null){
	 setM.call(r.ee.stat,l.w('f',"Set focus please"),'foc');
	 return false
	}else{
	 b.data('eeFocus',d);
	 return this.call(d,e)
	}
 }
};

/*****************************
* Adding new editor_field
* n = label for editor_field
* s = css_array for editor_field
* this = $(root_block) where make EE
*/
function addE(n,s){//console.log('addE this=',this,' es=',this.ee.es)
 var o = $('<div class="ee-cel">');

 if(n!=null && n.slice(0,4)!="null"){
	var r = $('<div class="ee-row">');
	r.append('<div class="ee-cel name">'+n+'&nbsp;</div>').append(o);
	$('<div class="ee-tab">').append(r).appendTo(this);
 }else{
	o.addClass('colspan').appendTo(this);
 }

 var e=$('<div id="ee-edit'+E+this.ee.es.length+'" class="ee-edit" contenteditable />');
 e.appendTo(o);
 this.ee.es.push(e);
 if(s!=null)e.css(s);
 else e.css(lem);

 e.data('rootEE',this);
 e.focus(clearM.bind(this,'foc'));

//click keydown keyup mousedown mouseup
 e.bind("keydown keyup mouseup", function(e){//console.log('ANYKEY this=',this,' e=',e)
	var ee=$(this).data('rootEE').ee;
	if(e.type=='keydown'){
	 e.stopImmediatePropagation();
//console.log('ANYKEY key="',e.key,'"=',e.keyCode,' ctrl=',e.ctrlKey,' alt=',e.altKey,' shift=',e.shiftKey,' meta=',e.metaKey)
	 if(e.ctrlKey && e.keyCode==13){
		document.execCommand('insertHTML', false, '<br><br>');
		return
	 }
	 var x=false;
	 $.each(ee.ks,function(k,v){//console.log('ks[k][v]=',k,v)
		if(e[k])for(var i=0; i<v.length; i++){
		 if(e.keyCode==v[i][0]){//console.log('keYYY=',e.key,'v['+i+']=',v[i][1])
			v[i][1].mousedown();
			e.preventDefault();
			x=true;return
		 }
		}
		if(x)return false
	 })
	 return
	};

	if ($.inArray(e.keyCode,ignKey)>-1) return;
	try{
	 var rng = window.getSelection().getRangeAt(0);//console.log('ANYKEY Range',rng)
//	 var rnG = $(this).data('rngEE');

//console.log('ANYKEY RangeG',rng,rnG)
//rng.compareBoundaryPoints(Range.START_TO_START,rnG),rng.compareBoundaryPoints(Range.END_TO_END,rnG))

//	 if(rnG==null || rng.compareBoundaryPoints(Range.START_TO_START,rnG)!=0 || 
//			rng.compareBoundaryPoints(Range.END_TO_END,rnG)!=0){
		$(this).data('rngEE',rng);

		var aP=[],aT=[];
		getP(rng.startContainer.parentNode,aP,aT);//console.log('aT ==== ',aT)
		$(this).data('rngAP',aP);
		$(this).data('rngAT',aT);

		if(aT.length==0){
		 $('i.ee-tag',ee.menu).removeClass('ee-toggle');
		 clearM.call(ee,null)
		}else{
		 var ed=$(this);
		 $('i.ee-tag',ee.menu).each(function(i){
			var e4=$(this).data('fortEE');
			var j=$.inArray(e4.tag,aT);//console.log('e4',e4,' j=',j)
			if(j<0){
				$(this).removeClass('ee-toggle');
				clearM.call(ee,null)
			}else{
				$(this).addClass('ee-toggle');
				if(e4.attr){
				 ee.statB.data('eeFocus',ed).data('fortEE',e4);
				 setA.call(ee.stat,$(aP[j]).attr(e4.attr));
				}
				else clearM.call(ee,null)
			}
		 })
		};

//if(!(rng.startContainer==rng.endContainer && rng.startOffset==rng.endOffset))
		if(!rng.collapsed)clearM.call(ee,'sel');
//clearM.call(ee,'foc');
//	 }
	}catch(e){
	 console.log('ANYKEY err=',e)
	}
 })
};
/*****************************
* Push to arrays aP and aT the nodes and tag_names from stack parent_nodes pN before tag 'DIV'
*/
function getP(pN,aP,aT){//console.log('getP parentNode=',pN,' tag=',pN.tagName)
 var n=pN.tagName;
 if(n=='DIV')return;
 aP.push(pN);
 aT.push(n);
 getP(pN.parentNode,aP,aT)
};

/*****************************
* Set and Clear Attr or Message on status line
* t = type of message
* s = string for message
* this = $(status_line) — m.b. from .data('rootEE').ee.stat
*/
function setA(s){
 this.text(s).data('mType','TA').removeClass('mesg').addClass('attr');
};
function setM(s,t){
 this.text('> '+s).data('mType',t)
	.removeClass('attr').addClass('mesg').addClass('ee-shadow-pulse');
};
function clearM(t){//console.log('clearM this',this)//this=root OR ee
 var ee = (this.ee)?this.ee:this;
 if(t==null || ee.stat.data('mType')==t)ee.stat.text('')
			.data('mType',null).removeClass('attr').removeClass('mesg')
			.attr('placeholder',null);
 ee.statB.fadeOut();
 $('.ee-edit .ee-shadow-beacon').removeClass('ee-shadow-beacon');
}
})(jQuery)
