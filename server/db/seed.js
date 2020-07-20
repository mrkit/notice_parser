const Terms = require('./Terms')

function njSeed() {
  return Promise.all([
    Terms.create({ string: String.raw`Publication Name:[\s\S]*?Notice Publish Date:`, flags: 'g', markup: '<br>'}),
    Terms.create({ string: String.raw`Back\s*Firefox.*\s.*\s.*\s.*\n-*Page.*-*`, flags: 'g', markup: '<br><hr>'}),
    Terms.create({ string: 'Firefox.*aspx', flags: 'g', markup: ''}),
    Terms.create({ string: String.raw`(\d* of \d*\/\d*\/\d*, \d*:\d* A?P?M)`, flags: 'g', markup: ''}),
    Terms.create({ string: String.raw`\s*-*Page.*---*`, flags: 'g', markup: ''}),
    Terms.create({ string: 'Notice Content', flags: 'g', markup: ''}),
    Terms.create({ string: String.raw`Back\W+`, flags: 'g', markup: ''}),
    //Markups
    Terms.create({ string: 'performances?', flags: 'ig', markup:'<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: String.raw`no bids? are to be picked up at the engineer'?s? office`, flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'Maintenance bond', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'payment bonds?', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'N(?:EW)? ?J(?:ERSEY)? (?:state)? ?prevailing ?wages?', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: '(?<!(jersey |state |nj ))prevailing ?wages?', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'specifications?', flags: 'ig', markup: '<strong>$&</strong>'}),
    Terms.create({ string: 'documents?', flags: 'ig', markup: '<strong>$&</strong>'}),
    Terms.create({ string: `cashier'?s checks?`, flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'certified ?checks?', flags: 'ig', markup:'<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'prevailing times?', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'checks? payable to', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'addendum', flags: 'ig', markup: '<strong style="background:lightblue">$&</strong>'}),
    Terms.create({ string: 'strongly encouraged', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'waste water treatment plant', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'prevailing time', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'prequalified', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'questions?', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'from Bach Associates,? PC', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: String.raw`(?<!non\-?)refundable`, flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'questions', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'bid opening will be', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'bid opening will be conducted via online live streaming', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'full amount', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: 'opened and read out loud', flags: 'ig', markup: '<u>$&</u>'}),
    Terms.create({ string: '10%', flags: 'ig', markup: '<strong>$&</strong>'}),
    Terms.create({ string: 'performances?', flags: 'ig', markup: '<strong>$&</strong>'}),
    Terms.create({ string: '100%', flags: 'ig', markup: '<strong>$&</strong>'}),
    Terms.create({ string: String.raw`\(SED\)`, flags: 'ig', markup: '<strong>$&</strong>'}),
    Terms.create({ string: 'pre-?construction meeting', flags: 'ig', markup: '<strong>$&</strong>'}),
    Terms.create({ string: 'if mailed', flags: 'ig', markup: '<strong>$&</strong>'}),
    Terms.create({ string: 'obtained', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'bid bond', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'pre-?bid meeting', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'no cost', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'no charge', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'faxed bids will not be accepted', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'not in excess of $20,?000.?0?0?', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'certified check', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'payment bonds?', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: String.raw`consent\n? ?of\n? ?surety`, flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}), //make this run once only
    Terms.create({ string: String.raw`(?<!consent of )surety`, flags: 'ig', markup: '<strong style="font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'non-?refundable', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'New Jersey Division of Property Management and Construction', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: String.raw`C00[89] GENERAL CONSTRUCTION(\/?ALTERATIONS AND ADDITIONS)?`, flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'Payment must be received prior to obtaining', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'executed consent', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'completion bond', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: String.raw`obtained from the Architect’s ShareFile site at ?https:\/\/mmpfa.sharefile.com`, flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'questions regarding the bid', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'All potential bidders are to send their responses through the US ?Postal Service or other recognized delivery service that provides certification of delivery to the sender or hand deliver bids directly to the office of Manders Merighi Portadin Farrell Architects, LLC', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'Manders Merighi Portadin Farrell Architects, LLC', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: String.raw`\w{2,4}\.? ?\w* ? \w* at \w*@mmpfa\.com`, flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: String.raw`performance bond and labor and material \(payment\) bond`, flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'performance bond', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'Electronic download link for copies of the bid forms, contracts and specifications may be obtained from said Remington and Veronica Engineers', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: 'NO BIDS ARE TO BE PICKED UP AT THE ENGINEER’S OFFICE OR AT THE MUNICIPALITY OFFICES. PAYMENT MUST BE RECEIVED PRIOR TO OBTAINING SAID SPECIFICATIONS. NO BIDS ARE TO BE DROPPED OFF AT THE ENGINEER’S OFFICE.', flags: 'ig', markup: '<strong style="background:pink;font-weight:bold">$&</strong>'}),
    Terms.create({ string: String.raw`(\n\w*, \w* \d*, \d{4}\s+)`, flags: 'g', markup: '$& <br><br>'}),
    //Papers
    Terms.create({ string: '(The Press of Atlantic City, Pleasantville|Burlington County Times, Willingboro|Courier News, Bridgewater|Courier-Post, Cherry Hill|Daily Journal, Vineland|Jersey Journal, Jersey City|South Jersey Times|Cape May County Herald Times|The Trentonian, Trenton)', flags: 'g', markup: '<h4>$&</h4>'}),
    Terms.create({ string: 'The Press of Atlantic City, Pleasantville', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'Burlington County Times, Willingboro', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'Courier News, Bridgewater', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'Courier-Post, Cherry Hill', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'Daily Journal, Vineland', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'Jersey Journal, Jersey City', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'South Jersey Times', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'Cape May County Herald Times', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'The Trentonian, Trenton', flags: '', markup: '<h1>$&</h1>'}),
    //Tammi's papers
    Terms.create({ string: '(Asbury Park Press, Neptune|Daily Record, Parsippany|Herald News, West Paterson|Home News Tribune|The Record, Hackensack|The Star-Ledger, Newark|The Times, Trenton)', flags: 'g', markup: '<h4>$&</h4>'}),
    Terms.create({ string: 'Asbury Park Press, Neptune', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'Daily Record, Parsippany', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'Herald News, West Paterson', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'Home News Tribune', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'The Record, Hackensack', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'The Star-Ledger, Newark', flags: '', markup: '<h1>$&</h1>'}),
    Terms.create({ string: 'The Times, Trenton', flags: '', markup: '<h1>$&</h1>'})
  ])
}

function paSeeds(){
  //parser for http://pa.mypublicnotices.com/PublicNotice.asp
// function transformPA(data){
//   return data
//   .replace(/\-*Page \(\d*\) Break\-*/g, '<hr><br>')
//   .replace(/(\d* of \d*\/\d*\/\d*, \d*:\d* A?P?M)/g, '')
//   .replace(/Public Notice Print.*asp.../g, '')
//   .replace(/Appeared in: /g, '<br><br>')
//   .replace(/performances?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/Maintenance bond/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/payment bonds?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/prevailing ?wages?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/specifications?/ig, '<u>$&</u>')
//   .replace(/documents?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/cashier'?s checks?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/checks?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/prevailing times?/ig, '<u>$&</u>')
// }

//parser for https://www.publicnoticepa.com/Search.aspx
// function publicnoticepaParser(data){
//   return data
//   .replace(/Publication Name:[\s\S]*?Notice Publish Date:/g, '<br><br>')
//   .replace(/\-*Page \(\d*\) Break\-*/g, '<hr><br>')
//   .replace(/Notice Content/g, '')
//   .replace(/(\d* of \d*\/\d*\/\d*, \d*:\d* A?P?M)/g, '')
//   .replace(/Back\W+/g, '')
//   .replace(/Firefox.*aspx/g, '<br>')
//   .replace(/performances?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/Maintenance bond/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/payment bonds?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/NEW ?JERSEY ?prevailing ?wages?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/prevailing ?wages?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/specifications?/ig, '<u>$&</u>')
//   .replace(/documents?/ig, '<u>$&</u>')
//   .replace(/cashier'?s checks?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/checks?/ig, '<strong style="background:pink;font-weight:bold">$&</strong>')
//   .replace(/prevailing times?/ig, '<u>$&</u>')
//   .replace(/(\n\w*, \w* \d*, \d{4})/g, '$& <br><br>')
//   .replace(/estates?/ig, '<strong style="background:red">$&</strong>')
// }
}

module.exports = {
  njSeed
};