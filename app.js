const tabs=document.querySelectorAll('.tab');
const views={dashboard:document.getElementById('view-dashboard'),log:document.getElementById('view-log'),gallery:document.getElementById('view-gallery'),settings:document.getElementById('view-settings')};
const el={
  waterValue:document.getElementById('waterValue'),
  waterProgress:document.getElementById('waterProgress'),
  sleepValue:document.getElementById('sleepValue'),
  stepsValue:document.getElementById('stepsValue'),
  weightValue:document.getElementById('weightValue'),
  bmiValue:document.getElementById('bmiValue'),
  waterTarget:document.getElementById('waterTarget'),
  saveWaterTarget:document.getElementById('saveWaterTarget'),
  waterAdd:document.getElementById('waterAdd'),
  addWater:document.getElementById('addWater'),
  sleepStart:document.getElementById('sleepStart'),
  sleepStop:document.getElementById('sleepStop'),
  sleepTimer:document.getElementById('sleepTimer'),
  sleepHours:document.getElementById('sleepHours'),
  addSleep:document.getElementById('addSleep'),
  stepsCount:document.getElementById('stepsCount'),
  addSteps:document.getElementById('addSteps'),
  heightCm:document.getElementById('heightCm'),
  saveHeight:document.getElementById('saveHeight'),
  weightKg:document.getElementById('weightKg'),
  addWeight:document.getElementById('addWeight'),
  foodName:document.getElementById('foodName'),
  foodCalories:document.getElementById('foodCalories'),
  addFood:document.getElementById('addFood'),
  foodTodayTotal:document.getElementById('foodTodayTotal'),
  themeToggle:document.getElementById('themeToggle'),
  setLight:document.getElementById('setLight'),
  setDark:document.getElementById('setDark'),
  exportData:document.getElementById('exportData'),
  importFile:document.getElementById('importFile'),
  importData:document.getElementById('importData'),
  gallery:document.getElementById('gallery'),
  lightbox:document.getElementById('lightbox'),
  lightboxImg:document.getElementById('lightboxImg'),
  lightboxClose:document.getElementById('lightboxClose')
};
const defaultData={stats:{water:{target:2000,log:[]},sleep:{log:[]},steps:{log:[]},weight:{height_cm:170,log:[]},food:{log:[]}},theme:'light',runtime:{sleepStart:null}};
function loadData(){try{const s=localStorage.getItem('hm.data');if(!s)return JSON.parse(JSON.stringify(defaultData));const d=JSON.parse(s);if(!d.stats||!d.theme)return JSON.parse(JSON.stringify(defaultData));if(!d.runtime)d.runtime={sleepStart:null};return d}catch(e){return JSON.parse(JSON.stringify(defaultData))}}
function saveData(){localStorage.setItem('hm.data',JSON.stringify(data))}
function today(){return new Date().toISOString().slice(0,10)}
function sumToday(arr,field){const t=today();return arr.filter(x=>x.date===t).reduce((a,b)=>a+(b[field]||0),0)}
function latest(arr){if(!arr.length)return null;return arr[arr.length-1]}
function bmi(kg,cm){if(!kg||!cm)return null;const m=cm/100;const v=kg/(m*m);return Math.round(v*10)/10}
function updateDashboard(){const wt=data.stats.water.target||0;const w=sumToday(data.stats.water.log,'ml');el.waterValue.textContent=`${w}/${wt} ml`;const pct=wt?Math.min(100,Math.round(w/wt*100)):0;el.waterProgress.style.width=pct+'%';const sl=latest(data.stats.sleep.log);el.sleepValue.textContent=sl?`${sl.hours} h`:'0 h';const st=sumToday(data.stats.steps.log,'count');el.stepsValue.textContent=`${st}`;const lw=latest(data.stats.weight.log);el.weightValue.textContent=lw?`${lw.kg} kg`:'-- kg';const b=lw?bmi(lw.kg,data.stats.weight.height_cm):null;el.bmiValue.textContent=b?`BMI: ${b}`:'BMI: --';const ft=sumToday(data.stats.food.log,'calories');el.foodTodayTotal.textContent=`今日总热量: ${ft} kcal`}
function switchView(id){Object.values(views).forEach(v=>v.classList.remove('active'));tabs.forEach(t=>t.classList.remove('active'));views[id].classList.add('active');document.querySelector(`.tab[data-view="${id}"]`).classList.add('active')}
function initForms(){el.waterTarget.value=data.stats.water.target;el.heightCm.value=data.stats.weight.height_cm}
function addWaterMl(ml){if(!ml||ml<=0)return;data.stats.water.log.push({date:today(),ml});saveData();updateDashboard()}
function addSleepHours(hours){if(!hours||hours<=0)return;data.stats.sleep.log.push({date:today(),hours});saveData();updateDashboard()}
function addStepsCount(count){if(!count||count<=0)return;data.stats.steps.log.push({date:today(),count});saveData();updateDashboard()}
function addWeightKg(kg){if(!kg||kg<=0)return;data.stats.weight.log.push({date:today(),kg});saveData();updateDashboard()}
function addFoodItem(name,calories){if(!name||!calories||calories<=0)return;data.stats.food.log.push({date:today(),name,calories});saveData();updateDashboard()}
function setTheme(t){data.theme=t;document.documentElement.setAttribute('data-theme',t);saveData()}
function buildGallery(){const imgs=[...Array(11).keys()].map(i=>`${i}.jpg`);el.gallery.innerHTML='';imgs.forEach(src=>{const img=document.createElement('img');img.src=src;img.alt=src;img.addEventListener('click',()=>{el.lightboxImg.src=src;el.lightbox.classList.add('show')});el.gallery.appendChild(img)})}
let data=loadData();
document.documentElement.setAttribute('data-theme',data.theme);
tabs.forEach(t=>t.addEventListener('click',()=>switchView(t.dataset.view)));
el.saveWaterTarget.addEventListener('click',()=>{const v=parseInt(el.waterTarget.value||'0',10);if(isNaN(v)||v<0)return;data.stats.water.target=v;saveData();updateDashboard()});
el.addWater.addEventListener('click',()=>{const v=parseInt(el.waterAdd.value||'0',10);addWaterMl(v);el.waterAdd.value=''});
document.querySelectorAll('[data-water]').forEach(b=>b.addEventListener('click',()=>addWaterMl(parseInt(b.dataset.water,10))));
el.sleepStart.addEventListener('click',()=>{if(data.runtime.sleepStart)return;data.runtime.sleepStart=Date.now();el.sleepTimer.textContent='计时中';saveData()});
el.sleepStop.addEventListener('click',()=>{if(!data.runtime.sleepStart)return;const ms=Date.now()-data.runtime.sleepStart;data.runtime.sleepStart=null;const h=Math.round(ms/3600000*100)/100;addSleepHours(h);el.sleepTimer.textContent='未开始';saveData()});
el.addSleep.addEventListener('click',()=>{const v=parseFloat(el.sleepHours.value||'0');addSleepHours(v);el.sleepHours.value=''});
el.addSteps.addEventListener('click',()=>{const v=parseInt(el.stepsCount.value||'0',10);addStepsCount(v);el.stepsCount.value=''});
document.querySelectorAll('[data-steps]').forEach(b=>b.addEventListener('click',()=>addStepsCount(parseInt(b.dataset.steps,10))));
el.saveHeight.addEventListener('click',()=>{const v=parseInt(el.heightCm.value||'0',10);if(isNaN(v)||v<=0)return;data.stats.weight.height_cm=v;saveData();updateDashboard()});
el.addWeight.addEventListener('click',()=>{const v=parseFloat(el.weightKg.value||'0');addWeightKg(v);el.weightKg.value=''});
el.addFood.addEventListener('click',()=>{const n=el.foodName.value.trim();const c=parseInt(el.foodCalories.value||'0',10);addFoodItem(n,c);el.foodName.value='';el.foodCalories.value=''});
el.themeToggle.addEventListener('click',()=>setTheme(data.theme==='light'?'dark':'light'));
el.setLight.addEventListener('click',()=>setTheme('light'));
el.setDark.addEventListener('click',()=>setTheme('dark'));
el.exportData.addEventListener('click',()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='健康管理数据.json';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(url);a.remove()},0)});
el.importData.addEventListener('click',()=>{const f=el.importFile.files&&el.importFile.files[0];if(!f)return;const reader=new FileReader();reader.onload=e=>{try{const d=JSON.parse(e.target.result);if(!d.stats||!d.theme)return;data=d;document.documentElement.setAttribute('data-theme',data.theme);saveData();initForms();updateDashboard()}catch(err){}};reader.readAsText(f)});
el.lightboxClose.addEventListener('click',()=>{el.lightbox.classList.remove('show');el.lightboxImg.src=''});
el.lightbox.addEventListener('click',e=>{if(e.target===el.lightbox)el.lightbox.classList.remove('show')});
initForms();
buildGallery();
updateDashboard();