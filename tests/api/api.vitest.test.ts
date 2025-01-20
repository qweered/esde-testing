import { describe, it, expect } from 'vitest';
import { ApiClient, assertNonEmptyArray, assertAllPostIdMatch, assertAllEpisodesContainRick } from './shared/api-client';

describe('API Tests', () => {
  const api = new ApiClient();

  describe('GET /posts', () => {
    it('should return non-empty array of posts', async () => {
      const posts = await api.getPosts();
      assertNonEmptyArray(posts);
    });
  });

  describe('GET /comments with postId parameter', () => {
    it('should return comments for specific post', async () => {
      const postId = 1;
      const comments = await api.getCommentsByPostId(postId);
      assertNonEmptyArray(comments);
      assertAllPostIdMatch(comments, postId);
    });
  });

  describe('POST /posts', () => {
    it('should create new post', async () => {
      const newPost = {
        title: 'test title',
        body: 'test body',
        userId: 1,
      };

      const createdPost = await api.createPost(newPost);
      expect(createdPost).toEqual({
        id: 101,
        ...newPost
      });
    });
  });

  describe('GraphQL Rick and Morty API', () => {
    it('should return episodes containing "Rick" in name', async () => {
      const { data } = await api.getRickAndMortyEpisodes();
      const rickEpisodes = data.episodes.results.filter(episode => 
        episode.name.includes('Rick')
      );
      
      assertNonEmptyArray(rickEpisodes);
      assertAllEpisodesContainRick(rickEpisodes);
    });
  });
}); 