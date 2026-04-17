import prisma from '@/lib/prisma'
import NewsAdminContent from './NewsAdminContent'

export default async function AdminNewsPage() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' },
  })

  return <NewsAdminContent articles={articles} />
}
