/* ================================================================ labor
   The labor market. Four sections, from Problem Set 3.                       */
CH.labor = {n:3, title:"The Labor Market", short:"Labor",
 notes:[
  {id:"lab-classify", h:"Classifying People", body:
   '<div class="point"><b>The point</b><p>Everything starts by splitting the <b>adult population</b> into three groups: <b>employed</b>, <b>unemployed</b>, and <b>not in the labor force</b>. The test for unemployed is strict &mdash; no job, wants one, <b>and searched in the last four weeks</b>. Fail the search test and you are not in the labor force at all.</p><p class="able"><b>Be able to</b> place any person &mdash; a part-timer, a student, a retiree, a discouraged worker &mdash; in the right group.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 3 &middot; Sep 10&ndash;15</span></p>'+
   '<div class="levels">'+
   '<div class="lv"><b>Employed</b><span>Working, full-time <b>or part-time</b>. Part-timers are in the labor force.</span></div>'+
   '<div class="lv"><b>Unemployed</b><span>No job, wants one, and <b>searched for work in the last four weeks</b>.</span></div>'+
   '<div class="lv"><b>Not in the labor force</b><span>Full-time students not seeking work; retirees; <b>discouraged workers</b> who stopped searching (no search for five weeks, for instance).</span></div></div>'},

  {id:"lab-rates", h:"The Rates and the Worked Examples", body:
   '<div class="point"><b>The point</b><p>Four ratios, all built from the same three groups. The <b>labor force</b> is employed plus unemployed. The <b>unemployment rate</b> divides by the labor force; the <b>participation rate</b> and the <b>employment-population ratio</b> divide by the adult population. Know which denominator each one uses, then the problem sets are arithmetic.</p><p class="able"><b>Be able to</b> compute LF, u, LFPR, EPR and the natural rate from any three of the numbers, and reverse them (from a rate back to a count).</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 3 &mdash; you missed Gondor&rsquo;s employed and the natural rate</span></p>'+
   '<div class="formula">LF = E + U &nbsp;&nbsp;&middot;&nbsp;&nbsp; u = U &divide; LF &nbsp;&nbsp;&middot;&nbsp;&nbsp; LFPR = LF &divide; adult population &nbsp;&nbsp;&middot;&nbsp;&nbsp; EPR = E &divide; adult population</div>'+
   '<h3 class="sub" id="lab-worked">Worked examples</h3>'+
   '<div class="tblwrap"><table class="tbl"><thead><tr><th>Place</th><th>Given</th><th>Working</th></tr></thead><tbody>'+
   '<tr><td class="head">Gondor</td><td class="sm">Adult population 60M, LFPR 75%, u = 6%</td><td class="sm">LF = 60M &times; 0.75 = 45,000,000. U = 0.06 &times; 45M = <b>2,700,000</b>. E = 45M &minus; 2.7M = <b>42,300,000</b>. (You had the method; the miss was a typo &mdash; check every digit.)</td></tr>'+
   '<tr><td class="head">Dale</td><td class="sm">Adult population 50M, EPR 55%, U = 5M</td><td class="sm">E = 0.55 &times; 50M = 27.5M; LF = 32.5M; u = 5 &divide; 32.5 = <b>15.4%</b>.</td></tr>'+
   '<tr><td class="head">Dog River</td><td class="sm">2023: E 2,400, pop 4,000, LF 2,800 &middot; 2024: U 900, LF 2,400 &middot; 2025: LF 3,900, pop 4,500</td><td class="sm">LF 2023 = <b>2,800</b>; u 2024 = 900 &divide; 2,400 = <b>37.5%</b>; LFPR 2025 = 3,900 &divide; 4,500 = <b>86.7%</b>; EPR 2023 = 2,400 &divide; 4,000 = <b>60%</b>.</td></tr>'+
   '<tr><td class="head">Osgiliath</td><td class="sm">E 45M; U 5M, of whom 0.5M frictional and 0.5M structural</td><td class="sm">Natural rate = (0.5 + 0.5) &divide; (45 + 5) = <b>2%</b>. Cyclical is left out of the numerator, but its people <b>stay in the labor force</b>.</td></tr>'+
   '</tbody></table></div>'},

  {id:"lab-types", h:"Types of Unemployment and the Natural Rate", body:
   '<div class="point"><b>The point</b><p>Four causes of unemployment. <b>Frictional</b>: the search. <b>Structural</b>: a mismatch of skills or location, ultimately because <b>wages sit above the market-clearing level</b>. <b>Cyclical</b>: the recession. <b>Seasonal</b>: the calendar. The <b>natural rate</b> is frictional plus structural &mdash; and it is not zero, because zero would stop the healthy search and reallocation.</p><p class="able"><b>Be able to</b> classify a story into one of the four, compute the natural rate, and say why 0% unemployment would be inefficient.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 3</span></p>'+
   '<div class="tblwrap"><table class="tbl"><thead><tr><th>Type</th><th>Cause</th><th>Example</th></tr></thead><tbody>'+
   '<tr><td class="head">Frictional</td><td class="sm">Job search and matching</td><td class="sm">A new graduate looking for work</td></tr>'+
   '<tr><td class="head">Structural</td><td class="sm">Skill or location mismatch; wages above the market-clearing level</td><td class="sm">A worker whose skills automation made obsolete</td></tr>'+
   '<tr><td class="head">Cyclical</td><td class="sm">Recession, business-cycle downturn</td><td class="sm">Laid off when the housing market collapsed; a retail job lost in a national downturn</td></tr>'+
   '<tr><td class="head">Seasonal</td><td class="sm">Time of year</td><td class="sm">A ski instructor in summer</td></tr>'+
   '</tbody></table></div>'+
   '<h3 class="sub" id="lab-natural">The natural rate</h3>'+
   '<div class="formula">natural rate = (frictional + structural) &divide; labor force</div>'+
   '<ul><li><b>0% unemployment is inefficient</b>: it would stop normal job search and the reallocation of workers to better matches.</li>'+
   '<li>Structural unemployment ultimately occurs because <b>wages sit above market-clearing</b> &mdash; a minimum wage above equilibrium reduces employment or hours.</li></ul>'},

  {id:"lab-moves", h:"How the Rates Move, U-3, Technology and Work", body:
   '<div class="point"><b>The point</b><p>Because the rates share people but not denominators, they can move in surprising ways: the unemployment rate and the employment-population ratio can <b>both rise</b> if participation rises, and the labor force can <b>grow while the LFPR falls</b> if the adult population grows faster. The official rate <b>understates</b> distress; technology <b>strands old skills</b>; and rising real GDP means firms <b>need more labor</b>.</p><p class="able"><b>Be able to</b> explain each of those movements, say what U-3 leaves out, and state the course&rsquo;s view of work.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 3</span></p>'+
   '<ul><li><b>EPR and u can both rise</b> when the LFPR also rises: newcomers enter the labor force, some find jobs (EPR up) and some do not (u up).</li>'+
   '<li>The <b>labor force can grow while the LFPR falls</b> if the adult population grows faster than the labor force.</li></ul>'+
   '<h3 class="sub" id="lab-u3">U-3, technology and work</h3>'+
   '<ul><li><b>U-3</b> (the headline rate) understates distress because it ignores <b>marginally attached and discouraged workers</b>, who are outside the labor force.</li>'+
   '<li><b>Technology</b> raises productivity while cutting demand for outdated skills; that mismatch explains <b>long spells</b> of unemployment even though <b>most spells are short</b>.</li>'+
   '<li><b>Rising real GDP</b> means firms need more labor to produce more.</li>'+
   '<li><b>Christian view of work</b> (the reading-based items): work is meaningful because it lets people <b>participate in improving creation</b>.</li></ul>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Employed","Working, full-time or part-time","g-lab-classify"],
   ["Unemployed","No job, wants one, and searched for work in the last four weeks","g-lab-classify"],
   ["Not in the labor force","Not working and not searching — students not seeking work, retirees, discouraged workers","g-lab-classify"],
   ["Discouraged worker","Wants a job but has stopped searching — counted outside the labor force","g-lab-classify"],
   ["Part-time worker","Employed, and in the labor force","g-lab-classify"],
   ["Labor force","Employed + unemployed","g-lab-rates"],
   ["Unemployment rate","Unemployed ÷ labor force","g-lab-rates"],
   ["Labor force participation rate","Labor force ÷ adult population","g-lab-rates"],
   ["Employment-population ratio","Employed ÷ adult population","g-lab-rates"],
   ["Natural rate of unemployment","(Frictional + structural) ÷ labor force","g-lab-types"],
   ["Frictional unemployment","From job search and matching — a new graduate looking for work","g-lab-types"],
   ["Structural unemployment","From a skill or location mismatch, or wages above market-clearing — skills made obsolete","g-lab-types"],
   ["Cyclical unemployment","From a recession or downturn — laid off when the housing market collapsed","g-lab-types"],
   ["Seasonal unemployment","From the time of year — a ski instructor in summer","g-lab-types"],
   ["Market-clearing wage","The wage at which labor supplied equals labor demanded; wages above it cause structural unemployment","g-lab-types"],
   ["U-3","The official unemployment rate — understates distress by ignoring discouraged and marginally attached workers","g-lab-moves"],
   ["Marginally attached worker","Wants a job and has looked recently, but not in the last four weeks — outside the labor force","g-lab-moves"],
   ["Christian view of work","Work is meaningful because it lets people participate in improving creation","g-lab-moves"]]},
  {id:"lists", label:"Formulas & lists", cards:[
   ["The three groups of the adult population","Employed, unemployed, not in the labor force","g-lab-classify"],
   ["The four-week rule","Searched in the last four weeks = unemployed; otherwise not in the labor force","g-lab-classify"],
   ["Gondor: 60M adults, LFPR 75%, u 6%","LF 45,000,000; U 2,700,000; E 42,300,000","g-lab-rates"],
   ["Dale: 50M adults, EPR 55%, U 5M","E 27.5M; LF 32.5M; u = 15.4%","g-lab-rates"],
   ["Dog River 2024: U 900, LF 2,400","u = 37.5%","g-lab-rates"],
   ["Dog River 2025: LF 3,900, pop 4,500","LFPR = 86.7%","g-lab-rates"],
   ["Osgiliath: 0.5M frictional, 0.5M structural, LF 50M","Natural rate = 2%","g-lab-rates"],
   ["The four types of unemployment","Frictional, structural, cyclical, seasonal","g-lab-types"],
   ["Why 0% unemployment is inefficient","It would stop normal job search and reallocation","g-lab-types"],
   ["Why structural unemployment ultimately occurs","Wages above the market-clearing level","g-lab-types"],
   ["u and EPR both rise when","The LFPR also rises","g-lab-moves"],
   ["LF grows while LFPR falls when","The adult population grows faster than the labor force","g-lab-moves"],
   ["Why U-3 understates distress","It ignores marginally attached and discouraged workers","g-lab-moves"]]}
 ]
};

