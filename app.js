(function(){
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function hex(h){h=h.replace('#','');return [parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255];}
function L(a,b,t){return a+(b-a)*t;}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function sstep(a,b,x){var t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);}
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}
var T0=performance.now();


/* ---------- content + i18n ---------- */
var LANG='en';
try{if(/^#de$/i.test(location.hash))LANG='de';else if(/^#en$/i.test(location.hash))LANG='en';else{var sl=localStorage.getItem('tangent-lang');if(sl==='de'||sl==='en')LANG=sl;}}catch(e){}
var T={
 en:{nav_services:'Services',nav_events:'Events',nav_clients:'Clients',nav_gallery:'Gallery ↗',cta:'Request a proposal',
  h1a:'Premium events,',h1b:'end to end.',lede:'Planning, production and on-site delivery from one Vienna-based team. One point of contact, from the first call to the last guest.',
  def:'a line that touches a circle at exactly one point.',scroll:'Scroll',pre:'Finding the point of contact',
  mani:'An event is a circle of people, light, sound and service. We are the line that touches it at exactly one point: <em>one team, one timeline, one point of contact.</em> Everything else simply works.',
  mani_k:'Event production · Wien',
  svc_h:'Seven services.<br><em>One point of contact.</em>',svc_sub:'One timeline. One contact. One quality bar.',photo:'Photo',svc_sub2:'Every service reaches you through the same point: one team, one timeline, one quality bar.',you:'You',you_k:'ONE POINT OF CONTACT',show_hint:'Scroll to walk through the evening',swipe:'Swipe',t_desc:'An evening for the TOXIC community. All of it by us.',
  show_k:'Showcase',show_desc:'An evening for the TOXIC community. All of it by us.',
  m_date:'Date',m_venue:'Venue',m_time:'Time',m_guests:'Guests',m_services:'Services',date:'1 Oct 2026',
  more_t:'Full gallery',more_s:'All photos from the evening',
  snd_h:'Curated DJs.<br><em>A tempo for every moment.</em>',snd_p:'Our DJs and live acts follow the evening. Pick a genre profile and listen: the stage keeps the beat.',
  cli_h:'Trusted by brands that care about detail.',cli_p:'Selected collaborations in Vienna and beyond, built for long-term partnerships.',
  c_client:'Client',c_show:'Showcase · Oct 2026',c_venue:'Venue partner',
  con_h:'Let’s plan<br><em>your next event.</em>',con_p:'Send date, city, guest count and format. We come back with a clear next step.',
  f_date:'Date',f_city:'City',f_guests:'Guests',f_format:'Format',ph_date:'14 November',send:'Send request',note:'Demo page: the form is not connected.',
  snd_on:'Sound on',snd_off:'Sound off',move:'Move the point',
  sec_hero:'Intro',sec_manifesto:'Studio',sec_cream:'Services',sec_showcase:'Showcase',sec_marq:'Formats',sec_sound:'Music',sec_clients:'Clients',sec_end:'Contact',
  F1:['Grand openings','Brand activations','In-store events','Shopping parties','Vernissages'],F2:['Galas','Cocktail receptions','Dinner parties','Champagne networking','Collaborations'],
  formats:['Grand opening','Brand activation','In-store event','Gala dinner','Vernissage']},
 de:{nav_services:'Leistungen',nav_events:'Events',nav_clients:'Kunden',nav_gallery:'Galerie ↗',cta:'Angebot anfragen',
  h1a:'Premium-Events,',h1b:'von A bis Z.',lede:'Planung, Produktion und Umsetzung vor Ort aus einem Wiener Team. Ein Ansprechpartner, vom ersten Anruf bis zum letzten Gast.',
  def:'eine Gerade, die einen Kreis in genau einem Punkt berührt.',scroll:'Scrollen',pre:'Wir finden den Berührungspunkt',
  mani:'Ein Event ist ein Kreis aus Menschen, Licht, Klang und Service. Wir sind die Gerade, die ihn in genau einem Punkt berührt: <em>ein Team, ein Zeitplan, ein Ansprechpartner.</em> Alles andere funktioniert einfach.',
  mani_k:'Eventproduktion · Wien',
  svc_h:'Sieben Leistungen.<br><em>Ein Ansprechpartner.</em>',svc_sub:'Ein Zeitplan. Ein Kontakt. Ein Qualitätsstandard.',photo:'Foto',svc_sub2:'Jede Leistung erreicht Sie über denselben Punkt: ein Team, ein Zeitplan, ein Qualitätsstandard.',you:'Sie',you_k:'EIN ANSPRECHPARTNER',show_hint:'Scrollen Sie durch den Abend',swipe:'Wischen',t_desc:'Ein Abend für die TOXIC-Community. Alles aus einer Hand.',
  show_k:'Showcase',show_desc:'Ein Abend für die TOXIC-Community. Alles aus einer Hand.',
  m_date:'Datum',m_venue:'Location',m_time:'Zeit',m_guests:'Gäste',m_services:'Leistungen',date:'1. Okt. 2026',
  more_t:'Ganze Galerie',more_s:'Alle Fotos des Abends',
  snd_h:'Kuratierte DJs.<br><em>Ein Tempo für jeden Moment.</em>',snd_p:'Unsere DJs und Live-Acts folgen dem Abend. Wählen Sie ein Genre-Profil und hören Sie rein: Die Bühne hält den Takt.',
  cli_h:'Vertraut von Brands mit Anspruch.',cli_p:'Ausgewählte Kooperationen in Wien und darüber hinaus, für langfristige Zusammenarbeit.',
  c_client:'Kunde',c_show:'Showcase · Okt. 2026',c_venue:'Location-Partner',
  con_h:'Planen wir<br><em>Ihr nächstes Event.</em>',con_p:'Senden Sie Datum, Stadt, Gästezahl und Format. Wir melden uns mit einem klaren nächsten Schritt.',
  f_date:'Datum',f_city:'Stadt',f_guests:'Gäste',f_format:'Format',ph_date:'14. November',send:'Anfrage senden',note:'Demo-Seite: Das Formular ist nicht verbunden.',
  snd_on:'Sound an',snd_off:'Sound aus',move:'Punkt bewegen',
  sec_hero:'Intro',sec_manifesto:'Studio',sec_cream:'Leistungen',sec_showcase:'Showcase',sec_marq:'Formate',sec_sound:'Musik',sec_clients:'Kunden',sec_end:'Kontakt',
  F1:['Grand Openings','Brand Activations','In-Store-Events','Shopping-Partys','Vernissagen'],F2:['Galas','Cocktail-Empfänge','Dinner-Partys','Champagner-Networking','Kollaborationen'],
  formats:['Grand Opening','Brand Activation','In-Store-Event','Gala-Dinner','Vernissage']}
};
function t(k){var v=T[LANG][k];return v!==undefined?v:T.en[k];}
function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
function CL(name,ar,w){return 'https://res.cloudinary.com/dgdozveof/image/upload/c_fill,g_auto,ar_'+ar+',w_'+w+'/f_auto,q_auto/site/home/'+name+'.jpg';}
function pic(src,alt,credit,cls){return '<figure class="pic'+(cls?' '+cls:'')+'"><img src="'+src+'" alt="'+esc(alt)+'" decoding="async"><figcaption><span>'+esc(alt)+'</span>'+(credit?'<em>'+credit+'</em>':'')+'</figcaption></figure>';}
function wirePics(root){[].forEach.call(root.querySelectorAll('.pic img'),function(im){var f=function(){im.parentNode.classList.add('ph');};im.addEventListener('error',f);if(im.complete&&!im.naturalWidth)f();});}
var SV=[
 {img:'dj-decks-bw',credit:'@fia_pictures',alt:'DJ mixing with headphones, black and white',en:['Music & DJs','Curated DJs and live acts.'],de:['Musik & DJs','Kuratierte DJs und Live-Acts.']},
 {img:'card-spritz',credit:'@fia_pictures',alt:'TANGENT EVENTS card beside an Aperol spritz',en:['Bar & catering','Mobile bar, drinks, finger food.'],de:['Bar & Catering','Mobile Bar, Drinks, Fingerfood.']},
 {img:'flowers-buffet-v2',credit:'',alt:'Flower arrangements and fruit on the buffet',en:['Florals & decor','Arrangements and table styling.'],de:['Floristik & Deko','Arrangements und Tischdekoration.']},
 {img:'invitation-einladung',credit:'',alt:'TANGENT EVENTS card and disco-ball stickers in a dark envelope',en:['Invitations & guests','Print and digital invitations, RSVP, QR tickets, check-in.'],de:['Einladungen & Gäste','Print- und Digital-Einladungen, RSVP, QR-Tickets, Check-in.']},
 {img:'welcome-glasses-v2',credit:'',alt:'Welcome drinks being poured into rows of glasses',en:['Hospitality & security','Reception, service staff, door staff.'],de:['Hospitality & Security','Empfang, Servicepersonal, Türpersonal.']},
 {img:'disco-ball-light-v3',credit:'',alt:'Disco ball and light spots on the ceiling',en:['Technical production','Sound, lighting, visuals.'],de:['Technische Produktion','Ton, Licht, Visuals.']},
 {img:'flight-case',credit:'@fia_pictures',alt:'Flight case with the TANGENT EVENTS plate',en:['Operations & permits','Crew, logistics, contracts, permits.'],de:['Operations & Genehmigungen','Crew, Logistik, Verträge, Genehmigungen.']}
];
var GAL=[
 ['guest-sequin-coat','1:2',800,'tall','Guest in a sequin coat','@fia_pictures'],
 ['red-lounge','2:1',1200,'wide','The red lounge with DJ and guests','@vodkasphotos'],
 ['insideout-window','1:1',640,'sq','INSIDEOUT lettering on the venue window','@ml_photo.shoot'],
 ['toxic-sign','1:1',640,'sq','Guest holding a TOXIC sign','@ml_photo.shoot'],
 ['red-jackets','1:1',640,'sq','Three guests, two in red leather jackets','@ml_photo.shoot'],
 ['three-guests-blue','1:1',640,'sq','Three guests in leather jackets and a green suit','@ml_photo.shoot'],
 ['four-guests','1:1',640,'sq','Four guests under the disco ball','@fia_pictures'],
 ['guest-leather','1:1',640,'sq','Guest in a leather jacket and tinted glasses','@fia_pictures'],
 ['guest-bandana','1:1',640,'sq','Guest in a white bandana with a glass of wine','@fia_pictures']
];
var GALLERY_URL='https://www.tangent-events.com/en/gallery/tangent-showcase';
var ROM=['I','II','III','IV','V','VI','VII'];

/* ---------- smooth scroll ---------- */
var lenis=null;
if(!RM&&window.Lenis){try{lenis=new Lenis({duration:1.25,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t));},smoothWheel:true});}catch(e){lenis=null;}}
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href');var el=document.querySelector(id);if(!el)return;e.preventDefault();if(lenis)lenis.scrollTo(el,{duration:1.8});else el.scrollIntoView({behavior:RM?'auto':'smooth'});});});

