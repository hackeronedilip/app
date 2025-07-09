pipeline {
    agent any
    
    
    parameters {
        choice(name: 'VERSION', choices['v1','v2'], description: 'Choose the Deployment Version')
        string(name: 'IMAGE_TAG', defaultValue: 'latest', description: 'Type the Docker Version name')
    }
    
    environment {
            AWS_REGION = 'us-east-1'
        ECR_ACCOUNT_ID = '690109731501'
        ECR_REPO = 'blue-green-deploy'
        IMAGE_NAME = '${ECR_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}'
        DEPLOYMENT_FILE = 'blue-Green/01_blue-deployment.yml'
        DEPLOYMENT_SERVICE = 'blue-Green/02_live-service.yml'
        DEPLOYMENT_TEMPLATE = 'blue-Green/01_blue-deployment-${params.VERSION}.yml'
    }

    stages {
        stage('Deploy the application to this ${params.VERSION}') {
            steps {
                script {
                    sh """
                    
                    sed -e |{{VERSION}}|${params.VERSION}|g' \
                    -e |{{IMAGE_TAG}}|${params.IMAGE_TAG}|g' \
                    ${env.DEPLOYMENT_TEMPLATE} > ${DEPLOYMENT_FILE}
                    
                    """
                    
                    
                }
                
            }
        }
        stage('Docker Image update in Github') {
  steps {
      withCredentials([usernamePassword(credentialsId: 'git-password', passwordVariable: 'GIT_PASS', usernameVariable: 'GIT_USER')]) {
                  sh """
                  git config user.email "dilip.hackerone.8@gmail.com"
                   git config user.name "hackeronedilip"
                  git add .
                git commit -m "udpated the Dockerfile to "
                git remote set-url origin https://${GIT_USER}:${GIT_PASS}@github.com/hackeronedilip/app.git
                git push origin main
                  
                  """
          }
  }
}
        stage('Docker image name Change & Deploy K8 applicatiion ') {
            steps {
                script {
                  withKubeConfig(caCertificate: '', clusterName: 'dineshdevopscluster', contextName: '', credentialsId: 'k8-token', namespace: 'webapps', restrictKubeConfigAccess: false, serverUrl: 'https://16F8D070EC307B9B3044DCD6F7765B73.gr7.us-east-1.eks.amazonaws.com') {
                                sh """
                                
                                      kubectl apply -f ${DEPLOYMENT_FILE}
                                      kubectl apply -f ${DEPLOYMENT_SERVICE}
  
                                """
                                
                                  }
                }
            }
        } 
    }
}
