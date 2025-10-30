
import React from 'react';
import type { BlogPost } from '../types';
import { getBlogPosts } from '../services/contentService';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-800 hover:border-brand-primary transition-colors duration-300">
    <p className="text-sm text-medium-text font-mono mb-2">{post.date} &bull; {post.author}</p>
    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-light-text hover:text-brand-primary transition-colors">
      <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
    </h3>
    <p className="text-medium-text mb-4">{post.excerpt}</p>
    <a href={post.link} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-secondary hover:underline">Leia mais &rarr;</a>
  </div>
);

const Blog: React.FC = () => {
  // In a real application, you would fetch this from the Blogger RSS feed.
  // This would require a server-side proxy to bypass CORS issues, or using a service like RSS2JSON.
  const posts = getBlogPosts();

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">Blog</h2>
          <p className="mt-4 text-base sm:text-lg text-medium-text max-w-2xl mx-auto">Bastidores, inspirações e novidades do nosso universo.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
