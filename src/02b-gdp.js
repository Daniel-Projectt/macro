/* ================================================================ GDP
   Intro to macro and GDP. Five sections, from Problem Set 1 and Pitfalls in
   GDP Accounting.                                                             */
var CH = {};
CH.gdp = {n:1, title:"Intro to Macro and GDP", short:"GDP",
 notes:[
  {id:"gdp-basics", h:"Macro Basics", body:
   '<div class="point"><b>The point</b><p>Macroeconomics looks at the economy as a whole. Its policy goals are <b>steady economic growth, high employment and stable prices</b>. A question about one caf&eacute;&rsquo;s coffee demand is micro; inflation, national unemployment and stabilization policy are macro. And the first trap in thinking about the whole is the <b>fallacy of composition</b>.</p><p class="able"><b>Be able to</b> name the three policy goals, sort a question into micro or macro, tell a microfoundation model from an ad hoc one, and spot a fallacy of composition.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 1 &middot; Aug 20&ndash;27</span></p>'+
   '<div class="boxrow"><div class="box"><h4>Micro</h4><p>One market, one firm, one household: coffee demand at a caf&eacute;, how a bakery prices a loaf.</p></div><div class="box"><h4>Macro</h4><p>The whole economy: inflation, the national unemployment rate, growth, stabilization policy.</p></div></div>'+
   '<ul><li><b>Microfoundation models</b> rest on behavioral assumptions &mdash; rational consumers, profit-maximizing firms. <b>Ad hoc models</b> explain a phenomenon without those foundations.</li>'+
   '<li>The three <b>macro policy goals</b>: steady economic growth, high employment, stable prices.</li></ul>'+
   '<h3 class="sub" id="gdp-fallacy">The fallacy of composition</h3>'+
   '<p>Assuming that <b>what is true for one part is true for the whole</b>. All three of these count as examples:</p>'+
   '<ul><li>One person saving more means the nation saves more.</li><li>One failing store means the whole industry is failing.</li><li>One price going up means the price level went up.</li></ul>'},

  {id:"gdp-def", h:"GDP and the Expenditure Approach", body:
   '<div class="point"><b>The point</b><p><b>GDP</b> is the market value of all <b>final</b> goods and services produced <b>within a country</b> in a given period. Market prices are what let coal and legal advice add up into one number. The expenditure approach splits it into who bought it: <b>GDP = C + I + G + (X &minus; M)</b>. The traps are all in the letters: machinery is I, transfers are not G, and an import cancels out.</p><p class="able"><b>Be able to</b> give the definition, compute GDP from C, I, G, X and M with transfers thrown in as a distraction, and say what an import does to the accounts.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 1 &middot; you missed four questions here</span></p>'+
   '<p>Every word of the definition does work: <b>market value</b> (prices add unlike things), <b>final</b> (no double counting), <b>within a country</b> (location, not citizenship), <b>in a given period</b> (a flow, per year or quarter).</p>'+
   '<h3 class="sub" id="gdp-expenditure">C + I + G + (X &minus; M)</h3>'+
   '<div class="formula">GDP = C + I + G + (X &minus; M)<small>consumption + investment + government purchases + net exports</small></div>'+
   '<div class="tblwrap"><table class="tbl"><thead><tr><th>Letter</th><th>What it is</th><th>The trap</th></tr></thead><tbody>'+
   '<tr><td class="head">C</td><td class="sm">Household spending on durables, nondurables and services.</td><td class="sm">A <b>firm&rsquo;s</b> purchase of machinery is <b>I</b>, not C.</td></tr>'+
   '<tr><td class="head">I</td><td class="sm">New capital goods &mdash; machines, structures &mdash; and additions to inventory.</td><td class="sm">Not stocks and bonds.</td></tr>'+
   '<tr><td class="head">G</td><td class="sm">Government <b>purchases</b> of goods and services &mdash; hiring teachers, buying jets.</td><td class="sm"><b>Transfers are excluded</b> &mdash; Social Security, unemployment benefits &mdash; because nothing is produced.</td></tr>'+
   '<tr><td class="head">X &minus; M</td><td class="sm">Exports minus imports.</td><td class="sm">An imported good raises I (or C) <i>and</i> M by the same amount, so <b>GDP is unchanged</b>.</td></tr>'+
   '</tbody></table></div>'+
   '<div class="exam-tip"><b>Gondor, from Problem Set 1</b>C = $4,000; I = 30% of C = $1,200; G = $1,200; transfers $500 (ignored); X = $300, M = $500. GDP = 4,000 + 1,200 + 1,200 + (300 &minus; 500) = <b>$6,200</b>.</div>'+
   '<div class="exam-tip"><b>The Japanese bulldozer</b>A U.S. firm buys a bulldozer made in Japan: <b>I up, net exports down by the same amount, U.S. GDP unchanged</b>. The bulldozer was produced in Japan, so it belongs in Japan&rsquo;s GDP.</div>'+
   '<ul><li>The identity is an <b>accounting tautology</b>: it records spending, it does not prove causation. It always holds; it never explains.</li>'+
   '<li>GDP = total income = total expenditure. When GDP rises, income and expenditure both rise &mdash; every dollar spent is a dollar earned.</li></ul>'},

  {id:"gdp-counts", h:"What Counts in GDP", body:
   '<div class="point"><b>The point</b><p>GDP counts <b>final goods only</b>, and the value of the final sale equals the <b>sum of value added</b> along the chain. That is why total sales in the economy are <b>larger</b> than GDP. Left out: intermediate sales, home production, illegal activity, transfers, used goods and financial assets. And it is <b>location, not citizenship</b>.</p><p class="able"><b>Be able to</b> work the apples-to-cider chain, say what happens to measured GDP when work moves home, and place a citizen working abroad.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 1</span></p>'+
   '<div class="flow"><div class="step"><b>Farmer &rarr; cider maker: $50</b>Value added $50.</div><div class="step"><b>Cider maker &rarr; innkeeper: $80</b>Value added $30.</div><div class="step"><b>Innkeeper &rarr; guests: $200</b>Value added $120. GDP rises by <b>$200</b> &mdash; the final sale, which equals 50 + 30 + 120.</div></div>'+
   '<ul><li><b>Total sales</b> (50 + 80 + 200 = $330) are <b>larger than GDP</b>, because sales include intermediate goods.</li></ul>'+
   '<h3 class="sub" id="gdp-leftout">What is left out</h3>'+
   '<div class="boxrow"><div class="box"><h4>Counted</h4><ul><li>The government hiring teachers (a purchase of a service)</li><li>Final goods and services sold at market</li><li>Output produced inside the country, whoever produces it</li></ul></div>'+
   '<div class="box"><h4>Not counted</h4><ul><li>Intermediate sales &mdash; wheat sold to a mill</li><li>Home production &mdash; a parent&rsquo;s own childcare</li><li>Illegal activity</li><li>Transfers</li><li>Used goods</li><li>Financial assets &mdash; stocks, bonds</li></ul></div></div>'+
   '<ul><li><b>Lily&rsquo;s oil change</b>: if she changes her own oil instead of paying a mechanic, measured GDP <b>decreases</b> &mdash; a market transaction disappeared.</li>'+
   '<li>A <b>U.S. citizen working in Canada</b> counts in <b>Canada&rsquo;s</b> GDP only.</li></ul>'},

  {id:"gdp-limits", h:"Limits of GDP", body:
   '<div class="point"><b>The point</b><p>GDP is the <b>broadest measure of production</b> we have &mdash; and it is not a measure of well-being. It ignores <b>leisure</b>, <b>income distribution</b>, <b>environmental quality</b> and <b>home production</b>, and it <b>overstates sustainability</b> when capital wears out without being replaced.</p><p class="able"><b>Be able to</b> list the pitfalls and recognise which one a story is about.</p></div>'+
   '<p class="knowline"><span class="know">Pitfalls in GDP Accounting</span></p>'+
   '<div class="levels">'+
   '<div class="lv"><b>Leisure</b><span>Two countries with equal output per person, one working 60 hours a week and one 35 &mdash; GDP cannot tell them apart.</span></div>'+
   '<div class="lv"><b>Income distribution</b><span>The same GDP can be spread evenly or held by a few.</span></div>'+
   '<div class="lv"><b>Environmental quality</b><span>Output that pollutes counts in full; the damage does not count at all.</span></div>'+
   '<div class="lv"><b>Home production</b><span>Unpaid work at home is real production that never enters the number.</span></div>'+
   '<div class="lv"><b>Sustainability</b><span>Producing today while capital wears out unreplaced looks fine in GDP &mdash; until the capital is gone.</span></div></div>'},

  {id:"gdp-real", h:"Real vs Nominal GDP", body:
   '<div class="point"><b>The point</b><p><b>Nominal GDP</b> values this year&rsquo;s output at <b>this year&rsquo;s prices</b>. <b>Real GDP</b> values it at <b>base-year prices</b>, so that only quantities move it. In the <b>base year the two are equal</b>. Nominal GDP can rise from inflation alone, which is why it misleads about growth.</p><p class="able"><b>Be able to</b> compute nominal and real GDP from a table of prices and quantities with a given base year, and say why real = nominal in the base year.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 1 &middot; Question 1</span></p>'+
   '<div class="formula">Nominal GDP<sub>t</sub> = &Sigma; (price<sub>t</sub> &times; quantity<sub>t</sub>) &nbsp;&nbsp;&middot;&nbsp;&nbsp; Real GDP<sub>t</sub> = &Sigma; (price<sub>base</sub> &times; quantity<sub>t</sub>)</div>'+
   '<h3 class="sub" id="gdp-realworked">Worked example &mdash; crystals and pearls, base year 2024</h3>'+
   '<div class="tblwrap"><table class="tbl"><thead><tr><th></th><th>2023</th><th>2024</th></tr></thead><tbody>'+
   '<tr><td class="head">Crystals</td><td class="sm">800 at $15</td><td class="sm">1,000 at $16.50</td></tr>'+
   '<tr><td class="head">Pearls</td><td class="sm">150 at $200</td><td class="sm">180 at $220</td></tr>'+
   '<tr><td class="head">Nominal GDP</td><td class="sm">15 &times; 800 + 200 &times; 150 = <b>$42,000</b></td><td class="sm">16.50 &times; 1,000 + 220 &times; 180 = <b>$56,100</b></td></tr>'+
   '<tr><td class="head">Real GDP (2024 prices)</td><td class="sm">16.50 &times; 800 + 220 &times; 150 = <b>$46,200</b></td><td class="sm">= nominal = <b>$56,100</b></td></tr>'+
   '</tbody></table></div>'+
   '<div class="exam-tip"><b>You missed this one</b>Real GDP in the base year is simply nominal GDP in the base year &mdash; base-year prices <i>are</i> that year&rsquo;s prices. No second calculation.</div>'},

 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["Macroeconomics","The study of the economy as a whole — inflation, unemployment, growth, stabilization policy","g-gdp-basics"],
   ["The three macro policy goals","Steady economic growth, high employment, stable prices","g-gdp-basics"],
   ["Microfoundation model","A model resting on behavioral assumptions — rational consumers, profit-maximizing firms","g-gdp-basics"],
   ["Ad hoc model","A model that explains a phenomenon without behavioral assumptions","g-gdp-basics"],
   ["Fallacy of composition","Assuming that what is true for one part is true for the whole","g-gdp-basics"],
   ["GDP","The market value of all final goods and services produced within a country in a given period","g-gdp-def"],
   ["Consumption (C)","Household spending on durables, nondurables and services","g-gdp-def"],
   ["Investment (I)","New capital goods — machines, structures — and additions to inventory","g-gdp-def"],
   ["Government purchases (G)","Government spending on goods and services — transfers excluded","g-gdp-def"],
   ["Transfer payment","Money moved without production — Social Security, unemployment benefits — not in GDP","g-gdp-def"],
   ["Net exports (X − M)","Exports minus imports","g-gdp-def"],
   ["Accounting tautology","The expenditure identity: it always holds and records spending, but proves no causation","g-gdp-def"],
   ["Final good","A good sold to its end user — the only kind counted in GDP","g-gdp-counts"],
   ["Intermediate good","A good used up in making another good — wheat sold to a mill — not counted","g-gdp-counts"],
   ["Value added","A producer’s sale price minus the cost of its intermediate inputs; the sum equals the final sale","g-gdp-counts"],
   ["Home production","Unpaid work at home — a parent’s childcare, changing your own oil — not measured","g-gdp-counts"],
   ["Location, not citizenship","A U.S. citizen working in Canada counts in Canada’s GDP","g-gdp-counts"],
   ["Pitfalls of GDP","Leisure, income distribution, environmental quality, home production, sustainability","g-gdp-limits"],
   ["Nominal GDP","Current-year prices × current-year quantities","g-gdp-real"],
   ["Real GDP","Base-year prices × current-year quantities","g-gdp-real"],
   ["Base year","The year whose prices value real GDP; in it, real GDP equals nominal GDP","g-gdp-real"]]},
  {id:"lists", label:"Formulas & lists", cards:[
   ["The expenditure approach","GDP = C + I + G + (X − M)","g-gdp-def"],
   ["A firm buys machinery — which letter?","I, not C","g-gdp-def"],
   ["An import’s effect on GDP","I (or C) up and M up by the same amount — GDP unchanged","g-gdp-def"],
   ["Gondor’s GDP","4,000 + 1,200 + 1,200 + (300 − 500) = $6,200; transfers excluded","g-gdp-def"],
   ["GDP, income and expenditure","All the same number — when one rises, all rise","g-gdp-def"],
   ["Apples → cider → inn","$50 → $80 → $200: GDP rises by $200 = 50 + 30 + 120 value added","g-gdp-counts"],
   ["Total sales vs GDP","Larger — sales include intermediate goods","g-gdp-counts"],
   ["Lily changes her own oil","Measured GDP decreases — a market transaction disappeared","g-gdp-counts"],
   ["What GDP ignores","Leisure, income distribution, environmental quality, home production","g-gdp-limits"],
   ["When GDP overstates sustainability","When capital wears out without being replaced","g-gdp-limits"],
   ["Nominal GDP 2023 and 2024 (crystals, pearls)","$42,000 and $56,100","g-gdp-real"],
   ["Real GDP 2023 and 2024, base 2024","$46,200 and $56,100","g-gdp-real"],
   ["Why nominal GDP misleads","It can rise from inflation alone","g-gdp-real"]]}
 ]
};

