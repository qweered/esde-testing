export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface GraphQLResponse {
  data: {
    episodes: {
      results: Array<{
        name: string;
      }>;
    };
  };
}

export class ApiClient {
  constructor(private baseUrl: string = 'https://jsonplaceholder.typicode.com') {}

  async getPosts(): Promise<Post[]> {
    const response = await fetch(`${this.baseUrl}/posts`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    const response = await fetch(`${this.baseUrl}/comments?postId=${postId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }

  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    const response = await fetch(`${this.baseUrl}/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }

  async getRickAndMortyEpisodes(): Promise<GraphQLResponse> {
    const query = `
      query {
        episodes {
          results {
            name
          }
        }
      }
    `;

    const response = await fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }
}

export const assertNonEmptyArray = <T>(arr: T[]): void => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  if (arr.length === 0) throw new Error('Expected non-empty array');
};

export const assertAllPostIdMatch = (comments: Comment[], postId: number): void => {
  comments.forEach(comment => {
    if (comment.postId !== postId) {
      throw new Error(`Comment ${comment.id} has wrong postId: ${comment.postId}, expected: ${postId}`);
    }
  });
};

export const assertAllEpisodesContainRick = (episodes: Array<{ name: string }>): void => {
  episodes.forEach(episode => {
    if (!episode.name.includes('Rick')) {
      throw new Error(`Episode "${episode.name}" does not contain "Rick"`);
    }
  });
}; 