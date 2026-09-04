pipeline {
    agent any

    environment {
        IMAGE_NAME = "demo-app"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from Git...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building image ${IMAGE_NAME}:${IMAGE_TAG}"
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests... (placeholder for now)'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
    }
}