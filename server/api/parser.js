const router = require('express').Router(),
      fs = require('fs'),
      { resolve, extname } = require('path'),
      PDFParser = require("pdf2json");
      // multer = require('multer');

const parser = require('../helperFuncs/parser');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: resolve(__dirname, '..', '..', 'assets', '_Uploads'),
  // filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`)
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });

router.post('/', upload.single('pdf-file'), (req, res, next) => {
  // upload(req, res, err => {
  //   console.log("What the heck is upload", req.file, req.files, req.body);
  //   if(err instanceof multer.MulterError){
  //     console.error(`Multer upload error = ${err.message}`);
  //     return;
  //   } else if (err){
  //     console.error(`Unknown  error = ${err.message}`);
  //   } else {
  //     console.log('req.file: ', JSON.stringify(req.file));  
  //     console.log('req.files: ', JSON.stringify(req.files));
  //     return;
  //   }
  // })
  
  const { writeText, writeHTML } = req.body;
  const pdfFileName = req.file.originalname;

  console.log('Hello pdffilename', pdfFileName)

  if(writeText){
    console.log("Text is on!")
  } else {
    console.log('Text is off!')
  }

  if(writeHTML){
    console.log('HTML is on!')
  } else {
    console.log('HTML is offf');
  }
  const pdfParser = new PDFParser(this, 1);

  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
  pdfParser.on("pdfParser_dataReady", pdfData => {
    const data = pdfParser.getRawTextContent();  
    
    //This just checks if the writeHTML flag was selected
    saveParsedtoPDF(writeHTML, parser);

    //Running the Sequelize Promise forces me to output from a promise. There might be issues with saveParsedtoPDF parcer parameter if it requires a promise reponse also
    parser(data)
    .then(data => {
      res.send({ message: "NJ Parser", data })
    })
    .catch(err => console.error(`Frontend Transform NJ Error ${err.message}`));
    
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
    pdfParser.loadPDF(resolve('assets', '_Uploads', pdfFileName));
  } catch (err){
    res.send({ message: "Invalid Entry", data: `I Can't Parse "<u><em>${pdfFileName}</em></u>"<br><br><strong>Error Message: ${err.message}</strong>`})
  }
});

module.exports = router;