/* ---------- genres ---------- */
var G=[
  {name:'Disco',bpm:104,range:'96–112',use:'Arrival and aperitivo',de:'Ankunft und Aperitivo',col:'#e3b26e'},
  {name:'Funk & Soul',bpm:112,range:'108–116',use:'Dinner and conversation',de:'Dinner und Gespräche',col:'#e09a5a'},
  {name:'Deep House',bpm:120,range:'118–122',use:'Networking and a calm flow',de:'Networking und ruhiger Flow',col:'#d47a52'},
  {name:'Funky House',bpm:122,range:'120–124',use:'Receptions that warm up',de:'Empfänge, die warm werden',col:'#c7606a'},
  {name:'Afro House',bpm:122,range:'120–124',use:'The room starts to move',de:'Der Raum kommt in Bewegung',col:'#a65590'},
  {name:'Progressive House',bpm:125,range:'122–126',use:'The peak of the night',de:'Der Höhepunkt des Abends',col:'#7e5cd4'}
];

/* ---------- state ---------- */
var S={accBase:hex('#db7a4e'),acc:hex('#db7a4e'),theta:-2.25,thetaT:null,beat:0,age:9,par:[0,0],parT:[0,0],genre:2,
  p:null,stage:'hero',snd:0};
var mobile=function(){return innerWidth<760;};
// pose: x,y = ring centre, s = radius, tilt = rotation about x, i = intensity, snd = genre-colour weight
var POSE={
  hero:     function(m){return m?{x:.22,y:.66,s:.62,tilt:1.22,i:1,snd:0}:{x:1.08,y:.06,s:1.0,tilt:1.2,i:1,snd:0};},
  manifesto:function(m){return m?{x:0,y:.05,s:.95,tilt:.2,i:.85,snd:0}:{x:0,y:-.05,s:1.6,tilt:.18,i:.85,snd:0};},
  marq:     function(m){return m?{x:0,y:-.15,s:1.1,tilt:.1,i:.7,snd:0}:{x:0,y:-.25,s:1.9,tilt:.08,i:.7,snd:0};},
  cream:    function(m){return m?{x:0,y:-.15,s:1.1,tilt:.1,i:.6,snd:0}:{x:0,y:-.25,s:1.9,tilt:.08,i:.6,snd:0};},
  showcase: function(m){return m?{x:0,y:1.55,s:1.3,tilt:.16,i:.5,snd:0}:{x:0,y:1.62,s:2.6,tilt:.1,i:.5,snd:0};},
  sound:    function(m){return m?{x:.08,y:.6,s:.55,tilt:1.52,i:1,snd:1}:{x:1.02,y:.12,s:.84,tilt:1.55,i:1,snd:1};},
  clients:  function(m){return m?{x:-.1,y:.5,s:.5,tilt:.9,i:.6,snd:.3}:{x:-1.35,y:.15,s:.9,tilt:.95,i:.6,snd:.3};},
  end:      function(m){return m?{x:0,y:-1.75,s:1.3,tilt:.16,i:.75,snd:0}:{x:0,y:-1.62,s:2.6,tilt:.1,i:.75,snd:0};}
};
var KEYS=['x','y','s','tilt','i','snd'];
var secs=[].slice.call(document.querySelectorAll('[data-ring]'));
function targetPose(){
  var m=mobile(),Y=scrollY,a=[],i;
  for(i=0;i<secs.length;i++){var r=secs[i].getBoundingClientRect();var top=r.top+Y;a.push({y:i===0?0:Math.max(0,top+Math.min(r.height,innerHeight*1.4)/2-innerHeight/2),n:secs[i].getAttribute('data-ring')});}
  var k=0;for(i=0;i<a.length;i++)if(Y>=a[i].y)k=i;
  var A=a[k],B=a[Math.min(k+1,a.length-1)],u=B.y>A.y?clamp((Y-A.y)/(B.y-A.y),0,1):0;
  u=ease(sstep(.12,.88,u));
  var pa=POSE[A.n](m),pb=POSE[B.n](m),o={};KEYS.forEach(function(q){o[q]=L(pa[q],pb[q],u);});
  var cur=u<.5?A:B;S.stage=cur.n;
  idxN.textContent=('0'+(a.indexOf(cur)+1)).slice(-2);idxL.textContent=t('sec_'+cur.n);
  return o;
}
var idxN=document.getElementById('idxN'),idxL=document.getElementById('idxL');
S.p=targetPose();

/* ---------- accent ---------- */
document.querySelectorAll('.ctl.r button').forEach(function(b,_,all){b.addEventListener('click',function(){
  all.forEach(function(x){x.setAttribute('aria-pressed','false');});b.setAttribute('aria-pressed','true');
  var v=b.getAttribute('data-acc');S.accBase=hex(v);document.documentElement.style.setProperty('--acc',v);});});

