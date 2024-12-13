import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";

const app = new App();
new DataStack(app, 'DataStack')
const lambdaStack = new  LambdaStack(app, 'LambdaStack')
const apiStack = new  ApiStack(app, 'ApiStack', {
    helloLambdaIntegration: lambdaStack.mainLambdaFunction // Tying the lambda to this apigateway
})