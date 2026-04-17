import prisma from '@/lib/prisma'
import ToolsTable from './ToolsTable'
import ToolsHeader from './ToolsHeader'

export default async function AdminToolsPage() {
  const tools = await prisma.tool.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      url: true,
      isTrending: true,
      category: true,
    }
  })

  return (
    <div className="p-8 space-y-8" dir="rtl">
      <ToolsHeader />
      <ToolsTable initialTools={tools} />
    </div>
  )
}
