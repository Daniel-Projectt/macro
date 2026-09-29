/* ================================================================ my list
   Daniel's one-page list, word for word as he wrote it down: 24 lines in five
   chapters. The page, its flashcards and its quiz all read from here. Each
   line has several questions; a quiz round asks one for every line.          */
var LIST = [
 {ch:"1 · GDP", rows:[
  {id:"goals",    sec:"g-gdp-basics",   cue:"Macro goals",          line:"<b>G</b>rowth, <b>E</b>mployment, <b>P</b>rices"},
  {id:"gdp",      sec:"g-gdp-def",      cue:"GDP formula",          line:"C + I + G + (X − M). Transfers out. Imports cancel."},
  {id:"counts",   sec:"g-gdp-counts",   cue:"What counts",          line:"<b>N</b>ew, <b>F</b>inal, <b>H</b>ere, <b>M</b>arket"},
  {id:"gmisses",  sec:"g-gdp-limits",   cue:"What GDP misses",      line:"<b>L</b>eisure, <b>I</b>ncome, <b>E</b>nvironment, <b>S</b>ustainability, <b>H</b>ome"},
  {id:"real",     sec:"g-gdp-real",     cue:"Nominal vs real",      line:"<b>N</b>ow prices vs <b>R</b>eference prices. Same in the base year."}]},
 {ch:"2 · Growth", rows:[
  {id:"double",   sec:"g-gro-facts",    cue:"Doubling",             line:"70 ÷ growth rate. Growth is not guaranteed."},
  {id:"kinds",    sec:"g-gro-terms",    cue:"Two kinds of growth",  line:"Catch-up = <b>more</b> stuff. Innovative = <b>better</b> ideas (it lasts)."},
  {id:"steady",   sec:"g-gro-model",    cue:"Steady state",         line:"Investment = depreciation. Only <b>technology</b> raises output forever."},
  {id:"savemore", sec:"g-gro-shifts",   cue:"Saving more",          line:"Moves <b>only</b> the investment curve."},
  {id:"inst",     sec:"g-gro-policy",   cue:"Institutions vs policies", line:"Rules of the game vs the plays. Solow’s gaps: 3 I’s and a P."}]},
 {ch:"3 · Labor", rows:[
  {id:"box",      sec:"g-lab-classify", cue:"Which box?",           line:"Has a job → employed. Looked in the last 4 weeks → unemployed. Neither → not in the labor force."},
  {id:"rates",    sec:"g-lab-rates",    cue:"The rates",            line:"Unemployment rate ÷ <b>labor force</b>. The other two ÷ <b>all adults</b>."},
  {id:"types",    sec:"g-lab-types",    cue:"Types",                line:"<b>F</b>inding, <b>S</b>kills, <b>C</b>ycle, <b>S</b>eason. Natural rate = F + S only."},
  {id:"odd",      sec:"g-lab-moves",    cue:"Odd moves",            line:"3–2–2. U-3 misses people who gave up."}]},
 {ch:"4 · Prices", rows:[
  {id:"cpi",      sec:"g-pri-index",    cue:"CPI",                  line:"Basket now ÷ base-year basket × 100. <b>Base = bottom.</b>"},
  {id:"infl",     sec:"g-pri-index",    cue:"Inflation",            line:"(new − old) ÷ <b>old</b>. Divide by the earlier one."},
  {id:"defl",     sec:"g-pri-index",    cue:"Deflator",             line:"Nominal ÷ real × 100. <b>N before R.</b>"},
  {id:"convert",  sec:"g-pri-index",    cue:"Converting dollars",   line:"$ × CPI <b>want</b> ÷ CPI <b>have</b>"},
  {id:"flations", sec:"g-pri-concepts", cue:"The -flations",        line:"Car: forward, slowing, reverse, parked. Only reverse goes back."},
  {id:"cpierr",   sec:"g-pri-concepts", cue:"The CPI’s error",      line:"Overstates: better quality, switching, new products"}]},
 {ch:"5 · Saving", rows:[
  {id:"saving",   sec:"g-sav-identity", cue:"Saving",               line:"National Y − C − G · Private Y − T − C · Public T − G"},
  {id:"open",     sec:"g-sav-identity", cue:"Open economy",         line:"Invest more than you save → <b>borrow</b> abroad. Save more → <b>lend</b> abroad."},
  {id:"invest",   sec:"g-sav-finance",  cue:"Investment",           line:"Things you can <b>touch</b>, not stocks and bonds"},
  {id:"finance",  sec:"g-sav-finance",  cue:"Financing",            line:"Direct = hand to hand. Indirect = <b>bank in the middle</b>."}]}
];

