import { readdir } from 'fs/promises'

const fs = require('fs/promises');

const getFilteredResultsFromAllTestRuns1 = (resultsPath, testCaseFilter) => {
  return new Promise ((resolve, error) => {
    getDirectories(resultsPath)
      .then(directories => {
        return new Promise ((resolve, error) => {
          let app = [];
          directories.forEach(directory => {
            console.log("Directory: " + directory);
            return new Promise ((resolve, error) => {
              getTestData(resultsPath + "/" + directory + "/allure-report/data/suites.json", testCaseFilter)
              .then((suites) => {
                if (suites !== ""){
                  let obj = new Object();
                  obj.suites = suites;
                  app.push(obj);
                  return app;
                }
              })
              .then((stuff) => {/*console.log("stuffy: " + JSON.stringify(stuff)); */resolve(stuff)})
              .catch(error)
            })
            .then((stuff) => {/*console.log(JSON.stringify(stuff));*/ resolve(stuff)})
            .catch(error)
              console.log("App2: " + app)
          })
        })
        .then((stuff) => {/*console.log(JSON.stringify(stuff));*/ resolve(stuff)})
        .catch(error)
        console.log("App3: "+ app)
      })
      .then(appSuite => {
        //console.log("appSuite: " + appSuite);
        resolve(appSuite)})
      .catch(error)
  })    
}

const getFilteredResultsFromAllTestRuns = (resultsPath, testCaseFilter) => {
  return new Promise((resolve, reject) => {
    getDirectories(resultsPath)
      //.then(directories => resolve(directories))
      .then(dirs => {
        let suites =[];
        dirs.forEach(
          dir => getTestData(resultsPath + "/" + dir + "/allure-report/data/suites.json", testCaseFilter)
                    .then(testData => {console.log("testData" + testData); suites.push(testData)})
        )
      console.log("dddd" + JSON.stringify(suites));
      return suites;
    })
    .then(suites => resolve(suites))
    .catch(reject)
        /*//console.log("here: " + dirs);
        new Promise((resolve, reject) => {
          let suites = [];
          for (let count = 0; dirs.length < count; count++) {
            suites.push(
              getTestData(resultsPath + "/" + dirs[count] + "/allure-report/data/suites.json", testCaseFilter)
            )
          }
          return suites
        })
        .then(suites => resolve(suites))
        .catch(reject)
      })*/
      /*.then(dirArry => {
        let results = [];
        dirArry.forEach(dir => results.push(dir))
        resolve(results);
      })*/
  })
}

const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const getTestData = (suitesFile, filter) => {
  return new Promise((resolve, reject) => {
    fs.readFile(suitesFile, { encoding: 'utf8' })
      //.then(response => console.log(response))
      .then(data => {return filterCases(data, filter)})
      .then(result => resolve(result))
      .catch(reject)
  })
}

/**
 * Parses a passed in Allure Report suites.json file 
 * and return json array of suites that contains a json array of failed test cases
 * 
 * @param {*} response json response from fetch() call of suites.json file
 * @returns json array of suites that contains a json array of failed test cases
 */

const filterCases = (response, filter) => {
    let result = {};
    let suites = [];
    
    let jsonResponse = JSON.parse(response);

    jsonResponse.children.forEach(suite => {
      let testCases = [];
      let testSuite = {};

      suite.children.forEach(testCase => {
        if(testCase[filter.field] === filter.value){
          testCases.push(testCase.status + "   " + testCase.name);
        }
      })
      testSuite.name = suite.name;
      testSuite.testCases = testCases;
      if(testCases.length > 0){
        suites.push(testSuite);
      }
    })
    //console.log(suites);
    //result = suites;
    return suites;
}

let filterCriteria = {
  field: "status",
  value: "passed"
}

getFilteredResultsFromAllTestRuns("data/2022-10-03_23-22", filterCriteria)
  .then(tests => console.log(tests))
  //.then(results => {console.log("Results: " + JSON.stringify(results))})
  //.catch((reason) => {
  //  console.log(reason)})

// Leave this here
export default getFilteredResultsFromAllTestRuns;