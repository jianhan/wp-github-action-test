/*
 * @Author: your name
 * @Date: 2020-08-03 20:55:28
 * @LastEditTime: 2020-08-03 21:46:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hello-world-javascript-action/index.js
 */
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        // `who-to-greet` input defined in action metadata file
        const nameToGreet = core.getInput('who-to-greet');
        console.log(`Hello ${nameToGreet}!`);
        const time = (new Date()).toTimeString();
        core.setOutput("time", time);
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);

        const myToken = core.getInput('github-token');
        const octokit = github.getOctokit(myToken)

        octokit.repos.merge();
        octokit.repos.merge();


    } catch (error) {
        core.setFailed(error.message);
    }
}

run()