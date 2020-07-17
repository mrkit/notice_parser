const { Terms } = require('../db').models;

function transformNJ(data){
  let output = data
  .replace(/Publication Name:[\s\S]*?Notice Publish Date:/g, '<br>')
  .replace(/Back\s*Firefox.*\s.*\s.*\s.*\n-*Page.*-*/g, '<br><hr>')
  .replace(/Firefox.*aspx/g, '')
  .replace(/(\d* of \d*\/\d*\/\d*, \d*:\d* A?P?M)/g, '')
  .replace(/\s*-*Page.*---*/g, '')
  .replace(/Notice Content/g, '')
  .replace(/Back\W+/g, '')
  //Markups
  .replace(/performances?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/no bids? are to be picked up at the engineer'?s? office/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/Maintenance bond/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/payment bonds?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/N(?:EW)? ?J(?:ERSEY)? (?:state)? ?prevailing ?wages?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/(?<!(jersey |state |nj ))prevailing ?wages?/ig, '<u>$&</u>')
  .replace(/specifications?/ig, '<strong>$&</strong>')
  .replace(/documents?/ig, '<strong>$&</strong>')
  .replace(/cashier'?s checks?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/certified ?checks?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/prevailing times?/ig, '<u>$&</u>')
  .replace(/checks? payable to/ig, '<u>$&</u>')
  .replace(/addendum/ig, '<strong style="background:lightblue">$&</strong>')
  .replace(/strongly encouraged/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/waste water treatment plant/ig, '<u>$&</u>')
  .replace(/prevailing time/ig, '<u>$&</u>')
  .replace(/prequalified/ig, '<u>$&</u>')
  .replace(/questions?/ig, '<u>$&</u>')
  .replace(/from Bach Associates,? PC/ig, '<u>$&</u>')
  .replace(/(?<!non\-?)refundable/ig, '<u>$&</u>')
  .replace(/questions/ig, '<u>$&</u>')
  .replace(/bid opening will be/ig, '<u>$&</u>')
  .replace(/bid opening will be conducted via online live streaming/ig, '<u>$&</u>')
  .replace(/full amount/ig, '<u>$&</u>')
  .replace(/opened and read out loud/ig, '<u>$&</u>')
  .replace(/10%/ig, '<strong>$&</strong>')
  .replace(/performances?/ig, '<strong>$&</strong>')
  .replace(/100%/ig, '<strong>$&</strong>')
  .replace(/\(SED\)/ig, '<strong>$&</strong>')
  .replace(/pre-?construction meeting/ig, '<strong>$&</strong>')
  .replace(/if mailed/ig, '<strong>$&</strong>')
  .replace(/obtained/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/bid bond/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/pre-?bid meeting/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/no cost/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/no charge/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/faxed bids will not be accepted/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/not in excess of $20,?000.?0?0?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/certified check/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/payment bonds?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/consent\n? ?of\n? ?surety/ig, '<strong style="background:pink;font-weight:bold">$&</strong>') //make this run once only
  .replace(/(?<!consent of )surety/ig, '<strong style="font-weight:bold">$&</strong>')
  .replace(/non-?refundable/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/New Jersey Division of Property Management and Construction/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/C00[89] GENERAL CONSTRUCTION(\/?ALTERATIONS AND ADDITIONS)?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/Payment must be received prior to obtaining/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/executed consent/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/completion bond/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/obtained from the Architect’s ShareFile site at ?https:\/\/mmpfa.sharefile.com/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/questions regarding the bid/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/All potential bidders are to send their responses through the US ?Postal Service or other recognized delivery service that provides certification of delivery to the sender or hand deliver bids directly to the office of Manders Merighi Portadin Farrell Architects, LLC/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/Manders Merighi Portadin Farrell Architects, LLC/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/\w{2,4}\.? ?\w* ? \w* at \w*@mmpfa\.com/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/performance bond and labor and material \(payment\) bond/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/performance bond/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/Electronic download link for copies of the bid forms, contracts and specifications may be obtained from said Remington and Veronica Engineers/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/NO BIDS ARE TO BE PICKED UP AT THE ENGINEER’S OFFICE OR AT THE MUNICIPALITY OFFICES. PAYMENT MUST BE RECEIVED PRIOR TO OBTAINING SAID SPECIFICATIONS. NO BIDS ARE TO BE DROPPED OFF AT THE ENGINEER’S OFFICE./ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/(\n\w*, \w* \d*, \d{4}\s+)/g, '$& <br><br>')
  //Papers
  .replace(/(The Press of Atlantic City, Pleasantville|Burlington County Times, Willingboro|Courier News, Bridgewater|Courier-Post, Cherry Hill|Daily Journal, Vineland|Jersey Journal, Jersey City|South Jersey Times|Cape May County Herald Times|The Trentonian, Trenton)/g, '<h4>$&</h4>')
  .replace(/The Press of Atlantic City, Pleasantville/, '<h1>$&</h1>')
  .replace(/Burlington County Times, Willingboro/, '<h1>$&</h1>')
  .replace(/Courier News, Bridgewater/, '<h1>$&</h1>')
  .replace(/Courier-Post, Cherry Hill/, '<h1>$&</h1>')
  .replace(/Daily Journal, Vineland/, '<h1>$&</h1>')
  .replace(/Jersey Journal, Jersey City/, '<h1>$&</h1>')
  .replace(/South Jersey Times/, '<h1>$&</h1>')
  .replace(/Cape May County Herald Times/, '<h1>$&</h1>')
  .replace(/The Trentonian, Trenton/, '<h1>$&</h1>')
  //Tammi's papers
  .replace(/(Asbury Park Press, Neptune|Daily Record, Parsippany|Herald News, West Paterson|Home News Tribune|The Record, Hackensack|The Star-Ledger, Newark|The Times, Trenton)/g, '<h4>$&</h4>')
  .replace(/Asbury Park Press, Neptune/, '<h1>$&</h1>')
  .replace(/Daily Record, Parsippany/, '<h1>$&</h1>')
  .replace(/Herald News, West Paterson/, '<h1>$&</h1>')
  .replace(/Home News Tribune/, '<h1>$&</h1>')
  .replace(/The Record, Hackensack/, '<h1>$&</h1>')
  .replace(/The Star-Ledger, Newark/, '<h1>$&</h1>')
  .replace(/The Times, Trenton/, '<h1>$&</h1>')
  // .replace(//, '<h1>$&</h1>')

  return Terms.findAll()
  .then(terms => {
    terms.forEach(term => {
      output = output.replace(new RegExp(term.string, term.flags), term.markup);
    });
  })
  .then(() => output)
  .catch(err => console.error(`Parser Function Error = ${err.message}`));
}

//parser for http://pa.mypublicnotices.com/PublicNotice.asp
function transformPA(data){
  return data
  .replace(/\-*Page \(\d*\) Break\-*/g, '<hr><br>')
  .replace(/(\d* of \d*\/\d*\/\d*, \d*:\d* A?P?M)/g, '')
  .replace(/Public Notice Print.*asp.../g, '')
  .replace(/Appeared in: /g, '<br><br>')
  .replace(/performances?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/Maintenance bond/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/payment bonds?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/prevailing ?wages?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/specifications?/ig, '<u>$&</u>')
  .replace(/documents?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/cashier'?s checks?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/checks?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/prevailing times?/ig, '<u>$&</u>')
}

//parser for https://www.publicnoticepa.com/Search.aspx
function publicnoticepaParser(data){
  return data
  .replace(/Publication Name:[\s\S]*?Notice Publish Date:/g, '<br><br>')
  .replace(/\-*Page \(\d*\) Break\-*/g, '<hr><br>')
  .replace(/Notice Content/g, '')
  .replace(/(\d* of \d*\/\d*\/\d*, \d*:\d* A?P?M)/g, '')
  .replace(/Back\W+/g, '')
  .replace(/Firefox.*aspx/g, '<br>')
  .replace(/performances?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/Maintenance bond/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/payment bonds?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/NEW ?JERSEY ?prevailing ?wages?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/prevailing ?wages?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/specifications?/ig, '<u>$&</u>')
  .replace(/documents?/ig, '<u>$&</u>')
  .replace(/cashier'?s checks?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/checks?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
  .replace(/prevailing times?/ig, '<u>$&</u>')
  .replace(/(\n\w*, \w* \d*, \d{4})/g, '$& <br><br>')
  .replace(/estates?/ig, '<strong style="background:red">$&</strong>')
}

module.exports = {
  transformNJ,
  transformPA,
  publicnoticepaParser
}

/*
todo: 
generalize the one parser
remove the other two
remove all the hardcoded replace methods - store the relevant values in a seed file instead. The same goes for the replace methods in the to-be-removed forms
change exports object to just the parser. Fix the import error that'll occur because of this in the index.js file in the api folder
*/