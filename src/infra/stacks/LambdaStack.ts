import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";

interface LambdaStackProps extends StackProps {
    spacesTable: ITable
}

export class LambdaStack extends Stack {
  // Exporting this lambda to be used by the api gateway stack Step: 1
  public readonly mainLambdaFunction: LambdaIntegration;

  constructor(scope: Construct, id: string, props?: LambdaStackProps) {
    super(scope, id, props);

    const mainLambdaFunction = new LambdaFunction(this, "mainLambdaStack", {
      runtime: Runtime.NODEJS_18_X,
      handler: "hello.main",
      code: Code.fromAsset(join(__dirname, "../../", "services")),
      environment: {
        TABLE_NAME: props.spacesTable.tableName // get the spaces table here.
      }
    });
    // Exporting this lambda to be used by the api gateway stack Step: 2
    this.mainLambdaFunction = new LambdaIntegration(mainLambdaFunction);
  }
}
