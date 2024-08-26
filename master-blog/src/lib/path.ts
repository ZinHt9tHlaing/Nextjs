const paths = {
  HomePage() {
    return "/";
  },
  CreateTopic() {
    return "/topics";
  },
  SingleTopic(slug: string) {
    return `/topics/${slug}`;
  },
  SinglePost(slug: string, postId: string) {
    return `/topics/${slug}/posts/${postId}`;
  },
};

export default paths;
