// Notes flottantes — Bapotique
(function(){
  var NOTES_KEY='bap_notes';
  function load(){try{return JSON.parse(localStorage.getItem(NOTES_KEY)||'[]');}catch(e){return[];}}
  function save(notes){localStorage.setItem(NOTES_KEY,JSON.stringify(notes));}

  // Build UI
  var style=document.createElement('style');
  style.textContent=`
  .bap-notes-fab{position:fixed;bottom:1.4rem;right:1.2rem;z-index:9000;width:2.8rem;height:2.8rem;border-radius:50%;background:rgba(200,184,240,0.18);border:1.5px solid rgba(200,184,240,0.4);cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.25);transition:background .15s,transform .15s;backdrop-filter:blur(10px);color:inherit;line-height:1}
  .bap-notes-fab:hover{background:rgba(200,184,240,0.30);transform:scale(1.08)}
  .bap-notes-fab .bap-cnt{position:absolute;top:-.3rem;right:-.3rem;background:#c8b8f0;color:#13111a;font-size:.55rem;font-weight:800;min-width:1.1rem;height:1.1rem;border-radius:50%;display:none;align-items:center;justify-content:center;padding:0 .2rem;font-family:'DM Sans',sans-serif}
  .bap-notes-fab .bap-cnt.show{display:flex}
  .bap-notes-panel{position:fixed;bottom:5rem;right:1.2rem;z-index:9001;width:320px;max-width:calc(100vw - 2.4rem);max-height:70vh;background:rgba(25,22,36,0.96);border:1px solid rgba(200,184,240,0.25);border-radius:18px;box-shadow:0 16px 48px rgba(0,0,0,0.4);backdrop-filter:blur(24px);display:none;flex-direction:column;overflow:hidden;font-family:'DM Sans',sans-serif}
  .bap-notes-panel.open{display:flex}
  [data-theme="light"] .bap-notes-panel{background:rgba(240,238,250,0.97);border-color:rgba(120,100,180,0.25);box-shadow:0 16px 48px rgba(0,0,0,0.15)}
  .bap-nhead{display:flex;align-items:center;padding:.7rem 1rem;border-bottom:1px solid rgba(255,255,255,0.08);gap:.5rem;flex-shrink:0}
  [data-theme="light"] .bap-nhead{border-bottom-color:rgba(0,0,0,0.08)}
  .bap-nhead h4{flex:1;font-size:.85rem;font-weight:700;color:#e8e4f0;margin:0}
  [data-theme="light"] .bap-nhead h4{color:#1a1730}
  .bap-nhead button{background:none;border:none;cursor:pointer;font-size:.9rem;color:rgba(232,228,240,.45);padding:.2rem;border-radius:5px;line-height:1;transition:color .15s}
  .bap-nhead button:hover{color:#e8e4f0}
  [data-theme="light"] .bap-nhead button:hover{color:#1a1730}
  .bap-nlist{flex:1;overflow-y:auto;padding:.5rem}
  .bap-note{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:.6rem .8rem;margin-bottom:.45rem;position:relative}
  [data-theme="light"] .bap-note{background:rgba(255,255,255,0.8);border-color:rgba(0,0,0,0.08)}
  .bap-note-text{font-size:.8rem;color:#e8e4f0;line-height:1.55;white-space:pre-wrap;word-break:break-word;cursor:text;min-height:1em}
  [data-theme="light"] .bap-note-text{color:#1a1730}
  .bap-note-meta{font-size:.62rem;color:rgba(232,228,240,.35);margin-top:.35rem;display:flex;align-items:center;gap:.5rem}
  [data-theme="light"] .bap-note-meta{color:rgba(26,23,48,.45)}
  .bap-note-del{background:none;border:none;cursor:pointer;font-size:.75rem;color:rgba(240,184,196,.45);padding:0 .1rem;transition:color .15s;line-height:1}
  .bap-note-del:hover{color:#f0b8c4}
  .bap-nadd{padding:.6rem .75rem;border-top:1px solid rgba(255,255,255,0.08);flex-shrink:0;display:flex;gap:.4rem;align-items:flex-end}
  [data-theme="light"] .bap-nadd{border-top-color:rgba(0,0,0,0.08)}
  .bap-ntxt{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:.5rem .65rem;font-size:1rem;font-family:'DM Sans',sans-serif;color:#e8e4f0;resize:none;min-height:60px;max-height:120px;outline:none;transition:border-color .15s}
  [data-theme="light"] .bap-ntxt{background:rgba(255,255,255,.8);border-color:rgba(0,0,0,.12);color:#1a1730}
  .bap-ntxt:focus{border-color:rgba(200,184,240,.5)}
  .bap-ntxt::placeholder{color:rgba(232,228,240,.3)}
  [data-theme="light"] .bap-ntxt::placeholder{color:rgba(26,23,48,.3)}
  .bap-nsend{background:rgba(200,184,240,.15);border:1px solid rgba(200,184,240,.3);border-radius:8px;padding:.45rem .55rem;cursor:pointer;font-size:.85rem;color:#c8b8f0;transition:background .15s;line-height:1;flex-shrink:0}
  .bap-nsend:hover{background:rgba(200,184,240,.28)}
  .bap-empty{text-align:center;padding:1.5rem .5rem;font-size:.78rem;color:rgba(232,228,240,.35)}
  [data-theme="light"] .bap-empty{color:rgba(26,23,48,.35)}
  .ic{width:1em;height:1em;vertical-align:-.15em;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;display:inline-block;overflow:visible}
  .ic-fill{fill:currentColor;stroke:none}
  `;
  document.head.appendChild(style);

  var fab=document.createElement('button');
  fab.className='bap-notes-fab';
  fab.title='Notes personnelles';
  fab.innerHTML='<svg class="ic"><use href="#i-edit"/></svg><span class="bap-cnt" id="bap-cnt"></span>';
  document.body.appendChild(fab);

  var panel=document.createElement('div');
  panel.className='bap-notes-panel';
  panel.innerHTML=`
    <div class="bap-nhead">
      <h4><svg class="ic"><use href="#i-edit"/></svg> Notes</h4>
      <button onclick="this.closest('.bap-notes-panel').classList.remove('open')" title="Fermer"><svg class="ic"><use href="#i-x"/></svg></button>
    </div>
    <div class="bap-nlist" id="bap-nlist"></div>
    <div class="bap-nadd">
      <textarea class="bap-ntxt" id="bap-ntxt" placeholder="Écrire une note…" rows="3"></textarea>
      <button class="bap-nsend" id="bap-nsend" title="Ajouter (Ctrl+Enter)">+</button>
    </div>
  `;
  document.body.appendChild(panel);

  function fmtDate(ts){
    var d=new Date(ts);
    return d.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'})+' '+d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  }

  function render(){
    var notes=load();
    var list=document.getElementById('bap-nlist');
    var cnt=document.getElementById('bap-cnt');
    if(!notes.length){
      list.innerHTML='<div class="bap-empty">Aucune note pour l\'instant.</div>';
      cnt.classList.remove('show');
      return;
    }
    cnt.textContent=notes.length>9?'9+':notes.length;
    cnt.classList.add('show');
    list.innerHTML=notes.slice().reverse().map(function(n){
      return '<div class="bap-note" data-id="'+n.id+'">'
        +'<div class="bap-note-text">'+esc(n.text)+'</div>'
        +'<div class="bap-note-meta"><span>'+fmtDate(n.ts)+'</span><button class="bap-note-del" onclick="bapDelNote(\''+n.id+'\')" title="Supprimer"><svg class="ic"><use href="#i-trash"/></svg></button></div>'
        +'</div>';
    }).join('');
  }

  function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');}

  window.bapDelNote=function(id){
    var notes=load().filter(function(n){return n.id!==id;});
    save(notes);
    render();
  };

  function addNote(){
    var ta=document.getElementById('bap-ntxt');
    var txt=(ta.value||'').trim();
    if(!txt)return;
    var notes=load();
    notes.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),text:txt,ts:Date.now()});
    save(notes);
    ta.value='';
    render();
  }

  document.getElementById('bap-nsend').onclick=addNote;
  document.getElementById('bap-ntxt').addEventListener('keydown',function(e){
    if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();addNote();}
  });

  fab.addEventListener('click',function(){
    panel.classList.toggle('open');
    if(panel.classList.contains('open')) document.getElementById('bap-ntxt').focus();
  });

  // Close on outside click
  document.addEventListener('click',function(e){
    if(!panel.contains(e.target)&&!fab.contains(e.target))panel.classList.remove('open');
  });

  render();
})();