/* ---------- WebGL stage ---------- */
var cv=document.getElementById('stage'),gl=null;
try{gl=cv.getContext('webgl',{antialias:false,alpha:false,powerPreference:'high-performance'});}catch(e){}
var FS=[
'precision highp float;',
'uniform vec2 uRes;uniform float uTime,uTh,uBeat,uTilt,uInt,uRev,uAge,uSnd;uniform vec3 uAcc,uRing;uniform vec2 uPar;',
'mat3 rx(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}',
'mat3 ry(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}',
'float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
'float ns(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1.,0.)),f.x),mix(h21(i+vec2(0.,1.)),h21(i+vec2(1.,1.)),f.x),f.y);}',
'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*ns(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}',
'float dust(vec2 uv,float t){float s=0.;for(int i=0;i<3;i++){float fi=float(i);float sc=9.+fi*8.;',
' vec2 p=uv*sc+vec2(t*(.04+fi*.025),-t*(.06+fi*.02))+fi*13.1;vec2 id=floor(p);vec2 f=fract(p)-.5;',
' vec2 o=(vec2(h21(id),h21(id+7.3))-.5)*.7;float d=length(f-o);float tw=.5+.5*sin(t*(1.+h21(id+3.1)*3.)+h21(id)*6.28);',
' s+=smoothstep(.07-fi*.015,0.,d)*tw*step(.6,h21(id+1.7))*(1.-fi*.25);}return s;}',
'vec3 C;float R;mat3 Mi;',
'float map(vec3 p){vec3 q=Mi*(p-C);vec2 t=vec2(length(q.xz)-R,q.y);return length(t)-.014;}',
'vec3 nrm(vec3 p){vec2 e=vec2(.0006,0.);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}',
'float lineDist(vec3 o,vec3 d,vec3 P,vec3 T,out float s,out float t){vec3 w=o-P;float b=dot(d,T);float dd=dot(d,w);float e=dot(T,w);float den=max(1.-b*b,1e-4);s=(b*e-dd)/den;t=(e-b*dd)/den;return length(w+s*d-t*T);}',
'void main(){',
' vec2 uv=(gl_FragCoord.xy-.5*uRes)/uRes.y;',
' vec3 ro=vec3(0.,0.,4.2);vec3 rd=normalize(vec3(uv,-1.6));',
' C=vec3(uRing.xy,0.);R=uRing.z;',
' mat3 M=ry(uPar.x)*rx(uTilt+uPar.y);Mi=rx(-(uTilt+uPar.y))*ry(-uPar.x);',
' vec3 P=M*(R*vec3(cos(uTh),0.,sin(uTh)))+C;vec3 T=normalize(M*vec3(-sin(uTh),0.,cos(uTh)));',
' float pulse=1.+.9*uBeat;vec3 white=vec3(1.,.97,.93);',
' vec3 col=vec3(.043,.039,.035)+uAcc*.025*smoothstep(.6,-.7,uv.y);',
' float tHit=1e5;bool hit=false;',
' vec3 oc=ro-C;float b=dot(oc,rd);float c=dot(oc,oc)-(R+.08)*(R+.08);float hh=b*b-c;',
' if(hh>0.&&uInt>.01){float t=max(-b-sqrt(hh),0.);float tm=-b+sqrt(hh);',
'  for(int i=0;i<100;i++){float d=map(ro+rd*t);if(d<.0007){hit=true;tHit=t;break;}t+=d*.9;if(t>tm)break;}}',
' float sc,tc;float dist=lineDist(ro,rd,P,T,sc,tc);',
' float px=2.62/uRes.y*max(sc,.5)/4.2;',
' float rv=1.-smoothstep(uRev-1.2,uRev,tc);float lit=smoothstep(-.4,.8,uRev);',
' float fade=exp(-abs(tc)*.4)*.85+.15*exp(-abs(tc)*.06);',
' float occ=(hit&&sc>tHit)?.1:1.;',
' float hz=fbm(uv*2.1+vec2(uTime*.018,-uTime*.012));float hz2=fbm(uv*5.+vec2(-uTime*.03,uTime*.02));',
' float flow=.55+.9*ns(vec2(tc*2.2-uTime*.7,uTime*.15));',
' float core=exp(-pow(dist/(px*1.15),2.));float halo=exp(-dist*10.)*.2+exp(-dist*2.6)*.03;',
' vec3 beam=(mix(uAcc,white,.6)*core*1.15*flow+uAcc*halo*(.7+.6*hz))*fade*occ*step(0.,sc)*rv;',
' vec3 haze=uAcc*hz*hz*(exp(-dist*1.5)*.55)*fade*rv+vec3(.9,.86,.8)*.016*hz;',
' float ds=dust(uv,uTime)*exp(-dist*3.5)*fade*rv;',
' vec3 q=P-ro;vec2 ps=q.xy*1.6/(-q.z);float dp=length(uv-ps);',
' float hf=exp(-abs(uv.x-ps.x)*2.2);',
' vec3 streak=vec3(exp(-abs(uv.y-ps.y-.0016)*300.),exp(-abs(uv.y-ps.y)*300.),exp(-abs(uv.y-ps.y+.0016)*300.))*hf*.5;',
' vec3 fl=(mix(uAcc,white,.5)*(exp(-dp*95.)*1.5+exp(-dp*14.)*.26)+streak*mix(uAcc,white,.45))*lit;',
' float rip=exp(-pow((dp-uAge*.75)*22.,2.))*exp(-uAge*2.4)*uSnd;',
' col+=(beam*pulse+haze*(.8+.4*uBeat)*(.7+.6*hz2)+fl*pulse+mix(uAcc,white,.35)*ds*.9*pulse+uAcc*rip*.4)*uInt;',
' if(hit){vec3 p=ro+rd*tHit;vec3 n=nrm(p);vec3 v=-rd;vec3 r=reflect(rd,n);',
'  float fr=pow(1.-max(dot(n,v),0.),3.);',
'  vec3 env=vec3(.03)+white*fr*.16;',
'  env+=white*smoothstep(.9,1.,dot(r,normalize(vec3(-.45,.85,.35))))*.95;',
'  env+=white*smoothstep(.965,1.,dot(r,normalize(vec3(.75,.15,.6))))*.4;',
'  env+=white*smoothstep(-.2,.9,r.y)*.05;',
'  vec3 Ld=P-p;float ld=length(Ld);Ld/=max(ld,1e-4);',
'  float sp=pow(max(dot(r,Ld),0.),36.);',
'  float s2,t2;float d2=lineDist(p,r,P,T,s2,t2);',
'  float refl=exp(-d2*55.)*step(0.,s2)*exp(-abs(t2)*.35)*(1.-smoothstep(uRev-1.2,uRev,t2));',
'  vec3 al=uAcc*(sp*2.2+.55*max(dot(n,Ld),0.))/(1.+ld*ld*5.)*pulse*lit+mix(uAcc,white,.5)*refl*1.3*pulse;',
'  vec3 rc=env*(.38+.62*fr)+al;',
'  col=mix(col,rc+beam*.3+fl,uInt);}',
' col=max(col,0.);col=(col*(2.51*col+.03))/(col*(2.43*col+.59)+.14);',
' col*=1.-.36*dot(uv*vec2(.6,.9),uv*vec2(.6,.9));',
' col+=(h21(gl_FragCoord.xy+fract(uTime))-.5)/180.;',
' gl_FragColor=vec4(col,1.);}'
].join('\n');
var VS='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
var U={},ok=false;
if(gl){
  try{
    var sh=function(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(o));return o;};
    var pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
    if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));
    gl.useProgram(pr);var bf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
    var al=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(al);gl.vertexAttribPointer(al,2,gl.FLOAT,false,0,0);
    ['uRes','uTime','uTh','uAcc','uBeat','uRing','uTilt','uInt','uPar','uRev','uAge','uSnd'].forEach(function(n){U[n]=gl.getUniformLocation(pr,n);});
    ok=true;
  }catch(e){console.warn(e);ok=false;}
}
if(!ok)document.documentElement.classList.add('nogl');
/* display mode: cinematic (WebGL) or essential (2D line art) */
var mode='gl',modeT=-1e9;
try{var sv=localStorage.getItem('tangent-mode');if(sv==='flat'||sv==='gl')mode=sv;}catch(e){}
if(!ok)mode='flat';
var modeBtns=[].slice.call(document.querySelectorAll('[data-mode]'));
function applyMode(m,save){mode=m;modeT=performance.now();document.documentElement.classList.toggle('mode-flat',m==='flat');
  modeBtns.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-mode')===m?'true':'false');});
  if(save){try{localStorage.setItem('tangent-mode',m);}catch(e){}}}
