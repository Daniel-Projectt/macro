/* ================================================================ saving
   Saving and investment. Two sections, from Problem Set 4 Q11–14.             */
CH.saving = {n:5, title:"Saving and Investment", short:"Saving",
 notes:[
  {id:"sav-identity", h:"National Saving and the Open Economy", body:
   '<div class="point"><b>The point</b><p><b>National saving</b> is what is left of output after households and the government consume: <b>S = Y &minus; C &minus; G</b>, which splits into <b>private</b> saving (Y &minus; T &minus; C) and <b>public</b> saving (T &minus; G). In a <b>closed</b> economy that saving is exactly what finances investment; in an <b>open</b> economy <b>foreign saving fills any gap</b>.</p><p class="able"><b>Be able to</b> compute national, private and public saving from Y, C, G and T, and say what it means when investment exceeds national saving.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 4 Q11&ndash;14 &middot; Sep 24</span></p>'+
   '<div class="formula">S = Y &minus; C &minus; G = (Y &minus; T &minus; C) + (T &minus; G)<small>national saving = private saving + public saving</small></div>'+
   '<div class="formula">Closed economy: S = I &nbsp;&nbsp;&middot;&nbsp;&nbsp; Open economy: I = S + (M &minus; X)<small>foreign saving is the trade deficit</small></div>'+
   '<ul><li>If <b>I exceeds national saving</b>, the economy is open and is <b>using foreign savings</b>.</li>'+
   '<li>A government deficit (T &lt; G) is <b>negative public saving</b>.</li></ul>'},

  {id:"sav-finance", h:"Investment and Direct vs Indirect Financing", body:
   '<div class="point"><b>The point</b><p>In macro, <b>investment</b> means buying <b>new capital goods</b> and replacing the ones that wore out &mdash; <b>not</b> buying stocks or bonds. &ldquo;Savings equals investment&rdquo; means investment is <b>financed entirely out of saving</b>; they are not the same activity. Saving reaches investment by two routes: <b>direct</b> and <b>indirect</b> financing.</p><p class="able"><b>Be able to</b> tell macro investment from financial investment, explain the saving-investment link, and classify a transaction as direct or indirect financing.</p></div>'+
   '<p class="knowline"><span class="know">Problem Set 4 Q11&ndash;14</span></p>'+
   '<ul><li><b>Investment</b> = new machines, structures, inventory, and replacing depreciated capital. Buying shares in an existing company is <b>saving</b> and acquiring a financial asset &mdash; not investment.</li>'+
   '<li>&ldquo;<b>Savings = investment</b>&rdquo; means the investment is paid for out of saving. The saver and the investor are usually different people.</li></ul>'+
   '<h3 class="sub" id="sav-direct">Direct versus indirect financing</h3>'+
   '<div class="boxrow"><div class="box"><h4>Direct financing</h4><p>The saver lends straight to the borrower: buying a <b>bond from the Treasury</b>, buying <b>stock at an IPO</b>, a <b>firm issuing shares</b>.</p></div><div class="box"><h4>Indirect financing</h4><p>An intermediary stands between them: <b>saving through a bank</b> that lends to businesses.</p></div></div>'}
 ],
 decks:[
  {id:"terms", label:"Key terms", cards:[
   ["National saving","Y − C − G — output not consumed by households or government","g-sav-identity"],
   ["Private saving","Y − T − C — income after taxes that is not consumed","g-sav-identity"],
   ["Public saving","T − G — taxes minus government purchases; negative in a deficit","g-sav-identity"],
   ["Closed economy","No trade: national saving equals investment, S = I","g-sav-identity"],
   ["Open economy","Trade with the world: I = S + (M − X), foreign saving fills the gap","g-sav-identity"],
   ["Foreign saving","The trade deficit, M − X — what the rest of the world lends","g-sav-identity"],
   ["Investment (macro)","Buying new capital goods and replacing depreciated ones — not stocks or bonds","g-sav-finance"],
   ["Savings = investment","Investment is financed entirely out of saving; they are not the same activity","g-sav-finance"],
   ["Direct financing","The saver lends straight to the borrower — a Treasury bond, an IPO, a firm issuing shares","g-sav-finance"],
   ["Indirect financing","An intermediary in between — saving through a bank that lends to businesses","g-sav-finance"],
   ["Financial asset","A stock or bond — acquiring one is saving, not investment","g-sav-finance"],
   ["Trade deficit","Imports exceed exports, M − X > 0 — the foreign saving an open economy uses","g-sav-identity"]]},
  {id:"lists", label:"Worked numbers & lists", cards:[
   ["Y = 1,000, C = 600, G = 200, T = 150: national saving","1,000 − 600 − 200 = $200","g-sav-identity"],
   ["Same numbers: private and public saving","$250 and −$50","g-sav-identity"],
   ["If I > national saving","The economy is open and using foreign savings","g-sav-identity"],
   ["I = 260, S = 200: foreign saving","$60 — imports exceed exports by that much","g-sav-identity"],
   ["The two parts of national saving","Private saving (Y − T − C) and public saving (T − G)","g-sav-identity"],
   ["Buying a bond from the Treasury is","Direct financing — straight to the borrower","g-sav-finance"],
   ["Saving through a bank that lends to firms is","Indirect financing — through an intermediary","g-sav-finance"],
   ["Buying stock at an IPO is","Direct financing — the firm receives the saver’s money","g-sav-finance"],
   ["Buying existing shares on the exchange is","Saving and acquiring a financial asset — not investment","g-sav-finance"]]}
 ]
};

