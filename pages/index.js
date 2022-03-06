import { useState } from 'react';
import Head from 'next/head'
import FeaturedPost from '@components/FeaturedPost';
import CardPost from '@components/CardPost';
import Container from '@components/Container';
import Layout from '@components/Layout';
import mockPosts from '../utils/home.json';

export default function Home({ featured, files, categoies, author }) {
  // console.log(props);
  const [posts, setPosts] = useState(mockPosts);
  const data = (featured, files, categoies, author);

  return (
    <Layout>
      <Head>
        <title>Home &mdash; Bastian</title>
      </Head>
      <Container>
        <FeaturedPost 
          {...data}
        />
        <div className="flex -mx-4 flex-wrap mt-6">
          {posts.map(post => (
            <div key={post.id} className="md:w-4/12 w-full px-4 py-6">
              <CardPost {...post} />
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  const reqFeatured = await fetch(process.env.APIURL + '/posts?featured=true');
  const reqFiles = await fetch(process.env.APIURL + '/upload/files?featured=true');
  const reqCategory = await fetch(process.env.APIURL + '/categories?featured=true');
  const reqAuthor = await fetch(process.env.APIURL + '/authors?featured=true');
  // console.log(reqFeatured);
  const featured = await reqFeatured.json();
  const files = await reqFiles.json();
  const categories = await reqCategory.json();
  const author = await reqAuthor.json();

  if(featured.length < 1 && files.length < 1 && categories.length < 1 && author.length < 1) {
    featured = {};
    files = {};
    categories = {};
    author = {};
  }

  // console.log(files, featured, categories, author);

  return {
    props: {  
      featured: featured,
      files: files[0],
      categories: categories,
      author: author,
    }
  }
}