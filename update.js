import * as dynamodbLib from './libs/dynamodb-lib'
import { failure, success } from './libs/response-lib'

export async function main(event, context) {
    const data = JSON.parse(event.body)
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET content=:content, attachment=:attachment",
        ExpressionAttributeValues: {
            ":content": data.content || null,
            ":attachment": data.attachment || null
        },
        ReturnValues: "ALL_NEW"
    }

    try {
        const result = await dynamodbLib.call("update", params)
        return success({ status: true })
    } catch (error) {
        return failure({ status: false })

    }

}