var LISTQ = [
 /* ---- 1 · GDP ---- */
 {row:"goals",t:"mc",q:"The three goals of macro policy are:",a:"steady growth, employment and stable prices",w:["steady growth, low taxes and a balanced budget","high employment, free trade and a strong dollar","stable prices, low debt and high interest rates"],e:"G-E-P: Growth, Employment, Prices."},
 {row:"goals",t:"mc",q:"Which of these is NOT one of the three macro goals?",a:"a balanced government budget",w:["steady economic growth over time","high employment across the country","stable prices from year to year"],e:"G-E-P: Growth, Employment, Prices. A balanced budget isn’t on the list."},

 {row:"gdp",t:"mc",q:"The GDP formula is:",a:"C + I + G + (X − M)",w:["C + I + G + (M − X)","C + I + G + T","C + S + G + (X − M)"],e:"Consumption + investment + government purchases + net exports."},
 {row:"gdp",t:"mc",q:"C = 3,000, I = 1,000, G = 800, transfers = 400, X = 200, M = 300. GDP is:",a:"$4,700",w:["$5,100","$5,300","$4,900"],e:"3,000 + 1,000 + 800 + (200 − 300) = 4,700. Transfers stay out — $5,100 wrongly adds them."},
 {row:"gdp",t:"mc",q:"A U.S. firm buys a bulldozer made in Japan. U.S. GDP:",a:"stays the same — the import cancels out",w:["rises by the full price of the bulldozer","falls by the full price of the bulldozer","rises by twice the price of the bulldozer"],e:"Investment goes up and imports go up by the same amount. Imports cancel. You missed this one on Problem Set 1."},

 {row:"counts",t:"mc",q:"To count in GDP, a good must pass four tests. They are:",a:"new, final, made here, sold in a market",w:["new, used, made here or made abroad","final or intermediate, made here, sold anywhere","new, final, made by citizens, sold in a market"],e:"New, Final, Here, Market."},
 {row:"counts",t:"mc",q:"Wheat sells for $20, the bread made from it sells to a store for $50, and the store sells it for $90. GDP rises by:",a:"$90",w:["$160","$140","$70"],e:"Only the final sale counts — the F in New, Final, Here, Market. Total sales ($160) are bigger than GDP."},
 {row:"counts",t:"mc",q:"Which of these IS counted in GDP?",a:"a new car sold to a family",w:["a used car sold to a neighbor","wheat sold to a flour mill","a parent cooking dinner at home"],e:"New, final, made here, sold in a market. A used car isn’t new, wheat for a mill isn’t final, home cooking isn’t sold."},

 {row:"gmisses",t:"mc",q:"Which of these does GDP miss?",a:"leisure, income distribution and the environment",w:["consumption, investment and government purchases","exports, imports and all of the net exports","final goods and services sold in the market"],e:"L-I-E-S at Home: Leisure, Income, Environment, Sustainability, Home production."},
 {row:"gmisses",t:"mc",q:"Lily changes her own oil instead of paying a mechanic. Measured GDP:",a:"goes down",w:["goes up","stays the same","doubles"],e:"Home production isn’t measured — a market sale disappeared. The H in L-I-E-S at Home."},
 {row:"gmisses",t:"tf",q:"GDP overstates sustainability when machines wear out and nobody replaces them.",a:true,e:"True — the S in L-I-E-S."},

 {row:"real",t:"mc",q:"Real GDP uses:",a:"base-year prices × this year’s quantities",w:["this year’s prices × this year’s quantities","this year’s prices × base-year quantities","base-year prices × base-year quantities"],e:"Real = Reference (base-year) prices. The quantities are always this year’s."},
 {row:"real",t:"mc",q:"In the base year, real GDP is:",a:"equal to nominal GDP",w:["larger than nominal GDP","smaller than nominal GDP","always zero"],e:"Same in the base year — its prices are the base-year prices. You missed this one on Problem Set 1."},
 {row:"real",t:"mc",q:"Base year = Year 1. Shirts: 10 at $5 in Year 1, 12 at $6 in Year 2. Hats: 4 at $10 in Year 1, 5 at $12 in Year 2. Real GDP in Year 2 is:",a:"$110",w:["$132","$90","$120"],e:"Year 1 prices × Year 2 quantities: 5 × 12 + 10 × 5 = 110. ($132 uses Year 2 prices — that’s nominal.)"},

 /* ---- 2 · Growth ---- */
 {row:"double",t:"mc",q:"Years to double =",a:"70 ÷ the growth rate",w:["the growth rate ÷ 70","70 × the growth rate","100 ÷ the growth rate"],e:"The rule of 70. Use the percent as a whole number: 5% → 70 ÷ 5."},
 {row:"double",t:"mc",q:"An economy grows 5% a year. About how many years to double?",a:"14 years",w:["35 years","7 years","20 years"],e:"70 ÷ 5 = 14."},
 {row:"double",t:"tf",q:"A middle-income country is guaranteed to become rich eventually.",a:false,e:"False — growth is not guaranteed."},

 {row:"kinds",t:"mc",q:"Catch-up growth comes from:",a:"more inputs — more machines, workers or resources",w:["better ideas that use the same inputs more wisely","higher prices for the goods the country sells","a lower savings rate that raises consumption"],e:"Catch-up = more stuff."},
 {row:"kinds",t:"mc",q:"A new method makes the same output with less waste. That is:",a:"innovative growth",w:["catch-up growth","diminishing returns","cyclical growth"],e:"Better ideas, not more stuff → innovative. You missed this one on Problem Set 2."},
 {row:"kinds",t:"mc",q:"Which kind of growth lasts, and why?",a:"innovative — ideas are limitless",w:["catch-up — machines never wear out","catch-up — countries keep saving","innovative — prices keep rising"],e:"More stuff runs into diminishing returns. Better ideas don’t run out."},

 {row:"steady",t:"mc",q:"The steady state is where:",a:"investment equals depreciation",w:["investment equals government spending","output equals the capital stock","saving equals consumption"],e:"New machines = worn-out machines, so the number of machines stops changing."},
 {row:"steady",t:"mc",q:"What is the only thing that raises output forever?",a:"better technology",w:["more machines","a higher savings rate","more workers"],e:"More machines or more saving only reach a new steady state. Only technology keeps raising output."},
 {row:"steady",t:"mc",q:"Investment is bigger than depreciation. The answer to “add capital?” is:",a:"yes — capital grows",w:["no — capital shrinks","no — it is at the steady state","yes — but output falls"],e:"Faucet bigger than the drain → the water rises."},

 {row:"savemore",t:"mc",q:"The savings rate rises. Which curve shifts?",a:"only the investment curve",w:["only the production curve","the production and investment curves","only the depreciation line"],e:"Saving isn’t in the production function, only in investment (I = s × Y). You missed this one on Problem Set 2."},
 {row:"savemore",t:"mc",q:"The savings rate rises. Steady-state output:",a:"rises to a new level",w:["falls to a lower level","stays exactly the same","grows faster forever"],e:"More saving → more investment → a higher steady state. Only technology raises output forever."},

 {row:"inst",t:"mc",q:"Institutions differ from policies because institutions are:",a:"the rules of the game — permanent, broad",w:["the plays — narrow, easy to change each year","the laws Congress passes every single year","the yearly budget choices of a government"],e:"Institutions = rules of the game (rule of law, property rights). Policies = the plays."},
 {row:"inst",t:"mc",q:"Property rights are:",a:"an institution",w:["a policy choice","a trade barrier","a transfer payment"],e:"A permanent, broad rule of the game."},
 {row:"inst",t:"mc",q:"Solow’s gaps are “3 I’s and a P.” Which of these is one of them?",a:"it treats population as a negative",w:["it ignores the savings rate completely","it has no role for capital or machines","it assumes every country stays poor"],e:"Institutions (taken as given), Ideas (unexplained), Identical technology (assumed), Population (treated as a negative)."},

 /* ---- 3 · Labor ---- */
 {row:"box",t:"mc",q:"Someone works 10 hours a week. They are:",a:"employed",w:["unemployed","not in the labor force","a discouraged worker"],e:"Any job, any hours → employed."},
 {row:"box",t:"mc",q:"She wants a job but stopped looking two months ago. She is:",a:"not in the labor force",w:["unemployed","employed","frictionally unemployed"],e:"She didn’t look in the last 4 weeks → not in the labor force (a discouraged worker)."},
 {row:"box",t:"mc",q:"He lost his job and applied to three jobs last week. He is:",a:"unemployed",w:["employed","not in the labor force","a discouraged worker"],e:"No job, and he looked in the last 4 weeks → unemployed."},

 {row:"rates",t:"mc",q:"The unemployment rate divides the number unemployed by:",a:"the labor force",w:["all adults in the country","the number employed","the whole population"],e:"The unemployment rate is the only one that divides by the labor force."},
 {row:"rates",t:"mc",q:"200 adults: 120 employed, 30 unemployed, 50 not looking. The unemployment rate is:",a:"20%",w:["15%","25%","60%"],e:"Labor force = 120 + 30 = 150. 30 ÷ 150 = 20%. (15% wrongly divides by all adults.)"},
 {row:"rates",t:"mc",q:"200 adults: 120 employed, 30 unemployed, 50 not looking. The LFPR is:",a:"75%",w:["60%","80%","20%"],e:"Labor force 150 ÷ all adults 200 = 75%."},
 {row:"rates",t:"mc",q:"1,000 adults, LFPR 50%, unemployment rate 10%. How many are employed?",a:"450",w:["500","900","400"],e:"Labor force = 1,000 × 50 ÷ 100 = 500. Unemployed = 500 × 10 ÷ 100 = 50. Employed = 500 − 50 = 450."},

 {row:"types",t:"mc",q:"A ski instructor has no work in July. That is:",a:"seasonal unemployment",w:["cyclical unemployment","structural unemployment","frictional unemployment"],e:"The S for Season."},
 {row:"types",t:"mc",q:"A factory worker is replaced by a robot. That is:",a:"structural unemployment",w:["frictional unemployment","seasonal unemployment","cyclical unemployment"],e:"Skills no longer fit → structural."},
 {row:"types",t:"mc",q:"90 employed, 10 unemployed (3 frictional, 2 structural, 5 cyclical). The natural rate is:",a:"5%",w:["10%","5.6%","3%"],e:"Natural rate = F + S only: (3 + 2) ÷ (90 + 10) = 5%. Cyclical stays in the bottom."},
 {row:"types",t:"mc",q:"The natural rate counts which types of unemployment?",a:"frictional and structural",w:["cyclical and seasonal ones","frictional and cyclical","every one of the four types"],e:"Only the two that never go away: Finding and Skills."},

 {row:"odd",t:"mc",q:"More people start looking for work; some find jobs and some don’t. What can happen?",a:"the unemployment rate and the EPR both rise",w:["the unemployment rate rises and the EPR falls","both the unemployment rate and the EPR fall","nothing, because the labor force is fixed"],e:"Newcomers → both can rise: some get jobs (EPR up), some don’t yet (unemployment up)."},
 {row:"odd",t:"mc",q:"Why does the official unemployment rate (U-3) look better than reality?",a:"it leaves out people who gave up looking",w:["it counts part-time workers as unemployed","it divides by all adults, not the labor force","it includes retirees in the labor force"],e:"People who gave up aren’t counted as unemployed."},
 {row:"odd",t:"mc",q:"Why does structural unemployment exist?",a:"wages set above the market level",w:["the economy is in a recession","people are between jobs for a while","it is the wrong season for the work"],e:"A wage set too high, like a minimum wage above the market level, means fewer jobs."},
 {row:"odd",t:"mc",q:"Real GDP rises. Firms need:",a:"more workers",w:["fewer workers","the same number of workers","only part-time workers"],e:"Making more takes more people."},
 {row:"odd",t:"tf",q:"In the course’s view, work is meaningful because it lets people take part in improving creation.",a:true,e:"True — from the reading on work."},

 /* ---- 4 · Prices ---- */
 {row:"cpi",t:"mc",q:"The CPI formula is:",a:"basket now ÷ basket in the base year × 100",w:["basket in the base year ÷ basket now × 100","basket now − basket in the base year","nominal GDP ÷ real GDP × 100"],e:"Base = bottom."},
 {row:"cpi",t:"mc",q:"A basket costs $200 in the base year and $250 now. The CPI now is:",a:"125",w:["80","50","250"],e:"250 ÷ 200 × 100 = 125. (80 puts the base on top — base = bottom.)"},
 {row:"cpi",t:"mc",q:"In the base year, the CPI is always:",a:"100",w:["0","50","1,000"],e:"The base year is the starting point, set to 100."},

 {row:"infl",t:"mc",q:"The inflation rate is:",a:"(new − old) ÷ old × 100",w:["(new − old) ÷ new × 100","(old − new) ÷ old × 100","new ÷ old × 100"],e:"Divide by the earlier one."},
 {row:"infl",t:"mc",q:"The CPI goes from 75 to 100. Inflation is:",a:"33.33%",w:["25.00%","−25.00%","133.33%"],e:"(100 − 75) ÷ 75 × 100 = 33.33%. Divide by 75, the earlier year. You missed this one on Problem Set 4."},
 {row:"infl",t:"mc",q:"The CPI goes from 80 to 100. Inflation is:",a:"25%",w:["20%","80%","125%"],e:"(100 − 80) ÷ 80 × 100 = 25%. 20% would be dividing by 100 instead of 80."},

 {row:"defl",t:"mc",q:"The GDP deflator is:",a:"nominal GDP ÷ real GDP × 100",w:["real GDP ÷ nominal GDP × 100","nominal GDP − real GDP","real GDP × the CPI ÷ 100"],e:"N before R: nominal on top."},
 {row:"defl",t:"mc",q:"Nominal GDP is $120 and real GDP is $100. The deflator is:",a:"120",w:["83.3","20","100"],e:"120 ÷ 100 × 100 = 120. (83.3 flips it — N before R.)"},

 {row:"convert",t:"mc",q:"To move a dollar amount into another year’s dollars:",a:"$ × CPI of the year you want ÷ CPI of the year you have",w:["$ × CPI of the year you have ÷ CPI of the year you want","$ + CPI of the year you want − CPI of the year you have","$ ÷ CPI of the year you want × CPI of the year you have"],e:"Want over have."},
 {row:"convert",t:"mc",q:"The CPI was 50 in 1990 and is 150 today. $20 from 1990 is worth, in today’s dollars:",a:"$60",w:["$6.67","$120","$30"],e:"You want today, so 150 goes on top: 20 × 150 ÷ 50 = 60."},
 {row:"convert",t:"mc",q:"The CPI was 100 in 1980 and 300 in 2020. $30 from 2020 is worth, in 1980 dollars:",a:"$10",w:["$90","$30","$100"],e:"You want 1980, so 100 goes on top: 30 × 100 ÷ 300 = 10."},

 {row:"flations",t:"mc",q:"Inflation falls from 6% to 3%. That is:",a:"disinflation — still rising, but slower",w:["deflation — prices are now going down","inflation — prices rising faster than before","zero inflation — prices frozen in place"],e:"The car is slowing down but still moving forward."},
 {row:"flations",t:"mc",q:"After years of inflation, inflation hits 0%. Prices:",a:"stay at the higher level",w:["go back to where they were","start falling right away","double over the next year"],e:"The car is parked where it stopped. Only reverse (deflation) goes back."},
 {row:"flations",t:"mc",q:"What is the only way prices go back to an earlier level?",a:"deflation",w:["disinflation","zero inflation","core inflation"],e:"Only reverse goes back."},

 {row:"cpierr",t:"mc",q:"The CPI tends to:",a:"overstate inflation",w:["understate inflation","measure inflation exactly","ignore food prices"],e:"It misses better quality, switching to cheaper things and new products."},
 {row:"cpierr",t:"mc",q:"Why does the CPI overstate inflation?",a:"it misses better quality, switching and new products",w:["it counts food and energy twice every single year","it uses too many products in the basket each year","it divides by the wrong year when it computes prices"],e:"Three misses: quality, switching, new products."},
 {row:"cpierr",t:"mc",q:"Core CPI leaves out:",a:"food and energy",w:["housing and rent","clothing and shoes","taxes and fees"],e:"Their prices jump around too much."},

 /* ---- 5 · Saving ---- */
 {row:"saving",t:"mc",q:"National saving is:",a:"Y − C − G",w:["Y − T − C","T − G","C + I + G"],e:"What’s left of the pie after households and the government eat."},
 {row:"saving",t:"mc",q:"Private saving is:",a:"Y − T − C",w:["Y − C − G","T − G","Y − I − G"],e:"My paycheck, minus taxes, minus what I spend."},
 {row:"saving",t:"mc",q:"Public saving is:",a:"T − G",w:["G − T","Y − T − C","Y − C − G"],e:"The government’s taxes minus its spending."},
 {row:"saving",t:"mc",q:"Y = 500, C = 300, G = 100, T = 120. National saving is:",a:"100",w:["80","20","220"],e:"500 − 300 − 100 = 100. (80 is private saving, 20 is public.)"},

 {row:"open",t:"mc",q:"A country invests more than it saves. It:",a:"borrows the gap from abroad",w:["lends the extra to other countries","must have no trade at all","exports more than it imports"],e:"Invest more than you save → borrow abroad, and imports are bigger than exports."},
 {row:"open",t:"mc",q:"A country saves more than it invests. It:",a:"lends the extra abroad",w:["borrows the gap from abroad","must have no trade at all","imports more than it exports"],e:"Save more → lend abroad, and exports are bigger than imports."},
 {row:"open",t:"mc",q:"Saving is 100 and investment is 130. How much comes from foreigners?",a:"30",w:["130","230","100"],e:"130 − 100 = 30. Invest more than you save → borrow the rest."},
 {row:"open",t:"mc",q:"In a closed economy (no trade), saving and investment are:",a:"always equal",w:["never equal","equal only in recessions","equal only in the base year"],e:"No trade means nobody to borrow from or lend to."},

 {row:"invest",t:"mc",q:"In macro, which of these is investment?",a:"a firm buying a new truck",w:["you buying Apple shares","a family buying a bond","you opening a savings account"],e:"Things you can touch. Shares, bonds and bank accounts are saving."},
 {row:"invest",t:"mc",q:"In macro, buying stocks and bonds counts as:",a:"saving, not investment",w:["investment, not saving","consumption","government purchases"],e:"Paper, not a machine."},

 {row:"finance",t:"mc",q:"Buying a bond from the U.S. Treasury is:",a:"direct financing",w:["indirect financing","investment","a transfer payment"],e:"Hand to hand — no bank in the middle."},
 {row:"finance",t:"mc",q:"You put money in a savings account and the bank lends it to a business. That is:",a:"indirect financing",w:["direct financing","investment in capital","public saving"],e:"A bank in the middle → indirect."},
 {row:"finance",t:"mc",q:"Buying stock in a company’s IPO is:",a:"direct financing",w:["indirect financing","consumption","public saving"],e:"The company gets your money straight from you — hand to hand."}
];
