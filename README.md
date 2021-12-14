# HAR-Analyser

A simple utility to replay and calcualte average request time the contents of a HTTP Archive (HAR) file while maintaining the delay between requests. Utilizes the request npm module to execute the HTTP replay requests.



Sample:
`
node index.js --file=sample/sample.har --repeat=5 --sleep=20000
`
