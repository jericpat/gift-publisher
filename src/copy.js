const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync


const fileToCopy = {
  Metadata: ['import "./Metadata.css"'],
  ProgressBar: 'import "./ProgressBar.css";',
  TablePreview:  undefined,
  TableSchema: "import './TableSchema.css';",
  Upload: 'import "./Upload.css";',
  Choose: 'import "./Choose.css";',
  InputFile: ['import "./InputFile.css";', 'import upload from "../../assets/upload.png";'],
  InputUrl: 'import "./InputUrl.css";',
  ResourceList: undefined
}


for(let keys in fileToCopy){

  const fileContent = fs.readFileSync(
    `${__dirname}/components/${keys}/index.jsx`
    )
    .toString()
    .split('\n');
  if (fileToCopy[keys]) {
    if (Array.isArray(fileToCopy[keys])){
      const value = fileToCopy[keys]
      value.forEach((item)=>{
        const index = fileContent.indexOf(item);

        fileContent.splice(index, 1);
      })
    }else{
      const index = fileContent.indexOf(fileToCopy[keys]);

      fileContent.splice(index, 1);
    }
    

  }
  
  fs.writeFileSync(`${__dirname}/lib/components/${keys}/index.js`,
                   fileContent.join('\n'));

}


// copy App.js to lib/components/ResourceEditor/index.jsx

const appContent = fs.readFileSync(`${__dirname}/App.js`).toString().split('\n');


const stringIndex = ['import Upload from "./components/Upload";',
                    'import Metadata from "./components/Metadata";',
                    'import "./App.css";',
                    'import ReactLogo from "./progressBar.svg";',
                    '<img src={ReactLogo} width="50%" className="Img" />',
                  'import upload from "../../assets/upload.png";'];

const appComponents = [
  'import Upload from "../Upload";',
  'import TablePreview from "../TablePreview";',
  'import TableSchema from "../TableSchema";',
  'import ResourceList from "../ResourceList"',
  'import Metadata from "../Metadata";',
  'import InputFile from "../InputFile";',
  'import InputUrl from "../InputUrl";',
  'import Choose from "../Choose";'
];

const startIndex = appContent.indexOf(stringIndex[0]);
const endIndex = appContent.indexOf(stringIndex[1]);
const indexApp = startIndex - endIndex;

appContent.splice(startIndex, (endIndex - startIndex)+1, appComponents.join('\n'));

const cssIndex = appContent.indexOf(stringIndex[2]);
appContent.splice(cssIndex,1);
const svgIndex = appContent.indexOf(stringIndex[3]);
appContent.splice(svgIndex,1);

const appContent1 = appContent.join('\n')
                              .replace('<img src={ReactLogo} width="50%" className="Img" />', '');


fs.writeFileSync(`${__dirname}/lib/components/DatasetEditor/index.js`,
                  appContent1);

// copy directory (src/utils, src/db src/assests) to lib/

execSync(`cp -r ${__dirname}/db ${__dirname}/lib/`);
execSync(`cp -r ${__dirname}/utils ${__dirname}/lib/`);