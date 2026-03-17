'use server';

import dbConnect from '@/lib/mongodb';
import AuthorizedTool from '@/models/AuthorizedTool';

export async function addAuthorizedTool(name: string, url: string) {
  try {
    await dbConnect();
    
    // Generate a secure API key for this tool
    const generateApiKey = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let key = 'vybex_';
      for (let i = 0; i < 32; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return key;
    };

    const apiKey = generateApiKey();

    const newTool = await AuthorizedTool.create({
      name,
      url,
      apiKey,
      isActive: true,
    });

    return {
      success: true,
      tool: {
        id: newTool._id.toString(),
        name: newTool.name,
        url: newTool.url,
        apiKey: newTool.apiKey,
        isActive: newTool.isActive,
      }
    };
  } catch (error: any) {
    if (error.code === 11000) {
      return { success: false, error: 'A tool with this URL already exists.' };
    }
    console.error('Error adding tool:', error);
    return { success: false, error: 'Failed to add authorized tool.' };
  }
}

export async function getAuthorizedTools() {
  try {
    await dbConnect();
    const tools = await AuthorizedTool.find().sort({ createdAt: -1 }).lean();
    
    return {
      success: true,
      tools: tools.map(tool => ({
        id: tool._id.toString(),
        name: tool.name,
        url: tool.url,
        apiKey: tool.apiKey,
        isActive: tool.isActive,
      }))
    };
  } catch (error) {
    console.error('Error fetching tools:', error);
    return { success: false, error: 'Failed to fetch tools.' };
  }
}

export async function deleteAuthorizedTool(id: string) {
  try {
    await dbConnect();
    await AuthorizedTool.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting tool:', error);
    return { success: false, error: 'Failed to delete tool.' };
  }
}
