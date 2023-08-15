import { db } from "../datastore";
import { Post, expressHandler } from "../types";
import crypto from "crypto";

export const listPostHandler: expressHandler<{}, {}> = (req, res) => {
  res.send({ posts: db.listPosts() });
}

type createPostRequest = Pick<Post, 'title'|'url'|'userId'>

interface createPostResponse {}

export const createPostHandler: expressHandler<createPostRequest, createPostResponse> = (req, res) => {
  if (!req.body.title || !req.body.url || !req.body.userId) {
    return res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId
  };
  db.createPost(post)
  res.sendStatus(200);
}
