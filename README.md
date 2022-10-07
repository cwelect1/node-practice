# Get Failed Tests from Allure Report

Current Bugs: 
1. No data being returned to caller of "getFilteredResultsFromAllTestRuns"
    suites array is getting populated, but not returned syncronously
    I have promise issues. ;(
2. Code's a mess...cleanup naming, commented out code, etc...
3. Hard coded file paths/names.

Write a function that:
- Reads /data/suites.json
- Parses each suite
- Gathers tests that fail
- Return list in json format (suite name -> test name)

```json
// Example Suite Format
{
    "uid": "98d3104e051c652961429bf95fa0b5d6",
    "name": "suites",
    "children":
    [
        {
            "name": "GET_AllTeamAndMemberByExerciseId_post",
            "children":
            [
                {
                    "name": "TC-001 -getAllTeamsAndMemberByExerciseId_Post - should return 200 status code",
                    "uid": "bc625bc1565def29",
                    "parentUid": "2b336ccaa0e8a316f03dc34f849995e4",
                    "status": "failed",
                    "time":
                    {
                        "start": 1664414587606,
                        "stop": 1664414608671,
                        "duration": 21065
                    },
                    "flaky": false,
                    "newFailed": false,
                    "newPassed": false,
                    "newBroken": false,
                    "retriesCount": 0,
                    "retriesStatusChange": false,
                    "parameters":
                    []
                },
                {
                    "name": "TC-002 -AllTeamAndMemberByExerciseId_post- should return correct content-type and schema in JSON format",
                    "uid": "3281b7bf563bd555",
                    "parentUid": "2b336ccaa0e8a316f03dc34f849995e4",
                    "status": "failed",
                    "time":
                    {
                        "start": 1664414608671,
                        "stop": 1664414629742,
                        "duration": 21071
                    },
                    "flaky": false,
                    "newFailed": false,
                    "newPassed": false,
                    "newBroken": false,
                    "retriesCount": 0,
                    "retriesStatusChange": false,
                    "parameters":
                    []
                }}
            ],
            "uid": "0ed043c09ad31f30e24bee6d22ca42f0"
        }
    ]
}
```

Commands for running:
- `npm install` to install dependencies
- `npm start` runs `index.js`
- `npm test` runs tests in `main.test.js`