modeBtns.forEach(function(b){if(!ok&&b.getAttribute('data-mode')==='gl'){b.disabled=true;b.style.opacity=.35;}
  b.addEventListener('click',function(){if(b.disabled)return;applyMode(b.getAttribute('data-mode'),true);});});
applyMode(mode,false);
var fc=document.getElementById('flat'),fx=fc.getContext('2d');
function sizeFlat(){var d=Math.min(devicePixelRatio||1,2);fc.width=Math.round(innerWidth*d);fc.height=Math.round(innerHeight*d);fx.setTransform(d,0,0,d,0,0);}
sizeFlat();addEventListener('resize',sizeFlat);
function P3(lx,ly,lz){var p=S.p,t=p.tilt+S.par[1],c=Math.cos(t),s=Math.sin(t);var x=lx,y=c*ly-s*lz,z=s*ly+c*lz;
  var cy=Math.cos(S.par[0]),sy=Math.sin(S.par[0]);var x2=cy*x+sy*z,z2=-sy*x+cy*z;x=x2+p.x;y=y+p.y;z=z2;var qz=z-4.2;
  return [innerWidth/2+x*1.6/(-qz)*innerHeight,innerHeight/2-y*1.6/(-qz)*innerHeight,z2];}
function drawFlat(time){
  var W=innerWidth,H=innerHeight;fx.clearRect(0,0,W,H);
  var p=S.p,intro=RM?1:clamp((time-1.45)/1.1,0,1),I=p.i*intro;if(I<.01)return;
  var A=S.acc.map(function(v){return Math.round(v*255);});
  function ac(a){return 'rgba('+A[0]+','+A[1]+','+A[2]+','+a+')';}
  function cr(a){return 'rgba(243,238,228,'+a+')';}
  var r=p.s,th=S.theta,N=200,i,a,q,prev;
  // soft floor light
  var Cc=P3(0,0,0),bg=fx.createRadialGradient(Cc[0],Cc[1],0,Cc[0],Cc[1],Math.max(W,H)*.7);
  bg.addColorStop(0,ac(.05*I));bg.addColorStop(1,ac(0));fx.fillStyle=bg;fx.fillRect(0,0,W,H);
  fx.lineWidth=1;
  // grooves
  [.6,.78].forEach(function(k){fx.strokeStyle=cr(.05*I);fx.beginPath();for(i=0;i<=N;i++){a=i/N*Math.PI*2;q=P3(r*k*Math.cos(a),0,r*k*Math.sin(a));if(i)fx.lineTo(q[0],q[1]);else fx.moveTo(q[0],q[1]);}fx.stroke();});
  // main ring with depth
  prev=P3(r,0,0);
  for(i=1;i<=N;i++){a=i/N*Math.PI*2;q=P3(r*Math.cos(a),0,r*Math.sin(a));var dz=clamp((q[2]/r+1)/2,0,1);
    var da=Math.atan2(Math.sin(a-th),Math.cos(a-th)),hl=Math.exp(-da*da*9);
    fx.strokeStyle=hl>.02?'rgba('+Math.round(L(243,A[0],hl))+','+Math.round(L(238,A[1],hl))+','+Math.round(L(228,A[2],hl))+','+((.16+.26*dz)*(1-hl)+.95*hl)*I+')':cr((.16+.26*dz)*I);
    fx.lineWidth=1+hl*.6;fx.beginPath();fx.moveTo(prev[0],prev[1]);fx.lineTo(q[0],q[1]);fx.stroke();prev=q;}
  fx.lineWidth=1;
  // contact point + tangent direction
  var P=P3(r*Math.cos(th),0,r*Math.sin(th)),P2=P3(r*Math.cos(th+.003),0,r*Math.sin(th+.003));
  var dx=P2[0]-P[0],dy=P2[1]-P[1],dl=Math.hypot(dx,dy)||1;dx/=dl;dy/=dl;
  var grow=RM?1:ease(clamp((time-1.55)/1.7,0,1)),LL=Math.hypot(W,H)*1.3*grow;
  // radius + right-angle mark
  fx.setLineDash([2,5]);fx.strokeStyle=cr(.14*I);fx.beginPath();fx.moveTo(Cc[0],Cc[1]);fx.lineTo(P[0],P[1]);fx.stroke();fx.setLineDash([]);
  var ux=Cc[0]-P[0],uy=Cc[1]-P[1],ul=Math.hypot(ux,uy)||1;ux/=ul;uy/=ul;var m=10;
  fx.strokeStyle=cr(.32*I*grow);fx.beginPath();fx.moveTo(P[0]+ux*m,P[1]+uy*m);fx.lineTo(P[0]+ux*m+dx*m,P[1]+uy*m+dy*m);fx.lineTo(P[0]+dx*m,P[1]+dy*m);fx.stroke();
  // tangent line
  if(LL>1){var g=fx.createLinearGradient(P[0]-dx*LL,P[1]-dy*LL,P[0]+dx*LL,P[1]+dy*LL);
    g.addColorStop(0,cr(0));g.addColorStop(.32,cr(.28*I));g.addColorStop(.47,ac(.7*I));g.addColorStop(.5,'rgba(255,250,242,'+I+')');g.addColorStop(.53,ac(.7*I));g.addColorStop(.68,cr(.28*I));g.addColorStop(1,cr(0));
    fx.strokeStyle=g;fx.beginPath();fx.moveTo(P[0]-dx*LL,P[1]-dy*LL);fx.lineTo(P[0]+dx*LL,P[1]+dy*LL);fx.stroke();}
  // beat pulse
  var pr,pa;if(on){pr=6+S.age*120;pa=Math.max(0,1-S.age*1.8)*.7;}else{pr=8+(1-S.beat/.35)*22;pa=S.beat*1.2;}
  if(!RM&&pa>.01){fx.strokeStyle=ac(pa*I);fx.beginPath();fx.arc(P[0],P[1],pr,0,Math.PI*2);fx.stroke();}
  // point
  var gl2=fx.createRadialGradient(P[0],P[1],0,P[0],P[1],34);gl2.addColorStop(0,ac(.4*I*grow));gl2.addColorStop(1,ac(0));
  fx.fillStyle=gl2;fx.beginPath();fx.arc(P[0],P[1],34,0,Math.PI*2);fx.fill();
  fx.fillStyle=ac(I*grow);fx.beginPath();fx.arc(P[0],P[1],3.4+S.beat*1.6,0,Math.PI*2);fx.fill();
  fx.strokeStyle=ac(.55*I*grow);fx.beginPath();fx.arc(P[0],P[1],10,0,Math.PI*2);fx.stroke();
}
var quality=1;
function size(){
  var dpr=Math.min(devicePixelRatio||1,2),sc=(mobile()?.62*dpr:Math.min(.9*dpr,1800/innerWidth))*quality;
  cv.width=Math.round(innerWidth*sc);cv.height=Math.round(innerHeight*sc);if(ok)gl.viewport(0,0,cv.width,cv.height);
}
size();addEventListener('resize',size);

/* projection (mirror of shader) to aim the tangent at the pointer */
function proj(th){
  var p=S.p,t=p.tilt+S.par[1],c=Math.cos(t),s=Math.sin(t);
  var x=p.s*Math.cos(th),y=0,z=p.s*Math.sin(th);
  var y1=c*y-s*z,z1=s*y+c*z;y=y1;z=z1;
  var cy=Math.cos(S.par[0]),sy=Math.sin(S.par[0]);var x2=cy*x+sy*z,z2=-sy*x+cy*z;x=x2;z=z2;
  x+=p.x;y+=p.y;var qz=z-4.2;return [innerWidth/2+x*1.6/(-qz)*innerHeight,innerHeight/2-y*1.6/(-qz)*innerHeight];
}
var mx=-1,my=-1,pointerIn=false;
function aim(){
  var i,pp,sx=0,sy=0;
  if(S.stage==='end'||S.stage==='showcase'){var top=S.stage==='end',by=top?1e9:-1e9,bt=0;for(i=0;i<90;i++){var aa=i/90*Math.PI*2;pp=proj(aa);if(top?pp[1]<by:pp[1]>by){by=pp[1];bt=aa;}}S.thetaT=bt;return;}
  if(!pointerIn||!(S.stage==='hero'||S.stage==='sound'||S.stage==='clients')){S.thetaT=null;return;}for(i=0;i<8;i++){pp=proj(i/8*Math.PI*2);sx+=pp[0];sy+=pp[1];}
  var cx=sx/8,cy=sy/8,ma=Math.atan2(my-cy,mx-cx),best=0,bd=1e9;
  for(i=0;i<90;i++){var a=i/90*Math.PI*2;pp=proj(a);var d=Math.atan2(pp[1]-cy,pp[0]-cx)-ma;d=Math.abs(Math.atan2(Math.sin(d),Math.cos(d)));if(d<bd){bd=d;best=a;}}
  S.thetaT=best;
}
addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;pointerIn=true;S.parT=[(e.clientX/innerWidth-.5)*.26,(e.clientY/innerHeight-.5)*.16];},{passive:true});
document.addEventListener('pointerleave',function(){pointerIn=false;S.parT=[0,0];});