/* ---- saving questions ---- */
QB = QB.concat([
 {tp:"saving",sec:"g-sav-identity",m:1,t:"mc",q:"National saving equals:",a:"Y − C − G",w:["Y − T − C","T − G","C + I + G"],e:"Output not consumed by households or government."},
 {tp:"saving",sec:"g-sav-identity",m:1,t:"mc",q:"Private saving is:",a:"Y − T − C",w:["T − G","Y − C − G","Y − I − G"],e:"Income after taxes that is not consumed."},
 {tp:"saving",sec:"g-sav-identity",m:1,t:"mc",q:"Public saving is:",a:"T − G",w:["G − T","Y − T − C","Y − C − G"],e:"Taxes minus government purchases — negative when there is a deficit."},
 {tp:"saving",sec:"g-sav-identity",m:1,t:"mc",q:"In a closed economy:",a:"national saving equals investment",w:["investment exceeds saving by the trade deficit","saving equals consumption","investment equals government purchases"],e:"S = I."},
 {tp:"saving",sec:"g-sav-identity",m:1,t:"mc",q:"In an open economy, investment equals:",a:"S + (M − X) — national saving plus foreign saving",w:["S − (M − X) — national saving minus foreign saving","S + (X − M) — national saving plus the trade surplus","S alone — foreign saving does not enter"],e:"Foreign saving fills the gap."},
 {tp:"saving",sec:"g-sav-identity",m:1,t:"mc",q:"If investment exceeds national saving, the economy:",a:"is open and is using foreign savings",w:["is closed and running a budget surplus","must have zero government spending","is in a recession with falling output"],e:"I > S means the rest of the world is lending."},
 {tp:"saving",sec:"g-sav-identity",ap:true,t:"mc",q:"Y = $1,000, C = $600, G = $200, T = $150. National, private and public saving are:",a:"$200, $250 and −$50",w:["$200, $200 and $0","$250, $250 and −$50","$150, $250 and −$100"],e:"1,000 − 600 − 200 = 200; 1,000 − 150 − 600 = 250; 150 − 200 = −50."},
 {tp:"saving",sec:"g-sav-identity",ap:true,t:"mc",q:"Y = $1,000, C = $600, G = $200 and T = $150, so national saving is $200. Investment is $260 in this open economy. Foreign saving is:",a:"$60 — imports exceed exports by that amount",w:["$0 — the economy finances itself","$260 — all investment is foreign","−$60 — exports exceed imports"],e:"I = S + (M − X) → 260 = 200 + 60."},
 {tp:"saving",sec:"g-sav-identity",t:"tf",q:"A government budget deficit is negative public saving.",a:true,e:"True — T < G."},

 {tp:"saving",sec:"g-sav-finance",m:1,t:"mc",q:"In macroeconomics, investment means:",a:"buying new capital goods and replacing depreciated ones",w:["buying stocks and bonds on the exchange","putting money into a savings account","buying an existing house from its owner"],e:"Not financial investment."},
 {tp:"saving",sec:"g-sav-finance",m:1,t:"mc",q:"“Savings equals investment” means:",a:"investment is financed entirely out of saving — they are not the same activity",w:["saving and investing are two words for the same activity","everyone who saves also invests in capital goods themselves","the amount saved is always spent on consumption in the end"],e:"One finances the other."},
 {tp:"saving",sec:"g-sav-finance",m:1,t:"mc",q:"Which of these is direct financing?",a:"Buying a bond from the Treasury",w:["Depositing money in a bank that lends to businesses","Buying a certificate of deposit from a bank","Paying into a money-market fund at a bank"],e:"The saver lends straight to the borrower."},
 {tp:"saving",sec:"g-sav-finance",m:1,t:"mc",q:"Which of these is indirect financing?",a:"Saving through a bank that lends to businesses",w:["Buying stock at a company’s IPO","A firm issuing new shares to the public","Buying a bond from the Treasury"],e:"An intermediary stands between saver and borrower."},
 {tp:"saving",sec:"g-sav-finance",m:1,t:"mc",q:"A firm issuing new shares to the public is an example of:",a:"direct financing",w:["indirect financing","public saving","depreciation"],e:"Savers buy the firm’s shares directly."},
 {tp:"saving",sec:"g-sav-finance",ap:true,t:"mc",q:"A household buys $5,000 of shares in an existing company on the stock exchange. In macro terms it has:",a:"saved, and acquired a financial asset — not invested",w:["invested $5,000 in new capital","consumed $5,000 of services","raised GDP by $5,000"],e:"Investment is new capital goods."},
 {tp:"saving",sec:"g-sav-finance",t:"tf",q:"Buying a newly built factory is investment; buying a bond is not.",a:true,e:"True."},
 {tp:"saving",sec:"g-sav-finance",t:"tf",q:"Saving through a bank that lends to firms is direct financing.",a:false,e:"False — the bank is an intermediary, so that is indirect financing."}
]);
