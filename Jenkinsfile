pipeline {
    agent any

    environment {
        EC2      = "16.176.138.137"
        EC2_USER = "ubuntu"
        IMAGE    = "harinimuruges/coffee-ngrok"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Harini0712/ngrok-jenkins.git'
            }
        }

        stage('Build Image') {
            steps {
                // BuildKit disable — attestation issue fix
                sh 'DOCKER_BUILDKIT=0 docker build -t $IMAGE:latest .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | \
                        docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE:latest
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no \
                        ${EC2_USER}@${EC2} '
                            docker pull ${IMAGE}:latest
                            docker stop app 2>/dev/null || true
                            docker rm   app 2>/dev/null || true
                            docker run -d \
                                --name app \
                                --restart always \
                                -p 8081:80 \
                                ${IMAGE}:latest
                        '
                    """
                }
            }
        }
    }

    post {
        success { echo '✅ App is Live on EC2!' }
        failure { echo '❌ Pipeline Failed!' }
    }
}