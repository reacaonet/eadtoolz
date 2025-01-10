import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Channel } from '../types/channel';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { ChannelForm } from '../components/ChannelForm';

export function Admin() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = async () => {
    try {
      const channelsRef = collection(db, 'channels');
      const snapshot = await getDocs(channelsRef);
      const channelsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Channel[];
      setChannels(channelsData);
    } catch (error) {
      console.error('Error loading channels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (channel: Channel) => {
    setEditingChannel(channel);
    setShowForm(true);
  };

  const handleDelete = async (channelId: string) => {
    if (!confirm('Tem certeza que deseja excluir este canal?')) return;

    try {
      await deleteDoc(doc(db, 'channels', channelId));
      setChannels(channels.filter(c => c.id !== channelId));
    } catch (error) {
      console.error('Error deleting channel:', error);
    }
  };

  const handleToggleActive = async (channel: Channel) => {
    try {
      await updateDoc(doc(db, 'channels', channel.id), {
        active: !channel.active
      });
      setChannels(channels.map(c => 
        c.id === channel.id ? { ...c, active: !c.active } : c
      ));
    } catch (error) {
      console.error('Error updating channel:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Gerenciar Canais</h1>
          <button
            onClick={() => {
              setEditingChannel(null);
              setShowForm(true);
            }}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            <Plus className="w-5 h-5" />
            <span>Novo Canal</span>
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Canal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {channels.map((channel) => (
                <tr key={channel.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {channel.logo && (
                        <img
                          src={channel.logo}
                          alt={channel.name}
                          className="w-10 h-10 object-contain mr-3"
                        />
                      )}
                      <div className="text-sm font-medium text-white">
                        {channel.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{channel.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(channel)}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        channel.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {channel.active ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(channel)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(channel.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <ChannelForm
          channel={editingChannel}
          onClose={() => {
            setShowForm(false);
            setEditingChannel(null);
          }}
          onSave={() => {
            setShowForm(false);
            setEditingChannel(null);
            loadChannels();
          }}
        />
      )}
    </div>
  );
}