/* ---------- audio engine ---------- */
var AC=null,master,revIn,noiseB,an,anData,on=false,nextT=0,step=0,timer=null,kicks=[];
function initAudio(){
  AC=new (window.AudioContext||window.webkitAudioContext)();
  master=AC.createGain();master.gain.value=0;
  var comp=AC.createDynamicsCompressor();comp.threshold.value=-16;comp.ratio.value=3;comp.attack.value=.01;comp.release.value=.2;
  an=AC.createAnalyser();an.fftSize=64;anData=new Uint8Array(an.frequencyBinCount);
  master.connect(comp);comp.connect(an);an.connect(AC.destination);
  var conv=AC.createConvolver(),len=AC.sampleRate*2.6,ib=AC.createBuffer(2,len,AC.sampleRate);
  for(var ch=0;ch<2;ch++){var d=ib.getChannelData(ch);for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3.2);}
  conv.buffer=ib;revIn=AC.createGain();revIn.gain.value=.5;var rOut=AC.createGain();rOut.gain.value=.32;revIn.connect(conv);conv.connect(rOut);rOut.connect(master);
  noiseB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);var nd=noiseB.getChannelData(0);for(var j=0;j<nd.length;j++)nd[j]=Math.random()*2-1;
}
function env(g,t,a,peak,dec){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+dec);}
function kick(t){var o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(46,t+.11);env(g,t,.004,.95,.42);o.connect(g);g.connect(master);o.start(t);o.stop(t+.5);kicks.push(t);if(kicks.length>16)kicks.shift();}
function nz(t,type,f,q,peak,dec,send){var s=AC.createBufferSource();s.buffer=noiseB;var fl=AC.createBiquadFilter();fl.type=type;fl.frequency.value=f;fl.Q.value=q;var g=AC.createGain();env(g,t,.002,peak,dec);s.connect(fl);fl.connect(g);g.connect(master);if(send){var sg=AC.createGain();sg.gain.value=send;g.connect(sg);sg.connect(revIn);}s.start(t);s.stop(t+dec+.05);}
function hat(t,open){nz(t,'highpass',open?7500:9000,.7,open?.12:.07,open?.2:.035,open?.2:0);}
function clap(t){nz(t,'bandpass',1500,.9,.22,.16,.6);nz(t+.012,'bandpass',1300,.9,.16,.12,0);}
function tone(t,f,type,peak,dec,cut,send){var o=AC.createOscillator();o.type=type;o.frequency.value=f;var fl=AC.createBiquadFilter();fl.type='lowpass';fl.frequency.setValueAtTime(cut,t);fl.frequency.exponentialRampToValueAtTime(Math.max(cut*.35,80),t+dec);fl.Q.value=2;var g=AC.createGain();env(g,t,.006,peak,dec);o.connect(fl);fl.connect(g);g.connect(master);if(send){var sg=AC.createGain();sg.gain.value=send;g.connect(sg);sg.connect(revIn);}o.start(t);o.stop(t+dec+.1);}
var CH=[[220,261.6,329.6,392,493.9],[174.6,220,261.6,329.6,392]];
function stab(t,bar,dec){CH[bar%2].forEach(function(f){tone(t,f,'sawtooth',.035,dec||.32,1400,.7);});}
function bass(t,f,dec){tone(t,f,'triangle',.42,dec||.22,520,0);}
function perc(t,f){tone(t,f,'sine',.22,.14,2000,.25);}
function playStep(t,s,bar){
  var g=S.genre;
  if(g!==1&&s%4===0)kick(t);
  if(g===1&&(s===0||s===7||s===10))kick(t);
  if((s===4||s===12)&&g!==4)clap(t);
  if(s%4===2&&g!==1)hat(t,true);
  if(g===1&&s%2===0)hat(t,false);
  if((g===3||g===4)&&s%2===1)hat(t,false);
  if(g===0){if(s%2===0)bass(t,(s/2)%2?110:55,.16);if(s===14)stab(t,bar,.5);if(s%4!==2)hat(t,false);}
  if(g===1){var fb={0:55,3:65.4,6:73.4,10:82.4,14:49};if(fb[s])bass(t,fb[s],.2);if(s===4||s===12)stab(t,bar,.22);}
  if(g===2){var db={2:55,6:55,10:65.4,14:49};if(db[s])bass(t,db[s],.24);if(s===3||s===11)stab(t,bar);}
  if(g===3){var db3={2:55,6:55,10:65.4,14:49};if(db3[s])bass(t,db3[s],.2);if(s===3||s===6||s===11||s===14)stab(t,bar,.22);}
  if(g===4){if(s===2||s===10)bass(t,55,.4);var pf={3:180,7:240,10:300,14:240};if(pf[s])perc(t,pf[s]);if(s===11)stab(t,bar,.45);}
  if(g===5){if(s%4!==0)bass(t,55,.12);if(s===14)stab(t,bar,.7);}
}
function sched(){var sd=60/G[S.genre].bpm/4;while(nextT<AC.currentTime+.12){var sw=(S.genre===1&&step%2===1)?sd*.18:0;playStep(nextT+sw,step%16,Math.floor(step/16));nextT+=sd;step++;}}
var sBtn=document.getElementById('soundBtn'),sLbl=document.getElementById('soundLbl'),eqBars=[].slice.call(document.querySelectorAll('#eq i'));
function startSound(){
  if(!AC)initAudio();if(AC.state==='suspended')AC.resume();
  if(!on){on=true;nextT=AC.currentTime+.06;step=0;clearInterval(timer);timer=setInterval(sched,25);
    master.gain.cancelScheduledValues(AC.currentTime);master.gain.setValueAtTime(master.gain.value,AC.currentTime);master.gain.linearRampToValueAtTime(.62,AC.currentTime+1.2);}
  sBtn.setAttribute('aria-pressed','true');sLbl.textContent=t('snd_on');
}
function stopSound(){
  if(!AC||!on)return;on=false;
  master.gain.cancelScheduledValues(AC.currentTime);master.gain.setValueAtTime(master.gain.value,AC.currentTime);master.gain.linearRampToValueAtTime(0,AC.currentTime+.6);
  setTimeout(function(){if(!on)clearInterval(timer);},700);
  sBtn.setAttribute('aria-pressed','false');sLbl.textContent=t('snd_off');
}
sBtn.addEventListener('click',function(){on?stopSound():startSound();});

/* genres UI */
var gUl=document.getElementById('genres'),gB=[],bpmN=document.getElementById('bpmN'),bpmL=document.getElementById('bpmL'),beatDot=document.getElementById('beatDot'),bpmBox=document.getElementById('bpmBox');
G.forEach(function(g,i){g.rgb=hex(g.col);var li=document.createElement('li'),b=document.createElement('button');b.type='button';b.style.setProperty('--c',g.col);b.setAttribute('data-cur','Play');
  b.addEventListener('click',function(){selectG(i);startSound();});li.appendChild(b);gUl.appendChild(li);gB.push(b);});
