import {Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';


interface ApiStackProps extends StackProps {
    //Linking the api gateway to the Lambda Step 1 with Custom props
    helloLambdaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props?: ApiStackProps) {
        super(scope, id, props)

    
    const apiStack = new RestApi(this, 'SpacesApi');
    const spaceResource = apiStack.root.addResource('spaces');

    //Linking the api gateway to the Lambda Step 2
    spaceResource.addMethod('GET', props.helloLambdaIntegration)

    }
    
}