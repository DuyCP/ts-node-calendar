// import axios from 'axios';
// import { Integration } from './Integration'; // Assuming Integration class is defined somewhere

// const EMAIL_API_ENDPOINT = "https://coderpull.com/api/v4/users/email/";
// const POST_API_ENDPOINT = "https://coderpull.com/api/v4/posts";

// const mmToken = (): string => {
//   const integration = Integration.mattermost.first();
//   if (!integration) {
//     throw new Error("Please set up Mattermost integration.");
//   }
//   return integration.secret;
// };

// const getClient = (endpoint: string) => {
//   const token = mmToken();
//   return axios.create({
//     baseURL: endpoint,
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//   });
// };

// const createPost = async (channelId: string, message: string) => {
//   const client = getClient(POST_API_ENDPOINT);
//   try {
//     const response = await client.post('/api/v4/posts', {
//       channel_id: channelId,
//       message: message
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error;
//   }
// };

// // Usage
// const channelId = "channel123";
// const message = "Hello, world!";
// createPost(channelId, message)
//   .then((data) => {
//     console.log("Post created:", data);
//   })
//   .catch((error) => {
//     console.error("Failed to create post:", error);
//   });

console.log("Hello mattermost.ts");
