'use server';

import dbConnect from '@/lib/mongodb';
import Signal from '@/models/Signal';
import Subscriber from '@/models/Subscriber';
import { sendNewSignalNotification } from '@/lib/gmail';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function addSignal(data: {
  title: string;
  content: string;
  image?: string;
  readTime?: string;
  author?: string;
  category?: string;
}) {
  try {
    await dbConnect();
    
    let slug = generateSlug(data.title) || 'signal-' + Date.now().toString(36);
    
    // Check for unique slug and append suffix if necessary
    let isUnique = false;
    let finalSlug = slug;
    let counter = 0;
    
    while (!isUnique) {
      const existing = await Signal.findOne({ slug: finalSlug });
      if (!existing) {
        isUnique = true;
      } else {
        counter++;
        finalSlug = `${slug}-${Math.random().toString(36).substring(2, 5)}`;
        // Security check to avoid infinite loop
        if (counter > 10) {
          finalSlug = `${slug}-${Date.now()}`;
          isUnique = true;
        }
      }
    }
    
    slug = finalSlug;

    const newSignal = await Signal.create({
      ...data,
      slug,
      category: data.category || 'PLATFORM SIGNAL',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath('/', 'page');
    revalidatePath('/signals', 'page');
    revalidatePath(`/signals/${slug}`, 'page');
    revalidatePath('/admin/signals', 'page');

    // Trigger Notifications to Subscribers (Non-blocking)
    try {
      const activeSubscribers = await Subscriber.find({ active: true }).select('email').lean();
      const subscriberEmails = activeSubscribers.map(sub => sub.email);
      
      const excerpt = data.content.length > 150 
        ? data.content.replace(/[#*`]/g, '').substring(0, 150) + '...' 
        : data.content.replace(/[#*`]/g, '');

      if (subscriberEmails.length > 0) {
        // We use allSettled to ensure one failure doesn't stop others, though currently our sendNewSignalNotification sends to one at a time.
        // For efficiency, we'll fire them all off and move on.
        Promise.allSettled(
          subscriberEmails.map(email => 
            sendNewSignalNotification({
              to: email,
              signalTitle: data.title,
              signalSlug: slug,
              signalExcerpt: excerpt
            })
          )
        ).catch(err => console.error('Bulk notification error:', err));
      }
    } catch (notificationError) {
      console.error('Failed to trigger notifications:', notificationError);
    }

    return {
      success: true,
      signal: JSON.parse(JSON.stringify(newSignal)),
    };
  } catch (error) {
    console.error('Error adding signal:', error);
    return { success: false, error: 'Failed to add signal.' };
  }
}

export async function getSignals() {
  try {
    noStore();
    await dbConnect();
    const signals = await Signal.find().sort({ createdAt: -1 }).lean();
    
    return {
      success: true,
      signals: JSON.parse(JSON.stringify(signals)),
    };
  } catch (error) {
    console.error('Error fetching signals:', error);
    return { success: false, error: 'Failed to fetch signals.' };
  }
}

export async function deleteSignal(id: string) {
  try {
    await dbConnect();
    const signal = await Signal.findByIdAndDelete(id);
    
    if (signal) {
      revalidatePath('/', 'page');
      revalidatePath('/signals', 'page');
      revalidatePath(`/signals/${signal.slug}`, 'page');
      revalidatePath('/admin/signals', 'page');
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting signal:', error);
    return { success: false, error: 'Failed to delete signal.' };
  }
}

export async function getSignalBySlug(slug: string) {
  try {
    noStore();
    await dbConnect();
    const signal = await Signal.findOne({ slug }).lean();
    
    if (!signal) {
      return { success: false, error: 'Signal not found' };
    }

    return {
      success: true,
      signal: JSON.parse(JSON.stringify(signal)),
    };
  } catch (error) {
    console.error('Error fetching signal by slug:', error);
    return { success: false, error: 'Failed to fetch signal.' };
  }
}
export async function updateSignal(id: string, data: {
  title: string;
  content: string;
  image?: string;
  readTime?: string;
  author?: string;
  category?: string;
}) {
  try {
    await dbConnect();
    
    // We don't auto-regenerate slug on edit to avoid breaking links
    const updatedSignal = await Signal.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    );
    
    if (!updatedSignal) {
      return { success: false, error: 'Signal not found' };
    }
 
    revalidatePath('/', 'page');
    revalidatePath('/signals', 'page');
    revalidatePath(`/signals/${updatedSignal.slug}`, 'page');
    revalidatePath('/admin/signals', 'page');
 
    return {
      success: true,
      signal: JSON.parse(JSON.stringify(updatedSignal)),
    };
  } catch (error) {
    console.error('Error updating signal:', error);
    return { success: false, error: 'Failed to update signal.' };
  }
}
