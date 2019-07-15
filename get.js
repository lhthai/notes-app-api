import * as dynamodbLib from './libs/dynamodb-lib'
import { failure, success } from './libs/response-lib'

export async function main(event, context) {
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    }
    try {
        const result = await dynamodbLib.call("get", params)
        if (result.Item) {
            return success(result.Item)
        } else {
            return failure({ status: false, error: "Item not found." })
        }
    } catch (error) {
        return failure({ status: false })
    }
}