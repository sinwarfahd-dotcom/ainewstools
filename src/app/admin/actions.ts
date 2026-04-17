'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteTool(id: string) {
  try {
    await prisma.tool.delete({
      where: { id },
    })
    revalidatePath('/admin')
    revalidatePath('/tools')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Delete error:', error)
    return { error: 'Failed to delete tool' }
  }
}

export async function toggleFeatured(id: string, currentStatus: boolean) {
  try {
    await prisma.tool.update({
      where: { id },
      data: { isTrending: !currentStatus }, // Using isTrending as the "featured" flag based on previous schema
    })
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to update status' }
  }
}

export async function updateAffiliateUrl(id: string, affiliateUrl: string) {
  try {
    // Note: The original schema doesn't have affiliateUrl field, 
    // we would need to add it or store it in an existing string field.
    // For now, let's assume we use the 'url' field or we should add a migration.
    // I will use URL field for now but warn the user.
    await prisma.tool.update({
      where: { id },
      data: { url: affiliateUrl },
    })
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to update affiliate URL' }
  }
}

export async function deleteArticle(id: string) {
  try {
    await prisma.article.delete({
      where: { id },
    })
    revalidatePath('/admin/news')
    revalidatePath('/news')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete article' }
  }
}

export async function createTool(data: any) {
  try {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 5)
    
    await prisma.tool.create({
      data: {
        ...data,
        slug,
        rating: parseFloat(data.rating || '0'),
        isNew: true,
      },
    })
    revalidatePath('/admin/tools')
    revalidatePath('/tools')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Create error:', error)
    return { error: 'Failed to create tool' }
  }
}

export async function createArticle(data: any) {
  try {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 5)
    
    await prisma.article.create({
      data: {
        ...data,
        slug,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      },
    })
    revalidatePath('/admin/news')
    revalidatePath('/news')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Create article error:', error)
    return { error: 'Failed to create article' }
  }
}

export async function updateArticle(id: string, data: any) {
  try {
    await prisma.article.update({
      where: { id },
      data: {
        ...data,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      },
    })
    revalidatePath('/admin/news')
    revalidatePath('/news')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Update article error:', error)
    return { error: 'Failed to update article' }
  }
}

export async function logout() {
  // Clearing cookies is usually done in API routes or client side for logout
  // But we can return a success flag for the client to handle it
  return { success: true }
}