function renderGenres(){G.forEach(function(g,i){gB[i].innerHTML='<i></i><span><b>'+esc(g.name)+'</b><small>'+esc(LANG==='de'?g.de:g.use)+'</small></span><span class="num">'+g.range+' BPM</span>';});}
renderGenres();
var bpmShown=120,bpmFrom=120,bpmTo=120,bpmT=0;
function selectG(i){S.genre=i;gB.forEach(function(b,j){b.setAttribute('aria-pressed',j===i?'true':'false');});
  bpmFrom=bpmShown;bpmTo=G[i].bpm;bpmT=performance.now();bpmL.textContent='BPM · '+G[i].name;bpmBox.style.setProperty('--gc',G[i].col);S.t0=performance.now();}
selectG(2);

/* ---------- manifesto words ---------- */
var mani=document.getElementById('mani'),words=[];
function splitMani(){mani.innerHTML=t('mani');(function split(node){
  [].slice.call(node.childNodes).forEach(function(n){
    if(n.nodeType===3){var f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));}else{var s=document.createElement('span');s.className='w';s.textContent=w;f.appendChild(s);}});n.parentNode.replaceChild(f,n);}
    else split(n);
  });
})(mani);
words=[].slice.call(mani.querySelectorAll('.w'));}

/* ---------- marquee ---------- */
var GL='<svg viewBox="0 0 64 34" aria-hidden="true"><circle cx="17" cy="17" r="15"/><line x1="0" y1="32" x2="64" y2="32"/><circle class="pt" cx="17" cy="32" r="3"/></svg>';
function fill(el,arr,alt){var h='';for(var r=0;r<3;r++)arr.forEach(function(w,i){h+='<span class="'+((i+(alt?1:0))%2?'o':'')+'">'+w+'</span>'+GL;});el.innerHTML=h;}
var t1=document.getElementById('t1'),t2=document.getElementById('t2');
var mOff=0,lastY=scrollY,vel=0;

/* ---------- services: orbit ---------- */
var svcOl=document.getElementById('svc'),orbit=document.getElementById('orbit'),orbitPhoto=document.getElementById('orbitPhoto'),orbitSvg=document.getElementById('orbitSvg'),orbitCap=document.getElementById('orbitCap'),svcLis=[],svcPics=[],svcDots=[],svcNums=[],svcHover=false,svcI=-1,svcLast=0,svcTurn=0;
var OC=310,OR=230,CA=135,STEP=360/7;
orbitPhoto.innerHTML=SV.map(function(s){return pic(CL(s.img,'1:1',900),s.alt,s.credit?'Photo '+s.credit:'');}).join('');
svcPics=[].slice.call(orbitPhoto.querySelectorAll('.pic'));wirePics(orbitPhoto);
(function(){
  var NS='http://www.w3.org/2000/svg';
  function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);(p||orbitSvg).appendChild(e);return e;}
  el('circle',{cx:OC,cy:OC,r:OR+46,'class':'ring2'});
  var tk=el('g',{'class':'ticks'});
  for(var i=0;i<56;i++){var a=i/56*Math.PI*2,r1=OR+40,r2=OR+(i%8===0?52:46);el('line',{x1:OC+r1*Math.cos(a),y1:OC+r1*Math.sin(a),x2:OC+r2*Math.cos(a),y2:OC+r2*Math.sin(a),'class':'tick'},tk);}
  el('circle',{cx:OC,cy:OC,r:OR,'class':'rim'});
  SV.forEach(function(s,i){
    var a=CA+i*STEP;
    var d=el('circle',{cx:OC,cy:OC,r:6,'class':'dot'});d.style.setProperty('--a',a+'deg');d.style.setProperty('--d',OR+'px');svcDots.push(d);
    var n=el('text',{x:OC,y:OC,'class':'num'});n.textContent=ROM[i];n.style.setProperty('--a',a+'deg');n.style.setProperty('--d',(OR+26)+'px');svcNums.push(n);
  });
  var t=CA*Math.PI/180,px=OC+OR*Math.cos(t),py=OC+OR*Math.sin(t),dx=-Math.sin(t),dy=Math.cos(t);
  el('line',{x1:px-dx*340,y1:py-dy*340,x2:px+dx*300,y2:py+dy*300,'class':'tan'});
  var pl=el('circle',{cx:px,cy:py,r:12,'class':'pulse'});pl.style.setProperty('--px',px+'px');pl.style.setProperty('--py',py+'px');
  el('circle',{cx:px,cy:py,r:6.5,fill:'var(--acc)'});
  var y1=el('text',{x:px-30,y:py+46,'class':'you','text-anchor':'end','id':'youT'});y1.textContent='You';
  var y2=el('text',{x:px-30,y:py+66,'class':'you-k','text-anchor':'end','id':'youK'});y2.textContent='ONE POINT OF CONTACT';
})();
function svcHL(i,force){
  if(i===svcI&&!force)return;
  if(svcI>=0&&i!==svcI){var dlt=((i-svcI)%7+7)%7;if(dlt>3.5)dlt-=7;svcTurn+=dlt;}else if(svcI<0){svcTurn=i;}
  svcI=i;orbit.style.setProperty('--r',(-svcTurn*STEP)+'deg');
  svcLis.forEach(function(l,j){l.classList.toggle('on',j===i);});
  svcPics.forEach(function(p,j){p.classList.toggle('on',j===i);});
  svcDots.forEach(function(d,j){d.classList.toggle('on',j===i);});svcNums.forEach(function(d,j){d.classList.toggle('on',j===i);});
  var s=SV[i];orbitCap.innerHTML='<span>'+ROM[i]+' / VII</span><b>'+esc(s[LANG][0])+'</b>'+(s.credit?'<span>'+t('photo')+' '+s.credit+'</span>':'');
}
function renderSvc(){
  svcOl.innerHTML=SV.map(function(s,i){return '<li><span>'+ROM[i]+'</span><div><b>'+esc(s[LANG][0])+'</b><p>'+esc(s[LANG][1])+'</p></div><i></i></li>';}).join('');
  svcLis=[].slice.call(svcOl.children);
  svcLis.forEach(function(l,i){l.addEventListener('mouseenter',function(){svcHover=true;svcHL(i);});l.addEventListener('mouseleave',function(){svcHover=false;svcLast=performance.now();});l.addEventListener('click',function(){svcHL(i);svcLast=performance.now()+5000;});});
  document.getElementById('youT').textContent=t('you');document.getElementById('youK').textContent=t('you_k');
  svcHL(svcI<0?0:svcI,true);
}
var cream=document.getElementById('services');

