import prisma from '@/lib/prisma'
import { 
  Wrench,
  Search,
  Newspaper,
  Users,
  TrendingUp,
  Inbox,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react'
import AdminHeader from './AdminHeader'
import ToolsTable from './tools/ToolsTable'

export default async function AdminManageTools() {
  const [tools, articles, submissions] = await Promise.all([
    prisma.tool.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        url: true,
        isTrending: true,
        category: true,
      }
    }),
    prisma.article.count(),
    prisma.submission.count({ where: { status: 'PENDING' } })
  ])

  const stats = [
    { 
      label: 'Total Inventory', 
      value: tools.length, 
      icon: Wrench, 
      color: 'from-blue-500 to-indigo-600',
      trend: '+12%',
      description: 'Active AI tools'
    },
    { 
      label: 'News Articles', 
      value: articles, 
      icon: Newspaper, 
      color: 'from-purple-500 to-pink-600',
      trend: '+5%',
      description: 'Published updates'
    },
    { 
      label: 'Total Visits', 
      value: '12.4k', 
      icon: Users, 
      color: 'from-emerald-500 to-teal-600',
      trend: '+24%',
      description: 'Monthly traffic'
    },
    { 
      label: 'Pending', 
      value: submissions, 
      icon: Inbox, 
      color: 'from-amber-500 to-orange-600',
      trend: 'Review',
      description: 'New submissions'
    },
  ]

  return (
    <div className="animate-admin">
      <div className="admin-header">
        <AdminHeader />
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.4)', padding: '6px', borderRadius: '14px' }}>
          <button style={{ padding: '8px 16px', background: 'var(--admin-emerald-dim)', color: 'var(--admin-emerald)', border: 'none', borderRadius: '10px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Overview</button>
          <button style={{ padding: '8px 16px', color: '#64748b', border: 'none', background: 'transparent', borderRadius: '10px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Analytics</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="admin-card">
            <div className="admin-stat-icon">
              <stat.icon size={22} color="white" />
            </div>
            <div className="admin-stat-label">{stat.label}</div>
            <div className="admin-stat-val">{stat.value}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
              <span style={{ color: stat.trend.includes('+') ? 'var(--admin-emerald)' : '#f59e0b', fontWeight: 700 }}>{stat.trend}</span> {stat.description}
            </div>
          </div>
        ))}
      </div>

      {/* Tools Section */}
      <div style={{ marginTop: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div className="admin-section-title">
            <TrendingUp size={20} color="var(--admin-emerald)" />
            <span>Active Tools Directory</span>
          </div>
          
          <div className="admin-input-group">
            <Search className="admin-search-icon" size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="admin-search-input"
            />
          </div>
        </div>

        <div className="admin-table-container">
          <ToolsTable initialTools={tools} />
        </div>
      </div>
    </div>
  )
}
