import axios, { AxiosResponse } from "axios";

const POST_API_ENDPOINT = "https://coderpull.com";

export class MattermostService {
  // private MATTERMOST_API_URL: string;
  private MATTERMOST_TOKEN: string;

  constructor(token: string) {
    // this.MATTERMOST_API_URL = apiUrl;
    this.MATTERMOST_TOKEN = token;
  }

  async getChannelPosts(channelId: string): Promise<any> {
    try {
      // Make a GET request to Mattermost API to fetch posts of a specific channel
      const response: AxiosResponse<any> = await axios.get(
        `${POST_API_ENDPOINT}/channels/${channelId}/posts`,
        {
          headers: {
            Authorization: `Bearer ${this.MATTERMOST_TOKEN}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts");
    }
  }

  getClient() {
    const token = this.MATTERMOST_TOKEN;
    return axios.create({
      baseURL: POST_API_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createPost(channelId: string, message: string): Promise<any> {
    const client = this.getClient();
    console.log("🚀 ~ MattermostService ~ createPost ~ client:", client);
    try {
      const response = await client.post("/api/v4/posts", {
        channel_id: channelId,
        message: message,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }
}