/* ---------- showcase: pinned film strip ---------- */
var showPin=document.getElementById('showPin'),showTrack=document.getElementById('showTrack'),showProg=document.getElementById('showProg'),showCount=document.getElementById('showCount'),namesEl=document.getElementById('names');
var SHOTS=[
 ['red-lounge','2:1',1400,'2/1','60vh',''],['guest-sequin-coat','1:2',800,'1/2','70vh','up'],['toxic-sign','1:1',800,'1/1','40vh','down'],
 ['insideout-window','1:1',800,'1/1','52vh','up'],['red-jackets','1:1',800,'1/1','44vh','down'],['three-guests-blue','1:1',800,'1/1','58vh',''],
 ['four-guests','1:1',900,'1/1','64vh','up'],['guest-leather','1:1',800,'1/1','42vh','down'],['guest-bandana','1:1',800,'1/1','54vh','']
];
var GALMAP={};GAL.forEach(function(g){GALMAP[g[0]]=g;});
var TG='<svg viewBox="0 0 64 40" aria-hidden="true"><circle cx="20" cy="18" r="16"/><line x1="0" y1="34" x2="64" y2="34"/><circle class="pt" cx="20" cy="34" r="3.2"/></svg>';
function renderShowcase(){
  var h='<div class="panel-title"><h2>TANGENT<br><em>×</em> TOXIC</h2><p>'+t('show_desc')+'</p><span class="hint"><i></i>'+t('show_hint')+'</span></div>';
  h+=ticketHTML('');
  SHOTS.forEach(function(sh,i){var g=GALMAP[sh[0]];h+='<figure class="shot '+sh[5]+'" style="--h:'+sh[4]+';--ar:'+sh[3]+'">'+pic(CL(g[0],g[1],g[2]),g[4],'')+'<span><b>'+('0'+(i+1)).slice(-2)+'</b>'+t('photo')+' '+g[5]+'</span></figure>';});
  h+='<a class="more" href="'+GALLERY_URL+'" target="_blank" rel="noopener" data-cur="Open"><span class="tl"><svg viewBox="0 0 52 20" aria-hidden="true"><circle cx="10" cy="10" r="9"/><line x1="10" y1="19" x2="52" y2="19"/><circle class="pt" cx="10" cy="19" r="2.4"/></svg></span><span style="display:grid;gap:8px"><b>'+t('more_t')+'</b><small>'+t('more_s')+'</small></span></a>';
  showTrack.innerHTML=h;wirePics(showTrack);
  renderShowMob();
  galPics=[].slice.call(showTrack.querySelectorAll('.shot .pic'));showItems=showTrack.children.length;sizeShow();
}
var galPics=[],showItems=12,showMax=0;
function ticketHTML(cls){
  return '<article class="ticket '+(cls||'')+'"><div class="t-main"><span class="t-k">Tangent Events · '+t('show_k')+'</span><b class="t-title">TANGENT <em>×</em><br>TOXIC</b><p class="t-desc">'+t('t_desc')+'</p><dl>'+
    [['m_date','01.10.2026'],['m_time','18:00–22:00'],['m_venue','INSIDEOUT']].map(function(m){return '<div><dt>'+t(m[0])+'</dt><dd>'+m[1]+'</dd></div>';}).join('')+
    '</dl></div><div class="t-stub"><small>No. 001</small>'+TG+'<div><b>150</b><small>'+t('m_guests')+'</small></div><div><b>7</b><small>'+t('m_services')+'</small></div></div></article>';
}
function renderShowMob(){
  var mob=document.getElementById('showMob'),hero=GALMAP['red-lounge'],rest=SHOTS.slice(1);
  var h='<p class="k">'+t('show_k')+'</p><h2>TANGENT<br><em>×</em> TOXIC</h2><p class="sm-desc">'+t('show_desc')+'</p>'+ticketHTML('tv')+
    pic(CL(hero[0],'3:2',1200),hero[4],t('photo')+' '+hero[5],'sm-hero')+
    '<div class="sm-car" id="smCar">'+rest.map(function(sh,i){var g=GALMAP[sh[0]];return '<figure>'+pic(CL(g[0],'4:5',900),g[4],'')+'<span><b>'+('0'+(i+1)).slice(-2)+'</b>'+t('photo')+' '+g[5]+'</span></figure>';}).join('')+'</div>'+
    '<div class="sm-ctl"><span id="smCount">01 / '+('0'+rest.length).slice(-2)+'</span><span class="bar"><i id="smBar"></i></span><span>'+t('swipe')+' →</span></div>'+
    '<a class="tl big sm-more" href="'+GALLERY_URL+'" target="_blank" rel="noopener"><svg viewBox="0 0 52 20" aria-hidden="true"><circle cx="10" cy="10" r="9"/><line x1="10" y1="19" x2="52" y2="19"/><circle class="pt" cx="10" cy="19" r="2.4"/></svg>'+t('more_t')+' ↗</a>';
  mob.innerHTML=h;wirePics(mob);
  var car=document.getElementById('smCar'),cnt=document.getElementById('smCount'),bar=document.getElementById('smBar'),n=rest.length;
  bar.style.transform='scaleX('+(1/n)+')';
  car.addEventListener('scroll',function(){var f=car.querySelector('figure');if(!f)return;var w=f.getBoundingClientRect().width+12,k=Math.min(n-1,Math.round(car.scrollLeft/w));
    cnt.textContent=('0'+(k+1)).slice(-2)+' / '+('0'+n).slice(-2);bar.style.transform='scaleX('+((k+1)/n)+')';},{passive:true});
  // place the side notches on the perforation line
  var tv=mob.querySelector('.tv');if(tv){var st=tv.querySelector('.t-stub');requestAnimationFrame(function(){if(tv.offsetHeight)tv.style.setProperty('--perf',(st.offsetTop/tv.offsetHeight*100)+'%');});}
}
function sizeShow(){
  if(mobile()){showPin.style.height='';showTrack.style.transform='';showMax=0;return;}
  showMax=Math.max(0,showTrack.scrollWidth-innerWidth);showPin.style.height=(innerHeight+showMax)+'px';
}
addEventListener('resize',function(){sizeShow();var tv=document.querySelector('.tv');if(tv&&tv.offsetHeight){tv.style.setProperty('--perf',(tv.querySelector('.t-stub').offsetTop/tv.offsetHeight*100)+'%');}});

function renderDynamic(){
  namesEl.innerHTML=[['Kattus',t('c_client')],['Maramax',t('c_client')],['Chegini',t('c_client')],['TOXIC',t('c_show'),'#showcase'],['INSIDEOUT',t('c_venue'),'#showcase']].map(function(c){
    return '<li data-cur="'+(c[2]?'View':'Client')+'"><b>'+c[0]+'</b><span>'+c[1]+'</span>'+(c[2]?'<a href="'+c[2]+'" aria-label="'+c[0]+'"></a>':'')+'</li>';}).join('');
  [].forEach.call(namesEl.querySelectorAll('a[href^="#"]'),function(a){a.addEventListener('click',function(e){e.preventDefault();var el=document.querySelector(a.getAttribute('href'));if(lenis)lenis.scrollTo(el,{duration:1.8});else el.scrollIntoView({behavior:RM?'auto':'smooth'});});});
  document.getElementById('fFormat').innerHTML=t('formats').map(function(f){return '<option>'+esc(f)+'</option>';}).join('');
  fill(t1,t('F1'),0);fill(t2,t('F2'),1);
  renderShowcase();
}
function applyLang(l,save){
  LANG=l;document.documentElement.lang=l;
  [].forEach.call(document.querySelectorAll('[data-i18n]'),function(el){el.innerHTML=t(el.getAttribute('data-i18n'));});
  [].forEach.call(document.querySelectorAll('[data-i18n-ph]'),function(el){el.placeholder=t(el.getAttribute('data-i18n-ph'));});
  [].forEach.call(document.querySelectorAll('[data-lang]'),function(b){b.setAttribute('aria-pressed',b.getAttribute('data-lang')===l?'true':'false');});
  document.getElementById('preT').textContent=t('pre');
  splitMani();renderSvc();renderDynamic();renderGenres();
  bpmL.textContent='BPM · '+G[S.genre].name;sLbl.textContent=on?t('snd_on'):t('snd_off');
  var fn=document.getElementById('fnote');if(fn.textContent)fn.textContent=t('note');
  if(save){try{localStorage.setItem('tangent-lang',l);}catch(e){}}
}
[].forEach.call(document.querySelectorAll('[data-lang]'),function(b){b.addEventListener('click',function(){applyLang(b.getAttribute('data-lang'),true);});});
applyLang(LANG,false);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sizeShow);addEventListener('load',sizeShow);

/* ---------- reveals ---------- */
var rvs=[].slice.call(document.querySelectorAll('.rv'));
if(!RM&&'IntersectionObserver' in window){
  rvs.forEach(function(el){if(el.getBoundingClientRect().top>innerHeight)el.classList.add('pre-rv');});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var d=[].indexOf.call(e.target.parentNode.children,e.target);e.target.style.transitionDelay=(Math.min(d,4)*.08)+'s';e.target.classList.remove('pre-rv');io.unobserve(e.target);}});},{rootMargin:'0px 0px -10% 0px'});
  rvs.forEach(function(el){io.observe(el);});
  var giant=document.getElementById('giant');giant.classList.add('pre-g');[].forEach.call(giant.children,function(s,i){s.style.transitionDelay=(i*.06)+'s';});
  var io2=new IntersectionObserver(function(es){if(es[0].isIntersecting){giant.classList.remove('pre-g');io2.disconnect();}},{threshold:.3});io2.observe(giant);
}