// ─── Pomodoro Timer ────────────────────────────────────────────────────────────
(function(){
  var DUR={work:25*60,short:5*60,long:15*60};
  var st={mode:'work',rem:DUR.work,running:false,iv:null};

  var style=document.createElement('style');
  style.textContent=`
  .bap-pom-fab{position:fixed;bottom:1.4rem;left:1.2rem;z-index:9000;width:2.8rem;height:2.8rem;border-radius:50%;background:rgba(168,216,196,0.18);border:1.5px solid rgba(168,216,196,0.4);cursor:pointer;font-size:.6rem;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.25);backdrop-filter:blur(10px);color:#a8d8c4;font-weight:800;font-family:'DM Sans',sans-serif;line-height:1;transition:background .15s;user-select:none}
  .bap-pom-fab:hover{background:rgba(168,216,196,0.30)}
  .bap-pom-fab.running{background:rgba(168,216,196,0.30);border-color:rgba(168,216,196,0.7);box-shadow:0 0 12px rgba(168,216,196,0.35)}
  .bap-pom-panel{position:fixed;bottom:5rem;left:1.2rem;z-index:9001;width:210px;background:rgba(22,18,30,0.96);border:1px solid rgba(168,216,196,0.22);border-radius:18px;box-shadow:0 16px 48px rgba(0,0,0,0.45);backdrop-filter:blur(24px);display:none;flex-direction:column;overflow:hidden;font-family:'DM Sans',sans-serif;padding:1rem .9rem .8rem}
  .bap-pom-panel.open{display:flex}
  [data-theme="light"] .bap-pom-panel{background:rgba(238,250,244,0.97);border-color:rgba(100,180,150,0.3)}
  .bap-pom-label{font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(168,216,196,.65);text-align:center;margin-bottom:.3rem}
  [data-theme="light"] .bap-pom-label{color:rgba(40,130,100,.75)}
  .bap-pom-time{font-size:2.6rem;font-weight:800;text-align:center;color:#e8e4f0;letter-spacing:-.03em;font-variant-numeric:tabular-nums;line-height:1;margin:.2rem 0 .6rem}
  [data-theme="light"] .bap-pom-time{color:#1a1730}
  .bap-pom-modes{display:flex;gap:.3rem;margin-bottom:.65rem}
  .bap-pom-mbn{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.28rem .15rem;font-size:.6rem;font-weight:700;cursor:pointer;color:rgba(232,228,240,.45);transition:all .15s;text-align:center;font-family:'DM Sans',sans-serif}
  .bap-pom-mbn.active{background:rgba(168,216,196,.18);border-color:rgba(168,216,196,.45);color:#a8d8c4}
  [data-theme="light"] .bap-pom-mbn{background:rgba(0,0,0,.04);border-color:rgba(0,0,0,.1);color:rgba(26,21,37,.45)}
  [data-theme="light"] .bap-pom-mbn.active{background:rgba(100,180,150,.18);border-color:rgba(100,180,150,.45);color:rgba(30,120,90,1)}
  .bap-pom-btns{display:flex;gap:.45rem}
  .bap-pom-start{flex:1;background:rgba(168,216,196,.18);border:1px solid rgba(168,216,196,.35);border-radius:10px;padding:.48rem .4rem;font-size:.8rem;font-weight:700;cursor:pointer;color:#a8d8c4;transition:all .15s;font-family:'DM Sans',sans-serif}
  .bap-pom-start:hover{background:rgba(168,216,196,.30)}
  [data-theme="light"] .bap-pom-start{background:rgba(100,180,150,.15);border-color:rgba(100,180,150,.35);color:rgba(20,110,80,1)}
  .bap-pom-rst{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:.48rem .55rem;font-size:.88rem;cursor:pointer;color:rgba(232,228,240,.35);transition:all .15s;line-height:1}
  .bap-pom-rst:hover{color:rgba(232,228,240,.7);background:rgba(255,255,255,.09)}
  [data-theme="light"] .bap-pom-rst{border-color:rgba(0,0,0,.1);color:rgba(26,21,37,.35)}
  [data-theme="light"] .bap-pom-rst:hover{color:rgba(26,21,37,.7)}
  .bap-pom-prog{height:3px;background:rgba(168,216,196,.1);border-radius:3px;margin-top:.75rem;overflow:hidden}
  .bap-pom-bar{height:100%;background:linear-gradient(90deg,#a8d8c4,#c8b8f0);border-radius:3px;transition:width 1s linear}
  `;
  document.head.appendChild(style);

  var fab=document.createElement('button');
  fab.className='bap-pom-fab';fab.title='Pomodoro';
  fab.setAttribute('aria-label','Minuteur Pomodoro');
  document.body.appendChild(fab);

  var panel=document.createElement('div');
  panel.className='bap-pom-panel';
  panel.innerHTML=
    '<div class="bap-pom-label" id="bap-pom-lbl">Concentration</div>'+
    '<div class="bap-pom-time" id="bap-pom-t">25:00</div>'+
    '<div class="bap-pom-modes">'+
      '<button class="bap-pom-mbn active" data-m="work" onclick="bapPom.mode(\'work\')">Focus</button>'+
      '<button class="bap-pom-mbn" data-m="short" onclick="bapPom.mode(\'short\')">Pause</button>'+
      '<button class="bap-pom-mbn" data-m="long" onclick="bapPom.mode(\'long\')">Longue</button>'+
    '</div>'+
    '<div class="bap-pom-btns">'+
      '<button class="bap-pom-start" id="bap-pom-btn" onclick="bapPom.toggle()">▶ Démarrer</button>'+
      '<button class="bap-pom-rst" onclick="bapPom.reset()" title="Réinitialiser">↺</button>'+
    '</div>'+
    '<div class="bap-pom-prog"><div class="bap-pom-bar" id="bap-pom-bar" style="width:100%"></div></div>';
  document.body.appendChild(panel);

  function fmt(s){var m=Math.floor(s/60),sc=s%60;return (m<10?'0':'')+m+':'+(sc<10?'0':'')+sc;}
  var LBLS={work:'Concentration',short:'Pause courte',long:'Pause longue'};

  function render(){
    var t=document.getElementById('bap-pom-t');
    var b=document.getElementById('bap-pom-bar');
    var btn=document.getElementById('bap-pom-btn');
    if(t)t.textContent=fmt(st.rem);
    if(b)b.style.width=((st.rem/DUR[st.mode])*100)+'%';
    if(btn)btn.textContent=st.running?'⏸ Pause':'▶ Démarrer';
    fab.textContent=fmt(st.rem);
    fab.classList.toggle('running',st.running);
  }

  function chime(){
    try{
      var ctx=new(window.AudioContext||window.webkitAudioContext)();
      [0,350,700].forEach(function(delay,i){
        setTimeout(function(){
          var o=ctx.createOscillator(),g=ctx.createGain();
          o.connect(g);g.connect(ctx.destination);
          o.type='sine';o.frequency.value=[659,784,1047][i]||659;
          g.gain.setValueAtTime(.2,ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.55);
          o.start(ctx.currentTime);o.stop(ctx.currentTime+.55);
        },delay);
      });
    }catch(e){}
  }

  window.bapPom={
    toggle:function(){
      if(st.running){clearInterval(st.iv);st.running=false;}
      else{
        st.running=true;
        st.iv=setInterval(function(){
          if(st.rem<=0){clearInterval(st.iv);st.running=false;chime();panel.classList.add('open');render();return;}
          st.rem--;render();
        },1000);
      }
      render();
    },
    reset:function(){clearInterval(st.iv);st.running=false;st.rem=DUR[st.mode];render();},
    mode:function(m){
      clearInterval(st.iv);st.running=false;st.mode=m;st.rem=DUR[m];
      var lbl=document.getElementById('bap-pom-lbl');if(lbl)lbl.textContent=LBLS[m];
      document.querySelectorAll('.bap-pom-mbn').forEach(function(b){b.classList.toggle('active',b.dataset.m===m);});
      render();
    }
  };

  fab.addEventListener('click',function(){panel.classList.toggle('open');});
  document.addEventListener('click',function(e){
    if(!panel.contains(e.target)&&!fab.contains(e.target))panel.classList.remove('open');
  });

  render();
})();

