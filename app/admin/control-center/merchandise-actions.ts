'use server';

import dbConnect from '@/lib/mongodb';
import Merchandise from '@/models/Merchandise';
import { revalidatePath } from 'next/cache';

export async function addMerchandiseItem(data: {
  name: string;
  category: string;
  image: string;
  description: string;
  isComingSoon: boolean;
  downloadUrl?: string;
  price?: number;
  redirectUrl?: string;
  gender?: 'male' | 'female' | 'unisex';
}) {
  try {
    await dbConnect();
    const newItem = await Merchandise.create({
      ...data,
      createdAt: new Date(),
    });

    revalidatePath('/merchandise');
    revalidatePath('/');
    revalidatePath('/admin/control-center');

    return {
      success: true,
      item: {
        id: newItem._id.toString(),
        name: newItem.name,
        category: newItem.category,
        image: newItem.image,
        description: newItem.description,
        isComingSoon: newItem.isComingSoon,
        downloadUrl: newItem.downloadUrl,
        price: newItem.price,
        redirectUrl: newItem.redirectUrl,
        gender: newItem.gender,
      }
    };
  } catch (error) {
    console.error('Error adding merchandise:', error);
    return { success: false, error: 'Failed to add merchandise item.' };
  }
}

export async function getMerchandiseItems() {
  try {
    await dbConnect();
    const items = await Merchandise.find().sort({ createdAt: -1 }).lean();
    
    return {
      success: true,
      items: items.map(item => ({
        id: item._id.toString(),
        name: item.name,
        category: item.category,
        image: item.image,
        description: item.description,
        isComingSoon: item.isComingSoon,
        downloadUrl: item.downloadUrl,
        price: item.price,
        redirectUrl: item.redirectUrl,
        gender: item.gender,
      }))
    };
  } catch (error) {
    console.error('Error fetching merchandise:', error);
    return { success: false, error: 'Failed to fetch merchandise items.' };
  }
}

export async function deleteMerchandiseItem(id: string) {
  try {
    await dbConnect();
    await Merchandise.findByIdAndDelete(id);
    
    revalidatePath('/merchandise');
    revalidatePath('/');
    revalidatePath('/admin/control-center');

    return { success: true };
  } catch (error) {
    console.error('Error deleting merchandise:', error);
    return { success: false, error: 'Failed to delete item.' };
  }
}
