const router = require('express').Router(),
      fs = require('fs'),
      { resolve } = require('path'),
      PDFParser = require("pdf2json"),
      { Terms } = require('../db').models;

const { transformNJ, transformPA, publicnoticepaParser } = require('../parserFunctions/parserFunctions');

router.get('/terms', (req, res, next) => {
  Terms.findAll()
  .then(terms => res.send(terms))
  .catch(next);
});

router.post('/terms', (req, res, next) => {
  const { term } = req.body;
  console.log('caught the term', term);
  Terms.create({ term })
  .then(term => res.send(term))
  .catch(next);
})

router.post('/', (req, res, next) => {
  const { pdfFileName, writeText, writeHTML } = req.body;
  const pdfParser = new PDFParser(this, 1);
  
  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
  pdfParser.on("pdfParser_dataReady", pdfData => {
    const data = pdfParser.getRawTextContent();  
    
    if(pdfFileName[0] == "N"){
      saveParsedtoPDF(writeHTML, transformNJ);
      res.send({ message: "NJ Parser", data: transformNJ(data) });
    } else if (pdfFileName[0] == "P"){
      console.log("Using publicnoticepaParser, make sure you're using publicnoticepaParser.com");
      saveParsedtoPDF(writeHTML, publicnoticepaParser);
      res.send({ message: "PA Parser", data: publicnoticepaParser(data) });
    } else {
      res.send({ message: "Invalid Entry", data: `I Can't Parse ${pdfFileName}`})
    }

    if(writeText){
      fs.writeFile(resolve('assets', '_original-text', pdfFileName.slice(0,-4)+'.txt'), data, function(){
          console.log(`Original text output for ${pdfFileName.slice(0,-4)}.txt was a success!`);
      });
    }

    /* --- Functions --- */
    function saveParsedtoPDF(writeHTML, parser){
      if(writeHTML){
        fs.writeFile(resolve('assets', '_transformed', pdfFileName.slice(0,-4)+'-transformed.html'), parser(data), function(){
          console.log(`Original text output for ${pdfFileName.slice(0,-4)}-transformed.html was a success!`);
        });
      }
    }
  });

  try {
    pdfParser.loadPDF(resolve('assets', '_original-pdfs', pdfFileName));
  } catch (err){
    res.send({ message: "Invalid Entry", data: `I Can't Parse "<u><em>${pdfFileName}</em></u>"<br><br><strong>Error Message: ${err.message}</strong>`})
  }
});

module.exports = router;