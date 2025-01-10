import React, { useState } from 'react';
import { collection, addDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Channel } from '../types/channel';
import { X } from 'lucide-react';

interface ChannelFormProps {
  channel?: Channel | null;
  onClose: () => void;
  onSave: () => void;
}

export function ChannelForm({ channel, onClose, onSave }: ChannelFormProps) {
  const [formData, setFormData] = useState({
    name: channel?.name || '',
    url: channel?.url || '',
    category: channel?.category || '',
    logo: channel?.logo || '',
    active: channel?.active ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (channel) {
        // Update existing channel
        await updateDoc(doc(db, 'channels', channel.id), {
          ...formData,
          updatedAt: Timestamp.now()
        });
      } else {
        // Create new channel
        await addDoc(collection(db, 'channels'), {
          ...formData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
      onSave();
    } catch (error) {
      console.error('Error saving channel:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {channel ? 'Editar Canal' : 'Novo Canal'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              URL do Stream
            </label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Categoria
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              URL do Logo
            </label>
            <input
              type="text"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700 rounded"
            />
            <label htmlFor="active" className="ml-2 text-sm text-gray-400">
              Canal ativo
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}