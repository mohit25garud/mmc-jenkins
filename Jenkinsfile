pipeline {
    agent any//{label 'windows-perf'}
    options {sendSplunkConsoleLog()}
    stages {
        stage('Performance Testing') {
            steps {
                //echo 'Installing k6'
                //sh 'sudo chmod +x setup_k6.sh'
                //sh 'sudo ./setup_k6.sh'
                echo 'Running K6 performance tests...'
                sh 'K6_CLOUD_TOKEN=71a89380815dbc6680d7517e2e6bdebdb982f1b0e40d56541498a7662ac6fa17 K6_STATSD_ENABLE_TAGS=true k6 run --out statsd --out cloud loadtests/msearch.js'
                //sh 'k6 run loadtests/performance-test.js'
                //bat 'K6_STATSD_ENABLE_TAGS=true k6 run --out statsd loadtests/msearch.js'
            }
        }
    }
}
