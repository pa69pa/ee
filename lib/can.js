var MNLoc={
 d:document.documentElement.lang
,n:navigator.language || navigator.userLanguage
,c:getMNCookie('lang')
/** work with array
 — w = undefined/null for return all array OR = array of new value
 — context this = array is here (ex. ico, hit) — ex: MNLoc.arr.call(ico,{wait:'my.png'}) */
,arr:function(w){
  for(var k in w)if(this[k]!=undefined)this[k]=w[k];
  return this
 }
/**use:  MNLoc.loadScript( "second.js", {async:false}, function(){ ... } ); */
,loadScript:function(url,ar,cb){
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = url;
  for(var k in ar){s[k]=ar[k];console.log('==',k,'=',s[k])};
  s.onload = function(){cb()};
//  document.getElementsByTagName("head")[0].appendChild(s);
  $('head').append(s)
 }
}
/** Working for language on page
* loc = location (and id) for langs-json-files, ex. with { "s":"Выберите плиз" }
* langsArr = array of lang, ex. ['en','ru']
* sel = true/false — create/not <select> for langsArr ??????????????????????????????????????
* use: var l=setMNLangs('lib/langs/pmn',['ru','en']);
*/
function setMNLangs(loc,langsArr,sel){
 var l = MNLoc.d || MNLoc.c || MNLoc.n;
 l=l.substring(0,2).toLowerCase();
 if ($.inArray(l,langsArr)<0) l = 'en';//console.log('LLL l=',l,' d=',MNLoc.d,' c=',MNLoc.c,' n=',MNLoc.n)
 var o={
  id:loc
 ,lang:l
/** Words for js message. Use: l.w('s',"Select please") */
 ,w:function(k,enW){var s=this.data[k];return (l=='en')?enW:((s)?s:enW)}
 }

 var cb = function(data){if(data!=null)o.data=data}

 if(l!='en') $.getJSON(loc+"."+l+".json", cb);

 return o
}
/** Working with font «Material Icons» from Google
*/
var MNFontIcons=[];
function setMNFontIcons(iconsArr){
 MNFontIcons.push(iconsArr)
}
function getMNFontIcons(){ if(!document.getElementById('mnFontIcons')){
var s="";

$('script').each(function(){
 s=$(this).attr('src')
 if(s){
  s=s.split('/');
  s=s[s.length-1];
  if(s.slice(0,6)=='can.js'){
	s=s.split('?')[1];
	if(!s)s="";//console.log('getMNFontIcons each s=',s)
	return false;
 }}
});

var a={};
for(var i=0; i<MNFontIcons.length; i++){
 $.each(MNFontIcons[i],function(k,v){if(v[0]=='&')a[v]=k});
};
a=Object.keys(a);//console.log('getMNFontIcons a=',a)

if(a.length>0)s=s+a.join('');

if(s){//console.log('getMNFontIcons s=',s)
$('head').append('<link id="mnFontIcons" rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons&text='+s+'">').append("<style>\
.mico{\
font-family:'Material Icons';\
font-weight:normal;\
font-style:normal;\
font-size:24px;/*Preferred icon size*/\
display:inline-block;\
line-height:1;\
text-transform:none;\
letter-spacing:normal;\
word-wrap:normal;\
white-space:nowrap;\
direction:ltr;\
-webkit-font-smoothing:antialiased;/*Support for all WebKit browsers*/\
text-rendering:optimizeLegibility;/*Support for Safari and Chrome*/\
-moz-osx-font-smoothing:grayscale;/*Support for Firefox*/\
font-feature-settings:'liga';/*Support for IE*/\
}</style>")
}}}

/** set scroll on $(this).data('mnScrollParent') that $(this) will be visible
* if mnScrollParent==null then get $(this).parent()
* element for scrolling is element with {overflow-y:auto}
*/
function setMNScrollView(){//console.log('scrollView ',this,' SP',$(this).data('mnScrollParent'))
 var p=$(this).data('mnScrollParent');
//console.log('pONE',p)
 if(p==null)p=$(this).parent();
//console.log('pTWO',p)

//console.log('p.children:first',$("> :first", p))

 var pp=parseInt(p.css('padding-top'))
 ,pm=parseInt(p.css('marging-top'))
 ,pb=parseInt(p.css('border-top-width'));
 var ps=(isNaN(pp)?0:pp) + (isNaN(pm)?0:pm) + (isNaN(pb)?0:pb);
//console.log('SP top:\npadding',pp,'\nmarging',pm,'\nborder',pb,'\nсумма',ps)
 var ct=p.children(":first").offset().top;
 var it=$(this).offset().top;
 var pt=p.offset().top+ps;
//console.log('setMNScrollView 1','\nitemTop',it,'\nchildTop',ct,'\n parTop',pt)

 if(pt!=it){
  if(pt > it)p.animate({scrollTop: (it-ct)},500);
  else{
   var ib=it+$(this).height();
   var pb=pt+p.height();
//console.log('setMNScrollView 2','\nitemHeight',$(this).height(),'\nparHeight',p.height(),'\nitemBottom',ib,'\nparBottom',pb,'\nсдвиг на',(ib-pb+5),'\nтекущая поз',(pt-ct),'\nсдвиг до',(pt-ct+ib-pb+4))
   if(ib > pb)p.animate({scrollTop: (pt-ct+ib-pb+4)},500);
  }
 }
}
$.fn.extend({
    /** item $(this) inside parent elem
 set scroll on $(this).data('mnScrollParent') that $(this) will be visible */
    scrollView:setMNScrollView
});

// возвращает cookie с именем name, если есть, если нет, то undefined
function getMNCookie(name) {
 var matches = document.cookie.match(new RegExp(
	"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
 ));
 return matches ? decodeURIComponent(matches[1]) : undefined;
}
// устанавливает cookie с именем name и значением value по умолчанию на 60 дней
// o - объект с свойствами cookie (expires, path, domain, secure)
function setMNCookie(name, value, o) {
 o = o || {};
 var p = o.path;

 var e = o.expires;
 if(e==null)e=5184000;

 var d = new Date();
 d.setTime(d.getTime() + e * 1000);
 e = o.expires = d;
 if (e.toUTCString)o.expires = e.toUTCString();

 value = encodeURIComponent(value);
 var c = name+"="+value;

 for(var k in o){
	c += "; " + k;
	var v = o[k];
	if (v !== true)c += "=" + v;
 }
 if(p==null)c += ";path=/";

 document.cookie = c;
}
// удаляет cookie с именем name
function delMNCookie(name) {
 setMNCookie(name, "", {expires: -1})
}
