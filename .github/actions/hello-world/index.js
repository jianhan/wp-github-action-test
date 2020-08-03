/*
 * @Author: your name
 * @Date: 2020-08-03 20:55:28
 * @LastEditTime: 2020-08-03 21:41:47
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

        const myToken = core.getInput('GITHUB_TOKEN');
        const octokit = github.getOctokit(myToken)

        octokit.repos.merge({
            owner: 'jianhan',
            repo: 'wp-github-action-test',
            base: 'master',
            head: 'release'
        });


    } catch (error) {
        core.setFailed(error.message);
    }
}

run()