// ─── TTS Global Panel ──────────────────────────────────────────────────────────
(function(){
  if(typeof speechSynthesis==='undefined')return;

  var _voice=null,_rate=1.0,_speaking=false;

  // patch speak to inject panel voice/rate transparently
  var _origSpeak=speechSynthesis.speak.bind(speechSynthesis);
  speechSynthesis.speak=function(u){
    if(_voice)u.voice=_voice;
    u.rate=_rate;
    _speaking=true;
    var oe=u.onend,or_=u.onerror;
    u.onend=function(e){_speaking=false;_updFab();if(oe)oe.call(this,e);};
    u.onerror=function(e){_speaking=false;_updFab();if(or_)or_.call(this,e);};
    _origSpeak(u);
    _updFab();
  };

  var _frVoices=[];
  var _PREF=['Google','Amélie','Thomas','Audrey','Marie','Rémi','Enhanced'];
  function _loadV(){
    _frVoices=speechSynthesis.getVoices().filter(function(v){return v.lang&&v.lang.startsWith('fr');});
    if(!_voice&&_frVoices.length){
      var hit=null;
      for(var i=0;i<_PREF.length;i++){var f=_frVoices.find(function(v){return v.name.indexOf(_PREF[i])>=0;});if(f){hit=f;break;}}
      _voice=hit||_frVoices[0];
    }
    _renderVoices();
  }
  _loadV();
  speechSynthesis.addEventListener('voiceschanged',_loadV);

  var style=document.createElement('style');
  style.textContent=`
  .bap-tts-fab{position:fixed;bottom:1.4rem;right:4.8rem;z-index:8999;width:2.4rem;height:2.4rem;border-radius:50%;background:rgba(160,210,250,0.14);border:1.5px solid rgba(160,210,250,0.32);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 14px rgba(0,0,0,.22);backdrop-filter:blur(10px);color:#a0d2fa;transition:background .15s,border-color .15s;line-height:1}
  .bap-tts-fab:hover{background:rgba(160,210,250,0.26)}
  .bap-tts-fab.speaking{background:rgba(160,210,250,0.28);border-color:rgba(160,210,250,0.7);box-shadow:0 0 10px rgba(160,210,250,0.3);animation:bap-tts-pulse 1.4s ease-in-out infinite}
  @keyframes bap-tts-pulse{0%,100%{box-shadow:0 0 6px rgba(160,210,250,.25)}50%{box-shadow:0 0 18px rgba(160,210,250,.55)}}
  .bap-tts-panel{position:fixed;bottom:5rem;right:1.2rem;z-index:9002;width:230px;max-width:calc(100vw - 2rem);background:rgba(20,17,32,0.97);border:1px solid rgba(160,210,250,0.22);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.45);backdrop-filter:blur(24px);display:none;flex-direction:column;overflow:hidden;font-family:'DM Sans',sans-serif}
  .bap-tts-panel.open{display:flex}
  [data-theme="light"] .bap-tts-panel{background:rgba(235,245,255,0.97);border-color:rgba(60,140,220,0.22)}
  .bap-tts-head{display:flex;align-items:center;padding:.6rem .85rem;border-bottom:1px solid rgba(255,255,255,.07);gap:.4rem;flex-shrink:0}
  [data-theme="light"] .bap-tts-head{border-bottom-color:rgba(0,0,0,.07)}
  .bap-tts-head span{flex:1;font-size:.78rem;font-weight:700;color:#a0d2fa;letter-spacing:.02em}
  [data-theme="light"] .bap-tts-head span{color:rgba(30,90,160,1)}
  .bap-tts-head button{background:none;border:none;cursor:pointer;font-size:.88rem;color:rgba(232,228,240,.4);padding:.18rem;border-radius:5px;line-height:1;transition:color .15s}
  .bap-tts-head button:hover{color:#e8e4f0}
  .bap-tts-body{padding:.65rem .85rem;display:flex;flex-direction:column;gap:.55rem}
  .bap-tts-lbl{font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:rgba(160,210,250,.6);margin-bottom:.15rem}
  [data-theme="light"] .bap-tts-lbl{color:rgba(30,90,160,.6)}
  .bap-tts-sel{width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:8px;color:#e8e4f0;padding:.38rem .55rem;font-size:.78rem;font-family:'DM Sans',sans-serif;cursor:pointer;outline:none;-webkit-appearance:none;appearance:none;transition:border-color .15s;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(160,210,250,.6)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right .55rem center}
  .bap-tts-sel:focus{border-color:rgba(160,210,250,.5)}
  [data-theme="light"] .bap-tts-sel{background-color:rgba(255,255,255,.7);border-color:rgba(0,0,0,.12);color:#1a1730;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(30,90,160,.6)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")}
  .bap-tts-rates{display:flex;gap:.3rem}
  .bap-tts-rb{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:.3rem .1rem;font-size:.7rem;font-weight:700;cursor:pointer;color:rgba(232,228,240,.45);transition:all .15s;text-align:center;font-family:'DM Sans',sans-serif}
  .bap-tts-rb.active{background:rgba(160,210,250,.18);border-color:rgba(160,210,250,.45);color:#a0d2fa}
  [data-theme="light"] .bap-tts-rb{background:rgba(0,0,0,.04);border-color:rgba(0,0,0,.1);color:rgba(26,21,37,.45)}
  [data-theme="light"] .bap-tts-rb.active{background:rgba(30,100,200,.12);border-color:rgba(30,100,200,.3);color:rgba(20,80,180,1)}
  .bap-tts-stop{background:rgba(240,184,196,.08);border:1px solid rgba(240,184,196,.2);border-radius:9px;padding:.38rem .6rem;font-size:.76rem;font-weight:600;cursor:pointer;color:rgba(240,184,196,.45);transition:all .15s;text-align:center;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:.35rem}
  .bap-tts-stop:hover{background:rgba(240,184,196,.18);border-color:rgba(240,184,196,.45);color:#f0b8c4}
  `;
  document.head.appendChild(style);

  var fab=document.createElement('button');
  fab.className='bap-tts-fab';
  fab.title='Voix & lecture (TTS)';
  fab.innerHTML='<svg class="ic" style="width:1em;height:1em"><use href="#i-volume-2"/></svg>';
  document.body.appendChild(fab);

  function _updFab(){fab.classList.toggle('speaking',_speaking);}

  var panel=document.createElement('div');
  panel.className='bap-tts-panel';
  panel.innerHTML=
    '<div class="bap-tts-head">'+
      '<span>🔊 Voix &amp; lecture</span>'+
      '<button id="bap-tts-close" title="Fermer">✕</button>'+
    '</div>'+
    '<div class="bap-tts-body">'+
      '<div>'+
        '<div class="bap-tts-lbl">Voix française</div>'+
        '<select class="bap-tts-sel" id="bap-tts-vsel"></select>'+
      '</div>'+
      '<div>'+
        '<div class="bap-tts-lbl">Vitesse</div>'+
        '<div class="bap-tts-rates" id="bap-tts-rates">'+
          '<button class="bap-tts-rb" data-r="0.75">0.75\xD7</button>'+
          '<button class="bap-tts-rb active" data-r="1">1\xD7</button>'+
          '<button class="bap-tts-rb" data-r="1.25">1.25\xD7</button>'+
          '<button class="bap-tts-rb" data-r="1.5">1.5\xD7</button>'+
        '</div>'+
      '</div>'+
      '<button class="bap-tts-stop" id="bap-tts-stp">'+
        '<svg class="ic" style="width:.85em;height:.85em"><use href="#i-volume-x"/></svg> Arrêter'+
      '</button>'+
    '</div>';
  document.body.appendChild(panel);

  function _renderVoices(){
    var sel=document.getElementById('bap-tts-vsel');
    if(!sel||!_frVoices.length){
      if(sel)sel.innerHTML='<option value="">Aucune voix FR détectée</option>';
      return;
    }
    var cur=sel.value;
    sel.innerHTML='';
    _frVoices.forEach(function(v,i){
      var o=document.createElement('option');
      o.value=i;
      o.textContent=v.name.replace(/\s*\(.*\)/,'');
      if(_voice&&v.name===_voice.name)o.selected=true;
      sel.appendChild(o);
    });
    if(cur&&!_voice)sel.value=cur;
  }
  _renderVoices();

  document.getElementById('bap-tts-vsel').addEventListener('change',function(){
    var idx=parseInt(this.value);
    if(!isNaN(idx)&&_frVoices[idx])_voice=_frVoices[idx];
  });

  document.getElementById('bap-tts-rates').addEventListener('click',function(e){
    var btn=e.target.closest('.bap-tts-rb');
    if(!btn)return;
    _rate=parseFloat(btn.dataset.r)||1;
    document.querySelectorAll('.bap-tts-rb').forEach(function(b){
      b.classList.toggle('active',b.dataset.r===btn.dataset.r);
    });
  });

  document.getElementById('bap-tts-stp').addEventListener('click',function(){
    speechSynthesis.cancel();
    _speaking=false;_updFab();
  });

  document.getElementById('bap-tts-close').addEventListener('click',function(){
    panel.classList.remove('open');
  });

  fab.addEventListener('click',function(){panel.classList.toggle('open');});
  document.addEventListener('click',function(e){
    if(!panel.contains(e.target)&&!fab.contains(e.target))panel.classList.remove('open');
  });
  window.addEventListener('beforeunload',function(){speechSynthesis.cancel();});
})();
