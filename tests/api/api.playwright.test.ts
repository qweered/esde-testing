import { test, expect } from '@playwright/test';
import { ApiClient, assertNonEmptyArray, assertAllPostIdMatch, assertAllEpisodesContainRick } from './shared/api-client';

test.describe('API Tests', () => {
  const api = ApiClient.getInstance();

  test('GET /posts should return non-empty array', async () => {
    const posts = await api.getPosts();
    assertNonEmptyArray(posts);
  });

  test('GET /comments with postId should return filtered comments', async () => {
    const postId = 1;
    const comments = await api.getCommentsByPostId(postId);
    assertNonEmptyArray(comments);
    assertAllPostIdMatch(comments, postId);
  });

  test('POST /posts should create new post', async () => {
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

  test('GraphQL query should return episodes with "Rick" in name', async () => {
    const { data } = await api.getRickAndMortyEpisodes();
    const rickEpisodes = data.episodes.results.filter(episode => 
      episode.name.includes('Rick')
    );
    
    assertNonEmptyArray(rickEpisodes);
    assertAllEpisodesContainRick(rickEpisodes);
  });
}); 