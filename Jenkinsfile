pipeline {
    agent {label 'linux-perf'}
    stages {
        stage('Performance Testing') {
            steps {
                echo 'Installing k6'
                sh 'sudo chmod +x setup_k6.sh'
                sh 'sudo ./setup_k6.sh'
                echo 'Running K6 performance tests...'
                //sh 'K6_STATSD_ENABLE_TAGS=true k6 run --out statsd --out csv loadtests/msearch.js'
                sh 'k6 run loadtests/performance-test.js'
            }
        }
    }
}
