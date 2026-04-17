import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function update() {
  const imgs: Record<string, string> = {
    'Tools': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    'Research': 'https://images.unsplash.com/photo-1620712943543-bcc4638d7349?auto=format&fit=crop&q=80&w=800',
    'Robotics': 'https://images.unsplash.com/photo-1531746790731-6c2ff7fbee22?auto=format&fit=crop&q=80&w=800',
    'General': 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800',
    'Ethics': 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800'
  };

  const articles = await prisma.article.findMany();
  console.log(`Updating ${articles.length} articles...`);

  for (const a of articles) {
    const category = a.category || 'General';
    const img = imgs[category] || imgs['General'];
    
    await prisma.article.update({
      where: { id: a.id },
      data: { imageUrl: img }
    });
  }

  console.log('Successfully updated images for all articles.');
}

update()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