/* ---- labor questions ---- */
QB = QB.concat([
 {tp:"labor",sec:"g-lab-classify",m:1,t:"mc",q:"A person counts as unemployed if she:",a:"has no job, wants one, and searched for work in the last four weeks",w:["has no job and has stopped looking because none can be found","works part-time but wants full-time work and is looking for it","is a full-time student who is not looking for work this term"],e:"The four-week search is the test."},
 {tp:"labor",sec:"g-lab-classify",m:1,t:"mc",q:"A part-time worker is classified as:",a:"employed, and in the labor force",w:["unemployed, because she wants more hours","not in the labor force, because she is not full-time","half employed and half unemployed"],e:"Any work counts as employed."},
 {tp:"labor",sec:"g-lab-classify",m:1,t:"mc",q:"A discouraged worker who has not searched for five weeks is:",a:"not in the labor force",w:["unemployed, since he still wants a job","employed, since he worked in the past","in the labor force but not counted in any rate"],e:"No search in the last four weeks."},
 {tp:"labor",sec:"g-lab-classify",m:1,t:"mc",q:"A retiree is classified as:",a:"not in the labor force",w:["unemployed","employed","frictionally unemployed"],e:"Not working and not seeking."},
 {tp:"labor",sec:"g-lab-classify",m:1,t:"mc",q:"A full-time student who is not seeking work is:",a:"not in the labor force",w:["unemployed","employed","structurally unemployed"],e:"Not seeking, so not in the labor force."},
 {tp:"labor",sec:"g-lab-classify",ap:true,t:"mc",q:"Marcus lost his job three months ago, applied for two positions last week, and is waiting to hear back. He is:",a:"unemployed — no job, wants one, searched within four weeks",w:["not in the labor force — he has had no job for three months","employed — he is waiting on an offer from an employer","a discouraged worker — he has been out of work too long"],e:"Active search keeps him in the labor force."},
 {tp:"labor",sec:"g-lab-classify",t:"tf",q:"The adult population is split into employed, unemployed, and not in the labor force.",a:true,e:"True — everything starts there."},
 {tp:"labor",sec:"g-lab-classify",t:"tf",q:"Someone who wants a job but has not searched in the last four weeks is counted as unemployed.",a:false,e:"False — without a recent search, they are outside the labor force."},

 {tp:"labor",sec:"g-lab-rates",m:1,t:"mc",q:"The labor force equals:",a:"employed + unemployed",w:["employed + not in the labor force","the adult population − employed","the adult population − retirees"],e:"LF = E + U."},
 {tp:"labor",sec:"g-lab-rates",m:1,t:"mc",q:"The unemployment rate is:",a:"unemployed ÷ labor force",w:["unemployed ÷ adult population","unemployed ÷ employed","(unemployed + discouraged) ÷ labor force"],e:"u = U ÷ LF."},
 {tp:"labor",sec:"g-lab-rates",m:1,t:"mc",q:"The labor force participation rate is:",a:"labor force ÷ adult population",w:["employed ÷ adult population","labor force ÷ employed","employed ÷ labor force"],e:"LFPR = LF ÷ Pop."},
 {tp:"labor",sec:"g-lab-rates",m:1,t:"mc",q:"The employment-population ratio is:",a:"employed ÷ adult population",w:["employed ÷ labor force","labor force ÷ adult population","(employed + unemployed) ÷ adult population"],e:"EPR = E ÷ Pop."},
 {tp:"labor",sec:"g-lab-rates",m:1,t:"mc",q:"Gondor: adult population 60 million, LFPR 75%, unemployment rate 6%. The number unemployed is:",a:"2,700,000",w:["3,600,000","4,500,000","2,250,000"],e:"LF = 45M; 6% of 45M."},
 {tp:"labor",sec:"g-lab-rates",m:2,t:"mc",q:"Gondor again: the number employed is:",a:"42,300,000",w:["45,000,000","42,000,000","56,400,000"],e:"45,000,000 − 2,700,000. You missed this on Problem Set 3 — a typo; check every digit."},
 {tp:"labor",sec:"g-lab-rates",m:1,t:"mc",q:"Dale: adult population 50 million, EPR 55%, 5 million unemployed. The unemployment rate is:",a:"15.4%",w:["10.0%","18.2%","9.1%"],e:"E = 27.5M; LF = 32.5M; 5 ÷ 32.5."},
 {tp:"labor",sec:"g-lab-rates",m:1,t:"mc",q:"Dog River 2024: 900 unemployed, labor force 2,400. The unemployment rate is:",a:"37.5%",w:["27.0%","60.0%","22.5%"],e:"900 ÷ 2,400."},
 {tp:"labor",sec:"g-lab-rates",m:1,t:"mc",q:"Dog River 2025: labor force 3,900, adult population 4,500. The LFPR is:",a:"86.7%",w:["66.7%","115.4%","46.7%"],e:"3,900 ÷ 4,500."},
 {tp:"labor",sec:"g-lab-rates",m:1,t:"mc",q:"Dog River 2023: 2,400 employed, adult population 4,000, labor force 2,800. The EPR is:",a:"60%",w:["70%","85.7%","14.3%"],e:"2,400 ÷ 4,000."},
 {tp:"labor",sec:"g-lab-rates",t:"tf",q:"The labor force participation rate divides the labor force by the number employed.",a:false,e:"False — by the adult population. The employed are only one part of the labor force."},
 {tp:"labor",sec:"g-lab-rates",ap:true,t:"mc",q:"A town has 10,000 adults; 6,000 work, 400 are searching, and 600 gave up searching months ago. Its unemployment rate is:",a:"6.25%",w:["10.0%","4.0%","14.3%"],e:"LF = 6,400; 400 ÷ 6,400. The 600 discouraged workers are not in the labor force."},

 {tp:"labor",sec:"g-lab-types",m:1,t:"mc",q:"Frictional unemployment is caused by:",a:"job search and matching — a new graduate looking for work",w:["a recession — a retail worker laid off in a national downturn","a skill mismatch — a machinist whose job automation took","the time of year — a ski instructor without work in July"],e:"Normal search between jobs."},
 {tp:"labor",sec:"g-lab-types",m:1,t:"mc",q:"Structural unemployment is caused by:",a:"a mismatch of skills or location, or wages held above the market-clearing level",w:["the normal time it takes for a job seeker to find a match","the business cycle turning down and firms laying off workers","seasonal changes in the demand for particular kinds of work"],e:"A worker whose skills automation made obsolete."},
 {tp:"labor",sec:"g-lab-types",m:1,t:"mc",q:"Cyclical unemployment is caused by:",a:"a recession or business-cycle downturn — laid off when the housing market collapsed",w:["job search after graduation — a new graduate looking for a first position","skills that no longer match what employers want — a job lost to automation","a summer with no snow — a ski instructor out of work until winter"],e:"Rises and falls with the economy."},
 {tp:"labor",sec:"g-lab-types",m:1,t:"mc",q:"A ski instructor without work in July is:",a:"seasonally unemployed",w:["cyclically unemployed","structurally unemployed","frictionally unemployed"],e:"Time of year."},
 {tp:"labor",sec:"g-lab-types",m:1,t:"mc",q:"The natural rate of unemployment is:",a:"frictional + structural unemployment, as a share of the labor force",w:["frictional + cyclical unemployment, as a share of the labor force","structural + cyclical unemployment, as a share of the population","zero — the rate the economy reaches at full employment"],e:"Cyclical is left out."},
 {tp:"labor",sec:"g-lab-types",m:2,t:"mc",q:"Osgiliath: 45 million employed and 5 million unemployed, of whom 0.5 million are frictional and 0.5 million structural. The natural rate is:",a:"2%",w:["10%","1%","8%"],e:"(0.5 + 0.5) ÷ 50; cyclical is left out of the numerator but its people stay in the labor force. You missed this on Problem Set 3."},
 {tp:"labor",sec:"g-lab-types",m:1,t:"mc",q:"Why would 0% unemployment be inefficient?",a:"It would stop normal job search and the reallocation of workers to better matches",w:["Firms could not find workers to hire at any wage they offered","Inflation would fall to zero and the value of money would stop changing","The labor force would stop growing and the population would age"],e:"Some frictional unemployment is healthy."},
 {tp:"labor",sec:"g-lab-types",m:1,t:"mc",q:"Structural unemployment ultimately occurs because:",a:"wages sit above the market-clearing level, as with a minimum wage above equilibrium",w:["workers refuse to search for jobs that are available to them","the economy is in a recession and demand for labor has fallen","the population is growing faster than the number of jobs"],e:"Reduced employment or hours."},
 {tp:"labor",sec:"g-lab-types",ap:true,t:"mc",q:"A national downturn closes a chain of stores and its clerks lose their jobs. That unemployment is:",a:"cyclical",w:["frictional","structural","seasonal"],e:"The business cycle."},
 {tp:"labor",sec:"g-lab-types",ap:true,t:"mc",q:"Automation replaces the machinists at a plant, and their skills are not wanted elsewhere. That unemployment is:",a:"structural",w:["cyclical","frictional","seasonal"],e:"Skill mismatch."},
 {tp:"labor",sec:"g-lab-types",t:"tf",q:"The natural rate of unemployment includes cyclical unemployment.",a:false,e:"False — frictional plus structural only."},

 {tp:"labor",sec:"g-lab-moves",m:1,t:"mc",q:"The unemployment rate and the employment-population ratio can both rise at the same time if:",a:"the labor force participation rate also rises",w:["the adult population falls while the labor force stays the same","the employment-population ratio is held fixed by law","the number of discouraged workers rises sharply"],e:"Newcomers enter the labor force — some find jobs, some do not."},
 {tp:"labor",sec:"g-lab-moves",m:1,t:"mc",q:"The labor force can grow while the LFPR falls if:",a:"the adult population grows faster than the labor force",w:["the number of employed workers falls faster than the unemployed","the unemployment rate falls while the population is unchanged","discouraged workers return to searching for work"],e:"A ratio can fall while its numerator rises."},
 {tp:"labor",sec:"g-lab-moves",m:1,t:"mc",q:"The official U-3 unemployment rate understates distress because it:",a:"ignores marginally attached and discouraged workers",w:["counts part-time workers as unemployed","includes retirees in the labor force","counts full-time students as unemployed"],e:"They are outside the labor force, so they are not in the rate."},
 {tp:"labor",sec:"g-lab-moves",m:1,t:"mc",q:"Technology’s effect on the labor market is that it:",a:"raises productivity while cutting demand for outdated skills, which explains long spells of unemployment",w:["lowers productivity and raises the demand for every kind of skill at once","has no effect on who is unemployed, only on how much they are paid","eliminates frictional unemployment by matching workers to jobs instantly"],e:"Most spells are short; mismatch explains the long ones."},
 {tp:"labor",sec:"g-lab-moves",m:1,t:"mc",q:"When real GDP rises, firms:",a:"need more labor to produce more",w:["need less labor, because prices have risen","lay off workers to cut their costs","leave employment unchanged until prices adjust"],e:"More output takes more workers."},
 {tp:"labor",sec:"g-lab-moves",m:1,t:"mc",q:"In the course’s Christian view, work is meaningful because:",a:"it lets people participate in improving creation",w:["it is a punishment that must be endured","it produces income, and nothing beyond that","it keeps people from too much leisure"],e:"From the reading-based problem-set items."},
 {tp:"labor",sec:"g-lab-moves",ap:true,t:"mc",q:"In one year a country’s adult population grows 3% and its labor force grows 1%. Its LFPR:",a:"falls, even though the labor force grew",w:["rises, because the labor force grew","is unchanged, because both grew","cannot be determined from the growth rates"],e:"The denominator grew faster."},
 {tp:"labor",sec:"g-lab-moves",t:"tf",q:"Most spells of unemployment are long.",a:false,e:"False — most are short; skill mismatch explains the long ones."},
 {tp:"labor",sec:"g-lab-moves",t:"tf",q:"Discouraged workers are counted in the U-3 unemployment rate.",a:false,e:"False — they are outside the labor force, which is why U-3 understates distress."}
]);