/* ---- GDP questions ---- */
var QB = [
 {tp:"gdp",sec:"g-gdp-basics",m:1,t:"mc",q:"The three macroeconomic policy goals are:",a:"steady economic growth, high employment and stable prices",w:["low taxes, balanced budgets and free trade with every partner","high interest rates, a strong currency and low national debt","maximum profits, minimum wages and open markets for exports"],e:"Growth, employment, prices."},
 {tp:"gdp",sec:"g-gdp-basics",m:1,t:"mc",q:"Which of these is a macroeconomic question rather than a microeconomic one?",a:"Why the national unemployment rate rose last year",w:["Why demand for coffee fell at one café downtown","How a bakery should price its new sourdough loaf","Whether a farmer should plant corn or soybeans"],e:"Inflation, national unemployment and stabilization policy are macro; one café’s demand is micro."},
 {tp:"gdp",sec:"g-gdp-basics",m:1,t:"mc",q:"A microfoundation model differs from an ad hoc model in that it:",a:"rests on behavioral assumptions — rational consumers, profit-maximizing firms",w:["explains a phenomenon without any assumptions about how people behave","uses data from small businesses rather than from large corporations","applies to a single market rather than to the economy as a whole"],e:"Ad hoc models explain phenomena without behavioral foundations."},
 {tp:"gdp",sec:"g-gdp-basics",m:1,t:"mc",q:"The fallacy of composition is:",a:"assuming that what is true for one part must be true for the whole",w:["assuming that what is true for the whole must be true for each part","adding intermediate goods to final goods when computing GDP","confusing a rise in one price with a fall in the value of money"],e:"One saver saves more → the nation saves more? Not necessarily."},
 {tp:"gdp",sec:"g-gdp-basics",m:1,t:"mc",q:"Which of these is an example of the fallacy of composition?",a:"All of these — one saver saving more means the nation saves more; one failing store means the industry is failing; one price rising means the price level rose",w:["Only the claim that one person saving more means the nation saves more — the other two are valid inferences about the whole","Only the claim that one failing store means the whole industry is failing — the other two are valid inferences","Only the claim that one price rising means the price level rose — the other two are valid inferences about the whole"],e:"All three count."},
 {tp:"gdp",sec:"g-gdp-basics",ap:true,t:"mc",q:"In a recession every household cuts its spending to save more, and total saving in the economy ends up lower. Which idea does that illustrate?",a:"The fallacy of composition — what is true for one household is not true for all of them together",w:["Diminishing returns — each extra dollar saved earns less than the last dollar did","Disinflation — saving slows down but does not stop altogether","The rule of 70 — saving doubles roughly every seventy years"],e:"The paradox of thrift is the classic case."},
 {tp:"gdp",sec:"g-gdp-basics",t:"tf",q:"Stabilization policy is a microeconomic topic.",a:false,e:"False — it concerns the whole economy, so it is macro."},
 {tp:"gdp",sec:"g-gdp-basics",t:"tf",q:"An ad hoc model explains a phenomenon without resting on behavioral assumptions.",a:true,e:"True — that is what separates it from a microfoundation model."},

 {tp:"gdp",sec:"g-gdp-def",m:1,t:"mc",q:"GDP is defined as:",a:"the market value of all final goods and services produced within a country in a given period",w:["the total sales of all goods and services, intermediate and final, made within a country in a period","the market value of everything produced by a country’s citizens, wherever in the world they work","the total income earned by a country’s households from wages, rent, interest and profit in a year"],e:"Final goods, within the country, in a period — market prices let coal and legal advice add up."},
 {tp:"gdp",sec:"g-gdp-def",m:1,t:"mc",q:"Why is GDP measured at market prices?",a:"So that very different goods and services can be added into one number",w:["Because the government sets the prices of most goods and services","So that intermediate goods can be counted at every stage of production","Because market prices stay the same from one year to the next"],e:"Coal and legal advice have nothing in common except a dollar value."},
 {tp:"gdp",sec:"g-gdp-def",m:1,t:"mc",q:"The expenditure approach to GDP is:",a:"GDP = C + I + G + (X − M)",w:["GDP = C + I + G + (M − X)","GDP = C + S + T + (X − M)","GDP = C + I + G − (X + M)"],e:"Consumption, investment, government purchases, net exports."},
 {tp:"gdp",sec:"g-gdp-def",m:2,t:"mc",q:"Which of these is NOT part of consumption (C)?",a:"A firm’s purchase of new machinery",w:["A household’s purchase of a refrigerator","A household’s spending on a haircut","A household’s purchase of groceries"],e:"Machinery bought by a firm is investment (I). You missed this on Problem Set 1."},
 {tp:"gdp",sec:"g-gdp-def",m:1,t:"mc",q:"Which of these counts in government purchases (G)?",a:"The government hiring teachers",w:["Social Security payments to retirees","Unemployment benefits paid to the jobless","Interest paid on the national debt"],e:"Transfers are excluded — nothing is produced. Hiring a teacher buys a service."},
 {tp:"gdp",sec:"g-gdp-def",m:2,t:"mc",q:"A U.S. firm buys a bulldozer made in Japan. The effect on the U.S. accounts is:",a:"I rises, net exports fall by the same amount, GDP is unchanged",w:["I rises and GDP rises by the full price of the bulldozer","Net exports fall and GDP falls by the price of the bulldozer","C rises, I falls by the same amount, GDP is unchanged"],e:"The import shows up in I and in M equally, so it cancels. You missed this on Problem Set 1."},
 {tp:"gdp",sec:"g-gdp-def",m:2,t:"mc",q:"Gondor: C = $4,000, I = 30% of C, G = $1,200, transfers = $500, exports = $300, imports = $500. Its GDP is:",a:"$6,200",w:["$6,700","$5,700","$6,400"],e:"4,000 + 1,200 + 1,200 + (300 − 500) = 6,200; the transfers are excluded. You missed this on Problem Set 1."},
 {tp:"gdp",sec:"g-gdp-def",m:2,t:"mc",q:"The identity GDP = C + I + G + (X − M) is best described as:",a:"an accounting tautology — it records spending but does not prove causation",w:["a theory showing that government spending causes GDP to grow","a law showing that exports cause growth and imports cause recessions","a forecast of how GDP will respond when consumption changes"],e:"It always holds by construction; it explains nothing. You missed this on Problem Set 1."},
 {tp:"gdp",sec:"g-gdp-def",m:1,t:"mc",q:"When GDP rises, what happens to total income and total expenditure?",a:"Both rise — GDP, total income and total expenditure are the same number",w:["Income rises, but expenditure may fall if households save more","Expenditure rises, but income stays where it was until next year","Neither changes until prices adjust in the following period"],e:"Every dollar spent is a dollar earned."},
 {tp:"gdp",sec:"g-gdp-def",ap:true,t:"mc",q:"A state sends $2,000 checks to every resident. At the moment the checks go out, GDP:",a:"does not change — a transfer payment is not a purchase of goods or services",w:["rises, because G goes up by the total value of the checks","rises, because C goes up by the total value of the checks","rises twice over — once as income and once as spending"],e:"Transfers move money; they produce nothing."},
 {tp:"gdp",sec:"g-gdp-def",t:"tf",q:"Investment (I) in the GDP accounts includes additions to inventory.",a:true,e:"True — new capital goods plus inventory."},

 {tp:"gdp",sec:"g-gdp-counts",m:1,t:"mc",q:"A farmer sells apples to a cider maker for $50, who sells the cider to an innkeeper for $80, who sells it to guests for $200. GDP rises by:",a:"$200",w:["$330","$150","$120"],e:"Only the final sale — equal to the value added: 50 + 30 + 120."},
 {tp:"gdp",sec:"g-gdp-counts",m:1,t:"mc",q:"A farmer sells apples to a cider maker for $50, who sells the cider to an innkeeper for $80, who sells it to guests for $200. The cider maker’s value added is:",a:"$30",w:["$80","$50","$120"],e:"80 − 50."},
 {tp:"gdp",sec:"g-gdp-counts",m:2,t:"mc",q:"Total sales in an economy, compared with its GDP, are:",a:"larger, because sales include intermediate goods",w:["equal, because every sale is counted exactly once","smaller, because sales leave out services","equal only in the base year, and larger otherwise"],e:"Counting intermediate sales would double count. You missed this on Problem Set 1."},
 {tp:"gdp",sec:"g-gdp-counts",m:1,t:"mc",q:"Which of these IS counted in GDP?",a:"A school district hiring a new teacher",w:["A parent caring for her own children at home","A mill buying wheat from a farmer","A used car sold by one neighbor to another"],e:"Home production, intermediate goods and used goods are all left out."},
 {tp:"gdp",sec:"g-gdp-counts",m:1,t:"mc",q:"Lily used to pay a mechanic to change her oil; now she does it herself. Measured GDP:",a:"decreases, because a market transaction disappeared",w:["increases, because the same work is done more cheaply","stays the same, because the oil still gets changed","increases by the price of the oil she buys"],e:"Home production is not measured."},
 {tp:"gdp",sec:"g-gdp-counts",m:1,t:"mc",q:"A U.S. citizen works in Canada. Her output counts in:",a:"Canada’s GDP only",w:["U.S. GDP only","both countries’ GDP","neither country’s GDP"],e:"Location, not citizenship."},
 {tp:"gdp",sec:"g-gdp-counts",t:"mc",q:"Which of these is excluded from GDP?",a:"All of these — intermediate sales, illegal activity, transfers, used goods and financial assets",w:["Only intermediate sales and illegal activity — transfers, used goods and financial assets are counted","Only used goods and financial assets — intermediate sales, illegal activity and transfers are counted","Only transfers and illegal activity — intermediate sales, used goods and financial assets are counted"],e:"None of them is current production of a final good or service."},
 {tp:"gdp",sec:"g-gdp-counts",ap:true,t:"mc",q:"An investor buys $10,000 of existing shares in a company. GDP:",a:"does not change — buying a financial asset is not production",w:["rises by $10,000, counted as investment","rises by $10,000, counted as consumption","falls by $10,000, because the household spent less"],e:"Ownership changed hands; nothing was produced."},
 {tp:"gdp",sec:"g-gdp-counts",t:"tf",q:"Intermediate goods are counted in GDP as long as they are produced inside the country.",a:false,e:"False — only final goods count, or the same output would be counted twice."},
 {tp:"gdp",sec:"g-gdp-counts",t:"tf",q:"The sum of value added at every stage equals the value of the final good.",a:true,e:"True — which is why the two ways of counting agree."},

 {tp:"gdp",sec:"g-gdp-limits",m:1,t:"mc",q:"GDP is best described as:",a:"the broadest measure of production, but not a measure of well-being",w:["a complete measure of well-being that includes leisure","a measure of income only, with production left out","a measure that includes home production and the environment"],e:"Pitfalls in GDP Accounting."},
 {tp:"gdp",sec:"g-gdp-limits",m:1,t:"mc",q:"Which of these does GDP ignore?",a:"All of these — leisure, income distribution, environmental quality and home production",w:["Only leisure — income distribution, environmental quality and home production are all measured","Only income distribution — leisure, environmental quality and home production are all measured","Only environmental quality — leisure, income distribution and home production are all measured"],e:"All four are left out of the number."},
 {tp:"gdp",sec:"g-gdp-limits",m:1,t:"mc",q:"GDP overstates sustainability when:",a:"capital wears out without being replaced",w:["exports exceed imports for several years","the government runs a budget surplus","output is measured in base-year prices"],e:"Production today at the expense of the capital stock tomorrow."},
 {tp:"gdp",sec:"g-gdp-limits",ap:true,t:"mc",q:"Two countries have the same GDP per person. In one, people work 60 hours a week; in the other, 35. What does GDP miss?",a:"Leisure — the second country is better off in a way GDP does not record",w:["Inflation — the first country must have the higher prices","Investment — the first country must be building more capital","Nothing — equal GDP per person means equal well-being"],e:"Leisure is one of the pitfalls."},
 {tp:"gdp",sec:"g-gdp-limits",ap:true,t:"mc",q:"A factory raises its output but pollutes the river that supplied the town’s fish. GDP:",a:"rises by the extra output and ignores the environmental loss",w:["falls by the market value of the fish that were lost","is unchanged, because the gain and the loss cancel out","rises by the extra output minus the cost of cleaning up"],e:"Environmental quality is not in the accounts."},
 {tp:"gdp",sec:"g-gdp-limits",t:"tf",q:"Because GDP ignores income distribution, two countries with the same GDP can have very different living conditions for most people.",a:true,e:"True."},
 {tp:"gdp",sec:"g-gdp-limits",t:"tf",q:"GDP includes the value of a parent’s unpaid childcare at home.",a:false,e:"False — home production is not measured."},

 {tp:"gdp",sec:"g-gdp-real",m:1,t:"mc",q:"Nominal GDP is:",a:"current-year prices × current-year quantities",w:["base-year prices × current-year quantities","current-year prices × base-year quantities","base-year prices × base-year quantities"],e:"Everything at today’s prices."},
 {tp:"gdp",sec:"g-gdp-real",m:1,t:"mc",q:"Real GDP is:",a:"base-year prices × current-year quantities",w:["current-year prices × current-year quantities","current-year prices × base-year quantities","nominal GDP × the inflation rate for the year"],e:"Today’s output valued at the base year’s prices."},
 {tp:"gdp",sec:"g-gdp-real",m:2,t:"mc",q:"In the base year, real GDP is:",a:"equal to nominal GDP",w:["always larger than nominal GDP","always smaller than nominal GDP","undefined, since there is no earlier year"],e:"Base-year prices are that year’s prices. You missed this on Problem Set 1."},
 {tp:"gdp",sec:"g-gdp-real",m:1,t:"mc",q:"Why can nominal GDP mislead about growth?",a:"It can rise from inflation alone, with no more goods produced",w:["It ignores services and counts only physical goods","It is measured in base-year prices, which are out of date","It leaves out government purchases and net exports"],e:"Higher prices, same output, higher nominal GDP."},
 {tp:"gdp",sec:"g-gdp-real",m:1,t:"mc",q:"Crystals: 800 at $15 in 2023, 1,000 at $16.50 in 2024. Pearls: 150 at $200 in 2023, 180 at $220 in 2024. Nominal GDP in 2023 is:",a:"$42,000",w:["$46,200","$56,100","$44,500"],e:"15 × 800 + 200 × 150 = 12,000 + 30,000."},
 {tp:"gdp",sec:"g-gdp-real",m:1,t:"mc",q:"Crystals: 800 at $15 in 2023, 1,000 at $16.50 in 2024. Pearls: 150 at $200 in 2023, 180 at $220 in 2024. Nominal GDP in 2024 is:",a:"$56,100",w:["$52,000","$46,200","$59,400"],e:"16.50 × 1,000 + 220 × 180 = 16,500 + 39,600."},
 {tp:"gdp",sec:"g-gdp-real",m:1,t:"mc",q:"Crystals: 800 at $15 in 2023, 1,000 at $16.50 in 2024. Pearls: 150 at $200 in 2023, 180 at $220 in 2024. With 2024 as the base year, real GDP in 2023 is:",a:"$46,200",w:["$42,000","$56,100","$48,000"],e:"2024 prices × 2023 quantities: 16.50 × 800 + 220 × 150 = 13,200 + 33,000."},
 {tp:"gdp",sec:"g-gdp-real",m:2,t:"mc",q:"Crystals: 800 at $15 in 2023, 1,000 at $16.50 in 2024. Pearls: 150 at $200 in 2023, 180 at $220 in 2024. With 2024 as the base year, real GDP in 2024 is:",a:"$56,100",w:["$46,200","$42,000","$52,800"],e:"In the base year real = nominal. You missed this on Problem Set 1."},
 {tp:"gdp",sec:"g-gdp-real",ap:true,t:"mc",q:"A country’s nominal GDP rose 8% while its price level also rose 8%. Its real GDP:",a:"was roughly unchanged",w:["rose about 8%","rose about 16%","fell about 8%"],e:"All of the nominal rise was inflation."},
 {tp:"gdp",sec:"g-gdp-real",t:"tf",q:"If prices rise and quantities do not change, real GDP rises.",a:false,e:"False — real GDP holds prices at the base year; only quantities move it."}
];
