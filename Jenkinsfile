#!groovy

node() {
  try {

    withCredentials([string(credentialsId: 'npm_nexus_auth', variable: 'NEXUS_AUTH')]) {
      withEnv(['NEXUS_EMAIL=engineering@linuxfoundation.org', "NEXUS_TOKEN=${NEXUS_AUTH}"]) {
        docker.withRegistry("https://433610389961.dkr.ecr.us-west-2.amazonaws.com", "ecr:us-west-2:jenkins-aws-user") {
          docker.image('433610389961.dkr.ecr.us-west-2.amazonaws.com/npm-publish:latest').inside {

            stage('Checkout') {
              checkout scm
              sh "/srv/set_npmrc.sh"
            }

            stage('Build') {
              sh "npm install"
            }

            if (env.BRANCH_NAME == 'master') {
              stage('Publish NPM snapshot') {
                def currentVersion = sh(returnStdout: true, script: "npm version | grep \"{\" | tr -s ':'  | cut -d \"'\" -f 4").trim()
                def newVersion = "${currentVersion}-${env.BUILD_ID}"
                sh "npm version ${newVersion} --no-git-tag-version && npm publish --tag next"
              }
            }
          }
        }
      }
    }

    currentBuild.result = 'SUCCESS'

  } catch (error) {
    currentBuild.result = 'FAILED' // Important for the Stash notifier!
    throw error
  }
}