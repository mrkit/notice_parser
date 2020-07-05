function transformNJ(data, terms){
  output = data
  .replace(/Publication Name:[\s\S]*?Notice Publish Date:/g, '<br>')
  .replace(/Back\s*Firefox.*\s.*\s.*\s.*\n-*Page.*-*/g, '<br><hr>')
  .replace(/Firefox.*aspx/g, '')
  .replace(/(\d* of \d*\/\d*\/\d*, \d*:\d* A?P?M)/g, '')
  .replace(/\s*-*Page.*---*/g, '')
  .replace(/Notice Content/g, '')
  .replace(/Back\W+/g, '')
  .replace(/performances?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/Maintenance bond/ig, '<strong style="background:pink">$&</strong>')
  .replace(/payment bonds?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/NEW ?JERSEY ?prevailing ?wages?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/prevailing ?wages?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/specifications?/ig, '<u>$&</u>')
  .replace(/documents?/ig, '<u>$&</u>')
  .replace(/cashier'?s checks?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/checks?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/prevailing times?/ig, '<u>$&</u>')
  .replace(/(\n\w*, \w* \d*, \d{4}\s+)/g, '$& <br><br>')
  .replace(/(The Press of Atlantic City, Pleasantville|Burlington County Times, Willingboro|Courier News, Bridgewater|Courier-Post, Cherry Hill|Daily Journal, Vineland|Jersey Journal, Jersey City|South Jersey Times)/g, '<h4>$&</h4>')
  .replace(/The Press of Atlantic City, Pleasantville/, '<h1>$&</h1>')
  .replace(/Burlington County Times, Willingboro/, '<h1>$&</h1>')
  .replace(/Courier News, Bridgewater/, '<h1>$&</h1>')
  .replace(/Courier-Post, Cherry Hill/, '<h1>$&</h1>')
  .replace(/Daily Journal, Vineland/, '<h1>$&</h1>')
  .replace(/Jersey Journal, Jersey City/, '<h1>$&</h1>')
  .replace(/South Jersey Times/, '<h1>$&</h1>')

  terms.forEach(term => {
    output = output.replace(new RegExp(term.string, term.flag), term.markup);
  });

  return output;
}

//parser for http://pa.mypublicnotices.com/PublicNotice.asp
function transformPA(data){
  return data
  .replace(/\-*Page \(\d*\) Break\-*/g, '<hr><br>')
  .replace(/(\d* of \d*\/\d*\/\d*, \d*:\d* A?P?M)/g, '')
  .replace(/Public Notice Print.*asp.../g, '')
  .replace(/Appeared in: /g, '<br><br>')
  .replace(/performances?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/Maintenance bond/ig, '<strong style="background:pink">$&</strong>')
  .replace(/payment bonds?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/prevailing ?wages?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/specifications?/ig, '<u>$&</u>')
  .replace(/documents?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/cashier'?s checks?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/checks?/ig, '<strong style="background:pink">$&</strong>')
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
  .replace(/performances?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/Maintenance bond/ig, '<strong style="background:pink">$&</strong>')
  .replace(/payment bonds?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/NEW ?JERSEY ?prevailing ?wages?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/prevailing ?wages?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/specifications?/ig, '<u>$&</u>')
  .replace(/documents?/ig, '<u>$&</u>')
  .replace(/cashier'?s checks?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/checks?/ig, '<strong style="background:pink">$&</strong>')
  .replace(/prevailing times?/ig, '<u>$&</u>')
  .replace(/(\n\w*, \w* \d*, \d{4})/g, '$& <br><br>')
  .replace(/estates?/ig, '<span style="background:red">$&</span>')
}

module.exports = {
  transformNJ,
  transformPA,
  publicnoticepaParser
}

// Original NJ, delete when I know the new one works for sure
// .replace(/Publication Name:[\s\S]*?Notice Publish Date:/g, '<br>')
// .replace(/Back\s*Firefox.*\s.*\s.*\s.*\n-*Page.*-*/g, '<br><hr>')
// .replace(/-*Page.*---*/g, '<strong style="background:red">CHICKEN</strong>')
// .replace(/Notice Content/g, '')
// .replace(/(\d* of \d*\/\d*\/\d*, \d*:\d* A?P?M)/g, '')
// .replace(/Back\W+/g, '')
// .replace(/Firefox.*aspx/g, '<br>')
// .replace(/performances?/ig, '<strong style="background:pink">$&</strong>')
// .replace(/Maintenance bond/ig, '<strong style="background:pink">$&</strong>')
// .replace(/payment bonds?/ig, '<strong style="background:pink">$&</strong>')
// .replace(/NEW ?JERSEY ?prevailing ?wages?/ig, '<strong style="background:pink">$&</strong>')
// .replace(/prevailing ?wages?/ig, '<strong style="background:pink">$&</strong>')
// .replace(/specifications?/ig, '<u>$&</u>')
// .replace(/documents?/ig, '<u>$&</u>')
// .replace(/cashier'?s checks?/ig, '<strong style="background:pink">$&</strong>')
// .replace(/checks?/ig, '<strong style="background:pink">$&</strong>')
// .replace(/prevailing times?/ig, '<u>$&</u>')
// .replace(/(\n\w*, \w* \d*, \d{4})/g, '$& <br><br>')