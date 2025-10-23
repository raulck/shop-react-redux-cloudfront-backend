import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    // Check if Authorization header is provided
    if (!event.authorizationToken) {
      console.log('No authorization token provided');
      throw new Error('Unauthorized'); // This will result in 401
    }

    // Extract and validate Basic token
    const token = event.authorizationToken;
    if (!token.startsWith('Basic ')) {
      console.log('Invalid token format - must start with Basic');
      throw new Error('Unauthorized');
    }

    // Decode the base64 encoded credentials
    const base64Credentials = token.substring(6); // Remove 'Basic ' prefix
    let credentials: string;
    
    try {
      credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    } catch (error) {
      console.log('Failed to decode base64 credentials:', error);
      throw new Error('Unauthorized');
    }

    // Parse username:password
    const [username, password] = credentials.split(':');
    if (!username || !password) {
      console.log('Invalid credentials format - missing username or password');
      throw new Error('Unauthorized');
    }

    console.log(`Attempting to authorize user: ${username}`);

    // Check credentials against environment variables
    const expectedPassword = process.env[username];
    if (!expectedPassword) {
      console.log(`User ${username} not found in environment variables`);
      throw new Error('Forbidden'); // This will result in 403
    }

    if (password !== expectedPassword) {
      console.log(`Invalid password for user ${username}`);
      throw new Error('Forbidden'); // This will result in 403
    }

    console.log(`User ${username} authenticated successfully`);

    // Generate policy for successful authentication
    const policy: APIGatewayAuthorizerResult = {
      principalId: username,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn,
          },
        ],
      },
      context: {
        username: username,
      },
    };

    return policy;
  } catch (error) {
    console.log('Authorization failed:', error);
    
    // Determine the type of error for proper HTTP status
    if (error instanceof Error) {
      if (error.message === 'Forbidden') {
        // Return 403 for invalid credentials
        throw new Error('Forbidden');
      }
    }
    
    // Return 401 for missing or malformed authorization header
    throw new Error('Unauthorized');
  }
};