/* ---------- cursor ---------- */
var cur=document.getElementById('cur'),curLab=document.getElementById('curLab'),ccx=0,ccy=0,tx=0,ty=0,curData=false;
addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;tx=e.clientX;ty=e.clientY;cur.style.opacity=1;
  var a=e.target.closest&&e.target.closest('a,button,input,select,.svc li,[data-cur]');cur.classList.toggle('big',!!a);
  var lab=e.target.closest&&e.target.closest('[data-cur]');curData=!!lab;if(lab){curLab.textContent=lab.getAttribute('data-cur');cur.classList.add('lb');}
  else if(!a&&(S.stage==='hero')){curLab.textContent=t('move');cur.classList.add('lb');}
  else cur.classList.remove('lb');
},{passive:true});
document.addEventListener('pointerleave',function(){cur.style.opacity=0;});

/* ---------- nav / progress ---------- */
var nav=document.getElementById('nav'),progI=document.getElementById('progI'),progB=document.getElementById('progB'),heroCopy=document.getElementById('heroCopy'),navY=0;

/* ---------- preloader counter ---------- */
(function(){var el=document.getElementById('preN');function f(n){var p=Math.min(1,(n-T0)/1450);p=1-Math.pow(1-p,3);el.textContent=('00'+Math.round(p*120)).slice(-3);if(p<1)requestAnimationFrame(f);}requestAnimationFrame(f);})();

/* ---------- form ---------- */
document.getElementById('f').addEventListener('submit',function(e){e.preventDefault();document.getElementById('fnote').textContent=t('note');});

/* ---------- loop ---------- */
var thEl=document.getElementById('theta');S.t0=T0;var lastNow=T0,slow=0,lastScroll=scrollY;
function frame(now){
  if(lenis)lenis.raf(now);
  var dt=Math.min(.05,(now-lastNow)/1000);lastNow=now;
  var time=(now-T0)/1000,Y=scrollY;
  // adaptive quality
  if(dt>.034){slow++;if(slow>40&&quality>.6){quality-=.15;size();slow=0;}}else slow=Math.max(0,slow-1);
  // pose
  var tp=targetPose(),k1=1-Math.pow(.0009,dt);
  KEYS.forEach(function(q){S.p[q]=L(S.p[q],tp[q],k1);});
  S.par[0]=L(S.par[0],S.parT[0],1-Math.pow(.02,dt));S.par[1]=L(S.par[1],S.parT[1],1-Math.pow(.02,dt));
  var gc=G[S.genre].rgb;for(var i=0;i<3;i++){var target=L(S.accBase[i],gc[i],S.p.snd);S.acc[i]=L(S.acc[i],target,1-Math.pow(.01,dt));}
  // theta: pointer, else drift + scroll
  aim();
  var dS=Y-lastScroll;lastScroll=Y;
  if(S.thetaT!==null){var d=Math.atan2(Math.sin(S.thetaT-S.theta),Math.cos(S.thetaT-S.theta));S.theta+=d*(1-Math.pow(.004,dt));}
  else if(!RM)S.theta+=dt*.13+dS*.0016;
  // beat
  var b=0,age=9;
  if(on&&AC){var ct=AC.currentTime,lk=-1;for(var j=0;j<kicks.length;j++)if(kicks[j]<=ct)lk=kicks[j];if(lk>0){age=ct-lk;b=Math.exp(-age*7);}
    an.getByteFrequencyData(anData);eqBars.forEach(function(e,n){e.style.height=(3+anData[2+n*4]/255*8)+'px';});}
  else if(!RM){var bp=60/G[S.genre].bpm,ph=((now-S.t0)/1000)%bp;b=Math.exp(-ph*7)*.35;eqBars.forEach(function(e){e.style.height='3px';});}
  S.beat=b;S.age=age;beatDot.style.opacity=.3+.7*b;beatDot.style.transform='scale('+(1+b*.6)+')';
  // bpm counter
  var bt=clamp((now-bpmT)/700,0,1);bpmShown=Math.round(L(bpmFrom,bpmTo,ease(bt)));bpmN.textContent=bpmShown;
  var deg=((S.theta*180/Math.PI)%360+360)%360;thEl.textContent='θ '+('00'+deg.toFixed(1)).slice(-5)+'°';
  // hero parallax
  if(!RM){var hp=clamp(Y/innerHeight,0,1);heroCopy.style.transform='translate3d(0,'+(Y*.28)+'px,0)';heroCopy.style.opacity=1-hp*1.15;}
  // nav + progress
  var max=document.documentElement.scrollHeight-innerHeight,pr=max>0?Y/max:0;
  progI.style.left=(pr*100)+'%';progB.style.width=(pr*100)+'%';
  if(Y>innerHeight*.6&&Y>navY+4)nav.classList.add('hide');else if(Y<navY-4||Y<innerHeight*.6)nav.classList.remove('hide');navY=Y;
  // manifesto
  var mr=mani.getBoundingClientRect(),mp=(innerHeight*.82-mr.top)/(mr.height+innerHeight*.3),mn=Math.floor(clamp(mp,0,1)*words.length*1.08);
  for(var w=0;w<words.length;w++){var on2=w<mn;if(words[w]._on!==on2){words[w]._on=on2;words[w].classList.toggle('on',on2);}}
  // marquee
  vel=L(vel,dS,.12);if(!RM)mOff+=dt*50+Math.abs(vel)*.4;
  var w1=t1.scrollWidth/3;t1.style.transform='translate3d('+(-(mOff%w1))+'px,0,0)';
  var w2=t2.scrollWidth/3;t2.style.transform='translate3d('+(-w2+(mOff%w2))+'px,0,0)';
  // cream circle reveal
  var cr=cream.getBoundingClientRect();
  if(!RM){var cp=clamp((innerHeight-cr.top)/(innerHeight*.95),0,1);
    if(cp>=1)cream.style.clipPath='none';else{var rad=Math.pow(cp,1.15)*Math.hypot(innerWidth,innerHeight)*1.05;cream.style.clipPath='circle('+rad.toFixed(1)+'px at 50% 0)';}}
  // showcase film strip
  if(!mobile()&&showMax>0){var spr=showPin.getBoundingClientRect(),sp=clamp(-spr.top/showMax,0,1);showTrack.style.transform='translate3d('+(-sp*showMax).toFixed(1)+'px,0,0)';showProg.style.transform='scaleX('+sp+')';
    showCount.textContent=('0'+(1+Math.round(sp*(showItems-1)))).slice(-2)+' / '+('0'+showItems).slice(-2);}
  if(!RM){for(var gi=0;gi<galPics.length;gi++){var gr=galPics[gi].getBoundingClientRect();if(gr.right>-50&&gr.left<innerWidth+50){var off=((gr.left+gr.width/2)-innerWidth/2)/innerWidth;galPics[gi].firstChild.style.setProperty('--px',(off*-40).toFixed(1)+'px');}}}
  // services auto-cycle
  if(!svcHover&&cr.top<innerHeight&&cr.bottom>0&&now-svcLast>2600){svcLast=now+400;svcHL((svcI+1)%SV.length);}
  // cursor
  if(!curData&&S.stage!=='hero')cur.classList.remove('lb');
  ccx=L(ccx,tx,1-Math.pow(.0005,dt));ccy=L(ccy,ty,1-Math.pow(.0005,dt));cur.style.transform='translate3d('+ccx+'px,'+ccy+'px,0)';
  // render
  if(mode==='flat'||now-modeT<1100)drawFlat(time);else fx.clearRect(0,0,innerWidth,innerHeight);
  if(ok&&(mode==='gl'||now-modeT<1100)){
    var rev=RM?20:L(-12,16,ease(clamp((time-1.55)/2.4,0,1)));
    gl.uniform2f(U.uRes,cv.width,cv.height);gl.uniform1f(U.uTime,time);gl.uniform1f(U.uTh,S.theta);
    gl.uniform3f(U.uAcc,S.acc[0],S.acc[1],S.acc[2]);gl.uniform1f(U.uBeat,S.beat);gl.uniform1f(U.uAge,S.age);gl.uniform1f(U.uSnd,on?1:0);
    gl.uniform3f(U.uRing,S.p.x,S.p.y,S.p.s);gl.uniform1f(U.uTilt,S.p.tilt);gl.uniform1f(U.uInt,S.p.i*(RM?1:clamp((time-1.4)/1.2,0,1)));gl.uniform2f(U.uPar,S.par[0],S.par[1]);gl.uniform1f(U.uRev,rev);
    gl.drawArrays(gl.TRIANGLES,0,3);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();
