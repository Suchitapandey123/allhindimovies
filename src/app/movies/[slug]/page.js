import React from 'react'
import path from 'path'
import { readFile } from 'fs/promises'
import Details from './component/Details'

// Movies ke liye metadata generate karega
export async function generateMetadata({ params }) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'movies.json')
  const fileData = await readFile(filePath, 'utf8')
  const moviesData = JSON.parse(fileData)

  // URL ka slug id ke equal hoga (string compare karna safe hai)
  const movieItem = moviesData.movies.find(
    (item) => item.id.toString() === params.slug
  )

  if (!movieItem) {
    return {
      title: 'Movie Not Found | Movies',
      description: 'Movie details not available.'
    }
  }

  return {
    title: movieItem.meta?.title || `${movieItem.title} | Movies`,
    description:
      movieItem.meta?.description ||
      movieItem.description.substring(0, 160),
    alternates: {
      canonical: `https://yourdomain.com/movies/${movieItem.id}`,
    },
    openGraph: {
      title: movieItem.title,
      description: movieItem.description,
      images: [
        {
          url: movieItem.image,
          width: 800,
          height: 600,
          alt: movieItem.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: movieItem.title,
      description: movieItem.description,
      images: [movieItem.image],
    },
  }
}

const page = ({ params }) => {
  return (
    <>
      {/* Details component me params pass karo taki uske andar movie data show kar sako */}
      <Details params={params} />
    </>
  )
}

export default page
