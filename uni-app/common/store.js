import { reactive } from 'vue'

const defaultData={stats:{water:{target:2000,log:[]},sleep:{log:[]},steps:{log:[]},weight:{height_cm:170,log:[]},food:{log:[]}},theme:'dark',runtime:{sleepStart:null}}

function loadData(){try{const s=uni.getStorageSync('hm.data');if(!s)return JSON.parse(JSON.stringify(defaultData));const d=JSON.parse(s);if(!d.stats||!d.theme)return JSON.parse(JSON.stringify(defaultData));if(!d.runtime)d.runtime={sleepStart:null};return d}catch(e){return JSON.parse(JSON.stringify(defaultData))}}
function saveData(){uni.setStorageSync('hm.data',JSON.stringify(state))}
function today(){return new Date().toISOString().slice(0,10)}
function sumToday(arr,field){const t=today();return arr.filter(x=>x.date===t).reduce((a,b)=>a+(b[field]||0),0)}
function latest(arr){if(!arr.length)return null;return arr[arr.length-1]}
function bmi(kg,cm){if(!kg||!cm)return null;const m=cm/100;const v=kg/(m*m);return Math.round(v*10)/10}

export const state=reactive(loadData())

export const actions={
  addWater(amount){const t=today();state.stats.water.log.push({date:t,time:new Date().toISOString().slice(11,16),ml:amount});saveData()},
  setWaterTarget(v){state.stats.water.target=v;saveData()},
  startSleep(){state.runtime.sleepStart=new Date().toISOString();saveData()},
  endSleep(){if(!state.runtime.sleepStart)return;const start=new Date(state.runtime.sleepStart);const end=new Date();const ms=end-start;const h=Math.floor(ms/3600000);const m=Math.round((ms%3600000)/60000);state.stats.sleep.log.push({date:today(),start:state.runtime.sleepStart,end:end.toISOString(),h,m});state.runtime.sleepStart=null;saveData()},
  logSteps(count,dist_km,duration_min){state.stats.steps.log.push({date:today(),steps:count,km:dist_km,duration_min});saveData()},
  logWeight(kg){state.stats.weight.log.push({date:today(),kg});saveData()},
  logMeal(name,kcal,macro){state.stats.food.log.push({date:today(),name,kcal,macro});saveData()}
}

export const selectors={
  waterToday(){return sumToday(state.stats.water.log,'ml')},
  waterProgress(){const done=sumToday(state.stats.water.log,'ml');const tgt=state.stats.water.target||0;return tgt?Math.min(100,Math.round(done*100/tgt)):0},
  lastSleep(){return latest(state.stats.sleep.log)},
  todaySteps(){return sumToday(state.stats.steps.log,'steps')},
  lastWeight(){return latest(state.stats.weight.log)},
  bmi(){const w=latest(state.stats.weight.log);return bmi(w?w.kg:null,state.stats.weight.height_cm)}
}